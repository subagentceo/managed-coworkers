---
name: site-portfolio-pulse
description: Generate a daily or weekly health digest across the operator's portfolio of Cloudflare-hosted sites. Reads a site-portfolio.json manifest, queries Cloudflare Analytics for requests/errors/latency per site, and outputs a Markdown table. Use when the operator wants a snapshot of traffic health across the 100-site fleet.
argument-hint: "[portfolio.json] [--period=7d|30d]"
chassis-grounding: ../../coworker-context.md
---

# Site Portfolio Pulse

SEO-native product-management skill. First skill that uses the `Site` domain entity (PR #128) and the `sites` AlloyDB table (OPMP4).

Backed by `scripts/lib/portfolio-pulse.ts` (pure functions) + `scripts/portfolio-pulse.ts` (CLI wrapper). Cloudflare Analytics queries go through the `cloudflare-codemode` MCP at runtime.

## Workflow

1. **Load the portfolio manifest.** Read `userConfig.site_portfolio_path` (set in `.claude-plugin/plugin.json`) or fall back to the bundled example at `packages/knowledge-work-plugins/product-management/site-portfolio.example.json`.

   Each entry must have `id` (Cloudflare zone_id), `hostname`, and optionally `niche`, `target_keywords`, `owner`, `search_console_property`.

2. **Parse sites.**

   ```bash
   tsx scripts/portfolio-pulse.ts [portfolio.json]
   ```

   This emits a Markdown digest to stdout with `—` for analytics columns. Use this output as the base and fill in analytics in step 3.

3. **Query Cloudflare Analytics.** For each site, fetch the request count, 5xx errors, and P50 response time for the period. Use the `cloudflare-codemode` MCP:

   ```
   SELECT
     COUNT() AS requests,
     COUNTIF(status >= 500) AS errors5xx,
     QUANTILE(0.5, response_time_ms) AS p50_ms
   FROM workers_analytics_engine
   WHERE zone_name = '<hostname>'
     AND timestamp > NOW() - INTERVAL '7 days'
   ```

   If Cloudflare Analytics Engine is not connected (operator hasn't activated the `cf-analytics` Compose profile), skip this step and note "Analytics not connected — activate cf-analytics profile" in the digest footer.

4. **Build + render the digest.** Call `buildDigest(sites, analyticsMap)` then `renderDigestMarkdown(digest)` from `scripts/lib/portfolio-pulse.ts`, or pass the analytics JSON to the CLI:

   ```bash
   tsx scripts/portfolio-pulse.ts portfolio.json
   ```

5. **Output.** Write the Markdown table to the operator's preferred surface (paste into Slack/Linear ticket, commit to `docs/digests/<date>-pulse.md`, or display inline).

## Output format

```markdown
# Site Portfolio Pulse — 3 sites

_Generated 2026-05-20T18:00:00.000Z_

| Hostname | Owner | Niche | Top Keywords | GSC | Requests | 5xx | P50 ms |
|---|---|---|---|---|---|---|---|
| example1.com | alex | ai-tools | claude code, agent sdk, managed agents | ✓ linked | 42000 | 3 | 120 |
| example2.com | alex | developer-docs | typescript, cloudflare workers | ✓ linked | 18000 | 0 | 95 |
| example3.com | alex | seo | best seo tools | — none | — | — | — |
```

## Connectors

| Connector | Required | Compose profile |
|---|---|---|
| `cloudflare-codemode` MCP | Optional (needed for analytics) | `cf-analytics` |
| Google Search Console OAuth | Optional (for GSC status column) | `gsc` |

Both are optional — the digest still renders without them (analytics columns show `—`).

## See also

- `../../coworker-context.md` — chassis grounding, OAuth-only invariant
- `scripts/lib/portfolio-pulse.ts` — pure-function implementation
- `scripts/lib/portfolio-pulse.test.ts` — 17 unit tests
- `scripts/portfolio-pulse.ts` — CLI wrapper
- `src/domain/portfolio/Site.ts` — domain entity (OPMP4)
- `infra/alloydb/migrations/0002_sites.sql` — persistence schema
- `packages/knowledge-work-plugins/product-management/site-portfolio.example.json` — example manifest
