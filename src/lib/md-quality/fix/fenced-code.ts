/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis C fixers — fenced code blocks.
 *
 * Conservative rule: if the count of fence delimiter lines (``` or ~~~)
 * is odd, append one matching closing fence line at end of file. We
 * use the same backtick/tilde character as the unmatched opener so we
 * don't accidentally introduce a new opener inside an existing run.
 *
 * We do NOT add language tags to bare ``` fences (C2) — picking the
 * wrong language is worse than leaving it blank. We do NOT convert
 * indented code blocks to fences (C3) — that mutates surrounding
 * paragraph context in ways that often break the diff.
 *
 * Counts fences via a line regex matching CommonMark §4.5 opening
 * fence: up to 3 leading spaces then ≥3 backticks or tildes. We do
 * this on the raw string because the AST already "closes" runaway
 * fences silently, hiding the bug we're trying to fix.
 */

const FENCE_RE = /^ {0,3}(`{3,}|~{3,})/;

export function fixFencedCode(src: string): string {
  // Walk lines once; toggle in/out of fence per CommonMark §4.5 (closer
  // must match the opener's character and be ≥ its length). At EOF, any
  // unterminated opener leaves `openChar` set; close it with a matching
  // delimiter.
  let openChar: "`" | "~" | null = null;
  let openLen = 0;
  for (const line of src.split("\n")) {
    const m = line.match(FENCE_RE);
    if (!m) continue;
    const ch = m[1][0] as "`" | "~";
    const len = m[1].length;
    if (openChar === null) {
      openChar = ch;
      openLen = len;
    } else if (ch === openChar && len >= openLen) {
      openChar = null;
      openLen = 0;
    }
    // Otherwise: fence-like line of a different char inside an open
    // fence is content, not a fence.
  }

  if (openChar === null) return src; // balanced

  const close = openChar.repeat(openLen);
  const sep = src.endsWith("\n") ? "" : "\n";
  return src + sep + close + "\n";
}
