import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Read tool input. tools-reference.md Read tool behavior. */
export interface ReadToolInput {
  readonly file_path: string;
  readonly offset?: number;
  readonly limit?: number;
}

/**
 * Reads file contents with line numbers. Supports text, images (visual),
 * PDFs (paged), and Jupyter notebooks (all cells with outputs).
 *
 * Source: tools-reference.md "Read tool behavior".
 */
export abstract class ReadTool extends Tool<ReadToolInput, string> {
  protected constructor() { super({ name: ToolName.Read, requiresPermission: false }); }
}
