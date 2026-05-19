import { Tool } from "./Tool.js";
import { ToolName, GrepOutputMode } from "../enums.js";

/** Grep tool input. tools-reference.md Grep tool behavior. */
export interface GrepToolInput {
  readonly pattern: string;
  readonly path?: string;
  readonly glob?: string;
  readonly type?: string;
  readonly output_mode?: GrepOutputMode;
  readonly "-i"?: boolean;
  readonly multiline?: boolean;
}

/**
 * Searches file contents using ripgrep regex syntax.
 *
 * Source: tools-reference.md "Grep tool behavior". Respects .gitignore.
 */
export abstract class GrepTool extends Tool<GrepToolInput, string> {
  protected constructor() { super({ name: ToolName.Grep, requiresPermission: false }); }
}
