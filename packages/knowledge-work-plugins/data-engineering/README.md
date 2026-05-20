# data-engineering — managed-coworker

Sibling vertical to `product-management`. Authors **terse data models + enums** as the chassis grows. Sits across the project's existing data plane:

- **AlloyDB** — persistence (already wired at `.mcp.json:alloydb`)
- **Redis** — task queues (already wired at `.mcp.json:redis`)
- **Cloudflare** — data-architecture visualization via Workers + Workers Analytics Engine + Browser Rendering (via `cloudflare-codemode` MCP from PR #108)

OAuth-only — never `ANTHROPIC_API_KEY`. Same brain/hands architecture as the product-management coworker; same `coworker-context.md` grounding.

## Skills

| Skill | Purpose |
|---|---|
| `model-data-domain` | Design a terse TypeScript data model for a new chassis surface. Writes to `${userConfig.domain_models_path}` (default `src/domain/models/`). |
| `declare-enums` | Extract enum-of-options patterns from operator prose and codify as string-union types. The pattern this chassis already uses for `userConfig` connector enums. |
| `trace-data-flow` | Map a piece of data end-to-end (Cloudflare Worker → Redis queue → AlloyDB row → MCP read → skill consumer) and surface gaps. |
| `alloydb-schema` | Author + iterate AlloyDB schemas + migrations. Cites `vendor/alloydb-omni/` mirror. |
| `redis-queue-design` | Design Redis-backed task queues + idempotency keys. Cites `vendor/redis/` mirror. |
| `visualize-architecture` | Render the current data architecture as a diagram via the `cloudflare-codemode` MCP (Workers + Browser Rendering pipeline). |

## One-ticket-one-PR discipline

Operator works the chassis via Atlassian (Jira). The flow is:

1. A Jira issue exists with a problem statement, a clear definition-of-done, and an outcome ID.
2. This coworker (or its sibling `product-management`) opens **exactly one PR per ticket**. PR body contains `Closes JIRA-<n>`. Commit messages end with `(O<N>)` per `docs/CONVENTIONS.md`.
3. PRs merge only when the Jira ticket's acceptance criteria are met. Mirrors the chassis's outcome-driven SemVer discipline.

The ticketing MCP (`atlassian` plugin) is operator-authorized; activate via `userConfig.ticketing`.

## Connectors

Default unconditional MCPs in `.mcp.json` (sufficient for v0.1):
- `knowledge-bridge` (project)
- `alloydb` (project)
- `redis` (project)
- `cloudflare-codemode` (PR #108)

Optional connectors via `userConfig` (activated through Docker Compose profiles in PR B of the parent build sequence):
- `datastores` — additional datastore MCPs (turbopuffer, neon)
- `ticketing` — atlassian / github-projects / linear
- `viz` — chrome-devtools (snapshot validation)

## See also

- `coworker-context.md` — chassis-specific grounding (shared with product-management)
- `../product-management/` — sibling vertical
- `/root/.claude/plans/knowledge-work-plugins-require-connector-snug-gray.md` — approved plan (this vertical extends the same architecture)
