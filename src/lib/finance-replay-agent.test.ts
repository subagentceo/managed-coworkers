/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Finance replay managed-agent smoke test (REPLAY-3).
 *
 * Mirrors legal-replay-agent.test.ts but for the financial-services
 * package. Asserts cookbook discovery + parse + OSL1 sanity.
 */

import { listCookbooks, loadCookbook } from "./finance-replay-agent.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  if (process.env.ANTHROPIC_API_KEY) {
    fail("ANTHROPIC_API_KEY is set; OSL1 forbids it in this chassis");
  }

  const cookbooks = listCookbooks();
  if (cookbooks.length < 5) {
    fail(`expected ≥5 finance cookbooks, got ${cookbooks.length}`);
  }
  console.log(`  ✓ finance listCookbooks(): ${cookbooks.length} cookbooks (${cookbooks.slice(0, 5).join(", ")}…)`);

  // kyc-screener is one of the canonical finance cookbooks per the
  // financial-services-plugins README.
  if (!cookbooks.includes("kyc-screener")) {
    fail(`kyc-screener cookbook missing — got [${cookbooks.join(", ")}]`);
  }
  const k = loadCookbook("kyc-screener");
  if (k.agent.name !== "kyc-screener") {
    fail(`kyc-screener agent.name mismatch: ${k.agent.name}`);
  }
  // Finance cookbooks may store the system prompt inline (.system.text)
  // OR reference an external file (.system.file). Accept either.
  const sys = k.agent.system as { text?: string; file?: string } | undefined;
  if (!sys?.text && !sys?.file) {
    fail("kyc-screener agent.system has neither text nor file");
  }
  const sysShape = sys?.text ? `text=${sys.text.length}ch` : `file=${sys?.file}`;
  console.log(
    `  ✓ loadCookbook("kyc-screener"): ${k.subagents.length} subagent(s), ${sysShape}`,
  );
}

try {
  main();
} catch (err) {
  console.error("finance-replay-agent.test FAIL:", (err as Error).message);
  process.exit(1);
}
