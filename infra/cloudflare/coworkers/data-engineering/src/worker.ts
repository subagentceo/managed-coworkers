/**
 * Per-coworker Worker for the data-engineering managed-coworker.
 *
 * Clones the env-sanitizer + Sandbox-exec pattern from
 * `infra/cloudflare/src/worker.ts`. This is a minimal stub that
 * validates `wrangler deploy --dry-run`; the full HTTP-per-skill +
 * session DO + AE logging surface lands in a follow-up (ODEP3c).
 *
 * Refs: ODEP3b.
 *
 * OAuth-only invariant: the env-sanitizer rejects any binding named
 * ANTHROPIC_API_KEY before forwarding env into the Sandbox container.
 * Three layers continue to enforce: src/oauth/token.ts (project gate),
 * this sanitizer (Worker gate), the Sandbox image HEALTHCHECK
 * (container gate).
 */

interface Env {
  Sandbox: DurableObjectNamespace;
  SessionDO: DurableObjectNamespace;
  SESSION_INDEX: KVNamespace;
  OUTCOMES_LOG: D1Database;
  CLAUDE_CODE_OAUTH_TOKEN: { get(): Promise<string> };
  COWORKER_NAME: string;
  ENVIRONMENT: string;
}

const FORBIDDEN_ENV_KEYS = new Set(["ANTHROPIC_API_KEY"]);

export function sanitizeEnvForSandbox(input: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(input)) {
    if (FORBIDDEN_ENV_KEYS.has(k)) {
      throw new Error(
        `OAuth-only invariant violated: ${k} is forbidden in Sandbox env. ` +
          "See CLAUDE.md OAuth-only invariant.",
      );
    }
    out[k] = v;
  }
  return out;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/health") {
      return Response.json({
        coworker: env.COWORKER_NAME,
        environment: env.ENVIRONMENT,
        status: "ready",
      });
    }
    return new Response("coworker-data-engineering: stub. See ODEP3c for the skill-dispatch surface.", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  },
};

export class Sandbox {
  constructor(public state: DurableObjectState, public env: Env) {}
  async fetch(): Promise<Response> {
    return new Response("Sandbox DO stub — image: ./Dockerfile (ODEP3b)", { status: 200 });
  }
}

export class SessionDO {
  constructor(public state: DurableObjectState, public env: Env) {}
  async fetch(): Promise<Response> {
    return new Response("SessionDO stub — durable session log per CoworkerSession (ODEP2)", { status: 200 });
  }
}
