/**
 * Pure functions for the seo-audit skill.
 *
 * Checks a site's technical SEO health: sitemap presence, robots.txt
 * correctness, and basic Core Web Vitals proxies. Actual HTTP requests
 * and CWV measurements are injected by Claude at skill runtime via the
 * cloudflare-codemode MCP (Browser Rendering API) and nimble crawler.
 * This module handles data validation, scoring, and report formatting.
 *
 * Refs: OPMP7.
 */

export type SeverityLevel = "ok" | "warn" | "error";

export interface AuditCheck {
  id: string;
  label: string;
  severity: SeverityLevel;
  detail: string;
}

export interface SiteAuditResult {
  hostname: string;
  auditedAt: string;
  score: number;      // 0–100; 100 = all checks pass
  checks: AuditCheck[];
}

export interface AuditReport {
  generatedAt: string;
  siteCount: number;
  needsIntervention: readonly SiteAuditResult[];   // score < 80
  healthy: readonly SiteAuditResult[];              // score >= 80
}

// ---------------------------------------------------------------------------
// Robots.txt analysis
// ---------------------------------------------------------------------------

export interface RobotsAnalysis {
  hasSitemapDirective: boolean;
  disallowsAll: boolean;
  disallowsCrawlers: readonly string[];
}

export function analyzeRobotsTxt(content: string): RobotsAnalysis {
  const lines = content.split(/\r?\n/).map((l) => l.trim().toLowerCase());
  const hasSitemapDirective = lines.some((l) => l.startsWith("sitemap:"));
  const disallowsAll = lines.some((l) => l === "disallow: /");
  const disallowedAgents: string[] = [];
  let currentAgent = "*";
  for (const line of content.split(/\r?\n/).map((l) => l.trim())) {
    if (line.toLowerCase().startsWith("user-agent:")) {
      currentAgent = line.slice("user-agent:".length).trim();
    } else if (line.toLowerCase().startsWith("disallow:") && line.slice("disallow:".length).trim() === "/") {
      if (currentAgent !== "*") disallowedAgents.push(currentAgent);
    }
  }
  return { hasSitemapDirective, disallowsAll, disallowsCrawlers: disallowedAgents };
}

// ---------------------------------------------------------------------------
// Sitemap analysis
// ---------------------------------------------------------------------------

export interface SitemapAnalysis {
  found: boolean;
  urlCount: number;
  hasLastmod: boolean;
  hasPriority: boolean;
}

export function analyzeSitemap(xmlContent: string): SitemapAnalysis {
  if (!xmlContent.trim()) return { found: false, urlCount: 0, hasLastmod: false, hasPriority: false };
  const urlCount = (xmlContent.match(/<url>/gi) ?? []).length;
  const hasLastmod = /<lastmod>/i.test(xmlContent);
  const hasPriority = /<priority>/i.test(xmlContent);
  return { found: urlCount > 0, urlCount, hasLastmod, hasPriority };
}

// ---------------------------------------------------------------------------
// Audit checks builder
// ---------------------------------------------------------------------------

export interface AuditInput {
  hostname: string;
  robotsTxt: string | null;           // null = not fetched / 404
  sitemapXml: string | null;          // null = not fetched / 404
  /** CWV data from Cloudflare Browser Rendering or CrUX API (optional). */
  cwv?: {
    lcp_ms?: number;
    fid_ms?: number;
    cls?: number;
  };
}

