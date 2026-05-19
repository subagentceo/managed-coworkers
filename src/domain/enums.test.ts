/**
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 * @cite vendor/anthropics/code.claude.com/docs/en/tools-reference.md
 *
 * OCDM1 — enums foundations test.
 *
 * Asserts canonical string values for the load-bearing enums and that
 * ToolName has exactly 38 members (per tools-reference.md tool table).
 */

import {
  PermissionMode,
  ToolName,
  IsolationMode,
} from "./enums.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  if (PermissionMode.Default !== "default") {
    fail(`PermissionMode.Default should be "default", got ${PermissionMode.Default}`);
  }
  if (ToolName.Bash !== "Bash") {
    fail(`ToolName.Bash should be "Bash", got ${ToolName.Bash}`);
  }
  if (IsolationMode.Worktree !== "worktree") {
    fail(`IsolationMode.Worktree should be "worktree", got ${IsolationMode.Worktree}`);
  }

  const toolCount = Object.keys(ToolName).length;
  if (toolCount !== 38) {
    fail(`ToolName should have 38 members, got ${toolCount}`);
  }

  console.log("enums.test.ts: ok");
}

main();
