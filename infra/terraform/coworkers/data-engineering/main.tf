# Cloudflare resources for the data-engineering managed-coworker.
#
# Parallels (does not yet replace) the wrangler.jsonc path planned at
# infra/cloudflare/coworkers/data-engineering/wrangler.jsonc (data-
# engineering's equivalent of OPMP's PR C). When both land, the
# operator picks one deploy path; the other stays as drift-detection /
# reference.
#
# Refs: ODEP3.
# OAuth-only invariant: the worker reads CLAUDE_CODE_OAUTH_TOKEN from
# Secrets Store (declared via cloudflare_secrets_store_secret below).
# ANTHROPIC_API_KEY is NEVER bound, anywhere.

locals {
  # Resource-name prefix used across every binding so multi-environment
  # state stays disjoint.
  prefix = "${var.coworker_name}-${var.environment}"
}

# KV namespace: short-term session index. Mirrors `SESSION_INDEX` in
# the planned wrangler.jsonc binding set. Stores `coworker:data-engineering:session:<id>`
# pointers per docs/data/redis-keys.md, but evicting Redis when the
# Worker is the only caller.
resource "cloudflare_workers_kv_namespace" "session_index" {
  account_id = var.account_id
  title      = "${local.prefix}-session-index"
}

# D1 database: durable outcomes log. Mirrors the coworker_sessions table
# at infra/alloydb/migrations/0001_init.sql when the chassis runs
# AlloyDB-less (operator can pick D1 OR AlloyDB at deploy time; the
# CoworkerSession TypeScript model is store-agnostic).
resource "cloudflare_d1_database" "outcomes_log" {
  account_id = var.account_id
  name       = "${local.prefix}-outcomes-log"
}

# Secrets Store secret references — the secrets themselves are NEVER
# materialized in Terraform state. Operator populates via
#   wrangler secret put CLAUDE_CODE_OAUTH_TOKEN
# or the Cloudflare UI. Terraform here only DECLARES the binding so
# the Worker can resolve it at runtime.
#
# This declaration is intentionally minimal (no `value`) to keep state
# clean of secret material. The v5 provider supports value-by-reference
# bindings — if the schema differs at validate time, the operator can
# wire the secret via wrangler instead and remove this block.
#
# Listed bindings:
#   - CLAUDE_CODE_OAUTH_TOKEN (OAuth-only invariant; mandatory)
#   - CLOUDFLARE_API_TOKEN    (for cloudflare-codemode MCP; optional)
#   - GSC_OAUTH_REFRESH       (Google Search Console; optional, only when
#                              userConfig.search_console enables 'gsc')
