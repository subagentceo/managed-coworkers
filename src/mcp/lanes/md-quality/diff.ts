/**
 * Bridge lane: md-quality diff (MD9).
 *
 * Tool:
 *   md_quality_diff - score a sample of vendor markdown files at two git
 *                     shas WITHOUT a worktree checkout. Surfaces the
 *                     before/after score delta plus top regressions and
 *                     improvements.
 *
 * Mechanism:
 *   For each sampled path (deterministic hash-sort sample of files under
 *   vendor/<vendor>/ on disk), call `git show <sha>:<relpath>` for both
 *   shas. If the file did not exist at a sha (`git show` fails), skip
 *   that path — partial-history vendors don't crash the diff.
 *
 *   Both versions are graded with gradeMarkdown(). Mean is the average
 *   of per-file scores; per-file delta = after - before; regressions =
 *   files with delta < 0 sorted ascending; improvements = delta > 0
 *   sorted descending. Top-5 of each is returned.
 *
 * Token budget: ≤1500 tokens (5 regressions + 5 improvements + 6 scalar
 * fields — well under).
 *
 * Citations (in diff.test.ts):
 *   @cite vendor/commonmark-spec/spec.txt
 *   @cite rubrics/md-quality-v1.md
 *   @cite seeds/posture/session-start.xml
 *
 * Outcome: OMDQ9 / MD9.
 */
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../../bridge-utils.js";
import { gradeMarkdown } from "../../../lib/md-quality/index.js";
import { sampleMarkdownFiles } from "../../../lib/md-quality/sample.js";

export interface FileDelta {
  path: string;
  before: number;
  after: number;
  delta: number;
}

export interface DiffResult {
  vendor: string;
  before_sha: string;
  after_sha: string;
  sampled: number;
  scored: number;
  before_mean: number;
  after_mean: number;
  delta: number;
  regressions: FileDelta[];
  improvements: FileDelta[];
}

function repoRoot(): string {
  // src/mcp/lanes/md-quality/diff.ts → repo root is 4 levels up.
  return resolve(new URL("../../../../", import.meta.url).pathname);
}

/**
 * Try `git show <sha>:<relpath>` and return the body. Returns null when
 * git exits non-zero (file absent at that sha, sha invalid, etc.).
 */
function gitShow(sha: string, relpath: string, cwd: string): string | null {
  try {
    return execFileSync("git", ["show", `${sha}:${relpath}`], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 16 * 1024 * 1024,
    });
  } catch {
    return null;
  }
}

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  const s = xs.reduce((a, b) => a + b, 0);
  return Math.round((s / xs.length) * 100) / 100;
}

export interface DiffOptions {
  vendor: string;
  before_sha: string;
  after_sha: string;
  sample_size?: number;
  /** Optional override for tests. */
  cwd?: string;
}

export function mdQualityDiff(opts: DiffOptions): DiffResult {
  const cwd = opts.cwd ?? repoRoot();
  const sampleSize = opts.sample_size ?? 10;
  const vendorDir = resolve(cwd, "vendor", opts.vendor);

  // Deterministic sample of paths currently on disk under vendor/<name>/.
  // We sample on disk (not from git tree) because the on-disk mirror is
  // the canonical source of "what files this vendor has."
  const absPaths = sampleMarkdownFiles({
    root: vendorDir,
    sample: sampleSize,
    seed: 1,
  });

  const rels = absPaths.map((p) =>
    p.startsWith(cwd + "/") ? p.slice(cwd.length + 1) : p,
  );

  const beforeScores: number[] = [];
  const afterScores: number[] = [];
  const perFile: FileDelta[] = [];

  for (const rel of rels) {
    const beforeBody = gitShow(opts.before_sha, rel, cwd);
    const afterBody = gitShow(opts.after_sha, rel, cwd);
    if (beforeBody === null || afterBody === null) continue;
    const before = gradeMarkdown(beforeBody).score;
    const after = gradeMarkdown(afterBody).score;
    beforeScores.push(before);
    afterScores.push(after);
    perFile.push({ path: rel, before, after, delta: after - before });
  }

  const before_mean = mean(beforeScores);
  const after_mean = mean(afterScores);

  const regressions = perFile
    .filter((f) => f.delta < 0)
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 5);
  const improvements = perFile
    .filter((f) => f.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 5);

  return {
    vendor: opts.vendor,
    before_sha: opts.before_sha,
    after_sha: opts.after_sha,
    sampled: rels.length,
    scored: perFile.length,
    before_mean,
    after_mean,
    delta: Math.round((after_mean - before_mean) * 100) / 100,
    regressions,
    improvements,
  };
}

export function registerMdQualityDiff(server: McpServer): void {
  server.tool(
    "md_quality_diff",
    "Score a deterministic sample of vendor markdown files at two git shas WITHOUT checking out a worktree. Returns before/after mean scores, the composite delta, plus top-5 regressions and improvements. Files absent at either sha are skipped. Useful for grading crawler refreshes or content-pipeline changes commit-over-commit.",
    {
      vendor: z.string().min(1),
      before_sha: z.string().min(4),
      after_sha: z.string().min(4),
      sample_size: z.number().int().positive().max(200).default(10),
    },
    async ({ vendor, before_sha, after_sha, sample_size }) => {
      const result = mdQualityDiff({
        vendor,
        before_sha,
        after_sha,
        sample_size,
      });
      return jsonResult(result);
    },
  );
}
