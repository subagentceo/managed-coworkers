/**
 * @cite vendor/pollyjs is NOT a vendor we have — pollyjs docs at
 *   https://netflix.github.io/pollyjs/ are upstream. The README inside
 *   packages/claude-api-skill/typescript/managed-agents/ teaches the
 *   patterns this harness will eventually replay.
 *
 * Replay harness (REPLAY-1).
 *
 * Tiny wrapper around @pollyjs/core + adapter-node-http + persister-fs.
 * Boots a Polly instance in record/replay/passthrough mode against
 * cassettes on disk so managed-agents tests can run with no
 * ANTHROPIC_API_KEY and no CLAUDE_CODE_OAUTH_TOKEN.
 *
 * Why this exists: OSL1 forbids ANTHROPIC_API_KEY in src/, and the
 * 24-hour autonomous loop is moving the chassis toward replay-only.
 * REPLAY-2/-3 build legal + finance managed-agents on top of this.
 *
 * Public surface intentionally small: createReplay(mode, cassetteDir).
 * Callers stop() it in a finally block. No globals, no env reads —
 * mode is passed in by the test, not read from process.env.
 */

import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

import { Polly, type MODE } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

export type ReplayMode = "record" | "replay" | "passthrough";

export interface ReplayOptions {
  /** Cassette name. Becomes <cassetteDir>/<name>_<recordingName>.har. */
  recordingName: string;
  /** record = hit network, write cassette. replay = no network, fail
   *  if cassette missing. passthrough = hit network, write nothing. */
  mode: ReplayMode;
  /** Absolute path to the directory cassettes live in. */
  cassetteDir: string;
}

const POLLY_MODE: Record<ReplayMode, MODE> = {
  record: "record",
  replay: "replay",
  passthrough: "passthrough",
};

/**
 * Boot a Polly instance. Caller MUST `await polly.stop()` to flush the
 * cassette to disk (in record mode) and detach the http adapter.
 */
export function createReplay(opts: ReplayOptions): Polly {
  if (!existsSync(opts.cassetteDir)) {
    mkdirSync(opts.cassetteDir, { recursive: true });
  }
  const polly = new Polly(opts.recordingName, {
    mode: POLLY_MODE[opts.mode],
    adapters: ["node-http"],
    persister: "fs",
    persisterOptions: {
      fs: {
        recordingsDir: resolve(opts.cassetteDir),
      },
    },
    recordFailedRequests: true,
    matchRequestsBy: {
      method: true,
      url: true,
      // We don't match on headers because Anthropic responses include
      // a unique request_id; matching on body keeps replay stable
      // across runs with identical inputs.
      headers: false,
      body: true,
    },
  });
  return polly;
}
