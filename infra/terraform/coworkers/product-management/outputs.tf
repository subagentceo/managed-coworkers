output "kv_session_index_id" {
  value       = cloudflare_workers_kv_namespace.session_index.id
  description = "KV namespace ID for the session index. Wire into wrangler.jsonc as the SESSION_INDEX binding."
}

output "d1_outcomes_log_id" {
  value       = cloudflare_d1_database.outcomes_log.id
  description = "D1 database ID for the outcomes log. Wire into wrangler.jsonc as the OUTCOMES_LOG binding."
}

output "resource_prefix" {
  value       = "${var.coworker_name}-${var.environment}"
  description = "Stable prefix used across this coworker's resources. Useful for downstream stacks that need to derive related resource names without hardcoding."
}

output "provider_version_pin" {
  value       = "~> 5.0"
  description = "Records the provider pin for this root module so drift between the chassis-wide v4.52 and this v5 module is detectable from outputs."
}
