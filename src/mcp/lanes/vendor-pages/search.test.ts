/**
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 * @cite rubrics/md-quality-v1.md
 *
 * Smoke test for the vendor_pages_search MCP tool (LOOP-3 / OEMBED-LOOP3).
 *
 * Builds an in-memory store of 5 hand-coded "vendor pages" with hand-coded
 * 4-dim embeddings, calls the search handler directly (not over MCP
 * transport — that's integration), asserts the top match for a known query
 * is the expected URL and the snippet is truncated to <= 300 chars.
 *
 * Uses a stub embedder that returns deterministic float arrays for test
 * inputs — does NOT depend on fastembed / @xenova/transformers actually
 * running. CI stays fast and offline.
 *
 * The DB-missing branch is also exercised: when no DB exists, the handler
 * must return { error, matches: [] } without throwing.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  vendorPagesSearch,
  type Embedder,
  type SearchResult,
} from "./search.js";
import type {
  VendorPagesDb,
  VendorPageRow,
} from "../../../lib/vendor-pages-db.js";

interface StubPage {
  url: string;
  vendor: string;
  relpath: string;
  text: string;
  embedding: Float32Array;
}

function makeStubDb(pages: StubPage[]): VendorPagesDb {
  return {
    listVendors(): string[] {
      return Array.from(new Set(pages.map((p) => p.vendor))).sort();
    },
    count(): number {
      return pages.length;
    },
    cosineSearch(query: Float32Array, k: number, vendor?: string): VendorPageRow[] {
      const filtered = vendor ? pages.filter((p) => p.vendor === vendor) : pages;
      const scored = filtered.map((p) => {
        let s = 0;
        for (let i = 0; i < query.length; i += 1) {
          s += (query[i] ?? 0) * (p.embedding[i] ?? 0);
        }
        return {
          url: p.url,
          vendor: p.vendor,
          relpath: p.relpath,
          text: p.text,
          score: s,
        };
      });
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, k);
    },
    close(): void {
      /* no-op for the stub */
    },
  };
}

const PAGES: StubPage[] = [
  {
    url: "https://docs.anthropic.com/en/docs/agents",
    vendor: "anthropics",
    relpath: "platform.claude.com/docs/en/agents.md",
    text: "Claude agents orchestrate sub-agents over MCP tools. ".repeat(20),
    embedding: new Float32Array([1, 0, 0, 0]),
  },
  {
    url: "https://docs.cloudflare.com/workers",
    vendor: "cloudflare",
    relpath: "workers/index.md",
    text: "Cloudflare Workers run JavaScript on the edge.",
    embedding: new Float32Array([0, 1, 0, 0]),
  },
  {
    url: "https://neon.tech/docs/serverless",
    vendor: "neon",
    relpath: "serverless.md",
    text: "Neon serverless Postgres separates storage from compute.",
    embedding: new Float32Array([0, 0, 1, 0]),
  },
  {
    url: "https://stripe.com/docs/api/checkout",
    vendor: "stripe",
    relpath: "api/checkout.md",
    text: "Stripe Checkout is the recommended payment surface.",
    embedding: new Float32Array([0, 0, 0, 1]),
  },
  {
    url: "https://docs.anthropic.com/en/docs/glossary",
    vendor: "anthropics",
    relpath: "platform.claude.com/docs/en/glossary.md",
    text: "MCP, tool use, and other Claude platform terms.",
    embedding: new Float32Array([0.9, 0.1, 0, 0]),
  },
];

// Deterministic stub embedder: maps known phrases to known unit vectors.
const stubEmbedder: Embedder = async (text: string): Promise<Float32Array> => {
  const t = text.toLowerCase();
  if (t.includes("agent") || t.includes("mcp")) return new Float32Array([1, 0, 0, 0]);
  if (t.includes("worker") || t.includes("edge")) return new Float32Array([0, 1, 0, 0]);
  if (t.includes("postgres") || t.includes("neon")) return new Float32Array([0, 0, 1, 0]);
  if (t.includes("payment") || t.includes("stripe")) return new Float32Array([0, 0, 0, 1]);
  // Default: equally weighted; surfaces nothing in particular.
  return new Float32Array([0.5, 0.5, 0.5, 0.5]);
};

test("vendor_pages_search top match for agent query is the agents page", async () => {
  const result: SearchResult = await vendorPagesSearch(
    { query: "how do Claude agents use MCP", k: 3 },
    {
      embedder: stubEmbedder,
      openDb: () => makeStubDb(PAGES),
      dbPath: "/dev/null/stub-not-read",
      model: "stub-model",
    }
  );

  assert.equal(result.error, undefined, "should not error with stub DB");
  assert.equal(result.model, "stub-model");
  assert.equal(result.query_dim, 4);
  assert.ok(result.matches.length > 0, "expected at least one match");
  assert.equal(
    result.matches[0]?.url,
    "https://docs.anthropic.com/en/docs/agents",
    "top match should be the agents doc"
  );
  assert.ok(
    result.matches.length <= 3,
    `expected at most k=3 matches, got ${result.matches.length}`
  );
});

test("vendor_pages_search vendor filter narrows results", async () => {
  const result = await vendorPagesSearch(
    { query: "payment", k: 10, vendor: "stripe" },
    {
      embedder: stubEmbedder,
      openDb: () => makeStubDb(PAGES),
      dbPath: "/dev/null/stub-not-read",
    }
  );

  assert.equal(result.matches.length, 1, "vendor filter should yield exactly the stripe page");
  assert.equal(result.matches[0]?.vendor, "stripe");
});

test("vendor_pages_search truncates snippets to <= 300 chars", async () => {
  const result = await vendorPagesSearch(
    { query: "agents mcp", k: 1 },
    {
      embedder: stubEmbedder,
      openDb: () => makeStubDb(PAGES),
      dbPath: "/dev/null/stub-not-read",
    }
  );
  assert.ok(result.matches[0], "should have a top match");
  assert.ok(
    result.matches[0].snippet.length <= 300,
    `expected snippet <= 300 chars, got ${result.matches[0].snippet.length}`
  );
});

test("vendor_pages_search caps matches at 20 regardless of k", async () => {
  // Build a stub of 50 pages so we can probe the cap.
  const many: StubPage[] = Array.from({ length: 50 }, (_, i) => ({
    url: `https://example.com/p${i}`,
    vendor: "example",
    relpath: `p${i}.md`,
    text: `page ${i}`,
    embedding: new Float32Array([1, 0, 0, 0]),
  }));
  // k is clamped to MAX_MATCHES (20) before being passed down.
  const result = await vendorPagesSearch(
    { query: "agents", k: 100 as number },
    {
      embedder: stubEmbedder,
      openDb: () => makeStubDb(many),
      dbPath: "/dev/null/stub-not-read",
    }
  );
  assert.ok(
    result.matches.length <= 20,
    `expected <= 20 matches, got ${result.matches.length}`
  );
});

test("vendor_pages_search returns DB-missing error when ./var/vendor-pages.db absent", async () => {
  // No openDb override → real existsSync runs against the bogus path.
  const result = await vendorPagesSearch(
    { query: "anything", k: 5 },
    { dbPath: "/tmp/does-not-exist-vendor-pages.db", embedder: stubEmbedder }
  );
  assert.equal(result.matches.length, 0);
  assert.match(result.error ?? "", /not built/);
});
