/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * MD11 smoke test — fixMarkdown() orchestrator + per-axis fixers.
 *
 * Builds an in-memory fixture with one violation per fixable axis:
 *   - B: two H1s
 *   - C: unclosed ``` fence
 *   - D: `[text][undef-ref]` with no matching definition
 *   - E: trailing whitespace, 3 consecutive blank lines, no final \n
 *
 * Asserts:
 *   - fixMarkdown returns changed=true
 *   - post-fix gradeMarkdown score is STRICTLY greater than pre-fix
 *   - fixed text ends with exactly one trailing \n
 *
 * Also includes a few per-axis micro-asserts so a regression in one
 * fixer is easy to localize.
 */

import { fixMarkdown, fixHeadings, fixFencedCode, fixLinks, fixLineDiscipline } from "./index.js";
import { gradeMarkdown } from "../index.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function assert(cond: unknown, msg: string): void {
  if (!cond) fail(msg);
}

function buildFixture(): string {
  // Carefully constructed so each violation lands in its own axis.
  // No trailing newline (E violation). 3 blank lines in a row.
  // Two H1s. Unclosed code fence at end. One undefined ref link.
  return [
    "# First Title   ",
    "",
    "Some body text with a [bad link][undef-ref] in it.",
    "",
    "",
    "",
    "# Second Title",
    "",
    "Body under the second H1.",
    "",
    "```ts",
    "const x: number = 1;",
  ].join("\n");
}

function main(): void {
  const fixture = buildFixture();
  const before = gradeMarkdown(fixture);
  const fixed = fixMarkdown(fixture);

  assert(fixed.changed === true, "fixMarkdown should report changed=true on a dirty fixture");
  assert(fixed.fixed !== fixture, "fixed text must differ from input");

  const after = gradeMarkdown(fixed.fixed);
  assert(
    after.score > before.score,
    `expected post-fix score (${after.score}) > pre-fix score (${before.score})`,
  );

  // Trailing newline discipline.
  assert(fixed.fixed.endsWith("\n"), "fixed output must end with a newline");
  assert(!fixed.fixed.endsWith("\n\n"), "fixed output must end with exactly one newline");

  console.log(
    `  ✓ smoke fixture: score ${before.score} → ${after.score} (+${after.score - before.score})`,
  );

  // Per-axis micro-checks.

  // B — single second '#' demotion
  const twoH1 = "# A\n\nbody\n\n# B\n\nmore\n";
  const fixedB = fixHeadings(twoH1);
  assert(
    /^# A/m.test(fixedB) && /^## B/m.test(fixedB),
    `B fix should demote second H1 to H2, got: ${JSON.stringify(fixedB)}`,
  );
  console.log("  ✓ headings: demotes second H1 to H2");

  // C — unclosed fence gets a close appended
  const unclosed = "```ts\nconst x = 1;\n";
  const fixedC = fixFencedCode(unclosed);
  const fenceCount = (fixedC.match(/^```/gm) ?? []).length;
  assert(fenceCount === 2, `C fix should produce balanced fences, got ${fenceCount}: ${JSON.stringify(fixedC)}`);
  console.log("  ✓ fenced-code: appends closing fence");

  // C — already-balanced is left alone
  const balanced = "```\nx\n```\n";
  const fixedCBal = fixFencedCode(balanced);
  assert(fixedCBal === balanced, "C fix must not touch balanced docs");
  console.log("  ✓ fenced-code: no-op on balanced docs");

  // D — undefined reference is stripped to plain bracket text
  const dDoc = "see [the docs][nope] for details\n";
  const fixedD = fixLinks(dDoc);
  assert(
    fixedD.includes("[the docs]") && !fixedD.includes("[nope]"),
    `D fix should strip undefined ref, got: ${JSON.stringify(fixedD)}`,
  );
  console.log("  ✓ links: strips undefined references");

  // D — valid reference preserved
  const dValid = "see [the docs][k]\n\n[k]: https://example.com\n";
  const fixedDValid = fixLinks(dValid);
  assert(fixedDValid === dValid, "D fix must not touch valid references");
  console.log("  ✓ links: preserves valid references");

  // E — trailing WS stripped, 3+ blank lines collapsed to 2, single trailing \n
  const eDoc = "hello   \n\n\n\nworld\t\n\n\n";
  const fixedE = fixLineDiscipline(eDoc);
  assert(!/[ \t]+\n/.test(fixedE), "E fix should strip trailing whitespace");
  // After collapse: at most 2 consecutive blank lines = at most 3 `\n`
  // in a row (one terminating each non-blank line plus 2 blank lines).
  assert(!/\n\n\n\n/.test(fixedE), "E fix should collapse 3+ blank lines to ≤2");
  assert(fixedE.endsWith("\n") && !fixedE.endsWith("\n\n"), "E fix should end with one \\n");
  console.log("  ✓ line-discipline: trailing-WS strip + blank collapse + final newline");

  // Idempotence: running again should be a no-op.
  const second = fixMarkdown(fixed.fixed);
  assert(second.changed === false, "fixMarkdown should be idempotent on already-fixed input");
  console.log("  ✓ fixMarkdown is idempotent on already-fixed input");
}

try {
  main();
  console.log("fix-vendor.test PASS");
} catch (err) {
  console.error("fix-vendor.test FAIL:", (err as Error).message);
  process.exit(1);
}
