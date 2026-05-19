#!/usr/bin/env tsx
/**
 * Build vendor/.mdq-index.json — a per-file md-quality score sample
 * across every vendor subdir. Plain script, no test required.
 *
 * Walks `vendor/` for subdirectories (skipping files), samples 10
 * markdown files per vendor via sampleMarkdownFiles({sample:10,seed:1}),
 * grades each with gradeMarkdown(), and writes:
 *
 *   { built_at: ISO, per_file: [{vendor, path, score, breakdown}] }
 *
 * Consumed by the md_quality_top_offenders MCP tool (OMDQ10, MD10).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { gradeMarkdown } from "../src/lib/md-quality/index.js";
import { sampleMarkdownFiles } from "../src/lib/md-quality/sample.js";
import type { AxisId } from "../src/lib/md-quality/types.js";

const SAMPLE_PER_VENDOR = 10;
const SEED = 1;

interface PerFileEntry {
  vendor: string;
  /** Repo-relative path (always starts with `vendor/`). */
  path: string;
  score: number;
  breakdown: Record<AxisId, number>;
}

function listVendorSubdirs(vendorRoot: string): string[] {
  const entries = readdirSync(vendorRoot, { withFileTypes: true, encoding: "utf8" });
  const out: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".")) continue;
    out.push(entry.name);
  }
  out.sort();
  return out;
}

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const repoRoot = resolve(scriptDir, "..");
  const vendorRoot = resolve(repoRoot, "vendor");
  const outPath = resolve(vendorRoot, ".mdq-index.json");

  const vendors = listVendorSubdirs(vendorRoot);
  const per_file: PerFileEntry[] = [];

  for (const vendor of vendors) {
    const vendorDir = resolve(vendorRoot, vendor);
    const files = sampleMarkdownFiles({
      root: vendorDir,
      sample: SAMPLE_PER_VENDOR,
      seed: SEED,
    });
    for (const abs of files) {
      let body: string;
      try {
        const st = statSync(abs);
        if (st.size > 5_000_000) continue;
        body = readFileSync(abs, "utf8");
      } catch {
        continue;
      }
      const graded = gradeMarkdown(body);
      const relPath = relative(repoRoot, abs);
      per_file.push({
        vendor,
        path: relPath,
        score: graded.score,
        breakdown: graded.breakdown,
      });
    }
    process.stderr.write(`[mdq-index] ${vendor}: ${files.length} files\n`);
  }

  const payload = {
    built_at: new Date().toISOString(),
    per_file,
  };
  writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  process.stderr.write(`[mdq-index] wrote ${per_file.length} entries to ${outPath}\n`);
}

main();
