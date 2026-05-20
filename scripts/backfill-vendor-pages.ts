/**
 * scripts/backfill-vendor-pages.ts — OEMBED-LOOP5
 *
 * Walks vendor markdown, embeds each page with fastembed (local ONNX),
 * and writes rows into ./var/vendor-pages.db (SQLite via node:sqlite).
 *
 * OSL1 boundary: this is the ONLY file in the repo that is allowed to:
 *   - import fastembed
 *   - read HUGGINGFACE_HUB_TOKEN from env
 *   - read VENDOR_EMBED_MODEL from env
 * Anything under src/ must stay env-free.
 *
 * Storage schema (kept in lockstep with src/lib/vendor-pages-db.ts):
 *   CREATE TABLE vendor_pages (
 *     url TEXT PRIMARY KEY,        -- "<vendor>/<relpath>"
 *     vendor TEXT NOT NULL,
 *     relpath TEXT NOT NULL,
 *     sha256 TEXT NOT NULL,
 *     embedding BLOB NOT NULL,     -- raw bytes of Float32Array
 *     dim INTEGER NOT NULL,
 *     text TEXT NOT NULL,
 *     model TEXT NOT NULL,
 *     mtime TEXT NOT NULL          -- ISO 8601
 *   );
 *   CREATE INDEX idx_vendor ON vendor_pages(vendor);
 *
 * Idempotent: if the existing row's sha256 matches the file's sha256, the
 * row is skipped (no re-embedding). The script can be re-run on every
 * crawl-vendors refresh and only newly-changed pages pay embedding cost.
 *
 * First-time setup downloads the model (~30MB for bge-small-en-v1.5) into
 * the cache directory. HUGGINGFACE_HUB_TOKEN is consulted IF present
 * (some HF mirrors rate-limit anonymous downloads). Subsequent runs are
 * fully offline.
 *
 * Default model: bge-small-en-v1.5 (384-dim). Override with VENDOR_EMBED_MODEL.
 */

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { EmbeddingModel, FlagEmbedding } from "fastembed";

// node:sqlite is stable in Node 22+ but still emits an ExperimentalWarning
// on some patch versions. Load it via createRequire to keep ESM import
// graph compatible with `tsx`.
const nodeRequire = createRequire(import.meta.url);
interface SqliteStmt {
  run(...args: unknown[]): unknown;
  get(...args: unknown[]): unknown;
  all(...args: unknown[]): unknown[];
}
interface SqliteDb {
  exec(sql: string): void;
  prepare(sql: string): SqliteStmt;
  close(): void;
}
interface SqliteModule {
  DatabaseSync: new (path: string) => SqliteDb;
}
const { DatabaseSync } = nodeRequire("node:sqlite") as SqliteModule;

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
const VAR_DIR = resolve(REPO_ROOT, "var");
const DB_PATH = join(VAR_DIR, "vendor-pages.db");
const CACHE_DIR = join(VAR_DIR, "fastembed-cache");

/**
 * The non-CUSTOM members of fastembed's EmbeddingModel enum. Matches the
 * constraint on FlagEmbedding.init's InitStandardOptions overload.
 */
type StandardModel = Exclude<EmbeddingModel, EmbeddingModel.CUSTOM>;

/**
 * Map a friendly model name string to the fastembed EmbeddingModel enum.
 * Falls back to BGESmallENV15 (bge-small-en-v1.5) if the operator passes
 * an unrecognized value (with a stderr warning so the operator notices).
 *
 * The set of models recognized here is the intersection of fastembed's
 * 2.x catalog and what fits inside the 30–600MB local-cache budget for a
 * solo founder's laptop. mxbai-embed-large-v1 is NOT in fastembed 2.x;
 * if the operator asks for it we fall back to bge-small-en-v1.5.
 */
function resolveModel(name: string): { id: StandardModel; label: string } {
  const normalized = name.toLowerCase();
  switch (normalized) {
    case "bge-small-en-v1.5":
    case "bgesmallenv15":
      return { id: EmbeddingModel.BGESmallENV15, label: "bge-small-en-v1.5" };
    case "bge-small-en":
    case "bgesmallen":
      return { id: EmbeddingModel.BGESmallEN, label: "bge-small-en" };
    case "bge-base-en-v1.5":
    case "bgebaseenv15":
      return { id: EmbeddingModel.BGEBaseENV15, label: "bge-base-en-v1.5" };
    case "bge-base-en":
    case "bgebaseen":
      return { id: EmbeddingModel.BGEBaseEN, label: "bge-base-en" };
    case "all-minilm-l6-v2":
    case "allminilml6v2":
      return { id: EmbeddingModel.AllMiniLML6V2, label: "all-MiniLM-L6-v2" };
    case "bge-small-zh-v1.5":
    case "bgesmallzh":
      return { id: EmbeddingModel.BGESmallZH, label: "bge-small-zh-v1.5" };
    case "multilingual-e5-large":
    case "mle5large":
      return { id: EmbeddingModel.MLE5Large, label: "multilingual-e5-large" };
    case "mxbai-embed-large-v1":
    case "mxbaiembedlargev1":
      process.stderr.write(
        "[backfill] mxbai-embed-large-v1 is not bundled with fastembed 2.x; falling back to bge-small-en-v1.5\n",
      );
      return { id: EmbeddingModel.BGESmallENV15, label: "bge-small-en-v1.5" };
    default:
      process.stderr.write(
        `[backfill] unknown VENDOR_EMBED_MODEL=${name}; falling back to bge-small-en-v1.5\n`,
      );
      return { id: EmbeddingModel.BGESmallENV15, label: "bge-small-en-v1.5" };
  }
}

