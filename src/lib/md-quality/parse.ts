/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Parse wrapper for the md-quality library. Wraps mdast-util-from-
 * markdown so:
 *
 *   - Throws are captured into a ParseResult shape (axis A — rule
 *     A1 — needs to know "did the parser throw" without exception
 *     plumbing in every axis).
 *   - The same Root tree is shared across all 5 axes (we don't
 *     re-parse per axis).
 *
 * Intentionally NOT using src/lib/markdown.ts's ParsedDoc wrapper
 * here — that one bakes in heading/link visitors we don't all need.
 * The grader walks each axis-specific subset.
 */

import { fromMarkdown } from "mdast-util-from-markdown";
import type { Root } from "mdast";

export interface ParseResult {
  /** True iff the parser produced a tree without throwing. */
  ok: boolean;
  /** The parsed Root, present iff ok=true. */
  tree?: Root;
  /** Error message if parsing threw. */
  error?: string;
}

export function parse(src: string): ParseResult {
  try {
    const tree = fromMarkdown(src);
    return { ok: true, tree };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
