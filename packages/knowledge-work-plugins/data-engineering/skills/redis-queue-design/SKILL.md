---
name: redis-queue-design
description: Design a Redis-backed task queue with idempotency keys, retry semantics, and dead-letter handling. Use when adding asynchronous work that crosses Worker invocations (e.g. site-portfolio-pulse digest jobs, embedding backfill, scheduled crawls). Picks between Streams / Lists / Sorted Sets based on the access pattern. Produces a key-namespace doc + a TypeScript producer/consumer pair.
argument-hint: "<queue-name> <access-pattern: fifo|priority|pubsub|delayed>"
chassis-grounding: ../../coworker-context.md
---

# Redis Queue Design — stub

This is a stub. Implementation lands in a follow-up commit (ODEP6). When written, this skill will:

1. Take a queue name + access pattern.
2. Pick the appropriate Redis primitive:
   - `fifo` → Lists with BLPOP/BRPUSH
   - `priority` → Sorted Sets (score = priority)
   - `pubsub` → Streams with consumer groups (the chassis's preferred async backbone)
   - `delayed` → Sorted Sets (score = unix timestamp)
3. Document the key namespace under `docs/data/redis-keys.md` (new file if not present):
   - Format: `coworker:<vertical>:<queue>:<id>`
   - TTL conventions
   - Idempotency key strategy
4. Write the TypeScript producer + consumer under `src/lib/queues/<queue-name>.ts` using the chassis's existing Redis client.
5. Wire a smoke test for round-trip enqueue→dequeue→ack.

Cites: `vendor/redis/` for command semantics + Streams consumer-group docs.

See `../../coworker-context.md` for chassis grounding.
