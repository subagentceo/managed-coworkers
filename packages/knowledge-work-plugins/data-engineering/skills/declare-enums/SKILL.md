---
name: declare-enums
description: Codify an enum-of-options pattern (e.g. a userConfig connector category, a workflow state machine, a tier tag) as a typed string-union under src/domain/models/. Use when the chassis adds a new dimension where the value space is closed and the type system should enforce membership. Mirrors the chassis's existing pattern (no `enum` keyword; `as const` tuple + `(typeof T)[number]`).
argument-hint: "<enum-name> <option1,option2,...>"
chassis-grounding: ../../coworker-context.md
---

# Declare Enums — stub

This is a stub. Implementation lands in a follow-up commit (ODEP3). When written, this skill will:

1. Parse the enum name + comma-separated option list.
2. Inspect `src/domain/models/` and `packages/knowledge-work-plugins/*/.claude-plugin/plugin.json` userConfig sections for existing enums that may overlap.
3. Emit (or extend) `src/domain/models/<enum-domain>.ts` with:
   ```ts
   export const FOO = ['bar', 'baz'] as const;
   export type Foo = (typeof FOO)[number];
   ```
4. If the enum corresponds to a userConfig category, add a JSDoc cross-reference to the plugin.json field.
5. Propose downstream callers that should validate against the new type (greps for stringly-typed references).

See `../../coworker-context.md` for the enum-of-options discipline.
