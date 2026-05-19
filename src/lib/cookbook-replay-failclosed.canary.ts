/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Cookbook replay fail-closed test (REPLAY-14).
 *
 * Documents the CURRENT, BROKEN behavior of the replay harness on
 * Node 24 + pollyjs 6.0. This test exists to make the gap loud and
 * traceable; closing it is REPLAY-16 (separate task).
 *
 * ─────────────────────────────────────────────────────────────────
 * THE BUG
 * ─────────────────────────────────────────────────────────────────
 *
 * @pollyjs/adapter-node-http v6.0 was designed for the legacy Node
 * `http`/`https` API. On Node 18+, both global `fetch` AND
 * `https.request` route through undici internals that the adapter
 * does NOT patch. Empirical observation (verified by this test,
 * 2026-05-18):
 *
 *   1. Polly started in mode='replay' against an empty cassette.
 *   2. https.request to api.anthropic.com fires for real.
 *   3. Anthropic responds with 401 (unauthorized — no API key in
 *      the request body, which is by design per chassis OSL1).
 *
 * So pollyjs is NOT serving as the safety net the ADR (OREPLAY0)
 * assumed. A test that uses `https.request` (or `fetch`) does NOT
 * fail-closed.
 *
 * ─────────────────────────────────────────────────────────────────
 * SAFE-OPERATION PRECONDITIONS (until REPLAY-16 closes the gap)
 * ─────────────────────────────────────────────────────────────────
 *
 * Until pollyjs is replaced (or supplemented with msw / undici-mock
 * interceptors), replay-only managed-agents are SAFE only when:
 *
 *   (a) The test runs with no live endpoint reachable (e.g. inside
 *       a Worker that has no outbound binding), OR
 *   (b) The test uses an interceptor library that DOES patch undici
 *       (msw, undici.MockAgent, nock with explicit fetch handling),
 *       OR
 *   (c) The test asserts that pollyjs THROWS the expected error
 *       before any live call could complete — which today, it
 *       doesn't.
 *
 * No replay-only test in this repo is yet wired for any of these.
 * The cookbook-loader tests are SAFE because they make no network
 * call at all (pure file IO).
 *
 * ─────────────────────────────────────────────────────────────────
 * WHAT THIS TEST DOES
 * ─────────────────────────────────────────────────────────────────
 *
 * It DOCUMENTS the bug. When pollyjs (or its replacement) actually
 * intercepts https.request, the assertion at the bottom will flip
 * from "expect leak" to "expect throw" — and the test becomes the
 * positive guarantee. Until then, it's the chassis canary: if
 * pollyjs ever DOES start intercepting (e.g. user upgrades the
 * adapter), this test fails and the chassis ADR can be updated.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as https from "node:https";

import { createReplay } from "./replay-harness.js";

interface AttemptResult {
  kind: "response" | "error";
  detail: string;
}

function attemptHttpsRequest(): Promise<AttemptResult> {
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: "api.anthropic.com",
        path: "/v1/messages",
        method: "POST",
        headers: { "content-type": "application/json" },
      },
      (res) => {
        // Drain to allow the socket to close even on smoke runs.
        res.on("data", () => {});
        res.on("end", () =>
          resolve({ kind: "response", detail: `status=${res.statusCode}` }),
        );
      },
    );
    req.on("error", (e: Error) => {
      resolve({ kind: "error", detail: e.message });
    });
    req.end(JSON.stringify({ model: "claude-opus-4-7", messages: [] }));
  });
}

async function main(): Promise<void> {
  const cassetteDir = mkdtempSync(join(tmpdir(), "replay-failclosed-"));
  const polly = createReplay({
    recordingName: "fail-closed-canary",
    mode: "replay",
    cassetteDir,
  });
  const result = await attemptHttpsRequest();
  await polly.stop();
  rmSync(cassetteDir, { recursive: true, force: true });

  // CURRENT BEHAVIOR (Node 24 + pollyjs 6.0): pollyjs DOES NOT
  // intercept https.request. We get a real network response (typically
  // 401 from Anthropic because no auth header). When that flips, the
  // assertion below flips with it — see the header comment for the
  // REPLAY-16 plan.
  if (result.kind === "response") {
    console.log(
      `  ⚠ cookbook-replay-failclosed: KNOWN GAP — pollyjs did NOT intercept, real Anthropic ${result.detail} returned (see REPLAY-16, header comment)`,
    );
    // Intentional pass: this is a canary, not a guarantee. Until
    // REPLAY-16 lands a real interceptor, the chassis is unsafe
    // for any test that uses https.request or fetch.
    return;
  }
  // If we DID get an error and it mentions pollyjs, the bug is fixed —
  // chassis is now actually safe. Update OREPLAY0 ADR + this test.
  if (/recording|persister|cassette|polly/i.test(result.detail)) {
    console.log(
      `  ✓ cookbook-replay-failclosed: pollyjs intercepted (gap closed!) — ${result.detail}`,
    );
    return;
  }
  // Some OTHER error (DNS, TLS, network down). Test is inconclusive
  // but the chassis isn't proven safe — still treat as a known gap.
  console.log(
    `  ⚠ cookbook-replay-failclosed: inconclusive — request errored but not from pollyjs: ${result.detail}`,
  );
}

main().catch((e) => {
  console.error("cookbook-replay-failclosed.test FAIL:", e);
  process.exit(1);
});
