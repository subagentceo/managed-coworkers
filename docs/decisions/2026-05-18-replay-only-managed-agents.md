---
date: 2026-05-18
status: accepted
deciders: alex-jadecli
outcome_id: OREPLAY0
---

# ADR — Replay-only managed-agents (no live API key, no OAuth token)

## Context

The chassis already enforces an **OAuth-only posture** for live Claude
calls (OSL1, [2026-05-16-osv-only-no-secret-scanning.md][osl1]). The
ManagedAgentsClient rejects `ANTHROPIC_API_KEY` in its constructor
(OSL1-FIX, PR #51).

The operator wants legal + finance managed-agents to run **without
even an OAuth token** — pure cassette replay — for three reasons:

1. **Cost.** Live calls inside the 24-hour autonomous loop burn the
   Max quota fast. Replay is free.
2. **Determinism.** CI runs need bit-identical output. A live Claude
   call has temperature noise.
3. **Token rotation invariance.** The chassis rotates across 3 Max
   accounts on a 5-hour window. A test that hard-depends on a live
   token breaks every rotation; a test that depends on a cassette
   doesn't.

[osl1]: ./2026-05-16-osv-only-no-secret-scanning.md

## Decision

**Legal and finance managed-agents run against pollyjs cassettes
under `cassettes/`. No live Anthropic API call. No
`CLAUDE_CODE_OAUTH_TOKEN`. No `ANTHROPIC_API_KEY`.**

The chassis composes three substrate layers:

| Layer | File | Role |
|---|---|---|
| Pollyjs harness | `src/lib/replay-harness.ts` | Records / replays HTTP at the Node-http layer (Anthropic SDK path). |
| Miniflare harness | `src/lib/miniflare-harness.ts` | Boots workerd in-process so Worker code under test runs without `wrangler dev`. |
| Cookbook loader | `src/lib/cookbook-loader.ts` | Parses `agent.yaml` + `subagents/*.yaml` from any vendored package. |

Domain-specific entrypoints:

- `src/lib/legal-replay-agent.ts` → loads cookbooks from
  `packages/claude-for-legal/managed-agent-cookbooks/` (5 cookbooks).
- `src/lib/finance-replay-agent.ts` → loads cookbooks from
  `packages/financial-services/managed-agent-cookbooks/` (10 cookbooks).

The four anthropics-upstream packages are vendored **code-only** (no
git history, no `.github/`):

- `packages/claude-for-legal/`
- `packages/financial-services/`
- `packages/small-business/`
- `packages/claude-api-skill/`

Each carries a `.PROVENANCE.md` documenting upstream source +
refresh procedure. The `claude-api-skill` README teaches the
ANTHROPIC_API_KEY path; that content is preserved faithfully and
adaptations are added alongside (never by editing upstream).

## Smoke surface

`npm run smoke:replay` (7 checks, all green) is the keep-honest baseline:

1. Polly creates + stops cleanly.
2. Miniflare boots + serves + disposes.
3. Combined harness round-trip (no interception conflict).
4. Legal cookbooks discoverable.
5. Diligence-grid loads (4 subagents).
6. Finance cookbooks discoverable.
7. KYC-screener loads (3 subagents; system.file shape).

## Open questions

**REPLAY-6** — does pollyjs intercept workerd's *internal* fetch?
Node-http interception runs on the host; workerd has its own
runtime. A miniflare-level outbound handler may be required. Tracked
as task #62.

**REPLAY-5** — recording cassettes requires a one-shot OAuth token
captured outside the repo and never committed. The cassette body
goes under `cassettes/<domain>/<cookbook>/<request-name>.har` with
the cookbook authority redacted from headers. Tracked as task #61.

## Forbidden patterns

- Reading `process.env.ANTHROPIC_API_KEY` in any `src/` file (OSL1).
- Reading `process.env.CLAUDE_CODE_OAUTH_TOKEN` inside a replay path —
  if a replay test needs it to run, the test isn't a replay test.
- Editing upstream content under `packages/*/` to bake in
  chassis-specific posture. Add adaptations alongside (see the
  `.PROVENANCE.md` divergence note in `packages/claude-api-skill/`).

## Consequences

- Cookbook test coverage expands to 5 + 10 = 15 declarative units
  without burning a single token.
- The 24-hour autonomous loop can hammer these tests without
  rate-limit concern.
- Refreshing the upstream packages requires a manual sparse-checkout
  procedure (documented per-package in `.PROVENANCE.md`) until a
  refresh script is written.
