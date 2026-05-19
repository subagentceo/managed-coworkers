import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";
import { BashToolInput, BashToolOutput } from "./BashTool.js";

/**
 * Executes PowerShell commands natively.
 *
 * Source: tools-reference.md "PowerShell tool". On Windows without Git Bash the
 * tool is auto-enabled. On Linux, macOS, and WSL it requires pwsh on PATH and
 * is opt-in via CLAUDE_CODE_USE_POWERSHELL_TOOL=1.
 */
export abstract class PowerShellTool extends Tool<BashToolInput, BashToolOutput> {
  protected constructor() { super({ name: ToolName.PowerShell, requiresPermission: true }); }
}
