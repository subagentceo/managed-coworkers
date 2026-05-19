/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis D — Link hygiene (15 pts).
 *
 *   D1. Empty link `[]()` / `[]( )`         5 pts flat (1st), 1 pt each subsequent, cap 5
 *   D2. Dangling reference definition       1 pt per def, cap 5
 *       (defined but unreferenced, OR
 *        referenced but undefined)
 *   D3. Relative path that escapes the      1 pt per offender, cap 5
 *       file's directory using ../../..
 *       beyond what the chassis allows
 *   D4. Empty link text [](url)             1 pt per offender, cap 3
 *
 * CommonMark §4.7 (link reference definitions), §6.3 (links).
 *
 * Notes:
 *   - The relative-path escape check D3 only counts segments — we
 *     don't resolve filesystem paths here (axis grades from src
 *     alone). A path with ≥3 `..` segments is the heuristic.
 *   - D2 cross-checks `definition` nodes vs `linkReference`/
 *     `imageReference` nodes. Mismatch in either direction counts.
 *   - D1 (empty URL) and D4 (empty text) are similar but distinct:
 *     `[]()` trips both; `[](url)` trips only D4; `[text]()` trips
 *     only D1.
 */

import { visit } from "unist-util-visit";
import type {
  Link,
  LinkReference,
  ImageReference,
  Definition,
} from "mdast";

import type { AxisResult, Violation } from "../types.js";
import { parse } from "../parse.js";

const MAX = 15;

function textOf(node: Link): string {
  let out = "";
  for (const child of node.children ?? []) {
    if ("value" in child && typeof child.value === "string") {
      out += child.value;
    }
  }
  return out;
}

export function scoreLinks(src: string): AxisResult {
  const violations: Violation[] = [];
  const parsed = parse(src);
  if (!parsed.ok) {
    return { axis: "D", max: MAX, points_lost: 0, violations };
  }
  const tree = parsed.tree!;

  let points_lost = 0;

  // D1 — empty link URL
  let d1_lost = 0;
  visit(tree, "link", (node: Link) => {
    if (d1_lost >= 5) return;
    if (!node.url || node.url.trim() === "") {
      const cost = d1_lost === 0 ? 5 : 1;
      const apply = Math.min(cost, 5 - d1_lost);
      d1_lost += apply;
      violations.push({
        axis: "D",
        rule: "D1",
        line: node.position?.start.line ?? 0,
        msg: `empty link URL ([${textOf(node)}]())`,
        points_lost: apply,
      });
    }
  });
  points_lost += d1_lost;

  // D2 — dangling reference defs
  const defs = new Map<string, Definition>();
  visit(tree, "definition", (n: Definition) => {
    defs.set(n.identifier, n);
  });
  const referenced = new Set<string>();
  visit(tree, "linkReference", (n: LinkReference) => {
    referenced.add(n.identifier);
  });
  visit(tree, "imageReference", (n: ImageReference) => {
    referenced.add(n.identifier);
  });
  // Unreferenced defs
  let d2_lost = 0;
  for (const [id, def] of defs) {
    if (d2_lost >= 5) break;
    if (!referenced.has(id)) {
      d2_lost += 1;
      violations.push({
        axis: "D",
        rule: "D2",
        line: def.position?.start.line ?? 0,
        msg: `unreferenced link definition: [${id}]`,
        points_lost: 1,
      });
    }
  }
  // Undefined references: mdast only emits `linkReference` nodes
  // when a matching definition exists. To catch references whose
  // def is missing, string-scan the source for `[text][id]` and
  // check the defs map.
  if (d2_lost < 5) {
    const lines = src.split("\n");
    let inFence = false;
    const REF_USE_RE = /\[(?:[^\]]+)\]\[([^\]]+)\]/g;
    for (let i = 0; i < lines.length; i++) {
      if (d2_lost >= 5) break;
      const line = lines[i];
      if (/^\s*(?:`{3,}|~{3,})/.test(line)) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;
      if (/^ {4,}/.test(line)) continue;
      REF_USE_RE.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = REF_USE_RE.exec(line)) !== null) {
        const id = m[1].toLowerCase();
        if (defs.has(id)) continue;
        if (d2_lost >= 5) break;
        d2_lost += 1;
        violations.push({
          axis: "D",
          rule: "D2",
          line: i + 1,
          msg: `undefined link reference: [${m[1]}]`,
          points_lost: 1,
        });
      }
    }
  }
  points_lost += d2_lost;

  // D3 — relative path escape (≥3 .. segments)
  let d3_lost = 0;
  visit(tree, "link", (node: Link) => {
    if (d3_lost >= 5) return;
    const url = node.url ?? "";
    if (/^https?:|^mailto:|^#/.test(url)) return; // absolute / anchor — skip
    const dotdots = (url.match(/\.\.\//g) ?? []).length;
    if (dotdots >= 3) {
      d3_lost += 1;
      violations.push({
        axis: "D",
        rule: "D3",
        line: node.position?.start.line ?? 0,
        msg: `relative path escapes: ${url}`,
        points_lost: 1,
      });
    }
  });
  points_lost += d3_lost;

  // D4 — empty link text
  let d4_lost = 0;
  visit(tree, "link", (node: Link) => {
    if (d4_lost >= 3) return;
    if (textOf(node).trim() === "" && (node.url ?? "").trim() !== "") {
      d4_lost += 1;
      violations.push({
        axis: "D",
        rule: "D4",
        line: node.position?.start.line ?? 0,
        msg: `link with empty text: [](${node.url})`,
        points_lost: 1,
      });
    }
  });
  points_lost += d4_lost;

  if (points_lost > MAX) points_lost = MAX;

  return { axis: "D", max: MAX, points_lost, violations };
}
