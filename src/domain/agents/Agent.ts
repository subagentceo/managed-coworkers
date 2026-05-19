import { Entity } from "../core/Entity.js";
import { AgentId } from "../core/Identifier.js";
import { EffortLevel, IsolationMode, ToolName } from "../enums.js";

/**
 * Abstract base for any AI agent that runs inside Claude Code.
 *
 * Source: glossary.md "Subagent" and "Agent teams"; plugins-reference.md "Agents".
 * Concrete subclasses are Subagent (single-session delegated worker) and
 * TeamAgent (full independent session inside an AgentTeam).
 */
export abstract class Agent extends Entity {
  public override readonly id: AgentId;
  /** Frontmatter `name` (kebab-case, used in /agents and Agent(...) permission rules). */
  public override readonly name: string;
  public readonly description: string;
  public readonly model?: string;
  public readonly effort?: EffortLevel;
  public readonly maxTurns?: number;
  public readonly tools?: ReadonlyArray<ToolName | string>;
  public readonly disallowedTools?: ReadonlyArray<ToolName | string>;
  public readonly isolation: IsolationMode;
  public readonly systemPrompt: string;

  protected constructor(args: {
    id: AgentId;
    name: string;
    description: string;
    systemPrompt: string;
    model?: string;
    effort?: EffortLevel;
    maxTurns?: number;
    tools?: ReadonlyArray<ToolName | string>;
    disallowedTools?: ReadonlyArray<ToolName | string>;
    isolation?: IsolationMode;
    createdAt: Date;
  }) {
    super(args.id, args.createdAt, args.name);
    this.id = args.id;
    this.name = args.name;
    this.description = args.description;
    this.systemPrompt = args.systemPrompt;
    this.model = args.model;
    this.effort = args.effort;
    this.maxTurns = args.maxTurns;
    this.tools = args.tools;
    this.disallowedTools = args.disallowedTools;
    this.isolation = args.isolation ?? IsolationMode.None;
  }

  public get kind(): string { return "agent"; }
}
