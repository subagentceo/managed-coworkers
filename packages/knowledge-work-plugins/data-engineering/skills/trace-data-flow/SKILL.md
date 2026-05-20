---
name: trace-data-flow
description: Trace a piece of data end-to-end across the chassis's data plane (Cloudflare Worker → Redis queue → AlloyDB row → MCP read → skill consumer) and surface gaps. Use when a new feature crosses two or more data-plane components and you need to verify the round trip is wired, observable, and idempotent.
argument-hint: "<data-item-or-event-name>"
chassis-grounding: ../../coworker-context.md
---

# Trace Data Flow — stub

This is a stub. Implementation lands in a follow-up commit (ODEP4). When written, this skill will:

1. Take a data item (e.g. "CoworkerSession start event") and identify its expected path across:
   - Producer (which Worker / skill creates it)
   - Queue (which Redis stream / list / set holds it)
   - Persistence (which AlloyDB table records it)
   - Read path (which MCP server exposes it)
   - Consumer (which skill or downstream system reads it)
2. For each hop, verify the code exists:
   - Worker handler (`infra/cloudflare/coworkers/*/src/worker.ts`)
   - Redis key namespace docs
   - Migration column
   - MCP bridge lane
3. Surface gaps with proposed fixes (typically: missing migration, missing bridge lane, missing observability hook).
4. Render a Mermaid sequence diagram in the output.

Cites: `vendor/cloudflare/developers.cloudflare.com/`, `vendor/alloydb-omni/`, `vendor/redis/`.

See `../../coworker-context.md` for chassis grounding.
