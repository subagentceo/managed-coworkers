import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Bash tool input. tools-reference.md Bash tool behavior, hooks.md PreToolUse.Bash. */
export interface BashToolInput {
  readonly command: string;
  readonly description?: string;
  /** Per-call timeout in ms. Default 120000, max 600000 (BASH_MAX_TIMEOUT_MS). */
  readonly timeout?: number;
  readonly run_in_background?: boolean;
}

/** Bash tool output. hooks.md PostToolUse Bash response shape. */
export interface BashToolOutput {
  readonly stdout: string;
  readonly stderr: string;
  readonly interrupted: boolean;
  readonly isImage: boolean;
}

/**
 * Executes shell commands in your environment.
 *
 * Source: tools-reference.md "Bash tool behavior". Each command runs in a
 * separate process; environment variables do not persist between calls. Output
 * is capped at BASH_MAX_OUTPUT_LENGTH (default 30000 chars, ceiling 150000).
 */
export abstract class BashTool extends Tool<BashToolInput, BashToolOutput> {
  protected constructor() { super({ name: ToolName.Bash, requiresPermission: true }); }
}
