/**
 * Bridge lane: md-quality.
 *
 * Aggregates all md-quality tool registrations so the bridge server
 * can do a single `registerMdQuality(server)` call. Each tool lives
 * in its own sibling module:
 *
 *   - top-offenders.ts → md_quality_top_offenders (MD10, OMDQ10)
 *
 * Sibling MD7/MD8/MD9 lanes will add their own registrations here.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerMdQualityTopOffenders } from "./top-offenders.js";

export function registerMdQuality(server: McpServer): void {
  registerMdQualityTopOffenders(server);
}
