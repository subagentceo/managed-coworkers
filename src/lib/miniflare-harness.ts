/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Miniflare harness (MINIFLARE-1).
 *
 * (Miniflare docs are not yet mirrored under vendor/. TODO: crawl
 *  developers.cloudflare.com/workers/testing/miniflare/ via Crawlee
 *  and re-point the cite. The chassis-level citation roots (vendor/,
 *  seeds/, rubrics/) are what citation-guard enforces; an upstream
 *  URL belongs in the body comment, not the @cite header.)
 *
 * Thin wrapper around `miniflare` that boots a workerd instance in-
 * process so tests can hit a Worker URL without `wrangler dev`.
 *
 * Public surface intentionally small: createMiniflareWorker(script,
 * options?) returns { url, dispose }. Caller awaits dispose() to free
 * the workerd socket.
 *
 * Why this exists: REPLAY-2/-3 want to run legal + finance plugins
 * inside a simulated Worker without deploying. Combined with the
 * pollyjs harness (OREPLAY1), a Worker test can run end-to-end with
 * no live network, no ANTHROPIC_API_KEY, no CLAUDE_CODE_OAUTH_TOKEN.
 */

import { Miniflare, type MiniflareOptions } from "miniflare";

export interface MiniflareHarness {
  /** The local URL the worker is listening on (http://127.0.0.1:<random>). */
  url: URL;
  /** Stop the workerd subprocess. Always await this in a finally block. */
  dispose: () => Promise<void>;
  /** Underlying instance, for advanced use (bindings, KV, R2). */
  mf: Miniflare;
}

/**
 * Boot a miniflare worker from inline ES-module script source.
 *
 * Caller is responsible for `await harness.dispose()` to release the
 * workerd port — leaks cause "EADDRINUSE" on next test run.
 */
export async function createMiniflareWorker(
  script: string,
  extra?: Partial<MiniflareOptions>,
): Promise<MiniflareHarness> {
  const mf = new Miniflare({
    modules: true,
    script,
    compatibilityDate: "2026-01-01",
    compatibilityFlags: ["nodejs_compat"],
    ...extra,
  });
  const url = await mf.ready;
  return {
    url,
    mf,
    dispose: () => mf.dispose(),
  };
}
