#!/usr/bin/env tsx
/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * grade-vendors-all CLI (OMDQ-ALL, OMDQ12).
 *
 * Usage:
 *   npm run grade:vendor:all
 *   npm run grade:vendor:all -- --json
 *   npm run grade:vendor:all -- --markdown
 *
 * Walks every subdirectory under `vendor/`, samples 10 .md files per
 * vendor with seed=1, scores each with gradeMarkdown, computes mean +
 * p10/p50/p90 + per-axis means + top-3 worst files, and emits either
 *   - a short markdown table (default), or
 *   - a JSON array of {vendor, sampled, mean, p10, p50, p90, axis_means}
 *     objects sorted ascending by mean (--json, OMDQ12), or
 *   - the long-form human baseline markdown with top-3 worst files
 *     (--markdown, used to write docs/baselines/*.md).
 *
 * Used both as a human snapshot tool and by
 * src/lib/md-quality/all-vendors-baseline.test.ts (OMDQ12) for the
 * drift-detection golden.
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { gradeMarkdown } from "../src/lib/md-quality/index.js";
import type { GradeResult } from "../src/lib/md-quality/index.js";
import { sampleMarkdownFiles } from "../src/lib/md-quality/sample.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
const SAMPLE = 10;
const SEED = 1;

interface PerFile {
  path: string;
  result: GradeResult;
}

interface VendorRow {
  vendor: string;
  sampled: number;
  mean: number;
  p10: number;
  p50: number;
  p90: number;
  axis_means: { A: number; B: number; C: number; D: number; E: number };
  worst_files: Array<{ path: string; score: number; dominant_axis: "A" | "B" | "C" | "D" | "E" }>;
}

interface BaselineRow {
  vendor: string;
  sampled: number;
  mean: number;
  p10: number;
  p50: number;
  p90: number;
  axis_means: { A: number; B: number; C: number; D: number; E: number };
}

function parseArgs(argv: string[]): { json: boolean; markdown: boolean } {
  let json = false;
  let markdown = false;
  for (const arg of argv) {
    if (arg === "--json") json = true;
    else if (arg === "--markdown") markdown = true;
  }
  return { json, markdown };
}

function listVendorDirs(root: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".")) continue;
    out.push(entry.name);
  }
  return out.sort();
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

function dominantAxis(r: GradeResult): "A" | "B" | "C" | "D" | "E" {
  const entries = Object.entries(r.breakdown) as Array<["A" | "B" | "C" | "D" | "E", number]>;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function gradeVendor(vendor: string): VendorRow | null {
  const dir = resolve(VENDOR_ROOT, vendor);
  const files = sampleMarkdownFiles({ root: dir, sample: SAMPLE, seed: SEED });
  if (files.length === 0) return null;

  const results: PerFile[] = [];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const result = gradeMarkdown(src);
    results.push({
      path: file.slice(REPO_ROOT.length + 1),
      result,
    });
  }

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
  const worst = [...results].sort((a, b) => a.result.score - b.result.score).slice(0, 3);

  return {
    vendor,
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
}

function renderJson(rows: VendorRow[]): string {
  const baseline: BaselineRow[] = rows.map((r) => ({
    vendor: r.vendor,
    sampled: r.sampled,
    mean: r.mean,
    p10: r.p10,
    p50: r.p50,
    p90: r.p90,
    axis_means: r.axis_means,
  }));
  return JSON.stringify(baseline);
}

function renderHumanMarkdown(rows: VendorRow[]): string {
  const lines: string[] = [];
  lines.push("| Vendor | Mean | p10 | p50 | p90 | Top-3 worst files |");
  lines.push("|---|---:|---:|---:|---:|---|");
  for (const r of rows) {
    const worst = r.worst_files
      .map((w) => `${w.score} \`${w.path}\` (${w.dominant_axis})`)
      .join("<br/>");
    lines.push(
      `| ${r.vendor} | ${r.mean.toFixed(2)} | ${r.p10.toFixed(2)} | ${r.p50.toFixed(2)} | ${r.p90.toFixed(2)} | ${worst} |`,
    );
  }
  return lines.join("\n");
}

function renderTerseTable(rows: VendorRow[]): string {
  const lines: string[] = [];
  lines.push("| Vendor | Sampled | Mean | Axis A | Axis B | Axis C | Axis D | Axis E |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|---:|");
  for (const r of rows) {
    lines.push(
      `| ${r.vendor} | ${r.sampled} | ${r.mean.toFixed(2)} | ${r.axis_means.A.toFixed(2)} | ${r.axis_means.B.toFixed(2)} | ${r.axis_means.C.toFixed(2)} | ${r.axis_means.D.toFixed(2)} | ${r.axis_means.E.toFixed(2)} |`,
    );
  }
  lines.push(`\ntotal: ${rows.length} vendors graded`);
  return lines.join("\n");
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const vendors = listVendorDirs(VENDOR_ROOT);
  const rows: VendorRow[] = [];
  for (const v of vendors) {
    const row = gradeVendor(v);
    if (row) rows.push(row);
  }
  rows.sort((a, b) => a.mean - b.mean);

  if (args.json) {
    process.stdout.write(renderJson(rows) + "\n");
    return;
  }
  if (args.markdown) {
    process.stdout.write(renderHumanMarkdown(rows) + "\n");
    return;
  }
  process.stdout.write(renderTerseTable(rows) + "\n");
}

main();
