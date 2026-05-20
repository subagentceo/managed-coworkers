---
name: seo-audit
description: Audit a site's technical SEO health — robots.txt, sitemap.xml, and Core Web Vitals (LCP, CLS). Produces a scored "Needs Intervention" list across the portfolio. Use when the operator wants to identify which of the 100 CF-hosted sites need immediate SEO fixes.
argument-hint: "[hostname | --batch portfolio.json | --demo]"
chassis-grounding: ../../coworker-context.md
---

# SEO Audit

SEO-native product-management skill. Backed by `scripts/lib/seo-audit.ts` (pure functions, 20 unit tests) + `scripts/seo-audit.ts` (CLI wrapper).

HTTP fetches (robots.txt, sitemap.xml) and CWV measurements go through the `cloudflare-codemode` MCP (Browser Rendering API) or `nimble` crawler at skill runtime. The TypeScript library handles scoring and markdown report generation.

## Workflow

1. **Identify scope.** Single hostname or full portfolio batch:
   - Single site: `tsx scripts/seo-audit.ts <hostname>`
   - All portfolio sites: `tsx scripts/seo-audit.ts --batch portfolio.json`
   - Demo output: `tsx scripts/seo-audit.ts --demo`

2. **Fetch raw signals** (Claude does this via MCP):
   - `GET https://<hostname>/robots.txt`
   - `GET https://<hostname>/sitemap.xml`
   - CWV data via Cloudflare Browser Rendering API or CrUX API (optional)

3. **Run checks.** Each site is scored 0–100:

   | Check | Severity | Score impact |
   |---|---|---|
   | robots.txt missing | warn | −5 |
   | robots.txt `Disallow: /` | error | −20 |
   | No `Sitemap:` in robots.txt | warn | −5 |
   | sitemap.xml missing | error | −20 |
   | sitemap.xml empty | error | −20 |
   | sitemap.xml has no `<lastmod>` | warn | −5 |
   | LCP > 4000ms (poor) | error | −20 |
   | LCP 2500–4000ms (needs improvement) | warn | −5 |
   | CLS > 0.25 (poor) | error | −20 |
   | CLS 0.1–0.25 (needs improvement) | warn | −5 |

4. **Output the audit report** — Markdown table with **Needs Intervention** (score < 80) separated from **Healthy** (score ≥ 80):

   ```bash
   tsx scripts/seo-audit.ts --demo
   ```

## Output format

```markdown
# SEO Audit — 2 sites

_Generated 2026-05-20T18:00:00.000Z_

## Needs Intervention (1)

| Site | Score | Issues |
|---|---|---|
| broken.com | 55 | sitemap.xml, Sitemap in robots.txt |

### Issue Detail

#### broken.com
- ✓ **robots.txt**: robots.txt present
- ⚠ **Sitemap in robots.txt**: No Sitemap: directive in robots.txt
- ✗ **sitemap.xml**: sitemap.xml not found — reduces crawl coverage

## Healthy (1)

| Site | Score |
|---|---|
| clean.com | 100 |
```

## Connectors

| Connector | Required | How |
|---|---|---|
| Nimble crawler | For robots.txt/sitemap fetch | `nimble_extract` MCP tool |
| `cloudflare-codemode` Browser Rendering | For CWV measurement | CF Browser Rendering API |

Both are optional — the audit still runs with `null` values for any signal not fetched (those checks are omitted from scoring).

## See also

- `../../coworker-context.md` — chassis grounding, OAuth-only invariant
- `scripts/lib/seo-audit.ts` — pure-function implementation
- `scripts/lib/seo-audit.test.ts` — 20 unit tests
- `scripts/seo-audit.ts` — CLI wrapper
- `skills/site-portfolio-pulse/SKILL.md` — companion skill for traffic health digest
- `skills/content-gap-brief/SKILL.md` — companion skill for content opportunity identification
