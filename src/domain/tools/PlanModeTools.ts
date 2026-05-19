import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** Source: tools-reference.md EnterPlanMode / ExitPlanMode. */
export abstract class EnterPlanModeTool extends Tool<void, void> {
  protected constructor() { super({ name: ToolName.EnterPlanMode, requiresPermission: false }); }
}

/** ExitPlanMode presents a plan for approval and exits plan mode. tools-reference.md ExitPlanMode. */
export abstract class ExitPlanModeTool extends Tool<{ plan?: string; planFilePath?: string; allowedPrompts?: ReadonlyArray<{ tool: string; prompt: string }> }, { plan: string; filePath: string }> {
  protected constructor() { super({ name: ToolName.ExitPlanMode, requiresPermission: true }); }
}
