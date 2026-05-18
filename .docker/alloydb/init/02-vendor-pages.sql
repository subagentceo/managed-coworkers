-- managed-coworkers vendor_pages table: AlloyDB-side mirror of the
-- on-disk vendor/ tree. Populated by the vendor-refresh loop's
-- crawler dual-write path (re-enabled when the MCP postgres tool
-- is wired into bridge-server.ts).
--
-- Schema follows the columns Neon's old neon-client.ts used pre-ORM1,
-- minus the Neon-specific bits. content_hash enables idempotent upsert.

CREATE TABLE IF NOT EXISTS vendor_pages (
  id          BIGSERIAL PRIMARY KEY,
  vendor      TEXT      NOT NULL,
  path        TEXT      NOT NULL,
  content     TEXT      NOT NULL,
  content_hash TEXT     NOT NULL,
  etag        TEXT,
  last_modified TEXT,
  embedding   vector(1536),  -- claude/openai-style dimension; resize if model changes
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (vendor, path)
);

CREATE INDEX IF NOT EXISTS vendor_pages_vendor_idx ON vendor_pages (vendor);
CREATE INDEX IF NOT EXISTS vendor_pages_hash_idx   ON vendor_pages (content_hash);
CREATE INDEX IF NOT EXISTS vendor_pages_content_trgm_idx
  ON vendor_pages USING gin (content gin_trgm_ops);

-- Vector ANN index: alloydb_scann is preferred for laptop-scale (faster than
-- HNSW for high-recall search per Google's benchmarks). num_leaves tuning is
-- workload-dependent; 100 is a reasonable default for ≤100k rows.
-- See vendor/alloydb-omni/cloud.google.com/alloydb/docs/ai/indexing-strategies.md
-- The index is created at first insert via a trigger to avoid empty-index
-- issues; uncomment the line below once vendor_pages has ≥1000 rows.
-- CREATE INDEX IF NOT EXISTS vendor_pages_embedding_scann_idx
--   ON vendor_pages USING scann (embedding cosine)
--   WITH (num_leaves = 100, quantizer = 'sq8');
