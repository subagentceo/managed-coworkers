-- 0001_init.sql — bootstrap migration for the managed-coworkers data plane.
--
-- Outcome: ODEP2.
-- Scope: the coworker_sessions table, which records every run of a managed
--        coworker (product-management, data-engineering, future verticals).
-- Constraints:
--   - Idempotent (CREATE TABLE IF NOT EXISTS).
--   - Every column has a matching field in src/domain/coworkers/CoworkerSession.ts.
--   - status is a CHECK-constrained text enum mirroring CoworkerSessionStatus
--     in src/domain/coworkers/CoworkerSession.ts; this is the chassis's
--     established pattern (matches Postgres semantics in vendor/alloydb-omni/).
--
-- @cite vendor/alloydb-omni/
-- @cite docs/decisions/2026-05-20-managed-coworker-vertical.md (forthcoming, OPMP5)
--
-- Rollback: see 0001_init.down.sql alongside this file.

CREATE TABLE IF NOT EXISTS coworker_sessions (
  -- Stable identifier (UUID generated app-side; we don't use gen_random_uuid()
  -- because the app needs the id for Redis-key composition before the row hits
  -- AlloyDB — see docs/data/redis-keys.md "coworker:<vertical>:<queue>:<id>").
  id TEXT PRIMARY KEY,

  -- Which knowledge-work-plugin this session is running.
  -- Matches CoworkerName in src/domain/coworkers/CoworkerSession.ts.
  coworker TEXT NOT NULL CHECK (coworker IN (
    'product-management',
    'data-engineering'
  )),

  -- Outcome ID this session is working toward, per docs/CONVENTIONS.md
  -- (e.g. 'OPMP3', 'ODEP2'). Free-text because new outcome prefixes are
  -- added over the chassis's lifetime; format validated app-side.
  outcome_id TEXT NOT NULL,

  -- The ticket (GitHub Issue or Jira) the 1-ticket-1-PR discipline ties this
  -- session to. Format: 'gh-<repo>#<n>' or 'jira-<PROJECT>-<n>'.
  -- NULL when the session is exploratory work that hasn't picked a ticket yet.
  ticket_ref TEXT,

  -- Lifecycle status. Matches CoworkerSessionStatus in CoworkerSession.ts.
  status TEXT NOT NULL CHECK (status IN (
    'running',
    'idle',
    'failed'
  )) DEFAULT 'running',

  -- Wall-clock timestamps. AlloyDB Omni TIMESTAMPTZ honors microsecond
  -- precision; JS Date round-trips at millisecond precision which is
  -- sufficient for session bookkeeping.
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ
);

-- Index supports the most common read pattern: "show me my latest sessions for
-- coworker X". Equivalent to /sessions sort by started_at DESC in the UI.
CREATE INDEX IF NOT EXISTS coworker_sessions_started_at_idx
  ON coworker_sessions (coworker, started_at DESC);

-- Index supports the 1-ticket-1-PR audit: "show all sessions for ticket Y".
CREATE INDEX IF NOT EXISTS coworker_sessions_ticket_ref_idx
  ON coworker_sessions (ticket_ref)
  WHERE ticket_ref IS NOT NULL;
