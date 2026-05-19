/**
 * Branded string types so the type system can distinguish identifiers that
 * look alike but address different domains.
 *
 * Source: cli-reference.md (--session-id is a UUID), hooks.md (agent_id),
 * channels-reference.md (request_id is five lowercase letters [a-km-z]).
 */
export type SessionId = string & { readonly __brand: "SessionId" };
export type TurnId = string & { readonly __brand: "TurnId" };
export type AgentId = string & { readonly __brand: "AgentId" };
export type TaskId = string & { readonly __brand: "TaskId" };
export type ToolUseId = string & { readonly __brand: "ToolUseId" };
export type CheckpointId = string & { readonly __brand: "CheckpointId" };
export type RoutineId = string & { readonly __brand: "RoutineId" };
export type PluginId = string & { readonly __brand: "PluginId" };
export type WorktreeName = string & { readonly __brand: "WorktreeName" };
export type PermissionRequestId = string & { readonly __brand: "PermissionRequestId" };