function* walkMarkdown(root: string): Generator<string> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = readdirSync(root, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = join(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdown(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function ensureSchema(db: SqliteDb): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vendor_pages (
      url TEXT PRIMARY KEY,
      vendor TEXT NOT NULL,
      relpath TEXT NOT NULL,
      sha256 TEXT NOT NULL,
      embedding BLOB NOT NULL,
      dim INTEGER NOT NULL,
      text TEXT NOT NULL,
      model TEXT NOT NULL,
      mtime TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_vendor ON vendor_pages(vendor);
  `);
}

interface ExistingRow {
  sha256: string;
}

interface PageRecord {
  url: string;
  vendor: string;
  relpath: string;
  sha256: string;
  text: string;
  mtime: string;
}

function collectPages(): PageRecord[] {
  const out: PageRecord[] = [];
  for (const full of walkMarkdown(VENDOR_ROOT)) {
    const rel = relative(VENDOR_ROOT, full);
    const parts = rel.split(/[\\/]/);
    if (parts.length < 2) continue;
    const vendor = parts[0];
    const relpath = parts.slice(1).join("/");
    const text = readFileSync(full, "utf8");
    const stat = statSync(full);
    out.push({
      url: `${vendor}/${relpath}`,
      vendor,
      relpath,
      sha256: sha256(text),
      text,
      mtime: stat.mtime.toISOString(),
    });
  }
  return out;
}

function f32ToBlob(arr: Float32Array): Uint8Array {
  // node:sqlite accepts Uint8Array directly for BLOB columns. Slice via
  // a fresh ArrayBuffer copy so we don't accidentally hand SQLite a view
  // that overlaps reused TypedArray storage.
  const copy = new Uint8Array(arr.byteLength);
  copy.set(new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength));
  return copy;
}

async function main(): Promise<void> {
  // env reads — gated to this script per OSL1.
  const modelName = process.env.VENDOR_EMBED_MODEL ?? "bge-small-en-v1.5";
  const hfToken = process.env.HUGGINGFACE_HUB_TOKEN;
  if (hfToken) {
    process.stderr.write(
      "[backfill] HUGGINGFACE_HUB_TOKEN detected (used for first-time model download)\n",
    );
  }

  mkdirSync(VAR_DIR, { recursive: true });
  mkdirSync(CACHE_DIR, { recursive: true });

  const { id: modelId, label: modelLabel } = resolveModel(modelName);
  process.stderr.write(`[backfill] model=${modelLabel}\n`);

  const pages = collectPages();
  process.stderr.write(`[backfill] discovered ${pages.length} markdown pages\n`);

  const db = new DatabaseSync(DB_PATH);
  ensureSchema(db);

  const selectStmt = db.prepare(
    "SELECT sha256 FROM vendor_pages WHERE url = ?",
  );
  const upsertStmt = db.prepare(
    `INSERT INTO vendor_pages
       (url, vendor, relpath, sha256, embedding, dim, text, model, mtime)
     VALUES
       (@url, @vendor, @relpath, @sha256, @embedding, @dim, @text, @model, @mtime)
     ON CONFLICT(url) DO UPDATE SET
       sha256=excluded.sha256,
       embedding=excluded.embedding,
       dim=excluded.dim,
       text=excluded.text,
       model=excluded.model,
       mtime=excluded.mtime`,
  );

  const todo: PageRecord[] = [];
  for (const p of pages) {
    const existing = selectStmt.get(p.url) as ExistingRow | undefined;
    if (existing && existing.sha256 === p.sha256) continue;
    todo.push(p);
  }
  process.stderr.write(
    `[backfill] ${todo.length} pages need embedding (idempotent skip: ${
      pages.length - todo.length
    })\n`,
  );

  if (todo.length === 0) {
    db.close();
    return;
  }

  const embedder = await FlagEmbedding.init({
    model: modelId,
    cacheDir: CACHE_DIR,
  });

  const BATCH = 32;
  let done = 0;
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    const texts = batch.map((p) => p.text);
    // fastembed exposes an async-generator embed() — collect to an array.
    const vectors: number[][] = [];
    for await (const chunk of embedder.embed(texts, BATCH)) {
      for (const v of chunk) vectors.push(v as number[]);
    }
    if (vectors.length !== batch.length) {
      throw new Error(
        `[backfill] embedder returned ${vectors.length} vectors for ${batch.length} inputs`,
      );
    }

    // node:sqlite doesn't expose a transaction()-returns-function helper
    // like better-sqlite3; use explicit BEGIN/COMMIT to batch the upserts.
    db.exec("BEGIN");
    try {
      for (let j = 0; j < batch.length; j++) {
        const v = Float32Array.from(vectors[j]);
        const r = batch[j];
        upsertStmt.run({
          url: r.url,
          vendor: r.vendor,
          relpath: r.relpath,
          sha256: r.sha256,
          embedding: f32ToBlob(v),
          dim: v.length,
          text: r.text,
          model: modelLabel,
          mtime: r.mtime,
        });
      }
      db.exec("COMMIT");
    } catch (err) {
      db.exec("ROLLBACK");
      throw err;
    }

    done += batch.length;
    process.stderr.write(
      `[backfill] embedded ${done}/${todo.length} (${Math.round(
        (done / todo.length) * 100,
      )}%)\n`,
    );
  }

  db.close();
  process.stderr.write(`[backfill] done → ${DB_PATH}\n`);
}

main().catch((err) => {
  process.stderr.write(`[backfill] fatal: ${err?.stack ?? err}\n`);
  process.exit(1);
});
