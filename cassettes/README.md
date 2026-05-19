# cassettes/

Pollyjs HTTP recordings for the replay-only managed-agents (OREPLAY0,
see `docs/decisions/2026-05-18-replay-only-managed-agents.md`).

## Layout

```
cassettes/
├── legal/
│   └── <cookbook-slug>/
│       └── <request-name>.har
└── finance/
    └── <cookbook-slug>/
        └── <request-name>.har
```

Where:

- **legal/** mirrors `packages/claude-for-legal/managed-agent-cookbooks/`.
  Cookbook slugs: `diligence-grid`, `docket-watcher`, `launch-radar`,
  `reg-monitor`, `renewal-watcher`.
- **finance/** mirrors `packages/financial-services/managed-agent-cookbooks/`.
  Cookbook slugs: `earnings-reviewer`, `gl-reconciler`, `kyc-screener`,
  `market-researcher`, `meeting-prep-agent`, `model-builder`,
  `month-end-closer`, `pitch-agent`, `statement-auditor`, …

Each cassette is a HAR file. Pollyjs writes one per recording name —
keep recording names stable so replays match.

## Recording a cassette

Recording requires a one-shot OAuth token captured outside the repo
and never committed. The chassis is OAuth-only (OSL1) — no
`ANTHROPIC_API_KEY`.

```typescript
// REPLAY-5 (task #61) will land the actual recorder. Shape:
const polly = createReplay({
  recordingName: "diligence-grid-baseline",
  mode: "record",
  cassetteDir: "cassettes/legal/diligence-grid",
});
// ...make exactly the calls you want recorded...
await polly.stop();  // flushes the .har to disk
```

## Redacting secrets before commit

Before committing any `.har`, scrub:

- `Authorization: Bearer …` headers (replace with `***REDACTED***`).
- Any request body or response body that includes the recording
  account's email / org_id (the chassis rotates 3 Max accounts;
  cassettes must be account-agnostic).
- `x-request-id`, `cf-ray`, and other origin-server breadcrumbs are
  fine to keep.

## Forbidden directories

`cassettes/tmp/` and `cassettes/scratch/` are caller scratch dirs and
must never be committed. The repo `.gitignore` enforces this — see
the `cassettes/` rules at the top level.
