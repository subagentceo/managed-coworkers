#!/usr/bin/env tsx
/**
 * CLI for the content-gap-brief skill.
 *
 * Usage:
 *   tsx scripts/content-gap-brief.ts --demo
 *   tsx scripts/content-gap-brief.ts --gsc=<queries.json> --pages=<pages.json> --hostname=<host>
 *
 * In practice, GSC data is fetched by Claude via the gsc OAuth MCP and
 * page inventory comes from sitemap parsing (seo-audit skill) or CF Analytics.
 *
 * Refs: OPMP8.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  buildContentGapBrief,
  renderContentGapBriefMarkdown,
} from "./lib/content-gap-brief.js";
import type { ExistingPage, GscQuery } from "./lib/content-gap-brief.js";

const args = process.argv.slice(2);

if (args.includes("--demo")) {
  const queries: GscQuery[] = [
    { query: "claude code alternatives", clicks: 29, impressions: 2400, ctr: 0.012, position: 18.3 },
    { query: "managed agents tutorial", clicks: 32, impressions: 1800, ctr: 0.018, position: 15.1 },
    { query: "cloudflare workers typescript", clicks: 45, impressions: 1200, ctr: 0.021, position: 12.4 },
    { query: "claude api key setup", clicks: 200, impressions: 1100, ctr: 0.182, position: 4.2 },
    { query: "anthropic oauth token", clicks: 12, impressions: 800, ctr: 0.015, position: 22.7 },
  ];
  const pages: ExistingPage[] = [
    { url: "https://example.com/claude-api-guide", slug: "claude-api-guide", title: "Claude API Guide" },
    { url: "https://example.com/workers-getting-started", slug: "workers-getting-started", title: "Cloudflare Workers Getting Started" },
  ];
  const brief = buildContentGapBrief("demo.example.com", queries, pages);
  process.stdout.write(renderContentGapBriefMarkdown(brief) + "\n");
  process.exit(0);
}

const gscFlag = args.find((a) => a.startsWith("--gsc="));
const pagesFlag = args.find((a) => a.startsWith("--pages="));
const hostnameFlag = args.find((a) => a.startsWith("--hostname="));
const minImpressionsFlag = args.find((a) => a.startsWith("--min-impressions="));

if (!gscFlag || !hostnameFlag) {
  process.stderr.write(
    "Usage:\n  tsx scripts/content-gap-brief.ts --demo\n  tsx scripts/content-gap-brief.ts --gsc=<queries.json> --hostname=<host> [--pages=<pages.json>] [--min-impressions=N]\n",
  );
  process.exit(1);
}

const queries: GscQuery[] = JSON.parse(
  readFileSync(resolve(process.cwd(), gscFlag.slice("--gsc=".length)), "utf8"),
);
const pages: ExistingPage[] = pagesFlag
  ? JSON.parse(readFileSync(resolve(process.cwd(), pagesFlag.slice("--pages=".length)), "utf8"))
  : [];
const hostname = hostnameFlag.slice("--hostname=".length);
const minImpressions = minImpressionsFlag
  ? parseInt(minImpressionsFlag.slice("--min-impressions=".length), 10)
  : undefined;

const brief = buildContentGapBrief(hostname, queries, pages, { minImpressions });
process.stdout.write(renderContentGapBriefMarkdown(brief) + "\n");
