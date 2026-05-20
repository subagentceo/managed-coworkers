---
date: 2026-05-20
status: accepted
deciders: alex-jadecli
outcome_id: OEMBED1
supersedes: docs/decisions/2026-05-16-platform-engineering-plugin.md (§ "Why Voyage for embeddings (OPE3)")
---

# ADR — embedding strategy pivot from Voyage API to fastembed-local

## Status

Accepted.

## Context

OPE1 (`docs/decisions/2026-05-16-platform-engineering-plugin.md`) committed
the chassis to Voyage AI as the embedding provider. The OPE3 section of
that ADR says:

> "Anthropic publicly recommends Voyage AI in their docs at
> `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`:
> 'Anthropic does not offer its own embedding model. One embeddings
> provider that has a wide variety of options and capabilities
> encompassing all of the above considerations is Voyage AI.'"
>
> "Default model: `voyage-3.5-lite` (cost-optimized, 1024-dim default).
> Switchable to `voyage-code-3` for code retrieval and `voyage-4-large`
> when quality warrants the spend."

That decision predates the OSL1 posture being applied uniformly to
every outbound credential. In practice, Voyage does not fit:

1. **`VOYAGE_API_KEY` in env is the same anti-pattern OSL1 rejects for
   Anthropic.** OSL1 (`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`)
   formalizes the operator's posture that runtime secrets do not get
   stashed in process env. The chassis's `ANTHROPIC_API_KEY` gate at
   `src/oauth/token.ts` fails closed when that key is present. Adopting
   `VOYAGE_API_KEY` would re-introduce exactly the env-key posture the
   chassis just spent a sprint eliminating — different vendor, same
   shape.
2. **Replay mode would need HAR cassettes for every embedding call.**
   The verify chain runs in cassette-replay mode by default. Every
   Voyage `embed()` call would have to be recorded, stored, and
   refreshed when models version. The cassette burden grows linearly
   with corpus size.
3. **The vendor mirror is finite + local.** `vendor/` holds roughly 32
   vendors and a few thousand markdown pages. The chassis is not
   indexing the open web; it is indexing a known, slowly-changing
   corpus that fits comfortably on local disk. Calling a hosted
   embedding API for a corpus of this size is overkill on cost and on
   ceremony.

The operator separately holds HuggingFace Premium, which lifts the
model-download rate limit and unlocks gated models. That is a
one-shot benefit at model-pull time, not a per-inference benefit.

## Decision

Use **fastembed-js** (https://github.com/qdrant/fastembed-js) with
**`bge-small-en-v1.5`** (384-dim) as the default model. Switchable to
**`mxbai-embed-large-v1`** (1024-dim) via env var when quality matters
more than throughput.

Concretely:

| Lane | Value |
|---|---|
| Library | `fastembed` (npm, pure ONNX) |
| Default model | `BAAI/bge-small-en-v1.5` — 384 dims, MIT |
| Quality switch | `mixedbread-ai/mxbai-embed-large-v1` — 1024 dims, Apache-2 |
| Cache root | `~/.cache/fastembed/` (fastembed default) |
| Runtime API surface | none at inference (local ONNX); HF Hub only at one-shot download |

## Why fastembed

- **Pure local ONNX inference.** No API calls at runtime. No
  per-vector network round-trip. Indexing throughput is bounded by
  local CPU/GPU, not by a rate-limited hosted API.
- **npm package, no Python sidecar.** The chassis is TypeScript +
  Workers. A Python embedding sidecar would add a deploy surface the
  rest of the codebase does not need.
- **Same output shape as Voyage** — dense float vectors,
  L2-normalized, ready for cosine. Drop-in compatible with the
  pgvector + AlloyDB ScaNN sink that OPE1 already commits to.
- **Qdrant's reference implementation.** fastembed is the library
  Qdrant ships for client-side embedding, so the upstream is
  maintained by a team whose business depends on it being fast and
  correct.

## Why HuggingFace models specifically

- **`bge-small-en-v1.5`** (BAAI) — MIT-licensed, 384 dimensions,
  consistently in the top tier of MTEB retrieval for its size class.
  Small enough to embed thousands of pages in seconds.
- **`mxbai-embed-large-v1`** (Mixedbread) — Apache-2, 1024
  dimensions, near state-of-the-art on MTEB at the time of writing.
  The quality lever when retrieval accuracy beats out throughput.
- **Both are HF-hosted.** HF Premium is for **model-download rate
  limits** (one-shot per model per machine) — not for inference.
  Inference is local once the model is cached. This is the inverse
  of the Voyage posture, where every inference is billable.

## What we don't do

- **Do not put the HF token in `src/`.** Per OSL1, runtime code in
  `src/` does not read credentials from env. The
  `scripts/download-embed-models.ts` downloader (lives in `scripts/`,
  not `src/`) is allowed to read `HUGGINGFACE_HUB_TOKEN` from env if
  present, but the value is only consumed at model-pull time and never
  threaded into runtime. `scripts/` is the canonical home for
  one-shot, operator-run tooling that may touch env; `src/` stays
  pure.
- **Do not gate any test on HF token presence.** Once the model is
  downloaded to `~/.cache/fastembed/`, indexing and retrieval work
  offline. The verify chain assumes the cache is warm; first-time
  setup pulls the model once, then the cache is durable for the life
  of the machine.
- **Do not record HF Hub download calls in cassettes.** Model
  download is an operator setup step, not a verify-chain step. The
  cassette surface stays bounded to MCP and Claude API calls.
- **Do not retire the AlloyDB + ScaNN sink.** OPE1's storage layer
  is unchanged — only the producer of the vectors changes. Turbopuffer
  vs. AlloyDB ScaNN is orthogonal to whether vectors come from Voyage
  or fastembed.

## Supersedes

This ADR supersedes the **Voyage-specific section ("Why Voyage for
embeddings (OPE3)")** of OPE1
(`docs/decisions/2026-05-16-platform-engineering-plugin.md`). The
rest of OPE1 — the plugin packaging, the Docker MCP profile, the
Turbopuffer + AlloyDB bridge, the skill discipline — remains in
force. Future references to OPE3 should resolve to this ADR.

The OPE3 line in OSL1's replacement-stack table that mentions
"Voyage-embedding-based pattern matcher" should be read as
"fastembed-based pattern matcher" going forward; OSL1 itself is not
otherwise affected.

## References

- [`docs/decisions/2026-05-16-platform-engineering-plugin.md`](./2026-05-16-platform-engineering-plugin.md) — OPE1 (the ADR this partially supersedes)
- [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](./2026-05-16-osv-only-no-secret-scanning.md) — OSL1 (OAuth-only / no-env-key posture)
- [`vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`](../../vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md) — Anthropic's own embeddings guidance (the doc OPE1 cited for the Voyage recommendation)
- fastembed-js — https://github.com/qdrant/fastembed-js
- MTEB (Massive Text Embedding Benchmark) — https://huggingface.co/spaces/mteb/leaderboard
- `BAAI/bge-small-en-v1.5` — https://huggingface.co/BAAI/bge-small-en-v1.5
- `mixedbread-ai/mxbai-embed-large-v1` — https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1
