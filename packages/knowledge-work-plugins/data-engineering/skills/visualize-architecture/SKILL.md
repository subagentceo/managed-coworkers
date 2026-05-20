---
name: visualize-architecture
description: Render the chassis's current data architecture as a diagram. Use when onboarding a new operator, prepping an ADR, or surfacing the result of a trace-data-flow run. Outputs SVG (via Cloudflare Browser Rendering pipeline through the cloudflare-codemode MCP) and a Mermaid source file alongside it.
argument-hint: "[domain-filter: all|coworker|connector|dataplane]"
chassis-grounding: ../../coworker-context.md
---

# Visualize Architecture — stub

This is a stub. Implementation lands in a follow-up commit (ODEP7). When written, this skill will:

1. Take an optional domain filter (default `all`).
2. Walk the chassis to assemble the architecture graph:
   - Read `.mcp.json` and `packages/knowledge-work-plugins/*/.mcp.json` for MCP servers.
   - Read `packages/knowledge-work-plugins/*/.claude-plugin/plugin.json` for userConfig categories (the connector enum).
   - Read `infra/cloudflare/wrangler.jsonc` + `infra/cloudflare/coworkers/*/wrangler.jsonc` for Worker bindings.
   - Read `infra/alloydb/migrations/` for table names.
   - Read `docs/data/redis-keys.md` (when present) for queue/key namespaces.
3. Author a Mermaid source at `docs/architecture/data-flow.mmd`.
4. Render the Mermaid through Cloudflare Browser Rendering (via `cloudflare-codemode` MCP, the Code Mode API) to an SVG at `docs/architecture/data-flow.svg`.
5. Update `docs/architecture.md` to embed the rendered SVG.

Cites: `vendor/cloudflare/developers.cloudflare.com/browser-rendering/`, `seeds/citations/cloudflare-managed-agents.md`.

See `../../coworker-context.md` for chassis grounding.
