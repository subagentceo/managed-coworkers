# data-engineering — Terraform v5 module

Per-coworker Terraform module that provisions the Cloudflare resources the `data-engineering` managed-coworker needs. Runs in parallel to (not as a replacement for) the planned `infra/cloudflare/coworkers/data-engineering/wrangler.jsonc` path.

Sibling to the [`product-management` Terraform module](../product-management/README.md) (PR #116). Same provider pin (v5), same resource shape, same OAuth-only invariants; differs only in the `coworker_name` default and resource-name prefix.

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
| `cloudflare_workers_kv_namespace.session_index` | Short-term session index. Mirrors `coworker:data-engineering:session:<id>` from `docs/data/redis-keys.md`. |
| `cloudflare_d1_database.outcomes_log`           | Durable outcomes log. Mirrors the `coworker_sessions` table from `infra/alloydb/migrations/0001_init.sql`. Operator picks D1 OR AlloyDB at deploy; the TypeScript model is store-agnostic. |

Secrets Store bindings are documented inline but not provisioned by Terraform — populate via `wrangler secret put` to keep secret material out of state.

## OAuth-only invariant

This module **never** declares an `ANTHROPIC_API_KEY` binding. The Worker reads `CLAUDE_CODE_OAUTH_TOKEN` from Secrets Store at runtime. Enforced upstream by `src/oauth/token.ts` and the env-sanitizer in `infra/cloudflare/src/worker.ts`.

## Local validation

```bash
cd infra/terraform/coworkers/data-engineering
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

## Future per-resource additions

The `visualize-architecture` skill (`packages/knowledge-work-plugins/data-engineering/skills/visualize-architecture/SKILL.md`) plans to render data-flow diagrams via Workers Analytics Engine + Browser Rendering. When that skill is implemented (ODEP7), add a `cloudflare_workers_analytics_engine_dataset` resource here for the per-site digest stream.
