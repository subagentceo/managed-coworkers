/**
 * Pure functions for the content-gap-brief skill.
 *
 * Analyzes GSC (Google Search Console) query data against the site's
 * existing page inventory and produces a prioritized "publish this next"
 * brief. GSC data is injected by Claude at skill runtime via the GSC
 * OAuth connector (activated via the `gsc` Compose profile). This module
 * handles gap detection, opportunity scoring, and brief formatting.
 *
 * Refs: OPMP8.
 */

/** A query row from Google Search Console. */
export interface GscQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;      // 0–1
  position: number; // average ranking position
}

/** An existing page on the site. */
export interface ExistingPage {
  url: string;
  /** URL slug / path component used for keyword matching. */
  slug: string;
  /** Optional page title for richer matching. */
  title?: string;
}

/** A content gap — a query cluster not covered by any existing page. */
export interface ContentGap {
  /** Canonical query that defines this gap. */
  query: string;
  /** Related queries that co-cluster around this gap. */
  relatedQueries: string[];
  impressions: number;
  clicks: number;
  avgPosition: number;
  /** Opportunity score: higher = higher priority to create content. */
  opportunityScore: number;
}

export interface ContentGapBrief {
  hostname: string;
  generatedAt: string;
  gscQueryCount: number;
  existingPageCount: number;
  gaps: readonly ContentGap[];
}

// ---------------------------------------------------------------------------
// Gap detection
// ---------------------------------------------------------------------------

/**
 * A query is "covered" by an existing page if any word in the query
 * (≥ 4 chars) appears in the page's slug or title.
 */
export function isCoveredByPage(query: string, pages: readonly ExistingPage[]): boolean {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length >= 4);
  if (words.length === 0) return true; // single-word short queries are ambiguous — treat as covered
  return pages.some((p) => {
    const haystack = (p.slug + " " + (p.title ?? "")).toLowerCase();
    return words.some((w) => haystack.includes(w));
  });
}

/**
 * Opportunity score for a gap.
 * High impressions + high position (>10) + low CTR → highest priority.
 * The formula: impressions × (position / 10) × (1 - ctr), clamped 0–1000.
 */
export function opportunityScore(q: GscQuery): number {
  const positionFactor = Math.max(0, q.position - 1) / 10;
  const score = q.impressions * positionFactor * (1 - q.ctr);
  return Math.min(1000, Math.round(score));
}

/**
 * Identify content gaps: queries not covered by existing pages, with
 * impressions above the threshold. Returned sorted by opportunityScore desc.
 */
export function detectGaps(
  queries: readonly GscQuery[],
  pages: readonly ExistingPage[],
  options: { minImpressions?: number } = {},
): ContentGap[] {
  const minImpressions = options.minImpressions ?? 10;
  const uncovered = queries.filter(
    (q) => q.impressions >= minImpressions && !isCoveredByPage(q.query, pages),
  );

  const gaps: ContentGap[] = uncovered.map((q) => ({
    query: q.query,
    relatedQueries: [],
    impressions: q.impressions,
    clicks: q.clicks,
    avgPosition: q.position,
    opportunityScore: opportunityScore(q),
  }));

  return gaps.sort((a, b) => b.opportunityScore - a.opportunityScore);
}

export function buildContentGapBrief(
  hostname: string,
  queries: readonly GscQuery[],
  pages: readonly ExistingPage[],
  options: { minImpressions?: number } = {},
): ContentGapBrief {
  return {
    hostname,
    generatedAt: new Date().toISOString(),
    gscQueryCount: queries.length,
    existingPageCount: pages.length,
    gaps: detectGaps(queries, pages, options),
  };
}

// ---------------------------------------------------------------------------
// Markdown rendering
// ---------------------------------------------------------------------------

export function renderContentGapBriefMarkdown(brief: ContentGapBrief): string {
  const lines: string[] = [
    `# Content Gap Brief — ${brief.hostname}`,
    ``,
    `_Generated ${brief.generatedAt} · ${brief.gscQueryCount} GSC queries · ${brief.existingPageCount} existing pages_`,
    ``,
  ];

  if (brief.gaps.length === 0) {
    lines.push(`No content gaps detected above the minimum impressions threshold.`);
    return lines.join("\n");
  }

  lines.push(
    `## Top ${Math.min(10, brief.gaps.length)} Opportunities`,
    ``,
    `| # | Query | Impressions | Avg Position | CTR | Opportunity Score |`,
    `|---|---|---|---|---|---|`,
  );

  const topGaps = [...brief.gaps].slice(0, 10);
  topGaps.forEach((g, i) => {
    const ctr = brief.gscQueryCount > 0
      ? (g.clicks / Math.max(1, g.impressions) * 100).toFixed(1)
      : "—";
    lines.push(
      `| ${i + 1} | ${g.query} | ${g.impressions.toLocaleString()} | ${g.avgPosition.toFixed(1)} | ${ctr}% | ${g.opportunityScore} |`,
    );
  });

  lines.push(``);
  lines.push(`## Recommended Next Posts`);
  lines.push(``);
  topGaps.slice(0, 3).forEach((g, i) => {
    lines.push(
      `### ${i + 1}. "${g.query}"`,
      ``,
      `**Impressions:** ${g.impressions.toLocaleString()} · **Avg position:** ${g.avgPosition.toFixed(1)} · **Opportunity:** ${g.opportunityScore}`,
      ``,
      `**Suggested title:** Write a targeted post for "${g.query}" — currently ranking at position ${g.avgPosition.toFixed(0)} with no dedicated page.`,
      ``,
    );
  });

  if (brief.gaps.length > 10) {
    lines.push(`_… and ${brief.gaps.length - 10} more gaps. Re-run with --top=N to see more._`);
  }

  return lines.join("\n");
}
