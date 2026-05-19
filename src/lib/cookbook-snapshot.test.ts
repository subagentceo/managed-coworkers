/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Cookbook snapshot test (REPLAY-11).
 *
 * Hardens the replay surface by asserting the exact set of cookbooks
 * available under each vendored package. Catches:
 *
 *   - accidental cookbook deletion (someone runs rm -rf the wrong dir)
 *   - rename without the chassis side being updated
 *   - upstream-refresh drift (vendored package gets a new cookbook
 *     and the chassis ADR / cassette dir / index re-export miss it)
 *
 * Snapshot updates are intentional: when upstream adds a cookbook,
 * this test fails loudly and forces the operator to ack the new
 * surface by updating EXPECTED_LEGAL / EXPECTED_FINANCE here.
 */

import { listCookbooks as listLegal, loadCookbook as loadLegal } from "./legal-replay-agent.js";
import { listCookbooks as listFinance, loadCookbook as loadFinance } from "./finance-replay-agent.js";

const EXPECTED_LEGAL = [
  "diligence-grid",
  "docket-watcher",
  "launch-radar",
  "reg-monitor",
  "renewal-watcher",
];

const EXPECTED_FINANCE = [
  "earnings-reviewer",
  "gl-reconciler",
  "kyc-screener",
  "market-researcher",
  "meeting-prep-agent",
  "model-builder",
  "month-end-closer",
  "pitch-agent",
  "statement-auditor",
  "valuation-reviewer",
];

function fail(msg: string): never {
  throw new Error(msg);
}

function diff(actual: string[], expected: string[], label: string): void {
  const a = new Set(actual);
  const e = new Set(expected);
  const missing = expected.filter((x) => !a.has(x));
  const extra = actual.filter((x) => !e.has(x));
  if (missing.length === 0 && extra.length === 0) return;
  const detail: string[] = [];
  if (missing.length > 0) detail.push(`missing from disk: ${missing.join(", ")}`);
  if (extra.length > 0) detail.push(`new on disk (update EXPECTED): ${extra.join(", ")}`);
  fail(`${label}: ${detail.join("; ")}`);
}

function main(): void {
  // Legal snapshot
  const legal = listLegal();
  diff(legal, EXPECTED_LEGAL, "EXPECTED_LEGAL");
  for (const slug of EXPECTED_LEGAL) {
    const c = loadLegal(slug);
    if (c.agent.name !== slug) {
      fail(`legal/${slug}: agent.name "${c.agent.name}" does not match dir slug`);
    }
  }
  console.log(`  ✓ legal snapshot: ${legal.length} cookbooks match EXPECTED_LEGAL`);

  // Finance snapshot
  const finance = listFinance();
  diff(finance, EXPECTED_FINANCE, "EXPECTED_FINANCE");
  for (const slug of EXPECTED_FINANCE) {
    const c = loadFinance(slug);
    if (c.agent.name !== slug) {
      fail(`finance/${slug}: agent.name "${c.agent.name}" does not match dir slug`);
    }
  }
  console.log(`  ✓ finance snapshot: ${finance.length} cookbooks match EXPECTED_FINANCE`);
}

try {
  main();
} catch (err) {
  console.error("cookbook-snapshot.test FAIL:", (err as Error).message);
  process.exit(1);
}
