/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Axis D fixers — link hygiene.
 *
 * Conservative rule: locate `[text][undef]` reference uses where
 * `undef` has no matching `[undef]: url` definition. Strip the
 * `[undef]` portion, leaving plain `[text]`. This matches the axis-D
 * D2 detector logic (links.ts): the AST only emits `linkReference`
 * nodes when a matching definition exists, so undefined references
 * have to be located via string scan with the same fence/indent
 * skips the grader uses.
 *
 * We do NOT touch defined-but-unreferenced definitions (also D2) —
 * they may be intentional anchors that future content links to.
 * We do NOT delete valid reference links.
 */

import { visit } from "unist-util-visit";
import type { Definition } from "mdast";

import { parse } from "../parse.js";

const REF_USE_RE = /\[([^\]\n]+)\]\[([^\]\n]+)\]/g;

export function fixLinks(src: string): string {
  const parsed = parse(src);
  if (!parsed.ok || !parsed.tree) return src;

  // Definitions present in the file.
  const defs = new Set<string>();
  visit(parsed.tree, "definition", (n: Definition) => {
    defs.add(n.identifier);
  });

  // Walk by line so we can honor the same fence/indent skips axis D does.
  const lines = src.split("\n");
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(?:`{3,}|~{3,})/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^ {4,}/.test(line)) continue; // indented code

    // Replace `[text][undef]` where undef is undefined.
    lines[i] = line.replace(REF_USE_RE, (match, text: string, id: string) => {
      // CommonMark normalizes reference labels: collapse internal
      // whitespace and lowercase. mdast does the same. Mirror that.
      const norm = id.trim().replace(/\s+/g, " ").toLowerCase();
      if (defs.has(norm)) return match; // valid — leave it
      return `[${text}]`;
    });
  }

  return lines.join("\n");
}
