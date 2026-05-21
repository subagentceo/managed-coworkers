# Amplitude Wizard — full agent reference

This document is for AI coding agents driving `@amplitude/wizard`. The wizard is a CLI that instruments any app with Amplitude analytics — framework detection, SDK install, event instrumentation, and verification — with a first-class agent mode that streams NDJSON to stdout and auto-approves prompts. Every fact below maps to a hand-maintained contract in github.com/amplitude/wizard. The README at https://github.com/amplitude/wizard#readme is the human-readable source of truth.

## 1. Invocation forms

```bash
# Recommended for agents — works without installation:
npx @amplitude/wizard <command> [flags]

# If globally installed (npm install -g @amplitude/wizard):
amplitude-wizard <command> [flags]
```

The wizard's manifest tells you which form to use:

```bash
npx @amplitude/wizard manifest | jq '.invocations'
# [
#   {"argv":["npx","@amplitude/wizard"],"requiresGlobalInstall":false},
#   {"argv":["amplitude-wizard"],"requiresGlobalInstall":true}
# ]
```

## 2. Self-describe first

Always start by reading the manifest:

```bash
npx @amplitude/wizard manifest
```

It returns a typed JSON document (`schemaVersion: 1`) with:

- `invocations` — argv prefixes for npx vs. global bin
- `concepts.hierarchy` — `["org", "project", "app", "environment"]`
- `concepts.glossary` — what each Amplitude term means
- `globalFlags` — every flag with type and default
- `env` — every env var the wizard reads
- `exitCodes` — every documented exit code
- `commands` — every subcommand with its own flags
- `ndjsonSchemaVersion: 1`

The manifest is hand-maintained (not auto-generated), so it is a stable contract. Branch on it, not on `--help` output.

## 3. Agent-friendly verbs

| Command | Output | Read | Write | Network | Use when |
|---|---|---|---|---|---|
| `manifest` | JSON | yes | no | no | discovering the CLI |
| `detect [--json]` | JSON / human | yes | no | no | identifying the framework |
| `status [--json]` | JSON / human | yes | no | yes (auth) | full project state |
| `plan [--json]` | JSON / human | yes | no | yes | building a setup plan, returns `planId` (24h TTL) |
| `apply --plan-id <id> --yes` | NDJSON / human | yes | yes | yes | executing a previously generated plan |
| `verify [--json]` | JSON / human | yes | no | no | post-run sanity check |
| `auth status [--json]` | JSON / human | yes | no | no | login state + token expiry |
| `auth token` | raw token | yes | no | no | scripts that want the OAuth token |
| `projects list [--json --query <q>]` | JSON / human | yes | no | yes | listing the user's projects/envs |
| `mcp serve` | MCP stdio | n/a | n/a | n/a | exposing the wizard as MCP tools |
| `--agent` (default cmd) | NDJSON | yes | yes | yes | full end-to-end setup |

All commands auto-emit JSON when stdout is piped. Force human output with `--human`. `--json` enables JSON without `--agent`'s auto-approve side effects.

## 4. The full wizard run (NDJSON example)

```bash
npx @amplitude/wizard --agent --install-dir . --api-key "$AMPLITUDE_API_KEY"
```

Sample stream (truncated):

```ndjson
{"v":1,"@timestamp":"...","type":"lifecycle","message":"run_started","data":{"event":"start_run"},"session_id":"...","run_id":"..."}
{"v":1,"@timestamp":"...","type":"session_state","message":"region: us","data":{"field":"region","value":"us"}}
{"v":1,"@timestamp":"...","type":"session_state","message":"framework: nextjs","data":{"field":"detectedFramework","value":"nextjs"}}
{"v":1,"@timestamp":"...","type":"lifecycle","message":"inner_agent_started","data":{"event":"inner_agent_started","model":"claude-sonnet-4-...","phase":"wizard"}}
{"v":1,"@timestamp":"...","type":"progress","message":"file_change_planned: edit src/app/layout.tsx","data":{"event":"file_change_planned","operation":"edit","path":"src/app/layout.tsx"}}
{"v":1,"@timestamp":"...","type":"result","message":"file_change_applied: edit src/app/layout.tsx","data":{"event":"file_change_applied","operation":"edit","path":"src/app/layout.tsx"}}
{"v":1,"@timestamp":"...","type":"progress","message":"event_plan_proposed: 12 events","data":{"event":"event_plan_proposed","events":[...]}}
{"v":1,"@timestamp":"...","type":"result","message":"event_plan_confirmed: approved (auto)","data":{"event":"event_plan_confirmed","decision":"approved","source":"auto"}}
{"v":1,"@timestamp":"...","type":"result","message":"dashboard_created: https://app.amplitude.com/...","data":{"event":"dashboard_created","dashboardUrl":"..."}}
{"v":1,"@timestamp":"...","type":"lifecycle","message":"run_completed: success","level":"success","data":{"event":"run_completed","outcome":"success","exitCode":0,"durationMs":61234}}
```

