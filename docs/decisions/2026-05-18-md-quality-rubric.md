---
date: 2026-05-18
status: accepted
deciders: alex-jadecli
outcome_id: OMDQ0
---

# ADR — Composite 100-point vendor markdown quality rubric (CommonMark 0.31.2)

## Context

The chassis maintains `vendor/` — a local mirror of ~30k markdown files across 31 vendor doc surfaces, produced by `scripts/crawl-vendors.ts` (Turndown HTML→MD). Sampling shows real structural inconsistency: heading depth varies, frontmatter is sporadic, fenced code is absent in some surfaces, line lengths drift past 700 chars. Downstream LLM consumers (chassis agents, this codebase's own MCP knowledge bridge) silently absorb these inconsistencies. We can't tell whether a refresh made things better or worse.

The operator pointed to the CommonMark spec v0.31.2 ([spec.commonmark.org/0.31.2](https://spec.commonmark.org/0.31.2/), [github.com/commonmark](https://github.com/commonmark)) as the canonical standard. Six upstream repos exist (`cmark`, `commonmark.js`, `commonmark-spec`, `commonmark-java`, `commonmark-web`, `commonmark-spec-web`); we mirrored `commonmark-spec` (the spec text + reference test fixtures) into `vendor/commonmark-spec/`.

Explicit operator direction: **"outcomes and rubrics for this aren't a binary or 1 type check. rather it should be a composite score out of 100 that we want to make incremental progress towards across vendors over time."** Top-3 vendor focus: `cloudflare`, `anthropics`, `claude` (= `anthropic-sitemap` + `claude-sitemap`).

## Decision

Adopt **`rubrics/md-quality-v1.md`** as the chassis's vendor-markdown grading standard. Five weighted axes summing to 100:

| Axis | Weight | Spec anchor |
|---|---|---|
| A. Parseability | 30 | CommonMark §1 (preliminaries), §6 (raw HTML) |
| B. Heading hygiene | 20 | CommonMark §4.2 (ATX), §4.3 (Setext) |
| C. Fenced code | 20 | CommonMark §4.4–4.5 (code blocks) |
| D. Link hygiene | 15 | CommonMark §4.7, §6.3 (links + refs) |
| E. Line discipline | 15 | Not spec; downstream tooling hygiene |

`score = clamp(0, 100, 100 − Σ points_lost)`. Per-axis rules in the rubric file. Implementation lands across PRs MD0–MD12 (substrate) and MD13+ (iterative score improvement, biased 3× toward top-3 vendors).

## Weight rationale

- **Parseability dominates (30 pts)** because if `mdast-util-from-markdown` can't parse the file, no downstream chassis tool (semantic search, link extraction, summarization, the bridge `vendor_grep`) functions correctly on it. The single largest source of catastrophic value loss.
- **Heading and code each get 20 pts** — they're the structural skeleton LLMs use to chunk and quote. Bad headings → bad section retrieval. Bad fences → leaking code into prose.
- **Link hygiene 15 pts** — broken cross-references degrade follow-up traversal but don't break the page itself.
- **Line discipline 15 pts** — protects tooling (grep, diff stability, screen readers) but the markdown still renders. Smallest weight, graduated lose.

## Out of scope (intentional, for v1)

- GFM extensions (tables, task lists, strikethrough). Many vendor mirrors carry them; v1 doesn't grade against them so we don't over-penalize.
- Markdown style preferences not in the spec (asterisk vs underscore for emphasis, dash vs asterisk for lists).
- Accessibility axes (alt text, table headers, heading order for screen readers). Future `md-quality-v2`.
- Cross-file concerns (link target validity across vendor boundaries). Future `md-quality-link-graph` axis.

## Implementation locations

| Concern | File |
|---|---|
| Rubric definition | `rubrics/md-quality-v1.md` |
| Fixtures (spec.txt) | `vendor/commonmark-spec/spec.txt` |
| Per-axis scorer | `src/lib/md-quality/axes/{parseability,headings,fenced-code,links,line-discipline}.ts` |
| Aggregator | `src/lib/md-quality/{index,aggregate}.ts` |
| MCP lane (4 tools) | `src/mcp/lanes/md-quality.ts` |
| CLI | `scripts/grade-vendor.ts` |
| In-place AST rewriter | `scripts/fix-vendor.ts` (≤200 files/PR) |
| Crawler-side fixes | `scripts/lib/transforms.ts` (TurndownService config + post-processors) |
| Baseline snapshot | `docs/grades/2026-05-18-baseline.md` (all 31 vendors at MD12) |

## Token budget per MCP tool

| Tool | Cap |
|---|---|
| `md_quality_file(path)` | ~1500 |
| `md_quality_vendor(vendor, sample_size=20)` | ~2000 |
| `md_quality_diff(vendor, before, after)` | ~1500 |
| `md_quality_top_offenders(rule)` | ~1500 |

Hard ceiling enforced via response-size assertion in `jsonResult`; oversize falls back to `summary_only: true`.

## Forbidden patterns

- **Do not** edit `vendor/commonmark-spec/spec.txt` directly — refresh only via the procedure in `vendor/commonmark-spec/README.md` (re-copy from upstream clone + version bump).
- **Do not** raise per-axis weights without bumping rubric version (`md-quality-v2`) and rebaselining `docs/grades/`.
- **Do not** introduce GFM-aware grading into v1 axes — track as v2 work instead.

## Verification

- `vendor/commonmark-spec/spec.txt` parses cleanly through `mdast-util-from-markdown` and every passing example scores 30/30 on axis A.
- `docs/grades/2026-05-18-baseline.md` round-trip-tested by `md-quality-snapshot.test.ts`; scores stable to ±1 pt across reruns until explicit rebaseline.
- Per-PR gate: `npm run smoke:replay` + `npm run verify` green; new tests `@cite vendor/commonmark-spec/spec.txt`.

## See also

- `docs/decisions/2026-05-18-replay-only-managed-agents.md` (OREPLAY0) — the parent ADR establishing the replay-only chassis posture this rubric runs inside.
- `rubrics/md-quality-v1.md` — the live rubric.
- `vendor/commonmark-spec/README.md` — fixture provenance + refresh procedure.
