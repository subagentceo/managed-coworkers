# Pin policy: this per-coworker module runs on Cloudflare provider v5
# (separate root module, separate state). The chassis-wide module at
# `infra/terraform/versions.tf` stays on v4.52. The two pins coexist
# because they're different root modules — `terraform init` in each
# directory installs its own provider version into the shared plugin
# cache (TF_PLUGIN_CACHE_DIR).
#
# Refs: OPMP3, operator decision "v5, per-coworker module" (2026-05-20).

terraform {
  required_version = ">= 1.10.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}
