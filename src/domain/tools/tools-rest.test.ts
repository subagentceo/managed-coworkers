/**
 * Smoke test for OCDM3 — Remaining 16 canonical tool files.
 *
 * Asserts that every imported Tool subclass instantiates without throwing
 * and exposes a `name` from the ToolName enum.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/tools-reference.md
 */

import assert from "node:assert/strict";
import { ToolName } from "../enums.js";

import { WebFetchTool } from "./WebFetchTool.js";
import { WebSearchTool } from "./WebSearchTool.js";
import { MonitorTool } from "./MonitorTool.js";
import { NotebookEditTool } from "./NotebookEditTool.js";
import { AgentTool } from "./AgentTool.js";
import { SkillTool } from "./SkillTool.js";
import { PowerShellTool } from "./PowerShellTool.js";
import { LspTool } from "./LspTool.js";
import { PushNotificationTool } from "./PushNotificationTool.js";
import { AskUserQuestionTool } from "./AskUserQuestionTool.js";
import { RemoteTriggerTool } from "./RemoteTriggerTool.js";
import { CronCreateTool, CronListTool, CronDeleteTool } from "./CronTool.js";
import {
  TaskCreateTool,
  TaskGetTool,
  TaskListTool,
  TaskUpdateTool,
  TaskStopTool,
} from "./TaskTools.js";
import {
  TeamCreateTool,
  TeamDeleteTool,
  SendMessageTool,
} from "./TeamTools.js";
import { EnterPlanModeTool, ExitPlanModeTool } from "./PlanModeTools.js";
import { EnterWorktreeTool, ExitWorktreeTool } from "./WorktreeTools.js";
import {
  ListMcpResourcesTool,
  ReadMcpResourceTool,
  ToolSearchTool,
} from "./McpTools.js";

// Build minimal concrete subclasses to instantiate each abstract Tool.
function instantiate<T>(Cls: new () => T): T {
  return new (class extends (Cls as any) {
    async execute(_input: any): Promise<any> { return undefined as any; }
  } as any)() as T;
}

interface NamedTool { readonly name: ToolName; }

const cases: Array<{ label: string; Cls: any; expected: ToolName }> = [
  { label: "WebFetchTool", Cls: WebFetchTool, expected: ToolName.WebFetch },
  { label: "WebSearchTool", Cls: WebSearchTool, expected: ToolName.WebSearch },
  { label: "MonitorTool", Cls: MonitorTool, expected: ToolName.Monitor },
  { label: "NotebookEditTool", Cls: NotebookEditTool, expected: ToolName.NotebookEdit },
  { label: "AgentTool", Cls: AgentTool, expected: ToolName.Agent },
  { label: "SkillTool", Cls: SkillTool, expected: ToolName.Skill },
  { label: "PowerShellTool", Cls: PowerShellTool, expected: ToolName.PowerShell },
  { label: "LspTool", Cls: LspTool, expected: ToolName.LSP },
  { label: "PushNotificationTool", Cls: PushNotificationTool, expected: ToolName.PushNotification },
  { label: "AskUserQuestionTool", Cls: AskUserQuestionTool, expected: ToolName.AskUserQuestion },
  { label: "RemoteTriggerTool", Cls: RemoteTriggerTool, expected: ToolName.RemoteTrigger },
  { label: "CronCreateTool", Cls: CronCreateTool, expected: ToolName.CronCreate },
  { label: "CronListTool", Cls: CronListTool, expected: ToolName.CronList },
  { label: "CronDeleteTool", Cls: CronDeleteTool, expected: ToolName.CronDelete },
  { label: "TaskCreateTool", Cls: TaskCreateTool, expected: ToolName.TaskCreate },
  { label: "TaskGetTool", Cls: TaskGetTool, expected: ToolName.TaskGet },
  { label: "TaskListTool", Cls: TaskListTool, expected: ToolName.TaskList },
  { label: "TaskUpdateTool", Cls: TaskUpdateTool, expected: ToolName.TaskUpdate },
  { label: "TaskStopTool", Cls: TaskStopTool, expected: ToolName.TaskStop },
  { label: "TeamCreateTool", Cls: TeamCreateTool, expected: ToolName.TeamCreate },
  { label: "TeamDeleteTool", Cls: TeamDeleteTool, expected: ToolName.TeamDelete },
  { label: "SendMessageTool", Cls: SendMessageTool, expected: ToolName.SendMessage },
  { label: "EnterPlanModeTool", Cls: EnterPlanModeTool, expected: ToolName.EnterPlanMode },
  { label: "ExitPlanModeTool", Cls: ExitPlanModeTool, expected: ToolName.ExitPlanMode },
  { label: "EnterWorktreeTool", Cls: EnterWorktreeTool, expected: ToolName.EnterWorktree },
  { label: "ExitWorktreeTool", Cls: ExitWorktreeTool, expected: ToolName.ExitWorktree },
  { label: "ListMcpResourcesTool", Cls: ListMcpResourcesTool, expected: ToolName.ListMcpResourcesTool },
  { label: "ReadMcpResourceTool", Cls: ReadMcpResourceTool, expected: ToolName.ReadMcpResourceTool },
  { label: "ToolSearchTool", Cls: ToolSearchTool, expected: ToolName.ToolSearch },
];

const enumValues = new Set<string>(Object.values(ToolName));

for (const { label, Cls, expected } of cases) {
  const instance = instantiate<NamedTool>(Cls);
  assert.ok(instance, `${label}: instance is truthy`);
  assert.equal(instance.name, expected, `${label}: name matches ToolName enum`);
  assert.ok(enumValues.has(instance.name), `${label}: name in ToolName enum`);
}

console.log(`OK tools-rest.test.ts — ${cases.length} canonical tool classes verified`);
