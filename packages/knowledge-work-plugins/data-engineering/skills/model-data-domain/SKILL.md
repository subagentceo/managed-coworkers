---
name: model-data-domain
description: Design a terse TypeScript domain entity for a new chassis surface that extends `src/domain/core/Entity` with branded ID + readonly fields + a `kind()` discriminator + a typed COLUMNS array. Use when adding a domain concept that needs typing, persistence, or both. Outputs one file under src/domain/<domain>/ keyed by entity name. Enforces the chassis's terse-model discipline (≤100 lines, readonly fields, branded IDs).
argument-hint: "<domain> <spec.json>"
chassis-grounding: ../../coworker-context.md
---

# Model Data Domain

Second working data-engineering skill (the first was `declare-enums` in PR #123). Backed by `scripts/model-data-domain.ts` (CLI) + `scripts/lib/model-data-domain.ts` (pure function, 16 unit tests).

## Workflow

1. **Author a spec JSON file** (or pipe to stdin) describing the entity:

   ```json
   {
     "entityName": "Site",
     "fields": [
       { "name": "id",       "type": "SiteId",  "column": "id" },
       { "name": "hostname", "type": "string",  "column": "hostname" },
       { "name": "niche",    "type": "string",  "column": "niche", "defaultExpr": "\"unspecified\"" }
     ],
     "outcomeId": "ODEP4",
     "description": "One Cloudflare-hosted site in the operator's 100-site portfolio."
   }
   ```

   Conventions:
   - `entityName` PascalCase
   - `fields[0]` MUST be `{ name: "id", column: "id" }` — Entity's `id` is required first
   - `fields[*].name` camelCase, `fields[*].column` snake_case
   - `fields[0].type` is the branded ID (e.g. `SiteId`); the script emits `export type SiteId = string & { __brand: "SiteId" };` automatically. Use `string` to skip the brand.

2. **Invoke**:

   ```bash
   tsx scripts/model-data-domain.ts portfolio /tmp/site-spec.json
   ```

   Writes `src/domain/portfolio/Site.ts`. Refuses to overwrite — same safety as `declare-enum`.

3. **Pair with a migration**: if the entity is persisted, run `alloydb-schema` skill (ODEP5) next to add the corresponding `CREATE TABLE` migration whose columns mirror `SITE_COLUMNS`.

## Output shape (example)

```ts
/**
 * One Cloudflare-hosted site in the operator's 100-site portfolio.
 *
 * Persisted columns documented inline on each readonly field.
 *
 * Refs: ODEP4.
 */

import { Entity } from "../core/Entity.js";

/** Branded identifier for Site. */
export type SiteId = string & { __brand: "SiteId" };

export class Site extends Entity {
  /** Maps to `hostname`. */
  public readonly hostname: string;

  /** Maps to `niche`. */
  public readonly niche: string;

  constructor(args: {
    id: SiteId;
    hostname: string;
    niche?: string;
  }) {
    super(args.id, new Date());
    this.hostname = args.hostname;
    this.niche = args.niche ?? "unspecified";
  }

  public get kind(): string {
    return "Site";
  }
}

/** Column names in the corresponding SQL table, in table-order. */
export const SITE_COLUMNS = [
  "id",
  "hostname",
  "niche",
] as const;
```

## See also

- `../../coworker-context.md` — terse-model discipline + chassis grounding
- `scripts/lib/model-data-domain.ts` — pure-function implementation
- `scripts/lib/model-data-domain.test.ts` — 16 unit tests
- `scripts/model-data-domain.ts` — CLI wrapper
- `src/domain/coworkers/CoworkerSession.ts` — the pattern this emits in production
- `src/domain/core/Entity.ts` — the base class extended
- PR #123 — sibling skill `declare-enums`
