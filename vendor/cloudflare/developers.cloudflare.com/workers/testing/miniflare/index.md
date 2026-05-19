# Miniflare

> Chassis-facing reference for the `miniflare` npm package used by
> `src/lib/miniflare-harness.ts` (MINIFLARE-1). Synthesized from the
> installed package's `README.md` and `dist/src/index.d.ts` (Strategy A,
> see `OMINI-CRAWL`). Upstream canonical page lives at
> [developers.cloudflare.com/workers/testing/miniflare](https://developers.cloudflare.com/workers/testing/miniflare/).

## What it is

**Miniflare** is a simulator for developing and testing Cloudflare
Workers, powered by [`workerd`](https://github.com/cloudflare/workerd).
It is a lower-level API designed for tools creators; for ordinary Worker
development the recommended surfaces are Wrangler or the Cloudflare Vite
plugin. The chassis uses Miniflare directly because the
sandbox/replay harnesses need programmatic control over the lifecycle of
an in-process `workerd` instance — no `wrangler dev` subprocess, no
external network, no `ANTHROPIC_API_KEY` plumbing.

Installed version at time of writing: `miniflare@4.20260515.0`, pinned
indirectly through the chassis's `package.json` lockfile. Bundles
`workerd@1.20260515.1`.

## The surface the chassis actually uses

The chassis's wrapper (`src/lib/miniflare-harness.ts`) exposes only the
three load-bearing pieces:

| Symbol | Shape | Used by |
| :--- | :--- | :--- |
| `new Miniflare(opts: MiniflareOptions)` | constructor — starts a `workerd` server | `createMiniflareWorker` |
| `mf.ready: Promise<URL>` | resolves to `http://127.0.0.1:<random>` once the server is listening | `createMiniflareWorker` return value |
| `mf.dispose(): Promise<void>` | shuts the `workerd` server down and releases the port | harness `dispose` callback |

That's it. The chassis does NOT use `dispatchFetch`, `getBindings`,
`getKVNamespace`, `getR2Bucket`, `getDurableObjectNamespace`, or any of
the persistence-path helpers; tests hit `harness.url` over plain
`fetch()`. If a future test needs richer bindings, prefer extending the
harness rather than reaching into `mf` directly so the surface stays
auditable.

## Minimum viable script (matches the harness)

```ts
import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  script: `
    export default {
      async fetch(request, env, ctx) {
        return new Response("hello from miniflare", { status: 200 });
      },
    };
  `,
  compatibilityDate: "2026-01-01",
  compatibilityFlags: ["nodejs_compat"],
});

const url = await mf.ready;             // URL of the listening workerd
const res = await fetch(url);           // plain WHATWG fetch — no `dispatchFetch`
console.log(await res.text());          // "hello from miniflare"
await mf.dispose();                     // ALWAYS dispose, or EADDRINUSE next run
```

## Lifecycle invariants

- **Always `await mf.dispose()` in a `finally` block.** Leaked
  `workerd` subprocesses bind a port; the next test run fails with
  `EADDRINUSE`.
- **The URL returned by `ready` is random per boot.** Hard-coding a port
  in tests is a bug — read it off the resolved `URL`.
- **`modules: true` is required for ES-module workers.** The chassis
  uses ESM exclusively (top-level `export default { fetch }`); the
  service-worker `addEventListener("fetch", ...)` form is upstream
  legacy and not used here.

## `MiniflareOptions` (subset the chassis cares about)

`MiniflareOptions = SharedOptions & (WorkerOptions | { workers: WorkerOptions[] })`.
The harness passes `WorkerOptions` directly for the single-worker case.
Full type lives at `node_modules/miniflare/dist/src/index.d.ts`.

Fields the harness sets explicitly:

| Field | Value | Why |
| :--- | :--- | :--- |
| `modules` | `true` | ES-module worker (not service-worker) |
| `script` | inline ESM string | Caller-provided worker source |
| `compatibilityDate` | `"2026-01-01"` | Matches chassis Worker compat date |
| `compatibilityFlags` | `["nodejs_compat"]` | Required by chassis tests that use `node:*` |

Callers can override anything via the `extra?: Partial<MiniflareOptions>`
argument; the harness merges that on top of the defaults with a spread,
so passing `{ bindings: { FOO: "bar" } }` works.

## When to use this vs. real `wrangler dev`

- **Miniflare (this surface)**: unit + smoke tests that need a real
  `workerd` runtime but no live network and no per-test wrangler bootup
  cost. Sub-second to start; in-process.
- **`wrangler dev`**: full local dev loop with hot reload, live KV/D1
  bindings, and the dev session that Workers Builds expects. Not used
  by tests.

The chassis's `npm run smoke:replay` chain uses the harness; nothing in
`tests/` shells out to `wrangler dev`.

## `crawl.json` shape if/when we re-crawl

This page was synthesized from the local `miniflare` install. If/when
the operator wants to crawl the upstream page directly (Strategy B),
add a per-vendor crawl entry shaped like:

```json
{
  "name": "cloudflare-miniflare",
  "homepage": "https://developers.cloudflare.com/workers/testing/miniflare/",
  "allow_prefixes": [
    "https://developers.cloudflare.com/workers/testing/miniflare/"
  ],
  "deny_prefixes": [],
  "page_cap": 25,
  "transform": "cloudflare-index-md"
}
```

The existing `vendor/cloudflare/crawl.json` covers the broader
`developers.cloudflare.com/` tree but caps at 200 pages, which is too
low to guarantee the miniflare subtree gets pulled. A dedicated entry
(or raising the cap) is the path forward.

## Citation use

Tests that exercise the harness cite this page via:

```ts
/**
 * @cite vendor/cloudflare/developers.cloudflare.com/workers/testing/miniflare/index.md
 * @cite seeds/posture/session-start.xml
 */
```

`scripts/lib/citation-guard.ts` resolves both paths under the chassis's
canonical citation roots (`vendor/`, `seeds/`, `rubrics/`); this file
exists so the first cite stays green.

## Source

- Local install: `node_modules/miniflare/README.md` (957 lines)
- Type surface: `node_modules/miniflare/dist/src/index.d.ts`
  (`Miniflare` class lines ~3919-3962, `MiniflareOptions` ~3976)
- Upstream URL: <https://developers.cloudflare.com/workers/testing/miniflare/>
- Workers SDK monorepo: <https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare>
