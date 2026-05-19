/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Auto-fix orchestrator for md-quality (MD11).
 *
 *   fixMarkdown(src) → { fixed, changed }
 *
 * Runs the 4 fixable-axis fixers (B/C/D/E) in order and returns the
 * result. Axis A (parseability) is diagnostic only — the parser
 * disagreement signal is the value, so we never auto-fix it.
 *
 * Order matters:
 *   1. C (fenced-code) FIRST — close unclosed fences. This is critical
 *      because every other axis's fence/code-skip logic depends on
 *      fences being balanced.
 *   2. B (headings) — demote extra H1s.
 *   3. D (links) — strip undefined `[text][undef]` to `[text]`.
 *   4. E (line-discipline) LAST — strip trailing WS, collapse blanks,
 *      normalize trailing newline. Must run after the other fixers
 *      because they may introduce or leave behind trailing WS.
 */

import { fixHeadings } from "./headings.js";
import { fixFencedCode } from "./fenced-code.js";
import { fixLinks } from "./links.js";
import { fixLineDiscipline } from "./line-discipline.js";

export type FixableAxis = "B" | "C" | "D" | "E";

export interface FixOptions {
  /** Restrict to a subset of axes. Default: all 4 fixable axes. */
  axes?: FixableAxis[];
}

export interface FixResult {
  fixed: string;
  changed: boolean;
}

const DEFAULT_AXES: FixableAxis[] = ["C", "B", "D", "E"];

export function fixMarkdown(src: string, opts: FixOptions = {}): FixResult {
  const enabled = new Set<FixableAxis>(opts.axes ?? DEFAULT_AXES);
  let cur = src;
  if (enabled.has("C")) cur = fixFencedCode(cur);
  if (enabled.has("B")) cur = fixHeadings(cur);
  if (enabled.has("D")) cur = fixLinks(cur);
  if (enabled.has("E")) cur = fixLineDiscipline(cur);
  return { fixed: cur, changed: cur !== src };
}

export { fixHeadings, fixFencedCode, fixLinks, fixLineDiscipline };
