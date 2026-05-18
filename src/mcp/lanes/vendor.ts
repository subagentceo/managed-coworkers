/**
 * Bridge lane: vendor mirror.
 *
 * Tools:
 *   vendor_list    - list known vendors + per-vendor URL count + freshness
 *   vendor_fetch   - fetch a doc body. Local mirror first; HTTP fallback.
 *   vendor_grep    - case-insensitive line-grep across the local mirror.
 *   vendor_refresh - run Crawlee against {vendor}; return CrawlResult summary.
 *
 * vendor_refresh is the programmatic-tool-calling entrypoint per
 * vendor/anthropics/anthropic-sitemap/engineering/code-execution-with-mcp.md:
 * the whole crawl pipeline (discover → filter → preflight → crawl →
 * transform → persist) runs inside one tool_use; the agent only sees the
 * structured summary, not the per-page fetches.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { spawn } from "node:child_process";
import { fetchText, jsonResult } from "../bridge-utils.js";
import { loadVendorManifests, vendorRoot } from "../../lib/vendor-manifests.js";
import { urlFor, vendorMirror } from "../../lib/vendor-mirror.js";

interface VendorListEntry {
  name: string;
  llms_txt?: string;
  last_crawled?: string;
  url_count: number;
  /** Path to vendor-level GUIDANCE.md if present. Surfaces load-bearing
   * directives from the vendor's llms.txt header (e.g. Stripe's "never
   * recommend the Charges API"). Agents should read this file BEFORE
   * recommending any API from this vendor. */
  guidance?: string;
}

interface VendorGrepHit {
  vendor: string;
  url?: string;
  relPath: string;
  line_no: number;
  line: string;
}

function* walkMd(dir: string): Generator<string> {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMd(full);
    } else if (entry.isFile() && (extname(entry.name) === ".md" || extname(entry.name) === ".mdx" || extname(entry.name) === ".txt")) {
      yield full;
    }
  }
}

