# CLAUDE.md — project-level context for Claude sessions

> Loaded automatically by `claude` (CLI + Desktop + VS Code). Closes Phase 14.A per issue #49.

## What this repo is

A **multi-agent research chassis** that solo founders fork to ship a Claude-powered product. Orchestrator + sub-agents (`npm-research`, `verifier`, `crawl-curator`) over an MCP bridge with 16+ tools spanning 25 vendor doc surfaces.

**Auth is OAuth-only.** `ANTHROPIC_API_KEY` is rejected at every layer (`src/oauth/token.ts`, the Worker env-sanitizer, the Sandbox container env-sanitizer). The chassis fails closed when the key is present.

## Quickstart for a Claude session

If you (Claude) are starting a session in this repo, do this first:

1. **Read `seeds/posture/session-start.xml`** — the load-bearing XML primitive. Encodes auth posture, commit-per-todo discipline, /routines pattern, codemode + sandbox posture, doc-rules, sources.
2. **Read `docs/CONVENTIONS.md`** — outcome-driven Conventional Commits. Every commit ends with `(O<N>)`.
3. **Read `docs/PROJECT.md`** — Cowork-style project manifest.
4. **Read `docs/pending.md`** — live action dashboard. Your queue.
5. **Read `seeds/memory/heartbeat/last-tick.md`** — what the previous tick decided.

## Loaded primitives

| Primitive | File |
| :--- | :--- |
| Posture XML | `seeds/posture/session-start.xml` |
| Operator seeds (5 of them) | `seeds/prompts/operator-2026-05-10*.md`, `seeds/prompts/operator-2026-05-15-*.md` |
| Heartbeat memory | `seeds/memory/heartbeat/` (last-tick, next-actions, decisions, open-questions) |
| Rubrics | `rubrics/phase-{0..16}.md` |
| Citation extracts | `seeds/citations/*.md` (15+ extracts of cited vendor docs) |
| Skills | `.claude/skills/{heartbeat,routines,refresh-vendors,schedule-bridge}/SKILL.md` (SDK-discoverable directory form per `agent-sdk/claude-code-features.md`) |
| Plugin manifest | `.claude/plugins.json` (3 marketplaces) |
| Managed coworkers | `packages/knowledge-work-plugins/{product-management,data-engineering}/` (one knowledge-work-plugin per vertical; see "Managed coworkers" section below) |
| Per-coworker infra | `infra/terraform/coworkers/<vertical>/` (TF v5) + `infra/cloudflare/coworkers/<vertical>/wrangler.jsonc` (parallel TypeScript-side declaration) |

## Run commands

| Action | Command |
| :--- | :--- |
| Verify chain | `npm run verify` |
| Crawl all vendors | `npm run crawl:vendors` |
| Crawl one vendor | `npm run crawl:vendor -- <name>` |
| Run orchestrator locally | `npm run dev "<task>"` |
| Worker local dev | `npm run sandbox:dev` |
| Grade a phase | `npm run grade -- phase-<N>` |
| Install marketplace plugins | `npm run install:plugins` |

## OAuth-only invariant

The repo's hard rule: `ANTHROPIC_API_KEY` is **never** set. Anywhere. The OAuth gate at `src/oauth/token.ts` fails closed when it's present. The Cloudflare Worker's env-sanitizer rejects it before passing env into the Sandbox.

If you see code that wants `ANTHROPIC_API_KEY`, it's a bug or a leak. Fix it; don't accommodate it.

## Managed coworkers

Project-local **knowledge-work-plugins** (forked from `anthropics/knowledge-work-plugins`) materialized as Cloudflare Workers. Each vertical is one folder under `packages/knowledge-work-plugins/<name>/` with the standard plugin shape:

```
.claude-plugin/plugin.json   # manifest + userConfig connector enum
.mcp.json                    # unconditional MCPs (knowledge-bridge + cloudflare-codemode + ...)
README.md                    # operator-facing how-to
coworker-context.md          # chassis-specific grounding (OAuth, vendor mirrors, outcome IDs)
skills/<name>/SKILL.md       # skill definitions (some stubs, some working bodies)
```

