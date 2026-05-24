#!/usr/bin/env tsx
/**
 * CLI for the trace-data-flow skill.
 *
 * Usage:
 *   tsx scripts/trace-data-flow.ts --demo
 *   tsx scripts/trace-data-flow.ts --flow=<hops.json> --item=<event-name>
 *
 * The hops JSON is a FlowHop[] array. In practice, Claude fills in the
 * status fields at skill runtime by inspecting the codebase via tool calls.
 *
 * Refs: ODEP5.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { buildDataFlowTrace, renderFlowMarkdown } from "./lib/trace-data-flow.js";
import type { FlowHop } from "./lib/trace-data-flow.js";

const args = process.argv.slice(2);

if (args.includes("--demo")) {
  const hops: FlowHop[] = [
    {
      label: "Worker handler",
      type: "worker",
      path: "infra/cloudflare/coworkers/product-management/src/worker.ts",
      status: "present",
    },
    {
      label: "Redis stream",
      type: "redis",
      path: "coworker:sessions:new",
      status: "missing",
      detail: "Redis key namespace not yet declared in src/domain/connectors/",
    },
    {
      label: "alloydb coworker_sessions",
      type: "alloydb",
      path: "coworker_sessions",
      status: "partial",
      detail: "Migration file exists but is missing the outcome_id column",
    },
    {
      label: "MCP bridge support_sessions",
      type: "mcp",
      path: "support_sessions",
      status: "present",
    },
    {
      label: "metrics-review skill",
      type: "skill",
      path: "packages/knowledge-work-plugins/product-management/skills/metrics-review/SKILL.md",
      status: "present",
    },
  ];

  const trace = buildDataFlowTrace("CoworkerSession start event", hops);
  process.stdout.write(renderFlowMarkdown(trace) + "\n");
  process.exit(0);
}

const flowFlag = args.find((a) => a.startsWith("--flow="));
const itemFlag = args.find((a) => a.startsWith("--item="));

if (!flowFlag || !itemFlag) {
  process.stderr.write(
    "Usage:\n  tsx scripts/trace-data-flow.ts --demo\n  tsx scripts/trace-data-flow.ts --flow=<hops.json> --item=<event-name>\n",
  );
  process.exit(1);
}

const hops: FlowHop[] = JSON.parse(
  readFileSync(resolve(process.cwd(), flowFlag.slice("--flow=".length)), "utf8"),
);
const item = itemFlag.slice("--item=".length);

const trace = buildDataFlowTrace(item, hops);
process.stdout.write(renderFlowMarkdown(trace) + "\n");
