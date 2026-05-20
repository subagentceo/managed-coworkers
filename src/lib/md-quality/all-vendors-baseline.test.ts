/**
 * @cite rubrics/md-quality-v1.md
 * @cite vendor/commonmark-spec/spec.txt
 *
 * all-vendors-baseline drift test (OMDQ12).
 *
 * Runs `scripts/grade-vendors-all.ts --json` and compares the live
 * per-vendor mean against the committed golden snapshot at
 * `src/lib/md-quality/__golden__/all-vendors-baseline.json`. Catches
 * any silent regression in:
 *
 *   - vendor mirror content (someone re-crawled and the docs got worse)
 *   - axis-scorer arithmetic (a tweak to axes/* changed mean by > 0.5)
 *   - sample.ts sort stability (seed=1 no longer picks the same files)
 *
 * Tolerance: ±0.5 on per-vendor mean. The golden vendor set must match
 * the live vendor set exactly (no new or removed vendors without an
 * intentional rebaseline).
 *
 * NOTE on path-dependence: `sample.ts` hashes absolute file paths to
 * choose its sample, so the golden is location-specific. The golden
 * is computed from the canonical operator checkout at
 * `/Users/alexzh/subagentmcp/subagentceo/managed-coworkers/`. Running
 * this test from a different worktree path will produce a different
 * sample and the drift check will fire. This matches the existing
 * `grade-vendor.test.ts` golden contract — path-invariance is a
 * separate concern tracked outside MD12.
 *
 * To rebaseline after an intentional change (new vendor added, axis
 * scoring deliberately retuned):
 *   npx tsx scripts/grade-vendors-all.ts --json | python3 -m json.tool \
 *     > src/lib/md-quality/__golden__/all-vendors-baseline.json
 *
 * IMPORTANT: do NOT rebaseline this golden together with
 * `__golden__/agentskills.json` — that one is a different contract
 * (5-file sample for a single vendor) and any drift there is a
 * separate concern.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const GOLDEN_PATH = resolve(__dirname, "__golden__", "all-vendors-baseline.json");
const TOLERANCE = 0.5;

interface BaselineRow {
  vendor: string;
  sampled: number;
  mean: number;
  p10: number;
  p50: number;
  p90: number;
  axis_means: { A: number; B: number; C: number; D: number; E: number };
}

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  const out = execFileSync(
    "npx",
    ["tsx", "scripts/grade-vendors-all.ts", "--json"],
    { cwd: REPO_ROOT, encoding: "utf8" },
  ).trim();
  const live = JSON.parse(out) as BaselineRow[];
  const golden = JSON.parse(readFileSync(GOLDEN_PATH, "utf8")) as BaselineRow[];

  if (!Array.isArray(live)) fail(`expected JSON array from --json, got ${typeof live}`);
  if (!Array.isArray(golden)) fail(`golden file is not a JSON array`);

  const liveByVendor = new Map(live.map((r) => [r.vendor, r] as const));
  const goldenByVendor = new Map(golden.map((r) => [r.vendor, r] as const));

  // Exact set match — flag added/removed vendors so a rebaseline is forced.
  const liveVendors = [...liveByVendor.keys()].sort();
  const goldenVendors = [...goldenByVendor.keys()].sort();
  const added = liveVendors.filter((v) => !goldenByVendor.has(v));
  const removed = goldenVendors.filter((v) => !liveByVendor.has(v));
  if (added.length > 0 || removed.length > 0) {
    fail(
      `vendor set drift — added=[${added.join(",")}] removed=[${removed.join(",")}]. ` +
        `Rebaseline: npx tsx scripts/grade-vendors-all.ts --json | python3 -m json.tool ` +
        `> src/lib/md-quality/__golden__/all-vendors-baseline.json`,
    );
  }

  // Per-vendor mean drift check.
  const offenders: string[] = [];
  for (const vendor of liveVendors) {
    const liveRow = liveByVendor.get(vendor);
    const goldenRow = goldenByVendor.get(vendor);
    if (!liveRow || !goldenRow) continue; // covered by the added/removed check
    const delta = Math.abs(liveRow.mean - goldenRow.mean);
    if (delta > TOLERANCE) {
      offenders.push(
        `${vendor}: live=${liveRow.mean.toFixed(2)} golden=${goldenRow.mean.toFixed(2)} ` +
          `delta=${delta.toFixed(2)} (>${TOLERANCE})`,
      );
    }
  }
  if (offenders.length > 0) {
    fail(
      `per-vendor mean drift exceeded ±${TOLERANCE}:\n  ` +
        offenders.join("\n  ") +
        `\nIf intentional, rebaseline: npx tsx scripts/grade-vendors-all.ts --json | ` +
        `python3 -m json.tool > src/lib/md-quality/__golden__/all-vendors-baseline.json`,
    );
  }

  console.log(
    `  ✓ all-vendors-baseline: ${liveVendors.length} vendors within ±${TOLERANCE} of golden`,
  );
}

try {
  main();
} catch (err) {
  console.error("all-vendors-baseline.test FAIL:", (err as Error).message);
  process.exit(1);
}
