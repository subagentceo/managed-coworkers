/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis E — Line discipline (15 pts).
 *
 *   E1. Trailing whitespace                  1 pt per 50 lines w/ trailing
 *                                            WS, cap 5
 *   E2. CRLF / LF mix                        5 pts flat if any CR present
 *   E3. Tab + space mixed at line start      1 pt per 50 lines mixed,
 *                                            cap 3
 *   E4. Line > 200 cols (soft cap)           1 pt per 100 lines over cap,
 *                                            cap 2
 *
 * NOT in the CommonMark spec — these are tooling hygiene rules that
 * protect grep, diff stability, screen readers, and AST diff
 * comparators. String-level (no parse cost).
 *
 * The graduated lose ("per 50 lines") is intentional: vendor mirrors
 * are big, and a flat 5pt penalty for one trailing-WS line would
 * crush scores. The rubric is composite, not binary.
 */

import type { AxisResult, Violation } from "../types.js";

const MAX = 15;

export function scoreLineDiscipline(src: string): AxisResult {
  const violations: Violation[] = [];
  const lines = src.split(/\r?\n/);

  // E1 — trailing whitespace
  let trailing = 0;
  let firstTrailingLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/[ \t]+$/.test(lines[i])) {
      trailing += 1;
      if (firstTrailingLine === 0) firstTrailingLine = i + 1;
    }
  }
  let e1_lost = 0;
  if (trailing > 0) {
    e1_lost = Math.min(5, Math.ceil(trailing / 50));
    violations.push({
      axis: "E",
      rule: "E1",
      line: firstTrailingLine,
      msg: `${trailing} line(s) with trailing whitespace`,
      points_lost: e1_lost,
    });
  }

  // E2 — CR present
  let e2_lost = 0;
  if (/\r/.test(src)) {
    e2_lost = 5;
    violations.push({
      axis: "E",
      rule: "E2",
      line: 0,
      msg: "carriage-return byte(s) present — should be LF-only",
      points_lost: 5,
    });
  }

  // E3 — tab + space at line start
  let mixed = 0;
  let firstMixedLine = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([ \t]+)/);
    if (!m) continue;
    const prefix = m[1];
    if (prefix.includes(" ") && prefix.includes("\t")) {
      mixed += 1;
      if (firstMixedLine === 0) firstMixedLine = i + 1;
    }
  }
  let e3_lost = 0;
  if (mixed > 0) {
    e3_lost = Math.min(3, Math.ceil(mixed / 50));
    violations.push({
      axis: "E",
      rule: "E3",
      line: firstMixedLine,
      msg: `${mixed} line(s) with tab+space mixed at start`,
      points_lost: e3_lost,
    });
  }

  // E4 — > 200 cols (soft cap)
  let overcap = 0;
  let firstOvercapLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 200) {
      overcap += 1;
      if (firstOvercapLine === 0) firstOvercapLine = i + 1;
    }
  }
  let e4_lost = 0;
  if (overcap > 0) {
    e4_lost = Math.min(2, Math.ceil(overcap / 100));
    violations.push({
      axis: "E",
      rule: "E4",
      line: firstOvercapLine,
      msg: `${overcap} line(s) over 200 cols`,
      points_lost: e4_lost,
    });
  }

  let points_lost = e1_lost + e2_lost + e3_lost + e4_lost;
  if (points_lost > MAX) points_lost = MAX;

  return { axis: "E", max: MAX, points_lost, violations };
}
