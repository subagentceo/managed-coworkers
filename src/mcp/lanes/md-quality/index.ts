/**
 * Bridge lane: md-quality.
 *
 * Aggregates all md-quality MCP tools registered by this lane:
 *   md_quality_diff - score vendor markdown at two git shas (MD9).
 *
 * Future MD-lane tools should add their register call here.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerMdQualityDiff } from "./diff.js";

export { mdQualityDiff, registerMdQualityDiff } from "./diff.js";
export type { DiffOptions, DiffResult, FileDelta } from "./diff.js";

export function registerMdQuality(server: McpServer): void {
  registerMdQualityDiff(server);
}
