// Citations:
//   @cite seeds/courses/skilljar/introduction-to-claude-cowork__cowork.txt
//   @cite rubrics/md-quality-v1.md
//
// Smoke test for the read-only vendor-pages-db helper. Builds a temp on-disk
// SQLite database with three hand-coded rows (no fastembed dependency, no
// dependency on ./var/vendor-pages.db existing), opens it with the
// node:sqlite-backed `openVendorPagesDb` helper, and asserts cosineSearch
// ranks the closest row first.
//
// This test runs in smoke:replay. It must remain self-contained — do NOT add
// fastembed or filesystem reads under var/ here. The actual model-backed
// backfill is operator-invoked via the backfill:vendor-pages npm script and
// is covered by scripts/backfill-vendor-pages.ts, not by this test.

import { strict as assert } from "node:assert";
import { mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { openVendorPagesDb } from "./vendor-pages-db.js";

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { DatabaseSync } = require("node:sqlite") as {
  DatabaseSync: new (path: string) => {
    exec(sql: string): void;
    prepare(sql: string): {
      run(...args: unknown[]): unknown;
    };
    close(): void;
  };
};

/**
 * Encode a Float32Array as raw bytes for storage in a SQLite BLOB column.
 * Mirrors the encoding used by scripts/backfill-vendor-pages.ts.
 */
function f32ToBlob(arr: Float32Array): Uint8Array {
  return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}

interface Fixture {
  dbPath: string;
  cleanup(): void;
}

function buildFixture(): Fixture {
  const dir = mkdtempSync(join(tmpdir(), "vendor-pages-db-test-"));
  const dbPath = join(dir, "fixture.db");
  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE vendor_pages (
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
    CREATE INDEX idx_vendor ON vendor_pages(vendor);
  `);

  const rows: Array<{
    url: string;
    vendor: string;
    relpath: string;
    embedding: Float32Array;
    text: string;
  }> = [
    {
      url: "anthropics/docs/cowork-intro.md",
      vendor: "anthropics",
      relpath: "docs/cowork-intro.md",
      // Aligned with our query — should win.
      embedding: new Float32Array([1.0, 0.0, 0.0, 0.0]),
      text: "Introduction to Claude Cowork",
    },
    {
      url: "neon/docs/branching.md",
      vendor: "neon",
      relpath: "docs/branching.md",
      // 45 degrees off the query — second place.
      embedding: new Float32Array([0.7071, 0.7071, 0.0, 0.0]),
      text: "Neon branching guide",
    },
    {
      url: "stripe/docs/checkout.md",
      vendor: "stripe",
      relpath: "docs/checkout.md",
      // Orthogonal to the query — third place.
      embedding: new Float32Array([0.0, 1.0, 0.0, 0.0]),
      text: "Stripe Checkout overview",
    },
  ];

  const insert = db.prepare(
    `INSERT INTO vendor_pages
      (url, vendor, relpath, sha256, embedding, dim, text, model, mtime)
     VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  for (const r of rows) {
    insert.run(
      r.url,
      r.vendor,
      r.relpath,
      `sha-${r.url}`,
      f32ToBlob(r.embedding),
      r.embedding.length,
      r.text,
      "fixture/test-model",
      "2026-05-19T00:00:00.000Z",
    );
  }

  db.close();

  return {
    dbPath,
    cleanup() {
      rmSync(dir, { recursive: true, force: true });
    },
  };
}

test("listVendors returns distinct vendors in alphabetical order", () => {
  const fx = buildFixture();
  try {
    const handle = openVendorPagesDb(fx.dbPath);
    assert.deepEqual(handle.listVendors(), ["anthropics", "neon", "stripe"]);
    handle.close();
  } finally {
    fx.cleanup();
  }
});

test("count returns the total number of rows in the table", () => {
  const fx = buildFixture();
  try {
    const handle = openVendorPagesDb(fx.dbPath);
    assert.equal(handle.count(), 3);
    handle.close();
  } finally {
    fx.cleanup();
  }
});

test("cosineSearch ranks the most-aligned row first", () => {
  const fx = buildFixture();
  try {
    const handle = openVendorPagesDb(fx.dbPath);

    // Query points along the first axis — should match the anthropics row.
    const query = new Float32Array([1.0, 0.0, 0.0, 0.0]);
    const hits = handle.cosineSearch(query, 3);

    assert.equal(hits.length, 3);
    assert.equal(hits[0].vendor, "anthropics");
    assert.equal(hits[0].relpath, "docs/cowork-intro.md");
    assert.equal(hits[1].vendor, "neon");
    assert.equal(hits[2].vendor, "stripe");

    // Scores must be monotonically non-increasing.
    assert.ok(hits[0].score >= hits[1].score);
    assert.ok(hits[1].score >= hits[2].score);

    // Top hit is along the query axis; dot product == 1 within float epsilon.
    assert.ok(Math.abs(hits[0].score - 1.0) < 1e-5, `top score ${hits[0].score}`);
    handle.close();
  } finally {
    fx.cleanup();
  }
});

test("cosineSearch with k=0 returns an empty array", () => {
  const fx = buildFixture();
  try {
    const handle = openVendorPagesDb(fx.dbPath);
    const hits = handle.cosineSearch(new Float32Array([1, 0, 0, 0]), 0);
    assert.deepEqual(hits, []);
    handle.close();
  } finally {
    fx.cleanup();
  }
});

test("cosineSearch caps results to k", () => {
  const fx = buildFixture();
  try {
    const handle = openVendorPagesDb(fx.dbPath);
    const hits = handle.cosineSearch(new Float32Array([1, 0, 0, 0]), 1);
    assert.equal(hits.length, 1);
    assert.equal(hits[0].vendor, "anthropics");
    handle.close();
  } finally {
    fx.cleanup();
  }
});
