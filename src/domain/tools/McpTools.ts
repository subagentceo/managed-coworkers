import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/**
 * Lists resources exposed by connected MCP servers.
 *
 * Source: tools-reference.md ListMcpResourcesTool, ReadMcpResourceTool.
 */
export abstract class ListMcpResourcesTool extends Tool<{ server?: string }, ReadonlyArray<{ uri: string; name?: string }>> {
  protected constructor() { super({ name: ToolName.ListMcpResourcesTool, requiresPermission: false }); }
}

export abstract class ReadMcpResourceTool extends Tool<{ uri: string }, string> {
  protected constructor() { super({ name: ToolName.ReadMcpResourceTool, requiresPermission: false }); }
}

/** Source: tools-reference.md ToolSearch. Used when MCP tool search is enabled. */
export abstract class ToolSearchTool extends Tool<{ query: string }, ReadonlyArray<{ tool: string; schema: unknown }>> {
  protected constructor() { super({ name: ToolName.ToolSearch, requiresPermission: false }); }
}
