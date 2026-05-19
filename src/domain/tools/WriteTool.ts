import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Write tool input. tools-reference.md Write tool behavior. */
export interface WriteToolInput {
  readonly file_path: string;
  readonly content: string;
}

export interface WriteToolOutput {
  readonly filePath: string;
  readonly success: boolean;
}

/**
 * Creates a new file or overwrites an existing one with the full content provided.
 *
 * Source: tools-reference.md "Write tool behavior". Overwrites require the file
 * to have been read at least once in the current conversation.
 */
export abstract class WriteTool extends Tool<WriteToolInput, WriteToolOutput> {
  protected constructor() { super({ name: ToolName.Write, requiresPermission: true }); }
}
