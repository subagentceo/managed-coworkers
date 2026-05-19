/**
 * Main Index
 * 
 * Export all modules for the Managed Agents SDK
 */

export { ManagedAgentsClient, type ClientConfig, type AgentConfig, type ToolDefinition, type SessionConfig } from './client';
export { MCPConnector, type MCPServer, type MCPToolConfig, type ToolExecutionResult } from './mcp';
export { CostTracker, DeterministicClock, ReplayRecorder, type CostEntry, type ReplayEvent, type ExecutionRecord } from './replay';

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

// Canonical domain model (OCDM1-OCDM12)
export * from "./domain/index.js";
