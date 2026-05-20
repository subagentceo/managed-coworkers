#!/usr/bin/env tsx
/**
 * CLI for the seo-audit skill.
 *
 * Usage:
 *   tsx scripts/seo-audit.ts --demo
 *   tsx scripts/seo-audit.ts <hostname> [--robots=<path>] [--sitemap=<path>]
 *   tsx scripts/seo-audit.ts --batch <portfolio.json>
 *
 * In practice, robots.txt and sitemap.xml content are fetched by Claude
 * via the nimble MCP or cloudflare-codemode at skill runtime and piped
 * into this CLI. The --demo flag runs against synthetic test data.
 *
 * Refs: OPMP7.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  buildAuditReport,
  buildSiteAuditResult,
  renderAuditReportMarkdown,
} from "./lib/seo-audit.js";
import { parseSitePortfolio } from "./lib/portfolio-pulse.js";

const args = process.argv.slice(2);

if (args.includes("--demo")) {
  const results = [
    buildSiteAuditResult({
      hostname: "demo-good.com",
      robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://demo-good.com/sitemap.xml",
      sitemapXml: `<urlset><url><loc>https://demo-good.com/</loc><lastmod>2026-01-01</lastmod></url></urlset>`,
      cwv: { lcp_ms: 1800, cls: 0.05 },
    }),
    buildSiteAuditResult({
      hostname: "demo-bad.com",
      robotsTxt: "User-agent: *\nDisallow: /",
      sitemapXml: null,
      cwv: { lcp_ms: 5200, cls: 0.35 },
    }),
    buildSiteAuditResult({
      hostname: "demo-partial.com",
      robotsTxt: "User-agent: *\nAllow: /",
      sitemapXml: `<urlset><url><loc>https://demo-partial.com/</loc></url></urlset>`,
    }),
  ];
  process.stdout.write(renderAuditReportMarkdown(buildAuditReport(results)) + "\n");
  process.exit(0);
}

const batchIdx = args.indexOf("--batch");
if (batchIdx !== -1) {
  const portfolioPath = args[batchIdx + 1];
  if (!portfolioPath) {
    process.stderr.write("--batch requires a portfolio.json path\n");
    process.exit(1);
  }
  const portfolioJson = readFileSync(resolve(process.cwd(), portfolioPath), "utf8");
  const sites = parseSitePortfolio(portfolioJson);
  const results = sites.map((s) =>
    buildSiteAuditResult({ hostname: s.hostname, robotsTxt: null, sitemapXml: null }),
  );
  process.stdout.write(renderAuditReportMarkdown(buildAuditReport(results)) + "\n");
  process.exit(0);
}

const hostname = args[0];
if (!hostname) {
  process.stderr.write(
    "Usage:\n  tsx scripts/seo-audit.ts --demo\n  tsx scripts/seo-audit.ts <hostname> [--robots=<path>] [--sitemap=<path>]\n  tsx scripts/seo-audit.ts --batch <portfolio.json>\n",
  );
  process.exit(1);
}

const robotsFlag = args.find((a) => a.startsWith("--robots="));
const sitemapFlag = args.find((a) => a.startsWith("--sitemap="));
const robotsTxt = robotsFlag
  ? readFileSync(resolve(process.cwd(), robotsFlag.slice("--robots=".length)), "utf8")
  : null;
const sitemapXml = sitemapFlag
  ? readFileSync(resolve(process.cwd(), sitemapFlag.slice("--sitemap=".length)), "utf8")
  : null;

const result = buildSiteAuditResult({ hostname, robotsTxt, sitemapXml });
process.stdout.write(renderAuditReportMarkdown(buildAuditReport([result])) + "\n");
