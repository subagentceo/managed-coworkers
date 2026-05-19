---
id: md-quality-v1
title: Vendor markdown quality (CommonMark 0.31.2)
status: active
total_points: 100
spec: vendor/commonmark-spec/spec.txt
spec_version: "0.31.2"
outcome_id: OMDQ0
related_adr: docs/decisions/2026-05-18-md-quality-rubric.md
---

# Rubric — md-quality-v1

Composite 100-point grade for any markdown file under `vendor/`. **Not** binary: this is a continuous score we move toward over time, weighted to reward the things a downstream LLM actually consumes (well-formed code fences, accurate links, clean headings) over surface details (line wrap).

`score = clamp(0, 100, 100 − Σ points_lost(axis))`.

## Axes

### A. Parseability — 30 points

The markdown round-trips through `mdast-util-from-markdown` (CommonMark-conformant parser) without error and produces a tree the chassis can walk.

| Rule | Pts lost (max) | Detection |
|---|---|---|
| A1. Parser throws on this file | 30 | try/catch around `fromMarkdown(src)` |
| A2. Raw HTML token leak into output | up to 10 | mdast nodes of type `html` whose payload is `<script>`, `<style>`, or unbalanced tags |
| A3. Invalid UTF-8 / U+0000 | up to 5 | byte scan |
| A4. CRLF or stray CR | up to 3 | regex `/\r/` |

CommonMark §1 (preliminaries), §6 (inlines/raw HTML).

### B. Heading hygiene — 20 points

| Rule | Pts lost (max) | Detection |
|---|---|---|
| B1. Zero or multiple H1s | 8 | mdast count where `depth===1` |
| B2. Heading depth skip (h2→h4) | up to 8 | scan depth deltas |
| B3. Setext underline used (vs ATX) | up to 4 | mdast `position` length-mismatch check |
| B4. Empty heading text | 4 | `node.children.length===0` |

CommonMark §4.2 (ATX headings), §4.3 (Setext headings).

### C. Fenced code — 20 points

| Rule | Pts lost (max) | Detection |
|---|---|---|
| C1. Unterminated code fence | 10 | parser already flags |
| C2. Missing language tag (`info` empty) | up to 8 | mdast `code` nodes with `lang === null` |
| C3. Indented code block used instead of fence | up to 5 | mdast `code` with no `lang` AND no surrounding `position` fence syntax |
| C4. Tab-only indentation in code | up to 2 | string scan on `value` |

CommonMark §4.5 (fenced code blocks), §4.4 (indented code).

### D. Link hygiene — 15 points

| Rule | Pts lost (max) | Detection |
|---|---|---|
| D1. Empty link `[]()` / `[]( )` | 5 | mdast `link` with empty `url` |
| D2. Dangling reference definition | 5 | unresolved `linkReference` nodes |
| D3. Relative path that escapes `vendor/<v>/` | 5 | `..` segments that walk out of the vendor dir |
| D4. Empty link text | up to 3 | `link.children.length===0` |

CommonMark §6.3 (links), §4.7 (link reference definitions).

### E. Line discipline — 15 points

String-level (no AST), graduated lose.

| Rule | Pts lost (max) | Detection |
|---|---|---|
| E1. Trailing whitespace | up to 5 | 1 pt per 50 lines with trailing WS |
| E2. CRLF / LF mix | 5 | any CR present |
| E3. Tab + space at line start mixed | up to 3 | scan first chars per line |
| E4. Line > 200 cols (soft cap) | up to 2 | 1 pt per 100 over-cap lines |

Not in the CommonMark spec; these protect downstream tooling (grep, diff, screen-reader, AST diff stability).

## Aggregate output

`gradeMarkdown(src)` returns:

```ts
{
  score: number,                  // 0..100
  breakdown: { A: number, B: number, C: number, D: number, E: number },
  top_violations: [
    { axis, rule, line, msg, points_lost }
  ]                                // up to 5, sorted desc by points_lost
}
```

## How we use the score

1. **Per-vendor mean** is the headline grade (e.g. `vendor/cloudflare/ → 73.2`).
2. **Per-axis mean** tells us where to invest improvement effort.
3. **Top-3 vendors** (`cloudflare`, `anthropics`, `anthropic-sitemap` + `claude-sitemap`) get a 3× bias in the improvement picker.
4. Improvements may land as crawler-transform changes (`scripts/lib/transforms.ts`) AND/OR targeted in-place AST patches via `scripts/fix-vendor.ts` (≤200 files per PR).

## Versioning

`md-quality-v1` pins to CommonMark spec v0.31.2 mirrored at `vendor/commonmark-spec/`. A future `md-quality-v2` may add accessibility axes (alt text, table headers) or markdown-extension support (GFM tables, task lists) — but the v1 100-point envelope stays.
