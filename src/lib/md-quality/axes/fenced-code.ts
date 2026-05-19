/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis C — Fenced code (20 pts).
 *
 *   C1. Unterminated code fence              up to 10 pts (parser flags)
 *   C2. Missing language tag (info empty)    up to  8 pts (1 per fence, cap 8)
 *   C3. Indented code block used instead of  up to  5 pts (1 per block, cap 5)
 *       fence (≥4-space-indent block, not a
 *       fence)
 *   C4. Tab-only indentation in code value   up to  2 pts
 *
 * CommonMark §4.4 (indented code), §4.5 (fenced code).
 *
 * Detection notes:
 *   - mdast represents both fenced and indented blocks as the same
 *     `code` node type. We tell them apart by `position` — a fenced
 *     block starts with ``` (or ~~~), an indented block starts at
 *     column ≥4 with no fence chars.
 *   - C1 (unterminated fence) is detected by string-level scan because
 *     mdast-util-from-markdown auto-closes runaway fences silently.
 *   - C2 checks `code.lang === null` AND it's a fenced block.
 *   - C3 fires on bare indented code blocks; we don't penalize spec
 *     §4.4 ones — vendor mirrors RARELY have legitimate indented
 *     code (Turndown emits fenced by default), so this catches the
 *     leakage cases.
 */

import { visit } from "unist-util-visit";
import type { Code } from "mdast";

import type { AxisResult, Violation } from "../types.js";
import { parse } from "../parse.js";

const MAX = 20;

const FENCE_OPEN_RE = /^(?: {0,3})(`{3,}|~{3,})/gm;
const FENCE_CLOSE_RE = /^(?: {0,3})(`{3,}|~{3,})\s*$/gm;

export function scoreFencedCode(src: string): AxisResult {
  const violations: Violation[] = [];
  const parsed = parse(src);
  if (!parsed.ok) {
    return { axis: "C", max: MAX, points_lost: 0, violations };
  }
  const tree = parsed.tree!;

  let points_lost = 0;

  // C1 — unterminated fence. Count opening fences vs closing fences.
  // An unbalanced pair == unterminated. 5 pts per unterminated, cap 10.
  const opens = (src.match(FENCE_OPEN_RE) || []).length;
  // FENCE_CLOSE_RE is reserved for future asymmetric detection if
  // info-string-aware fence pairing is added; today FENCE_OPEN_RE
  // alone suffices (every fence delimiter — open or close — matches).
  void FENCE_CLOSE_RE;
  // A balanced doc → opens is even (every fence has matching close).
  // Unterminated → opens is odd.
  if (opens > 0 && opens % 2 !== 0) {
    const cost = Math.min(10, 5 * Math.ceil((opens % 2) / 1));
    points_lost += cost;
    violations.push({
      axis: "C",
      rule: "C1",
      line: 0,
      msg: `unbalanced fence count: ${opens} fence delimiters (expected even)`,
      points_lost: cost,
    });
  }

  // C2 + C3 walk
  let c2_lost = 0;
  let c3_lost = 0;
  visit(tree, "code", (node: Code) => {
    const line = node.position?.start.line ?? 0;
    // Detect whether this is a fenced block. mdast doesn't expose
    // the fence directly; we approximate by checking the source
    // chars at the node's start.
    const startOffset = node.position?.start.offset ?? 0;
    const head = src.slice(startOffset, startOffset + 4);
    const isFenced = head.startsWith("```") || head.startsWith("~~~");

    if (isFenced && node.lang === null) {
      if (c2_lost < 8) {
        const cost = Math.min(1, 8 - c2_lost);
        c2_lost += cost;
        violations.push({
          axis: "C",
          rule: "C2",
          line,
          msg: "fenced code block has no language tag",
          points_lost: cost,
        });
      }
    }
    if (!isFenced && node.value.length > 0) {
      // Indented code block — likely a Turndown emission artifact.
      if (c3_lost < 5) {
        const cost = Math.min(1, 5 - c3_lost);
        c3_lost += cost;
        violations.push({
          axis: "C",
          rule: "C3",
          line,
          msg: "indented code block (prefer fenced ``` syntax)",
          points_lost: cost,
        });
      }
    }
  });
  points_lost += c2_lost + c3_lost;

  // C4 — tab-only indentation inside code values. 2 pts flat if any.
  let c4_fired = false;
  visit(tree, "code", (node: Code) => {
    if (c4_fired) return;
    // Tab at start of a code line counts. Skip first char of value
    // because mdast strips the leading fence indent already.
    if (/^\t/m.test(node.value)) {
      c4_fired = true;
      points_lost += 2;
      violations.push({
        axis: "C",
        rule: "C4",
        line: node.position?.start.line ?? 0,
        msg: "tab indentation inside code block (prefer spaces)",
        points_lost: 2,
      });
    }
  });

  if (points_lost > MAX) points_lost = MAX;

  return { axis: "C", max: MAX, points_lost, violations };
}
