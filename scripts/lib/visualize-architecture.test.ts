/**
 * @cite vendor/cloudflare/urls.md
 * @cite vendor/alloydb-omni/urls.md
 *
 * Unit tests for scripts/lib/visualize-architecture.ts (visualize-architecture skill backing).
 *
 * Internal references:
 *   - packages/knowledge-work-plugins/data-engineering/skills/visualize-architecture/SKILL.md
 *   - docs/architecture.md
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  renderArchMarkdown,
  renderArchMermaid,
} from "./visualize-architecture.js";

import type { ArchSpec } from "./visualize-architecture.js";

// ---------------------------------------------------------------------------
// Sample spec
// ---------------------------------------------------------------------------

const SAMPLE_SPEC: ArchSpec = {
  title: "Product-Management Coworker",
  outcomeId: "ODEP8",
  nodes: [
    { id: "W",   label: "CF Worker",      type: "worker",    group: "product-management" },
    { id: "DB",  label: "AlloyDB",        type: "alloydb",   group: "product-management" },
    { id: "R",   label: "Redis",          type: "redis",     group: "product-management" },
    { id: "MCP", label: "Bridge MCP",     type: "mcp" },
    { id: "EXT", label: "GSC OAuth",      type: "external" },
  ],
  edges: [
    { from: "W",   to: "DB",  label: "persist" },
    { from: "W",   to: "R",   label: "enqueue" },
    { from: "MCP", to: "DB",  label: "read",   style: "dashed" },
    { from: "EXT", to: "W",   label: "token",  style: "dashed" },
  ],
};

// ---------------------------------------------------------------------------
// renderArchMermaid
// ---------------------------------------------------------------------------

test("renderArchMermaid: starts with mermaid block", () => {
  const md = renderArchMermaid(SAMPLE_SPEC);
  assert.ok(md.startsWith("```mermaid"), md.slice(0, 30));
});

test("renderArchMermaid: includes graph directive", () => {
  const md = renderArchMermaid(SAMPLE_SPEC);
  assert.ok(md.includes("graph LR"), md);
});

test("renderArchMermaid: subgraph for grouped nodes", () => {
  const md = renderArchMermaid(SAMPLE_SPEC);
  assert.ok(md.includes("subgraph product-management"), md);
});

test("renderArchMermaid: solid edge uses -->", () => {
  const md = renderArchMermaid(SAMPLE_SPEC);
  assert.ok(md.includes("-->"), md);
});

test("renderArchMermaid: dashed edge uses -..->", () => {
  const md = renderArchMermaid(SAMPLE_SPEC);
  assert.ok(md.includes("-.-"), md);
});

test("renderArchMermaid: node labels appear quoted", () => {
  const md = renderArchMermaid(SAMPLE_SPEC);
  assert.ok(md.includes('"CF Worker"'), md);
});

// ---------------------------------------------------------------------------
// renderArchMarkdown
// ---------------------------------------------------------------------------

test("renderArchMarkdown: starts with # heading", () => {
  const md = renderArchMarkdown(SAMPLE_SPEC);
  assert.ok(md.startsWith("# Architecture — Product-Management Coworker"), md.slice(0, 60));
});

test("renderArchMarkdown: includes outcome ID", () => {
  const md = renderArchMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("ODEP8"), md);
});

test("renderArchMarkdown: components table lists all nodes", () => {
  const md = renderArchMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("CF Worker"), md);
  assert.ok(md.includes("AlloyDB"), md);
  assert.ok(md.includes("GSC OAuth"), md);
});

test("renderArchMarkdown: node count in header", () => {
  const md = renderArchMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("5 nodes"), md);
});

test("renderArchMarkdown: edge count in header", () => {
  const md = renderArchMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("4 edges"), md);
});

test("renderArchMarkdown: embeds Mermaid diagram", () => {
  const md = renderArchMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("```mermaid"), md);
});
