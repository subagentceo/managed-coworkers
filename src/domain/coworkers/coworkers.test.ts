/**
 * @cite vendor/alloydb-omni/urls.md
 * @cite vendor/redis/urls.md
 *
 * ODEP2 — CoworkerSession round-trip test.
 *
 * Asserts:
 *   1. Every enum value matches the corresponding CHECK constraint in
 *      `infra/alloydb/migrations/0001_init.sql`.
 *   2. The TypeScript field set matches the SQL column set.
 *   3. redisKey follows the namespace pattern from docs/data/redis-keys.md.
 *   4. The TICKET_REF_PATTERN validator accepts/rejects expected inputs.
 *
 * Internal references — citation-guard accepts only vendor/ / seeds/ /
 * rubrics/, so these are listed as comments, not citations:
 *   - infra/alloydb/migrations/0001_init.sql
 *   - docs/data/redis-keys.md
 *   - docs/CONVENTIONS.md
 *   - packages/knowledge-work-plugins/data-engineering/coworker-context.md
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  COWORKER_SESSIONS_COLUMNS,
  CoworkerName,
  CoworkerSession,
  CoworkerSessionStatus,
  isTicketRef,
} from "./CoworkerSession.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const MIGRATION_PATH = resolve(
  REPO_ROOT,
  "infra/alloydb/migrations/0001_init.sql",
);

function fail(msg: string): never {
  throw new Error(msg);
}

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

console.log("CoworkerSession:");

check("CoworkerName values are kebab-case domain slugs", () => {
  if (CoworkerName.ProductManagement !== "product-management") {
    fail(`expected "product-management", got ${CoworkerName.ProductManagement}`);
  }
  if (CoworkerName.DataEngineering !== "data-engineering") {
    fail(`expected "data-engineering", got ${CoworkerName.DataEngineering}`);
  }
});

check("CoworkerSessionStatus values match migration CHECK constraint", () => {
  const migration = readFileSync(MIGRATION_PATH, "utf8");
  for (const status of Object.values(CoworkerSessionStatus)) {
    if (!migration.includes(`'${status}'`)) {
      fail(`migration missing status literal '${status}'`);
    }
  }
});

check("CoworkerName values match migration CHECK constraint", () => {
  const migration = readFileSync(MIGRATION_PATH, "utf8");
  for (const name of Object.values(CoworkerName)) {
    if (!migration.includes(`'${name}'`)) {
      fail(`migration missing coworker literal '${name}'`);
    }
  }
});

check("COWORKER_SESSIONS_COLUMNS matches migration column set", () => {
  const migration = readFileSync(MIGRATION_PATH, "utf8");
  // Crude but sufficient: each column should appear at the start of a line
  // inside the CREATE TABLE block as `  <colname> <type>`.
  for (const col of COWORKER_SESSIONS_COLUMNS) {
    const re = new RegExp(`^\\s+${col}\\s+(TEXT|TIMESTAMPTZ)\\b`, "m");
    if (!re.test(migration)) {
      fail(`migration missing column declaration for "${col}"`);
    }
  }
});

check("constructor defaults status=running, finishedAt=null, ticketRef=null", () => {
  const s = new CoworkerSession({
    id: "test-1",
    coworker: CoworkerName.ProductManagement,
    outcomeId: "OPMP1",
  });
  if (s.status !== CoworkerSessionStatus.Running) {
    fail(`expected default status running, got ${s.status}`);
  }
  if (s.finishedAt !== null) fail(`expected default finishedAt null`);
  if (s.ticketRef !== null) fail(`expected default ticketRef null`);
});

check("redisKey follows coworker:<vertical>:session:<id> pattern", () => {
  const s = new CoworkerSession({
    id: "abc-123",
    coworker: CoworkerName.DataEngineering,
    outcomeId: "ODEP2",
  });
  if (s.redisKey !== "coworker:data-engineering:session:abc-123") {
    fail(`bad redisKey: ${s.redisKey}`);
  }
});

check("kind discriminator is CoworkerSession", () => {
  const s = new CoworkerSession({
    id: "x",
    coworker: CoworkerName.ProductManagement,
    outcomeId: "OPMP1",
  });
  if (s.kind !== "CoworkerSession") fail(`bad kind: ${s.kind}`);
});

check("isTicketRef accepts gh- and jira- formats; rejects junk", () => {
  if (!isTicketRef("gh-subagentceo/managed-coworkers#113"))
    fail("should accept gh- ref");
  if (!isTicketRef("jira-COWORK-42")) fail("should accept jira- ref");
  if (isTicketRef("just-some-string")) fail("should reject loose strings");
  if (isTicketRef("gh-foo#42")) fail("should reject gh- without owner/repo");
  if (isTicketRef("JIRA-42")) fail("should reject jira- without prefix");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
