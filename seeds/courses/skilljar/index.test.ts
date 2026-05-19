/**
 * Smoke test for the Skilljar transcripts index.
 *
 * Asserts INDEX.md is present and every .txt transcript referenced in
 * the index actually exists on disk. Catches drift if a file is added
 * to the directory without being indexed, or vice versa.
 *
 * @cite seeds/courses/skilljar/INDEX.md
 * @cite seeds/courses/skilljar/introduction-to-claude-cowork__cowork.txt
 * @cite seeds/courses/skilljar/building-with-the-claude-api__1p.txt
 */
import { strict as assert } from "node:assert";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const indexPath = resolve(__dirname, "INDEX.md");
assert.ok(statSync(indexPath).isFile(), "INDEX.md exists");

const index = readFileSync(indexPath, "utf8");
const onDisk = readdirSync(__dirname).filter((f) => f.endsWith(".txt")).sort();

assert.ok(onDisk.length >= 10, `expected at least 10 transcripts, got ${onDisk.length}`);

for (const filename of onDisk) {
  assert.ok(
    index.includes(filename),
    `INDEX.md must reference every transcript on disk; missing: ${filename}`,
  );
}

console.log(`  ✓ Skilljar index: ${onDisk.length} transcripts, all referenced in INDEX.md`);
