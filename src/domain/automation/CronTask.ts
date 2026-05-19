import { Automation } from "./Automation.js";
import { AutomationKind } from "../enums.js";

/**
 * Recurring or one-shot prompt scheduled within the current session.
 *
 * Source: tools-reference.md CronCreate. Tasks are session-scoped and restored
 * on --resume or --continue if unexpired.
 */
export abstract class CronTask extends Automation {
  public readonly schedule: string;

  protected constructor(args: {
    id: string;
    name?: string;
    prompt: string;
    schedule: string;
    enabled: boolean;
    createdAt: Date;
  }) {
    super({ ...args, automationKind: AutomationKind.CronTask });
    this.schedule = args.schedule;
  }

  public override get kind(): string { return "cron_task"; }
}
