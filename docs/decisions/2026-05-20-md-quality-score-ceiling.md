# 2026-05-20 — Md-quality score ceiling and the limit of conservative auto-fix (OMDQ15)

## Status

Accepted.

## Context

Across MD13 and MD14, the chassis ran `scripts/fix-vendor.ts` against the 6
lowest-scoring vendor mirrors in the post-MD12 baseline. Results:

| Vendor | Pre | Post | Δ | Round |
|---|---|---|---|---|
| arkose-labs | 90.1 | 95.9 | **+5.8** | MD13 |
| iterable | 89.4 | 89.4 | **+0.0** | MD13 |
| osv-scanner | 90.9 | 91.4 | +0.5 | MD13 |
| alloydb-omni | 93.8 | 94.9 | +1.1 | MD14 |
| sentry | 92.4 | 92.4 | **+0.0** | MD14 |
| anthropic-sitemap | 94.2 | 94.4 | +0.2 | MD14 |

**Two of six (33%) hit a hard 0.0 ceiling.** Iterable and sentry are at the
conservative-rewrite floor: MD11's fix-vendor.ts deliberately handles only
axes B/C/D/E (headings, fenced code, links, line discipline) and explicitly
rejects axis A (parseability) — see [`rubrics/md-quality-v1.md`](../../rubrics/md-quality-v1.md).
Their remaining `points_lost` is structural parseability noise that the
fixer cannot touch without risking the diff being unsafe.

## Decision

**The 88-93 mean band is the structural floor of conservative auto-fix.**
Vendors whose remaining `points_lost` lives in axis A are at the floor
and do not benefit from additional fix-vendor rounds.

Practical implications:

1. **Stop chasing the bottom-N in iterative rounds.** A vendor that returns
   `+0.0` should be excluded from subsequent rounds, not re-attempted.
2. **The composite score is a leading indicator, not a goal.** The whole
   point of the 100-point rubric (per [the rubric ADR](2026-05-18-md-quality-rubric.md))
   is to spot which mirrors are degrading. A flat 88.0 is fine; a vendor
   that *drops* from 94 to 88 is the real signal.
3. **Future score improvements require fundamentally different tools.**
   Either:
   - **A non-conservative round-trip rewriter** using
     `mdast-util-to-markdown` to fully re-serialize the AST. MD11
     intentionally avoided this path because round-trip reflows link
     refs, list markers, and emphasis — corrupting diffs. Re-opening
     this is a separate decision with its own risk budget.
   - **Source-side fixes.** For vendors with their own llms.txt or
     authoring pipeline, file upstream issues. For vendors where we
     own the mirror config (transform, allowlist, page_cap), refine
     the crawler config to skip mis-shaped pages.

## What we DO NOT do

- **Do not run MD16+** as another iterative fix-vendor round. The next
  6 candidate vendors include vendors already fixed and confirmed
  at the floor. The remaining +0.5 to +1.0 per vendor is not worth a
  new PR cycle.
- **Do not lower the rubric thresholds** to make scores look better.
  The rubric is the contract; bending it hides degradation.
- **Do not auto-fix axis A.** Parseability disagreements between
  CommonMark parsers are the *primary diagnostic signal* — they catch
  vendor docs whose markup confuses tooling. Auto-fixing them would
  hide bugs in either our rubric or the source mirror.

## Verification

- All-vendor baseline (`src/lib/md-quality/__golden__/all-vendors-baseline.json`)
  reflects the post-MD14 state across 32 vendors.
- Drift test (`src/lib/md-quality/all-vendors-baseline.test.ts`) is the
  ongoing canary: any vendor that drops below `golden - 0.5` fails CI.
- `npm run smoke:md-quality` is the entry point.

## References

- [OMDQ0 — rubric ADR](2026-05-18-md-quality-rubric.md)
- MD11 (`scripts/fix-vendor.ts`) — conservative B/C/D/E rewriter, axis-A rejection
- MD12 (`src/lib/md-quality/all-vendors-baseline.test.ts`) — drift canary
- MD13/MD14 commit history — the empirical floor data
