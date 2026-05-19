import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Agent tool input. tools-reference.md Agent tool behavior, hooks.md PreToolUse.Agent. */
export interface AgentToolInput {
  readonly prompt: string;
  readonly description: string;
  readonly subagent_type: string;
  readonly model?: string;
  readonly run_in_background?: boolean;
}

/** Agent tool output. hooks.md PostToolUse Agent tool_response. */
export interface AgentToolOutput {
  readonly status: "completed" | "async_launched";
  readonly agentId: string;
  readonly content?: ReadonlyArray<{ type: string; text: string }>;
  readonly totalTokens?: number;
  readonly totalDurationMs?: number;
  readonly totalToolUseCount?: number;
  readonly outputFile?: string;
}

/**
 * Spawns a Subagent with its own context window. Returns a single text result to
 * the parent conversation; intermediate tool calls are not visible to the parent.
 *
 * Source: tools-reference.md "Agent tool behavior".
 */
export abstract class AgentTool extends Tool<AgentToolInput, AgentToolOutput> {
  protected constructor() { super({ name: ToolName.Agent, requiresPermission: false }); }
}
