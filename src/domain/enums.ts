/**
 * Canonical enums for the Claude Code domain model.
 *
 * Sources:
 *   - code.claude.com/docs/en/glossary.md
 *   - code.claude.com/docs/en/tools-reference.md
 *   - code.claude.com/docs/en/hooks.md
 *   - code.claude.com/docs/en/plugins-reference.md
 *   - code.claude.com/docs/en/channels-reference.md
 *   - code.claude.com/docs/en/routines.md
 *   - code.claude.com/docs/en/cli-reference.md
 *   - code.claude.com/docs/en/commands.md
 *   - code.claude.com/docs/en/env-vars.md
 *   - code.claude.com/docs/en/interactive-mode.md
 *   - code.claude.com/docs/en/checkpointing.md
 */

/** Baseline approval behavior for a Session. glossary.md "Permission mode". */
export enum PermissionMode {
  Default = "default",
  AcceptEdits = "acceptEdits",
  Plan = "plan",
  Auto = "auto",
  DontAsk = "dontAsk",
  BypassPermissions = "bypassPermissions",
}

/** Verdict of a PermissionRule or hook PermissionRequest. hooks.md PermissionRequest decision control. */
export enum PermissionVerdict {
  Allow = "allow",
  Deny = "deny",
  Ask = "ask",
  Defer = "defer",
}

/** Canonical built-in Tool names. tools-reference.md tool table. */
export enum ToolName {
  Agent = "Agent",
  AskUserQuestion = "AskUserQuestion",
  Bash = "Bash",
  CronCreate = "CronCreate",
  CronDelete = "CronDelete",
  CronList = "CronList",
  Edit = "Edit",
  EnterPlanMode = "EnterPlanMode",
  EnterWorktree = "EnterWorktree",
  ExitPlanMode = "ExitPlanMode",
  ExitWorktree = "ExitWorktree",
  Glob = "Glob",
  Grep = "Grep",
  ListMcpResourcesTool = "ListMcpResourcesTool",
  LSP = "LSP",
  Monitor = "Monitor",
  NotebookEdit = "NotebookEdit",
  PowerShell = "PowerShell",
  PushNotification = "PushNotification",
  Read = "Read",
  ReadMcpResourceTool = "ReadMcpResourceTool",
  RemoteTrigger = "RemoteTrigger",
  SendMessage = "SendMessage",
  ShareOnboardingGuide = "ShareOnboardingGuide",
  Skill = "Skill",
  TaskCreate = "TaskCreate",
  TaskGet = "TaskGet",
  TaskList = "TaskList",
  TaskOutput = "TaskOutput",
  TaskStop = "TaskStop",
  TaskUpdate = "TaskUpdate",
  TeamCreate = "TeamCreate",
  TeamDelete = "TeamDelete",
  TodoWrite = "TodoWrite",
  ToolSearch = "ToolSearch",
  WebFetch = "WebFetch",
  WebSearch = "WebSearch",
  Write = "Write",
}

/** Adaptive-reasoning effort level. glossary.md "Effort level". */
export enum EffortLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
  XHigh = "xhigh",
  Max = "max",
}

/** Place a user accesses Claude Code. glossary.md "Surface". */
export enum SurfaceKind {
  Cli = "cli",
  VsCode = "vscode",
  JetBrains = "jetbrains",
  Desktop = "desktop",
  ClaudeAi = "claude.ai",
}

/** Subagent / session isolation mode. glossary.md "Worktree isolation". */
export enum IsolationMode {
  None = "none",
  Worktree = "worktree",
}

/** Hook lifecycle event names. hooks.md "Hook lifecycle". */
export enum HookEventName {
  SessionStart = "SessionStart",
  Setup = "Setup",
  UserPromptSubmit = "UserPromptSubmit",
  UserPromptExpansion = "UserPromptExpansion",
  PreToolUse = "PreToolUse",
  PermissionRequest = "PermissionRequest",
  PermissionDenied = "PermissionDenied",
  PostToolUse = "PostToolUse",
  PostToolUseFailure = "PostToolUseFailure",
  PostToolBatch = "PostToolBatch",
  Notification = "Notification",
  SubagentStart = "SubagentStart",
  SubagentStop = "SubagentStop",
  TaskCreated = "TaskCreated",
  TaskCompleted = "TaskCompleted",
  Stop = "Stop",
  StopFailure = "StopFailure",
  TeammateIdle = "TeammateIdle",
  InstructionsLoaded = "InstructionsLoaded",
  ConfigChange = "ConfigChange",
  CwdChanged = "CwdChanged",
  FileChanged = "FileChanged",
  WorktreeCreate = "WorktreeCreate",
  WorktreeRemove = "WorktreeRemove",
  PreCompact = "PreCompact",
  PostCompact = "PostCompact",
  Elicitation = "Elicitation",
  ElicitationResult = "ElicitationResult",
  SessionEnd = "SessionEnd",
}

/** Hook handler implementation type. hooks.md "Hook handler fields". */
export enum HookHandlerType {
  Command = "command",
  Http = "http",
  McpTool = "mcp_tool",
  Prompt = "prompt",
  Agent = "agent",
}

/** Discriminator for Automation subclasses. commands.md /loop, /schedule, routines.md. */
export enum AutomationKind {
  Loop = "loop",
  CronTask = "cron",
  Routine = "routine",
}

/** Routine trigger type. routines.md "Configure triggers". */
export enum RoutineTriggerKind {
  Schedule = "schedule",
  Api = "api",
  GitHub = "github",
}

/** GitHub event categories for Routine triggers. routines.md "Supported events". */
export enum GitHubEventCategory {
  PullRequest = "pull_request",
  Release = "release",
}

/** NotebookEdit edit mode. tools-reference.md NotebookEdit. */
export enum NotebookEditMode {
  Replace = "replace",
  Insert = "insert",
  Delete = "delete",
}

/** Grep output mode. tools-reference.md Grep tool behavior. */
export enum GrepOutputMode {
  FilesWithMatches = "files_with_matches",
  Content = "content",
  Count = "count",
}

/** Plugin installation scope. plugins-reference.md "Plugin installation scopes". */
export enum PluginScope {
  User = "user",
  Project = "project",
  Local = "local",
  Managed = "managed",
}

/** Channel transport flavor. channels-reference.md (one-way vs two-way). */
export enum ChannelTransport {
  OneWay = "one_way",
  TwoWay = "two_way",
}

/** Subagent execution mode. sub-agents docs via glossary.md "Subagent". */
export enum SubagentExecutionMode {
  Foreground = "foreground",
  Background = "background",
}

/** Memory artifact kind. glossary.md "CLAUDE.md", "Auto memory", "Rules". */
export enum MemoryKind {
  ClaudeMd = "claude_md",
  AutoMemory = "auto_memory",
  Rule = "rule",
}

/** Settings layer precedence. glossary.md "Settings layers". */
export enum SettingsLayer {
  Managed = "managed",
  CommandLine = "cli_args",
  Local = "local",
  Project = "project",
  User = "user",
}

/** Session start source. hooks.md SessionStart matcher. */
export enum SessionStartSource {
  Startup = "startup",
  Resume = "resume",
  Clear = "clear",
  Compact = "compact",
}

/** Session end reason. hooks.md SessionEnd reason. */
export enum SessionEndReason {
  Clear = "clear",
  Resume = "resume",
  Logout = "logout",
  PromptInputExit = "prompt_input_exit",
  BypassPermissionsDisabled = "bypass_permissions_disabled",
  Other = "other",
}
