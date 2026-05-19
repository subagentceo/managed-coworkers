/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * md-quality lane: md_quality_vendor MCP tool (MD8).
 *
 * Samples markdown files under vendor/<vendor>/, grades each with the
 * md-quality library, and returns the same summary shape as the CLI in
 * scripts/grade-vendor.ts (mean, p10/p50/p90, axis_means, worst_files[5]).
 *
 * Cached with key `mdq:vendor:<vendor>:<sample_size>:<seed>` TTL 3600s
 * via src/lib/cache.ts. Cache is fail-silent — if redis is down, the
 * tool still works (and reports cache:"miss"). Mirrors the cache shape
 * already used by src/mcp/lanes/vendor.ts:vendor_fetch.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../../bridge-utils.js";
import { cacheGet, cacheSetEx } from "../../../lib/cache.js";
import { gradeMarkdown } from "../../../lib/md-quality/index.js";
import type { GradeResult } from "../../../lib/md-quality/index.js";
import { sampleMarkdownFiles } from "../../../lib/md-quality/sample.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
// src/mcp/lanes/md-quality/ → repo root is four levels up.
const REPO_ROOT = resolve(__dirname, "..", "..", "..", "..");

export interface WorstFile {
  path: string;
  score: number;
  dominant_axis: "A" | "B" | "C" | "D" | "E";
}

export interface VendorQualitySummary {
  vendor: string;
  sampled: number;
  mean: number;
  p10: number;
  p50: number;
  p90: number;
  axis_means: { A: number; B: number; C: number; D: number; E: number };
  worst_files: WorstFile[];
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo]! + (sorted[hi]! - sorted[lo]!) * (pos - lo);
}

function dominantAxis(r: GradeResult): "A" | "B" | "C" | "D" | "E" {
  const entries = Object.entries(r.breakdown) as Array<[
    "A" | "B" | "C" | "D" | "E",
    number,
  ]>;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0]![0];
}

/**
 * Pure(-ish) compute: walks the vendor dir, grades every sampled file,
 * returns the same summary shape as scripts/grade-vendor.ts.
 *
 * Throws if no .md files are found — caller surfaces as an MCP error.
 */
export function computeVendorQuality(
  vendor: string,
  sample_size: number,
  seed: number,
): VendorQualitySummary {
  const vendorDir = resolve(REPO_ROOT, "vendor", vendor);
  const files = sampleMarkdownFiles({ root: vendorDir, sample: sample_size, seed });
  if (files.length === 0) {
    throw new Error(`md_quality_vendor: no .md files found under vendor/${vendor}/`);
  }

  const results = files.map((file) => {
    const src = readFileSync(file, "utf8");
    return { path: file.slice(REPO_ROOT.length + 1), result: gradeMarkdown(src) };
  });

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
  const worst = [...results]
    .sort((a, b) => a.result.score - b.result.score)
    .slice(0, 5)
    .map((w) => ({
      path: w.path,
      score: w.result.score,
      dominant_axis: dominantAxis(w.result),
    }));

  return {
    vendor,
    sampled: results.length,
    mean: +mean.toFixed(2),
    p10: +quantile(scores, 0.1).toFixed(2),
    p50: +quantile(scores, 0.5).toFixed(2),
    p90: +quantile(scores, 0.9).toFixed(2),
    axis_means: axisMeans,
    worst_files: worst,
  };
}

export function registerMdQualityVendor(server: McpServer): void {
  server.tool(
    "md_quality_vendor",
    "Grade a vendor's local markdown mirror with the md-quality rubric (5 axes: A=parseability, B=headings, C=fenced-code, D=links, E=line-discipline). Deterministic sampling: same (vendor, sample_size, seed) → same files. Returns mean/p10/p50/p90, per-axis means, and the worst 5 files with dominant axis. Cached for 1h in redis (fail-silent).",
    {
      vendor: z.string().min(1),
      sample_size: z.number().int().nonnegative().default(20),
      seed: z.number().int().default(1),
    },
    async ({ vendor, sample_size, seed }) => {
      const cacheKey = `mdq:vendor:${vendor}:${sample_size}:${seed}`;
      const cached = await cacheGet(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as VendorQualitySummary;
          return jsonResult({ ...parsed, cache: "hit" });
        } catch {
          // Corrupt cache value — fall through and re-populate.
        }
      }
      const summary = computeVendorQuality(vendor, sample_size, seed);
      await cacheSetEx(cacheKey, JSON.stringify(summary), 3600);
      return jsonResult({ ...summary, cache: "miss" });
    },
  );
}
