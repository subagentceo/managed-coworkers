/**
 * @cite vendor/alloydb-omni/urls.md
 *
 * OPMP4 — Site domain entity round-trip test.
 *
 * Asserts:
 *   1. SITE_COLUMNS matches the column declarations in 0002_sites.sql.
 *   2. Constructor defaults behave per the spec.
 *   3. Branded SiteId compiles + the entity has the expected `kind`.
 *
 * Internal references — citation-guard accepts only vendor/ / seeds/ /
 * rubrics/, so these are listed as comments, not citations:
 *   - infra/alloydb/migrations/0002_sites.sql
 *   - src/domain/portfolio/Site.ts
 *   - packages/knowledge-work-plugins/product-management/site-portfolio.example.json
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE_COLUMNS, Site, type SiteId } from "./Site.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const MIGRATION_PATH = resolve(REPO_ROOT, "infra/alloydb/migrations/0002_sites.sql");

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function fail(msg: string): never {
  throw new Error(msg);
}

console.log("Site:");

check("SITE_COLUMNS matches migration column declarations", () => {
  const migration = readFileSync(MIGRATION_PATH, "utf8");
  for (const col of SITE_COLUMNS) {
    // Each column should appear at the start of a line inside the
    // CREATE TABLE block as `  <colname> <type>`.
    const re = new RegExp(`^\\s+${col}\\s+(TEXT|TIMESTAMPTZ|TEXT\\[\\])\\b`, "m");
    if (!re.test(migration)) {
      fail(`migration missing column declaration for "${col}"`);
    }
  }
});

check("constructor defaults niche=unspecified, owner=unspecified, targetKeywords=[]", () => {
  const s = new Site({
    id: "zone-abc-123" as SiteId,
    hostname: "example.com",
  });
  if (s.niche !== "unspecified") fail(`niche default: ${s.niche}`);
  if (s.owner !== "unspecified") fail(`owner default: ${s.owner}`);
  if (s.targetKeywords.length !== 0) fail(`targetKeywords default not empty`);
  if (s.searchConsoleProperty !== null) fail(`searchConsoleProperty default: ${s.searchConsoleProperty}`);
});

check("kind discriminator is Site", () => {
  const s = new Site({ id: "z" as SiteId, hostname: "x.com" });
  if (s.kind !== "Site") fail(`kind: ${s.kind}`);
});

check("constructor accepts all optional fields", () => {
  const s = new Site({
    id: "zone-xyz" as SiteId,
    hostname: "sub.example.com",
    niche: "ai-tools",
    targetKeywords: ["claude code", "agent sdk"],
    owner: "alex",
    searchConsoleProperty: "sc-domain:example.com",
  });
  if (s.niche !== "ai-tools") fail(`niche`);
  if (s.targetKeywords.length !== 2) fail(`targetKeywords length`);
  if (s.searchConsoleProperty !== "sc-domain:example.com") fail(`gsc property`);
});

check("hostname has a UNIQUE index in the migration", () => {
  const migration = readFileSync(MIGRATION_PATH, "utf8");
  if (!/CREATE UNIQUE INDEX[\s\S]+sites\s*\(hostname\)/i.test(migration)) {
    fail(`migration missing UNIQUE index on hostname`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
