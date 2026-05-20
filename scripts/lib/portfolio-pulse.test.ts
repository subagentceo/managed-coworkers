/**
 * @cite vendor/cloudflare/urls.md
 * @cite vendor/alloydb-omni/urls.md
 *
 * Unit tests for scripts/lib/portfolio-pulse.ts (site-portfolio-pulse skill backing).
 *
 * Internal references (not vendor/ paths, so listed as comments):
 *   - packages/knowledge-work-plugins/product-management/skills/site-portfolio-pulse/SKILL.md
 *   - src/domain/portfolio/Site.ts
 *   - infra/alloydb/migrations/0002_sites.sql
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  buildDigest,
  parseSitePortfolio,
  renderDigestMarkdown,
} from "./portfolio-pulse.js";

// ---------------------------------------------------------------------------
// parseSitePortfolio
// ---------------------------------------------------------------------------

test("parseSitePortfolio: accepts bare array", () => {
  const json = JSON.stringify([
    { id: "zone-1", hostname: "example.com", niche: "tech", target_keywords: ["ai"], owner: "alex" },
  ]);
  const sites = parseSitePortfolio(json);
  assert.equal(sites.length, 1);
  assert.equal(sites[0].hostname, "example.com");
  assert.equal(sites[0].niche, "tech");
  assert.deepEqual([...sites[0].targetKeywords], ["ai"]);
  assert.equal(sites[0].searchConsoleProperty, null);
});

test("parseSitePortfolio: accepts { sites: [] } wrapper", () => {
  const json = JSON.stringify({
    sites: [{ id: "z", hostname: "foo.io", owner: "bob" }],
  });
  const sites = parseSitePortfolio(json);
  assert.equal(sites.length, 1);
  assert.equal(sites[0].hostname, "foo.io");
  assert.equal(sites[0].niche, "unspecified");
});

test("parseSitePortfolio: accepts camelCase targetKeywords", () => {
  const json = JSON.stringify([
    { id: "z", hostname: "foo.io", targetKeywords: ["kw1", "kw2"] },
  ]);
  const sites = parseSitePortfolio(json);
  assert.deepEqual([...sites[0].targetKeywords], ["kw1", "kw2"]);
});

test("parseSitePortfolio: accepts search_console_property + searchConsoleProperty", () => {
  const s1 = parseSitePortfolio(
    JSON.stringify([{ id: "a", hostname: "a.com", search_console_property: "sc-domain:a.com" }]),
  );
  assert.equal(s1[0].searchConsoleProperty, "sc-domain:a.com");

  const s2 = parseSitePortfolio(
    JSON.stringify([{ id: "b", hostname: "b.com", searchConsoleProperty: "sc-domain:b.com" }]),
  );
  assert.equal(s2[0].searchConsoleProperty, "sc-domain:b.com");
});

test("parseSitePortfolio: rejects invalid JSON", () => {
  assert.throws(() => parseSitePortfolio("{invalid}"), /invalid JSON/);
});

test("parseSitePortfolio: rejects missing id", () => {
  assert.throws(
    () => parseSitePortfolio(JSON.stringify([{ hostname: "foo.com" }])),
    /id must be a non-empty string/,
  );
});

test("parseSitePortfolio: rejects missing hostname", () => {
  assert.throws(
    () => parseSitePortfolio(JSON.stringify([{ id: "z" }])),
    /hostname must be a non-empty string/,
  );
});

test("parseSitePortfolio: rejects non-array JSON", () => {
  assert.throws(() => parseSitePortfolio(JSON.stringify("a string")), /expected JSON array/);
});

// ---------------------------------------------------------------------------
// buildDigest
// ---------------------------------------------------------------------------

test("buildDigest: sets siteCount and generatedAt", () => {
  const sites = parseSitePortfolio(
    JSON.stringify([
      { id: "z1", hostname: "a.com" },
      { id: "z2", hostname: "b.com" },
    ]),
  );
  const digest = buildDigest(sites);
  assert.equal(digest.siteCount, 2);
  assert.ok(digest.generatedAt.length > 0);
  assert.ok(new Date(digest.generatedAt).getTime() > 0);
});

test("buildDigest: topKeywords is first 3 joined", () => {
  const sites = parseSitePortfolio(
    JSON.stringify([
      { id: "z", hostname: "a.com", target_keywords: ["kw1", "kw2", "kw3", "kw4"] },
    ]),
  );
  const digest = buildDigest(sites);
  assert.equal(digest.rows[0].topKeywords, "kw1, kw2, kw3");
});

test("buildDigest: topKeywords is — when no keywords", () => {
  const sites = parseSitePortfolio(JSON.stringify([{ id: "z", hostname: "a.com" }]));
  const digest = buildDigest(sites);
  assert.equal(digest.rows[0].topKeywords, "—");
});

test("buildDigest: gscStatus reflects searchConsoleProperty", () => {
  const sites = parseSitePortfolio(
    JSON.stringify([
      { id: "z1", hostname: "a.com", search_console_property: "sc-domain:a.com" },
      { id: "z2", hostname: "b.com" },
    ]),
  );
  const digest = buildDigest(sites);
  assert.equal(digest.rows[0].gscStatus, "✓ linked");
  assert.equal(digest.rows[1].gscStatus, "— none");
});

test("buildDigest: merges analytics snapshots by hostname", () => {
  const sites = parseSitePortfolio(
    JSON.stringify([{ id: "z", hostname: "a.com" }]),
  );
  const digest = buildDigest(sites, { "a.com": { requests: 42000, errors5xx: 3, p50ResponseMs: 120 } });
  assert.equal(digest.rows[0].analytics.requests, 42000);
  assert.equal(digest.rows[0].analytics.errors5xx, 3);
  assert.equal(digest.rows[0].analytics.p50ResponseMs, 120);
});

test("buildDigest: analytics row is empty object when no snapshot", () => {
  const sites = parseSitePortfolio(JSON.stringify([{ id: "z", hostname: "a.com" }]));
  const digest = buildDigest(sites);
  assert.deepEqual(digest.rows[0].analytics, {});
});

// ---------------------------------------------------------------------------
// renderDigestMarkdown
// ---------------------------------------------------------------------------

test("renderDigestMarkdown: starts with # heading", () => {
  const sites = parseSitePortfolio(JSON.stringify([{ id: "z", hostname: "a.com" }]));
  const md = renderDigestMarkdown(buildDigest(sites));
  assert.ok(md.startsWith("# Site Portfolio Pulse"));
});

test("renderDigestMarkdown: contains hostname in table row", () => {
  const sites = parseSitePortfolio(JSON.stringify([{ id: "z", hostname: "special-site.com" }]));
  const md = renderDigestMarkdown(buildDigest(sites));
  assert.ok(md.includes("special-site.com"));
});

test("renderDigestMarkdown: shows — for missing analytics", () => {
  const sites = parseSitePortfolio(JSON.stringify([{ id: "z", hostname: "a.com" }]));
  const md = renderDigestMarkdown(buildDigest(sites));
  const tableRows = md.split("\n").filter((l) => l.startsWith("| a.com"));
  assert.equal(tableRows.length, 1);
  assert.ok(tableRows[0].includes("| — | — | — |"));
});

test("renderDigestMarkdown: singular/plural site count", () => {
  const one = parseSitePortfolio(JSON.stringify([{ id: "z", hostname: "a.com" }]));
  const two = parseSitePortfolio(
    JSON.stringify([{ id: "z1", hostname: "a.com" }, { id: "z2", hostname: "b.com" }]),
  );
  assert.ok(renderDigestMarkdown(buildDigest(one)).includes("1 site\n"));
  assert.ok(renderDigestMarkdown(buildDigest(two)).includes("2 sites\n"));
});