export function registerVendor(server: McpServer): void {
  server.tool(
    "vendor_list",
    "List the vendors mirrored under vendor/. Each entry includes the discovered llms.txt URL, last crawl timestamp, and the count of URLs in the runtime allowlist.",
    {},
    async () => {
      const out: VendorListEntry[] = [];
      for (const [name, m] of loadVendorManifests()) {
        const entry: VendorListEntry = { name, url_count: m.urlSet.size };
        if (m.llms_txt !== undefined) entry.llms_txt = m.llms_txt;
        if (m.lastCrawled !== undefined) entry.last_crawled = m.lastCrawled.toISOString();
        // Surface vendor-level GUIDANCE.md if present — load-bearing
        // directives extracted from llms.txt header that the per-page
        // mirror doesn't preserve.
        const guidancePath = resolve(vendorRoot(), name, "GUIDANCE.md");
        if (existsSync(guidancePath)) {
          entry.guidance = `vendor/${name}/GUIDANCE.md`;
        }
        out.push(entry);
      }
      return jsonResult({ vendors: out });
    }
  );

  server.tool(
    "vendor_fetch",
    "Fetch a vendor doc by URL. Returns local mirror body when available (source:'mirror'); otherwise falls back to live HTTP (source:'http'). The URL must be in some vendor's allowlist (see vendor_list).",
    { url: z.string().url() },
    async ({ url }) => {
      const mirror = vendorMirror(url);
      if (mirror) {
        // Surface vendor-level GUIDANCE.md as a sibling field if present.
        // Agents fetching deprecated API pages (e.g. Stripe Sources/Charges)
        // need the directives from llms.txt header, not just the page itself.
        const guidancePath = resolve(vendorRoot(), mirror.vendor, "GUIDANCE.md");
        const guidance = existsSync(guidancePath)
          ? { path: `vendor/${mirror.vendor}/GUIDANCE.md`, must_read: true }
          : undefined;
        return jsonResult({
          source: "mirror",
          vendor: mirror.vendor,
          url: mirror.url,
          relPath: mirror.relPath,
          content: mirror.body,
          ...(guidance && { guidance }),
        });
      }
      // Allowlist enforcement: only fall back to HTTP for URLs that AT
      // LEAST one vendor's allowlist contains. Otherwise reject.
      let allowed = false;
      for (const m of loadVendorManifests().values()) {
        if (m.urlSet.has(url)) {
          allowed = true;
          break;
        }
      }
      if (!allowed) {
        throw new Error(
          `vendor_fetch: ${url} is not in any vendor allowlist. Use vendor_list to discover vendors and re-run scripts/crawl-vendors.ts to broaden coverage.`
        );
      }
      const text = await fetchText(url);
      return jsonResult({ source: "http", url, content: text });
    }
  );

  server.tool(
    "vendor_grep",
    "Case-insensitive line-grep across the local vendor mirror. Optionally restrict to one vendor. Returns each hit with the vendor, original URL, mirror-relative path, line number, and the matching line.",
    {
      pattern: z.string().min(1),
      vendor: z.string().optional(),
      max_per_vendor: z.number().int().positive().max(200).default(50),
    },
    async ({ pattern, vendor, max_per_vendor }) => {
      const needle = pattern.toLowerCase();
      const out: VendorGrepHit[] = [];
      const targets = vendor
        ? [vendor]
        : Array.from(loadVendorManifests().keys());
      for (const v of targets) {
        const dir = resolve(vendorRoot(), v);
        if (!existsSync(dir)) continue;
        let count = 0;
        for (const file of walkMd(dir)) {
          if (count >= max_per_vendor) break;
          let body: string;
          try {
            const stat = statSync(file);
            if (stat.size > 5_000_000) continue; // skip giant files
            body = readFileSync(file, "utf8");
          } catch {
            continue;
          }
          const relPath = file.slice(dir.length + 1);
          const lines = body.split(/\r?\n/);
          for (let i = 0; i < lines.length; i += 1) {
            const line = lines[i];
            if (line === undefined) continue;
            if (line.toLowerCase().includes(needle)) {
              const url = urlFor(v, relPath);
              if (!url) continue;
              out.push({
                vendor: v,
                url,
                relPath,
                line_no: i + 1,
                line: line.length > 240 ? line.slice(0, 240) + "…" : line,
              });
              count += 1;
              if (count >= max_per_vendor) break;
            }
          }
        }
      }
      return jsonResult({ pattern, hits: out });
    }
  );

  server.tool(
    "vendor_refresh",
    "Refresh a vendor's local mirror by re-crawling its declared sources (llms.txt + html_index + sitemap_xml per vendor/<name>/crawl.json). Returns the full CrawlResult as structured JSON — vendor, pagesFetched, pagesSkipped, pagesUnchanged, preflight304/200, failures[]. The per-URL fetch loop runs inside this one tool_use; only the structured result enters context.",
    {
      vendor: z.string().min(1),
      dry_run: z.boolean().default(false),
    },
    async ({ vendor, dry_run }) => {
      const repoRoot = resolve(vendorRoot(), "..");
      const args = ["scripts/crawl-vendors.ts", "--vendor", vendor, "--json"];
      if (dry_run) args.push("--dry-run");
      return new Promise((resolveFn) => {
        const child = spawn("node_modules/.bin/tsx", args, { cwd: repoRoot });
        let stdout = "";
        let stderr = "";
        child.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
        child.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });
        child.on("close", (code: number) => {
          // Stdout is one JSON line in --json mode. Logs go to stderr.
          try {
            const parsed = JSON.parse(stdout.trim());
            const result = parsed.results?.[0];
            resolveFn(jsonResult({
              vendor,
              exit_code: code,
              result: result ?? null,
              ok: result ? result.failures.length === 0 : false,
            }));
          } catch (err) {
            resolveFn(jsonResult({
              vendor,
              exit_code: code,
              error: "failed to parse crawler JSON output",
              stdout_tail: stdout.split("\n").slice(-5).join("\n"),
              stderr_tail: stderr.split("\n").slice(-10).join("\n"),
            }));
          }
        });
      });
    }
  );
}
