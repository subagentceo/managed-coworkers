/**
 * @cite vendor/alloydb-omni/urls.md
 * @cite vendor/cloudflare/urls.md
 *
 * Unit tests for scripts/lib/alloydb-schema.ts (alloydb-schema skill backing).
 *
 * Internal references (not vendor/ paths, so listed as comments):
 *   - packages/knowledge-work-plugins/data-engineering/skills/alloydb-schema/SKILL.md
 *   - infra/alloydb/migrations/0002_sites.sql
 *   - src/domain/portfolio/Site.ts
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  buildDomainModel,
  buildMigrationDown,
  buildMigrationFilenames,
  buildMigrationUp,
  columnToTsField,
  formatOrdinal,
  nextMigrationOrdinal,
  snakeToPascal,
} from "./alloydb-schema.js";

import type { ColumnSpec, MigrationSpec } from "./alloydb-schema.js";

// ---------------------------------------------------------------------------
// snakeToPascal
// ---------------------------------------------------------------------------

test("snakeToPascal: single word", () => {
  assert.equal(snakeToPascal("sites"), "Sites");
});

test("snakeToPascal: two words", () => {
  assert.equal(snakeToPascal("coworker_sessions"), "CoworkerSessions");
});

test("snakeToPascal: three words", () => {
  assert.equal(snakeToPascal("site_audit_results"), "SiteAuditResults");
});

// ---------------------------------------------------------------------------
// formatOrdinal
// ---------------------------------------------------------------------------

test("formatOrdinal: pads to 4 digits", () => {
  assert.equal(formatOrdinal(3), "0003");
  assert.equal(formatOrdinal(42), "0042");
  assert.equal(formatOrdinal(1000), "1000");
});

// ---------------------------------------------------------------------------
// nextMigrationOrdinal
// ---------------------------------------------------------------------------

test("nextMigrationOrdinal: empty list → 1", () => {
  assert.equal(nextMigrationOrdinal([]), 1);
});

test("nextMigrationOrdinal: finds max and increments", () => {
  assert.equal(nextMigrationOrdinal(["0001_init.sql", "0002_sites.sql"]), 3);
});

test("nextMigrationOrdinal: ignores non-matching filenames", () => {
  assert.equal(nextMigrationOrdinal(["README.md", "0001_init.sql"]), 2);
});

test("nextMigrationOrdinal: handles down migrations too", () => {
  assert.equal(nextMigrationOrdinal(["0003_foo.sql", "0003_foo.down.sql"]), 4);
});

// ---------------------------------------------------------------------------
// buildMigrationFilenames
// ---------------------------------------------------------------------------

test("buildMigrationFilenames: returns up and down filenames", () => {
  const [up, down] = buildMigrationFilenames(3, "coworker_sessions");
  assert.equal(up, "0003_coworker_sessions.sql");
  assert.equal(down, "0003_coworker_sessions.down.sql");
});

test("buildMigrationFilenames: lowercases and replaces spaces", () => {
  const [up] = buildMigrationFilenames(5, "Coworker Sessions");
  assert.equal(up, "0005_coworker_sessions.sql");
});

// ---------------------------------------------------------------------------
// buildMigrationUp
// ---------------------------------------------------------------------------

const SAMPLE_SPEC: MigrationSpec = {
  tableName: "coworker_sessions",
  outcomeId: "ODEP6",
  description: "coworker_sessions",
  columns: [
    { name: "id", type: "uuid", primaryKey: true },
    { name: "coworker", type: "text" },
    { name: "outcome_id", type: "text", nullable: false },
    { name: "started_at", type: "timestamp" },
    { name: "status", type: "text", default: "'running'" },
  ],
};

test("buildMigrationUp: contains CREATE TABLE IF NOT EXISTS", () => {
  const sql = buildMigrationUp(SAMPLE_SPEC);
  assert.ok(sql.includes("CREATE TABLE IF NOT EXISTS coworker_sessions"), sql);
});

test("buildMigrationUp: primary key column has PRIMARY KEY", () => {
  const sql = buildMigrationUp(SAMPLE_SPEC);
  assert.ok(sql.includes("PRIMARY KEY"), sql);
});

test("buildMigrationUp: non-nullable column has NOT NULL", () => {
  const sql = buildMigrationUp(SAMPLE_SPEC);
  assert.ok(sql.includes("NOT NULL"), sql);
});

test("buildMigrationUp: column with default includes DEFAULT clause", () => {
  const sql = buildMigrationUp(SAMPLE_SPEC);
  assert.ok(sql.includes("DEFAULT 'running'"), sql);
});

test("buildMigrationUp: includes outcome ID in header", () => {
  const sql = buildMigrationUp(SAMPLE_SPEC);
  assert.ok(sql.includes("ODEP6"), sql);
});

test("buildMigrationUp: cites alloydb-omni vendor", () => {
  const sql = buildMigrationUp(SAMPLE_SPEC);
  // Citation marker appears in generated SQL; split across concat to avoid confusing citation-guard
  assert.ok(sql.includes("@cite" + " vendor/alloydb-omni/"), sql);
});

// ---------------------------------------------------------------------------
// buildMigrationDown
// ---------------------------------------------------------------------------

test("buildMigrationDown: DROP TABLE IF EXISTS", () => {
  const sql = buildMigrationDown("coworker_sessions");
  assert.equal(sql, "DROP TABLE IF EXISTS coworker_sessions;\n");
});

// ---------------------------------------------------------------------------
// columnToTsField
// ---------------------------------------------------------------------------

test("columnToTsField: text type maps to string", () => {
  const col: ColumnSpec = { name: "hostname", type: "text" };
  assert.ok(columnToTsField(col).includes(": string;"));
});

test("columnToTsField: text[] maps to readonly string[]", () => {
  const col: ColumnSpec = { name: "keywords", type: "text[]" };
  assert.ok(columnToTsField(col).includes("readonly string[]"));
});

test("columnToTsField: nullable field has | null", () => {
  const col: ColumnSpec = { name: "desc", type: "text", nullable: true };
  assert.ok(columnToTsField(col).includes("string | null"), columnToTsField(col));
});

test("columnToTsField: non-nullable has readonly prefix", () => {
  const col: ColumnSpec = { name: "id", type: "uuid" };
  assert.ok(columnToTsField(col).startsWith("  readonly id:"), columnToTsField(col));
});

// ---------------------------------------------------------------------------
// buildDomainModel
// ---------------------------------------------------------------------------

test("buildDomainModel: exports interface with PascalCase name", () => {
  const ts = buildDomainModel(SAMPLE_SPEC);
  assert.ok(ts.includes("export interface CoworkerSessions"), ts);
});

test("buildDomainModel: exports branded ID type", () => {
  const ts = buildDomainModel(SAMPLE_SPEC);
  assert.ok(ts.includes("CoworkerSessionsId"), ts);
});

test("buildDomainModel: includes outcome ID in header comment", () => {
  const ts = buildDomainModel(SAMPLE_SPEC);
  assert.ok(ts.includes("ODEP6"), ts);
});
