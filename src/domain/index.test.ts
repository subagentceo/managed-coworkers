/**
 * Smoke test for the canonical domain barrel (OCDM12).
 *
 * Asserts the barrel re-exports the headline primitives from every
 * OCDM1-OCDM8 subtree.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 */
import { strict as assert } from "node:assert";
import {
  Entity,
  PermissionMode,
  ToolName,
  IsolationMode,
  Tool,
  BashTool,
  PermissionRule,
  PermissionPolicy,
  Surface,
  CliSurface,
  Automation,
  Loop,
  Session,
  Turn,
  Agent,
  Subagent,
  AgentTeam,
  Checkpoint,
} from "./index.js";

assert.ok(Entity, "Entity exported");
assert.equal(PermissionMode.Default, "default", "PermissionMode enum exported");
assert.equal(ToolName.Bash, "Bash", "ToolName enum exported");
assert.equal(IsolationMode.Worktree, "worktree", "IsolationMode enum exported");
assert.ok(Tool, "Tool exported");
assert.ok(BashTool, "BashTool exported");
assert.ok(PermissionRule, "PermissionRule exported");
assert.ok(PermissionPolicy, "PermissionPolicy exported");
assert.ok(Surface, "Surface exported");
assert.ok(CliSurface, "CliSurface exported");
assert.ok(Automation, "Automation exported");
assert.ok(Loop, "Loop exported");
assert.ok(Session, "Session exported");
assert.ok(Turn, "Turn exported");
assert.ok(Agent, "Agent exported");
assert.ok(Subagent, "Subagent exported");
assert.ok(AgentTeam, "AgentTeam exported");
assert.ok(Checkpoint, "Checkpoint exported");
console.log("  ✓ OCDM12 barrel: 18 canonical primitives re-exported");
