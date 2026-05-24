# Dependency Security Remediation — Research Scratchpad

> Append-only research log. Stable prefix above the `## LOG` line is the
> prompt-cache anchor: never edit prior entries, only append new ones below.
> Each entry is timestamped + tagged so multi-agent sessions can resume
> without re-deriving context. Mirrors the chassis heartbeat-memory pattern
> (`seeds/memory/heartbeat/`).

## Invariants (cache anchor — do not edit)

- OAuth-only: `ANTHROPIC_API_KEY` never set; never add it to fix a build.
- Every commit ends with `(O<N>)`. Convention test: single outcome ID on the
  subject line; extras go in a `Refs` footer (slashes like `(A/B)` FAIL).
- OSV gate: `osv-scanner -r --experimental-exclude=third_party ./` must exit 0.
  CI uses `google/osv-scanner-action@v2.3.8` reusable PR workflow.
- `osv-scanner.toml` applies ONLY to files in its own directory (no child
  propagation). Root config governs root `package-lock.json`.
- `IgnoredVulns` by advisory ID also ignores aliases; ID-scoped ignores of
  fixed-in-N advisories cannot mask a future CVE in version ≥N.
- Outcome ID for this initiative: `OBATCH-FIX` (security/gate-hardening line).

## Canonical facts (cache anchor — append-only)

- fastembed@2.1.0 is the LATEST version; pins `tar: "^6.2.0"`; only uses
  `tar.x({...})` (lib/esm/fastembed.js:179); downloads models from trusted
  `https://storage.googleapis.com/qdrant-fastembed/<model>.tar.gz`.
- tar 7.x is ESM with NO default export → `import tar from "tar"` throws
  `does not provide an export named 'default'`. tar 7 DOES export `x` named.
- No patched tar 6.x exists (all 6 tar advisories fixed only in 7.5.x).
- The 6 tar advisories are untrusted-archive / macOS-APFS Unicode-race issues;
  inapplicable to fastembed's trusted first-party extraction.
- protobufjs/tar/file-type are deeply transitive (not imported by chassis src):
  protobufjs←onnx-proto←onnxruntime-web←@xenova/transformers;
  tar←fastembed; file-type←@crawlee/cheerio.

## LOG (append below; newest last)

---
### 2026-05-24 · entry 1 · OSV failure triage (PR #133)
- Webhook: `OSV-Scanner (PR) / osv-scan` FAILED on #133.
- Confirmed branch touched ZERO lockfiles vs origin/main → not introduced by
  this PR. 35 advisories, 17 packages, 2 ecosystems (npm + PyPI).
- Root cause: newly-disclosed CVEs post-#132 (merged green 2026-05-20); several
  carry 2026 advisory IDs. Chassis-wide; main goes red on next push/Monday cron.
- Reproduced locally with osv-scanner v2.3.8 (exact CI version), same args.

### 2026-05-24 · entry 2 · npm remediation (force-upgrade via overrides)
- Added root `overrides`: protobufjs ^7.5.8 (→7.6.1), tar ^7.5.11 (→7.5.15),
  file-type ^21.3.2 (→21.3.4), qs ^6.15.2, ws ^8.20.1, @anthropic-ai/sdk ^0.95.0
  (→0.95.2, was nested 0.81 under claude-agent-sdk).
- ws (dev) 8.18.0 came from miniflare in frontend + infra/cloudflare → added
  `ws ^8.20.1` override to BOTH sub-project package.json + regenerated lockfiles.
- `npm install` clean; npm audit = 0 vulns.

### 2026-05-24 · entry 3 · PyPI remediation (example requirements)
- osv-scalibr resolves requirements.txt transitively AND picks MINIMUM
  satisfying versions (proved empirically: unpinned `uvicorn` → h11 0.9.0).
- python-bootstrap: pinned fastapi>=0.136.0, uvicorn>=0.30.0, PyJWT[crypto]>=2.12.0,
  + transitive floors starlette>=1.0.1, pydantic>=2.5.0, idna>=3.15, h11>=0.16.0.
  Verified: fastapi 0.136 allows starlette>=0.46 (no upper bound) so starlette
  1.1.0 is compatible — no conflict. pyjwt PYSEC-2025-183 last_affected 2.10.1.
- dcf-model x3 (identical): openpyxl>=3.1.5, requests>=2.32.4, idna>=3.15.
- Single-file re-scans → exit 0 for all 4.

### 2026-05-24 · entry 4 · BLOCKER: tar 7 breaks fastembed (runtime)
- Load-time smoke (`import("fastembed")`) FAILS under tar 7: no default export.
- This is invisible to CI (verify.yml = typecheck+citations+libs; no lib test
  imports fastembed — proven: 88 libs pass while fastembed is broken).
- Decision (Claude-owned, per operator delegation): OPTION B —
  (1) keep global tar→7 override (defense-in-depth for future tar consumers),
  (2) nested `fastembed > tar ^6.2.0` so fastembed keeps its tested tar 6,
  (3) root `osv-scanner.toml` IgnoredVulns for the 6 tar GHSA IDs with reason +
  ignoreUntil 2026-08-22 (forces re-review; revisit when fastembed ships tar-7
  support). 34/35 advisories remain force-upgraded; 1 documented exception.
- Rejected patch-package (adds postinstall hook + node_modules patching to a
  security-posture repo; runs fastembed on untested tar 7) and bare revert.

### 2026-05-24 · entry 5 · Option B implemented + verified GREEN
- package.json: added nested `"fastembed": {"tar": "^6.2.0"}`; `npm install`
  put fastembed back on tar@6.2.1 while protobufjs 7.6.1 / file-type 21.3.4 /
  onnxruntime-node tar 7.5.15 held.
- Created root `osv-scanner.toml` with 6 IgnoredVulns (tar GHSA IDs) +
  reason + ignoreUntil 2026-08-22.
- VERIFIED:
  * `osv-scanner -r --experimental-exclude=third_party ./` → "Filtered 6
    vulnerabilities" → "No issues found", EXIT 0.
  * `import('fastembed')` → load OK (tar 6 default-export restored).
  * `npm run verify` → typecheck + citations + 88/88 lib tests, EXIT 0.
- Net: 29/35 advisories fixed by upgrade; 6 (tar-on-fastembed) documented +
  expiring ignore. No runtime regression. No new install tooling.
- Artifacts: docs/prd/product-requirements-doc.yaml + docs/prd/prd.yaml.
- Note: `npm audit` still reports 2 high (tar 6.x) — expected; npm audit is a
  separate tool from the OSV gate and has no equivalent scoped-ignore here.
