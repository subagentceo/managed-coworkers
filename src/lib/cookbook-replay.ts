/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Cookbook replay glue (REPLAY-7).
 *
 * Composes the cookbook-loader with the pollyjs replay-harness:
 * given a cookbook slug under one of the vendored packages, mint
 * the canonical cassette directory under cassettes/<package>/<slug>/
 * and return a started Polly + the loaded cookbook in one call.
 *
 * Callers stop() the Polly in a finally block exactly like with
 * createReplay(). No live network when mode='replay' AND the
 * cassette is on disk; no live network when no Anthropic call is
 * actually made.
 *
 * Why this layer exists: REPLAY-2/-3 proved the cookbook surface
 * loads. REPLAY-1 proved pollyjs boots. REPLAY-4 proved they coexist.
 * REPLAY-7 wires them so a test can say "replay the diligence-grid
 * cookbook" in one line. REPLAY-5 will land the actual recording
 * step on top; REPLAY-6 the workerd-internal interception.
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Polly } from "@pollyjs/core";

import {
  loadCookbookFrom,
  type LoadedCookbook,
} from "./cookbook-loader.js";
import { createReplay, type ReplayMode } from "./replay-harness.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

/** Vendored package directories whose cookbooks we know how to replay. */
export type CookbookPackage = "legal" | "finance";

const PACKAGE_TO_DIRS: Record<
  CookbookPackage,
  { cookbooksDir: string; cassetteRoot: string }
> = {
  legal: {
    cookbooksDir: resolve(
      REPO_ROOT,
      "packages",
      "claude-for-legal",
      "managed-agent-cookbooks",
    ),
    cassetteRoot: resolve(REPO_ROOT, "cassettes", "legal"),
  },
  finance: {
    cookbooksDir: resolve(
      REPO_ROOT,
      "packages",
      "financial-services",
      "managed-agent-cookbooks",
    ),
    cassetteRoot: resolve(REPO_ROOT, "cassettes", "finance"),
  },
};

export interface CookbookReplayOptions {
  /** Which vendored package the cookbook lives in. */
  package: CookbookPackage;
  /** Cookbook directory slug (e.g. "diligence-grid", "kyc-screener"). */
  slug: string;
  /** Pollyjs mode. Tests default to "replay". */
  mode: ReplayMode;
  /** Recording name within the cookbook's cassette directory. */
  recordingName: string;
}

export interface CookbookReplay {
  cookbook: LoadedCookbook;
  polly: Polly;
  /** Absolute path to the cassette directory for this cookbook. */
  cassetteDir: string;
}

/**
 * Load a cookbook and start a Polly pointing at its cassette dir.
 *
 * Caller MUST await `polly.stop()` to flush the cassette in record
 * mode and detach the http adapter in any mode.
 */
export function createCookbookReplay(
  opts: CookbookReplayOptions,
): CookbookReplay {
  const dirs = PACKAGE_TO_DIRS[opts.package];
  const cookbook = loadCookbookFrom(dirs.cookbooksDir, opts.slug);
  const cassetteDir = resolve(dirs.cassetteRoot, opts.slug);
  const polly = createReplay({
    recordingName: opts.recordingName,
    mode: opts.mode,
    cassetteDir,
  });
  return { cookbook, polly, cassetteDir };
}
