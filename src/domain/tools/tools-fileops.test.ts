/**
 * Asserts the 6 canonical file-ops Tool subclasses each carry the correct
 * ToolName enum value on `name`. Single batched test.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/tools-reference.md
 */

import { strict as assert } from "node:assert";
import { ToolName } from "./../enums.js";
import { BashTool } from "./BashTool.js";
import { EditTool } from "./EditTool.js";
import { WriteTool } from "./WriteTool.js";
import { ReadTool } from "./ReadTool.js";
import { GlobTool } from "./GlobTool.js";
import { GrepTool } from "./GrepTool.js";

// Concrete test subclasses — the canonical Tool classes are abstract so that
// real runtimes can plug in their own execute() implementations.
class TestBash extends BashTool {
  constructor() { super(); }
  public async execute(): Promise<{ stdout: string; stderr: string; interrupted: boolean; isImage: boolean }> {
    return { stdout: "", stderr: "", interrupted: false, isImage: false };
  }
}
class TestEdit extends EditTool {
  constructor() { super(); }
  public async execute(): Promise<{ filePath: string; success: boolean }> {
    return { filePath: "", success: true };
  }
}
class TestWrite extends WriteTool {
  constructor() { super(); }
  public async execute(): Promise<{ filePath: string; success: boolean }> {
    return { filePath: "", success: true };
  }
}
class TestRead extends ReadTool {
  constructor() { super(); }
  public async execute(): Promise<string> { return ""; }
}
class TestGlob extends GlobTool {
  constructor() { super(); }
  public async execute(): Promise<ReadonlyArray<string>> { return []; }
}
class TestGrep extends GrepTool {
  constructor() { super(); }
  public async execute(): Promise<string> { return ""; }
}

const cases: ReadonlyArray<readonly [string, () => { name: ToolName }, ToolName]> = [
  ["BashTool", () => new TestBash(), ToolName.Bash],
  ["EditTool", () => new TestEdit(), ToolName.Edit],
  ["WriteTool", () => new TestWrite(), ToolName.Write],
  ["ReadTool", () => new TestRead(), ToolName.Read],
  ["GlobTool", () => new TestGlob(), ToolName.Glob],
  ["GrepTool", () => new TestGrep(), ToolName.Grep],
];

for (const [label, make, expected] of cases) {
  const instance = make();
  assert.equal(instance.name, expected, `${label}.name must equal ToolName.${expected}`);
}

console.log(`ok tools-fileops: ${cases.length} file-ops Tool subclasses carry canonical ToolName values`);
