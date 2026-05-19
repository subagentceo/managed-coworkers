/**
 * Main Index
 * 
 * Export all modules for the Managed Agents SDK
 */

export { ManagedAgentsClient, type ClientConfig, type AgentConfig, type ToolDefinition, type SessionConfig } from './client';
export { SessionManager, type Message, type SessionState, type SessionEvent } from './sessions';
export { MCPConnector, type MCPServer, type MCPToolConfig, type ToolExecutionResult } from './mcp';
export { AgentOrchestrator, type AgentProfile, type Task, type DecomposedTask } from './orchestrator';
export { WorkflowEngine, type WorkflowNode, type WorkflowEdge, type WorkflowDAG, type WorkflowExecution, type NodeState, type WorkflowCheckpoint, type WorkflowEvent } from './workflow';
export { TodoManager, type TodoItem, type TodoCheckpoint, type TodoTransaction } from './todos';
export { CostTracker, DeterministicClock, ReplayRecorder, type CostEntry, type ReplayEvent, type ExecutionRecord } from './replay';
export { PlatformIntegration, type Department, type CrossTeamWorkflow, type DepartmentMetrics, type SecurityIncident } from './platform';
export { FileManager, type FileMetadata, type FileDownloadRequest, type FileUploadRequest } from './files';
export { VaultManager, type VaultCredential, type VaultConfig, type AuthRequest } from './vaults';
export { EnvironmentManager, type EnvironmentConfig, type ComputeResources, type NetworkConfig, type EnvironmentMetrics } from './environments';
export { OutcomeManager, type Outcome, type OutcomeResult, type CompositeScore } from './outcomes';
export { SkillManager, type Skill, type SkillExecution, type SkillCatalog } from './skills';
export { DreamManager, type Dream, type DreamCheckpoint, type DreamGoal } from './dreams';
export { PermissionManager, type PermissionPolicy, type PolicyConstraint, type AccessRequest, type Permission, type Resource } from './permissions';
export { WebhookManager, type Webhook, type RetryPolicy, type WebhookEvent, type WebhookDelivery, type WebhookEventType } from './webhooks';
export { MemoryManager, type MemoryEntry, type MemoryStore, type MemoryQuery, type MemorySummary } from './memory';

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
