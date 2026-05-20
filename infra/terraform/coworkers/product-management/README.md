# product-management — Terraform v5 module

Per-coworker Terraform module that provisions the Cloudflare resources the `product-management` managed-coworker needs. Runs in parallel to (not as a replacement for) the planned `infra/cloudflare/coworkers/product-management/wrangler.jsonc` path (PR C of OPMP).

## Why two paths

The operator's directive (2026-05-20): build the coworker "in parallel in two languages, terraform and typescript." This module is the Terraform side. `wrangler.jsonc` is the TypeScript-adjacent side. Both define the same Cloudflare resources; at deploy time the operator picks one as the source of truth and the other stays as drift-detection.

## Layout

```
versions.tf    — Cloudflare provider v5 pin (per-coworker; chassis-wide
                 module at ../../versions.tf stays on v4.52)
providers.tf   — provider config (token via env)
variables.tf   — account_id, environment, coworker_name
main.tf        — KV (session_index), D1 (outcomes_log), Secrets Store stubs
outputs.tf     — resource IDs + resource_prefix + provider pin
```

## Resources

| Resource                                  | Purpose |
|---|---|
| `cloudflare_workers_kv_namespace.session_index` | Short-term session index. Mirrors `coworker:product-management:session:<id>` from `docs/data/redis-keys.md`. |
| `cloudflare_d1_database.outcomes_log`           | Durable outcomes log. Mirrors the `coworker_sessions` table from `infra/alloydb/migrations/0001_init.sql`. Operator picks D1 OR AlloyDB at deploy; the TypeScript model is store-agnostic. |

Secrets Store bindings are documented inline but not provisioned by Terraform — populate via `wrangler secret put` to keep secret material out of state.

## OAuth-only invariant

This module **never** declares an `ANTHROPIC_API_KEY` binding. The Worker reads `CLAUDE_CODE_OAUTH_TOKEN` from Secrets Store at runtime. Enforced upstream by `src/oauth/token.ts` and the env-sanitizer in `infra/cloudflare/src/worker.ts`.

## Local validation

```bash
cd infra/terraform/coworkers/product-management
terraform init -backend=false
terraform fmt -check
terraform validate
```

No `CLOUDFLARE_API_TOKEN` is needed for `validate`. `plan` against live API requires the token + a real `account_id`.

## Apply

```bash
export CLOUDFLARE_API_TOKEN=...
terraform init
terraform plan -var "account_id=<acct>" -var "environment=dev"
terraform apply -var "account_id=<acct>" -var "environment=dev"
```

## Sibling module

The `data-engineering` coworker (PR #112) follows the same shape — copy this directory to `../data-engineering/`, change `var.coworker_name` default, adjust resources as needed. The `data-engineering` Terraform module lands in a follow-up PR once this scaffold validates.
