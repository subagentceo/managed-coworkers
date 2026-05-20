---
slug: cloudflare-managed-agents
sources:
  - https://blog.cloudflare.com/claude-managed-agents/
  - https://www.anthropic.com/engineering/managed-agents
  - https://developers.cloudflare.com/sandbox/tutorials/claude-managed-agents/
  - https://developers.cloudflare.com/agents/api-reference/codemode/
local:
  - vendor/anthropic-sitemap/engineering/managed-agents.md
  - vendor/cloudflare-managed-agents-template/  (operator-side study clone, no crawl.json)
drives:
  - chassis sandbox posture (Code Mode + Dynamic Workers as the V8-isolate alternative to microVMs)
  - .mcp.json `cloudflare-codemode` entry (https://mcp.cloudflare.com/mcp)
---

# Claude Managed Agents on Cloudflare — citation extract

Two posts published together describe the same architecture from each
vendor's angle:

- Anthropic engineering: "Managed Agents" — the design rationale
  (decouple brain from hands, sessions outside the harness, MCP +
  secure-vault tokens, many-brains many-hands).
- Cloudflare blog: "Claude Managed Agents" — how to run that
  architecture on Cloudflare Sandboxes + Dynamic Workers + Code Mode.

## Anthropic — load-bearing prose

> We virtualized the components of an agent: a session (the
> append-only log of everything that happened), a harness (the loop
> that calls Claude and routes Claude's tool calls to the relevant
> infrastructure), and a sandbox (an execution environment where
> Claude can run code and edit files). This allows the implementation
> of each to be swapped without disturbing the others.

> The harness leaves the container. Decoupling the brain from the
> hands meant the harness no longer lived inside the container. It
> called the container the way it called any other tool:
> `execute(name, input) → string`.

> The harness also became cattle. Because the session log sits
> outside the harness, nothing in the harness needs to survive a
> crash. When one fails, a new one can be rebooted with
> `wake(sessionId)`, use `getSession(id)` to get back the event log,
> and resume from the last event.

> The structural fix was to make sure the tokens are never reachable
> from the sandbox where Claude's generated code runs. … For custom
> tools, we support MCP and store OAuth tokens in a secure vault.
> Claude calls MCP tools via a dedicated proxy; this proxy takes in a
> token associated with the session. The proxy can then fetch the
> corresponding credentials from the vault and make the call to the
> external service. The harness is never made aware of any credentials.

> In Managed Agents, the session provides this same benefit, serving
> as a context object that lives outside Claude's context window. …
> The interface, `getEvents()`, allows the brain to interrogate
> context by selecting positional slices of the event stream.

## Cloudflare — load-bearing prose

> Decoupling the brain from the hands. The core agent loop runs in
> Anthropic (the "brain"), but the infrastructure for running and
> executing code (the "hands") can be run anywhere, including
> Cloudflare.

> You can execute arbitrary code in Dynamic Workers using Codemode,
> and you still get a file system, but your agent is doing all of
> this within a V8 isolate instead of a microVM.

> If you want a faster, cheaper, and more scalable alternative you
> can use isolates instead of microVMs easily.

> Sandboxed workloads on Cloudflare can use an outbound proxy for
> fully dynamic, customizable, and zero-trust authentication between
> sandboxes and external services. … The agent never has access to
> them. This protects against exfiltration attacks.

> You're able to apply policies per tenant, per agent, or based on
> whatever metadata is useful.

## Why this matters for the chassis

This repo is itself a chassis for the operator-side half: an
orchestrator + sub-agents over an MCP bridge. The Anthropic side of
the Managed Agents architecture (the "brain") is what hosts our
Claude calls. The Cloudflare side (the "hands") is what the
`cloudflare-codemode` MCP server in `.mcp.json` exposes — broad
access to the Cloudflare API via Code Mode, so the chassis can call
Workers / R2 / D1 / KV / AI / Vectorize without burning tokens on
per-API tool descriptions.

The deployment template at `vendor/cloudflare-managed-agents-template/`
(study clone, no `crawl.json`) is the reference Cloudflare publishes
for self-managed deployments. Notable files:

- `wrangler.jsonc` — Worker + Sandbox + Dynamic Workers bindings
- `docs/isolate-vs-vm-sandboxes.md` — when to pick V8 isolate vs microVM
- `docs/applying-egress-policies.md` — the outbound proxy pattern Anthropic cites
- `docs/connecting-to-private-services.md` — Workers VPC + Mesh wiring
- `docs/adding-custom-tools.md` — MCP custom tool extension point

## URL set referenced by this extract

Cloudflare developer docs (in `vendor/cloudflare/` allowlist; section
llms.txt files now list these, full content pages will be mirrored
when the crawler recurses into section llms.txts):

- developers.cloudflare.com/sandbox/tutorials/claude-managed-agents/
- developers.cloudflare.com/sandbox/claude-managed-agents/
- developers.cloudflare.com/agents/api-reference/codemode/
- developers.cloudflare.com/sandbox/bridge/http-api/
- developers.cloudflare.com/dynamic-workers/
- developers.cloudflare.com/browser-run/
- developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/
- developers.cloudflare.com/workers-vpc/

Anthropic surfaces (already mirrored):

- vendor/anthropic-sitemap/engineering/managed-agents.md
- vendor/anthropics/platform.claude.com/docs/en/managed-agents/
- vendor/claude-sitemap/blog/claude-managed-agents.md
- vendor/claude-sitemap/blog/new-in-claude-managed-agents.md
- vendor/claude-sitemap/resources/tutorials/what-is-claude-managed-agents.md
