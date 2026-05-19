import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/**
 * Creates, updates, runs, and lists Routines on claude.ai. Backs the /schedule command.
 *
 * Source: tools-reference.md RemoteTrigger. Routines live on claude.ai and
 * require a Pro, Max, Team, or Enterprise plan.
 */
export abstract class RemoteTriggerTool extends Tool<{ operation: "create" | "update" | "run" | "list" | "delete"; routine_id?: string; spec?: unknown }, unknown> {
  protected constructor() { super({ name: ToolName.RemoteTrigger, requiresPermission: false }); }
}
