/**
 * @cite vendor/commonmark-spec/spec.txt
 * @cite rubrics/md-quality-v1.md
 *
 * Deterministic file sampler (MD6).
 *
 * Walks a vendor directory recursively, collects all `.md` files,
 * and returns a deterministic subset of `sample` files based on a
 * stable hash sort (so the same (root, seed) → the same files,
 * which is critical for cassette-style replay testing and for
 * stable baselines across reruns).
 *
 * sample=0 → return ALL files.
 */

import { createHash } from "node:crypto";
import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

export interface SampleOptions {
  root: string;
  sample: number;
  seed: number;
}

const SKIP_NAMES = new Set([
  "node_modules",
  ".git",
  ".meta",
  "test",
]);

function* walk(dir: string): Generator<string> {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true, encoding: "utf8" });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_NAMES.has(entry.name)) continue;
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      yield full;
    }
  }
}

function sortKey(path: string, seed: number): string {
  return createHash("sha1").update(`${seed}::${path}`).digest("hex");
}

export function sampleMarkdownFiles(opts: SampleOptions): string[] {
  let all: string[] = [];
  try {
    statSync(opts.root); // throws if dir absent
    all = Array.from(walk(opts.root));
  } catch {
    return [];
  }
  if (opts.sample <= 0 || all.length <= opts.sample) {
    return all.sort();
  }
  // Stable-hash sort + take first N for deterministic sampling.
  return all
    .map((p) => ({ p, k: sortKey(p, opts.seed) }))
    .sort((a, b) => a.k.localeCompare(b.k))
    .slice(0, opts.sample)
    .map((x) => x.p);
}
