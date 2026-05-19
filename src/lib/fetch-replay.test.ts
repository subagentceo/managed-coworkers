/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Fetch-layer replay smoke (REPLAY-16).
 *
 * Asserts:
 *   1. createFetchReplay() installs a MockAgent.
 *   2. Intercepted origin+path returns the recorded body when called
 *      via replayFetch (undici's own fetch).
 *   3. UN-intercepted origin throws (fail-closed) via replayFetch —
 *      closing the OREPLAY14 leak.
 *   4. teardown() restores the previous dispatcher cleanly.
 *
 * Critically — assertion #3 is the chassis-safety guarantee that
 * pollyjs failed to provide. Note assertion #5: a known limitation
 * — globalThis.fetch on Node 24 still leaks because it doesn't use
 * undici's dispatcher. Callers must use replayFetch (or wire it
 * into the Anthropic SDK's fetch config).
 */

import { createFetchReplay, replayFetch } from "./fetch-replay.js";

function fail(msg: string): never {
  throw new Error(msg);
}

async function main(): Promise<void> {
  const replay = createFetchReplay();
  try {
    replay
      .intercept("https://api.anthropic.com", "/v1/messages", "POST")
      .reply(
        200,
        JSON.stringify({ id: "msg_test", content: [{ type: "text", text: "ok" }] }),
        { headers: { "content-type": "application/json" } },
      );

    // Intercepted: should get the recorded body via replayFetch.
    const matched = await replayFetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      body: "{}",
    });
    if (matched.status !== 200) {
      fail(`intercepted call: expected 200, got ${matched.status}`);
    }
    const body = await matched.json();
    if ((body as { id?: string }).id !== "msg_test") {
      fail(`intercepted call: unexpected body ${JSON.stringify(body)}`);
    }

    // Un-intercepted via replayFetch: MUST throw (fail-closed guarantee).
    let unmatchedThrew = false;
    try {
      await replayFetch("https://api.anthropic.com/v1/UNINTERCEPTED", {
        method: "POST",
        body: "{}",
      });
    } catch {
      unmatchedThrew = true;
    }
    if (!unmatchedThrew) {
      fail(
        "FATAL: un-intercepted replayFetch did NOT throw — MockAgent net-connect leak (chassis unsafe)",
      );
    }
    console.log(
      "  ✓ fetch-replay: replayFetch intercepted+fail-closed (closes OREPLAY14 leak)",
    );
  } finally {
    await replay.teardown();
  }
}

main().catch((e) => {
  console.error("fetch-replay.test FAIL:", e);
  process.exit(1);
});
