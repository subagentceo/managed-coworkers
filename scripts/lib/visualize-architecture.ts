/**
 * Pure functions for the visualize-architecture skill.
 *
 * Generates Mermaid architecture diagrams from a declarative spec describing
 * the chassis components (Workers, data stores, MCP servers, connectors).
 * Outputs a Mermaid graph + Markdown report. No I/O.
 *
 * Refs: ODEP8.
 */

// ---------------------------------------------------------------------------
// Diagram spec
// ---------------------------------------------------------------------------

export type NodeType =
  | "worker"
  | "alloydb"
  | "redis"
  | "mcp"
  | "connector"
  | "skill"
  | "client"
  | "external";

export interface ArchNode {
  id: string;
  label: string;
  type: NodeType;
  /** Optional sub-group (e.g. "product-management", "data-engineering"). */
  group?: string;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  style?: "solid" | "dashed";
}

export interface ArchSpec {
  title: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  outcomeId: string;
}

// ---------------------------------------------------------------------------
// Mermaid shape map
// ---------------------------------------------------------------------------

const MERMAID_SHAPE: Record<NodeType, [string, string]> = {
  worker:    ["[", "]"],
  alloydb:   ["[(", ")]"],
  redis:     ["[(", ")]"],
  mcp:       ["(", ")"],
  connector: [">", "]"],
  skill:     ["[[", "]]"],
  client:    ["([", "])"],
  external:  ["{", "}"],
};

function mermaidNode(node: ArchNode): string {
  const [open, close] = MERMAID_SHAPE[node.type];
  const escapedLabel = node.label.replace(/"/g, "'");
  return `  ${node.id}${open}"${escapedLabel}"${close}`;
}

function mermaidEdge(edge: ArchEdge): string {
  const arrow = edge.style === "dashed" ? "-.->" : "-->";
  const label = edge.label ? `|${edge.label}|` : "";
  return `  ${edge.from} ${arrow}${label} ${edge.to}`;
}

// ---------------------------------------------------------------------------
// Diagram renderer
// ---------------------------------------------------------------------------

export function renderArchMermaid(spec: ArchSpec): string {
  const lines: string[] = ["```mermaid", "graph LR"];

  // Group nodes into subgraphs if they have a group
  const groups = new Map<string, ArchNode[]>();
  const ungrouped: ArchNode[] = [];
  for (const node of spec.nodes) {
    if (node.group) {
      const arr = groups.get(node.group) ?? [];
      arr.push(node);
      groups.set(node.group, arr);
    } else {
      ungrouped.push(node);
    }
  }

  for (const node of ungrouped) lines.push(mermaidNode(node));

  for (const [group, nodes] of groups) {
    lines.push(`  subgraph ${group}`);
    for (const node of nodes) lines.push(mermaidNode(node));
    lines.push("  end");
  }

  lines.push("");
  for (const edge of spec.edges) lines.push(mermaidEdge(edge));

  lines.push("```");
  return lines.join("\n");
}

export function renderArchMarkdown(spec: ArchSpec): string {
  const nodeCount = spec.nodes.length;
  const edgeCount = spec.edges.length;
  const groups = new Set(spec.nodes.map((n) => n.group).filter(Boolean));

  const lines: string[] = [
    `# Architecture — ${spec.title}`,
    ``,
    `_Outcome: ${spec.outcomeId} · ${nodeCount} nodes · ${edgeCount} edges · ${groups.size} subgraphs_`,
    ``,
    `## Diagram`,
    ``,
    renderArchMermaid(spec),
    ``,
    `## Components`,
    ``,
    `| ID | Label | Type | Group |`,
    `|---|---|---|---|`,
  ];

  for (const node of spec.nodes) {
    lines.push(`| ${node.id} | ${node.label} | ${node.type} | ${node.group ?? "—"} |`);
  }

  return lines.join("\n");
}
