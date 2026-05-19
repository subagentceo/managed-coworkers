/**
 * @cite vendor/cloudflare/developers.cloudflare.com/workers/testing/miniflare/index.md
 * @cite seeds/posture/session-start.xml
 *
 * Miniflare harness smoke test (MINIFLARE-1).
 *
 * Asserts that createMiniflareWorker() boots an in-process workerd,
 * answers a GET, and disposes cleanly. No live network — fetch hits
 * 127.0.0.1.
 */

import { createMiniflareWorker } from "./miniflare-harness.js";

const SCRIPT = `
export default {
  async fetch(request, env, ctx) {
    return new Response("hello from miniflare", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  },
};
`;

async function main(): Promise<void> {
  const harness = await createMiniflareWorker(SCRIPT);
  try {
    const res = await fetch(harness.url);
    if (res.status !== 200) {
      throw new Error(`expected 200, got ${res.status}`);
    }
    const body = await res.text();
    if (body !== "hello from miniflare") {
      throw new Error(`unexpected body: ${body}`);
    }
    console.log("  ✓ miniflare-harness: boot + GET + dispose round-trip");
  } finally {
    await harness.dispose();
  }
}

main().catch((err) => {
  console.error("miniflare-harness.test FAIL:", err);
  process.exit(1);
});
