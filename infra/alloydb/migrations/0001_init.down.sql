-- 0001_init.down.sql — rollback for 0001_init.sql.
-- Outcome: ODEP2.

DROP INDEX IF EXISTS coworker_sessions_ticket_ref_idx;
DROP INDEX IF EXISTS coworker_sessions_started_at_idx;
DROP TABLE IF EXISTS coworker_sessions;
