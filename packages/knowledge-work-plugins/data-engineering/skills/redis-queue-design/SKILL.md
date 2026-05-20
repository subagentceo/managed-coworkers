---
name: redis-queue-design
description: Design a Redis queue or stream for the chassis data plane. Generates a typed key-namespace constant, TypeScript entry schema, and Redis command reference. Use when a new feature needs an in-flight buffer between a Worker and AlloyDB.
argument-hint: "<queue-name> [--structure=stream|list|sorted-set]"
chassis-grounding: ../../coworker-context.md
---

# Redis Queue Design

Data-engineering skill. Backed by `scripts/lib/redis-queue-design.ts` (pure functions, 13 unit tests) + CLI at `scripts/redis-queue-design.ts`.

Given a queue spec (JSON), emits: a typed TypeScript entry schema + key constant, and a Redis command reference table.

## Workflow

1. **Draft the queue spec.** The operator names the queue and lists the fields in each message:

   ```json
   {
     "name": "CoworkerSessionEvent",
     "keyPattern": "coworker:sessions:new",
     "structure": "stream",
     "outcomeId": "ODEP7",
     "maxLen": 10000,
     "fields": [
       { "name": "id",         "type": "string",  "description": "session UUID" },
       { "name": "coworker",   "type": "string"   },
       { "name": "outcome_id", "type": "string"   },
       { "name": "started_at", "type": "iso8601"  },
       { "name": "payload",    "type": "json",    "optional": true }
     ]
   }
   ```

   Supported structures: `stream | list | sorted-set | hash | string`.
   Supported field types: `string | number | boolean | iso8601 | json`.

2. **Generate the schema:**

   ```bash
   tsx scripts/redis-queue-design.ts --spec=queue.json
   ```

3. **Write the output file** to `src/domain/queues/<Name>.ts`.

4. **Wire the producer** in the relevant `infra/cloudflare/coworkers/*/src/worker.ts`.

5. **Verify end-to-end** using the `trace-data-flow` skill.

## Key naming convention

```
<vertical>:<entity>:<state>
coworker:sessions:new
coworker:sessions:processing
sites:audits:pending
```

## Output (stream example)

```ts
export const COWORKERSESSIONEVENT_KEY = "coworker:sessions:new" as const;

export interface CoworkerSessionEvent {
  id: string;        // session UUID
  coworker: string;
  outcome_id: string;
  started_at: string;
  payload?: unknown;
}
```

| Operation | Command |
|---|---|
| Write | `XADD` |
| Read | `XREAD / XREADGROUP` |
| Trim | `XTRIM MAXLEN ~ 10000` |

## Connectors

| Connector | Required | Purpose |
|---|---|---|
| redis | Optional | Confirm key doesn't already exist |

## See also

- `../../coworker-context.md` — chassis grounding
- `scripts/lib/redis-queue-design.ts` — pure-function implementation
- `scripts/lib/redis-queue-design.test.ts` — 13 unit tests
- `skills/trace-data-flow/SKILL.md` — verify the queue is wired end-to-end
- `skills/alloydb-schema/SKILL.md` — persistence layer after the queue drains
