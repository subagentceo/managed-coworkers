/**
 * @cite vendor/nimble/urls.md
 * @cite vendor/cloudflare/urls.md
 *
 * Unit tests for scripts/lib/seo-audit.ts (seo-audit skill backing).
 *
 * Internal references (not vendor/ paths, so listed as comments):
 *   - packages/knowledge-work-plugins/product-management/skills/seo-audit/SKILL.md
 *   - src/domain/portfolio/Site.ts
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  analyzeRobotsTxt,
  analyzeSitemap,
  buildAuditChecks,
  buildAuditReport,
  buildSiteAuditResult,
  renderAuditReportMarkdown,
  scoreChecks,
} from "./seo-audit.js";

// ---------------------------------------------------------------------------
// analyzeRobotsTxt
// ---------------------------------------------------------------------------

test("analyzeRobotsTxt: detects Sitemap directive", () => {
  const r = analyzeRobotsTxt("User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml");
  assert.equal(r.hasSitemapDirective, true);
});

test("analyzeRobotsTxt: detects missing Sitemap directive", () => {
  const r = analyzeRobotsTxt("User-agent: *\nAllow: /");
  assert.equal(r.hasSitemapDirective, false);
});

test("analyzeRobotsTxt: detects Disallow: /", () => {
  const r = analyzeRobotsTxt("User-agent: *\nDisallow: /");
  assert.equal(r.disallowsAll, true);
});

test("analyzeRobotsTxt: Disallow: /foo does not trigger disallowsAll", () => {
  const r = analyzeRobotsTxt("User-agent: *\nDisallow: /private");
  assert.equal(r.disallowsAll, false);
});

// ---------------------------------------------------------------------------
// analyzeSitemap
// ---------------------------------------------------------------------------

test("analyzeSitemap: empty string returns found=false", () => {
  const s = analyzeSitemap("");
  assert.equal(s.found, false);
  assert.equal(s.urlCount, 0);
});

test("analyzeSitemap: counts <url> tags", () => {
  const xml = `<?xml version="1.0"?>
<urlset>
  <url><loc>https://a.com/</loc></url>
  <url><loc>https://a.com/about</loc></url>
</urlset>`;
  const s = analyzeSitemap(xml);
  assert.equal(s.found, true);
  assert.equal(s.urlCount, 2);
});

test("analyzeSitemap: detects lastmod and priority", () => {
  const xml = `<urlset><url><loc>https://a.com/</loc><lastmod>2026-01-01</lastmod><priority>0.9</priority></url></urlset>`;
  const s = analyzeSitemap(xml);
  assert.equal(s.hasLastmod, true);
  assert.equal(s.hasPriority, true);
});

test("analyzeSitemap: missing lastmod and priority", () => {
  const xml = `<urlset><url><loc>https://a.com/</loc></url></urlset>`;
  const s = analyzeSitemap(xml);
  assert.equal(s.hasLastmod, false);
  assert.equal(s.hasPriority, false);
});

// ---------------------------------------------------------------------------
// buildAuditChecks + scoreChecks
// ---------------------------------------------------------------------------

test("buildAuditChecks: perfect site scores 100", () => {
  const checks = buildAuditChecks({
    hostname: "perfect.com",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://perfect.com/sitemap.xml",
    sitemapXml: `<urlset><url><loc>https://perfect.com/</loc><lastmod>2026-01-01</lastmod></url></urlset>`,
  });
  assert.equal(scoreChecks(checks), 100);
});

test("buildAuditChecks: missing sitemap → error → score drops 20", () => {
  const checks = buildAuditChecks({
    hostname: "a.com",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://a.com/sitemap.xml",
    sitemapXml: null,
  });
  const score = scoreChecks(checks);
  assert.ok(score <= 80, `expected score ≤ 80, got ${score}`);
  assert.ok(checks.some((c) => c.id === "sitemap-missing"));
});

test("buildAuditChecks: Disallow: / → error", () => {
  const checks = buildAuditChecks({
    hostname: "b.com",
    robotsTxt: "User-agent: *\nDisallow: /",
    sitemapXml: `<urlset><url><loc>https://b.com/</loc></url></urlset>`,
  });
  assert.ok(checks.some((c) => c.id === "robots-disallow-all" && c.severity === "error"));
});

test("buildAuditChecks: missing robots.txt → warn", () => {
  const checks = buildAuditChecks({
    hostname: "c.com",
    robotsTxt: null,
    sitemapXml: `<urlset><url><loc>https://c.com/</loc></url></urlset>`,
  });
  assert.ok(checks.some((c) => c.id === "robots-missing" && c.severity === "warn"));
});

test("buildAuditChecks: CWV LCP good", () => {
  const checks = buildAuditChecks({ hostname: "d.com", robotsTxt: null, sitemapXml: null, cwv: { lcp_ms: 1200 } });
  assert.ok(checks.some((c) => c.id === "cwv-lcp-good"));
});

test("buildAuditChecks: CWV LCP poor", () => {
  const checks = buildAuditChecks({ hostname: "d.com", robotsTxt: null, sitemapXml: null, cwv: { lcp_ms: 5000 } });
  assert.ok(checks.some((c) => c.id === "cwv-lcp-poor" && c.severity === "error"));
});

test("scoreChecks: 0 errors 0 warns → 100", () => {
  assert.equal(scoreChecks([{ id: "ok", label: "X", severity: "ok", detail: "" }]), 100);
});

test("scoreChecks: 1 error → 80", () => {
  assert.equal(scoreChecks([{ id: "e", label: "X", severity: "error", detail: "" }]), 80);
});

test("scoreChecks: 2 errors 1 warn → 55", () => {
  assert.equal(
    scoreChecks([
      { id: "e1", label: "A", severity: "error", detail: "" },
      { id: "e2", label: "B", severity: "error", detail: "" },
      { id: "w1", label: "C", severity: "warn", detail: "" },
    ]),
    55,
  );
});

// ---------------------------------------------------------------------------
// buildAuditReport + renderAuditReportMarkdown
// ---------------------------------------------------------------------------

test("buildAuditReport: partitions by score < 80", () => {
  const good = buildSiteAuditResult({
    hostname: "good.com",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://good.com/sitemap.xml",
    sitemapXml: `<urlset><url><loc>https://good.com/</loc><lastmod>2026</lastmod></url></urlset>`,
  });
  const bad = buildSiteAuditResult({ hostname: "bad.com", robotsTxt: null, sitemapXml: null });
  const report = buildAuditReport([good, bad]);
  assert.equal(report.siteCount, 2);
  assert.ok(report.healthy.some((r) => r.hostname === "good.com"));
  assert.ok(report.needsIntervention.some((r) => r.hostname === "bad.com"));
});

test("renderAuditReportMarkdown: starts with # heading", () => {
  const report = buildAuditReport([buildSiteAuditResult({ hostname: "a.com", robotsTxt: null, sitemapXml: null })]);
  const md = renderAuditReportMarkdown(report);
  assert.ok(md.startsWith("# SEO Audit"));
});

test("renderAuditReportMarkdown: lists hostname in Needs Intervention section", () => {
  const report = buildAuditReport([buildSiteAuditResult({ hostname: "broken.com", robotsTxt: null, sitemapXml: null })]);
  const md = renderAuditReportMarkdown(report);
  assert.ok(md.includes("broken.com"));
  assert.ok(md.includes("Needs Intervention"));
});
