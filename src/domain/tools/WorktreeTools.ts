import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Source: tools-reference.md EnterWorktree / ExitWorktree. Not available to subagents. */
export abstract class EnterWorktreeTool extends Tool<{ path?: string; name?: string }, { worktreePath: string }> {
  protected constructor() { super({ name: ToolName.EnterWorktree, requiresPermission: false }); }
}

export abstract class ExitWorktreeTool extends Tool<void, void> {
  protected constructor() { super({ name: ToolName.ExitWorktree, requiresPermission: false }); }
}
