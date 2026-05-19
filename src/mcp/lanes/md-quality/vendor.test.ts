/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 * @tdd green
 *
 * Smoke test for md_quality_vendor (MD8).
 *
 * Asserts that grading 5 sampled .md files from vendor/agentskills/
 * (seed=1) returns a mean score in [80, 100]. agentskills is a small,
 * curated vendor mirror whose files routinely grade in the high 90s
 * with the current rubric, so the wide [80, 100] band leaves room for
 * rubric-tuning without breaking the smoke test.
 *
 * Exercises the pure compute path (computeVendorQuality). The MCP
 * register wrapper is intentionally untested — it's a 3-line zod +
 * cache wrapper over the pure function (same convention as
 * src/mcp/lanes/project.test.ts).
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { computeVendorQuality } from "./vendor.js";

test("md_quality_vendor: agentskills sample mean is in [80, 100]", () => {
  const summary = computeVendorQuality("agentskills", 5, 1);
  assert.equal(summary.vendor, "agentskills");
  assert.equal(summary.sampled, 5);
  assert.ok(summary.mean >= 80, `expected mean >= 80, got ${summary.mean}`);
  assert.ok(summary.mean <= 100, `expected mean <= 100, got ${summary.mean}`);
});

test("md_quality_vendor: summary shape matches grade-vendor CLI", () => {
  const summary = computeVendorQuality("agentskills", 5, 1);
  assert.equal(typeof summary.p10, "number");
  assert.equal(typeof summary.p50, "number");
  assert.equal(typeof summary.p90, "number");
  for (const axis of ["A", "B", "C", "D", "E"] as const) {
    assert.equal(typeof summary.axis_means[axis], "number");
  }
  assert.ok(summary.worst_files.length <= 5);
  for (const wf of summary.worst_files) {
    assert.equal(typeof wf.path, "string");
    assert.equal(typeof wf.score, "number");
    assert.ok(["A", "B", "C", "D", "E"].includes(wf.dominant_axis));
  }
});

test("md_quality_vendor: deterministic — same (vendor, sample_size, seed) → same files", () => {
  const a = computeVendorQuality("agentskills", 5, 1);
  const b = computeVendorQuality("agentskills", 5, 1);
  assert.deepEqual(
    a.worst_files.map((w) => w.path).sort(),
    b.worst_files.map((w) => w.path).sort(),
  );
  assert.equal(a.mean, b.mean);
});

test("md_quality_vendor: unknown vendor throws", () => {
  assert.throws(
    () => computeVendorQuality("does-not-exist-12345", 5, 1),
    /no \.md files found/,
  );
});
