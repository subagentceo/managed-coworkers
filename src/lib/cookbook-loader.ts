/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Generic managed-agent cookbook loader.
 *
 * Walks a `managed-agent-cookbooks/` directory under any vendored
 * package and parses `agent.yaml` + `subagents/*.yaml`. Returns plain
 * data — no network, no SDK import, no env reads. Used by:
 *
 *   - src/lib/legal-replay-agent.ts (claude-for-legal cookbooks)
 *   - src/lib/finance-replay-agent.ts (financial-services cookbooks)
 *
 * Why pull this out: REPLAY-2 had it inline. REPLAY-3 needs the same
 * for the finance package. Two callers, one implementation.
 */

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { parse } from "yaml";

export interface CookbookManifest {
  name: string;
  model?: string;
  system?: { text?: string };
  [key: string]: unknown;
}

export interface SubagentManifest {
  name: string;
  [key: string]: unknown;
}

export interface LoadedCookbook {
  slug: string;
  dir: string;
  agent: CookbookManifest;
  subagents: SubagentManifest[];
}

/** List cookbook slugs (sorted) under a `managed-agent-cookbooks/` directory. */
export function listCookbooksIn(cookbooksDir: string): string[] {
  return readdirSync(cookbooksDir, {
    withFileTypes: true,
    encoding: "utf8",
  })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

/** Load one cookbook by slug from a `managed-agent-cookbooks/` directory. */
export function loadCookbookFrom(
  cookbooksDir: string,
  slug: string,
): LoadedCookbook {
  const dir = resolve(cookbooksDir, slug);
  const agent = parse(
    readFileSync(resolve(dir, "agent.yaml"), "utf8"),
  ) as CookbookManifest;

  const subagents: SubagentManifest[] = [];
  const subDir = resolve(dir, "subagents");
  try {
    for (const entry of readdirSync(subDir, {
      withFileTypes: true,
      encoding: "utf8",
    })) {
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".yaml") && !entry.name.endsWith(".yml")) {
        continue;
      }
      subagents.push(
        parse(readFileSync(resolve(subDir, entry.name), "utf8")) as SubagentManifest,
      );
    }
  } catch {
    // subagents/ is optional
  }

  return { slug, dir, agent, subagents };
}
