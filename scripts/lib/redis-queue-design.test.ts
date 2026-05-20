/**
 * @cite vendor/redis/urls.md
 * @cite vendor/cloudflare/urls.md
 *
 * Unit tests for scripts/lib/redis-queue-design.ts (redis-queue-design skill backing).
 *
 * Internal references:
 *   - packages/knowledge-work-plugins/data-engineering/skills/redis-queue-design/SKILL.md
 *   - src/domain/queues/
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  buildQueueMarkdown,
  buildQueueTypeScript,
  fieldToTsLine,
} from "./redis-queue-design.js";

import type { QueueEntryField, QueueSpec } from "./redis-queue-design.js";

// ---------------------------------------------------------------------------
// fieldToTsLine
// ---------------------------------------------------------------------------

test("fieldToTsLine: string field → string type", () => {
  const f: QueueEntryField = { name: "coworker", type: "string" };
  assert.ok(fieldToTsLine(f).includes("coworker: string;"), fieldToTsLine(f));
});

test("fieldToTsLine: number field → number type", () => {
  const f: QueueEntryField = { name: "retries", type: "number" };
  assert.ok(fieldToTsLine(f).includes(": number;"), fieldToTsLine(f));
});

test("fieldToTsLine: iso8601 field → string type", () => {
  const f: QueueEntryField = { name: "started_at", type: "iso8601" };
  assert.ok(fieldToTsLine(f).includes(": string;"), fieldToTsLine(f));
});

test("fieldToTsLine: optional field has ?", () => {
  const f: QueueEntryField = { name: "jira_ticket", type: "string", optional: true };
  assert.ok(fieldToTsLine(f).includes("jira_ticket?: string;"), fieldToTsLine(f));
});

test("fieldToTsLine: description becomes inline comment", () => {
  const f: QueueEntryField = { name: "id", type: "string", description: "session UUID" };
  assert.ok(fieldToTsLine(f).includes("// session UUID"), fieldToTsLine(f));
});

// ---------------------------------------------------------------------------
// buildQueueTypeScript
// ---------------------------------------------------------------------------

const SAMPLE_SPEC: QueueSpec = {
  name: "CoworkerSessionEvent",
  keyPattern: "coworker:sessions:new",
  structure: "stream",
  outcomeId: "ODEP7",
  fields: [
    { name: "id",         type: "string",  description: "session UUID" },
    { name: "coworker",   type: "string"  },
    { name: "outcome_id", type: "string"  },
    { name: "started_at", type: "iso8601" },
    { name: "payload",    type: "json", optional: true },
  ],
};

test("buildQueueTypeScript: contains interface name", () => {
  const ts = buildQueueTypeScript(SAMPLE_SPEC);
  assert.ok(ts.includes("export interface CoworkerSessionEvent"), ts);
});

test("buildQueueTypeScript: contains key constant", () => {
  const ts = buildQueueTypeScript(SAMPLE_SPEC);
  assert.ok(ts.includes("COWORKERSESSIONEVENT_KEY"), ts);
  assert.ok(ts.includes('"coworker:sessions:new"'), ts);
});

test("buildQueueTypeScript: includes outcomeId in header", () => {
  const ts = buildQueueTypeScript(SAMPLE_SPEC);
  assert.ok(ts.includes("ODEP7"), ts);
});

test("buildQueueTypeScript: json field maps to unknown", () => {
  const ts = buildQueueTypeScript(SAMPLE_SPEC);
  assert.ok(ts.includes("payload?: unknown;"), ts);
});

// ---------------------------------------------------------------------------
// buildQueueMarkdown
// ---------------------------------------------------------------------------

test("buildQueueMarkdown: starts with # heading", () => {
  const md = buildQueueMarkdown(SAMPLE_SPEC);
  assert.ok(md.startsWith("# Queue Design — CoworkerSessionEvent"), md.slice(0, 60));
});

test("buildQueueMarkdown: stream structure → XADD command", () => {
  const md = buildQueueMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("XADD"), md);
});

test("buildQueueMarkdown: includes TypeScript block", () => {
  const md = buildQueueMarkdown(SAMPLE_SPEC);
  assert.ok(md.includes("```ts"), md);
});

test("buildQueueMarkdown: list structure → LPUSH command", () => {
  const listSpec: QueueSpec = { ...SAMPLE_SPEC, structure: "list" };
  const md = buildQueueMarkdown(listSpec);
  assert.ok(md.includes("LPUSH"), md);
});
