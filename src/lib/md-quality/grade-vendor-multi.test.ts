/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * grade-vendor multi-vendor CLI test (OMDQ-MULTI).
 *
 * Exercises the --vendors=a,b,c comma-separated flag added to
 * scripts/grade-vendor.ts. Asserts:
 *   - --json produces a JSON array (not a single object).
 *   - The array length matches the number of vendors requested.
 *   - Each element carries the per-vendor summary shape (vendor,
 *     sampled, mean keys).
 *   - The output order preserves the request order (agentskills
 *     first, commonmark-spec second). This is the contract the
 *     calling MCP tool depends on.
 *
 * The existing single-vendor positional path remains covered by
 * grade-vendor.test.ts (the golden test).
 */

import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  const out = execFileSync(
    "npx",
    [
      "tsx",
      "scripts/grade-vendor.ts",
      "--vendors=agentskills,commonmark-spec",
      "--sample=3",
      "--seed=1",
      "--json",
    ],
    { cwd: REPO_ROOT, encoding: "utf8" },
  ).trim();

  const parsed = JSON.parse(out);

  if (!Array.isArray(parsed)) {
    fail(`expected JSON array, got ${typeof parsed}: ${out.slice(0, 120)}`);
  }
  if (parsed.length !== 2) {
    fail(`expected array of length 2, got ${parsed.length}`);
  }

  for (const elem of parsed) {
    if (typeof elem !== "object" || elem === null) {
      fail(`expected each element to be an object, got ${typeof elem}`);
    }
    for (const key of ["vendor", "sampled", "mean"] as const) {
      if (!(key in elem)) {
        fail(`missing key "${key}" in element: ${JSON.stringify(elem).slice(0, 120)}`);
      }
    }
  }

  if (parsed[0].vendor !== "agentskills") {
    fail(`expected first vendor to be "agentskills", got "${parsed[0].vendor}"`);
  }
  if (parsed[1].vendor !== "commonmark-spec") {
    fail(`expected second vendor to be "commonmark-spec", got "${parsed[1].vendor}"`);
  }

  console.log(
    `  ✓ grade-vendor multi: [${parsed[0].vendor}=${parsed[0].mean}, ${parsed[1].vendor}=${parsed[1].mean}]`,
  );
}

try {
  main();
} catch (err) {
  console.error("grade-vendor-multi.test FAIL:", (err as Error).message);
  process.exit(1);
}
