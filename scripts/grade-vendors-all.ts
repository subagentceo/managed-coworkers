#!/usr/bin/env tsx
/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * grade-vendors-all CLI (OMDQ-ALL).
 *
 * Usage:
 *   npm run grade:vendor:all
 *
 * Walks every subdirectory under `vendor/`, samples 10 .md files per
 * vendor with seed=1, scores each with gradeMarkdown, computes the
 * mean composite score, and emits a markdown table to stdout sorted
 * ascending by mean (worst first). Trailer reports total vendors
 * graded.
 *
 * Human snapshot tool only — not part of the verify chain.
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { gradeMarkdown } from "../src/lib/md-quality/index.js";
import { sampleMarkdownFiles } from "../src/lib/md-quality/sample.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
const SAMPLE = 10;
const SEED = 1;

interface VendorRow {
  vendor: string;
  sampled: number;
  mean: number;
  axisLost: { A: number; B: number; C: number; D: number; E: number };
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

function gradeVendor(vendor: string): VendorRow | null {
  const dir = resolve(VENDOR_ROOT, vendor);
  const files = sampleMarkdownFiles({ root: dir, sample: SAMPLE, seed: SEED });
  if (files.length === 0) return null;

  let sumScore = 0;
  const lost = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const r = gradeMarkdown(src);
    sumScore += r.score;
    lost.A += r.breakdown.A;
    lost.B += r.breakdown.B;
    lost.C += r.breakdown.C;
    lost.D += r.breakdown.D;
    lost.E += r.breakdown.E;
  }
  const n = files.length;
  return {
    vendor,
    sampled: n,
    mean: +(sumScore / n).toFixed(2),
    axisLost: {
      A: +(lost.A / n).toFixed(2),
      B: +(lost.B / n).toFixed(2),
      C: +(lost.C / n).toFixed(2),
      D: +(lost.D / n).toFixed(2),
      E: +(lost.E / n).toFixed(2),
    },
  };
}

function main(): void {
  const vendors = listVendorDirs(VENDOR_ROOT);
  const rows: VendorRow[] = [];
  for (const v of vendors) {
    const row = gradeVendor(v);
    if (row) rows.push(row);
  }
  rows.sort((a, b) => a.mean - b.mean);

  console.log("| Vendor | Sampled | Mean | Axis A | Axis B | Axis C | Axis D | Axis E |");
  console.log("|---|---:|---:|---:|---:|---:|---:|---:|");
  for (const r of rows) {
    console.log(
      `| ${r.vendor} | ${r.sampled} | ${r.mean.toFixed(2)} | ${r.axisLost.A.toFixed(2)} | ${r.axisLost.B.toFixed(2)} | ${r.axisLost.C.toFixed(2)} | ${r.axisLost.D.toFixed(2)} | ${r.axisLost.E.toFixed(2)} |`,
    );
  }
  console.log(`\ntotal: ${rows.length} vendors graded`);
}

main();
