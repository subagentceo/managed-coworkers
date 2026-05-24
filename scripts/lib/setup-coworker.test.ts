/**
 * @cite vendor/cloudflare/urls.md
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins.md
 *
 * Unit tests for scripts/lib/setup-coworker.ts (connector enum bridge).
 *
 * Internal references:
 *   - packages/knowledge-work-plugins/product-management/.claude-plugin/plugin.json
 *   - .docker/mcp-toolkit/compose.yaml
 *   - docs/CONVENTIONS.md
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  ALL_CONNECTORS,
  CONNECTOR_CATEGORIES,
  buildActiveConnectors,
  buildComposeCommand,
  connectorToProfile,
  parseConnectorList,
  summarizeByCategory,
  unknownConnectors,
} from "./setup-coworker.js";

import type { ConnectorName } from "./setup-coworker.js";

// ---------------------------------------------------------------------------
// parseConnectorList
// ---------------------------------------------------------------------------

test("parseConnectorList: parses comma-separated list", () => {
  assert.deepEqual(parseConnectorList("cf-analytics,gsc"), ["cf-analytics", "gsc"]);
});

test("parseConnectorList: trims whitespace", () => {
  assert.deepEqual(parseConnectorList(" slack , linear "), ["slack", "linear"]);
});

test("parseConnectorList: lowercases", () => {
  assert.deepEqual(parseConnectorList("GSC"), ["gsc"]);
});

test("parseConnectorList: single item", () => {
  assert.deepEqual(parseConnectorList("gsc"), ["gsc"]);
});

test("parseConnectorList: empty string → empty array", () => {
  assert.deepEqual(parseConnectorList(""), []);
});

// ---------------------------------------------------------------------------
// unknownConnectors
// ---------------------------------------------------------------------------

test("unknownConnectors: returns empty for known connectors", () => {
  assert.deepEqual(unknownConnectors(["cf-analytics", "gsc"]), []);
});

test("unknownConnectors: flags unknown connector", () => {
  assert.deepEqual(unknownConnectors(["cf-analytics", "fakeconnector"]), ["fakeconnector"]);
});

test("unknownConnectors: all known → empty", () => {
  assert.deepEqual(unknownConnectors(ALL_CONNECTORS), []);
});

// ---------------------------------------------------------------------------
// connectorToProfile
// ---------------------------------------------------------------------------

test("connectorToProfile: gsc → gsc", () => {
  assert.equal(connectorToProfile("gsc"), "gsc");
});

test("connectorToProfile: cf-analytics → cf-analytics", () => {
  assert.equal(connectorToProfile("cf-analytics"), "cf-analytics");
});

// ---------------------------------------------------------------------------
// buildActiveConnectors
// ---------------------------------------------------------------------------

test("buildActiveConnectors: correct vertical", () => {
  const ac = buildActiveConnectors("product-management", ["gsc", "cf-analytics"]);
  assert.equal(ac.vertical, "product-management");
});

test("buildActiveConnectors: connectors list preserved", () => {
  const ac = buildActiveConnectors("product-management", ["gsc"]);
  assert.deepEqual(ac.connectors, ["gsc"]);
});

test("buildActiveConnectors: profiles derived from connectors", () => {
  const ac = buildActiveConnectors("product-management", ["cf-analytics", "slack"]);
  assert.deepEqual(ac.profiles, ["cf-analytics", "slack"]);
});

test("buildActiveConnectors: empty connectors yields empty profiles", () => {
  const ac = buildActiveConnectors("data-engineering", [] as ConnectorName[]);
  assert.deepEqual(ac.profiles, []);
});

test("buildActiveConnectors: generatedAt is ISO string", () => {
  const ac = buildActiveConnectors("product-management", ["gsc"]);
  assert.ok(!isNaN(Date.parse(ac.generatedAt)), `invalid date: ${ac.generatedAt}`);
});

// ---------------------------------------------------------------------------
// buildComposeCommand
// ---------------------------------------------------------------------------

test("buildComposeCommand: empty profiles → empty string", () => {
  assert.equal(buildComposeCommand([]), "");
});

test("buildComposeCommand: single profile", () => {
  const cmd = buildComposeCommand(["gsc"]);
  assert.ok(cmd.includes("--profile gsc"), cmd);
  assert.ok(cmd.includes("up -d"), cmd);
});

test("buildComposeCommand: multiple profiles", () => {
  const cmd = buildComposeCommand(["cf-analytics", "gsc", "slack"]);
  assert.ok(cmd.includes("--profile cf-analytics"), cmd);
  assert.ok(cmd.includes("--profile gsc"), cmd);
  assert.ok(cmd.includes("--profile slack"), cmd);
});

test("buildComposeCommand: uses mcp-toolkit compose file by default", () => {
  const cmd = buildComposeCommand(["gsc"]);
  assert.ok(cmd.includes("mcp-toolkit"), cmd);
});

test("buildComposeCommand: accepts custom compose file", () => {
  const cmd = buildComposeCommand(["gsc"], "custom/compose.yaml");
  assert.ok(cmd.includes("custom/compose.yaml"), cmd);
});

// ---------------------------------------------------------------------------
// summarizeByCategory
// ---------------------------------------------------------------------------

test("summarizeByCategory: groups by category", () => {
  const summary = summarizeByCategory(["cf-analytics", "gsc", "slack"]);
  assert.deepEqual(summary.analytics, ["cf-analytics"]);
  assert.deepEqual(summary.search_console, ["gsc"]);
  assert.deepEqual(summary.chat, ["slack"]);
});

test("summarizeByCategory: omits empty categories", () => {
  const summary = summarizeByCategory(["gsc"]);
  assert.ok(!("analytics" in summary), "analytics should be absent");
  assert.ok(!("chat" in summary), "chat should be absent");
});

test("CONNECTOR_CATEGORIES: all values are known connectors", () => {
  for (const names of Object.values(CONNECTOR_CATEGORIES)) {
    const unknown = unknownConnectors(names);
    assert.deepEqual(unknown, [], `unknown connectors in category: ${unknown}`);
  }
});
