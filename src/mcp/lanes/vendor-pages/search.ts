/**
 * vendor_pages_search MCP tool (LOOP-3 / OEMBED-LOOP3).
 *
 * Input:  { query: string, k?: number = 10, vendor?: string }
 * Output: { matches: Array<{url, vendor, relpath, score, snippet}>, query_dim, model }
 *
 * Pipeline:
 *   1. Embed the query string via the local embedder (fastembed-equivalent;
 *      this chassis uses @xenova/transformers as the in-process backend per
 *      src/lib/embeddings.ts and the OEMBED1 ADR).
 *   2. cosineSearch() against ./var/vendor-pages.db (built by LOOP-5's
 *      scripts/backfill-vendor-pages.ts).
 *   3. Take top-k, return snippet = first 300 chars of each match's text.
 *
 * If ./var/vendor-pages.db is missing or empty, returns:
 *   { error: "vendor_pages DB not built — run npm run backfill:vendor-pages", matches: [] }
 *
 * OSL1: the embedder reads no env vars at inference time (fastembed /
 * @xenova/transformers run fully local). The model-download env var
 * HUGGINGFACE_HUB_TOKEN is only consulted by the backfill script, not
 * here. This tool can be invoked safely from any sandboxed surface.
 *
 * Output discipline: snippet truncated to 300 chars; matches capped at 20
 * regardless of k. Matches the convention from md_quality_top_offenders.
 */
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../../bridge-utils.js";
import {
  openVendorPagesDb,
  type VendorPagesDb,
  type VendorPageRow,
} from "../../../lib/vendor-pages-db.js";

export const DEFAULT_DB_PATH = resolve(process.cwd(), "var", "vendor-pages.db");
export const SNIPPET_CHARS = 300;
export const MAX_MATCHES = 20;
export const DEFAULT_MODEL_ID = "Xenova/all-MiniLM-L6-v2";

export interface SearchInput {
  query: string;
  k?: number;
  vendor?: string;
}

export interface SearchMatch {
  url: string;
  vendor: string;
  relpath: string;
  score: number;
  snippet: string;
}

export interface SearchResult {
  matches: SearchMatch[];
  query_dim: number;
  model: string;
  error?: string;
}

/**
 * Pluggable embedder. The default uses src/lib/embeddings.ts (lazy-loaded).
 * Tests inject a deterministic stub so CI stays offline and fast.
 */
export type Embedder = (text: string) => Promise<Float32Array>;

let cachedEmbedder: Embedder | null = null;
async function defaultEmbedder(text: string): Promise<Float32Array> {
  if (!cachedEmbedder) {
    // Lazy import keeps tsx startup fast: the model is only loaded the
    // first time the tool is actually invoked. Imports src/lib/embeddings.ts
    // which wraps @xenova/transformers (the fastembed-equivalent for this
    // chassis per the OEMBED1 ADR).
    const mod = await import("../../../lib/embeddings.js");
    cachedEmbedder = (t: string) => mod.embed(t);
  }
  return cachedEmbedder(text);
}

export interface SearchDeps {
  /** Override the embedder. Default lazy-loads src/lib/embeddings. */
  embedder?: Embedder;
  /** Override the DB opener. Default opens ./var/vendor-pages.db. */
  openDb?: (path: string) => VendorPagesDb;
  /** Override the DB path. */
  dbPath?: string;
  /** Override the model identifier reported in the response. */
  model?: string;
}

/**
 * Core handler. Pure: takes deps, returns the JSON payload. The MCP
 * tool registration is a thin wrapper around this.
 */
export async function vendorPagesSearch(
  input: SearchInput,
  deps: SearchDeps = {}
): Promise<SearchResult> {
  const k = Math.min(Math.max(1, input.k ?? 10), MAX_MATCHES);
  const dbPath = deps.dbPath ?? DEFAULT_DB_PATH;
  const model = deps.model ?? DEFAULT_MODEL_ID;
  const embedder = deps.embedder ?? defaultEmbedder;

  // Bail closed if the DB isn't built. The 0-byte branch protects against
  // a half-written file from a crashed backfill.
  if (!deps.openDb) {
    if (!existsSync(dbPath) || statSync(dbPath).size === 0) {
      return {
        matches: [],
        query_dim: 0,
        model,
        error:
          "vendor_pages DB not built — run npm run backfill:vendor-pages",
      };
    }
  }

  const query = await embedder(input.query);
  const opener = deps.openDb ?? openVendorPagesDb;
  const db = opener(dbPath);

  let raw: VendorPageRow[];
  try {
    raw = db.cosineSearch(query, k, input.vendor);
  } finally {
    db.close();
  }

  const matches: SearchMatch[] = raw.slice(0, MAX_MATCHES).map((r) => ({
    url: r.url,
    vendor: r.vendor,
    relpath: r.relpath,
    score: r.score,
    snippet:
      r.text.length > SNIPPET_CHARS
        ? r.text.slice(0, SNIPPET_CHARS)
        : r.text,
  }));

  return {
    matches,
    query_dim: query.length,
    model,
  };
}

export function registerVendorPagesSearch(server: McpServer): void {
  server.tool(
    "vendor_pages_search",
    "Semantic search over the local vendor pages SQLite store (./var/vendor-pages.db, built by npm run backfill:vendor-pages). Embeds the query in-process (no network, no env vars) and returns the top-k matches by cosine similarity. Each match: {url, vendor, relpath, score, snippet (first 300 chars)}. Returns error + empty matches if the DB hasn't been built.",
    {
      query: z.string().min(1),
      k: z.number().int().min(1).max(MAX_MATCHES).optional(),
      vendor: z.string().min(1).optional(),
    },
    async ({ query, k, vendor }) => {
      const result = await vendorPagesSearch({
        query,
        ...(k !== undefined ? { k } : {}),
        ...(vendor !== undefined ? { vendor } : {}),
      });
      return jsonResult(result);
    }
  );
}
