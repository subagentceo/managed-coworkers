/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Cassette redaction (REPLAY-13).
 *
 * Scrubs Authorization headers + account-specific identifiers from a
 * pollyjs HAR file before commit. Per `cassettes/README.md` and the
 * ADR (OREPLAY0), every committed cassette must be account-agnostic.
 *
 * Idempotent: running redact on an already-redacted file is a no-op.
 *
 * Surface:
 *   redactHar(text)       → string  (pure, returns scrubbed JSON)
 *   redactHarFile(path)   → void    (in-place, idempotent)
 *
 * Scrubbed:
 *   - Headers named "authorization" / "x-api-key" / "cookie"
 *     (case-insensitive) → value "***REDACTED***"
 *   - Body substrings matching email regex → "***REDACTED-EMAIL***"
 *   - Body substrings matching the operator's known org_ids → see
 *     ORG_IDS below.
 *
 * Out of scope (intentionally — too easy to break payload schema):
 *   - JSON-aware path scrubbing (e.g. `.user.email`). Strings only.
 *   - x-request-id / cf-ray (these are origin-server breadcrumbs,
 *     fine to keep per cassettes/README.md).
 */

import { readFileSync, writeFileSync } from "node:fs";

const REDACT_HEADERS = new Set([
  "authorization",
  "x-api-key",
  "cookie",
  "set-cookie",
]);

const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

// Operator's known org_ids per /Users/alexzh/CLAUDE.md (3 active Max
// accounts + 1 deprecated team). Captured here to ensure cassettes
// don't leak which rotation slot recorded them.
const ORG_IDS = [
  "d2c69bc1-0863-493a-8631-372123a9ecee", // alex@jadecli.com
  "c38224f8-0e34-45c0-abee-739f89331d6a", // admin@jadecli.com
  "93a8481a-9c16-4841-960c-c1edd20c6fad", // zhouk.alex@gmail.com
  "22ddd267-e411-4897-8711-65788596b9c6", // deprecated team org
];
const ORG_ID_RE = new RegExp(ORG_IDS.join("|"), "g");

interface HarHeader {
  name: string;
  value: string;
}

interface HarBody {
  text?: string;
  [key: string]: unknown;
}

interface HarEntry {
  request?: { headers?: HarHeader[]; postData?: HarBody };
  response?: { headers?: HarHeader[]; content?: HarBody };
  [key: string]: unknown;
}

interface Har {
  log?: { entries?: HarEntry[] };
  [key: string]: unknown;
}

function redactHeaders(headers: HarHeader[] | undefined): void {
  if (!headers) return;
  for (const h of headers) {
    if (REDACT_HEADERS.has(h.name.toLowerCase())) {
      h.value = "***REDACTED***";
    }
  }
}

function redactBodyText(text: string | undefined): string | undefined {
  if (text === undefined) return undefined;
  return text
    .replace(EMAIL_RE, "***REDACTED-EMAIL***")
    .replace(ORG_ID_RE, "***REDACTED-ORG-ID***");
}

function redactBody(body: HarBody | undefined): void {
  if (!body || typeof body.text !== "string") return;
  body.text = redactBodyText(body.text);
}

export function redactHar(harJson: string): string {
  const har = JSON.parse(harJson) as Har;
  const entries = har.log?.entries ?? [];
  for (const entry of entries) {
    redactHeaders(entry.request?.headers);
    redactHeaders(entry.response?.headers);
    redactBody(entry.request?.postData);
    redactBody(entry.response?.content);
  }
  return JSON.stringify(har, null, 2);
}

export function redactHarFile(path: string): void {
  const before = readFileSync(path, "utf8");
  const after = redactHar(before);
  if (after !== before) {
    writeFileSync(path, after);
  }
}
