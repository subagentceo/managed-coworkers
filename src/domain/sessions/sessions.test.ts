/**
 * Sessions test (OCDM7).
 *
 * Asserts the canonical Session/Turn/Context/AgenticLoop hierarchy:
 *   - Concrete Session subclass instantiates with kind === "session".
 *   - SessionId / TurnId branded types remain compile-time distinct.
 *   - Turn has kind === "turn".
 *   - Context can be constructed and accessed (usedPercentage derives correctly).
 *
 * Session models --fork-session and --resume from the CLI reference.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 * @cite vendor/anthropics/code.claude.com/docs/en/cli-reference.md
 */
import { strict as assert } from "node:assert";
import {
  PermissionMode,
  IsolationMode,
  SessionStartSource,
} from "../enums.js";
import { SessionId, TurnId, ToolUseId, CheckpointId } from "../core/Identifier.js";
import { Entity } from "../core/Entity.js";
import { Context } from "./Context.js";
import { Turn } from "./Turn.js";
import { AgenticLoop } from "./AgenticLoop.js";
import { Session } from "./Session.js";
import { Checkpoint } from "../checkpoints/Checkpoint.js";

// Concrete fixtures — Session and AgenticLoop are abstract.
class TestSession extends Session {
  public override fork(newId: SessionId): Session {
    return new TestSession({
      id: newId,
      cwd: this.cwd,
      model: this.model,
      permissionMode: this.permissionMode,
      effortLevel: this.effortLevel,
      isolation: this.isolation,
      startSource: this.startSource,
      transcriptPath: this.transcriptPath,
      createdAt: this.createdAt,
      name: this.name,
      turns: this.turns,
      checkpoints: this.checkpoints,
      parentSessionId: this.id,
    });
  }
  public override async resume(): Promise<Session> {
    return this;
  }
}

class TestLoop extends AgenticLoop {
  public readonly turn: Turn;
  constructor(turn: Turn) {
    super();
    this.turn = turn;
  }
  public async gatherContext(): Promise<void> { /* no-op */ }
  public async takeAction(): Promise<void> { /* no-op */ }
  public async verifyResults(): Promise<boolean> { return true; }
}

const now = new Date("2026-05-18T00:00:00Z");

// Branded ids — SessionId and TurnId look alike at runtime but are distinct at
// compile time (compile-time-only check — just construct both).
const sessionId = "sess-1" as SessionId;
const turnId = "turn-1" as TurnId;
const toolUseId = "tool-1" as ToolUseId;
const checkpointId = "ck-1" as CheckpointId;

// Context — direct construction.
const context = new Context({
  maxTokens: 200_000,
  usedTokens: 50_000,
  autoCompactThreshold: 0.85,
});
assert.equal(context.maxTokens, 200_000);
assert.equal(context.usedTokens, 50_000);
assert.equal(context.autoCompactThreshold, 0.85);
assert.equal(context.usedPercentage, 0.25, "usedPercentage derives from used/max");

// Empty-context edge case.
const empty = new Context({ maxTokens: 0, usedTokens: 0, autoCompactThreshold: 0 });
assert.equal(empty.usedPercentage, 0, "zero maxTokens does not divide by zero");

// Turn — kind === "turn".
const turn = new Turn({
  id: turnId,
  sessionId,
  userPrompt: "do the thing",
  assistantMessage: "did the thing",
  toolUseIds: [toolUseId],
  startedAt: now,
  endedAt: new Date("2026-05-18T00:00:30Z"),
});
assert.ok(turn instanceof Entity, "Turn is an Entity");
assert.equal(turn.kind, "turn", "Turn.kind === 'turn'");
assert.equal(turn.id, turnId);
assert.equal(turn.sessionId, sessionId);
assert.equal(turn.userPrompt, "do the thing");
assert.equal(turn.assistantMessage, "did the thing");
assert.equal(turn.toolUseIds.length, 1);
assert.equal(turn.toolUseIds[0], toolUseId);

// Turn defaults: toolUseIds defaults to empty array.
const bareTurn = new Turn({
  id: "turn-2" as TurnId,
  sessionId,
  userPrompt: "ping",
  startedAt: now,
});
assert.equal(bareTurn.toolUseIds.length, 0, "toolUseIds defaults to empty array");
assert.equal(bareTurn.endedAt, undefined);
assert.equal(bareTurn.assistantMessage, undefined);

// Session — concrete subclass instantiates with kind === "session".
const checkpoint = new Checkpoint(checkpointId, now, "first-checkpoint");
assert.equal(checkpoint.kind, "checkpoint", "Checkpoint.kind === 'checkpoint'");

const session = new TestSession({
  id: sessionId,
  cwd: "/tmp/proj",
  model: "claude-opus-4-7",
  permissionMode: PermissionMode.Default,
  isolation: IsolationMode.None,
  startSource: SessionStartSource.Startup,
  transcriptPath: "~/.claude/projects/proj/sess-1.jsonl",
  createdAt: now,
  turns: [turn],
  checkpoints: [checkpoint],
});
assert.ok(session instanceof Entity, "Session is an Entity");
assert.equal(session.kind, "session", "Session.kind === 'session'");
assert.equal(session.id, sessionId);
assert.equal(session.cwd, "/tmp/proj");
assert.equal(session.model, "claude-opus-4-7");
assert.equal(session.permissionMode, PermissionMode.Default);
assert.equal(session.isolation, IsolationMode.None);
assert.equal(session.startSource, SessionStartSource.Startup);
assert.equal(session.turns.length, 1);
assert.equal(session.turns[0], turn);
assert.equal(session.checkpoints.length, 1);
assert.equal(session.checkpoints[0], checkpoint);
assert.equal(session.parentSessionId, undefined);

// --fork-session: new SessionId, parent recorded.
const forkId = "sess-2" as SessionId;
const forked = session.fork(forkId);
assert.equal(forked.id, forkId, "fork() produces new id");
assert.equal(forked.parentSessionId, sessionId, "fork() records parent");
assert.equal(forked.kind, "session");

// --resume: returns a session (Promise).
const resumed = await session.resume();
assert.equal(resumed.id, sessionId, "resume() returns same session id");

// AgenticLoop — concrete subclass plugs in a Turn and runs the loop phases.
const loop = new TestLoop(turn);
assert.equal(loop.turn, turn);
await loop.gatherContext();
await loop.takeAction();
const ok = await loop.verifyResults();
assert.equal(ok, true, "verifyResults returns true in fixture");

console.log(
  "OCDM7 sessions.test.ts: ok (Context + Turn + Session + AgenticLoop + Checkpoint)",
);
