/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis B — Heading hygiene (20 pts).
 *
 *   B1. Zero or multiple H1s              up to 8 pts
 *   B2. Heading depth skip (h2 → h4)      up to 8 pts
 *   B3. Setext underline used (vs ATX)    up to 4 pts
 *   B4. Empty heading text                4 pts
 *
 * CommonMark §4.2 (ATX headings), §4.3 (Setext headings).
 *
 * Why these rules:
 *   - Downstream LLMs use the heading skeleton for retrieval chunking
 *     (e.g. "give me the section about X"). Multiple H1s confuse the
 *     document-title heuristic; depth skips break tree-of-content
 *     reconstructors.
 *   - ATX is the chassis's house style — Turndown's headingStyle
 *     option already produces ATX. Setext usage in vendor mirrors is
 *     usually a sign of an HTML→MD pipeline that didn't normalize.
 */

import { visit } from "unist-util-visit";
import type { Heading } from "mdast";

import type { AxisResult, Violation } from "../types.js";
import { parse } from "../parse.js";

const MAX = 20;

interface HeadingInfo {
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  line: number;
  textLength: number;
  isSetext: boolean;
}

export function scoreHeadings(src: string): AxisResult {
  const violations: Violation[] = [];
  const parsed = parse(src);
  if (!parsed.ok) {
    // Parser failures are caught by axis A. Axis B can't grade
    // headings on an unparseable file, so it returns 0 lost rather
    // than double-penalize.
    return { axis: "B", max: MAX, points_lost: 0, violations };
  }
  const tree = parsed.tree!;

  // Collect headings with metadata
  const headings: HeadingInfo[] = [];
  visit(tree, "heading", (node: Heading) => {
    const pos = node.position;
    const line = pos?.start.line ?? 0;
    const textLength = node.children.reduce<number>((acc, c) => {
      if ("value" in c && typeof c.value === "string") {
        return acc + c.value.length;
      }
      return acc;
    }, 0);
    // Detect Setext vs ATX: Setext headings span ≥2 lines (heading
    // text + underline). ATX is single-line.
    const isSetext =
      pos !== undefined && pos.end.line > pos.start.line && node.depth <= 2;
    headings.push({
      depth: node.depth,
      line,
      textLength,
      isSetext,
    });
  });

  let points_lost = 0;

  // B1 — zero or multiple H1s. 8 pts flat.
  const h1Count = headings.filter((h) => h.depth === 1).length;
  if (headings.length > 0 && h1Count !== 1) {
    points_lost += 8;
    violations.push({
      axis: "B",
      rule: "B1",
      line: headings[0].line,
      msg: `expected exactly 1 H1, found ${h1Count}`,
      points_lost: 8,
    });
  }

  // B2 — depth skip (e.g. previous=2, current=4). 2 pts per skip, cap 8.
  let b2_lost = 0;
  let prevDepth = 0;
  for (const h of headings) {
    if (prevDepth > 0 && h.depth > prevDepth + 1) {
      const cost = Math.min(2, 8 - b2_lost);
      b2_lost += cost;
      violations.push({
        axis: "B",
        rule: "B2",
        line: h.line,
        msg: `heading depth skip: h${prevDepth} → h${h.depth}`,
        points_lost: cost,
      });
      if (b2_lost >= 8) break;
    }
    prevDepth = h.depth;
  }
  points_lost += b2_lost;

  // B3 — Setext underline used. 1 pt per setext heading, cap 4.
  let b3_lost = 0;
  for (const h of headings) {
    if (!h.isSetext) continue;
    if (b3_lost >= 4) break;
    const cost = Math.min(1, 4 - b3_lost);
    b3_lost += cost;
    violations.push({
      axis: "B",
      rule: "B3",
      line: h.line,
      msg: `Setext heading found (prefer ATX '# title' over '===' underline)`,
      points_lost: cost,
    });
  }
  points_lost += b3_lost;

  // B4 — empty heading text. 4 pts flat (it's a structural bug).
  let b4_fired = false;
  for (const h of headings) {
    if (h.textLength === 0 && !b4_fired) {
      b4_fired = true;
      points_lost += 4;
      violations.push({
        axis: "B",
        rule: "B4",
        line: h.line,
        msg: "heading with empty text",
        points_lost: 4,
      });
    }
  }

  if (points_lost > MAX) points_lost = MAX;

  return { axis: "B", max: MAX, points_lost, violations };
}
