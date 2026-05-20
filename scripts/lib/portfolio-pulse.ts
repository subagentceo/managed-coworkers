/**
 * Pure functions for the site-portfolio-pulse skill.
 *
 * Reads a portfolio JSON manifest, validates entries, and emits a
 * structured digest that the skill's markdown renderer can format.
 * Cloudflare Analytics queries (requests, bandwidth, error rates) are
 * injected by Claude at skill-runtime via the cloudflare-codemode MCP;
 * this module handles the data-wrangling and formatting side only.
 *
 * Refs: OPMP6.
 */

export interface PortfolioSite {
  /** Cloudflare zone_id (or any stable opaque site key). */
  id: string;
  hostname: string;
  niche: string;
  targetKeywords: readonly string[];
  owner: string;
  searchConsoleProperty: string | null;
}

export interface AnalyticsSnapshot {
  /** Cloudflare Workers Analytics Engine — total requests in the period. */
  requests?: number;
  /** HTTP 5xx count in the period. */
  errors5xx?: number;
  /** P50 response time in ms. */
  p50ResponseMs?: number;
}

export interface PulseRow {
  hostname: string;
  owner: string;
  niche: string;
  /** First 3 targetKeywords, comma-joined. */
  topKeywords: string;
  /** "✓ linked" when searchConsoleProperty is set, "— none" otherwise. */
  gscStatus: string;
  analytics: AnalyticsSnapshot;
}

export interface PortfolioDigest {
  generatedAt: string;
  siteCount: number;
  rows: readonly PulseRow[];
}

/** Raw JSON shape accepted by parseSitePortfolio — permissive types for the validator. */
interface RawSite {
  id?: unknown;
  hostname?: unknown;
  niche?: unknown;
  target_keywords?: unknown;
  targetKeywords?: unknown;
  owner?: unknown;
  search_console_property?: unknown;
  searchConsoleProperty?: unknown;
}

function fail(msg: string): never {
  throw new Error(msg);
}

/**
 * Parse a portfolio JSON string. Accepts both snake_case (portfolio file)
 * and camelCase (Site.ts constructor args) field names.
 */
export function parseSitePortfolio(json: string): PortfolioSite[] {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    fail("parseSitePortfolio: invalid JSON");
  }

  // Support { "sites": [...] } wrapper or bare array
  const arr = Array.isArray(raw)
    ? raw
    : typeof raw === "object" && raw !== null && Array.isArray((raw as Record<string, unknown>).sites)
      ? (raw as Record<string, unknown>).sites as unknown[]
      : fail("parseSitePortfolio: expected JSON array or { sites: [] }");

  return (arr as RawSite[]).map((entry, i) => {
    if (typeof entry !== "object" || entry === null) {
      fail(`parseSitePortfolio: entry[${i}] is not an object`);
    }
    const id = entry.id;
    const hostname = entry.hostname;
    if (typeof id !== "string" || id.trim() === "") {
      fail(`parseSitePortfolio: entry[${i}].id must be a non-empty string`);
    }
    if (typeof hostname !== "string" || hostname.trim() === "") {
      fail(`parseSitePortfolio: entry[${i}].hostname must be a non-empty string`);
    }
    const keywords =
      (entry.target_keywords as unknown[] | undefined) ??
      (entry.targetKeywords as unknown[] | undefined) ??
      [];
    if (!Array.isArray(keywords)) {
      fail(`parseSitePortfolio: entry[${i}].target_keywords must be an array`);
    }
    return {
      id: id.trim(),
      hostname: hostname.trim(),
      niche: typeof entry.niche === "string" ? entry.niche : "unspecified",
      targetKeywords: keywords.filter((k): k is string => typeof k === "string"),
      owner: typeof entry.owner === "string" ? entry.owner : "unspecified",
      searchConsoleProperty:
        typeof entry.search_console_property === "string"
          ? entry.search_console_property
          : typeof entry.searchConsoleProperty === "string"
            ? entry.searchConsoleProperty
            : null,
    };
  });
}

/**
 * Build digest rows from parsed sites. Analytics data is optional — rows
 * are included even when no analytics snapshot is available (Claude fills
 * it in via MCP at runtime and can call buildDigest a second time).
 */
export function buildDigest(
  sites: readonly PortfolioSite[],
  analytics?: Readonly<Record<string, AnalyticsSnapshot>>,
): PortfolioDigest {
  const rows: PulseRow[] = sites.map((s) => ({
    hostname: s.hostname,
    owner: s.owner,
    niche: s.niche,
    topKeywords: s.targetKeywords.slice(0, 3).join(", ") || "—",
    gscStatus: s.searchConsoleProperty ? "✓ linked" : "— none",
    analytics: analytics?.[s.hostname] ?? {},
  }));

  return {
    generatedAt: new Date().toISOString(),
    siteCount: rows.length,
    rows,
  };
}

/** Render a digest as a Markdown table suitable for operator review. */
export function renderDigestMarkdown(digest: PortfolioDigest): string {
  const header = [
    `# Site Portfolio Pulse — ${digest.siteCount} site${digest.siteCount === 1 ? "" : "s"}`,
    ``,
    `_Generated ${digest.generatedAt}_`,
    ``,
    `| Hostname | Owner | Niche | Top Keywords | GSC | Requests | 5xx | P50 ms |`,
    `|---|---|---|---|---|---|---|---|`,
  ];

  const rows = digest.rows.map((r) => {
    const req = r.analytics.requests !== undefined ? String(r.analytics.requests) : "—";
    const err = r.analytics.errors5xx !== undefined ? String(r.analytics.errors5xx) : "—";
    const p50 = r.analytics.p50ResponseMs !== undefined ? String(r.analytics.p50ResponseMs) : "—";
    return `| ${r.hostname} | ${r.owner} | ${r.niche} | ${r.topKeywords} | ${r.gscStatus} | ${req} | ${err} | ${p50} |`;
  });

  return [...header, ...rows].join("\n");
}
