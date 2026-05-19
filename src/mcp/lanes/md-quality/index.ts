/**
 * @cite rubrics/md-quality-v1.md
 *
 * md-quality MCP lane registry (MD7+).
 *
 * Aggregates all md_quality_* tools behind a single register entrypoint
 * so bridge-server.ts only imports one symbol per lane.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerMdQualityFile } from "./file.js";
import { registerMdQualityVendor } from "./vendor.js";

export function registerMdQuality(server: McpServer): void {
  registerMdQualityFile(server);
  registerMdQualityVendor(server);
}
