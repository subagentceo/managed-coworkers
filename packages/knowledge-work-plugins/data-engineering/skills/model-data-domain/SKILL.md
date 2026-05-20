---
name: model-data-domain
description: Design a terse TypeScript data model for a new chassis surface. Use when adding a new domain concept that needs typing, persistence, or both. Outputs one file under src/domain/models/ keyed by domain name. Enforces the chassis's terse-model discipline (≤100 lines per file, readonly fields, branded IDs, string-union enums).
argument-hint: "<domain-name> [reason]"
chassis-grounding: ../../coworker-context.md
---

# Model Data Domain — stub

This is a stub. Implementation lands in a follow-up commit (ODEP2). When written, this skill will:

1. Read the operator's domain description (free-form text).
2. Inspect `src/domain/` for existing models that may overlap.
3. Inspect `infra/alloydb/migrations/` and Redis-key conventions to ground the model in real persistence.
4. Produce a single `src/domain/models/<domain>.ts` file with:
   - Branded ID type (`<Domain>Id = string & { __brand: '<Domain>Id' }`)
   - The core interface (≤100 lines, `readonly` fields)
   - Enum string-unions if applicable (mirroring the connector-enum pattern)
   - JSDoc references back to AlloyDB columns / Redis namespaces if persisted
5. If persistence is needed: propose a migration under `infra/alloydb/migrations/` with the corresponding columns.

Cites: `coworker-context.md` for the terse-model discipline; `vendor/alloydb-omni/` for SQL types; `vendor/redis/` for key conventions.

See `../../coworker-context.md` for chassis grounding.
