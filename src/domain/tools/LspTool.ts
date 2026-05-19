import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/**
 * Code intelligence via language servers: jump to definitions, find references,
 * report type errors and warnings.
 *
 * Source: tools-reference.md "LSP tool behavior". Inactive until a code
 * intelligence plugin for the language is installed.
 */
export abstract class LspTool extends Tool<{ operation: string; uri?: string; position?: { line: number; character: number } }, unknown> {
  protected constructor() { super({ name: ToolName.LSP, requiresPermission: false }); }
}
