/**
 * Vendor pages SQLite-backed store.
 *
 * Shape declared by LOOP-5 (scripts/backfill-vendor-pages.ts + ./var/vendor-pages.db).
 * This file is vendored defensively into LOOP-3's branch so it type-checks
 * before LOOP-5 lands on main. Same content = clean dedupe at merge time.
 *
 * Backend: node:sqlite (stable in Node 22+). Cosine search is in-process
 * over a Float32Array column stored as BLOB. Embeddings come in
 * pre-computed; this module knows nothing about fastembed.
 *
 * OSL1: this module reads no env vars. The DB path is passed explicitly
 * by the caller. node:sqlite is loaded via createRequire so the binding
 * cost is paid only on first `openVendorPagesDb()` call, keeping cold
 * starts and stub-based tests free of the native binding.
 */

import { createRequire } from "node:module";

export interface VendorPageRow {
  url: string;
  vendor: string;
  relpath: string;
  text: string;
  score: number;
}

export interface VendorPagesDb {
  listVendors(): string[];
  count(): number;
  cosineSearch(
    query: Float32Array,
    k: number,
    vendor?: string
  ): VendorPageRow[];
  close(): void;
}

interface SqliteStmt {
  all(...args: unknown[]): unknown[];
  get(...args: unknown[]): unknown;
}
interface SqliteDb {
  prepare(sql: string): SqliteStmt;
  close(): void;
}
interface SqliteModule {
  DatabaseSync: new (path: string) => SqliteDb;
}

let sqliteMod: SqliteModule | null = null;
function loadSqlite(): SqliteModule {
  if (sqliteMod) return sqliteMod;
  const req = createRequire(import.meta.url);
  sqliteMod = req("node:sqlite") as SqliteModule;
  return sqliteMod;
}

/**
 * Open the on-disk vendor_pages SQLite DB. Synchronous to match the shape
 * declared by LOOP-5's prompt.
 */
export function openVendorPagesDb(path: string): VendorPagesDb {
  const { DatabaseSync } = loadSqlite();
  const db = new DatabaseSync(path);

  const listStmt = db.prepare(
    "SELECT DISTINCT vendor FROM vendor_pages ORDER BY vendor"
  );
  const countStmt = db.prepare("SELECT COUNT(*) AS n FROM vendor_pages");

  return {
    listVendors(): string[] {
      const rows = listStmt.all() as Array<{ vendor: string }>;
      return rows.map((r) => r.vendor);
    },
    count(): number {
      const row = countStmt.get() as { n: number } | undefined;
      return row?.n ?? 0;
    },
    cosineSearch(
      query: Float32Array,
      k: number,
      vendor?: string
    ): VendorPageRow[] {
      const sql = vendor
        ? "SELECT url, vendor, relpath, text, embedding FROM vendor_pages WHERE vendor = ?"
        : "SELECT url, vendor, relpath, text, embedding FROM vendor_pages";
      const args = vendor ? [vendor] : [];
      const rows = db.prepare(sql).all(...args) as Array<{
        url: string;
        vendor: string;
        relpath: string;
        text: string;
        embedding: Uint8Array;
      }>;
      const scored: VendorPageRow[] = [];
      for (const r of rows) {
        const emb = new Float32Array(
          r.embedding.buffer,
          r.embedding.byteOffset,
          r.embedding.byteLength / 4
        );
        if (emb.length !== query.length) continue;
        let s = 0;
        for (let i = 0; i < emb.length; i += 1) {
          s += (emb[i] ?? 0) * (query[i] ?? 0);
        }
        scored.push({
          url: r.url,
          vendor: r.vendor,
          relpath: r.relpath,
          text: r.text,
          score: s,
        });
      }
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, k);
    },
    close(): void {
      db.close();
    },
  };
}
