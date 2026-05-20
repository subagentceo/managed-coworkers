/**
 * One Cloudflare-hosted site in the operator's 100-site portfolio.
 *
 * Persisted columns documented inline on each readonly field. Matches
 * what `scripts/model-data-domain.ts` (PR #127) would emit from the
 * spec at `packages/knowledge-work-plugins/product-management/site-portfolio.example.json`
 * — authored by hand here so this PR doesn't chain on #127's merge.
 *
 * Refs: OPMP4.
 */

import { Entity } from "../core/Entity.js";

/** Branded identifier for Site. The chassis stores Cloudflare's zone_id verbatim as the id. */
export type SiteId = string & { __brand: "SiteId" };

export class Site extends Entity {
  /** Maps to `hostname`. e.g. "example.com" */
  public readonly hostname: string;

  /** Maps to `niche`. Operator-defined freeform tag used by competitive-brief skill. */
  public readonly niche: string;

  /** Maps to `target_keywords`. Stored as Postgres text[] / JSON array client-side. */
  public readonly targetKeywords: readonly string[];

  /** Maps to `owner`. Operator-defined sub-brand or business unit slug. */
  public readonly owner: string;

  /**
   * Maps to `search_console_property`. Resource name in Google Search
   * Console, e.g. "sc-domain:example.com". Null when no GSC OAuth scope
   * grants access to this property.
   */
  public readonly searchConsoleProperty: string | null;

  constructor(args: {
    id: SiteId;
    hostname: string;
    niche?: string;
    targetKeywords?: readonly string[];
    owner?: string;
    searchConsoleProperty?: string | null;
  }) {
    super(args.id, new Date());
    this.hostname = args.hostname;
    this.niche = args.niche ?? "unspecified";
    this.targetKeywords = args.targetKeywords ?? [];
    this.owner = args.owner ?? "unspecified";
    this.searchConsoleProperty = args.searchConsoleProperty ?? null;
  }

  public get kind(): string {
    return "Site";
  }
}

/** Column names in `sites`, in table-order. Cross-checked against 0002_sites.sql by portfolio.test.ts. */
export const SITE_COLUMNS = [
  "id",
  "hostname",
  "niche",
  "target_keywords",
  "owner",
  "search_console_property",
] as const;
