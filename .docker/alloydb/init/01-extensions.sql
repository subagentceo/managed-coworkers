-- managed-coworkers AlloyDB Omni initialization.
-- Runs once on first container startup against the database created by
-- POSTGRES_DB=coworkers. Extensions are idempotent (IF NOT EXISTS).

-- Vector data type + ivfflat/hnsw access methods.
-- Google's build of pgvector with extra optimizations for AlloyDB.
-- Required for embedding storage and nearest-neighbor search.
CREATE EXTENSION IF NOT EXISTS vector;

-- AlloyDB ScaNN: Google's approximate nearest neighbor index.
-- Faster than HNSW at scale for high-recall vector search.
-- See vendor/alloydb-omni/cloud.google.com/alloydb/docs/ai/indexing-strategies.md
CREATE EXTENSION IF NOT EXISTS alloydb_scann;

-- In-database embedding generation. Lets us call google_ml.embedding('model','text')
-- and store the result directly without round-tripping through the agent.
-- Requires registering a model endpoint; see vendor/alloydb-omni docs.
CREATE EXTENSION IF NOT EXISTS google_ml_integration;

-- Query telemetry — surfaces slow queries to google_db_advisor.
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Trigram text-similarity index for fast LIKE / regex over vendor docs.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- UUID generation for primary keys.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hypothetical indexes — lets db_advisor recommend without creating.
CREATE EXTENSION IF NOT EXISTS hypopg;
