---
name: declare-enums
description: Codify an enum-of-options pattern (e.g. a userConfig connector category, a workflow state machine, a tier tag) as a typed string-union under src/domain/<domain>/. Use when the chassis adds a new dimension where the value space is closed and the type system should enforce membership. Mirrors the chassis's existing pattern (no `enum` keyword for new connector-style enums; `as const` tuple + `(typeof T)[number]`).
argument-hint: "<domain> <TypeName> <opt1,opt2,...> [outcome-id] [description]"
chassis-grounding: ../../coworker-context.md
---

# Declare Enums

First working data-engineering skill. Backed by `scripts/declare-enum.ts` (CLI) + `scripts/lib/declare-enum.ts` (pure function, unit-tested).

## Workflow

1. **Pick a domain directory.** New enums land under `src/domain/<domain>/`. Look at existing siblings (e.g. `src/domain/coworkers/CoworkerSession.ts` from ODEP2) to confirm the new enum fits.

2. **Pick a PascalCase type name** that's singular (the script pluralizes for the `as const` constant name automatically: `AnalyticsConnector` → `ANALYTICS_CONNECTORS`).

3. **Provide options** as comma-separated kebab- or snake-case literals: `cf-analytics-engine,ga4`.

4. **Invoke**:

   ```bash
   tsx scripts/declare-enum.ts connectors AnalyticsConnector cf-analytics-engine,ga4 ODEP3 "Connector picks for the analytics userConfig category."
   ```

   Writes `src/domain/connectors/AnalyticsConnector.ts`. Refuses to overwrite — safety-first; remove the file manually to regenerate.

5. **Wire downstream callers.** Grep for the now-typed value: `git grep '"cf-analytics-engine"'` should turn up the userConfig + any places that need to validate. Replace stringly-typed parameters with the new type.

## Pattern reference

The chassis prefers `enum` keyword for stable domain enums (see `src/domain/enums.ts`) and `as const` tuples for operator-mutable connector picks. This skill emits the latter; the operator can refactor to a typed `enum` later if the value set stabilizes.

Example output:

```ts
/**
 * Connector picks for the analytics userConfig category.
 *
 * Refs: ODEP3.
 */
export const ANALYTICS_CONNECTORS = [
  "cf-analytics-engine",
  "ga4",
] as const;

export type AnalyticsConnector = (typeof ANALYTICS_CONNECTORS)[number];
```

## See also

- `../../coworker-context.md` — enum-of-options discipline + chassis grounding
- `scripts/lib/declare-enum.ts` — pure-function implementation
- `scripts/lib/declare-enum.test.ts` — 14 unit tests
- `scripts/declare-enum.ts` — CLI wrapper
- `src/domain/coworkers/CoworkerSession.ts` — example of the broader pattern in production
