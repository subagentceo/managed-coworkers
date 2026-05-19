# Audit — Legacy `src/index.ts` exports (2026-05-18)

`src/index.ts` re-exports 17 modules from `commit 365a298` ("Add complete TypeScript source implementation for managed-coworkers SDK"). Per [`docs/decisions/2026-05-18-replay-only-managed-agents.md`](../decisions/2026-05-18-replay-only-managed-agents.md), the chassis is moving toward replay-only managed-agents. Most legacy modules are unused.

## Method

```bash
# Per-symbol consumer count
for sym in <each exported symbol>; do
  outside_src=$(git ls-files -- 'scripts' 'tests' 'infra' 'docs' | xargs grep -l "$sym" | wc -l)
  in_src=$(git ls-files -- 'src' | xargs grep -l "$sym" | wc -l)
done
```

## Findings

All 17 legacy exports have **no real external consumers**. The "outside-src" hits are documentation references (this audit, the OREPLAY0 ADR), not code imports. The "in-src" hits are the export site + the module's own test file + the occasional sibling reference.

| Symbol | outside-src | in-src | Consumer status |
|---|---|---|---|
| `ManagedAgentsClient` | 1 | 4 | ADR doc only |
| `SessionManager` | 0 | 3 | self + tests |
| `MCPConnector` | 1 | 2 | doc only |
| `AgentOrchestrator` | 0 | 2 | self + tests |
| `WorkflowEngine` | 0 | 2 | self + tests |
| `TodoManager` | 0 | 2 | self + tests |
| `CostTracker` / `DeterministicClock` / `ReplayRecorder` | 1 | 2 | doc only |
| `PlatformIntegration` | 0 | 2 | self + tests |
| `FileManager` | 1 | 2 | doc only |
| `VaultManager` | 1 | 2 | doc only |
| `EnvironmentManager` | 1 | 2 | doc only |
| `OutcomeManager` | 1 | 2 | doc only |
| `SkillManager` | 1 | 2 | doc only |
| `DreamManager` | 1 | 2 | doc only |
| `PermissionManager` | 1 | 2 | doc only |
| `WebhookManager` | 1 | 2 | doc only |
| `MemoryManager` | 1 | 2 | doc only |

## Decision

**Do not bulk-delete.** The legacy modules are inert (no live import path runs them) but they're part of the SDK surface the rubric in PR #2 (Tier 1–3) scored against. Deleting them invalidates that grading without a replacement story.

**Action queued (separate PR):** REPLAY-12 — for each legacy module, decide one of:

1. **Keep as substrate** for a future replay-based feature (e.g. `SessionManager` is plausibly part of the replay-runner). Document with a chassis comment.
2. **Mark deprecated** with a `@deprecated since=2026-05-18 reason="rubric remnant; not in replay path"` JSDoc + a removal date. Do not delete yet.
3. **Delete** if both (a) zero consumers and (b) no plausible replay-path role.

Likely outcome: most go to (2). `CostTracker` / `DeterministicClock` / `ReplayRecorder` from `src/replay.ts` are candidates for (1) — they predate the pollyjs harness but model concepts the cassette-based runner will need (deterministic time, cost accounting).
