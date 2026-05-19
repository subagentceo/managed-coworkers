/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Legal replay managed-agent (REPLAY-2).
 *
 * Loads a cookbook from packages/claude-for-legal/managed-agent-cookbooks/
 * and constructs the run plan WITHOUT making any HTTP call. This is the
 * first mergeable step toward replay-only managed-agents — it proves the
 * cookbook surface is parseable from inside src/ and that downstream PRs
 * can layer the pollyjs cassette + miniflare worker on top.
 *
 * Operator's 48-hour directive: no ANTHROPIC_API_KEY, no
 * CLAUDE_CODE_OAUTH_TOKEN. We deliberately don't import the Anthropic
 * SDK here — that import path is what would trigger the OSL1 OAuth-only
 * checks. When the cassette layer lands (REPLAY-2b), the SDK call goes
 * through pollyjs replay.
 *
 * (Cite headers point at chassis-internal seeds; the upstream URL for
 *  the managed-agents cookbook format lives in
 *  packages/claude-for-legal/managed-agent-cookbooks/README.md.)
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const COOKBOOKS_DIR = resolve(
  REPO_ROOT,
  "packages",
  "claude-for-legal",
  "managed-agent-cookbooks",
);

export interface CookbookManifest {
  name: string;
  model?: string;
  system?: { text?: string };
  /** Top-level keys we don't model strictly — passed through. */
  [key: string]: unknown;
}

export interface SubagentManifest {
  name: string;
  [key: string]: unknown;
}

export interface LoadedCookbook {
  /** Directory name under managed-agent-cookbooks/. */
  slug: string;
  /** Absolute path to the cookbook directory. */
  dir: string;
  /** Parsed agent.yaml. */
  agent: CookbookManifest;
  /** Parsed subagents/*.yaml. */
  subagents: SubagentManifest[];
}

/** Names of cookbooks available under packages/claude-for-legal/. */
export function listCookbooks(): string[] {
  return readdirSync(COOKBOOKS_DIR, { withFileTypes: true, encoding: "utf8" })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

/** Load a cookbook by slug. Pure file IO + YAML parse, no network. */
export function loadCookbook(slug: string): LoadedCookbook {
  const dir = resolve(COOKBOOKS_DIR, slug);
  const agentYaml = readFileSync(resolve(dir, "agent.yaml"), "utf8");
  const agent = parse(agentYaml) as CookbookManifest;

  const subagents: SubagentManifest[] = [];
  const subDir = resolve(dir, "subagents");
  try {
    for (const entry of readdirSync(subDir, {
      withFileTypes: true,
      encoding: "utf8",
    })) {
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".yaml") && !entry.name.endsWith(".yml")) continue;
      const body = readFileSync(resolve(subDir, entry.name), "utf8");
      subagents.push(parse(body) as SubagentManifest);
    }
  } catch {
    // subagents/ is optional; some cookbooks may be flat.
  }

  return { slug, dir, agent, subagents };
}
