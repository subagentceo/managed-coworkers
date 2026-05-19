/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis B fixers — heading hygiene.
 *
 * Conservative rule: if a document has multiple H1s, demote every H1
 * after the first to H2. We do NOT touch depth-skip violations (B2);
 * inserting a synthetic H2 to bridge h1→h3 risks corrupting prose
 * meaning. Setext (B3) is also left alone — converting `===` underlines
 * to ATX would touch line counts and break diff stability.
 *
 * Implementation: line-level rewrite (no AST serialization round-trip).
 * mdast-util-to-markdown would re-flow link references, list markers,
 * and emphasis markers in ways that change unrelated parts of the file,
 * which is exactly what an auto-fixer must NOT do.
 *
 * We DO use mdast-util-from-markdown to identify which lines are
 * heading start lines (vs. heading-like text inside a fenced code
 * block, which we must not touch).
 */

import { visit } from "unist-util-visit";
import type { Heading } from "mdast";

import { parse } from "../parse.js";

export function fixHeadings(src: string): string {
  const parsed = parse(src);
  if (!parsed.ok || !parsed.tree) return src;

  // Collect H1 start lines from the AST (1-based).
  const h1Lines: number[] = [];
  visit(parsed.tree, "heading", (node: Heading) => {
    if (node.depth !== 1) return;
    // Only ATX H1s are safely demotable by adding one '#'. Setext H1s
    // (depth=1 spanning ≥2 lines) require rewriting the underline too;
    // leave those alone to keep the fixer conservative.
    const pos = node.position;
    if (!pos) return;
    if (pos.end.line > pos.start.line) return; // setext — skip
    h1Lines.push(pos.start.line);
  });

  if (h1Lines.length < 2) return src;

  // Demote everything after the first by prefixing one '#' (h1 → h2).
  // Match ATX heading: optional ≤3 spaces, then '# ' or '#\t' or '#$'.
  const toDemote = new Set(h1Lines.slice(1));
  const lines = src.split("\n");
  for (const ln of toDemote) {
    const idx = ln - 1;
    if (idx < 0 || idx >= lines.length) continue;
    lines[idx] = lines[idx].replace(/^( {0,3})#(?=\s|$)/, "$1##");
  }
  return lines.join("\n");
}
