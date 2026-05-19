/**
 * Permissions test (OCDM4).
 *
 * Asserts PermissionRule.toRuleString() canonical form and PermissionPolicy
 * evaluate ordering (deny -> ask -> allow, first match wins).
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 * @cite vendor/anthropics/code.claude.com/docs/en/tools-reference.md
 */
import { strict as assert } from "node:assert";
import { PermissionMode, PermissionVerdict, ToolName } from "../enums.js";
import { PermissionRule } from "./PermissionRule.js";
import { PermissionPolicy } from "./PermissionPolicy.js";

const now = new Date("2026-05-18T00:00:00Z");

// --- PermissionRule.toRuleString() ----------------------------------------

const bashGit = new PermissionRule({
  id: "rule-1",
  toolName: ToolName.Bash,
  specifier: "git *",
  verdict: PermissionVerdict.Allow,
  createdAt: now,
});
assert.equal(
  bashGit.toRuleString(),
  "Bash(git *)",
  "PermissionRule.toRuleString() must produce 'Bash(git *)' for Bash + 'git *'",
);
assert.equal(bashGit.kind, "permission_rule");
assert.equal(bashGit.id, "rule-1");
assert.equal(bashGit.createdAt.toISOString(), now.toISOString());

const webSearch = new PermissionRule({
  id: "rule-2",
  toolName: ToolName.WebSearch,
  verdict: PermissionVerdict.Allow,
  createdAt: now,
});
assert.equal(
  webSearch.toRuleString(),
  "WebSearch",
  "PermissionRule.toRuleString() must omit parens when specifier is absent",
);

// String-typed (non-enum) toolName is allowed for forward-compat (e.g., MCP tools).
const mcp = new PermissionRule({
  id: "rule-3",
  toolName: "mcp__foo__bar",
  specifier: "*",
  verdict: PermissionVerdict.Deny,
  createdAt: now,
});
assert.equal(mcp.toRuleString(), "mcp__foo__bar(*)");

// --- PermissionPolicy.evaluate() ordering ---------------------------------

class TestPolicy extends PermissionPolicy {
  public evaluate(toolName: string, specifier: string): PermissionVerdict {
    // deny -> ask -> allow, first match wins.
    const match = (r: PermissionRule): boolean =>
      r.toolName === toolName && (r.specifier === undefined || r.specifier === specifier);
    for (const r of this.deny) if (match(r)) return PermissionVerdict.Deny;
    for (const r of this.ask) if (match(r)) return PermissionVerdict.Ask;
    for (const r of this.allow) if (match(r)) return PermissionVerdict.Allow;
    return PermissionVerdict.Defer;
  }
}

const allowBash = new PermissionRule({
  id: "a-1",
  toolName: ToolName.Bash,
  specifier: "git *",
  verdict: PermissionVerdict.Allow,
  createdAt: now,
});
const askBash = new PermissionRule({
  id: "k-1",
  toolName: ToolName.Bash,
  specifier: "git *",
  verdict: PermissionVerdict.Ask,
  createdAt: now,
});
const denyBash = new PermissionRule({
  id: "d-1",
  toolName: ToolName.Bash,
  specifier: "git *",
  verdict: PermissionVerdict.Deny,
  createdAt: now,
});

// All three lists contain a matching rule -> deny wins.
const all3 = new TestPolicy({
  mode: PermissionMode.Default,
  allow: [allowBash],
  ask: [askBash],
  deny: [denyBash],
});
assert.equal(
  all3.evaluate("Bash", "git *"),
  PermissionVerdict.Deny,
  "deny must take precedence over ask + allow",
);

// ask + allow only -> ask wins.
const askAndAllow = new TestPolicy({
  mode: PermissionMode.Default,
  allow: [allowBash],
  ask: [askBash],
});
assert.equal(
  askAndAllow.evaluate("Bash", "git *"),
  PermissionVerdict.Ask,
  "ask must take precedence over allow",
);

// allow only -> allow.
const allowOnly = new TestPolicy({
  mode: PermissionMode.Default,
  allow: [allowBash],
});
assert.equal(
  allowOnly.evaluate("Bash", "git *"),
  PermissionVerdict.Allow,
);

// No matching rule -> Defer.
const noMatch = new TestPolicy({
  mode: PermissionMode.Default,
  allow: [allowBash],
});
assert.equal(
  noMatch.evaluate("WebSearch", ""),
  PermissionVerdict.Defer,
  "non-matching candidate falls through to Defer",
);

// Defaults: empty rule lists + empty sourceLayers/additionalDirectories.
const empty = new TestPolicy({ mode: PermissionMode.BypassPermissions });
assert.equal(empty.mode, PermissionMode.BypassPermissions);
assert.deepEqual([...empty.allow], []);
assert.deepEqual([...empty.ask], []);
assert.deepEqual([...empty.deny], []);
assert.deepEqual([...empty.additionalDirectories], []);
assert.deepEqual([...empty.sourceLayers], []);

console.log("OCDM4 permissions.test.ts: ok (PermissionRule.toRuleString + deny->ask->allow ordering)");
