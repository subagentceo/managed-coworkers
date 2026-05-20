# vendor/commonmark-spec/

CommonMark Spec v0.31.2 mirror — vendored 2026-05-18 from
https://github.com/commonmark/commonmark-spec.

## What's here

| File | Purpose |
|---|---|
| `spec.txt` | The complete spec source (9811 lines, ~1427 example blocks). Each example is a `markdown → expected HTML` pair. |
| `test/spec_tests.py` | Upstream reference Python harness that extracts examples from `spec.txt`. |
| `test/normalize.py` | HTML normalization helper used by `spec_tests.py`. |
| `LICENSE` | CC-BY-SA 4.0 (upstream). |
| `STUDY.json` | Chassis metadata declaring the pin and source URL. (Was `crawl.json` — renamed in OGHW7 so `scripts/crawl-vendors.ts`'s `listVendorConfigs()` filters this directory out as a study clone, matching its actual not-refreshable status.) |

## How the chassis uses it

`src/lib/md-quality/fixtures.ts` parses `spec.txt` and surfaces the example pairs as deterministic test fixtures for the 5 grading axes (parseability, headings, fenced code, links, line discipline). Every chassis test under `src/lib/md-quality/axes/*.test.ts` carries an `@cite vendor/commonmark-spec/spec.txt` header so `scripts/lib/citation-guard.ts` accepts the path.

## Refresh

When CommonMark cuts a new spec version:

1. `cd /Users/alexzh/subagentmcp/subagentceo/commonmark/commonmark-spec && git pull`
2. `cp spec.txt LICENSE test/{spec_tests,normalize}.py` into this directory.
3. Bump `version` in `STUDY.json` and re-run `npm run smoke:replay` + the `md-quality` golden tests; rebaseline `docs/grades/<date>-baseline.md` if scores drift.