export function buildAuditChecks(input: AuditInput): AuditCheck[] {
  const checks: AuditCheck[] = [];

  // --- robots.txt ---
  if (input.robotsTxt === null) {
    checks.push({ id: "robots-missing", label: "robots.txt", severity: "warn", detail: "robots.txt not found (404 or fetch failed)" });
  } else {
    checks.push({ id: "robots-present", label: "robots.txt", severity: "ok", detail: "robots.txt present" });
    const r = analyzeRobotsTxt(input.robotsTxt);
    if (r.disallowsAll) {
      checks.push({ id: "robots-disallow-all", label: "Disallow: /", severity: "error", detail: "robots.txt blocks all crawlers with Disallow: /" });
    }
    if (!r.hasSitemapDirective) {
      checks.push({ id: "robots-no-sitemap", label: "Sitemap in robots.txt", severity: "warn", detail: "No Sitemap: directive in robots.txt — crawlers may miss the sitemap" });
    }
  }

  // --- sitemap ---
  if (input.sitemapXml === null) {
    checks.push({ id: "sitemap-missing", label: "sitemap.xml", severity: "error", detail: "sitemap.xml not found — reduces crawl coverage" });
  } else {
    const s = analyzeSitemap(input.sitemapXml);
    if (!s.found) {
      checks.push({ id: "sitemap-empty", label: "sitemap.xml", severity: "error", detail: "sitemap.xml parsed but contains 0 <url> entries" });
    } else {
      checks.push({ id: "sitemap-ok", label: "sitemap.xml", severity: "ok", detail: `sitemap.xml present — ${s.urlCount} URL(s)` });
      if (!s.hasLastmod) {
        checks.push({ id: "sitemap-no-lastmod", label: "Lastmod", severity: "warn", detail: "sitemap.xml has no <lastmod> — reduces freshness signals" });
      }
    }
  }

  // --- CWV (Core Web Vitals) ---
  if (input.cwv) {
    if (input.cwv.lcp_ms !== undefined) {
      if (input.cwv.lcp_ms <= 2500) {
        checks.push({ id: "cwv-lcp-good", label: "LCP", severity: "ok", detail: `LCP ${input.cwv.lcp_ms}ms ≤ 2500ms (good)` });
      } else if (input.cwv.lcp_ms <= 4000) {
        checks.push({ id: "cwv-lcp-needs-improvement", label: "LCP", severity: "warn", detail: `LCP ${input.cwv.lcp_ms}ms (needs improvement; target ≤ 2500ms)` });
      } else {
        checks.push({ id: "cwv-lcp-poor", label: "LCP", severity: "error", detail: `LCP ${input.cwv.lcp_ms}ms > 4000ms (poor; target ≤ 2500ms)` });
      }
    }
    if (input.cwv.cls !== undefined) {
      if (input.cwv.cls <= 0.1) {
        checks.push({ id: "cwv-cls-good", label: "CLS", severity: "ok", detail: `CLS ${input.cwv.cls.toFixed(3)} ≤ 0.1 (good)` });
      } else if (input.cwv.cls <= 0.25) {
        checks.push({ id: "cwv-cls-needs-improvement", label: "CLS", severity: "warn", detail: `CLS ${input.cwv.cls.toFixed(3)} (needs improvement; target ≤ 0.1)` });
      } else {
        checks.push({ id: "cwv-cls-poor", label: "CLS", severity: "error", detail: `CLS ${input.cwv.cls.toFixed(3)} > 0.25 (poor)` });
      }
    }
  }

  return checks;
}

/** Score a set of checks: 100 - 20*errors - 5*warns, clamped to [0, 100]. */
export function scoreChecks(checks: readonly AuditCheck[]): number {
  const errors = checks.filter((c) => c.severity === "error").length;
  const warns = checks.filter((c) => c.severity === "warn").length;
  return Math.max(0, Math.min(100, 100 - errors * 20 - warns * 5));
}

export function buildSiteAuditResult(input: AuditInput): SiteAuditResult {
  const checks = buildAuditChecks(input);
  return {
    hostname: input.hostname,
    auditedAt: new Date().toISOString(),
    score: scoreChecks(checks),
    checks,
  };
}

export function buildAuditReport(results: readonly SiteAuditResult[]): AuditReport {
  return {
    generatedAt: new Date().toISOString(),
    siteCount: results.length,
    needsIntervention: results.filter((r) => r.score < 80),
    healthy: results.filter((r) => r.score >= 80),
  };
}

export function renderAuditReportMarkdown(report: AuditReport): string {
  const lines: string[] = [
    `# SEO Audit — ${report.siteCount} site${report.siteCount === 1 ? "" : "s"}`,
    ``,
    `_Generated ${report.generatedAt}_`,
    ``,
  ];

  if (report.needsIntervention.length > 0) {
    lines.push(`## Needs Intervention (${report.needsIntervention.length})`);
    lines.push(``, `| Site | Score | Issues |`, `|---|---|---|`);
    for (const r of report.needsIntervention) {
      const issues = r.checks.filter((c) => c.severity !== "ok").map((c) => c.label).join(", ");
      lines.push(`| ${r.hostname} | ${r.score} | ${issues || "—"} |`);
    }
    lines.push(``);
    lines.push(`### Issue Detail`);
    for (const r of report.needsIntervention) {
      lines.push(``, `#### ${r.hostname}`);
      for (const c of r.checks) {
        const icon = c.severity === "ok" ? "✓" : c.severity === "warn" ? "⚠" : "✗";
        lines.push(`- ${icon} **${c.label}**: ${c.detail}`);
      }
    }
    lines.push(``);
  }

  if (report.healthy.length > 0) {
    lines.push(`## Healthy (${report.healthy.length})`);
    lines.push(``, `| Site | Score |`, `|---|---|`);
    for (const r of report.healthy) {
      lines.push(`| ${r.hostname} | ${r.score} |`);
    }
  }

  return lines.join("\n");
}