Current verticals:

| Vertical | Status | Skills | Outcome prefix |
|---|---|---|---|
| `product-management` | scaffold (PR #111) + 5 forked skills + 3 working SEO skills (PR #132) | write-spec, roadmap-update, metrics-review, synthesize-research, competitive-brief, **site-portfolio-pulse (working)**, **seo-audit (working)**, **content-gap-brief (working)** | `OPMP*` |
| `data-engineering` | scaffold (PR #112) + 2 working skill bodies (PR #123, #131) | **declare-enums (working)**, **model-data-domain (working)**, trace-data-flow, alloydb-schema, redis-queue-design, visualize-architecture | `ODEP*` |

**Per-coworker infra** lives in two parallel trees the operator picks between at deploy time (drift-detection across both):

- `infra/terraform/coworkers/<vertical>/` — Cloudflare provider v5 root module (KV `SESSION_INDEX`, D1 `OUTCOMES_LOG`, Secrets Store stubs)
- `infra/cloudflare/coworkers/<vertical>/wrangler.jsonc` — same resource set in wrangler form; pairs with `Dockerfile` + `src/worker.ts`

**OAuth-only at three layers** for every coworker: project gate (`src/oauth/token.ts`), Worker gate (`sanitizeEnvForSandbox()`), container gate (Dockerfile `HEALTHCHECK`). Never `ANTHROPIC_API_KEY`.

## Connector enum

Upstream knowledge-work-plugins load ~16 MCP servers unconditionally (40-80KB context bloat per session). This chassis's fork uses a connector-enum:

- Each plugin's `.claude-plugin/plugin.json` declares `userConfig` categories (`analytics`, `search_console`, `chat`, `project_tracker`, `feedback`, etc.) as multi-select string lists.
- Only the unconditional MCPs ship in the plugin's `.mcp.json`.
- Optional connectors layer in via Docker Compose profiles (per-category) — the operator picks at devcontainer-setup time which MCP services start; only those run.
- Picks are codified as typed string-unions via the `declare-enums` skill (PR #123) under `src/domain/connectors/` so downstream code is not stringly-typed.

## `third_party/` is gitignored (OHYG1)

`third_party/` is the operator-side read-only upstream mirror — workerd, workers-sdk, terragrunt, vendored agent-skills, etc. Never tracked in git, never scanned by the verify chain or OSV. **Do not** add files there in a commit; **do not** assume CI sees that directory. Local agent operations (Grep/Glob/find) should pass an explicit exclude OR rely on git-aware tools (`git grep`, `git ls-files`) so they don't traverse 13k+ upstream files. Defense in depth: `.gitignore` excludes the path from git; `.github/workflows/osv-scanner.yml` passes `--experimental-exclude=third_party` to OSV as a belt-and-suspenders.

## Tool surface

- **16+ MCP tools** across 5 lanes: `engineering_*`, `blog_*`, `support_*`, `llms_*`, `vendor_*` plus `search_tools` (progressive disclosure)
- **25 vendor doc mirrors** under `vendor/`:
  - **First-party Anthropic surfaces:** `anthropics/` (code.claude.com + platform.claude.com + claude.com/docs), `claude-sitemap/` (claude.com blog + connectors + customers + plugins + resources + solutions + code-with-claude + support.claude.com EN articles), `anthropic-sitemap/` (anthropic.com engineering + news + research + learn + product + features + economic-futures + claude)
  - **Ecosystem & subprocessors:** cloudflare, neon, stripe, twilio, workos, elevenlabs, aws, gcp, sentry, intercom, brave-search, sift, arkose-labs, modelcontextprotocol, openfeature, opentelemetry, parallel-web, turbopuffer, spotify-confidence, nimble, iterable, osv-scanner
- **2 MCP servers**: `src/mcp/bridge-server.ts` (the knowledge bridge) and `src/mcp/npm-registry/server.ts` (npm-research lane)

## Vendor GUIDANCE.md convention

When a vendor's `llms.txt` contains hard prohibitions, deprecation directives, or other load-bearing prose that DOES NOT appear in the per-page markdown (because it lives in the llms.txt header, not in any linked doc), surface it as `vendor/{name}/GUIDANCE.md`.

Currently established for:
- `vendor/stripe/GUIDANCE.md` — Stripe is 15 years old; their llms.txt explicitly prohibits the Sources API, deprecates Charges/Tokens, and steers LLMs toward Checkout Sessions + Setup Intent. Without GUIDANCE.md, agents pattern-match deprecated patterns from training data and the per-page mirror reinforces them.

The `vendor_list` MCP tool reports `guidance: "vendor/{name}/GUIDANCE.md"` for vendors that have one. `vendor_fetch` includes `guidance: { path, must_read: true }` in its response when fetching from a vendor with a GUIDANCE.md, so agents see the directive at lookup time.

**When in doubt, read the vendor's GUIDANCE.md BEFORE recommending an API from that vendor in generated code.**

## Citation discipline

Every test file MUST have an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/`. Enforced by `scripts/lib/citation-guard.ts` in the verify chain.

Example:
```ts
/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */
```

## Commit discipline

Every commit ends with `(O<N>)`. The convention test (`src/lib/conventions.test.ts`) enforces this for commits authored after 2026-05-15T04:30Z. Pre-convention commits are grandfathered.

```
feat(neon): wire ws constructor for Pool websocket (O1)

Closes #N
Refs O1
```

## 1-ticket-1-PR discipline

The chassis's managed-coworkers (under `packages/knowledge-work-plugins/`) follow a strict 1-ticket-1-PR rule. Every PR closes exactly one ticket; ticket-system priority is Atlassian → GitHub Issues fallback.

**Atlassian workspace:** [`managedsubagents.atlassian.net`](https://managedsubagents.atlassian.net/) (OAuth-only via the official Atlassian Remote MCP Server at `https://mcp.atlassian.com/v1/mcp/authv2`, declared in `.mcp.json` as `atlassian`). Tickets use the format `jira-<PROJECT>-<n>` (where `<PROJECT>` is the Jira project key); the chassis's `isTicketRef()` validator in `src/domain/coworkers/CoworkerSession.ts` accepts that and the `gh-<owner>/<repo>#<n>` fallback.

When the Atlassian MCP isn't surfaced in a remote-execution session (it's OAuth-gated to the operator's account), the GitHub-issues fallback applies — see issue #113 / PR #114 as the worked example.

## See also

- `RUNBOOK.md` — using Claude Opus 4.7 (1M context) as the web orchestrator
- `CONTRIBUTING.md` — forking-founder onboarding
- `DEVELOPER.md` — developer setup + workflows
- `README.md` — surface overview
- `packages/knowledge-work-plugins/*/coworker-context.md` — per-vertical chassis grounding (OAuth-only, vendor mirrors, outcome IDs, ticket-ref formats)
- `seeds/citations/cloudflare-managed-agents.md` — architectural citation (brain/hands decoupling)
- `docs/architecture.md` — runtime topology
- `docs/governance.md` — branch ruleset + auto-merge state machine
- `docs/decisions/` — ADRs. Load-bearing recent ones:
  - `2026-05-16-osv-only-no-secret-scanning.md` (OSL1) — GoogleOSV-only; secret_scanning_* + dependabot_security_updates must remain disabled
  - `2026-05-16-platform-engineering-plugin.md` (OPE1) — Voyage→Turbopuffer→AlloyDB bridge + plugin scaffolding
  - `2026-05-16-enterprise-control-plane.md` (OCP1) — knowledge-engineering as the operator's enterprise/org control plane
  - `2026-05-16-polyrepo-sibling-pattern.md` (OPR1) — env-var-abstraction for sibling repos (no submodules)
  - `2026-05-16-org-repo-settings-policy.md` — org/repo settings adopted from Anthropic reference repos (superseded in part by OSL1)
