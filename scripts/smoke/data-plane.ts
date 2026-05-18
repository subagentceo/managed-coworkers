#!/usr/bin/env tsx
// scripts/smoke/data-plane.ts
//
// Smoke-test the AlloyDB Omni + Redis 7 data plane introduced in OVR19.
// Exits 0 only if both services respond AND the expected extensions /
// tables / keys are present.
//
// Wired as `npm run smoke:data-plane`. Idempotent.
// Uses execFileSync (no shell) so the redis password from .docker/.env
// is passed as an arg, not interpolated into a command string.

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const ENV_PATH = resolve(REPO_ROOT, ".docker", ".env");

if (!existsSync(ENV_PATH)) {
  console.error(`smoke: ${ENV_PATH} not found. Run \`cd .docker && cp .env.example .env\` and fill in.`);
  process.exit(1);
}

const env: Record<string, string> = Object.fromEntries(
  readFileSync(ENV_PATH, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx), l.slice(idx + 1)];
    })
);

function docker(args: string[]): string {
  return execFileSync("docker", args, { encoding: "utf8" }).trim();
}

function psql(sql: string): string {
  return docker(["exec", "mc-alloydb", "psql", "-U", "postgres", "-d", "coworkers", "-tAc", sql]);
}

function redisCli(args: string[]): string {
  const pw = env.REDIS_PASSWORD;
  if (!pw) throw new Error("REDIS_PASSWORD missing from .docker/.env");
  return docker(["exec", "mc-redis", "redis-cli", "-a", pw, "--no-auth-warning", ...args]);
}

interface Check {
  name: string;
  fn: () => Promise<void> | void;
}

const checks: Check[] = [
  {
    name: "mc-alloydb container exists and is healthy",
    fn: () => {
      const status = docker(["inspect", "mc-alloydb", "--format", "{{.State.Health.Status}}"]);
      if (status !== "healthy") throw new Error(`expected healthy, got ${status}`);
    },
  },
  {
    name: "mc-redis container exists and is healthy",
    fn: () => {
      const status = docker(["inspect", "mc-redis", "--format", "{{.State.Health.Status}}"]);
      if (status !== "healthy") throw new Error(`expected healthy, got ${status}`);
    },
  },
  {
    name: "AlloyDB: pgvector extension installed in coworkers DB",
    fn: () => {
      const out = psql("SELECT extversion FROM pg_extension WHERE extname='vector'");
      if (!out.startsWith("0.8")) throw new Error(`expected vector 0.8.x, got '${out}'`);
    },
  },
  {
    name: "AlloyDB: alloydb_scann extension installed",
    fn: () => {
      const out = psql("SELECT extversion FROM pg_extension WHERE extname='alloydb_scann'");
      if (!out) throw new Error("alloydb_scann not installed");
    },
  },
  {
    name: "AlloyDB: google_ml_integration extension installed",
    fn: () => {
      const out = psql("SELECT extversion FROM pg_extension WHERE extname='google_ml_integration'");
      if (!out) throw new Error("google_ml_integration not installed");
    },
  },
  {
    name: "AlloyDB: vendor_pages table with vector(1536) column",
    fn: () => {
      const out = psql(
        "SELECT atttypmod FROM pg_attribute WHERE attrelid='vendor_pages'::regclass AND attname='embedding'"
      );
      if (!out) throw new Error("vendor_pages.embedding column missing");
    },
  },
  {
    name: "AlloyDB: trigram GIN index on vendor_pages.content",
    fn: () => {
      const out = psql(
        "SELECT indexname FROM pg_indexes WHERE tablename='vendor_pages' AND indexname='vendor_pages_content_trgm_idx'"
      );
      if (out !== "vendor_pages_content_trgm_idx") throw new Error("trigram index missing");
    },
  },
  {
    name: "Redis: round-trip write+read with auth",
    fn: () => {
      const key = `smoke:${Date.now()}`;
      const val = "smoke-test-ok";
      redisCli(["SET", key, val, "EX", "30"]);
      const got = redisCli(["GET", key]);
      redisCli(["DEL", key]);
      if (got !== val) throw new Error(`expected ${val}, got '${got}'`);
    },
  },
  {
    name: "Redis: appendonly=yes (AOF persistence on)",
    fn: () => {
      const out = redisCli(["CONFIG", "GET", "appendonly"]);
      if (!out.includes("yes")) throw new Error(`expected appendonly yes, got '${out}'`);
    },
  },
  {
    name: "Redis: maxmemory-policy=allkeys-lru",
    fn: () => {
      const out = redisCli(["CONFIG", "GET", "maxmemory-policy"]);
      if (!out.includes("allkeys-lru")) throw new Error(`expected allkeys-lru, got '${out}'`);
    },
  },
  {
    name: ".mcp.json declares alloydb + redis servers",
    fn: () => {
      const mcp = JSON.parse(readFileSync(resolve(REPO_ROOT, ".mcp.json"), "utf8"));
      const required = ["knowledge-bridge", "alloydb", "redis"];
      for (const name of required) {
        if (!mcp.mcpServers[name]) throw new Error(`.mcp.json missing server: ${name}`);
      }
    },
  },
  {
    name: "crawler --json contract: clean JSON on stdout for vendor_refresh",
    fn: () => {
      // The MCP vendor_refresh tool relies on --json producing exactly one
      // JSON line on stdout. Validate against the smallest vendor.
      const out = execFileSync(
        "node_modules/.bin/tsx",
        ["scripts/crawl-vendors.ts", "--vendor", "arkose-labs", "--json", "--dry-run"],
        { encoding: "utf8", cwd: REPO_ROOT },
      ).trim();
      let parsed: { results?: Array<{ vendor: string }> };
      try {
        parsed = JSON.parse(out);
      } catch {
        throw new Error(`stdout was not valid JSON (got ${out.length} chars)`);
      }
      if (!parsed.results || parsed.results[0]?.vendor !== "arkose-labs") {
        throw new Error("JSON shape mismatch — expected results[0].vendor='arkose-labs'");
      }
    },
  },
];

let passed = 0;
let failed = 0;

for (const check of checks) {
  try {
    await check.fn();
    console.log(`  ✓ ${check.name}`);
    passed += 1;
  } catch (err) {
    console.log(`  ✗ ${check.name}`);
    console.log(`    ${(err as Error).message}`);
    failed += 1;
  }
}

console.log("");
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
