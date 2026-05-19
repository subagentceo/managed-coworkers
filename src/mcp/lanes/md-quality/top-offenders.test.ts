/**
 * @cite rubrics/md-quality-v1.md
 * @cite vendor/commonmark-spec/spec.txt
 *
 * Smoke test for md_quality_top_offenders (MD10, OMDQ10).
 *
 * Strategy: build a tiny synthetic vendor/.mdq-index.json in a temp
 * file, then exercise the pure `topOffenders()` helper. The MCP
 * registration path is a thin wrapper over the pure helper and over
 * fs.readFileSync — keeping the assertion surface here.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { topOffenders } from "./top-offenders.js";

function makeIndex() {
  return {
    built_at: "2026-05-18T00:00:00.000Z",
    per_file: [
      // vendor1: 3 files, varying losses on rule A
      { vendor: "v1", path: "vendor/v1/a.md", score: 80, breakdown: { A: 20, B: 0, C: 0, D: 0, E: 0 } },
      { vendor: "v1", path: "vendor/v1/b.md", score: 95, breakdown: { A: 5, B: 0, C: 0, D: 0, E: 0 } },
      { vendor: "v1", path: "vendor/v1/c.md", score: 100, breakdown: { A: 0, B: 0, C: 0, D: 0, E: 0 } },
      // vendor2: 3 files, all hit rule A
      { vendor: "v2", path: "vendor/v2/x.md", score: 90, breakdown: { A: 10, B: 0, C: 0, D: 0, E: 0 } },
      { vendor: "v2", path: "vendor/v2/y.md", score: 70, breakdown: { A: 30, B: 0, C: 0, D: 0, E: 0 } },
      { vendor: "v2", path: "vendor/v2/z.md", score: 85, breakdown: { A: 15, B: 0, C: 0, D: 0, E: 0 } },
      // vendor3: 3 files, mixed: only rule B
      { vendor: "v3", path: "vendor/v3/p.md", score: 60, breakdown: { A: 0, B: 40, C: 0, D: 0, E: 0 } },
      { vendor: "v3", path: "vendor/v3/q.md", score: 75, breakdown: { A: 0, B: 25, C: 0, D: 0, E: 0 } },
      { vendor: "v3", path: "vendor/v3/r.md", score: 100, breakdown: { A: 0, B: 0, C: 0, D: 0, E: 0 } },
    ],
  } as const;
}

test("topOffenders sorts desc by points_lost on the requested rule", () => {
  const idx = makeIndex();
  const out = topOffenders(idx, "A", 10);
  // Files with A>0 across vendors v1 + v2 (5 files): 30, 20, 15, 10, 5
  const losses = out.map((r) => r.points_lost);
  assert.deepEqual(losses, [30, 20, 15, 10, 5]);
});

test("topOffenders excludes files with points_lost == 0 on the rule", () => {
  const idx = makeIndex();
  const out = topOffenders(idx, "A", 10);
  assert.equal(out.length, 5); // v1/c, v3/p, v3/q, v3/r excluded for rule A
  assert.equal(out.some((r) => r.points_lost === 0), false);
});

test("topOffenders respects limit", () => {
  const idx = makeIndex();
  const out = topOffenders(idx, "A", 3);
  assert.equal(out.length, 3);
  assert.deepEqual(out.map((r) => r.points_lost), [30, 20, 15]);
});

test("topOffenders filters by vendor when supplied", () => {
  const idx = makeIndex();
  const out = topOffenders(idx, "A", 10, "v2");
  assert.equal(out.every((r) => r.vendor === "v2"), true);
  assert.deepEqual(out.map((r) => r.points_lost), [30, 15, 10]);
});

test("topOffenders returns empty array when no files hit the rule", () => {
  const idx = makeIndex();
  const out = topOffenders(idx, "C", 10);
  assert.deepEqual(out, []);
});

test("topOffenders rule B sees only v3 entries", () => {
  const idx = makeIndex();
  const out = topOffenders(idx, "B", 10);
  assert.equal(out.length, 2);
  assert.equal(out.every((r) => r.vendor === "v3"), true);
  assert.deepEqual(out.map((r) => r.points_lost), [40, 25]);
});
