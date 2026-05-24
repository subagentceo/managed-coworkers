#!/usr/bin/env tsx
/**
 * Connector enum bridge for managed-coworker verticals.
 *
 * Usage:
 *   tsx scripts/setup-coworker.ts <vertical> --connectors=<list>
 *   tsx scripts/setup-coworker.ts product-management --connectors=cf-analytics,gsc
 *   tsx scripts/setup-coworker.ts product-management --connectors=gsc,slack,linear
 *
 * Writes:
 *   packages/knowledge-work-plugins/<vertical>/active-connectors.json
 *
 * Prints:
 *   The docker compose command to activate the selected profiles.
 *
 * Run this after devcontainer create (postCreate) or when changing connectors.
 *
 * Refs: OPMP2.
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  buildActiveConnectors,
  buildComposeCommand,
  parseConnectorList,
  summarizeByCategory,
  unknownConnectors,
} from "./lib/setup-coworker.js";

import type { ConnectorName } from "./lib/setup-coworker.js";

const args = process.argv.slice(2);
const vertical = args[0];
const connectorsFlag = args.find((a) => a.startsWith("--connectors="));

if (!vertical || !connectorsFlag) {
  process.stderr.write(
    "Usage: tsx scripts/setup-coworker.ts <vertical> --connectors=<comma-list>\n" +
    "  Example: tsx scripts/setup-coworker.ts product-management --connectors=cf-analytics,gsc,slack\n",
  );
  process.exit(1);
}

const rawConnectors = parseConnectorList(connectorsFlag.slice("--connectors=".length));
const unknown = unknownConnectors(rawConnectors);
if (unknown.length > 0) {
  process.stderr.write(
    `Unknown connector(s): ${unknown.join(", ")}\n` +
    "Run with --help to see supported connector names.\n",
  );
  process.exit(1);
}

const connectors = rawConnectors as ConnectorName[];
const active = buildActiveConnectors(vertical, connectors);

// Write active-connectors.json
const outPath = resolve(
  process.cwd(),
  `packages/knowledge-work-plugins/${vertical}/active-connectors.json`,
);
writeFileSync(outPath, JSON.stringify(active, null, 2) + "\n");

// Print summary
const summary = summarizeByCategory(connectors);
process.stdout.write(`\nConnectors activated for ${vertical}:\n`);
for (const [cat, names] of Object.entries(summary)) {
  process.stdout.write(`  ${cat}: ${names.join(", ")}\n`);
}
if (connectors.length === 0) {
  process.stdout.write("  (none selected — base data plane only)\n");
}

// Print compose command
const cmd = buildComposeCommand(active.profiles);
if (cmd) {
  process.stdout.write(`\nTo start the selected MCP connectors:\n  ${cmd}\n\n`);
} else {
  process.stdout.write("\nNo optional MCP connectors selected.\n\n");
}

process.stdout.write(`Wrote: ${outPath}\n`);
