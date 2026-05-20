# Sandbox container image for the product-management coworker.
#
# Per-coworker variant of infra/cloudflare/Dockerfile. Bakes the claude
# CLI + the plugin's skill set into a container that the Cloudflare
# Sandbox DO spawns on demand. The Worker shells out via sandbox.exec
# per the cloudflare/claude-managed-agents pattern documented at
#   seeds/citations/cloudflare-managed-agents.md
#
# OAuth-only invariant: receives CLAUDE_CODE_OAUTH_TOKEN at runtime
# (from Secrets Store via the Worker's env-sanitizer). NO image-side
# secrets, NO ANTHROPIC_API_KEY.
#
# Refs: OPMP3b.

FROM mcr.microsoft.com/devcontainers/typescript-node:22

# Claude CLI — the brain that runs inside the sandbox.
RUN npm install -g @anthropic-ai/claude-code

# Bake the plugin's skills + manifest into the image so each sandbox
# spin-up has them on disk without a clone step. Layered separately
# so skill edits don't invalidate the claude-cli install layer.
COPY --from=skills_src packages/knowledge-work-plugins/product-management /opt/product-management

WORKDIR /opt/product-management

# Defense-in-depth: refuse to start if the OAuth invariant is violated.
# The Worker's env-sanitizer is the primary gate; this is a belt.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=1 \
  CMD test -z "${ANTHROPIC_API_KEY:-}" || exit 1

ENTRYPOINT ["claude"]
