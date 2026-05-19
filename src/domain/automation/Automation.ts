import { Entity } from "../core/Entity.js";
import { AutomationKind } from "../enums.js";

/**
 * Abstract base for anything that runs Claude Code without a human at the keyboard.
 *
 * Source: commands.md /loop, /schedule; routines.md. Concrete subclasses are:
 *   - Loop          (in-session repeat, commands.md /loop, scheduled-tasks)
 *   - CronTask      (CronCreate tool, session-scoped)
 *   - Routine       (cloud-hosted, routines.md)
 */
export abstract class Automation extends Entity {
  public readonly automationKind: AutomationKind;
  public readonly prompt: string;
  public readonly enabled: boolean;

  protected constructor(args: {
    id: string;
    name?: string;
    automationKind: AutomationKind;
    prompt: string;
    enabled: boolean;
    createdAt: Date;
  }) {
    super(args.id, args.createdAt, args.name);
    this.automationKind = args.automationKind;
    this.prompt = args.prompt;
    this.enabled = args.enabled;
  }

  public get kind(): string { return "automation"; }
  public abstract run(): Promise<void>;
}
