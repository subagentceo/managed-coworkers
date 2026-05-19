/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Finance replay managed-agent (REPLAY-3).
 *
 * Loads cookbooks from
 * packages/financial-services/managed-agent-cookbooks/ via the shared
 * cookbook-loader. Mirrors legal-replay-agent.ts; downstream PRs layer
 * the pollyjs cassette on top.
 *
 * No network, no SDK import, no env reads.
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  listCookbooksIn,
  loadCookbookFrom,
  type LoadedCookbook,
} from "./cookbook-loader.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const COOKBOOKS_DIR = resolve(
  REPO_ROOT,
  "packages",
  "financial-services",
  "managed-agent-cookbooks",
);

export type {
  CookbookManifest,
  SubagentManifest,
  LoadedCookbook,
} from "./cookbook-loader.js";

export function listCookbooks(): string[] {
  return listCookbooksIn(COOKBOOKS_DIR);
}

export function loadCookbook(slug: string): LoadedCookbook {
  return loadCookbookFrom(COOKBOOKS_DIR, slug);
}
