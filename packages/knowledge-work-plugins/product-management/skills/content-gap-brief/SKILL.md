---
name: content-gap-brief
description: Analyze Google Search Console query data against the site's existing page inventory and produce a prioritized "publish this next" content brief. Use when the operator wants to know which content gaps to fill for maximum organic traffic gain on a specific CF-hosted site.
argument-hint: "<hostname> [--portfolio=path] [--min-impressions=N]"
chassis-grounding: ../../coworker-context.md
---

# Content Gap Brief

SEO-native product-management skill. Backed by `scripts/lib/content-gap-brief.ts` (pure functions, 16 unit tests) + `scripts/content-gap-brief.ts` (CLI wrapper).

GSC data (queries, clicks, impressions, positions) is fetched by Claude via the GSC OAuth connector at skill runtime. This module detects gaps, scores opportunities, and generates a prioritized content brief.

## Workflow

1. **Activate the GSC connector.** The operator must have `search_console` enabled in `userConfig` and the `gsc` Docker Compose profile started:

   ```bash
   docker compose --profile gsc up -d
   ```

   If the connector is not active, the skill cannot fetch query data. See `CONNECTORS.md` for setup.

2. **Fetch GSC query data.** Via the GSC OAuth MCP:

   ```
   GET https://searchconsole.googleapis.com/webmasters/v3/sites/<property>/searchAnalytics/query
   {
     "startDate": "<7d-ago>",
     "endDate": "<today>",
     "dimensions": ["query"],
     "rowLimit": 500
   }
   ```

   Each row gives `query`, `clicks`, `impressions`, `ctr`, `position`.

3. **Fetch existing page inventory.** Via the Cloudflare Analytics or sitemap:
   - Parse the site's `sitemap.xml` (from the `seo-audit` skill output)
   - Or query Cloudflare Analytics Engine for the top landing pages

4. **Run gap detection.** A query is "covered" if any word (≥ 4 chars) from the query appears in an existing page's slug or title. Uncovered queries with impressions ≥ threshold are gaps.

5. **Score + rank opportunities.** Formula: `impressions × (position/10) × (1 - ctr)`.
   High impressions + high ranking position + low CTR = highest priority.

6. **Output the brief:**

   ```bash
   tsx scripts/content-gap-brief.ts --demo
   ```

## Output format

```markdown
# Content Gap Brief — example.com

_Generated 2026-05-20T18:00:00.000Z · 450 GSC queries · 23 existing pages_

## Top 10 Opportunities

| # | Query | Impressions | Avg Position | CTR | Opportunity Score |
|---|---|---|---|---|---|
| 1 | claude code alternatives | 2,400 | 18.3 | 1.2% | 847 |
| 2 | managed agents tutorial | 1,800 | 15.1 | 1.8% | 614 |
| 3 | cloudflare workers ai | 1,200 | 12.4 | 2.1% | 388 |

## Recommended Next Posts

### 1. "claude code alternatives"

**Impressions:** 2,400 · **Avg position:** 18.3 · **Opportunity:** 847

**Suggested title:** Write a targeted post for "claude code alternatives" — currently ranking at position 18 with no dedicated page.
```

## Connectors

| Connector | Required | Compose profile |
|---|---|---|
| Google Search Console OAuth | **Required** for gap detection | `gsc` |
| Cloudflare Analytics | Optional (for page inventory) | `cf-analytics` |

Without the GSC connector, no query data is available and the skill cannot run.

## See also

- `../../coworker-context.md` — chassis grounding, OAuth-only invariant
- `scripts/lib/content-gap-brief.ts` — pure-function implementation
- `scripts/lib/content-gap-brief.test.ts` — 16 unit tests
- `scripts/content-gap-brief.ts` — CLI wrapper
- `skills/seo-audit/SKILL.md` — prerequisite: get sitemap → page inventory from seo-audit
- `skills/site-portfolio-pulse/SKILL.md` — companion: fleet-wide traffic health
- `../../CONNECTORS.md` — connector activation guide
