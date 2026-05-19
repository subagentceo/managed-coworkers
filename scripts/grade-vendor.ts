#!/usr/bin/env tsx
/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * grade-vendor CLI (MD6).
 *
 * Usage:
 *   npm run grade:vendor -- <vendor> [--sample=20] [--seed=N] [--json] [--axis=A|B|C|D|E]
 *
 *   <vendor>     directory under vendor/ (e.g. "cloudflare").
 *   --sample=N   number of .md files to score (default 20). Use 0 for "all".
 *   --seed=N     deterministic-seed integer for stable sample selection (default 1).
 *   --json       one-line JSON output for programmatic consumption by
 *                MCP tools (mirrors scripts/crawl-vendors.ts --json).
 *   --axis=X     restrict output to one axis (still scores all 5).
 *
 * Plain-text mode (no --json) writes a short human summary to stdout.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { gradeMarkdown } from "../src/lib/md-quality/index.js";
import type { GradeResult } from "../src/lib/md-quality/index.js";
import { sampleMarkdownFiles } from "../src/lib/md-quality/sample.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

interface Args {
  vendor: string;
  sample: number;
  seed: number;
  json: boolean;
  axis?: "A" | "B" | "C" | "D" | "E";
}

function parseArgs(argv: string[]): Args {
  let vendor = "";
  let sample = 20;
  let seed = 1;
  let json = false;
  let axis: Args["axis"] | undefined;
  for (const arg of argv) {
    if (arg.startsWith("--sample=")) sample = Number(arg.slice("--sample=".length));
    else if (arg.startsWith("--seed=")) seed = Number(arg.slice("--seed=".length));
    else if (arg === "--json") json = true;
    else if (arg.startsWith("--axis=")) {
      const v = arg.slice("--axis=".length);
      if (v === "A" || v === "B" || v === "C" || v === "D" || v === "E") axis = v;
    } else if (!arg.startsWith("--") && !vendor) vendor = arg;
  }
  if (!vendor) {
    console.error("grade-vendor: usage: grade-vendor <vendor> [--sample=N] [--seed=N] [--json] [--axis=X]");
    process.exit(2);
  }
  return { vendor, sample, seed, json, axis };
}

interface PerFile {
  path: string;
  result: GradeResult;
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const vendorDir = resolve(REPO_ROOT, "vendor", args.vendor);
  const files = sampleMarkdownFiles({
    root: vendorDir,
    sample: args.sample,
    seed: args.seed,
  });
  if (files.length === 0) {
    console.error(`grade-vendor: no .md files found under vendor/${args.vendor}/`);
    process.exit(2);
  }

  const results: PerFile[] = [];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const result = gradeMarkdown(src);
    results.push({
      path: file.slice(REPO_ROOT.length + 1),
      result,
    });
  }

  // Aggregate
  const scores = results.map((r) => r.result.score).sort((a, b) => a - b);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const axisMeans = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const r of results) {
    axisMeans.A += r.result.breakdown.A;
    axisMeans.B += r.result.breakdown.B;
    axisMeans.C += r.result.breakdown.C;
    axisMeans.D += r.result.breakdown.D;
    axisMeans.E += r.result.breakdown.E;
  }
  for (const k of Object.keys(axisMeans) as Array<keyof typeof axisMeans>) {
    axisMeans[k] = +(axisMeans[k] / results.length).toFixed(2);
  }
  const worst = [...results].sort((a, b) => a.result.score - b.result.score).slice(0, 5);

  const summary = {
    vendor: args.vendor,
    sampled: results.length,
    mean: +mean.toFixed(2),
    p10: +quantile(scores, 0.1).toFixed(2),
    p50: +quantile(scores, 0.5).toFixed(2),
    p90: +quantile(scores, 0.9).toFixed(2),
    axis_means: axisMeans,
    worst_files: worst.map((w) => ({
      path: w.path,
      score: w.result.score,
      dominant_axis: dominantAxis(w.result),
    })),
  };

  if (args.json) {
    process.stdout.write(JSON.stringify(summary) + "\n");
    return;
  }

  // Plain text
  console.log(`vendor/${args.vendor}: sampled ${summary.sampled} file(s)`);
  console.log(`  mean=${summary.mean}  p10=${summary.p10}  p50=${summary.p50}  p90=${summary.p90}`);
  console.log(
    `  axis lost (mean): A=${summary.axis_means.A} B=${summary.axis_means.B} C=${summary.axis_means.C} D=${summary.axis_means.D} E=${summary.axis_means.E}`,
  );
  console.log(`  worst 5:`);
  for (const w of summary.worst_files) {
    console.log(`    ${w.score.toFixed(0).padStart(3)}  ${w.dominant_axis}  ${w.path}`);
  }
}

function dominantAxis(r: GradeResult): "A" | "B" | "C" | "D" | "E" {
  const entries = Object.entries(r.breakdown) as Array<["A" | "B" | "C" | "D" | "E", number]>;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

main();
