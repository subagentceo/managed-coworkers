# managed-coworkers

## What this is

A multi-agent research chassis with a local vendor doc mirror, an MCP knowledge
bridge, and a replay-only managed-agents test substrate. Orchestrator plus
sub-agents (`npm-research`, `verifier`, `crawl-curator`) read from 25+ vendor
mirrors under `vendor/` through 16+ MCP tools served by
`src/mcp/bridge-server.ts`. The chassis is **OAuth-only**: `ANTHROPIC_API_KEY`
is rejected at every layer (`src/oauth/token.ts`, the Worker env-sanitizer, and
the Sandbox container env-sanitizer). Managed-agent code paths run entirely
against recorded cassettes and a mocked HTTP dispatcher, with no live Anthropic
calls in tests or CI.

## Quick start

```bash
npm install
npm run smoke:replay      # replay substrate health check
npm run smoke:md-quality  # all 5 md-quality axes + grade-vendor golden
npm run verify            # typecheck + citations + libs
```

## Replay-only posture

This chassis ships zero live-network managed-agent tests. Every managed-agent
test runs against **[pollyjs](https://github.com/netflix/pollyjs) cassettes**
under `cassettes/` plus **[undici](https://undici.nodejs.org/)
MockAgent**-based interception.

Critical Node 24 invariant: use `replayFetch` from `src/lib/fetch-replay.ts`,
not global `fetch`. On Node 24 the global `fetch` does **not** route through
undici's installed dispatcher, so a leaked managed-agent call would silently
hit the live API. The fail-closed canary at
`src/lib/cookbook-replay-failclosed.canary.ts` proves the leak path is sealed.

Background and decision record:
[`docs/decisions/2026-05-18-replay-only-managed-agents.md`](docs/decisions/2026-05-18-replay-only-managed-agents.md)
(OREPLAY0).

## Vendor markdown quality

Every vendor mirror is graded against the 5-axis 100-point rubric at
[`rubrics/md-quality-v1.md`](rubrics/md-quality-v1.md) (OMDQ0). Axes: A
parseability, B headings, C fenced-code, D links, E line-discipline.

```bash
npm run grade:vendor -- agentskills --sample=5 --seed=1
```

Example output (seed=1, sample=5):

```
vendor/agentskills: sampled 5 file(s)
  mean=97.8  p10=96.8  p50=99  p90=99
  axis lost (mean): A=0 B=0.2 C=0.8 D=0 E=0.8
```

The `grade-vendor` golden snapshot under
`src/lib/md-quality/__golden__/` locks this output so unintended scoring
regressions trip `smoke:md-quality`. Decision record:
[`docs/decisions/2026-05-18-md-quality-rubric.md`](docs/decisions/2026-05-18-md-quality-rubric.md).

## Layout

```
src/        TypeScript: MCP bridge, replay harness, md-quality engine, oauth, agents
scripts/    Crawlers, verify chain, grade-vendor, cassette redaction
vendor/     25+ local vendor doc mirrors (Anthropic-first, plus ecosystem)
packages/   Internal plugin packages (agent-plugins/, etc.)
cassettes/  pollyjs cassettes for managed-agent replay tests
rubrics/    Phase rubrics and the md-quality rubric
docs/       Architecture, governance, ADRs (`docs/decisions/`)
```

## Where things live

- MCP knowledge bridge: `src/mcp/bridge-server.ts`
- Replay harness + fetch interceptor + worker harness:
  `src/lib/replay-harness.ts`, `src/lib/fetch-replay.ts`,
  `src/lib/miniflare-harness.ts`
- md-quality engine: `src/lib/md-quality/index.ts`
- ADRs: `docs/decisions/`
- Rubrics: `rubrics/`

## Contributing

See [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md). Every commit message ends with
its outcome marker `(O<N>)`; the convention test in
`src/lib/conventions.test.ts` enforces this for commits authored after
2026-05-15T04:30Z.

## License

MIT (see `license` field in `package.json`).
