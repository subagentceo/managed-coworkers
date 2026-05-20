# product-management — Cloudflare Worker (wrangler side)

Per-coworker Worker for the `product-management` managed-coworker. TypeScript-side parallel of the Terraform module at `infra/terraform/coworkers/product-management/` (PR #116, OPMP3). Both define the same Cloudflare resources; at deploy time the operator picks one as the source of truth.

## Layout

```
wrangler.jsonc   — Worker config (Sandbox DO + KV SESSION_INDEX + D1
                   OUTCOMES_LOG + Secrets Store bindings)
Dockerfile       — Sandbox container image (claude CLI + plugin skills)
src/worker.ts    — Worker entrypoint + env-sanitizer + DO stubs
                   (full skill-dispatch surface lands in OPMP3c)
README.md        — this file
```

## Bindings

| Binding | Type | Purpose |
|---|---|---|
| `Sandbox` | DO container | Claude CLI runs inside on demand |
| `SessionDO` | DO | Durable session log (one per `CoworkerSession` from ODEP2) |
| `SESSION_INDEX` | KV | Hot mirror of `coworker:product-management:session:<id>` |
| `OUTCOMES_LOG` | D1 | Durable outcomes log (mirrors `coworker_sessions` from ODEP2) |
| `CLAUDE_CODE_OAUTH_TOKEN` | Secrets Store | Mandatory; OAuth-only invariant |
| `CLOUDFLARE_API_TOKEN` | Secrets Store | For `cloudflare-codemode` MCP |
| `GSC_OAUTH_REFRESH` | Secrets Store | Google Search Console (optional) |

## OAuth-only invariant

Three layers enforce no `ANTHROPIC_API_KEY` anywhere:

1. **Project gate** — `src/oauth/token.ts` rejects the key at chassis startup.
2. **Worker gate** — `sanitizeEnvForSandbox()` in `src/worker.ts` throws if the key appears in any env forwarded to the Sandbox.
3. **Container gate** — the Dockerfile's `HEALTHCHECK` refuses to start when `ANTHROPIC_API_KEY` is set.

## Validate

```bash
cd infra/cloudflare/coworkers/product-management
wrangler deploy --dry-run
```

Requires `npm install` at the chassis root to populate `wrangler` (already in `package.json` devDependencies).

## Deploy

Gated on the chassis-wide deploy decision (Phase 8) + operator secret sync. The bootstrap workflow at `.github/workflows/cloudflare-preview.yml` (chassis-wide) provides the pattern; per-coworker equivalent lands when OPMP3c does.

## Sibling

The Terraform equivalent at `infra/terraform/coworkers/product-management/` (PR #116) defines the same resources. The sibling `data-engineering` Terraform module is PR #118. The `data-engineering` wrangler.jsonc equivalent will follow this same pattern when authored.
