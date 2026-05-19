#!/usr/bin/env tsx
/**
 * @cite seeds/citations/cloudflare-flagship.md
 *
 * redact-cassette CLI (REPLAY-13).
 *
 * Usage:
 *   npx tsx scripts/redact-cassette.ts cassettes/legal/diligence-grid/*.har
 *
 * In-place scrub. Idempotent. Run before committing any new
 * cassette to make sure Authorization headers + account-specific
 * identifiers are gone.
 */

import { redactHarFile } from "../src/lib/cassette-redact.js";

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("redact-cassette: usage: redact-cassette <path.har> [<path2.har> ...]");
    process.exit(2);
  }
  let touched = 0;
  for (const path of args) {
    redactHarFile(path);
    console.log(`  ✓ redacted ${path}`);
    touched += 1;
  }
  console.log(`redact-cassette: ${touched} file(s) processed`);
}

main();
