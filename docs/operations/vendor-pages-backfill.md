# Operator runbook — vendor pages backfill (OEMBED-LOOP5)

`scripts/backfill-vendor-pages.ts` walks every `vendor/**/*.md` page in this
repo, embeds it with **fastembed** (local ONNX models, no remote API), and
writes the result into `./var/vendor-pages.db` (SQLite via `better-sqlite3`).

The chassis stays **OAuth-only** (OSL1): there are no Anthropic API keys
involved. The only env vars this script reads are optional model-selection
and Hugging Face model-download settings. No env reads happen anywhere under
`src/` — see `src/lib/vendor-pages-db.ts` (pure SQLite + JS math).

## First-time setup

1. Install dependencies (one-time, native build on first install of
   `better-sqlite3`):

   ```bash
   npm install
   ```

2. (Optional) If your network rate-limits anonymous Hugging Face downloads,
   export a token. Otherwise skip this step.

   ```bash
   export HUGGINGFACE_HUB_TOKEN=hf_xxx
   ```

3. Run the backfill:

   ```bash
   npm run backfill:vendor-pages
   ```

   On the first run, fastembed downloads the embedding model (about 30 MB
   for the default `bge-small-en-v1.5`, 384-dim) into
   `./var/fastembed-cache/`. Subsequent runs are fully offline.

## Subsequent runs

```bash
npm run backfill:vendor-pages
```

The script is **idempotent**: it computes `sha256` for each markdown file
and skips any row whose stored `sha256` already matches. After a normal
`npm run crawl:vendors` pass, only the pages that changed pay the
embedding cost.

## Model selection

Override the default model via the `VENDOR_EMBED_MODEL` environment variable:

```bash
VENDOR_EMBED_MODEL=bge-base-en-v1.5 npm run backfill:vendor-pages
```

Recognized values (more may exist depending on your fastembed version):

| Value | Dim | Notes |
| :--- | :--- | :--- |
| `bge-small-en-v1.5` (default) | 384 | ~30 MB on disk |
| `bge-base-en-v1.5` | 768 | ~100 MB on disk |
| `all-MiniLM-L6-v2` | 384 | Lightweight, fast |
| `mxbai-embed-large-v1` | 1024 | Best quality; ~600 MB |

Unknown values log a warning and fall back to `bge-small-en-v1.5`.

## Storage

| Path | Role |
| :--- | :--- |
| `./var/vendor-pages.db` | SQLite database. Gitignored (`var/`). |
| `./var/fastembed-cache/` | Local model cache. Gitignored. |
| `vendor/**/*.md` | Source of truth (committed). |

The database schema:

```sql
CREATE TABLE vendor_pages (
  url TEXT PRIMARY KEY,        -- "<vendor>/<relpath>"
  vendor TEXT NOT NULL,
  relpath TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  embedding BLOB NOT NULL,     -- raw bytes of Float32Array
  dim INTEGER NOT NULL,
  text TEXT NOT NULL,
  model TEXT NOT NULL,
  mtime TEXT NOT NULL
);
CREATE INDEX idx_vendor ON vendor_pages(vendor);
```

## Consuming the database

Read-only access from application code goes through
`src/lib/vendor-pages-db.ts`:

```ts
import { openVendorPagesDb } from "./lib/vendor-pages-db.js";

const handle = openVendorPagesDb("./var/vendor-pages.db");
handle.count();         // total rows
handle.listVendors();   // distinct vendors, sorted
handle.cosineSearch(queryVec, 10);  // top-k by cosine similarity
```

The helper performs **zero environment reads**. The fastembed loader and
HF-token check live only inside `scripts/backfill-vendor-pages.ts` — this
is enforced by:

```bash
git grep "VENDOR_EMBED\|HUGGINGFACE" src/   # MUST be empty
```

## CI policy

The backfill is **not** run in CI: it requires the one-time model download
and is far too slow for per-PR jobs. The npm script is operator-invoked
only. The smoke test (`src/lib/vendor-pages-db.test.ts`) uses an in-memory
SQLite fixture with hand-coded vectors and runs in `smoke:replay` —
no fastembed dependency at test time.

## See also

- `src/lib/vendor-pages-db.ts` — read-only helper module
- `src/lib/vendor-pages-db.test.ts` — smoke test (in-memory SQLite fixture)
- `scripts/backfill-vendor-pages.ts` — the backfill walker
- OEMBED1 (parallel PR) — the strategic pivot from Voyage to fastembed
