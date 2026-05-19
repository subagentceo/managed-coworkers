import { Entity } from "../core/Entity.js";
import { ToolName } from "../enums.js";

/**
 * Abstract base for every action Claude can take.
 *
 * Source: tools-reference.md. A tool is what makes Claude Code agentic; without
 * tools, Claude can only respond with text. Each tool use returns a result that
 * informs Claude's next decision in the agentic loop.
 *
 * Tools have an immutable `name` (ToolName enum value, the exact string used in
 * permission rules, subagent tool lists, and hook matchers) and a flag declaring
 * whether the tool requires user permission by default.
 */
export abstract class Tool<TInput = unknown, TOutput = unknown> extends Entity {
  public readonly name: ToolName;
  public readonly requiresPermission: boolean;

  protected constructor(args: { name: ToolName; requiresPermission: boolean; createdAt?: Date }) {
    super(args.name, args.createdAt ?? new Date(), args.name);
    this.name = args.name;
    this.requiresPermission = args.requiresPermission;
  }

  public get kind(): string { return "tool"; }

  /** Execute the tool against typed input and return typed output. */
  public abstract execute(input: TInput): Promise<TOutput>;
}
