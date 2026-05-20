/**
 * Pure functions for the trace-data-flow skill.
 *
 * Traces a named data item end-to-end across the chassis data plane:
 *   Cloudflare Worker → Redis queue → AlloyDB row → MCP read → skill consumer
 *
 * Each hop is described by the operator (or by Claude at runtime via tool calls)
 * as a FlowHop with a status of 'present' | 'missing' | 'partial' | 'unknown'.
 * This module detects gaps, computes completeness, generates a Mermaid sequence
 * diagram, and formats a Markdown report.
 *
 * Refs: ODEP5.
 */

/** The architectural layer this hop belongs to. */
export type HopType = "worker" | "redis" | "alloydb" | "mcp" | "skill" | "external";

/** How complete this hop is. */
export type HopStatus = "present" | "missing" | "partial" | "unknown";

/** One hop on the data flow path. */
export interface FlowHop {
  /** Short label shown in the diagram and report (e.g. "KV session-index"). */
  label: string;
  type: HopType;
  /** File path, table name, Redis key pattern, MCP lane, etc. */
  path?: string;
  status: HopStatus;
  /** Human-readable reason when status is not 'present'. */
  detail?: string;
}

/** A detected gap with a suggested fix. */
export interface FlowGap {
  hopLabel: string;
  hopType: HopType;
  status: HopStatus;
  description: string;
  suggestedFix: string;
}

/** Top-level trace result. */
export interface DataFlowTrace {
  item: string;
  hops: readonly FlowHop[];
  /** Percentage of hops with status === 'present', 0–100. */
  completeness: number;
  gaps: readonly FlowGap[];
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// Gap detection
// ---------------------------------------------------------------------------

/** Suggested fix templates per hop type. */
const FIX_TEMPLATES: Record<HopType, string> = {
  worker: "Add a handler in the relevant infra/cloudflare/coworkers/*/src/worker.ts that emits this event.",
  redis: "Define the Redis key namespace in src/domain/connectors/ and ensure the Worker enqueues to it.",
  alloydb: "Write a migration under infra/alloydb/migrations/ to add the table/column and update src/domain/models/.",
  mcp: "Add a bridge lane in src/mcp/bridge-server.ts that reads from AlloyDB and exposes the row.",
  skill: "Wire the skill to consume this data via the appropriate MCP lane or Redis read.",
  external: "Verify the external integration is active and the connector is enabled in userConfig.",
};

export function detectFlowGaps(hops: readonly FlowHop[]): FlowGap[] {
  return hops
    .filter((h) => h.status !== "present")
    .map((h) => ({
      hopLabel: h.label,
      hopType: h.type,
      status: h.status,
      description: h.detail ?? `Hop "${h.label}" (${h.type}) is ${h.status}.`,
      suggestedFix: FIX_TEMPLATES[h.type],
    }));
}

export function computeCompleteness(hops: readonly FlowHop[]): number {
  if (hops.length === 0) return 100;
  const present = hops.filter((h) => h.status === "present").length;
  return Math.round((present / hops.length) * 100);
}

export function buildDataFlowTrace(item: string, hops: readonly FlowHop[]): DataFlowTrace {
  return {
    item,
    hops,
    completeness: computeCompleteness(hops),
    gaps: detectFlowGaps(hops),
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Mermaid sequence diagram renderer
// ---------------------------------------------------------------------------

/** Map hop type to a Mermaid participant alias. */
function participantAlias(type: HopType): string {
  const MAP: Record<HopType, string> = {
    worker: "W",
    redis: "R",
    alloydb: "DB",
    mcp: "MCP",
    skill: "S",
    external: "EXT",
  };
  return MAP[type];
}

export function renderFlowMermaid(trace: DataFlowTrace): string {
  const lines: string[] = ["```mermaid", "sequenceDiagram"];

  // Declare participants
  const seen = new Set<string>();
  for (const hop of trace.hops) {
    const alias = participantAlias(hop.type);
    if (!seen.has(alias)) {
      lines.push(`  participant ${alias} as ${hop.label}`);
      seen.add(alias);
    }
  }

  // Draw arrows between consecutive hops
  for (let i = 0; i < trace.hops.length - 1; i++) {
    const from = trace.hops[i];
    const to = trace.hops[i + 1];
    const fromAlias = participantAlias(from.type);
    const toAlias = participantAlias(to.type);
    const arrow = from.status === "present" && to.status === "present" ? "->>" : "--x";
    lines.push(`  ${fromAlias} ${arrow} ${toAlias}: ${trace.item}`);
    if (to.status !== "present") {
      lines.push(`  Note over ${toAlias}: ⚠ ${to.status}`);
    }
  }

  lines.push("```");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Markdown report renderer
// ---------------------------------------------------------------------------

const STATUS_ICON: Record<HopStatus, string> = {
  present: "✅",
  partial: "⚠️",
  missing: "❌",
  unknown: "❓",
};

export function renderFlowMarkdown(trace: DataFlowTrace): string {
  const lines: string[] = [
    `# Data Flow Trace — "${trace.item}"`,
    ``,
    `_Generated ${trace.generatedAt} · ${trace.hops.length} hops · ${trace.completeness}% complete_`,
    ``,
  ];

  // Hop status table
  lines.push(`## Hop Summary`, ``);
  lines.push(`| # | Hop | Type | Path | Status |`);
  lines.push(`|---|---|---|---|---|`);
  trace.hops.forEach((h, i) => {
    const icon = STATUS_ICON[h.status];
    const path = h.path ?? "—";
    lines.push(`| ${i + 1} | ${h.label} | ${h.type} | \`${path}\` | ${icon} ${h.status} |`);
  });
  lines.push(``);

  // Mermaid diagram
  lines.push(`## Sequence Diagram`, ``);
  lines.push(renderFlowMermaid(trace));
  lines.push(``);

  // Gaps
  if (trace.gaps.length === 0) {
    lines.push(`## Result`, ``, `All hops are present. No gaps detected — this data flow is fully wired.`);
  } else {
    lines.push(`## Gaps (${trace.gaps.length})`, ``);
    trace.gaps.forEach((g, i) => {
      lines.push(
        `### ${i + 1}. ${g.hopLabel} (${g.status})`,
        ``,
        `**Type:** ${g.hopType}`,
        ``,
        `**Problem:** ${g.description}`,
        ``,
        `**Suggested fix:** ${g.suggestedFix}`,
        ``,
      );
    });
  }

  return lines.join("\n");
}
