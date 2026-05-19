import { Tool } from "./Tool.js";
import { ToolName, NotebookEditMode } from "../enums.js";

/** NotebookEdit input. tools-reference.md NotebookEdit tool behavior. */
export interface NotebookEditToolInput {
  readonly notebook_path: string;
  readonly cell_id?: string;
  readonly edit_mode?: NotebookEditMode;
  readonly cell_type?: "code" | "markdown";
  readonly new_source?: string;
}

/**
 * Modifies a Jupyter notebook one cell at a time, targeting cells by cell_id.
 *
 * Source: tools-reference.md "NotebookEdit tool behavior". Permission rules use
 * the Edit(...) path format.
 */
export abstract class NotebookEditTool extends Tool<NotebookEditToolInput, unknown> {
  protected constructor() { super({ name: ToolName.NotebookEdit, requiresPermission: true }); }
}
