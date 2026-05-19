/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Fetch-layer replay (REPLAY-16) — closes the OREPLAY14 leak.
 *
 * pollyjs's node-http adapter does NOT intercept Node 18+ global
 * `fetch` or `https.request`. The cookbook-replay-failclosed canary
 * proved that replay-only tests using fetch leak past pollyjs and
 * hit live Anthropic.
 *
 * This module is the supplement: undici's MockAgent intercepts at
 * the right layer. CRITICAL NUANCE discovered empirically on Node
 * 24.13.0 (2026-05-18):
 *
 *   - undici's MockAgent only intercepts requests that go through
 *     the global undici dispatcher.
 *   - Node 24's BUILT-IN `globalThis.fetch` does NOT use that
 *     dispatcher — it's a separate impl. Tests that call global
 *     fetch leak past MockAgent.
 *   - undici's OWN `fetch` export (`import { fetch } from "undici"`)
 *     DOES use the global dispatcher and is intercepted correctly.
 *
 * Therefore: replay-only managed-agents MUST use `replayFetch`
 * (exported here, sourced from undici) for outbound calls, not
 * global fetch. The Anthropic SDK exposes a `fetch` config option
 * — wire `replayFetch` there.
 *
 * Public surface:
 *   createFetchReplay()                — install MockAgent globally
 *   replayFetch                        — undici.fetch (use this, not global)
 *   intercept(origin, path, method)    — register a recorded response
 *   teardown()                         — restore default dispatcher
 */

import {
  MockAgent,
  setGlobalDispatcher,
  getGlobalDispatcher,
  fetch as undiciFetch,
  type Dispatcher,
} from "undici";

/**
 * Replay-safe fetch. ALWAYS use this in chassis test code that needs
 * to be intercepted by createFetchReplay() — global fetch leaks.
 */
export const replayFetch = undiciFetch;

let installedAgent: MockAgent | null = null;
let previousDispatcher: Dispatcher | null = null;

export interface FetchReplayHandle {
  agent: MockAgent;
  /**
   * Register a recorded response for an exact origin+path+method.
   * Returns the interceptor so the caller can attach .reply() etc.
   */
  intercept: (
    origin: string,
    path: string,
    method?: string,
  ) => ReturnType<ReturnType<MockAgent["get"]>["intercept"]>;
  /** Restore the previous global dispatcher. Always await this. */
  teardown: () => Promise<void>;
}

/**
 * Install a MockAgent as the global undici dispatcher. The mock
 * refuses ANY undici-routed request that hasn't been explicitly
 * `intercept()`ed — fail-closed when callers use `replayFetch`.
 */
export function createFetchReplay(): FetchReplayHandle {
  if (installedAgent) {
    throw new Error(
      "createFetchReplay: already installed — call teardown() first",
    );
  }
  previousDispatcher = getGlobalDispatcher();
  const agent = new MockAgent();
  agent.disableNetConnect();
  setGlobalDispatcher(agent);
  installedAgent = agent;
  return {
    agent,
    intercept: (origin, path, method = "GET") => {
      return agent.get(origin).intercept({ path, method });
    },
    teardown: async () => {
      if (!installedAgent) return;
      await installedAgent.close();
      if (previousDispatcher) {
        setGlobalDispatcher(previousDispatcher);
        previousDispatcher = null;
      }
      installedAgent = null;
    },
  };
}
