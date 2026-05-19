/**
 * Bridge lane: md-quality top offenders (MD10, OMDQ10).
 *
 * Tool:
 *   md_quality_top_offenders({rule, limit?, vendor?, index_path?})
 *     → top files in vendor/.mdq-index.json that lost the most points
 *       on the requested rubric axis.
 *
 * The index is built ahead of time by `npm run mdq:index`
 * (scripts/build-mdq-index.ts). If the index file is missing the tool
 * returns a structured `{error}` payload instead of throwing, so the
 * agent gets actionable guidance without aborting the wider task.
 *
 * Output budget: ≤1500 tokens. The handler enforces `limit ≤ 50`
 * defensively (the zod schema caps at 50 too).
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../../bridge-utils.js";
import type { AxisId } from "../../../lib/md-quality/types.js";

const RULE_VALUES = ["A", "B", "C", "D", "E"] as const;

interface IndexEntry {
  vendor: string;
  path: string;
  score: number;
  breakdown: Record<AxisId, number>;
}

interface IndexFile {
  built_at: string;
  per_file: IndexEntry[];
}

interface OffenderRow {
  vendor: string;
  path: string;
  points_lost: number;
  score: number;
}

interface OffendersResult {
  rule: AxisId;
  limit: number;
  vendor?: string;
  files: OffenderRow[];
}

/** Repo root resolved relative to this source file. */
function repoRoot(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..");
}

function defaultIndexPath(): string {
  return resolve(repoRoot(), "vendor", ".mdq-index.json");
}

/** Pure helper — exported for the smoke test. */
export function topOffenders(
  index: IndexFile,
  rule: AxisId,
  limit: number,
  vendor?: string
): OffenderRow[] {
  const rows: OffenderRow[] = [];
  for (const e of index.per_file) {
    if (vendor !== undefined && e.vendor !== vendor) continue;
    const points_lost = e.breakdown[rule] ?? 0;
    if (points_lost <= 0) continue;
    rows.push({ vendor: e.vendor, path: e.path, points_lost, score: e.score });
  }
  rows.sort((a, b) => b.points_lost - a.points_lost);
  return rows.slice(0, limit);
}

export function registerMdQualityTopOffenders(server: McpServer): void {
  server.tool(
    "md_quality_top_offenders",
    "Return the vendor markdown files that lost the most points on a single rubric axis (A=parseability, B=headings, C=fenced-code, D=links, E=line-discipline). Reads the pre-built vendor/.mdq-index.json — run `npm run mdq:index` to refresh. Optional `vendor` filter restricts to one mirror.",
    {
      rule: z.enum(RULE_VALUES),
      limit: z.number().int().positive().max(50).default(10),
      vendor: z.string().min(1).optional(),
      index_path: z.string().optional(),
    },
    async ({ rule, limit, vendor, index_path }) => {
      const path = index_path ?? defaultIndexPath();
      let raw: string;
      try {
        raw = readFileSync(path, "utf8");
      } catch {
        return jsonResult({ error: "index missing — run npm run mdq:index" });
      }
      let parsed: IndexFile;
      try {
        parsed = JSON.parse(raw) as IndexFile;
      } catch {
        return jsonResult({ error: "index corrupt — re-run npm run mdq:index" });
      }
      if (!Array.isArray(parsed?.per_file)) {
        return jsonResult({ error: "index corrupt — re-run npm run mdq:index" });
      }
      const files = topOffenders(parsed, rule, limit, vendor);
      const out: OffendersResult = { rule, limit, files };
      if (vendor !== undefined) out.vendor = vendor;
      return jsonResult(out);
    }
  );
}
