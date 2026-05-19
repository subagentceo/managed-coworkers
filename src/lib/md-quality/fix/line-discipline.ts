/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis E fixers — line discipline.
 *
 *   1. Strip trailing whitespace per line.
 *   2. Collapse 3+ consecutive blank lines to exactly 2 (one blank
 *      between paragraphs, preserved).
 *   3. Ensure file ends with exactly one trailing newline.
 *
 * Pure string operations — no AST round-trip. Safe on every doc.
 *
 * We do NOT normalize CRLF→LF here (E2). That's a one-shot
 * conversion better handled separately, and depending on the
 * filesystem may already be the case.
 */

export function fixLineDiscipline(src: string): string {
  // Step 1: strip trailing whitespace per line, preserving line endings.
  // We split on \n (keeping any \r as part of the line, which strip
  // also removes), then rejoin.
  let lines = src.split("\n").map((l) => l.replace(/[ \t\r]+$/, ""));

  // Step 2: collapse runs of 3+ blank lines to 2.
  // After the trailing-WS pass, a "blank" line is "".
  const collapsed: string[] = [];
  let blankRun = 0;
  for (const l of lines) {
    if (l === "") {
      blankRun += 1;
      if (blankRun <= 2) collapsed.push(l);
    } else {
      blankRun = 0;
      collapsed.push(l);
    }
  }
  lines = collapsed;

  // Step 3: ensure exactly one trailing newline.
  // Drop trailing empty strings, then append one newline.
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines.join("\n") + "\n";
}
