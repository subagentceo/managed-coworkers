import { Tool } from "./Tool.js";
import { ToolName } from "../enums.js";

/** CronCreate input. tools-reference.md CronCreate, commands.md /loop. */
export interface CronCreateInput {
  readonly prompt: string;
  /** Cron expression or natural-language schedule. */
  readonly schedule: string;
  readonly description?: string;
}

/**
 * Schedules a recurring or one-shot prompt within the current session.
 * Session-scoped; restored on --resume or --continue if unexpired.
 *
 * Source: tools-reference.md CronCreate (also CronDelete, CronList).
 */
export abstract class CronCreateTool extends Tool<CronCreateInput, { id: string }> {
  protected constructor() { super({ name: ToolName.CronCreate, requiresPermission: false }); }
}

export abstract class CronListTool extends Tool<void, ReadonlyArray<{ id: string; schedule: string; prompt: string }>> {
  protected constructor() { super({ name: ToolName.CronList, requiresPermission: false }); }
}

export abstract class CronDeleteTool extends Tool<{ id: string }, void> {
  protected constructor() { super({ name: ToolName.CronDelete, requiresPermission: false }); }
}
