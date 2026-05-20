---
title: Redis key namespaces
description: Conventions for every Redis key the chassis writes. Read by the data-engineering coworker's `redis-queue-design` skill before authoring a new queue or cache surface.
last-reviewed: 2026-05-20
outcome: ODEP2
---

# Redis key namespaces

This doc is the canonical map of every Redis key the chassis writes. New queues, caches, or pub/sub channels MUST add an entry here before code that uses them lands. Owned by the `data-engineering` managed-coworker; reviewed when its `redis-queue-design` skill runs.

## Format

```
coworker:<vertical>:<surface>:<id>
```

| Segment | Allowed values | Notes |
|---|---|---|
| `coworker` | literal `coworker` | All chassis writes share this root so the namespace is auditable. |
| `<vertical>` | `product-management`, `data-engineering` (matching `CoworkerName`) | Future verticals add to the enum in `src/domain/coworkers/CoworkerSession.ts`. |
| `<surface>` | `session`, `queue:<name>`, `cache:<name>`, `pubsub:<topic>`, `lock:<resource>` | The surface type drives the Redis primitive (see table below). |
| `<id>` | UUID or stable slug | Format depends on the surface — sessions use the same UUID as `coworker_sessions.id`. |

## Surfaces

| Surface | Redis primitive | TTL | Idempotency |
|---|---|---|---|
| `session:<uuid>` | `HASH` | none (durable; mirrors AlloyDB row) | id-based |
| `queue:<name>` | `STREAM` with consumer group `coworker-<vertical>` | none (trimmed via `XTRIM MAXLEN`) | `idempotency-key` field |
| `cache:<name>:<key>` | `STRING` or `HASH` | 5 min default, override per cache | content-hash key |
| `pubsub:<topic>` | `STREAM` (preferred over PUBSUB; durable) | trimmed via `XTRIM MAXLEN` | message id |
| `lock:<resource>` | `SET <key> <token> NX EX 30` (Redlock-lite) | 30 sec default | random token |

## Conventions

1. **No raw `SET` without TTL** unless the value belongs to a `session:<uuid>` HASH that mirrors a persisted row. Caches that grow unbounded are bugs.
2. **No `KEYS *`** in production — use `SCAN` with `MATCH "coworker:<vertical>:*"`.
3. **Cross-vertical reads** go through the `knowledge-bridge` MCP, never directly. Verticals are share-nothing at the Redis layer.
4. **Streams over Pub/Sub** for any async dispatch — consumer groups survive client restarts; raw PUBSUB drops messages mid-disconnect.

## Active namespaces (as of ODEP2)

| Namespace | Owner | Purpose |
|---|---|---|
| `coworker:*:session:<uuid>` | every vertical | session state mirrored from `coworker_sessions` |

(Empty otherwise — the chassis hasn't shipped queues yet. New entries land via `redis-queue-design` skill runs.)

## See also

- `infra/alloydb/migrations/0001_init.sql` — the corresponding AlloyDB schema
- `src/domain/coworkers/CoworkerSession.ts` — the typed model
- `packages/knowledge-work-plugins/data-engineering/skills/redis-queue-design/SKILL.md` — the skill that authors new entries here
- `vendor/redis/` — Redis 7 command reference
