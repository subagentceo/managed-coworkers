/**
 * @cite vendor/anthropics/code.claude.com/docs/en/skills.md
 * @cite seeds/citations/define-outcomes.md
 *
 * ODEP3 — declare-enum library unit tests.
 *
 * Internal references (citation-guard accepts only vendor/seeds/rubrics
 * for @cite, so these are plain comments):
 *   - packages/knowledge-work-plugins/data-engineering/skills/declare-enums/SKILL.md
 *   - src/domain/coworkers/CoworkerSession.ts (existing enum example)
 */

import {
  buildEnumModule,
  constantNameOf,
  isValidOption,
  isValidTypeName,
} from "./declare-enum.js";

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

console.log("declare-enum:");

// ─── constantNameOf ───────────────────────────────────────────────────────

check("constantNameOf: simple pluralization", () => {
  eq(constantNameOf("AnalyticsConnector"), "ANALYTICS_CONNECTORS", "default plural");
});

check("constantNameOf: -y → -IES", () => {
  eq(constantNameOf("Strategy"), "STRATEGIES", "y-stem");
});

check("constantNameOf: -s → -SES", () => {
  eq(constantNameOf("Status"), "STATUSES", "s-stem");
});

check("constantNameOf: -ch → -CHES", () => {
  eq(constantNameOf("Branch"), "BRANCHES", "ch-stem");
});

check("constantNameOf: -sh → -SHES", () => {
  eq(constantNameOf("Brush"), "BRUSHES", "sh-stem");
});

check("constantNameOf: single capital", () => {
  eq(constantNameOf("Item"), "ITEMS", "monosyllabic");
});

// ─── isValidTypeName ──────────────────────────────────────────────────────

check("isValidTypeName: accepts PascalCase", () => {
  eq(isValidTypeName("Foo"), true, "single word");
  eq(isValidTypeName("FooBar"), true, "two words");
  eq(isValidTypeName("Foo2Bar"), true, "digits ok mid");
});

check("isValidTypeName: rejects lowercase / kebab / snake", () => {
  eq(isValidTypeName("foo"), false, "lowercase");
  eq(isValidTypeName("foo-bar"), false, "kebab");
  eq(isValidTypeName("Foo_Bar"), false, "snake (underscore)");
  eq(isValidTypeName(""), false, "empty");
});

// ─── isValidOption ────────────────────────────────────────────────────────

check("isValidOption: accepts kebab and snake", () => {
  eq(isValidOption("foo"), true, "single");
  eq(isValidOption("cf-analytics-engine"), true, "kebab");
  eq(isValidOption("foo_bar"), true, "snake");
  eq(isValidOption("ga4"), true, "trailing digit");
});

check("isValidOption: rejects PascalCase / spaces / leading digit", () => {
  eq(isValidOption("Foo"), false, "uppercase");
  eq(isValidOption("foo bar"), false, "space");
  eq(isValidOption("2foo"), false, "leading digit");
  eq(isValidOption(""), false, "empty");
});

// ─── buildEnumModule ──────────────────────────────────────────────────────

check("buildEnumModule: minimal happy path", () => {
  const src = buildEnumModule({
    typeName: "AnalyticsConnector",
    options: ["cf-analytics-engine", "ga4"],
  });
  if (!src.includes('export const ANALYTICS_CONNECTORS')) throw new Error("missing const");
  if (!src.includes('export type AnalyticsConnector = (typeof ANALYTICS_CONNECTORS)[number];')) {
    throw new Error("missing derived type");
  }
  if (!src.includes('"cf-analytics-engine",')) throw new Error("missing literal");
  if (!src.includes('"ga4",')) throw new Error("missing literal");
  if (!src.includes("as const")) throw new Error("missing `as const`");
});

check("buildEnumModule: header from description + outcomeId", () => {
  const src = buildEnumModule({
    typeName: "Foo",
    options: ["bar"],
    description: "Demo enum.",
    outcomeId: "ODEP3",
  });
  if (!src.startsWith("/**\n * Demo enum.\n *\n * Refs: ODEP3.\n */\n")) {
    throw new Error(`bad header: ${src.slice(0, 80)}`);
  }
});

check("buildEnumModule: rejects invalid typeName", () => {
  throws(
    () => buildEnumModule({ typeName: "foo", options: ["a"] }),
    /PascalCase/,
  );
});

check("buildEnumModule: rejects empty options", () => {
  throws(
    () => buildEnumModule({ typeName: "Foo", options: [] }),
    /empty/,
  );
});

check("buildEnumModule: rejects duplicates", () => {
  throws(
    () => buildEnumModule({ typeName: "Foo", options: ["a", "b", "a"] }),
    /Duplicate options: a/,
  );
});

check("buildEnumModule: rejects invalid option literal", () => {
  throws(
    () => buildEnumModule({ typeName: "Foo", options: ["Bad Option"] }),
    /Invalid option "Bad Option"/,
  );
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
