/**
 * @cite vendor/cloudflare/urls.md
 * @cite vendor/alloydb-omni/urls.md
 * @cite vendor/redis/urls.md
 *
 * Unit tests for scripts/lib/trace-data-flow.ts (trace-data-flow skill backing).
 *
 * Internal references (not vendor/ paths, so listed as comments):
 *   - packages/knowledge-work-plugins/data-engineering/skills/trace-data-flow/SKILL.md
 *   - src/domain/portfolio/Site.ts
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  buildDataFlowTrace,
  computeCompleteness,
  detectFlowGaps,
  renderFlowMarkdown,
  renderFlowMermaid,
} from "./trace-data-flow.js";

import type { FlowHop } from "./trace-data-flow.js";

// ---------------------------------------------------------------------------
// computeCompleteness
// ---------------------------------------------------------------------------

test("computeCompleteness: all present → 100", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "Redis", type: "redis", status: "present" },
  ];
  assert.equal(computeCompleteness(hops), 100);
});

test("computeCompleteness: all missing → 0", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "missing" },
    { label: "Redis", type: "redis", status: "missing" },
  ];
  assert.equal(computeCompleteness(hops), 0);
});

test("computeCompleteness: half present → 50", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "Redis", type: "redis", status: "missing" },
  ];
  assert.equal(computeCompleteness(hops), 50);
});

test("computeCompleteness: empty hops → 100", () => {
  assert.equal(computeCompleteness([]), 100);
});

test("computeCompleteness: partial counts as not-present", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "DB", type: "alloydb", status: "partial" },
    { label: "MCP", type: "mcp", status: "present" },
  ];
  assert.equal(computeCompleteness(hops), 67);
});

// ---------------------------------------------------------------------------
// detectFlowGaps
// ---------------------------------------------------------------------------

test("detectFlowGaps: no gaps when all present", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "DB", type: "alloydb", status: "present" },
  ];
  assert.equal(detectFlowGaps(hops).length, 0);
});

test("detectFlowGaps: missing hop creates a gap", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "Queue", type: "redis", status: "missing" },
  ];
  const gaps = detectFlowGaps(hops);
  assert.equal(gaps.length, 1);
  assert.equal(gaps[0].hopLabel, "Queue");
  assert.equal(gaps[0].status, "missing");
});

test("detectFlowGaps: partial hop creates a gap", () => {
  const hops: FlowHop[] = [
    { label: "AlloyDB", type: "alloydb", status: "partial" },
  ];
  const gaps = detectFlowGaps(hops);
  assert.equal(gaps.length, 1);
  assert.equal(gaps[0].status, "partial");
});

test("detectFlowGaps: alloydb gap suggests migration fix", () => {
  const hops: FlowHop[] = [
    { label: "Table", type: "alloydb", status: "missing" },
  ];
  const gaps = detectFlowGaps(hops);
  assert.ok(gaps[0].suggestedFix.includes("migration"), `expected migration in fix: ${gaps[0].suggestedFix}`);
});

test("detectFlowGaps: redis gap suggests key namespace fix", () => {
  const hops: FlowHop[] = [
    { label: "Queue", type: "redis", status: "missing" },
  ];
  const gaps = detectFlowGaps(hops);
  assert.ok(gaps[0].suggestedFix.includes("Redis"), `expected Redis in fix: ${gaps[0].suggestedFix}`);
});

test("detectFlowGaps: uses hop.detail as description when provided", () => {
  const hops: FlowHop[] = [
    { label: "MCP lane", type: "mcp", status: "missing", detail: "bridge lane not yet declared" },
  ];
  const gaps = detectFlowGaps(hops);
  assert.equal(gaps[0].description, "bridge lane not yet declared");
});

// ---------------------------------------------------------------------------
// buildDataFlowTrace
// ---------------------------------------------------------------------------

const SAMPLE_HOPS: FlowHop[] = [
  { label: "Worker handler", type: "worker", path: "infra/cloudflare/coworkers/product-management/src/worker.ts", status: "present" },
  { label: "Redis stream", type: "redis", path: "coworker:sessions:new", status: "missing" },
  { label: "alloydb sessions", type: "alloydb", path: "coworker_sessions", status: "partial" },
  { label: "MCP bridge", type: "mcp", path: "support_sessions", status: "present" },
];

test("buildDataFlowTrace: correct item name", () => {
  const trace = buildDataFlowTrace("CoworkerSession start", SAMPLE_HOPS);
  assert.equal(trace.item, "CoworkerSession start");
});

test("buildDataFlowTrace: correct hop count", () => {
  const trace = buildDataFlowTrace("test", SAMPLE_HOPS);
  assert.equal(trace.hops.length, 4);
});

test("buildDataFlowTrace: completeness reflects present hops", () => {
  const trace = buildDataFlowTrace("test", SAMPLE_HOPS);
  assert.equal(trace.completeness, 50);
});

test("buildDataFlowTrace: gap count matches non-present hops", () => {
  const trace = buildDataFlowTrace("test", SAMPLE_HOPS);
  assert.equal(trace.gaps.length, 2);
});

// ---------------------------------------------------------------------------
// renderFlowMermaid
// ---------------------------------------------------------------------------

test("renderFlowMermaid: starts with mermaid code block", () => {
  const trace = buildDataFlowTrace("event", SAMPLE_HOPS);
  const md = renderFlowMermaid(trace);
  assert.ok(md.startsWith("```mermaid"), `expected mermaid block, got: ${md.slice(0, 40)}`);
});

test("renderFlowMermaid: contains sequenceDiagram directive", () => {
  const trace = buildDataFlowTrace("event", SAMPLE_HOPS);
  const md = renderFlowMermaid(trace);
  assert.ok(md.includes("sequenceDiagram"));
});

test("renderFlowMermaid: missing hop shows warning note", () => {
  const hops: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "Queue", type: "redis", status: "missing" },
  ];
  const trace = buildDataFlowTrace("evt", hops);
  const md = renderFlowMermaid(trace);
  assert.ok(md.includes("missing"), `expected 'missing' note in: ${md}`);
});

// ---------------------------------------------------------------------------
// renderFlowMarkdown
// ---------------------------------------------------------------------------

test("renderFlowMarkdown: starts with # heading", () => {
  const trace = buildDataFlowTrace("CoworkerSession", SAMPLE_HOPS);
  const md = renderFlowMarkdown(trace);
  assert.ok(md.startsWith("# Data Flow Trace"), `unexpected start: ${md.slice(0, 50)}`);
});

test("renderFlowMarkdown: includes completeness percentage", () => {
  const trace = buildDataFlowTrace("CoworkerSession", SAMPLE_HOPS);
  const md = renderFlowMarkdown(trace);
  assert.ok(md.includes("50%"), `expected 50% in output`);
});

test("renderFlowMarkdown: shows no-gaps message when fully present", () => {
  const allPresent: FlowHop[] = [
    { label: "Worker", type: "worker", status: "present" },
    { label: "DB", type: "alloydb", status: "present" },
  ];
  const trace = buildDataFlowTrace("item", allPresent);
  const md = renderFlowMarkdown(trace);
  assert.ok(md.includes("No gaps detected"));
});

test("renderFlowMarkdown: includes gap hop label", () => {
  const trace = buildDataFlowTrace("CoworkerSession", SAMPLE_HOPS);
  const md = renderFlowMarkdown(trace);
  assert.ok(md.includes("Redis stream"), "expected gap label in output");
});

test("renderFlowMarkdown: embeds Mermaid diagram", () => {
  const trace = buildDataFlowTrace("CoworkerSession", SAMPLE_HOPS);
  const md = renderFlowMarkdown(trace);
  assert.ok(md.includes("sequenceDiagram"));
});
