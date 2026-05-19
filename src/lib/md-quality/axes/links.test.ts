/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis D — Link hygiene — fixture + counter-example test.
 */

import { scoreLinks } from "./links.js";
import { loadSpecExamples } from "../fixtures.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  // 1. spec sweep — must not crash on any fixture
  const examples = loadSpecExamples();
  let scored = 0;
  for (const ex of examples) {
    const r = scoreLinks(ex.markdown);
    scored += 1;
    if (r.points_lost > 15) fail(`#${ex.index} cap broken: ${r.points_lost}`);
  }
  console.log(`  ✓ links: ${scored} spec examples scored within 15-pt cap`);

  // 2. Clean link = 0 lost
  const clean = "[hello](https://example.com)\n";
  if (scoreLinks(clean).points_lost !== 0) fail("clean link should score 0");
  console.log(`  ✓ clean link scores 0/15`);

  // 3. D1 — empty URL
  const d1 = "[some text]()\n";
  const r1 = scoreLinks(d1);
  if (!r1.violations.some((v) => v.rule === "D1")) fail("D1 missed empty URL");
  console.log(`  ✓ D1 fires on empty URL: lost ${r1.points_lost} pts`);

  // 4. D2 — undefined reference
  const d2 = "see [foo][bar]\n";
  const r2 = scoreLinks(d2);
  if (!r2.violations.some((v) => v.rule === "D2")) fail("D2 missed undefined ref");
  console.log(`  ✓ D2 fires on undefined ref: lost ${r2.points_lost} pts`);

  // 4b. D2 — unreferenced def
  const d2b = "body\n\n[unused]: https://example.com\n";
  const r2b = scoreLinks(d2b);
  if (!r2b.violations.some((v) => v.rule === "D2")) fail("D2 missed unreferenced def");
  console.log(`  ✓ D2 fires on unreferenced def: lost ${r2b.points_lost} pts`);

  // 5. D3 — relative path escape
  const d3 = "[escape](../../../../etc/passwd)\n";
  const r3 = scoreLinks(d3);
  if (!r3.violations.some((v) => v.rule === "D3")) fail("D3 missed path escape");
  console.log(`  ✓ D3 fires on ../../../.. path: lost ${r3.points_lost} pts`);

  // 6. D4 — empty link text
  const d4 = "[](https://example.com)\n";
  const r4 = scoreLinks(d4);
  if (!r4.violations.some((v) => v.rule === "D4")) fail("D4 missed empty text");
  console.log(`  ✓ D4 fires on empty text: lost ${r4.points_lost} pts`);

  // 7. Cap at 15
  const stacked = Array.from({ length: 20 }, (_, i) => `[t${i}]()`).join("\n\n");
  const cap = scoreLinks(stacked);
  if (cap.points_lost > 15) fail(`cap broken: ${cap.points_lost}`);
  console.log(`  ✓ Axis D capped at 15 (got ${cap.points_lost}/15)`);
}

try {
  main();
} catch (err) {
  console.error("links.test FAIL:", (err as Error).message);
  process.exit(1);
}
