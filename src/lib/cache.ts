/**
 * Lazy Redis cache helper.
 *
 * - First call lazy-connects to REDIS_URL.
 * - If REDIS_URL is unset OR connection fails, all operations no-op silently
 *   so callers can use the cache as a "best effort" layer — callers always
 *   fall back to whatever the source of truth is (filesystem, DB, network).
 * - All ops are wrapped in try/catch so a transient redis failure never
 *   bubbles to the agent.
 *
 * Used by src/mcp/lanes/vendor.ts:vendor_fetch to skip filesystem reads when
 * the same URL was fetched in this session. TTL defaults to 1 hour.
 */
import { createClient } from "redis";
import type { RedisClientType } from "redis";

let client: RedisClientType | null = null;
let attempted = false;
let disabled = false;

async function getClient(): Promise<RedisClientType | null> {
  if (disabled) return null;
  if (client) return client;
  if (attempted) return null;
  attempted = true;
  const url = process.env.REDIS_URL;
  if (!url) {
    disabled = true;
    return null;
  }
  try {
    const c: RedisClientType = createClient({ url });
    c.on("error", () => {
      // Suppress reconnect-storm errors. Already disabled on first failure below.
    });
    await c.connect();
    client = c;
    return c;
  } catch {
    disabled = true;
    return null;
  }
}

export async function cacheGet(key: string): Promise<string | null> {
  const c = await getClient();
  if (!c) return null;
  try {
    return await c.get(key);
  } catch {
    return null;
  }
}

export async function cacheSetEx(key: string, value: string, ttlSeconds = 3600): Promise<void> {
  const c = await getClient();
  if (!c) return;
  try {
    await c.setEx(key, ttlSeconds, value);
  } catch {
    // ignore
  }
}

export async function cacheClose(): Promise<void> {
  if (client) {
    try { await client.quit(); } catch { /* ignore */ }
    client = null;
  }
}
