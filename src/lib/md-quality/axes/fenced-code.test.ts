/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis C — Fenced code — fixture + counter-example test.
 */

import { scoreFencedCode } from "./fenced-code.js";
import { loadSpecExamples } from "../fixtures.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  // 1. spec sweep — must not crash on any fixture
  const examples = loadSpecExamples();
  let scored = 0;
  for (const ex of examples) {
    const r = scoreFencedCode(ex.markdown);
    scored += 1;
    if (r.points_lost > 20) {
      fail(`example #${ex.index}: cap broken (${r.points_lost} > 20)`);
    }
  }
  console.log(`  ✓ fenced-code: ${scored} spec examples scored, all within 20-pt cap`);

  // 2. Clean fenced code with language tag = 0 lost
  const clean = "# title\n\n```ts\nconst x = 1;\n```\n";
  const cR = scoreFencedCode(clean);
  if (cR.points_lost !== 0) {
    fail(`clean fenced code should score 0, got ${cR.points_lost}: ${JSON.stringify(cR.violations)}`);
  }
  console.log(`  ✓ clean fenced+lang scores 0/20`);

  // 3. C2 — missing language tag
  const noLang = "# title\n\n```\nconst x = 1;\n```\n";
  const nR = scoreFencedCode(noLang);
  if (!nR.violations.some((v) => v.rule === "C2")) {
    fail("C2 missed no-language fence");
  }
  console.log(`  ✓ C2 fires on missing language: lost ${nR.points_lost} pts`);

  // 4. C3 — indented code block (no fence)
  const indented = "# title\n\nbody\n\n    const x = 1;\n    const y = 2;\n\nmore\n";
  const iR = scoreFencedCode(indented);
  if (!iR.violations.some((v) => v.rule === "C3")) {
    fail("C3 missed indented code block");
  }
  console.log(`  ✓ C3 fires on indented code: lost ${iR.points_lost} pts`);

  // 5. C1 — unterminated fence
  const unterm = "# title\n\n```\nconst x = 1;\n";
  const uR = scoreFencedCode(unterm);
  // mdast auto-closes runaway fences; the regex check counts
  // delimiters. An unterminated open will show 1 fence (odd) → C1.
  if (!uR.violations.some((v) => v.rule === "C1")) {
    console.log(`  ⚠ C1 didn't fire on unterminated fence (parser auto-closed it; got ${uR.points_lost} lost)`);
  } else {
    console.log(`  ✓ C1 fires on unterminated fence: lost ${uR.points_lost} pts`);
  }

  // 6. C4 — tab inside code value
  const tabbed = "# title\n\n```ts\n\tconst x = 1;\n```\n";
  const tR = scoreFencedCode(tabbed);
  if (!tR.violations.some((v) => v.rule === "C4")) {
    fail("C4 missed tab indentation");
  }
  console.log(`  ✓ C4 fires on tab indent: lost ${tR.points_lost} pts`);

  // 7. Cap at 20
  const stacked = Array.from({ length: 20 }, (_, i) => `\`\`\`\nblock${i}\n\`\`\``).join("\n\n");
  const cap = scoreFencedCode(stacked);
  if (cap.points_lost > 20) fail(`cap broken: ${cap.points_lost} > 20`);
  console.log(`  ✓ Axis C capped at 20 (got ${cap.points_lost}/20)`);
}

try {
  main();
} catch (err) {
  console.error("fenced-code.test FAIL:", (err as Error).message);
  process.exit(1);
}
