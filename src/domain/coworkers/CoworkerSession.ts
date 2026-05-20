/**
 * CoworkerSession — one run of a managed coworker (product-management,
 * data-engineering, future verticals).
 *
 * Outcome: ODEP2.
 * Persisted at: infra/alloydb/migrations/0001_init.sql (table coworker_sessions).
 * Mirrored at: Redis key `coworker:<vertical>:session:<id>` per docs/data/redis-keys.md.
 *
 * Sources:
 *   - packages/knowledge-work-plugins/data-engineering/coworker-context.md
 *   - packages/knowledge-work-plugins/product-management/coworker-context.md
 *   - docs/CONVENTIONS.md (outcome ID format)
 */

import { Entity } from "../core/Entity.js";

/**
 * Which knowledge-work-plugin vertical this session is running.
 *
 * Mirrors the CHECK constraint on `coworker_sessions.coworker` in
 * `infra/alloydb/migrations/0001_init.sql`. New verticals require BOTH
 * a new enum member here AND an ALTER TABLE migration (a future commit
 * will introduce that — for v0.1 the migration's CHECK is the source of
 * truth and this enum follows it).
 */
export enum CoworkerName {
  ProductManagement = "product-management",
  DataEngineering = "data-engineering",
}

/**
 * Lifecycle state of a CoworkerSession. Mirrors the CHECK constraint on
 * `coworker_sessions.status` in 0001_init.sql.
 */
export enum CoworkerSessionStatus {
  Running = "running",
  Idle = "idle",
  Failed = "failed",
}

/**
 * Ticket reference for the 1-ticket-1-PR discipline. Validated by
 * `TICKET_REF_PATTERN` below; the SQL column is plain TEXT because new
 * ticket-system prefixes (e.g. `linear-` if the Linear plugin is added)
 * will land before this validator changes.
 */
const TICKET_REF_PATTERN =
  /^(gh-[a-z0-9._-]+\/[a-z0-9._-]+#\d+|jira-[A-Z]+-\d+)$/;

export function isTicketRef(value: string): boolean {
  return TICKET_REF_PATTERN.test(value);
}

/**
 * One run of a managed coworker. Persisted; the Redis mirror is a hot
 * cache, the AlloyDB row is the source of truth.
 */
export class CoworkerSession extends Entity {
  /** Which vertical. Maps to `coworker_sessions.coworker`. */
  public readonly coworker: CoworkerName;

  /** Outcome ID this session works toward (e.g. "ODEP2"). Maps to `outcome_id`. */
  public readonly outcomeId: string;

  /** Ticket reference; null if exploratory. Maps to `ticket_ref`. */
  public readonly ticketRef: string | null;

  /** Lifecycle status. Maps to `status`. */
  public readonly status: CoworkerSessionStatus;

  /** Maps to `started_at`. Entity.createdAt is reused. */
  public readonly startedAt: Date;

  /** Maps to `finished_at`. Null while running. */
  public readonly finishedAt: Date | null;

  constructor(args: {
    id: string;
    coworker: CoworkerName;
    outcomeId: string;
    ticketRef?: string | null;
    status?: CoworkerSessionStatus;
    startedAt?: Date;
    finishedAt?: Date | null;
  }) {
    const startedAt = args.startedAt ?? new Date();
    super(args.id, startedAt);
    this.coworker = args.coworker;
    this.outcomeId = args.outcomeId;
    this.ticketRef = args.ticketRef ?? null;
    this.status = args.status ?? CoworkerSessionStatus.Running;
    this.startedAt = startedAt;
    this.finishedAt = args.finishedAt ?? null;
  }

  public get kind(): string {
    return "CoworkerSession";
  }

  /** Redis key for this session's hot mirror. */
  public get redisKey(): string {
    return `coworker:${this.coworker}:session:${this.id}`;
  }
}

/**
 * Column names in `coworker_sessions`, in table-order. Used by the
 * round-trip test to assert the TypeScript model matches the SQL schema.
 */
export const COWORKER_SESSIONS_COLUMNS = [
  "id",
  "coworker",
  "outcome_id",
  "ticket_ref",
  "status",
  "started_at",
  "finished_at",
] as const;
