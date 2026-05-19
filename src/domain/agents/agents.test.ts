/**
 * Agents test (OCDM8).
 *
 * Asserts the canonical Agent/Subagent/AgentTeam model:
 *   - Agent is abstract; concrete subclasses provide a `kind` discriminator.
 *   - Subagent overrides `kind` to "subagent" (per glossary.md "Subagent").
 *   - `isolation` defaults to IsolationMode.None when not provided.
 *   - AgentTeam composes 2+ Agent teammates and reports `kind === "agent_team"`
 *     (per glossary.md "Agent teams").
 *   - Core Agent fields (name/description/systemPrompt/model/effort/maxTurns/tools)
 *     round-trip through the constructor.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 */
import { strict as assert } from "node:assert";
import { AgentId } from "../core/Identifier.js";
import { EffortLevel, IsolationMode, SubagentExecutionMode, ToolName } from "../enums.js";
import { Agent } from "./Agent.js";
import { Subagent } from "./Subagent.js";
import { AgentTeam } from "./AgentTeam.js";

// Concrete fixtures — Agent and Subagent are abstract.

class TestSubagent extends Subagent {
  constructor(args: {
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
    executionMode?: SubagentExecutionMode;
    parentAgentId?: string;
    createdAt: Date;
  }) {
    super(args);
    (this as { executionMode: SubagentExecutionMode }).executionMode =
      args.executionMode ?? SubagentExecutionMode.Foreground;
    if (args.parentAgentId !== undefined) {
      (this as { parentAgentId?: string }).parentAgentId = args.parentAgentId;
    }
  }
}

class TestTeamAgent extends Agent {
  constructor(args: {
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
    super(args);
  }
}

const now = new Date("2026-05-18T00:00:00Z");

// --- Subagent: kind override + isolation default ---
const sub = new TestSubagent({
  id: "agent-1" as AgentId,
  name: "explore",
  description: "Read-only repo explorer subagent.",
  systemPrompt: "You explore the codebase and return findings.",
  model: "claude-opus-4-7",
  effort: EffortLevel.High,
  maxTurns: 20,
  tools: [ToolName.Read, ToolName.Grep],
  createdAt: now,
});
assert.ok(sub instanceof Agent, "Subagent is an Agent");
assert.equal(sub.kind, "subagent", "Subagent overrides kind to 'subagent'");
assert.equal(sub.isolation, IsolationMode.None, "isolation defaults to IsolationMode.None");
assert.equal(sub.name, "explore");
assert.equal(sub.description, "Read-only repo explorer subagent.");
assert.equal(sub.systemPrompt, "You explore the codebase and return findings.");
assert.equal(sub.model, "claude-opus-4-7");
assert.equal(sub.effort, EffortLevel.High);
assert.equal(sub.maxTurns, 20);
assert.deepEqual(sub.tools, [ToolName.Read, ToolName.Grep]);
assert.equal(sub.id, "agent-1");
assert.equal(sub.createdAt.toISOString(), now.toISOString());

// --- Subagent with explicit isolation Worktree ---
const isolated = new TestSubagent({
  id: "agent-2" as AgentId,
  name: "build",
  description: "Builds in a worktree.",
  systemPrompt: "Build.",
  isolation: IsolationMode.Worktree,
  createdAt: now,
});
assert.equal(isolated.isolation, IsolationMode.Worktree, "explicit isolation respected");

// --- AgentTeam with 2 teammates ---
const teammate1 = new TestTeamAgent({
  id: "agent-3" as AgentId,
  name: "lead",
  description: "Team lead.",
  systemPrompt: "Lead.",
  createdAt: now,
});
const teammate2 = new TestTeamAgent({
  id: "agent-4" as AgentId,
  name: "worker",
  description: "Team worker.",
  systemPrompt: "Work.",
  createdAt: now,
});
const team = new AgentTeam({
  id: "team-1",
  teamName: "platform",
  teammates: [teammate1, teammate2],
  leadTeammateName: "lead",
  createdAt: now,
});
assert.equal(team.kind, "agent_team", "AgentTeam reports kind 'agent_team'");
assert.equal(team.teammates.length, 2, "AgentTeam holds 2 teammates");
assert.equal(team.teamName, "platform");
assert.equal(team.leadTeammateName, "lead");
assert.equal(team.id, "team-1");
assert.equal(team.name, "platform", "Entity.name aliases teamName");
assert.equal(team.createdAt.toISOString(), now.toISOString());

console.log("agents.test.ts: all assertions passed");
