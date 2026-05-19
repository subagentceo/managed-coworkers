/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis E — Line discipline — counter-example test.
 *
 * String-level axis, so the spec.txt sweep is light — most spec
 * fixtures are tiny and won't trigger graduated thresholds. The
 * critical assertions are the synthetic counter-examples.
 */

import { scoreLineDiscipline } from "./line-discipline.js";
import { loadSpecExamples } from "../fixtures.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  // 1. spec sweep — must not crash
  const examples = loadSpecExamples();
  let scored = 0;
  for (const ex of examples) {
    const r = scoreLineDiscipline(ex.markdown);
    scored += 1;
    if (r.points_lost > 15) fail(`#${ex.index} cap broken: ${r.points_lost}`);
  }
  console.log(`  ✓ line-discipline: ${scored} spec examples scored, all within 15-pt cap`);

  // 2. Clean LF-only document = 0 lost
  const clean = "# Title\n\nbody\n";
  if (scoreLineDiscipline(clean).points_lost !== 0) {
    fail("clean doc should score 0");
  }
  console.log(`  ✓ clean doc scores 0/15`);

  // 3. E1 — trailing whitespace
  // Graduated: 1 pt per 50 lines. 50 lines with trailing WS → 1 pt.
  const e1Lines = Array.from({ length: 60 }, () => "text   ").join("\n");
  const r1 = scoreLineDiscipline(e1Lines);
  if (!r1.violations.some((v) => v.rule === "E1")) fail("E1 missed trailing WS");
  console.log(`  ✓ E1 fires on 60 trailing-WS lines: lost ${r1.points_lost} pts`);

  // 4. E2 — CR present
  const e2 = "# t\r\nbody\r\n";
  const r2 = scoreLineDiscipline(e2);
  if (!r2.violations.some((v) => v.rule === "E2")) fail("E2 missed CR");
  if (r2.points_lost < 5) fail(`E2 should be 5pt flat, got ${r2.points_lost}`);
  console.log(`  ✓ E2 fires on CRLF: lost ${r2.points_lost} pts`);

  // 5. E3 — tab + space mixed at line start
  const e3Lines = Array.from({ length: 60 }, () => " \tcode").join("\n");
  const r3 = scoreLineDiscipline(e3Lines);
  if (!r3.violations.some((v) => v.rule === "E3")) fail("E3 missed mixed indent");
  console.log(`  ✓ E3 fires on tab+space mix: lost ${r3.points_lost} pts`);

  // 6. E4 — long lines
  const longLine = "x".repeat(250);
  const e4Body = Array.from({ length: 120 }, () => longLine).join("\n");
  const r4 = scoreLineDiscipline(e4Body);
  if (!r4.violations.some((v) => v.rule === "E4")) fail("E4 missed long lines");
  console.log(`  ✓ E4 fires on 120 long lines: lost ${r4.points_lost} pts`);

  // 7. Cap at 15 (everything stacks)
  const stacked =
    Array.from({ length: 300 }, () => " \t".repeat(5) + "x".repeat(250) + "   ").join("\r\n");
  const cap = scoreLineDiscipline(stacked);
  if (cap.points_lost > 15) fail(`cap broken: ${cap.points_lost}`);
  console.log(`  ✓ Axis E capped at 15 (got ${cap.points_lost}/15)`);

  // 8. Below threshold = 0 lost
  // 49 trailing-WS lines → 1pt (50/50 ceil = 1). Test the < threshold:
  // 5 trailing-WS lines still → 1pt because ceil(5/50)=1. So we test
  // 1-line trailing → still 1pt (ceil(1/50)=1). E1 is graduated but
  // not floored — any trailing WS costs at least 1. Test floor with
  // a single zero-trailing-WS document.
  const minimal = "# title\n\nbody\nmore\n";
  const minR = scoreLineDiscipline(minimal);
  if (minR.points_lost !== 0) {
    fail(`minimal doc should score 0, got ${minR.points_lost}: ${JSON.stringify(minR.violations)}`);
  }
  console.log(`  ✓ minimal LF-only doc scores 0`);
}

try {
  main();
} catch (err) {
  console.error("line-discipline.test FAIL:", (err as Error).message);
  process.exit(1);
}
