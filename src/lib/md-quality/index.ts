/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * md-quality public entrypoint (MD6).
 *
 *   gradeMarkdown(src) → GradeResult
 *
 * Runs all 5 axes against a single markdown source and aggregates
 * the result. Pure function. Same input → same output. No I/O.
 *
 * Used by:
 *   - scripts/grade-vendor.ts (CLI)
 *   - src/mcp/lanes/md-quality.ts (MD7+ MCP tools)
 */

import { scoreParseability } from "./axes/parseability.js";
import { scoreHeadings } from "./axes/headings.js";
import { scoreFencedCode } from "./axes/fenced-code.js";
import { scoreLinks } from "./axes/links.js";
import { scoreLineDiscipline } from "./axes/line-discipline.js";
import { aggregate } from "./aggregate.js";
import type { GradeResult } from "./types.js";

export type {
  AxisId,
  AxisResult,
  GradeResult,
  Violation,
} from "./types.js";

export function gradeMarkdown(src: string): GradeResult {
  return aggregate([
    scoreParseability(src),
    scoreHeadings(src),
    scoreFencedCode(src),
    scoreLinks(src),
    scoreLineDiscipline(src),
  ]);
}
