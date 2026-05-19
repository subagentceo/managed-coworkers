import { Automation } from "./Automation.js";
import { AutomationKind, RoutineTriggerKind, GitHubEventCategory } from "../enums.js";
import { RoutineId } from "../core/Identifier.js";

/** A routine trigger. routines.md "Configure triggers". */
export interface RoutineTrigger {
  readonly kind: RoutineTriggerKind;
  /** Schedule expression for schedule triggers (preset or cron). */
  readonly schedule?: string;
  /** API endpoint URL for api triggers (returned after save). */
  readonly apiUrl?: string;
  /** GitHub event filters for github triggers. */
  readonly githubEvent?: {
    readonly repository: string;
    readonly category: GitHubEventCategory;
    readonly action?: string;
    readonly filters?: Record<string, string>;
  };
}

/**
 * A saved Claude Code configuration that runs on Anthropic-managed cloud infrastructure.
 *
 * Source: routines.md. Combines a prompt, one or more repositories, connectors,
 * and any combination of schedule / API / GitHub triggers. Counts against the
 * daily routine run cap.
 */
export abstract class Routine extends Automation {
  public override readonly id: RoutineId;
  public readonly repositories: ReadonlyArray<string>;
  public readonly environment: string;
  public readonly connectors: ReadonlyArray<string>;
  public readonly triggers: ReadonlyArray<RoutineTrigger>;
  public readonly allowUnrestrictedBranchPushes: boolean;

  protected constructor(args: {
    id: RoutineId;
    name?: string;
    prompt: string;
    enabled: boolean;
    createdAt: Date;
    repositories: ReadonlyArray<string>;
    environment: string;
    connectors?: ReadonlyArray<string>;
    triggers: ReadonlyArray<RoutineTrigger>;
    allowUnrestrictedBranchPushes?: boolean;
  }) {
    super({ ...args, automationKind: AutomationKind.Routine });
    this.id = args.id;
    this.repositories = args.repositories;
    this.environment = args.environment;
    this.connectors = args.connectors ?? [];
    this.triggers = args.triggers;
    this.allowUnrestrictedBranchPushes = args.allowUnrestrictedBranchPushes ?? false;
  }

  public override get kind(): string { return "routine"; }
}