## 5. Capability flags

The wizard splits "ask first" from "let me write" so orchestrators can grant minimal capabilities:

| Flag | autoApprove | allowWrites | allowDestructive |
|---|---|---|---|
| `--auto-approve` | ✓ |  |  |
| `--yes` / `-y` / `--ci` | ✓ | ✓ |  |
| `--force` | ✓ | ✓ | ✓ |
| `--agent` (alone, back-compat) | ✓ | ✓ |  |

If the inner agent attempts a write tool but the capability isn't granted, the wizard exits `13` (`WRITE_REFUSED`) with a `resumeFlag` (`--yes` or `--force`) on the deny event. Re-invoke with that flag.

## 6. Project selection

Amplitude hierarchy: org → project → app → environment. Each Amplitude "app" has its own numeric ID and API key. `--app-id` is globally unique and the only selector agents need:

| Flag | Use |
|---|---|
| `--app-id <id>` | Preferred. Numeric, globally unique, identifies one (org, project, env, app) tuple. |
| `--api-key <key>` | Skip OAuth entirely. Resolves to one app. |
| `--project-id <uuid>` | Narrow to one Amplitude project (UUID, not numeric). |
| `--workspace-id <uuid>` | Legacy alias of `--project-id`. |
| `--org <name>` | Case-insensitive partial match on org name. |
| `--env <name>` | Amplitude environment label (`Production`, `Development`, ...). Not a POSIX env var. |
| `--integration <name>` | Skip framework detection. Values from `manifest.commands[].flags`. |
| `--project-name <name>` | Inline project create when the user has an org but no project. |
| `--region us` / `--region eu` | Data-center region. Required for new accounts via `--signup`. |

## 7. Environment variables

| Var | Effect |
|---|---|
| `AMPLITUDE_WIZARD_API_KEY` | Same as `--api-key`. Project ingestion key, embedded into client code. |
| `AMPLITUDE_TOKEN` / `AMPLITUDE_WIZARD_TOKEN` | OAuth access-token override. Requires prior login. Never embedded into client code. |
| `AMPLITUDE_WIZARD_AGENT=1` | Force agent mode (NDJSON, auto-approve). Same as `--agent`. |
| `AMPLITUDE_WIZARD_MAX_TURNS` | Inner-agent turn cap. Default 200, max 10000. |
| `AMPLITUDE_WIZARD_DEBUG=1` | Verbose logging to the project log file. |
| `AMPLITUDE_WIZARD_LOG=<path>` | Override the log file path. |
| `AMPLITUDE_WIZARD_ALLOW_NESTED=1` | Skip the `nested_agent` diagnostic when running inside another agent session. Sanitization still runs. |
| `AMPLITUDE_WIZARD_CACHE_DIR` | Override `~/.amplitude/wizard/` cache root (used by tests). |
| `NO_COLOR` / `FORCE_COLOR` | Standard. Honored globally. |

## 8. Exit codes

| Code | Name | Meaning | Orchestrator response |
|---|---|---|---|
| `0` | `SUCCESS` | Run completed | continue |
| `1` | `GENERAL_ERROR` | Catch-all | log and abort |
| `2` | `INVALID_ARGS` | yargs / validation failure | fix flags, re-invoke |
| `3` | `AUTH_REQUIRED` | Not signed in | surface `auth_required` event's `instruction` to user; run login; re-invoke with `resumeCommand` |
| `4` | `NETWORK_ERROR` | Couldn't reach Amplitude | retry with backoff |
| `10` | `AGENT_FAILED` | Inner agent run failed | usually transient (model overload, network) — retry once |
| `11` | `PROJECT_NAME_TAKEN` | `--project-name` collided | pick a new name, re-invoke |
| `12` | `INPUT_REQUIRED` | A `needs_input` event would have blocked; `--auto-approve` was not set | inspect the last `needs_input` event, surface to user, re-invoke with one of the `resumeFlags` |
| `13` | `WRITE_REFUSED` | Inner agent tried to write but capability not granted | re-invoke with `--yes` (or `--force` for overwrites) |
| `20` | `INTERNAL_ERROR` | Wizard bug | file a bug at github.com/amplitude/wizard/issues |
| `130` | `USER_CANCELLED` | Ctrl-C | abort |

## 9. NDJSON contract

Envelope on every line:

