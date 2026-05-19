import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Glob tool input. tools-reference.md Glob tool behavior. */
export interface GlobToolInput {
  readonly pattern: string;
  readonly path?: string;
}

/**
 * Finds files by name pattern. Results sorted by mtime, capped at 100.
 *
 * Source: tools-reference.md "Glob tool behavior". Does not respect .gitignore
 * by default; toggle with CLAUDE_CODE_GLOB_NO_IGNORE.
 */
export abstract class GlobTool extends Tool<GlobToolInput, ReadonlyArray<string>> {
  protected constructor() { super({ name: ToolName.Glob, requiresPermission: false }); }
}
