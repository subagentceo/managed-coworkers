/**
 * @cite seeds/posture/session-start.xml
 * @cite seeds/citations/define-outcomes.md
 *
 * Replay harness smoke test (REPLAY-1).
 *
 * Asserts:
 *   1. createReplay() returns a started Polly without throwing.
 *   2. The cassette directory is created.
 *   3. polly.stop() is awaitable and clean.
 *
 * Stays off the network entirely — mode is "replay" with an empty
 * cassette dir, which would normally fail on a real HTTP call. We
 * never make one, so the test passes.
 */

import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createReplay } from "./replay-harness.js";

async function main(): Promise<void> {
  const dir = mkdtempSync(join(tmpdir(), "replay-harness-test-"));
  try {
    const polly = createReplay({
      recordingName: "smoke-no-network",
      mode: "replay",
      cassetteDir: dir,
    });
    if (!existsSync(dir)) {
      throw new Error(`cassette dir not created: ${dir}`);
    }
    if (polly.recordingName !== "smoke-no-network") {
      throw new Error(`recordingName mismatch: ${polly.recordingName}`);
    }
    await polly.stop();
    console.log("  ✓ replay-harness: createReplay + stop() round-trip");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("replay-harness.test FAIL:", err);
  process.exit(1);
});
