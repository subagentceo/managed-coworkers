#!/bin/bash
# .devcontainer/post-create.sh
#
# Runs once after the devcontainer is first built. Installs chassis
# dependencies + the claude CLI + the data-plane stack.
#
# OAuth-only invariant: refuses to proceed if ANTHROPIC_API_KEY is set
# in env. The chassis runs claude under CLAUDE_CODE_OAUTH_TOKEN only.
#
# Refs: OPMP2.

set -euo pipefail

echo "==> Enforcing OAuth-only invariant"
if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  echo "ERROR: ANTHROPIC_API_KEY is set in the devcontainer env." >&2
  echo "       The chassis is OAuth-only. Unset it before continuing." >&2
  echo "       (See CLAUDE.md 'OAuth-only invariant' for full reasoning.)" >&2
  exit 1
fi

echo "==> Installing npm dependencies"
npm ci --no-audit --no-fund || npm install --no-audit --no-fund

echo "==> Installing claude CLI (skipped if already present)"
if ! command -v claude >/dev/null 2>&1; then
  npm install -g @anthropic-ai/claude-code
else
  echo "    claude CLI already installed: $(claude --version)"
fi

echo "==> Installing wrangler CLI (skipped if already present via npm)"
if ! command -v wrangler >/dev/null 2>&1; then
  npm install -g wrangler
fi

echo "==> Bringing up data-plane stack (AlloyDB + Redis) via .docker/compose.yaml"
if [ -f .docker/compose.yaml ]; then
  if [ -f .docker/.env ]; then
    docker compose --file .docker/compose.yaml up -d
  else
    echo "    NOTE: .docker/.env missing — operator must create it before docker compose up."
    echo "    Skipping data-plane start for now; run 'docker compose --file .docker/compose.yaml up -d' once .env is in place."
  fi
fi

echo "==> Reminder: run 'claude /login' once to authenticate with your Claude subscription."
echo "==> Done."
