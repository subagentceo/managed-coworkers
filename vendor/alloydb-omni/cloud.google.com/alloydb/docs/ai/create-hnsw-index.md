-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Create indexes Stay organized with collections Save and categorize content based on your preferences.

This page describes how to use stored embeddings to generate indexes and query embeddings using an `HNSW` index with AlloyDB for PostgreSQL. For more information about storing embedding, see [Store vector embeddings](/alloydb/docs/ai/store-embeddings).

**Note:** Before you create an index, verify that you add embedding vectors to a table in your AlloyDB database.

## Before you begin

Before you can start creating indexes, you must complete the following prerequisites.

-   [Embedding vectors are added to a table](/alloydb/docs/ai/store-embeddings) in your AlloyDB database.

-   The `vector` extension version `0.5.0` or later that is based on `pgvector`, extended by Google for AlloyDB is installed.

    ```
    CREATE EXTENSION IF NOT EXISTS vector;
    ```


## Create an `HNSW` index

AlloyDB supports creating a graph-based `hnsw` index available with stock `pgvector` using the AlloyDB `pgvector` extension. Using an `hnsw` index results in a greedy search that moves through the graph constantly looking for neighbor closest to the query vector until it finds an optimum result. It provides faster query performance but slower build times when compared to `IVF`.

For more information about the HNSW algorithm, see [Hierarchical Navigable Small World graphs](https://arxiv.org/abs/1603.09320).

To create an `hnsw` index, run the following query:

```
CREATE INDEX INDEX_NAME ON TABLE
  USING hnsw (EMBEDDING_COLUMN DISTANCE_FUNCTION)
  WITH (m = NUMBER_OF_CONNECTIONS, ef_construction = 'CANDIDATE_LIST_SIZE');
```

Replace the following:

-   `INDEX_NAME`: the name of the index that you want to create—for example, `my-hnsw-index`.

-   `TABLE`: the table to add the index to.

-   `EMBEDDING_COLUMN`: a column that stores `vector` data.

-   `DISTANCE_FUNCTION`: the distance function to use with this index. Choose one of the following:

    -   **L2 distance:** `vector_l2_ops`

    -   **Inner product:** `vector_ip_ops`

    -   **Cosine distance:** `vector_cosine_ops`

-   `NUMBER_OF_CONNECTIONS`: the maximum number of connections per from a node in the graph. You can start with the default value as `16` and experiment with higher values based on the size of your dataset.

-   `CANDIDATE_LIST_SIZE`: the size of a candidate list maintained during graph construction, which constantly updates the current best candidates for nearest neighbors for a node. Set this value to any value higher than twice of the `m` value—for example, `64`.


To view the indexing progress, use the `pg_stat_progress_create_index` view:

```
SELECT * FROM pg_stat_progress_create_index;
```

The `phase` column shows the current state of your index creation, and the `building graph` phase disappears after the index is created.

To tune your index for a target recall and QPS balance, see [Tune an `hnsw` index](/alloydb/docs/ai/tune-indexes).

## Run a query

After you store and index the embeddings in your database, you can start querying using the [`pgvector` query functionality](https://github.com/pgvector/pgvector#querying).

To find the nearest semantic neighbors for an embedding vector, you can run the following example query, where you set the same distance function that you used during the index creation.

  ```
  SELECT * FROM TABLE
    ORDER BY EMBEDDING_COLUMN DISTANCE_FUNCTION_QUERY ['EMBEDDING']
    LIMIT ROW_COUNT
```

Replace the following:

-   `TABLE`: the table containing the embedding to compare the text to.

-   `INDEX_NAME`: the name of the index you want to use—for example, `my-hnsw-index`.

-   `EMBEDDING_COLUMN`: the column containing the stored embeddings.

-   `DISTANCE_FUNCTION_QUERY`: the distance function to use with this query. Choose one of the following based on the distance function used while creating the index:

    -   **L2 distance:** `<->`

    -   **Inner product:** `<#>`

    -   **Cosine distance:** `<=>`

-   `EMBEDDING`: the embedding vector you want to find the nearest stored semantic neighbors of.

-   `ROW_COUNT`: the number of rows to return.

    Specify `1` if you want only the single best match.


For more information about other query examples, see [Querying](https://github.com/pgvector/pgvector?tab=readme-ov-file#querying).

You can also use the [`embedding()`](/alloydb/docs/ai/work-with-embeddings) function to translate the text into a vector. You apply the vector to one of the `pgvector` nearest-neighbor operators, `<->` for L2 distance, to find the database rows with the most semantically similar embeddings.

Because `embedding()` returns a `real` array, you must explicitly cast the `embedding()` call to `vector` in order to use these values with `pgvector` operators.

## What's next

-   [Create a ScaNN index](/alloydb/docs/ai/create-scann-index#before-you-begin)
-   [Run vector similarity searches](/alloydb/docs/ai/run-vector-similarity-search)
-   [Tune vector query performance](/alloydb/docs/ai/tune-indexes)
-   [Vector index metrics](/alloydb/docs/reference/vector-index-metrics)
-   [Learn how to build a smart shopping assistant with AlloyDB, pgvector, and model endpoint management](https://codelabs.developers.google.com/smart-shop-agent-alloydb#0).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
