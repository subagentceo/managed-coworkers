/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * grade-vendor golden test (MD6).
 *
 * Runs the CLI against vendor/agentskills/ with a fixed seed and
 * asserts the JSON output matches the committed golden file. This
 * is the deterministic-output contract: same vendor + same seed +
 * same sample-size → identical numbers across reruns.
 *
 * Catches regressions in:
 *   - sample.ts sort stability (deterministic file selection)
 *   - aggregate.ts arithmetic
 *   - any axis-level scoring change (would force golden rebaseline)
 *
 * Updating the golden is intentional: rerun the CLI, redirect into
 * __golden__/agentskills.json, commit, cite the score delta.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const GOLDEN_PATH = resolve(__dirname, "__golden__", "agentskills.json");

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  const out = execFileSync(
    "npx",
    ["tsx", "scripts/grade-vendor.ts", "agentskills", "--sample=5", "--seed=1", "--json"],
    { cwd: REPO_ROOT, encoding: "utf8" },
  ).trim();
  const live = JSON.parse(out);
  const golden = JSON.parse(readFileSync(GOLDEN_PATH, "utf8"));

  if (JSON.stringify(live) !== JSON.stringify(golden)) {
    fail(
      `grade-vendor output drifted from golden. Live mean=${live.mean}, golden mean=${golden.mean}. ` +
        `To rebaseline: npx tsx scripts/grade-vendor.ts agentskills --sample=5 --seed=1 --json | ` +
        `python3 -c 'import sys,json; print(json.dumps(json.loads(sys.stdin.read()), indent=2))' > ` +
        `src/lib/md-quality/__golden__/agentskills.json`,
    );
  }
  console.log(
    `  ✓ grade-vendor golden: agentskills sampled ${live.sampled} files, mean=${live.mean}`,
  );
}

try {
  main();
} catch (err) {
  console.error("grade-vendor.test FAIL:", (err as Error).message);
  process.exit(1);
}
