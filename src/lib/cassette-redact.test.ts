/**
 * @cite seeds/citations/cloudflare-flagship.md
 * @cite seeds/posture/session-start.xml
 *
 * Cassette redaction smoke (REPLAY-13).
 *
 * Asserts:
 *   1. redactHar() scrubs Authorization, x-api-key, Cookie headers.
 *   2. Email addresses in body text become ***REDACTED-EMAIL***.
 *   3. Operator org_ids in body text become ***REDACTED-ORG-ID***.
 *   4. Idempotent: running redact twice = same output.
 *   5. Non-secret content (status, request_id, URL path) unchanged.
 */

import { redactHar } from "./cassette-redact.js";

function fail(msg: string): never {
  throw new Error(msg);
}

const SYNTHETIC_HAR = JSON.stringify({
  log: {
    entries: [
      {
        request: {
          method: "POST",
          url: "https://api.anthropic.com/v1/messages",
          headers: [
            { name: "Authorization", value: "Bearer secret-token-xyz" },
            { name: "x-api-key", value: "sk-ant-***" },
            { name: "Content-Type", value: "application/json" },
          ],
          postData: {
            text: '{"user":"alex@jadecli.com","org":"d2c69bc1-0863-493a-8631-372123a9ecee","model":"claude-opus-4-7"}',
          },
        },
        response: {
          status: 200,
          headers: [
            { name: "x-request-id", value: "req_abc123" },
            { name: "Set-Cookie", value: "session=secret" },
          ],
          content: {
            mimeType: "application/json",
            text: '{"id":"msg_abc","ok":true,"contact":"admin@jadecli.com"}',
          },
        },
      },
    ],
  },
});

function main(): void {
  const once = redactHar(SYNTHETIC_HAR);
  const twice = redactHar(once);
  if (once !== twice) fail("redactHar is not idempotent");

  const parsed = JSON.parse(once) as {
    log: { entries: Array<{ request: { headers: Array<{ name: string; value: string }>; postData: { text: string } }; response: { headers: Array<{ name: string; value: string }>; content: { text: string } } }> };
  };
  const entry = parsed.log.entries[0];

  // Request headers
  const reqAuth = entry.request.headers.find((h) => h.name.toLowerCase() === "authorization");
  if (reqAuth?.value !== "***REDACTED***") fail(`Authorization not redacted: ${reqAuth?.value}`);
  const reqApiKey = entry.request.headers.find((h) => h.name.toLowerCase() === "x-api-key");
  if (reqApiKey?.value !== "***REDACTED***") fail(`x-api-key not redacted: ${reqApiKey?.value}`);
  const reqCT = entry.request.headers.find((h) => h.name === "Content-Type");
  if (reqCT?.value !== "application/json") fail(`Content-Type altered: ${reqCT?.value}`);

  // Response headers — Set-Cookie redacted, x-request-id preserved
  const resCookie = entry.response.headers.find((h) => h.name.toLowerCase() === "set-cookie");
  if (resCookie?.value !== "***REDACTED***") fail(`Set-Cookie not redacted: ${resCookie?.value}`);
  const resReqId = entry.response.headers.find((h) => h.name === "x-request-id");
  if (resReqId?.value !== "req_abc123") fail(`x-request-id altered: ${resReqId?.value}`);

  // Body emails + org_ids
  if (entry.request.postData.text.includes("alex@jadecli.com")) fail("request body email leaked");
  if (entry.request.postData.text.includes("d2c69bc1")) fail("request body org_id leaked");
  if (!entry.request.postData.text.includes("***REDACTED-EMAIL***")) fail("email redaction marker missing");
  if (!entry.request.postData.text.includes("***REDACTED-ORG-ID***")) fail("org_id redaction marker missing");
  if (!entry.request.postData.text.includes("claude-opus-4-7")) fail("model name should NOT be redacted");

  if (entry.response.content.text.includes("admin@jadecli.com")) fail("response body email leaked");
  if (!entry.response.content.text.includes('"id":"msg_abc"')) fail("response id should NOT be redacted");

  console.log("  ✓ cassette-redact: headers + emails + org_ids scrubbed, idempotent, non-secrets preserved");
}

try {
  main();
} catch (err) {
  console.error("cassette-redact.test FAIL:", (err as Error).message);
  process.exit(1);
}
