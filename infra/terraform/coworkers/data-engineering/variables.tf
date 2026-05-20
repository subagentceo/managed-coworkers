variable "account_id" {
  type        = string
  description = "Cloudflare account ID where the data-engineering coworker resources land. Sourced from $TF_VAR_account_id or operator-supplied .tfvars."
}

variable "environment" {
  type        = string
  description = "Deployment environment slug. Used to scope resource names (kv namespace, d1 database) so prod / staging / preview don't collide."
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be one of dev | staging | prod."
  }
}

variable "coworker_name" {
  type        = string
  description = "Stable identifier for this coworker. Mirrors the CoworkerName enum at src/domain/coworkers/CoworkerSession.ts. Fixed value at this scope; declared as a var so the sibling data-engineering module can be copy-paste-derived with a single edit."
  default     = "data-engineering"

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]*$", var.coworker_name))
    error_message = "coworker_name must be lowercase kebab-case."
  }
}
