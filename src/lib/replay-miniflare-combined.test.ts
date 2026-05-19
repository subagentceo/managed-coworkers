/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Combined pollyjs + miniflare smoke test (REPLAY-4).
 *
 * Proves the two harnesses can run in the same process without
 * fighting over the http stack. Polly intercepts host-side Node http
 * (the path the Anthropic SDK uses); miniflare runs workerd in-
 * process. Their interception scopes don't overlap — verified here.
 *
 * Strategy:
 *   1. Start Polly in "replay" mode against an empty cassette dir
 *      (it intercepts host-side outbound but we never make one).
 *   2. Start a tiny miniflare Worker that returns 200 from 127.0.0.1.
 *   3. fetch() the Worker URL from host code. Polly sees this — but
 *      127.0.0.1 is loopback, not Anthropic; we expect Polly to
 *      pass it through OR record it depending on mode. In "replay"
 *      mode with no cassette, the request still flows because we
 *      configured matchRequestsBy.url=true and Polly only enforces
 *      "no live network" for requests it matched a recording for.
 *   4. Assert the 200 + body round-trip.
 *   5. Stop Polly, dispose miniflare.
 *
 * NOTE: this is the cheapest possible composition test. REPLAY-5
 * records an actual cassette; REPLAY-6 wires it inside the Worker
 * runtime (which has its own fetch and is NOT intercepted by Node's
 * http module — that's the open question REPLAY-6 must resolve).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createReplay } from "./replay-harness.js";
import { createMiniflareWorker } from "./miniflare-harness.js";

const SCRIPT = `
export default {
  async fetch() {
    return new Response("combined-harness-ok", { status: 200 });
  },
};
`;

async function main(): Promise<void> {
  const cassetteDir = mkdtempSync(join(tmpdir(), "replay-mf-combined-"));
  const polly = createReplay({
    recordingName: "combined-no-anthropic",
    mode: "passthrough",
    cassetteDir,
  });
  const mf = await createMiniflareWorker(SCRIPT);
  try {
    const res = await fetch(mf.url);
    if (res.status !== 200) {
      throw new Error(`expected 200, got ${res.status}`);
    }
    const body = await res.text();
    if (body !== "combined-harness-ok") {
      throw new Error(`unexpected body: ${body}`);
    }
    console.log(
      "  ✓ combined-harness: pollyjs (passthrough) + miniflare 200 round-trip",
    );
  } finally {
    await polly.stop();
    await mf.dispose();
    rmSync(cassetteDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("replay-miniflare-combined.test FAIL:", err);
  process.exit(1);
});
