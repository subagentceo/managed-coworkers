---
name: trace-data-flow
description: Trace a piece of data end-to-end across the chassis's data plane (Cloudflare Worker → Redis queue → AlloyDB row → MCP read → skill consumer) and surface gaps. Use when a new feature crosses two or more data-plane components and you need to verify the round trip is wired, observable, and idempotent.
argument-hint: "<data-item-or-event-name>"
chassis-grounding: ../../coworker-context.md
---

# Trace Data Flow

Data-engineering skill. Backed by `scripts/lib/trace-data-flow.ts` (pure functions, 23 unit tests) + `scripts/trace-data-flow.ts` (CLI wrapper).

Given a named data item or event (e.g. "CoworkerSession start"), this skill traces its expected path across all chassis data-plane hops, identifies which hops are missing or incomplete, generates a Mermaid sequence diagram, and proposes concrete fixes.

## Workflow

1. **Identify the data item.** The operator invokes the skill with a named event or domain object — e.g. "CoworkerSession start event", "SiteAuditResult insert".

2. **Inspect each hop via tool calls.** For each of the five standard hops, Claude checks whether the code exists:

   | Hop | What to check |
   |---|---|
   | **Worker** | `infra/cloudflare/coworkers/*/src/worker.ts` — does a handler emit/process this event? |
   | **Redis** | `src/domain/connectors/` — is there a typed key-namespace for this stream/list? |
   | **AlloyDB** | `infra/alloydb/migrations/` — does a migration create the table/column? |
   | **MCP bridge** | `src/mcp/bridge-server.ts` — is there a lane that reads this row? |
   | **Skill consumer** | The relevant skill SKILL.md — does it describe consuming this data? |

3. **Build the hop list.** Construct a `FlowHop[]` array using the inspection results. Mark each hop as `present | missing | partial | unknown`.

   ```json
   [
     { "label": "Worker handler", "type": "worker", "path": "infra/cloudflare/coworkers/product-management/src/worker.ts", "status": "present" },
     { "label": "Redis stream", "type": "redis", "path": "coworker:sessions:new", "status": "missing", "detail": "Key namespace not declared" },
     { "label": "alloydb coworker_sessions", "type": "alloydb", "path": "coworker_sessions", "status": "partial", "detail": "outcome_id column missing" },
     { "label": "MCP bridge support_sessions", "type": "mcp", "path": "support_sessions", "status": "present" },
     { "label": "metrics-review skill", "type": "skill", "path": "skills/metrics-review/SKILL.md", "status": "present" }
   ]
   ```

4. **Run the trace:**

   ```bash
   tsx scripts/trace-data-flow.ts --item="CoworkerSession start event" --flow=hops.json
   ```

   Or use the demo for a realistic example:

   ```bash
   tsx scripts/trace-data-flow.ts --demo
   ```

## Output format

```markdown
# Data Flow Trace — "CoworkerSession start event"

_Generated 2026-05-20T18:00:00.000Z · 5 hops · 60% complete_

## Hop Summary

| # | Hop | Type | Path | Status |
|---|---|---|---|---|
| 1 | Worker handler | worker | `infra/.../worker.ts` | ✅ present |
| 2 | Redis stream | redis | `coworker:sessions:new` | ❌ missing |
| 3 | alloydb coworker_sessions | alloydb | `coworker_sessions` | ⚠️ partial |

## Sequence Diagram

```mermaid
sequenceDiagram
  participant W as Worker handler
  participant R as Redis stream
  ...
```

## Gaps (2)

### 1. Redis stream (missing)

**Suggested fix:** Define the Redis key namespace in src/domain/connectors/ and ensure the Worker enqueues to it.
```

## Completeness scoring

| Score | Meaning |
|---|---|
| 100% | All hops wired — safe to ship |
| 60–99% | Partial — surface gaps before merging |
| < 60% | Significant gaps — do not ship without fixes |

## Connectors

| Connector | Required | Purpose |
|---|---|---|
| cloudflare-codemode | Required | Read Worker source via Cloudflare DevTools MCP |
| alloydb | Required | Inspect migration files + schema |
| (filesystem) | Implicit | Read Redis key namespace files in src/domain/connectors/ |

## See also

- `../../coworker-context.md` — chassis grounding, OAuth-only invariant
- `scripts/lib/trace-data-flow.ts` — pure-function implementation
- `scripts/lib/trace-data-flow.test.ts` — 23 unit tests
- `scripts/trace-data-flow.ts` — CLI wrapper
- `skills/model-data-domain/SKILL.md` — prerequisite: define the domain model before tracing it
- `skills/alloydb-schema/SKILL.md` — companion: author the migration once the gap is surfaced
