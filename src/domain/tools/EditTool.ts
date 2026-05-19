import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Edit tool input. tools-reference.md Edit tool behavior. */
export interface EditToolInput {
  readonly file_path: string;
  readonly old_string: string;
  readonly new_string: string;
  readonly replace_all?: boolean;
}

export interface EditToolOutput {
  readonly filePath: string;
  readonly success: boolean;
}

/**
 * Performs exact string replacement on a single file.
 *
 * Source: tools-reference.md "Edit tool behavior". Requires read-before-edit,
 * exact match, and uniqueness of old_string unless replace_all is set.
 */
export abstract class EditTool extends Tool<EditToolInput, EditToolOutput> {
  protected constructor() { super({ name: ToolName.Edit, requiresPermission: true }); }
}
