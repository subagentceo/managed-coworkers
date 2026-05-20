-- 0002_sites.down.sql — rollback for 0002_sites.sql.
-- Outcome: OPMP4.

DROP INDEX IF EXISTS sites_hostname_unique_idx;
DROP INDEX IF EXISTS sites_owner_idx;
DROP TABLE IF EXISTS sites;
