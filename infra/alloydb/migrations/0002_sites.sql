-- 0002_sites.sql — `sites` table for the operator's 100-site portfolio.
--
-- Outcome: OPMP4.
-- Scope: one row per Cloudflare-hosted site that the product-management
--        managed-coworker (PR #111) tracks for agentic-traffic work.
-- Constraints:
--   - Idempotent (CREATE TABLE IF NOT EXISTS).
--   - Every column has a matching field in src/domain/portfolio/Site.ts.
--   - id = Cloudflare zone_id (stored verbatim as TEXT); foreign keys
--     to coworker_sessions row's id when a session operates on this site.
--   - target_keywords stored as TEXT[] (AlloyDB Omni / PostgreSQL native array).
--
-- @cite vendor/alloydb-omni/
--
-- Rollback: see 0002_sites.down.sql alongside this file.

CREATE TABLE IF NOT EXISTS sites (
  id                       TEXT PRIMARY KEY,
  hostname                 TEXT NOT NULL,
  niche                    TEXT NOT NULL DEFAULT 'unspecified',
  target_keywords          TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  owner                    TEXT NOT NULL DEFAULT 'unspecified',
  search_console_property  TEXT
);

-- Common read pattern: "list sites I own". Operator filters by `owner`
-- to scope a coworker session to a sub-brand slice of the 100-site portfolio.
CREATE INDEX IF NOT EXISTS sites_owner_idx ON sites (owner);

-- The seo-audit + content-gap-brief skills filter by hostname prefix
-- when crawling. Unique index doubles as a uniqueness constraint —
-- duplicate hostnames in the portfolio file are a data error.
CREATE UNIQUE INDEX IF NOT EXISTS sites_hostname_unique_idx ON sites (hostname);
