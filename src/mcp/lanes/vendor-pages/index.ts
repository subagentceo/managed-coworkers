/**
 * Aggregates vendor_pages_* MCP tools under one register entrypoint
 * so bridge-server.ts only imports one symbol per lane.
 *
 * Lane: vendor_pages_search (LOOP-3 / OEMBED-LOOP3).
 *
 * Citations are on the per-tool test files; this aggregator is pure plumbing.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerVendorPagesSearch } from "./search.js";

export { registerVendorPagesSearch, vendorPagesSearch } from "./search.js";
export type { SearchInput, SearchResult, SearchMatch, Embedder } from "./search.js";

export function registerVendorPages(server: McpServer): void {
  registerVendorPagesSearch(server);
}
