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
