#!/usr/bin/env tsx
// scripts/model-data-domain.ts
//
// CLI wrapper around scripts/lib/model-data-domain.ts. Reads a domain
// spec from a JSON file (or stdin) and writes the emitted TypeScript
// module to src/domain/<domain>/<EntityName>.ts.
//
// Usage:
//   tsx scripts/model-data-domain.ts <domain> <spec.json>
//   tsx scripts/model-data-domain.ts <domain> -    # spec on stdin
//
// spec.json shape:
//   {
//     "entityName": "Site",
//     "fields": [
//       { "name": "id",       "type": "SiteId",  "column": "id" },
//       { "name": "hostname", "type": "string",  "column": "hostname" }
//     ],
//     "outcomeId": "ODEP4",
//     "description": "One Cloudflare-hosted site..."
//   }
//
// Refs: ODEP4.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildDomainEntity, type BuildDomainEntityArgs } from "./lib/model-data-domain.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

function usage(): never {
  console.error("usage: tsx scripts/model-data-domain.ts <domain> <spec.json|->");
  process.exit(2);
}

function readSpec(path: string): BuildDomainEntityArgs {
  const body = path === "-" ? readFileSync(0, "utf8") : readFileSync(path, "utf8");
  return JSON.parse(body) as BuildDomainEntityArgs;
}

function main(): void {
  const [, , domain, specPath] = process.argv;
  if (!domain || !specPath) usage();

  const spec = readSpec(specPath);
  const source = buildDomainEntity(spec);

  const outDir = resolve(REPO_ROOT, "src", "domain", domain);
  const outPath = resolve(outDir, `${spec.entityName}.ts`);

  if (existsSync(outPath)) {
    console.error(`refusing to overwrite existing file: ${outPath}`);
    console.error("(safety: declare-enum + model-data-domain are append-only by default)");
    process.exit(3);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, source);
  console.log(`wrote ${outPath} (${spec.fields.length} field(s))`);
}

try {
  main();
} catch (err) {
  console.error(`model-data-domain: ${(err as Error).message}`);
  process.exit(1);
}
