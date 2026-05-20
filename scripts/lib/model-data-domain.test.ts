/**
 * @cite vendor/anthropics/code.claude.com/docs/en/skills.md
 * @cite seeds/citations/define-outcomes.md
 *
 * ODEP4 — model-data-domain library unit tests.
 *
 * Internal references (citation-guard accepts only vendor/seeds/rubrics
 * for @cite, so these are plain comments):
 *   - packages/knowledge-work-plugins/data-engineering/skills/model-data-domain/SKILL.md
 *   - src/domain/coworkers/CoworkerSession.ts (the pattern this emits)
 *   - src/domain/core/Entity.ts (the base class extended)
 */

import {
  buildDomainEntity,
  isValidColumnName,
  isValidFieldName,
  isValidPascalCase,
} from "./model-data-domain.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function eq<T>(a: T, b: T, msg: string): void {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    throw new Error(`${msg}\n      expected: ${JSON.stringify(b)}\n      got:      ${JSON.stringify(a)}`);
  }
}

function includes(haystack: string, needle: string, msg: string): void {
  if (!haystack.includes(needle)) {
    throw new Error(`${msg}\n      expected to find: ${needle}\n      in: ${haystack.slice(0, 200)}`);
  }
}

function throws(fn: () => unknown, pattern: RegExp): void {
  try {
    fn();
  } catch (err) {
    const msg = (err as Error).message;
    if (!pattern.test(msg)) throw new Error(`error did not match ${pattern}: ${msg}`);
    return;
  }
  throw new Error(`expected throw matching ${pattern}, none thrown`);
}

console.log("model-data-domain:");

// ─── validators ───────────────────────────────────────────────────────────

check("isValidPascalCase: accepts Site, FooBar; rejects foo, foo-bar, empty", () => {
  eq(isValidPascalCase("Site"), true, "single");
  eq(isValidPascalCase("FooBar"), true, "multi");
  eq(isValidPascalCase("foo"), false, "lowercase");
  eq(isValidPascalCase("foo-bar"), false, "kebab");
  eq(isValidPascalCase(""), false, "empty");
});

check("isValidFieldName: accepts camelCase; rejects PascalCase, snake, leading digit", () => {
  eq(isValidFieldName("hostname"), true, "single");
  eq(isValidFieldName("siteId"), true, "camel");
  eq(isValidFieldName("Hostname"), false, "Pascal");
  eq(isValidFieldName("site_id"), false, "snake");
  eq(isValidFieldName("2foo"), false, "leading digit");
});

check("isValidColumnName: accepts snake; rejects camelCase, kebab, leading digit", () => {
  eq(isValidColumnName("hostname"), true, "single");
  eq(isValidColumnName("site_id"), true, "snake");
  eq(isValidColumnName("siteId"), false, "camel");
  eq(isValidColumnName("site-id"), false, "kebab");
  eq(isValidColumnName("2foo"), false, "leading digit");
});

// ─── buildDomainEntity happy path ─────────────────────────────────────────

const siteEntity = buildDomainEntity({
  entityName: "Site",
  fields: [
    { name: "id", type: "SiteId", column: "id" },
    { name: "hostname", type: "string", column: "hostname" },
    { name: "niche", type: "string", column: "niche", defaultExpr: '"unspecified"' },
  ],
  outcomeId: "ODEP4",
  description: "One Cloudflare-hosted site in the operator's 100-site portfolio.",
});

check("buildDomainEntity: emits header with description + outcome id", () => {
  includes(siteEntity, "One Cloudflare-hosted site", "description");
  includes(siteEntity, "Refs: ODEP4", "outcome id");
});

check("buildDomainEntity: declares branded ID type", () => {
  includes(siteEntity, 'export type SiteId = string & { __brand: "SiteId" };', "brand decl");
});

check("buildDomainEntity: extends Entity", () => {
  includes(siteEntity, 'import { Entity } from "../core/Entity.js";', "import");
  includes(siteEntity, "export class Site extends Entity {", "class header");
});

check("buildDomainEntity: emits readonly fields with column JSDoc", () => {
  includes(siteEntity, "/** Maps to `hostname`. */", "JSDoc");
  includes(siteEntity, "public readonly hostname: string;", "field decl");
  includes(siteEntity, "public readonly niche: string;", "field decl");
});

check("buildDomainEntity: emits kind() returning entity name", () => {
  includes(siteEntity, 'return "Site";', "kind value");
});

check("buildDomainEntity: emits COLUMNS array in table-order", () => {
  includes(siteEntity, "export const SITE_COLUMNS = [", "constant");
  includes(siteEntity, '"id",', "id column");
  includes(siteEntity, '"hostname",', "hostname column");
  includes(siteEntity, '"niche",', "niche column");
});

check("buildDomainEntity: defaults are honored in constructor assigns", () => {
  includes(siteEntity, 'this.niche = args.niche ?? "unspecified";', "default assign");
});

// ─── buildDomainEntity validation throws ──────────────────────────────────

check("buildDomainEntity: rejects invalid entityName", () => {
  throws(
    () => buildDomainEntity({ entityName: "site", fields: [{ name: "id", type: "string", column: "id" }] }),
    /PascalCase/,
  );
});

check("buildDomainEntity: rejects empty fields", () => {
  throws(
    () => buildDomainEntity({ entityName: "Site", fields: [] }),
    /empty/,
  );
});

check("buildDomainEntity: requires first field to be id/id", () => {
  throws(
    () =>
      buildDomainEntity({
        entityName: "Site",
        fields: [{ name: "hostname", type: "string", column: "hostname" }],
      }),
    /first field must be/,
  );
});

check("buildDomainEntity: rejects duplicate field names", () => {
  throws(
    () =>
      buildDomainEntity({
        entityName: "Site",
        fields: [
          { name: "id", type: "string", column: "id" },
          { name: "hostname", type: "string", column: "hostname" },
          { name: "hostname", type: "string", column: "other" },
        ],
      }),
    /Duplicate field name/,
  );
});

check("buildDomainEntity: rejects invalid field/column names", () => {
  throws(
    () =>
      buildDomainEntity({
        entityName: "Site",
        fields: [
          { name: "id", type: "string", column: "id" },
          { name: "Bad", type: "string", column: "ok" },
        ],
      }),
    /Invalid field name "Bad"/,
  );
  throws(
    () =>
      buildDomainEntity({
        entityName: "Site",
        fields: [
          { name: "id", type: "string", column: "id" },
          { name: "ok", type: "string", column: "BadColumn" },
        ],
      }),
    /Invalid column name "BadColumn"/,
  );
});

check("buildDomainEntity: skips brand decl when id type is 'string'", () => {
  const out = buildDomainEntity({
    entityName: "Foo",
    fields: [{ name: "id", type: "string", column: "id" }],
  });
  if (out.includes("__brand:")) throw new Error("should not emit brand decl for plain string id");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
