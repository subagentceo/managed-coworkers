# product-management — managed-coworker

A project-local fork of `anthropics/knowledge-work-plugins/product-management`, narrowed to the chassis's primary near-term goal: growing agentic traffic to a fleet of 100 Cloudflare-hosted sites.

## What's different from upstream

- **OAuth-only**: harness runs Claude Code with `CLAUDE_CODE_OAUTH_TOKEN`, never `ANTHROPIC_API_KEY`. Enforced by `src/oauth/token.ts` and the Cloudflare Worker env-sanitizer.
- **Connector enum, not auto-load**: upstream loads ~16 MCP servers unconditionally (~40-80KB context per session). This fork ships only `knowledge-bridge` + `cloudflare-codemode` in `.mcp.json`; optional connectors are activated by Docker Compose profiles + `userConfig` choices, driven by `scripts/setup-coworker.ts`.
- **5 forked skills + 3 SEO-native** (8 total):
  - Forked (verbatim from upstream): `write-spec`, `roadmap-update`, `metrics-review`, `synthesize-research`, `competitive-brief`
  - New SEO-native: `site-portfolio-pulse`, `seo-audit`, `content-gap-brief`
- **Private**: not published to a marketplace. Lives in this monorepo.
- **Materializes as a Cloudflare Worker**: `infra/cloudflare/coworkers/product-management/` deploys the plugin's skills + selected MCPs into a self-hosted Sandbox container per the cloudflare/claude-managed-agents brain/hands pattern (PR C of the build sequence).

## Layout

```
.claude-plugin/plugin.json   — manifest + userConfig (connector enum)
.mcp.json                    — unconditional MCPs (knowledge-bridge, cloudflare-codemode)
coworker-context.md          — chassis-specific grounding (OAuth, vendor mirrors, outcome IDs)
skills/                      — 8 skills (SKILL.md per directory)
README.md                    — this file
```

## Using this coworker locally

1. Open the project in VS Code / Codespaces. The `.devcontainer/product-management/` config (PR B) spins up:
   - Node 22 + claude CLI + wrangler + docker-in-docker
   - AlloyDB + Redis (existing chassis stack via root compose)
   - Selected MCP connectors (via Compose profiles based on your `userConfig` picks)
2. The container's postCreate runs `claude /login && tsx scripts/setup-coworker.ts product-management`.
3. Invoke skills as `/<skill-name>` in a `claude` session (e.g. `/site-portfolio-pulse`).

## Connector enum reference

Each `userConfig` category accepts multiple values (operator picks any subset). The set of valid values is documented in `.docker/mcp-toolkit/compose.yaml` (Compose profile names).

| Category | Typical picks |
|---|---|
| `analytics` | `cf-analytics-engine`, `ga4` |
| `search_console` | `gsc` |
| `chat` | `slack`, `discord`, `telegram` |
| `project_tracker` | `linear`, `github-projects` |
| `feedback` | `intercom`, `github-issues` |

The picks land in `.devcontainer/product-management/active-connectors.json` and the script emits `docker compose --profile <name> up -d` for each.

## See also

- `coworker-context.md` — the grounding doc every skill references
- `seeds/citations/cloudflare-managed-agents.md` — the architectural citation
- `vendor/cloudflare-managed-agents-template/` — the upstream Cloudflare deployment template
- `/root/.claude/plans/knowledge-work-plugins-require-connector-snug-gray.md` — the approved plan
