/**
 * @cite vendor/cloudflare/urls.md
 * @cite vendor/alloydb-omni/urls.md
 *
 * Unit tests for scripts/lib/content-gap-brief.ts (content-gap-brief skill backing).
 *
 * Internal references (not vendor/ paths, so listed as comments):
 *   - packages/knowledge-work-plugins/product-management/skills/content-gap-brief/SKILL.md
 *   - src/domain/portfolio/Site.ts
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  buildContentGapBrief,
  detectGaps,
  isCoveredByPage,
  opportunityScore,
  renderContentGapBriefMarkdown,
} from "./content-gap-brief.js";

import type { ExistingPage, GscQuery } from "./content-gap-brief.js";

// ---------------------------------------------------------------------------
// isCoveredByPage
// ---------------------------------------------------------------------------

test("isCoveredByPage: matches query word in slug", () => {
  const pages: ExistingPage[] = [{ url: "https://a.com/typescript-guide", slug: "typescript-guide" }];
  assert.equal(isCoveredByPage("typescript tutorial", pages), true);
});

test("isCoveredByPage: returns false when no word matches", () => {
  const pages: ExistingPage[] = [{ url: "https://a.com/react-hooks", slug: "react-hooks" }];
  assert.equal(isCoveredByPage("typescript tutorial", pages), false);
});

test("isCoveredByPage: matches against page title", () => {
  const pages: ExistingPage[] = [{ url: "https://a.com/p1", slug: "p1", title: "TypeScript Best Practices" }];
  assert.equal(isCoveredByPage("typescript practices", pages), true);
});

test("isCoveredByPage: short words (< 4 chars) are ignored", () => {
  const pages: ExistingPage[] = [{ url: "https://a.com/about", slug: "about" }];
  assert.equal(isCoveredByPage("how to do it", pages), true);
});

test("isCoveredByPage: returns false for empty pages", () => {
  assert.equal(isCoveredByPage("typescript tutorial", []), false);
});

// ---------------------------------------------------------------------------
// opportunityScore
// ---------------------------------------------------------------------------

test("opportunityScore: high impressions + high position + low CTR = high score", () => {
  const q: GscQuery = { query: "test", clicks: 5, impressions: 500, ctr: 0.01, position: 15 };
  const score = opportunityScore(q);
  assert.ok(score > 50, `expected score > 50, got ${score}`);
});

test("opportunityScore: position 1 with high CTR = low score", () => {
  const q: GscQuery = { query: "test", clicks: 100, impressions: 100, ctr: 0.9, position: 1 };
  const score = opportunityScore(q);
  assert.ok(score < 10, `expected low score, got ${score}`);
});

test("opportunityScore: capped at 1000", () => {
  const q: GscQuery = { query: "test", clicks: 0, impressions: 100000, ctr: 0, position: 100 };
  assert.equal(opportunityScore(q), 1000);
});

// ---------------------------------------------------------------------------
// detectGaps
// ---------------------------------------------------------------------------

const SAMPLE_PAGES: ExistingPage[] = [
  { url: "https://a.com/react-guide", slug: "react-guide", title: "React Guide" },
  { url: "https://a.com/typescript-intro", slug: "typescript-intro" },
];

const SAMPLE_QUERIES: GscQuery[] = [
  { query: "react tutorial", clicks: 5, impressions: 200, ctr: 0.025, position: 12 },
  { query: "nextjs deployment", clicks: 2, impressions: 150, ctr: 0.013, position: 18 },
  { query: "typescript types", clicks: 10, impressions: 100, ctr: 0.1, position: 5 },
  { query: "python basics", clicks: 1, impressions: 5, ctr: 0.2, position: 8 }, // below min impressions
];

test("detectGaps: excludes queries covered by existing pages", () => {
  const gaps = detectGaps(SAMPLE_QUERIES, SAMPLE_PAGES);
  assert.ok(!gaps.some((g) => g.query === "react tutorial"), "react tutorial should be covered");
  assert.ok(!gaps.some((g) => g.query === "typescript types"), "typescript types should be covered");
});

test("detectGaps: includes uncovered queries above min impressions", () => {
  const gaps = detectGaps(SAMPLE_QUERIES, SAMPLE_PAGES);
  assert.ok(gaps.some((g) => g.query === "nextjs deployment"));
});

test("detectGaps: excludes queries below min impressions", () => {
  const gaps = detectGaps(SAMPLE_QUERIES, SAMPLE_PAGES, { minImpressions: 10 });
  assert.ok(!gaps.some((g) => g.query === "python basics"), "python basics has only 5 impressions");
});

test("detectGaps: sorted by opportunityScore descending", () => {
  const manyQueries: GscQuery[] = [
    { query: "low score query", clicks: 50, impressions: 100, ctr: 0.5, position: 2 },
    { query: "high score query", clicks: 1, impressions: 500, ctr: 0.002, position: 20 },
  ];
  const gaps = detectGaps(manyQueries, [], { minImpressions: 1 });
  assert.equal(gaps[0].query, "high score query");
});

// ---------------------------------------------------------------------------
// buildContentGapBrief + render
// ---------------------------------------------------------------------------

test("buildContentGapBrief: correct metadata", () => {
  const brief = buildContentGapBrief("example.com", SAMPLE_QUERIES, SAMPLE_PAGES);
  assert.equal(brief.hostname, "example.com");
  assert.equal(brief.gscQueryCount, 4);
  assert.equal(brief.existingPageCount, 2);
});

test("renderContentGapBriefMarkdown: starts with # heading", () => {
  const brief = buildContentGapBrief("example.com", SAMPLE_QUERIES, SAMPLE_PAGES);
  const md = renderContentGapBriefMarkdown(brief);
  assert.ok(md.startsWith("# Content Gap Brief"));
});

test("renderContentGapBriefMarkdown: shows no-gaps message when none", () => {
  const brief = buildContentGapBrief("example.com", [], [], { minImpressions: 1 });
  const md = renderContentGapBriefMarkdown(brief);
  assert.ok(md.includes("No content gaps detected"));
});

test("renderContentGapBriefMarkdown: includes gap query in output", () => {
  const brief = buildContentGapBrief("example.com", SAMPLE_QUERIES, SAMPLE_PAGES);
  const md = renderContentGapBriefMarkdown(brief);
  assert.ok(md.includes("nextjs deployment"));
});
