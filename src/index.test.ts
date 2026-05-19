/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Public index re-export smoke (REPLAY-8).
 *
 * Imports the replay surface from the public src/index entrypoint
 * and asserts each symbol is callable/typed. Catches accidental
 * un-export regressions when src/index.ts is edited.
 */

import {
  createReplay,
  createCookbookReplay,
  createMiniflareWorker,
  legalAgent,
  financeAgent,
  gradeMarkdown,
} from "./index.js";

function fail(msg: string): never {
  throw new Error(msg);
}

function main(): void {
  if (typeof createReplay !== "function") fail("createReplay not exported");
  if (typeof createCookbookReplay !== "function") {
    fail("createCookbookReplay not exported");
  }
  if (typeof createMiniflareWorker !== "function") {
    fail("createMiniflareWorker not exported");
  }
  if (typeof legalAgent.listCookbooks !== "function") {
    fail("legalAgent.listCookbooks not exported");
  }
  if (typeof financeAgent.listCookbooks !== "function") {
    fail("financeAgent.listCookbooks not exported");
  }
  const legalCookbooks = legalAgent.listCookbooks();
  const financeCookbooks = financeAgent.listCookbooks();
  if (legalCookbooks.length < 5) fail(`legal cookbooks: ${legalCookbooks.length}`);
  if (financeCookbooks.length < 5) fail(`finance cookbooks: ${financeCookbooks.length}`);
  console.log(
    `  ✓ index re-exports: createReplay, createCookbookReplay, createMiniflareWorker, legalAgent (${legalCookbooks.length}), financeAgent (${financeCookbooks.length})`,
  );
  if (typeof gradeMarkdown !== "function") fail("gradeMarkdown not exported");
  const gradeResult = gradeMarkdown("# Title\n\nbody\n");
  if (typeof gradeResult.score !== "number") {
    fail(`gradeMarkdown score not number: ${typeof gradeResult.score}`);
  }
  if (gradeResult.score < 0 || gradeResult.score > 100) {
    fail(`gradeMarkdown score out of range: ${gradeResult.score}`);
  }
  console.log(
    `  ✓ index re-exports: gradeMarkdown (score=${gradeResult.score})`,
  );
}

try {
  main();
} catch (err) {
  console.error("index.test FAIL:", (err as Error).message);
  process.exit(1);
}
