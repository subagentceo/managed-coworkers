/**
 * Canonical Claude Code domain model — public barrel (OCDM12).
 *
 * Aggregates all primitives imported under OCDM1–OCDM8 into a single
 * import surface for src/index.ts.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 */

// Foundations (OCDM1)
export * from "./enums.js";
export { Entity } from "./core/Entity.js";
export type {
  SessionId,
  TurnId,
  AgentId,
  TaskId,
  ToolUseId,
  CheckpointId,
  RoutineId,
  PluginId,
  WorktreeName,
  PermissionRequestId,
} from "./core/Identifier.js";

// Tools (OCDM2 + OCDM3)
export { Tool } from "./tools/Tool.js";
export { BashTool } from "./tools/BashTool.js";
export { EditTool } from "./tools/EditTool.js";
export { WriteTool } from "./tools/WriteTool.js";
export { ReadTool } from "./tools/ReadTool.js";
export { GlobTool } from "./tools/GlobTool.js";
export { GrepTool } from "./tools/GrepTool.js";
export * from "./tools/WebFetchTool.js";
export * from "./tools/WebSearchTool.js";
export * from "./tools/MonitorTool.js";
export * from "./tools/NotebookEditTool.js";
export * from "./tools/AgentTool.js";
export * from "./tools/SkillTool.js";
export * from "./tools/PowerShellTool.js";
export * from "./tools/LspTool.js";
export * from "./tools/PushNotificationTool.js";
export * from "./tools/AskUserQuestionTool.js";
export * from "./tools/CronTool.js";
export * from "./tools/TaskTools.js";
export * from "./tools/TeamTools.js";
export * from "./tools/RemoteTriggerTool.js";
export * from "./tools/PlanModeTools.js";
export * from "./tools/WorktreeTools.js";
export * from "./tools/McpTools.js";

// Permissions (OCDM4)
export { PermissionRule } from "./permissions/PermissionRule.js";
export { PermissionPolicy } from "./permissions/PermissionPolicy.js";

// Surfaces (OCDM5)
export { Surface } from "./surfaces/Surface.js";
export { CliSurface } from "./surfaces/CliSurface.js";
export { VsCodeSurface } from "./surfaces/VsCodeSurface.js";
export { JetBrainsSurface } from "./surfaces/JetBrainsSurface.js";
export { DesktopSurface } from "./surfaces/DesktopSurface.js";
export { ClaudeAiSurface } from "./surfaces/ClaudeAiSurface.js";

// Automation (OCDM6)
export { Automation } from "./automation/Automation.js";
export { Loop } from "./automation/Loop.js";
export { CronTask } from "./automation/CronTask.js";
export { Routine } from "./automation/Routine.js";

// Sessions (OCDM7)
export { Context } from "./sessions/Context.js";
export { Turn } from "./sessions/Turn.js";
export { AgenticLoop } from "./sessions/AgenticLoop.js";
export { Session } from "./sessions/Session.js";
export { Checkpoint } from "./checkpoints/Checkpoint.js";

// Agents (OCDM8)
export { Agent } from "./agents/Agent.js";
export { Subagent } from "./agents/Subagent.js";
export { AgentTeam } from "./agents/AgentTeam.js";
