# Cloudflare provider. API token sourced from CLOUDFLARE_API_TOKEN at
# runtime; left unconfigured here so `terraform validate` / `terraform plan`
# work without credentials in CI. Apply requires the token to be exported.

provider "cloudflare" {
}
