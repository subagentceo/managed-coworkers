#!/usr/bin/env tsx
/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * fix-vendor CLI (MD11).
 *
 * Conservative auto-fixer for vendor markdown. Targets the 4 fixable
 * rubric axes (B/C/D/E). Axis A (parseability) is diagnostic only.
 *
 * Usage:
 *   npm run fix:vendor -- --vendor=<name> [--rule=A|B|C|D|E]
 *                          [--limit=N] [--dry-run] [--from-index]
 *
 * Flags:
 *   --vendor=<name>   Only fix files under vendor/<name>/. Required
 *                     unless --from-index is given.
 *   --rule=X          Restrict to one axis (B/C/D/E). Default = all
 *                     fixable axes. --rule=A is rejected (A is
 *                     diagnostic-only).
 *   --limit=N         Cap at N files (default 200). Hard cap = 200
 *                     per PR per project policy.
 *   --dry-run         Print what would change; do not write files.
 *   --from-index      Read vendor/.mdq-index.json (built by
 *                     `npm run mdq:index`) and target highest-
 *                     points_lost files first. When combined with
 *                     --vendor, scope to that vendor's entries.
 *
 * Output: per-file summary (`file: score before → after`) and a final
 * total. Exit 0 unless invoked with bad flags.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { gradeMarkdown } from "../src/lib/md-quality/index.js";
import { fixMarkdown, type FixableAxis } from "../src/lib/md-quality/fix/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_ROOT = resolve(REPO_ROOT, "vendor");
const INDEX_PATH = resolve(VENDOR_ROOT, ".mdq-index.json");

const HARD_LIMIT = 200;

interface Args {
  vendor?: string;
  rule?: FixableAxis;
  limit: number;
  dryRun: boolean;
  fromIndex: boolean;
}

function parseArgs(argv: string[]): Args {
  let vendor: string | undefined;
  let rule: FixableAxis | undefined;
  let limit = 200;
  let dryRun = false;
  let fromIndex = false;
  for (const arg of argv) {
    if (arg.startsWith("--vendor=")) {
      vendor = arg.slice("--vendor=".length);
    } else if (arg.startsWith("--rule=")) {
      const v = arg.slice("--rule=".length);
      if (v === "A") {
        console.error("fix-vendor: --rule=A rejected — axis A is diagnostic-only, not auto-fixable.");
        process.exit(2);
      }
      if (v !== "B" && v !== "C" && v !== "D" && v !== "E") {
        console.error(`fix-vendor: bad --rule=${v}; expected one of B|C|D|E`);
        process.exit(2);
      }
      rule = v;
    } else if (arg.startsWith("--limit=")) {
      const n = Number(arg.slice("--limit=".length));
      if (!Number.isFinite(n) || n < 1) {
        console.error(`fix-vendor: bad --limit=${arg}; want positive integer`);
        process.exit(2);
      }
      limit = Math.min(HARD_LIMIT, Math.floor(n));
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--from-index") {
      fromIndex = true;
    } else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    } else {
      console.error(`fix-vendor: unknown arg: ${arg}`);
      printUsage();
      process.exit(2);
    }
  }
  if (!vendor && !fromIndex) {
    console.error("fix-vendor: --vendor=<name> or --from-index is required");
    printUsage();
    process.exit(2);
  }
  return { vendor, rule, limit, dryRun, fromIndex };
}

function printUsage(): void {
  console.error(
    "Usage: fix-vendor --vendor=<name> [--rule=B|C|D|E] [--limit=N] [--dry-run] [--from-index]",
  );
}

function* walkMarkdown(root: string): Generator<string> {
  let entries;
  try {
    entries = readdirSync(root, { withFileTypes: true, encoding: "utf8" });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "node_modules" || entry.name === ".meta") continue;
    const full = resolve(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdown(full);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
    ) {
      yield full;
    }
  }
}

interface IndexEntry {
  vendor: string;
  path: string;
  score: number;
  breakdown: Record<string, number>;
}

interface IndexFile {
  built_at: string;
  per_file: IndexEntry[];
}

function selectFromIndex(args: Args): string[] {
  let raw: string;
  try {
    raw = readFileSync(INDEX_PATH, "utf8");
  } catch (err) {
    console.error(
      `fix-vendor: --from-index but ${relative(REPO_ROOT, INDEX_PATH)} not found (run \`npm run mdq:index\` first): ${(err as Error).message}`,
    );
    process.exit(2);
  }
  const idx = JSON.parse(raw) as IndexFile;
  let entries = idx.per_file ?? [];
  if (args.vendor) {
    entries = entries.filter((e) => e.vendor === args.vendor);
  }
  // Highest points_lost = lowest score, so sort by score ascending.
  entries.sort((a, b) => a.score - b.score);
  return entries.slice(0, args.limit).map((e) => resolve(REPO_ROOT, e.path));
}

function selectFromVendor(args: Args): string[] {
  if (!args.vendor) return [];
  const vendorDir = resolve(VENDOR_ROOT, args.vendor);
  try {
    statSync(vendorDir);
  } catch {
    console.error(`fix-vendor: vendor dir not found: ${relative(REPO_ROOT, vendorDir)}`);
    process.exit(2);
  }
  const all = Array.from(walkMarkdown(vendorDir));
  all.sort();
  return all.slice(0, args.limit);
}

interface PerFileReport {
  path: string;
  scoreBefore: number;
  scoreAfter: number;
  changed: boolean;
  wrote: boolean;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const axes: FixableAxis[] | undefined = args.rule ? [args.rule] : undefined;
  const files = args.fromIndex ? selectFromIndex(args) : selectFromVendor(args);

  if (files.length === 0) {
    console.error("fix-vendor: no candidate files found");
    process.exit(0);
  }

  const reports: PerFileReport[] = [];
  for (const abs of files) {
    let src: string;
    try {
      src = readFileSync(abs, "utf8");
    } catch (err) {
      console.error(`fix-vendor: skip ${relative(REPO_ROOT, abs)}: ${(err as Error).message}`);
      continue;
    }
    const before = gradeMarkdown(src);
    const result = fixMarkdown(src, { axes });
    let scoreAfter = before.score;
    let wrote = false;
    if (result.changed) {
      scoreAfter = gradeMarkdown(result.fixed).score;
      if (!args.dryRun) {
        try {
          writeFileSync(abs, result.fixed, "utf8");
          wrote = true;
        } catch (err) {
          console.error(`fix-vendor: write failed ${relative(REPO_ROOT, abs)}: ${(err as Error).message}`);
        }
      }
    }
    reports.push({
      path: relative(REPO_ROOT, abs),
      scoreBefore: before.score,
      scoreAfter,
      changed: result.changed,
      wrote,
    });
  }

  // Print per-file summary.
  let changedCount = 0;
  let totalDelta = 0;
  for (const r of reports) {
    if (!r.changed) continue;
    changedCount += 1;
    totalDelta += r.scoreAfter - r.scoreBefore;
    const tag = args.dryRun ? "[dry-run]" : r.wrote ? "[wrote]" : "[failed]";
    console.log(
      `${tag} ${r.path}: ${r.scoreBefore} → ${r.scoreAfter} (+${r.scoreAfter - r.scoreBefore})`,
    );
  }
  const meanDelta = changedCount > 0 ? totalDelta / changedCount : 0;
  console.log(
    `\nfix-vendor: scanned ${reports.length}, changed ${changedCount}, mean Δscore = +${meanDelta.toFixed(2)}${
      args.dryRun ? " (dry-run; no writes)" : ""
    }`,
  );
}

main();
