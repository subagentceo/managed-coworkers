import { Entity } from "../core/Entity.js";
import { TurnId, SessionId, ToolUseId } from "../core/Identifier.js";

/**
 * One complete response from Claude within a session.
 *
 * Source: glossary.md "Turn". A turn begins when the user sends a message and
 * ends when Claude finishes responding, with any number of tool calls in between.
 * Stop hooks fire at the end of each turn.
 */
export class Turn extends Entity {
  public override readonly id: TurnId;
  public readonly sessionId: SessionId;
  public readonly userPrompt: string;
  public readonly assistantMessage?: string;
  public readonly toolUseIds: ReadonlyArray<ToolUseId>;
  public readonly startedAt: Date;
  public readonly endedAt?: Date;

  constructor(args: {
    id: TurnId;
    sessionId: SessionId;
    userPrompt: string;
    assistantMessage?: string;
    toolUseIds?: ReadonlyArray<ToolUseId>;
    startedAt: Date;
    endedAt?: Date;
  }) {
    super(args.id, args.startedAt);
    this.id = args.id;
    this.sessionId = args.sessionId;
    this.userPrompt = args.userPrompt;
    this.assistantMessage = args.assistantMessage;
    this.toolUseIds = args.toolUseIds ?? [];
    this.startedAt = args.startedAt;
    this.endedAt = args.endedAt;
  }

  public get kind(): string { return "turn"; }
}
