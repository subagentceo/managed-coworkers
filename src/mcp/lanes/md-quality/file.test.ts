/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Smoke test for the md_quality_file MCP tool (MD7).
 *
 * Grades a known-good vendor file (agentskills.io/specification.md)
 * and asserts the score lands in [50, 100]. The lower bound is a
 * regression guard - if a parser refactor sinks scores into single
 * digits, this trips. The upper bound is the definitional ceiling
 * from aggregate.ts.
 *
 * Exercises the pure path (gradeMarkdown + readFileSync) rather
 * than the MCP transport. The transport layer is a 3-line jsonResult
 * wrapper, identical to how project.test.ts treats its own MCP lane.
 */
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { gradeMarkdown } from "../../../lib/md-quality/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..", "..");
const FIXTURE = resolve(
  REPO_ROOT,
  "vendor",
  "agentskills",
  "agentskills.io",
  "specification.md"
);

test("md_quality_file grades vendor/agentskills specification.md in [50, 100]", () => {
  const src = readFileSync(FIXTURE, "utf8");
  const result = gradeMarkdown(src);

  assert.ok(
    result.score >= 50 && result.score <= 100,
    `expected score in [50, 100], got ${result.score}`
  );
  assert.ok(
    result.top_violations.length <= 5,
    `expected at most 5 top_violations, got ${result.top_violations.length}`
  );
  for (const axis of ["A", "B", "C", "D", "E"] as const) {
    assert.ok(
      axis in result.breakdown,
      `expected breakdown to include axis ${axis}`
    );
  }
});