```ts
interface AgentEventEnvelope<TData = unknown> {
  v: 1;                                 // wire version — bumped only on breaking envelope change
  '@timestamp': string;                 // ISO 8601
  type:
    | 'lifecycle'                       // run start/end, auth_required, nested_agent, inner_agent_started, run_completed
    | 'log'                             // info / warn / error / success / step
    | 'status'                          // notes, push status, heartbeats, spinners
    | 'progress'                        // tool_call, file_change_planned, event_plan_proposed, verification_started, agent_metrics
    | 'result'                          // file_change_applied, event_plan_confirmed, dashboard_created
    | 'error'                           // setRunError, project_create_error
    | 'prompt'                          // legacy — see `needs_input`
    | 'needs_input'                     // canonical structured prompt
    | 'diagnostic'                      // service status, retry state
    | 'session_state';                  // region, framework, credentials_set, login_url
  message: string;                      // human-readable
  session_id?: string;
  run_id?: string;
  data_version?: number;                // per-event-type shape version
  data?: TData;                         // event-specific payload
  level?: 'info' | 'warn' | 'error' | 'success' | 'step';
}
```

Branch on `data.event` for the structured payload. Do not branch on `message` or English text.

### Key events to handle

`auth_required` (paired with exit `3`):

```json
{
  "v": 1,
  "type": "lifecycle",
  "level": "error",
  "message": "Not signed in to Amplitude. Ask the user to run `npx @amplitude/wizard login`...",
  "data": {
    "event": "auth_required",
    "reason": "no_stored_credentials",
    "loginCommand": ["npx", "@amplitude/wizard", "login"],
    "resumeCommand": ["npx", "@amplitude/wizard", "--agent"]
  }
}
```

`reason` ∈ `no_stored_credentials` | `token_expired` | `refresh_failed` | `env_selection_failed`.

`needs_input` (paired with exit `12` if `--auto-approve` not set):

```json
{
  "v": 1, "type": "needs_input", "message": "Select an Amplitude environment",
  "data": {
    "event": "needs_input",
    "code": "environment_selection",
    "ui": { "component": "searchable_select", "title": "...", "searchPlaceholder": "..." },
    "choices": [{ "value": "769610", "label": "Acme / Web / Production",
                   "description": "Acme > Web > Production",
                   "metadata": { "orgId": "...", "projectId": "...", "appId": "769610" },
                   "resumeFlags": ["--app-id", "769610"] }],
    "recommended": "769610",
    "resumeFlags": [{ "value": "769610", "flags": ["--app-id", "769610"] }],
    "responseSchema": { "appId": "string (required, from choices[].value)" },
    "pagination": { "total": 12, "returned": 12 },
    "allowManualEntry": true,
    "manualEntry": { "flag": "--app-id", "placeholder": "Enter Amplitude app ID", "pattern": "^\\d+$" }
  }
}
```

Three ways to resolve, in priority order:

1. Re-invoke with one of the top-level `resumeFlags`.
2. Pipe one JSON line matching `responseSchema` to stdin: `echo '{"appId":"769610"}' | npx @amplitude/wizard --agent ...`.
3. Pass `--auto-approve` and the wizard picks `recommended` (a companion `decision_auto` event will fire).

`nested_agent` (informational, when invoked from inside another AI coding agent):

```json
{
  "v": 1, "type": "lifecycle", "level": "info",
  "message": "Detected nested agent invocation via CLAUDECODE=1...",
  "data": {
    "event": "nested_agent",
    "signal": "claude_code_cli",
    "detectedEnvVar": "CLAUDECODE",
    "bypassEnv": "AMPLITUDE_WIZARD_ALLOW_NESTED"
  }
}
```

The wizard sanitizes inherited `CLAUDECODE` / `CLAUDE_CODE_*` / `CLAUDE_AGENT_SDK_*` env vars before spawning its own SDK subprocess. Nesting is supported. Set `AMPLITUDE_WIZARD_ALLOW_NESTED=1` to suppress the diagnostic.

`run_completed` (terminal — exactly one per run):

```json
{
  "v": 1, "type": "lifecycle", "level": "success",
  "message": "run_completed: success",
  "data": { "event": "run_completed", "outcome": "success", "exitCode": 0, "durationMs": 61234 }
}
```

`outcome` ∈ `success` | `error` | `cancelled`.

`file_change_planned` / `file_change_applied` — emitted around every file write. Pair them by `path` to build an audit trail.

`agent_metrics` — emitted at finalize time with `inputTokens`, `outputTokens`, `costUsd`, `numTurns`, `totalToolCalls`.

### Versioning

Branch on `data_version` per event type, not on the wizard package version. The envelope `v` only bumps on breaking envelope changes; individual event payload shapes evolve independently via the per-event registry.

### Redaction

API keys, OAuth tokens, and stack traces are redacted from stdout. URLs and absolute paths are sanitized in error messages. Don't expect to find secrets on the stream — read them from `~/.ampli.json` or the OS keychain after a successful run if you really need them.

