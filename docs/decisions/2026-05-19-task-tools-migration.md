# 2026-05-19 — Migrate planner emission from TodoWrite to Task tools (OTASK1)

## Status

Accepted.

## Context

Per [code.claude.com/docs/en/agent-sdk/migrate-task-tools.md](https://code.claude.com/docs/en/agent-sdk/migrate-task-tools.md):

> As of TypeScript Agent SDK 0.3.142 and Claude Code v2.1.142, sessions use the structured Task tools `TaskCreate`, `TaskUpdate`, `TaskGet`, and `TaskList` instead of `TodoWrite`. See *Migrate to Task tools* for how monitoring code changes. The examples on this page set `CLAUDE_CODE_ENABLE_TASKS=0` to keep showing TodoWrite for sessions that have not migrated yet.

The chassis had a mode-aware planner that emitted `TodoWrite` for headless runs and `TaskCreate`/`TaskUpdate` for interactive runs. With the SDK change, that branching is no longer correct: both surfaces now emit the structured Task tools.

## Decision

Full migration to Task tools in both modes. Specifically:

1. **`src/agent/planning.ts`** — `Planner.setPlan()` and `Planner.setStatus()` now emit `TaskCreate`/`TaskUpdate` regardless of `mode`. The `mode` field on `PlannerOptions` is retained for downstream consumers (loop/schedule dispatch policy) but no longer changes tool emission. Dead-code helper `toTodoWriteShape()` removed.
2. **`src/agent/todo-tracker.ts`** — No longer listens for `TodoWrite` events. Dead-code helper `replaceAll()` removed. Only `TaskCreate`/`TaskUpdate` cases remain in the switch.
3. **`scripts/verify-planner.ts`** — Asserts both modes emit `TaskCreate` AND `TaskUpdate`, and that neither emits `TodoWrite`.
4. **`src/lib/schemas/routine.ts`** — Removed `"TodoWrite"` from the `AllowedToolSchema` allowlist.
5. **`src/domain/enums.ts`** — `ToolName.TodoWrite` retained. The canonical enum is the discriminator for parsing tool events; old session logs (pre-v2.1.142) still emit `TodoWrite` and the chassis should be able to read them.

## Out of scope

- The `CLAUDE_CODE_ENABLE_TASKS=0` flag from the upstream docs. The chassis is OSL1-bound — no env reads in `src/`. The docs use that flag for educational examples; the chassis has no such legacy path to keep alive.
- Migration of consumers that read old `.jsonl` session transcripts. If those land later, a separate `todo-tracker-legacy.ts` can be added as a frozen snapshot of the pre-migration code.

## Verification

- `npx tsc --noEmit` → exit 0
- `npx tsx scripts/verify-planner.ts` → `OK — both modes emit Task*, /loop and /schedule first-class, no legacy TodoWrite.`
- `npm run smoke:replay` → green
- `git grep "TodoWrite" src/ scripts/` → only references remain in `src/domain/enums.ts` (canonical) and ADRs/seeds (historical).

## References

- [Migrate to Task tools](https://code.claude.com/docs/en/agent-sdk/migrate-task-tools.md)
- [Tools reference](https://code.claude.com/docs/en/tools-reference.md)
- OCDM12 (canonical domain barrel — `ToolName` enum source)
