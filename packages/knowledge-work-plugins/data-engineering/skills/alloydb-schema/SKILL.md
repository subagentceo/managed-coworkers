---
name: alloydb-schema
description: Author or iterate AlloyDB schemas + migrations. Use when adding a new persisted table, altering an existing one, or backfilling data. Writes migration files under infra/alloydb/migrations/ in numbered order. Validates via the alloydb MCP server (read-only EXPLAIN runs) before proposing the migration.
argument-hint: "<add-table|alter-table|backfill> <table-name>"
chassis-grounding: ../../coworker-context.md
---

# AlloyDB Schema — stub

This is a stub. Implementation lands in a follow-up commit (ODEP5). When written, this skill will:

1. Take an operation (add-table / alter-table / backfill) + table name.
2. If altering: read the current schema via the `alloydb` MCP server.
3. Propose the migration SQL with:
   - Up + down direction (the chassis is stateless-Worker; we MUST be able to roll back).
   - Index choices justified inline.
   - Constraint choices (NOT NULL, CHECK, FK) tied to the domain model in `src/domain/models/`.
4. Write the migration to `infra/alloydb/migrations/<NNNN>_<desc>.sql` (4-digit zero-padded ordinal).
5. Update or create the corresponding `src/domain/models/<domain>.ts` type to match.
6. Propose a smoke test under `src/lib/` that asserts the round trip (model → write → read → model).

Cites: `vendor/alloydb-omni/` for the SQL dialect and runtime constraints.

See `../../coworker-context.md` for the chassis's terse-model + outcome-ID discipline.
