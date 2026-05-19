/**
 * @cite vendor/commonmark-spec/spec.txt
 *
 * spec.txt fixture loader.
 *
 * The CommonMark spec.txt is structured as prose interleaved with
 * fenced example blocks of the form:
 *
 *   ```````````````````````````````` example
 *   <markdown source>
 *   .
 *   <expected HTML>
 *   ````````````````````````````````
 *
 * The fence is 32 backticks (matched by the spec's reference impl).
 * Each block is split at the `.` separator line.
 *
 * This loader returns the (markdown, html) pairs so axis tests can
 * feed every valid CommonMark example through the grader and assert
 * parseability + structure scores.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
export const SPEC_PATH = resolve(REPO_ROOT, "vendor", "commonmark-spec", "spec.txt");

export interface SpecExample {
  /** 1-based example index within spec.txt. */
  index: number;
  /** The section heading the example sits under (best-effort). */
  section?: string;
  markdown: string;
  html: string;
}

const EXAMPLE_RE = /^`{32} example(.*?)\n([\s\S]*?)^\.\n([\s\S]*?)^`{32}$/gm;
const HEADING_RE = /^#{1,6}\s+(.+)$/gm;

let cached: SpecExample[] | null = null;

export function loadSpecExamples(): SpecExample[] {
  if (cached) return cached;
  const body = readFileSync(SPEC_PATH, "utf8");

  // Find section headings with their byte offsets so we can attribute
  // each example to its enclosing section.
  const sections: { offset: number; title: string }[] = [];
  for (const m of body.matchAll(HEADING_RE)) {
    sections.push({ offset: m.index ?? 0, title: m[1].trim() });
  }
  function sectionAt(offset: number): string | undefined {
    let last: string | undefined;
    for (const s of sections) {
      if (s.offset > offset) break;
      last = s.title;
    }
    return last;
  }

  const out: SpecExample[] = [];
  let index = 0;
  for (const m of body.matchAll(EXAMPLE_RE)) {
    index += 1;
    const markdown = m[2].replace(/→/g, "\t"); // spec uses → to mark tabs
    const html = m[3].replace(/→/g, "\t");
    out.push({
      index,
      section: sectionAt(m.index ?? 0),
      markdown,
      html,
    });
  }
  cached = out;
  return out;
}
