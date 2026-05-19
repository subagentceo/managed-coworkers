import { Agent } from "./Agent.js";
import { SubagentExecutionMode } from "../enums.js";

/**
 * A specialized AI assistant that runs in its own context window with a custom
 * system prompt, specific tool access, and independent permissions.
 *
 * Source: glossary.md "Subagent", tools-reference.md "Agent tool behavior".
 * Built-in subagents include Explore, Plan, and general-purpose.
 */
export abstract class Subagent extends Agent {
  public readonly executionMode!: SubagentExecutionMode;
  public readonly parentAgentId?: string;

  public override get kind(): string { return "subagent"; }
}
