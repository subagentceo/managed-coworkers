---
name: alloydb-schema
description: Author or iterate AlloyDB schemas + migrations. Use when adding a new persisted table, altering an existing one, or backfilling data. Writes migration files under infra/alloydb/migrations/ in numbered order. Validates via the alloydb MCP server (read-only EXPLAIN runs) before proposing the migration.
argument-hint: "<add-table|alter-table|backfill> <table-name>"
chassis-grounding: ../../coworker-context.md
---

# AlloyDB Schema

Data-engineering skill. Backed by `scripts/lib/alloydb-schema.ts` (pure functions, 24 unit tests) + `scripts/alloydb-schema.ts` (CLI wrapper).

Given a table spec (JSON) this skill generates: an idempotent up-migration, a rollback down-migration, and a matching TypeScript domain-model type.

## Workflow

### add-table

1. **Inspect the migrations directory** to find the next ordinal:

   ```bash
   ls infra/alloydb/migrations/
   ```

   Files are zero-padded 4-digit ordinals (`0001_init.sql`, `0002_sites.sql`, …). The next ordinal is `max + 1`.

2. **Draft the column spec** from the domain model in `src/domain/models/`. Example:

   ```json
   {
     "tableName": "coworker_sessions",
     "outcomeId": "ODEP6",
     "description": "coworker_sessions",
     "columns": [
       { "name": "id",         "type": "uuid",      "primaryKey": true },
       { "name": "coworker",   "type": "text"                           },
       { "name": "outcome_id", "type": "text"                           },
       { "name": "jira_ticket","type": "text",      "nullable": true    },
       { "name": "started_at", "type": "timestamp"                      },
       { "name": "status",     "type": "text",      "default": "'running'" }
     ]
   }
   ```

   Supported column types: `text | text[] | integer | bigint | boolean | timestamp | jsonb | uuid`.

3. **Generate the migration:**

   ```bash
   tsx scripts/alloydb-schema.ts add-table spec.json
   ```

   Or use the demo to see sample output:

   ```bash
   tsx scripts/alloydb-schema.ts --demo
   ```

4. **Review and write files:**
   - `infra/alloydb/migrations/NNNN_<desc>.sql` — up migration
   - `infra/alloydb/migrations/NNNN_<desc>.down.sql` — down migration
   - `src/domain/models/<table_name>.ts` — TypeScript domain type

5. **Validate** via the `alloydb` MCP server if available:
   - Run a read-only `EXPLAIN SELECT 1 FROM <table>` after the migration to confirm the table landed.

### alter-table

For ALTER operations, Claude inspects the existing schema via the `alloydb` MCP server, then hand-writes the ALTER SQL (the generator is `add-table` only). The SKILL.md documents the manual ALTER steps; the TypeScript backing handles filename numbering and domain-model update.

### backfill

For backfill operations, write the SQL as a standalone migration (no table DDL), using the same numbering scheme. Set `description` to `backfill_<table>`.

## Output format (add-table demo)

```sql
-- UP: infra/alloydb/migrations/0003_coworker_sessions.sql

-- 0003_coworker_sessions.sql
-- Outcome: ODEP6.
-- Idempotent (CREATE TABLE IF NOT EXISTS).
-- @cite vendor/alloydb-omni/

CREATE TABLE IF NOT EXISTS coworker_sessions (
  id                           uuid PRIMARY KEY,
  coworker                     text NOT NULL,
  outcome_id                   text NOT NULL,
  jira_ticket                  text,
  started_at                   timestamp NOT NULL,
  status                       text NOT NULL DEFAULT 'running'
);
```

```ts
// src/domain/models/coworker_sessions.ts

export type CoworkerSessionsId = string & { __brand: "CoworkerSessionsId" };

export interface CoworkerSessions {
  readonly id: string;
  readonly coworker: string;
  readonly outcome_id: string;
  jira_ticket: string | null;
  readonly started_at: Date;
  readonly status: string;
}
```

## Constraints

- **Idempotent migrations only.** Every CREATE uses `IF NOT EXISTS`.
- **Pair up + down.** Every `NNNN_<desc>.sql` ships with `NNNN_<desc>.down.sql`.
- **Column ↔ domain type parity.** Every SQL column must have a matching field in the TypeScript domain model and vice versa.
- **Cite the vendor.** Migration files carry `-- @cite vendor/alloydb-omni/`.

## Connectors

| Connector | Required | Purpose |
|---|---|---|
| alloydb | Optional (validation) | `EXPLAIN` run to confirm migration landed |
| (filesystem) | Implicit | Read existing migrations for ordinal inference |

## See also

- `../../coworker-context.md` — chassis grounding, OAuth-only invariant
- `scripts/lib/alloydb-schema.ts` — pure-function implementation
- `scripts/lib/alloydb-schema.test.ts` — 24 unit tests
- `scripts/alloydb-schema.ts` — CLI wrapper
- `infra/alloydb/migrations/` — existing migration files
- `skills/model-data-domain/SKILL.md` — prerequisite: model the domain before writing the migration
- `skills/trace-data-flow/SKILL.md` — companion: verify the migration is wired end-to-end
