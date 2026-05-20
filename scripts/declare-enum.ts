#!/usr/bin/env tsx
// scripts/declare-enum.ts
//
// CLI wrapper around scripts/lib/declare-enum.ts. Writes the emitted
// TypeScript module to src/domain/<domain>/<typeName>.ts.
//
// Usage:
//   tsx scripts/declare-enum.ts <domain> <TypeName> <opt1,opt2,...> [outcome-id]
//
// Example:
//   tsx scripts/declare-enum.ts connectors AnalyticsConnector cf-analytics-engine,ga4 ODEP3
//   → writes src/domain/connectors/AnalyticsConnector.ts
//
// Implements the data-engineering coworker's `declare-enums` skill.
// Refs: ODEP3.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildEnumModule } from "./lib/declare-enum.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

function usage(): never {
  console.error(
    "usage: tsx scripts/declare-enum.ts <domain> <TypeName> <opt1,opt2,...> [outcome-id] [\"description\"]",
  );
  process.exit(2);
}

function main(): void {
  const [, , domain, typeName, optionsCsv, outcomeId, description] = process.argv;
  if (!domain || !typeName || !optionsCsv) usage();

  const options = optionsCsv.split(",").map((s) => s.trim()).filter((s) => s.length > 0);

  const source = buildEnumModule({
    typeName,
    options,
    outcomeId,
    description,
  });

  const outDir = resolve(REPO_ROOT, "src", "domain", domain);
  const outPath = resolve(outDir, `${typeName}.ts`);

  if (existsSync(outPath)) {
    console.error(`refusing to overwrite existing file: ${outPath}`);
    console.error("(safety: declare-enum is append-only by default; remove the file first if you want to regenerate)");
    process.exit(3);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, source);
  console.log(`wrote ${outPath} (${options.length} option(s))`);
}

try {
  main();
} catch (err) {
  console.error(`declare-enum: ${(err as Error).message}`);
  process.exit(1);
}
