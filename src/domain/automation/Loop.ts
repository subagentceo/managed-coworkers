import { Automation } from "./Automation.js";
import { AutomationKind } from "../enums.js";

/**
 * Runs a prompt repeatedly while the session stays open.
 *
 * Source: commands.md /loop (bundled skill, alias /proactive). Omit the interval
 * to let Claude self-pace; omit the prompt to run the autonomous maintenance
 * check or the prompt in .claude/loop.md.
 */
export abstract class Loop extends Automation {
  /** Interval string (e.g., "5m") or undefined to self-pace. */
  public readonly interval?: string;

  protected constructor(args: {
    id: string;
    name?: string;
    prompt: string;
    interval?: string;
    enabled: boolean;
    createdAt: Date;
  }) {
    super({ ...args, automationKind: AutomationKind.Loop });
    this.interval = args.interval;
  }

  public override get kind(): string { return "loop"; }
}
