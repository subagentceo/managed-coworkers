/**
 * Bridge lane tool: md_quality_file (MD7).
 *
 * Grades a single markdown file on disk via gradeMarkdown() from the
 * md-quality library. Returns the composite score, per-axis breakdown,
 * top-5 violations, and the requested path so the caller can correlate
 * the result to the input without round-tripping.
 *
 * The top_violations cap (5) is enforced inside aggregate.ts; this
 * tool does not re-cap.
 *
 * Citations (in the test):
 *   @cite vendor/commonmark-spec/spec.txt
 *   @cite rubrics/md-quality-v1.md
 */
import { readFileSync } from "node:fs";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../../bridge-utils.js";
import { gradeMarkdown } from "../../../lib/md-quality/index.js";

export function registerMdQualityFile(server: McpServer): void {
  server.tool(
    "md_quality_file",
    "Grade a markdown file on disk against the md-quality rubric (5 axes: parseability, headings, fenced-code, links, line-discipline). Returns {score (0-100), breakdown per axis, top_violations (max 5), path}. Pure read; no mutation.",
    { path: z.string().min(1) },
    async ({ path }) => {
      const src = readFileSync(path, "utf8");
      const result = gradeMarkdown(src);
      return jsonResult({
        score: result.score,
        breakdown: result.breakdown,
        top_violations: result.top_violations,
        path,
      });
    }
  );
}
