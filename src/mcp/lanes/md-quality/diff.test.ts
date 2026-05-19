/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 * @cite seeds/posture/session-start.xml
 *
 * md_quality_diff smoke test (MD9).
 *
 * Drives the pure function `mdQualityDiff()` against the two most-recent
 * commits on `main`. Specific numbers shift as history advances, so we
 * assert only the result SHAPE (field presence, types, bounded counts).
 *
 * Verifies:
 *   - vendor + before_sha + after_sha echoed back as supplied
 *   - sampled and scored are non-negative integers with scored ≤ sampled
 *   - before_mean / after_mean ∈ [0, 100]
 *   - delta == after_mean - before_mean (rounded to 2dp)
 *   - regressions and improvements are arrays of length ≤ 5
 *   - each FileDelta has path: string + numeric before/after/delta
 *   - missing files at one sha are silently skipped (gitShow returns null)
 */

import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { mdQualityDiff, type FileDelta } from "./diff.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..", "..");

function fail(msg: string): never {
  throw new Error(msg);
}

function assertFileDelta(d: FileDelta, label: string): void {
  if (typeof d.path !== "string" || d.path.length === 0) {
    fail(`${label}: path must be a non-empty string`);
  }
  if (typeof d.before !== "number" || typeof d.after !== "number" || typeof d.delta !== "number") {
    fail(`${label}: before/after/delta must be numbers`);
  }
  if (Math.abs(d.delta - (d.after - d.before)) > 1e-9) {
    fail(`${label}: delta must equal after - before`);
  }
}

function main(): void {
  // Two most-recent shas on main. Format=%H -2 main produces:
  //   <sha-newer>\n<sha-older>\n
  const out = execFileSync(
    "git",
    ["log", "--format=%H", "-2", "main"],
    { cwd: REPO_ROOT, encoding: "utf8" },
  ).trim();
  const shas = out.split("\n").filter((s) => s.length > 0);
  if (shas.length < 2) {
    fail(`expected ≥2 commits on main, got ${shas.length}`);
  }
  const after_sha = shas[0];
  const before_sha = shas[1];

  // agentskills is the smallest tracked vendor + already used by the
  // golden suite, so sampling is fast + deterministic.
  const result = mdQualityDiff({
    vendor: "agentskills",
    before_sha,
    after_sha,
    sample_size: 5,
    cwd: REPO_ROOT,
  });

  if (result.vendor !== "agentskills") fail("vendor not echoed");
  if (result.before_sha !== before_sha) fail("before_sha not echoed");
  if (result.after_sha !== after_sha) fail("after_sha not echoed");

  if (!Number.isInteger(result.sampled) || result.sampled < 0) {
    fail(`sampled must be a non-negative integer, got ${result.sampled}`);
  }
  if (!Number.isInteger(result.scored) || result.scored < 0 || result.scored > result.sampled) {
    fail(`scored must be a non-negative integer ≤ sampled, got ${result.scored}`);
  }

  for (const k of ["before_mean", "after_mean", "delta"] as const) {
    const v = result[k];
    if (typeof v !== "number" || !Number.isFinite(v)) {
      fail(`${k} must be a finite number, got ${v}`);
    }
  }
  if (result.before_mean < 0 || result.before_mean > 100) {
    fail(`before_mean out of range: ${result.before_mean}`);
  }
  if (result.after_mean < 0 || result.after_mean > 100) {
    fail(`after_mean out of range: ${result.after_mean}`);
  }
  const expectedDelta = Math.round((result.after_mean - result.before_mean) * 100) / 100;
  if (Math.abs(result.delta - expectedDelta) > 1e-9) {
    fail(`delta must equal after_mean - before_mean (rounded), got ${result.delta} expected ${expectedDelta}`);
  }

  if (!Array.isArray(result.regressions) || result.regressions.length > 5) {
    fail(`regressions must be array of length ≤ 5, got ${result.regressions?.length}`);
  }
  if (!Array.isArray(result.improvements) || result.improvements.length > 5) {
    fail(`improvements must be array of length ≤ 5, got ${result.improvements?.length}`);
  }
  result.regressions.forEach((d, i) => {
    assertFileDelta(d, `regressions[${i}]`);
    if (d.delta >= 0) fail(`regressions[${i}].delta must be < 0, got ${d.delta}`);
  });
  result.improvements.forEach((d, i) => {
    assertFileDelta(d, `improvements[${i}]`);
    if (d.delta <= 0) fail(`improvements[${i}].delta must be > 0, got ${d.delta}`);
  });

  // Missing-file handling: synthetic sha won't have any vendor files →
  // scored should be 0 and arrays empty.
  // 40-zero sha is a valid-shape sha that git won't resolve.
  const FAKE = "0000000000000000000000000000000000000000";
  const missing = mdQualityDiff({
    vendor: "agentskills",
    before_sha: FAKE,
    after_sha,
    sample_size: 3,
    cwd: REPO_ROOT,
  });
  if (missing.scored !== 0) {
    fail(`missing-file case: scored must be 0 when one sha is unresolvable, got ${missing.scored}`);
  }
  if (missing.regressions.length !== 0 || missing.improvements.length !== 0) {
    fail(`missing-file case: regressions and improvements must be empty`);
  }

  console.log(
    `  ✓ md_quality_diff: ${result.vendor} sampled=${result.sampled} scored=${result.scored} delta=${result.delta}`,
  );
}

try {
  main();
} catch (err) {
  console.error("md_quality_diff.test FAIL:", (err as Error).message);
  process.exit(1);
}
