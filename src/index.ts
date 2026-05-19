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
// Convenience aliases per package — re-export both surface entrypoints
// so downstream callers can pick whichever feels right.
export * as legalAgent from './lib/legal-replay-agent.js';
export * as financeAgent from './lib/finance-replay-agent.js';
