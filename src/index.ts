/**
 * Main Index
 * 
 * Export all modules for the Managed Agents SDK
 */

export { ManagedAgentsClient, type ClientConfig, type AgentConfig, type ToolDefinition, type SessionConfig } from './client';
export { MCPConnector, type MCPServer, type MCPToolConfig, type ToolExecutionResult } from './mcp';
export { CostTracker, DeterministicClock, ReplayRecorder, type CostEntry, type ReplayEvent, type ExecutionRecord } from './replay';
export { PlatformIntegration, type Department, type CrossTeamWorkflow, type DepartmentMetrics, type SecurityIncident } from './platform';
export { OutcomeManager, type Outcome, type OutcomeResult, type CompositeScore } from './outcomes';
export { WebhookManager, type Webhook, type RetryPolicy, type WebhookEvent, type WebhookDelivery, type WebhookEventType } from './webhooks';

// Replay-only managed-agents (OREPLAY0 — see
// docs/decisions/2026-05-18-replay-only-managed-agents.md).
export {
  createReplay,
  type ReplayMode,
  type ReplayOptions,
} from './lib/replay-harness.js';
export {
  createMiniflareWorker,
  type MiniflareHarness,
} from './lib/miniflare-harness.js';
export {
  listCookbooksIn,
  loadCookbookFrom,
  type CookbookManifest,
  type SubagentManifest,
  type LoadedCookbook,
} from './lib/cookbook-loader.js';
export {
  createCookbookReplay,
  type CookbookPackage,
  type CookbookReplayOptions,
  type CookbookReplay,
} from './lib/cookbook-replay.js';
// REPLAY-16: undici MockAgent for closing the global-fetch leak.
// Replay-only managed-agents MUST use replayFetch, not global fetch
// (the latter doesn't route through undici's dispatcher on Node 24).
export {
  createFetchReplay,
  replayFetch,
  type FetchReplayHandle,
} from './lib/fetch-replay.js';
// REPLAY-13: scrub Authorization + account-specific identifiers
// before committing any HAR cassette to cassettes/.
export { redactHar, redactHarFile } from './lib/cassette-redact.js';
// Convenience aliases per package — re-export both surface entrypoints
// so downstream callers can pick whichever feels right.
export * as legalAgent from './lib/legal-replay-agent.js';
export * as financeAgent from './lib/finance-replay-agent.js';

// md-quality public surface (OMDQ-EXPORT). Pure scoring lib + deterministic
// file sampler. Used by scripts/grade-vendor.ts and the md-quality MCP lane.
export {
  gradeMarkdown,
  type GradeResult,
  type AxisResult,
  type AxisId,
  type Violation,
} from './lib/md-quality/index.js';
export {
  sampleMarkdownFiles,
  type SampleOptions,
} from './lib/md-quality/sample.js';

// Canonical domain model (OCDM1+)
export * from "./domain/enums.js";
export { Entity } from "./domain/core/Entity.js";
export type {
  SessionId, TurnId, AgentId, TaskId, ToolUseId,
  CheckpointId, RoutineId, PluginId, WorktreeName, PermissionRequestId,
} from "./domain/core/Identifier.js";

// Canonical tools (OCDM2)
export { Tool } from "./domain/tools/Tool.js";
export { BashTool } from "./domain/tools/BashTool.js";
export { EditTool } from "./domain/tools/EditTool.js";
export { WriteTool } from "./domain/tools/WriteTool.js";
export { ReadTool } from "./domain/tools/ReadTool.js";
export { GlobTool } from "./domain/tools/GlobTool.js";
export { GrepTool } from "./domain/tools/GrepTool.js";

// Canonical tools (OCDM3)
export * from './domain/tools/WebFetchTool.js';
export * from './domain/tools/WebSearchTool.js';
export * from './domain/tools/MonitorTool.js';
export * from './domain/tools/NotebookEditTool.js';
export * from './domain/tools/AgentTool.js';
export * from './domain/tools/SkillTool.js';
export * from './domain/tools/PowerShellTool.js';
export * from './domain/tools/LspTool.js';
export * from './domain/tools/PushNotificationTool.js';
export * from './domain/tools/AskUserQuestionTool.js';
export * from './domain/tools/CronTool.js';
export * from './domain/tools/TaskTools.js';
export * from './domain/tools/TeamTools.js';
export * from './domain/tools/RemoteTriggerTool.js';
export * from './domain/tools/PlanModeTools.js';
export * from './domain/tools/WorktreeTools.js';
export * from './domain/tools/McpTools.js';

// Canonical surfaces (OCDM5)
export { Surface } from './domain/surfaces/Surface.js';
export { CliSurface } from './domain/surfaces/CliSurface.js';
export { VsCodeSurface } from './domain/surfaces/VsCodeSurface.js';
export { JetBrainsSurface } from './domain/surfaces/JetBrainsSurface.js';
export { DesktopSurface } from './domain/surfaces/DesktopSurface.js';
export { ClaudeAiSurface } from './domain/surfaces/ClaudeAiSurface.js';

// Canonical permissions (OCDM4)
export { PermissionRule } from "./domain/permissions/PermissionRule.js";
export { PermissionPolicy } from "./domain/permissions/PermissionPolicy.js";

// Canonical automation (OCDM6)
export { Automation } from "./domain/automation/Automation.js";
export { Loop } from "./domain/automation/Loop.js";
export { CronTask } from "./domain/automation/CronTask.js";
export { Routine } from "./domain/automation/Routine.js";

// Canonical sessions (OCDM7)
export { Context } from "./domain/sessions/Context.js";
export { Turn } from "./domain/sessions/Turn.js";
export { AgenticLoop } from "./domain/sessions/AgenticLoop.js";
export { Session } from "./domain/sessions/Session.js";
export { Checkpoint } from "./domain/checkpoints/Checkpoint.js";

// Canonical agents (OCDM8)
export { Agent } from "./domain/agents/Agent.js";
export { Subagent } from "./domain/agents/Subagent.js";
export { AgentTeam } from "./domain/agents/AgentTeam.js";
