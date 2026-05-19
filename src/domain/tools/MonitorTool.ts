import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Monitor tool input. tools-reference.md "Monitor tool". */
export interface MonitorToolInput {
  readonly command: string;
  readonly description: string;
}

/**
 * Runs a command in the background and feeds each output line back to Claude
 * so it can react to log entries, file changes, or polled status mid-conversation.
 *
 * Source: tools-reference.md "Monitor tool" (v2.1.98+). Shares Bash permission rules.
 * Not available on Bedrock, Vertex AI, or Foundry.
 */
export abstract class MonitorTool extends Tool<MonitorToolInput, void> {
  protected constructor() { super({ name: ToolName.Monitor, requiresPermission: true }); }
}