## 10. Stdin protocol

For prompts where the wizard would otherwise emit `needs_input` and pause (today: `environment_selection`), pipe one JSON line to stdin matching `data.responseSchema`:

```bash
echo '{"appId":"769610"}' | npx @amplitude/wizard --agent --install-dir .
```

The wizard reads at most one line, with a 60-second timeout. On timeout or invalid input, it auto-selects the first available environment and emits a warning log event.

## 11. MCP server

`npx @amplitude/wizard mcp serve` runs an MCP stdio server exposing read-only operations as typed tools. For Claude Code / Cursor / Windsurf:

```json
{
  "mcpServers": {
    "amplitude-wizard": {
      "command": "npx",
      "args": ["-y", "@amplitude/wizard", "mcp", "serve"]
    }
  }
}
```

| Tool | Purpose |
|---|---|
| `detect_framework` | Detect the framework in a project |
| `get_project_status` | Full setup state |
| `plan_setup` | Build a `WizardPlan`, returns `planId`. Read-only. |
| `verify_setup` | No-network sanity check |
| `get_auth_status` | Whether signed in + token expiry |
| `get_auth_token` | Stored OAuth access token (security-sensitive) |

To execute a plan, fall through to the `apply` CLI subcommand:

```bash
npx @amplitude/wizard apply --plan-id <id> --yes
```

## 12. Footguns (what NOT to do)

- Don't use Node 18. The wizard requires Node ≥ 20. It hard-fails fast with a clear message.
- Don't scrape `--help`. Use `manifest` (JSON, hand-maintained, stable contract).
- Don't pass `--org` and `--project-id` when you have `--app-id`. `--app-id` is unambiguous and overrides them.
- Don't confuse `--env` with environment variables. It's the Amplitude environment label (`Production`, `Development`, ...).
- Don't branch on the legacy `prompt` event for new code. Use `needs_input`. The `prompt` event remains for back-compat only.
- Don't expect the API key on stdout. It's redacted. Read it from `~/.ampli.json` or the OS keychain after a successful run.
- Don't retry on exit `11` (`PROJECT_NAME_TAKEN`). Pick a new name first.
- Don't retry on exit `12` (`INPUT_REQUIRED`) or `13` (`WRITE_REFUSED`) without a different flag. Inspect the last `needs_input` / write-deny event for `resumeFlags`.
- Don't try to drive the interactive TUI. It only renders on a TTY. In any non-TTY context the wizard auto-detects and switches to JSON output. Use `--agent` explicitly to lock in NDJSON + auto-approve.
- Don't paste OAuth tokens into client code. Use the project API key (`--api-key` / `AMPLITUDE_WIZARD_API_KEY`). The OAuth token (`AMPLITUDE_TOKEN`) is server-side only.

## 13. Verification recipes

```bash
# 1. Did it write SDK init?
npx @amplitude/wizard verify --json

# 2. What did the agent change?
cat .amplitude/events.json            # approved event plan, persistent
cat .amplitude/dashboard.json         # dashboard URL, if a dashboard was created
cat amplitude-setup-report.md         # human-readable setup report

# 3. Are events flowing?
npx @amplitude/wizard status --json | jq '.eventIngestion'
```

## 14. Glossary

- **org** — An Amplitude organization (account-level). Identified by a UUID. Auto-derived from `--app-id` — agents should not pass `--org` directly.
- **project** — A tracking-plan container inside an org (holds branches, tickets, observed schema). Identified by a UUID. Auto-derived from `--app-id`. The backend still calls this a "workspace" internally.
- **app** — An Amplitude app — the ingestion surface that owns an API key and receives events. Identified by a numeric ID (e.g. `769610`). Amplitude's UI labels the same numeric ID "Project ID". Pass `--app-id <id>`; this is the only scope flag agents need.
- **environment** — A named runtime mode of an app (`Production`, `Development`, `Staging`). Not a POSIX environment variable. Each env has its own `app.id` and API key, so `--app-id` already identifies one env.
- **API key** — An app-level ingestion key embedded into client code (`amplitude.init("<key>")`). Fetched automatically after `amplitude-wizard login`; agents should not pass one directly.
- **access token** — An OAuth access token minted by `amplitude-wizard login`. Used for server-side API calls, never embedded in client code. Passed with `AMPLITUDE_TOKEN`.

## 15. Links

- README: https://github.com/amplitude/wizard#readme
- Source: https://github.com/amplitude/wizard
- NDJSON / dual-mode architecture: https://github.com/amplitude/wizard/blob/main/docs/dual-mode-architecture.md
- Curated site index (every public page on amplitude.com): https://amplitude.com/sitemap-llms.txt
- File issues: https://github.com/amplitude/wizard/issues
