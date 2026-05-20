#!/usr/bin/env tsx
/**
 * CLI for the alloydb-schema skill.
 *
 * Usage:
 *   tsx scripts/alloydb-schema.ts --demo
 *   tsx scripts/alloydb-schema.ts add-table <spec.json>
 *
 * Outputs the migration SQL (up + down) and domain model TypeScript.
 * In practice, Claude runs this via the skill after inspecting infra/alloydb/migrations/
 * to determine the next ordinal, then writes the files.
 *
 * Refs: ODEP6.
 */

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import {
  buildDomainModel,
  buildMigrationDown,
  buildMigrationFilenames,
  buildMigrationUp,
  nextMigrationOrdinal,
} from "./lib/alloydb-schema.js";

import type { MigrationSpec } from "./lib/alloydb-schema.js";

const args = process.argv.slice(2);

if (args.includes("--demo")) {
  const spec: MigrationSpec = {
    tableName: "coworker_sessions",
    outcomeId: "ODEP6",
    description: "coworker_sessions",
    columns: [
      { name: "id", type: "uuid", primaryKey: true },
      { name: "coworker", type: "text" },
      { name: "outcome_id", type: "text" },
      { name: "jira_ticket", type: "text", nullable: true },
      { name: "started_at", type: "timestamp" },
      { name: "status", type: "text", default: "'running'" },
    ],
  };

  const migrationsDir = resolve(process.cwd(), "infra/alloydb/migrations");
  const existing = readdirSync(migrationsDir);
  const ordinal = nextMigrationOrdinal(existing);
  const [upFile, downFile] = buildMigrationFilenames(ordinal, spec.description ?? spec.tableName);

  process.stdout.write(`-- UP: infra/alloydb/migrations/${upFile}\n\n`);
  process.stdout.write(buildMigrationUp(spec) + "\n");
  process.stdout.write(`-- DOWN: infra/alloydb/migrations/${downFile}\n\n`);
  process.stdout.write(buildMigrationDown(spec.tableName) + "\n");
  process.stdout.write(`-- DOMAIN MODEL: src/domain/models/${spec.tableName}.ts\n\n`);
  process.stdout.write(buildDomainModel(spec) + "\n");
  process.exit(0);
}

const operation = args[0];
const specPath = args[1];

if (operation !== "add-table" || !specPath) {
  process.stderr.write(
    "Usage:\n  tsx scripts/alloydb-schema.ts --demo\n  tsx scripts/alloydb-schema.ts add-table <spec.json>\n",
  );
  process.exit(1);
}

const spec: MigrationSpec = JSON.parse(
  readFileSync(resolve(process.cwd(), specPath), "utf8"),
);

const migrationsDir = resolve(process.cwd(), "infra/alloydb/migrations");
const existing = readdirSync(migrationsDir);
const ordinal = nextMigrationOrdinal(existing);
const [upFile, downFile] = buildMigrationFilenames(ordinal, spec.description ?? spec.tableName);

process.stdout.write(`-- UP: infra/alloydb/migrations/${upFile}\n\n`);
process.stdout.write(buildMigrationUp(spec) + "\n");
process.stdout.write(`-- DOWN: infra/alloydb/migrations/${downFile}\n\n`);
process.stdout.write(buildMigrationDown(spec.tableName) + "\n");
process.stdout.write(`-- DOMAIN MODEL: src/domain/models/${spec.tableName}.ts\n\n`);
process.stdout.write(buildDomainModel(spec) + "\n");
