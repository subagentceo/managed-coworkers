# Managed Agents — Chassis Replay Adapter

> **Chassis-specific overlay.** The sibling `README.md` is the upstream Anthropic-authored skill content and assumes `ANTHROPIC_API_KEY` everywhere. This file documents the **replay-only** path used by the `managed-coworkers` chassis (see [`docs/decisions/2026-05-18-replay-only-managed-agents.md`](../../../../docs/decisions/2026-05-18-replay-only-managed-agents.md), outcome `OREPLAY0`).
>
> Per the ADR, this chassis runs legal + finance managed-agents against **pollyjs cassettes** — no live `ANTHROPIC_API_KEY`, no `CLAUDE_CODE_OAUTH_TOKEN`. The chassis enforces this with `OSL1` (the `ManagedAgentsClient` constructor throws if `ANTHROPIC_API_KEY` is set, see `src/client.ts`).
>
> The upstream README is kept faithful; this file overlays the parts that diverge.

## Public surface

Importable from the package root (`src/index.ts`):

```ts
import {
  createReplay,
  createCookbookReplay,
  createMiniflareWorker,
  legalAgent,
  financeAgent,
} from "managed-coworkers";
```

## Loading a cookbook (no API call)

```ts
import { legalAgent } from "managed-coworkers";

const slugs = legalAgent.listCookbooks();
// ["diligence-grid", "docket-watcher", "launch-radar", "reg-monitor", "renewal-watcher"]

const cookbook = legalAgent.loadCookbook("diligence-grid");
// { slug, dir, agent, subagents }
// Pure file IO + YAML parse. No network. No env reads.
```

## Replaying against a cassette

```ts
import { createCookbookReplay } from "managed-coworkers";

const { cookbook, polly, cassetteDir } = createCookbookReplay({
  package: "legal",
  slug: "diligence-grid",
  mode: "replay",            // "record" | "replay" | "passthrough"
  recordingName: "baseline", // → cassettes/legal/diligence-grid/baseline.har
});

try {
  // Use cookbook.agent / cookbook.subagents to drive the SDK.
  // In replay mode, any Anthropic SDK call goes through pollyjs;
  // mismatches throw (no live network).
} finally {
  await polly.stop(); // flush in record mode; detach adapter in any mode
}
```

## Recording a cassette (REPLAY-5, not yet landed)

Recording requires a one-shot OAuth token captured outside the repo and **never committed**. The cassette body must be redacted before commit — see [`cassettes/README.md`](../../../../cassettes/README.md) for the redaction rules (Authorization headers, account email, org_id).

```ts
// REPLAY-5 will land a CLI helper. Shape today:
const { polly } = createCookbookReplay({
  package: "legal",
  slug: "diligence-grid",
  mode: "record",
  recordingName: "baseline",
});
// ...make exactly the calls you want recorded...
await polly.stop();
```

## What NOT to do

- Don't edit upstream `README.md` (or other vendored files) to bake in chassis-specific posture. Add adaptations here instead.
- Don't set `ANTHROPIC_API_KEY` in any chassis test. The `ManagedAgentsClient` constructor throws, on purpose (OSL1).
- Don't commit cassettes to `cassettes/tmp/` or `cassettes/scratch/` — `.gitignore` enforces this.

## Related

- `docs/decisions/2026-05-18-replay-only-managed-agents.md` — the ADR.
- `src/lib/replay-harness.ts` — pollyjs wrapper.
- `src/lib/cookbook-loader.ts` — YAML parser.
- `src/lib/cookbook-replay.ts` — the glue layer.
- `cassettes/README.md` — cassette layout + redaction rules.
- `npm run smoke:replay` — 11-check keep-honest baseline.
