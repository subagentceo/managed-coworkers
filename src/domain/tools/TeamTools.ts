import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/**
 * Agent team tools. Only available when CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1.
 *
 * Source: tools-reference.md TeamCreate/TeamDelete/SendMessage, glossary.md "Agent teams".
 */
export abstract class TeamCreateTool extends Tool<{ team_name: string; teammates: ReadonlyArray<{ name: string; agent: string }> }, void> {
  protected constructor() { super({ name: ToolName.TeamCreate, requiresPermission: false }); }
}

export abstract class TeamDeleteTool extends Tool<{ team_name: string }, void> {
  protected constructor() { super({ name: ToolName.TeamDelete, requiresPermission: false }); }
}

export abstract class SendMessageTool extends Tool<{ recipient: string; message: string }, void> {
  protected constructor() { super({ name: ToolName.SendMessage, requiresPermission: false }); }
}
