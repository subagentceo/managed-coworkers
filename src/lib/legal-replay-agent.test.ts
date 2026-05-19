/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Legal replay managed-agent smoke test (REPLAY-2).
 *
 * Asserts:
 *   1. listCookbooks() finds the 5 first-party cookbooks shipped in
 *      packages/claude-for-legal/managed-agent-cookbooks/.
 *   2. loadCookbook("diligence-grid") parses agent.yaml and surfaces a
 *      non-empty name + system.text + subagents[].
 *   3. No `ANTHROPIC_API_KEY` env var is set (OSL1 sanity).
 *
 * No network, no HTTP, no SDK import.
 */

import { listCookbooks, loadCookbook } from "./legal-replay-agent.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  if (process.env.ANTHROPIC_API_KEY) {
    fail("ANTHROPIC_API_KEY is set; OSL1 forbids it in this chassis");
  }

  const cookbooks = listCookbooks();
  if (cookbooks.length < 5) {
    fail(`expected ≥5 cookbooks, got ${cookbooks.length}: ${cookbooks.join(",")}`);
  }
  console.log(`  ✓ listCookbooks(): ${cookbooks.length} cookbooks (${cookbooks.join(", ")})`);

  if (!cookbooks.includes("diligence-grid")) {
    fail(`diligence-grid cookbook missing — got [${cookbooks.join(", ")}]`);
  }

  const dg = loadCookbook("diligence-grid");
  if (dg.agent.name !== "diligence-grid") {
    fail(`agent.name mismatch: ${dg.agent.name}`);
  }
  if (!dg.agent.system?.text || dg.agent.system.text.length < 100) {
    fail("agent.system.text missing or too short");
  }
  if (dg.subagents.length === 0) {
    fail("expected subagents, got none");
  }
  console.log(
    `  ✓ loadCookbook("diligence-grid"): ${dg.subagents.length} subagent(s), system.text=${dg.agent.system.text.length}ch`,
  );
}

try {
  main();
} catch (err) {
  console.error("legal-replay-agent.test FAIL:", (err as Error).message);
  process.exit(1);
}
