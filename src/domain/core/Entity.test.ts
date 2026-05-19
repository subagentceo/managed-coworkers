/**
 * @cite vendor/anthropics/code.claude.com/docs/en/glossary.md
 *
 * OCDM1 — Entity foundations test.
 *
 * Asserts:
 *   - Entity is abstract — `kind` is not defined on the base prototype;
 *     subclasses must implement it.
 *   - id, createdAt, and (optional) name are wired through the protected ctor.
 *   - id and createdAt fields are present and non-configurable from the
 *     subclass instance (readonly is a TS-level guarantee; we additionally
 *     check the value round-trips).
 */

import { Entity } from "./Entity.js";

function fail(msg: string): never {
  throw new Error(msg);
}

class _TestEntity extends Entity {
  constructor() {
    super("test-id", new Date("2026-05-18"), "test");
  }
  get kind(): string {
    return "test";
  }
}

class _AnonEntity extends Entity {
  constructor() {
    super("anon-1", new Date("2026-05-18"));
  }
  get kind(): string {
    return "anon";
  }
}

function main(): void {
  // Abstract: Entity.prototype must not carry a `kind` getter — that
  // discriminator is the subclass's responsibility.
  const proto = Entity.prototype as unknown as { kind?: unknown };
  if (Object.getOwnPropertyDescriptor(proto, "kind") !== undefined) {
    fail("Entity.prototype should not define `kind`; it is abstract on the base");
  }

  const e = new _TestEntity();
  if (e.id !== "test-id") fail(`id should be "test-id", got ${e.id}`);
  if (e.name !== "test") fail(`name should be "test", got ${String(e.name)}`);
  if (e.kind !== "test") fail(`kind should be "test", got ${e.kind}`);
  if (!(e.createdAt instanceof Date)) fail("createdAt should be a Date");
  if (e.createdAt.toISOString() !== new Date("2026-05-18").toISOString()) {
    fail(`createdAt mismatch: ${e.createdAt.toISOString()}`);
  }

  const a = new _AnonEntity();
  if (a.name !== undefined) fail(`anonymous entity should have undefined name, got ${String(a.name)}`);
  if (a.kind !== "anon") fail(`anon.kind should be "anon", got ${a.kind}`);

  console.log("Entity.test.ts: ok");
}

main();
