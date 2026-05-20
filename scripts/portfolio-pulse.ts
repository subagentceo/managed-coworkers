#!/usr/bin/env tsx
/**
 * CLI for the site-portfolio-pulse skill.
 *
 * Usage:
 *   tsx scripts/portfolio-pulse.ts [portfolio.json]
 *   cat portfolio.json | tsx scripts/portfolio-pulse.ts
 *
 * Reads a site portfolio manifest and writes a Markdown digest to stdout.
 * Cloudflare Analytics data (requests, 5xx, P50 latency) is printed as "—"
 * when no analytics JSON is supplied; the skill's runtime step instructs
 * Claude to query the cloudflare-codemode MCP and pipe results back.
 *
 * Refs: OPMP6.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildDigest, parseSitePortfolio, renderDigestMarkdown } from "./lib/portfolio-pulse.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readInput(): string {
  const arg = process.argv[2];
  if (arg) {
    const p = resolve(process.cwd(), arg);
    return readFileSync(p, "utf8");
  }
  // Fall back to example portfolio bundled with the plugin
  const example = resolve(
    __dirname,
    "..",
    "packages/knowledge-work-plugins/product-management/site-portfolio.example.json",
  );
  return readFileSync(example, "utf8");
}

const json = readInput();
const sites = parseSitePortfolio(json);
const digest = buildDigest(sites);
process.stdout.write(renderDigestMarkdown(digest) + "\n");
