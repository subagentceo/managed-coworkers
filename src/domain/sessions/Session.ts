import { Entity } from "../core/Entity.js";
import { SessionId } from "../core/Identifier.js";
import { PermissionMode, EffortLevel, IsolationMode, SessionStartSource } from "../enums.js";
import { Turn } from "./Turn.js";
import { Checkpoint } from "../checkpoints/Checkpoint.js";

/**
 * A conversation tied to a working directory with its own independent context window.
 *
 * Source: glossary.md "Session".
 * Each session has many Turns, persists under ~/.claude/projects/, and can be resumed
 * with `claude -c` or forked with `--fork-session`.
 */
export abstract class Session extends Entity {
  public override readonly id: SessionId;
  public readonly cwd: string;
  public readonly model: string;
  public readonly permissionMode: PermissionMode;
  public readonly effortLevel?: EffortLevel;
  public readonly isolation: IsolationMode;
  public readonly startSource: SessionStartSource;
  public readonly transcriptPath: string;
  public readonly turns: ReadonlyArray<Turn>;
  public readonly checkpoints: ReadonlyArray<Checkpoint>;
  public readonly parentSessionId?: SessionId;

  protected constructor(args: {
    id: SessionId;
    cwd: string;
    model: string;
    permissionMode: PermissionMode;
    effortLevel?: EffortLevel;
    isolation: IsolationMode;
    startSource: SessionStartSource;
    transcriptPath: string;
    createdAt: Date;
    name?: string;
    turns?: ReadonlyArray<Turn>;
    checkpoints?: ReadonlyArray<Checkpoint>;
    parentSessionId?: SessionId;
  }) {
    super(args.id, args.createdAt, args.name);
    this.id = args.id;
    this.cwd = args.cwd;
    this.model = args.model;
    this.permissionMode = args.permissionMode;
    this.effortLevel = args.effortLevel;
    this.isolation = args.isolation;
    this.startSource = args.startSource;
    this.transcriptPath = args.transcriptPath;
    this.turns = args.turns ?? [];
    this.checkpoints = args.checkpoints ?? [];
    this.parentSessionId = args.parentSessionId;
  }

  public get kind(): string { return "session"; }

  /** Fork a copy under a new SessionId, preserving conversation history. cli-reference.md --fork-session. */
  public abstract fork(newId: SessionId): Session;

  /** Resume this session by id. cli-reference.md --resume. */
  public abstract resume(): Promise<Session>;
}
