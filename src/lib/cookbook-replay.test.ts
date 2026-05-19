/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Cookbook replay smoke test (REPLAY-7).
 *
 * Asserts createCookbookReplay() composes cookbook-loader + pollyjs:
 *   1. Legal/diligence-grid loads and a cassette dir is minted.
 *   2. Finance/kyc-screener loads and a cassette dir is minted.
 *   3. Polly stops cleanly in both cases.
 *
 * No live network — passthrough mode with no fetch() call made.
 */

import { existsSync } from "node:fs";

import { createCookbookReplay } from "./cookbook-replay.js";

function fail(msg: string): never {
  throw new Error(msg);
}

async function main(): Promise<void> {
  // Legal case
  const legal = createCookbookReplay({
    package: "legal",
    slug: "diligence-grid",
    mode: "passthrough",
    recordingName: "smoke-replay-7",
  });
  try {
    if (legal.cookbook.agent.name !== "diligence-grid") {
      fail(`legal cookbook.agent.name mismatch: ${legal.cookbook.agent.name}`);
    }
    if (!existsSync(legal.cassetteDir)) {
      fail(`legal cassette dir not minted: ${legal.cassetteDir}`);
    }
    if (!legal.cassetteDir.endsWith("/cassettes/legal/diligence-grid")) {
      fail(`unexpected legal cassetteDir: ${legal.cassetteDir}`);
    }
    console.log(
      `  ✓ cookbook-replay legal/diligence-grid: ${legal.cookbook.subagents.length} subagent(s), cassetteDir=${legal.cassetteDir.split("/").slice(-3).join("/")}`,
    );
  } finally {
    await legal.polly.stop();
  }

  // Finance case
  const finance = createCookbookReplay({
    package: "finance",
    slug: "kyc-screener",
    mode: "passthrough",
    recordingName: "smoke-replay-7",
  });
  try {
    if (finance.cookbook.agent.name !== "kyc-screener") {
      fail(`finance cookbook.agent.name mismatch: ${finance.cookbook.agent.name}`);
    }
    if (!existsSync(finance.cassetteDir)) {
      fail(`finance cassette dir not minted: ${finance.cassetteDir}`);
    }
    console.log(
      `  ✓ cookbook-replay finance/kyc-screener: ${finance.cookbook.subagents.length} subagent(s), cassetteDir=${finance.cassetteDir.split("/").slice(-3).join("/")}`,
    );
  } finally {
    await finance.polly.stop();
  }
}

main().catch((err) => {
  console.error("cookbook-replay.test FAIL:", (err as Error).message);
  process.exit(1);
});
