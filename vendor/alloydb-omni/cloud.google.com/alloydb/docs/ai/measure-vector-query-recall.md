-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Measure vector query recall Stay organized with collections Save and categorize content based on your preferences.

This page describes how to measure vector query recall in AlloyDB for PostgreSQL. In the context of vector search, _recall_ refers to the percentage of vectors that the index returns which are true nearest neighbors. For example, if a nearest neighbor query for the 20 nearest neighbors returns 19 of the ground truth nearest neighbors, then the recall is 19/20x100 = 95%.

In a vector query, recall is important because it measures the percentage of relevant results retrieved from a search. Recall helps you evaluate the accuracy of the results from an approximate nearest neighbor (ANN) search as compared to the results from a k-nearest neighbors (KNN) search.

_ANN_ is an algorithm that finds data points similar to a given query point, and it improves speed by finding the approximate neighbors as opposed to actual neighbors. When you use ANN, you balance speed with recall.

_KNN_ is an algorithm that finds the "k" most similar vectors to a given query vector within a dataset, based on a similarity metric. _k_ is the number of neighbors that you want the query to return.

You can measure the recall of your vector search query for different vector indexes, including the following:

-   Scalable Nearest Neighbors (ScaNN): an algorithm for efficient vector similarity search.
-   Hierarchical Navigable Small World (HNSW): a graph-based algorithm used for efficient approximate nearest neighbor search in vector databases.
-   Inverted File with Flat Compression (IVFFLAT) and Inverted File Flat (IVF): types of vector indexes that are used for ANN searches, particularly in databases like the PostgreSQL `pgvector` extension.

This page assumes that you're familiar with PostgreSQL, AlloyDB, and vector search.

## Before you begin

1.  Install or update the pgvector extension.
    
    1.  If the `pgvector` extension isn't installed, install the `vector` extension version `0.8.0.google-3` or later to store generated embeddings as `vector` values. The `vector` extension includes `pgvector` functions and operators. Google extends this version of `pgvector` with optimizations for AlloyDB.
        
        ```
        CREATE EXTENSION IF NOT EXISTS vector WITH VERSION '0.8.0.google-3';
        ```
        
        For more information, see [Create indexes](/alloydb/docs/ai/create-scann-index).
        
    2.  If the `pgvector` extension is already installed, upgrade the `vector` extension to version 0.8.0.google-3 or later to get recall evaluator capabilities.
        
        ```
        ALTER EXTENSION vector UPDATE TO '0.8.0.google-3';
        ```
        
2.  To create ScaNN indexes, install the `alloydb_scann` extension.
    
    ```
    CREATE EXTENSION IF NOT EXISTS alloydb_scann;
    ```
    

## Evaluate recall for vector queries on a vector index

You can find the recall for a vector query on a vector index for a given configuration using the `evaluate_query_recall` function. This function lets you tune your parameters to achieve the vector query recall results that you want. _Recall_ is the metric used for search quality, and is defined as the percentage of the returned results that are objectively closest to the query vectors. The `evaluate_query_recall` function is turned on by default.

**Note:** Improved recall can result in slower query execution (QPS).

### Find the recall for a vector query

1.  Open a SQL editor in [AlloyDB Studio](/alloydb/docs/manage-data-using-studio) or open a [`psql` client](/alloydb/docs/connect-psql).
2.  [Create a ScaNN, HNSW, or IVFFLAT vector index](/alloydb/docs/ai/store-index-query-vectors?resource=scann).
    
    **Note:** You can create indexes of different methods on a single vector column and compare the performance of your query using each of the created indexes. This is recommended for developmental workloads only.
    
3.  Ensure that the [`enable_indexscan` flag](https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-ENABLE-INDEXSCAN) is on. If the flag is off, no index scan is chosen and the recall for all indexes is 1.
    
4.  Run the `evaluate_query_recall` function, which takes in the query as a parameter and returns the following recall:
    
    ```
    SELECT * FROM evaluate_query_recall( QUERY_TEXT, QUERY_TIME_CONFIGURATIONS, INDEX_METHODS )
    ```
    
    Before you run this command, make the following replacements:
    
    -   `QUERY_TEXT`: the SQL query, enclosed in `$$`.
    -   `QUERY_TIME_CONFIGURATIONS`: Optional: the configuration that you can set for the ANN query. This must be in JSON format. The default value is `NULL`.
    -   `INDEX_METHODS`: Optional: a text array that contains different vector index methods for which you want to calculate the recall. If you set an index method for which a corresponding index doesn't exist, the recall is `1`. The input must be a subset of `{scann, hnsw, ivf, ivfflat}`. If no value is provided, the ScaNN method is used.
        
        To view differences between query recall and execution time, change the query time parameters for your index.
        
        The following table lists query time parameters for ScaNN, HNSW, and IVF/IVFFLAT index methods. The parameters are formatted as `{"scann.num_leaves_to_search":1, "scann.pre_reordering_num_neighbors":10, "hnsw.ef_search": 1}`.
        
        **Index type**
        
        **Parameters**
        
        [ScaNN](/alloydb/docs/reference/ai/scann-index-reference)
        
        -   `scann.num_leaves_to_search`
        -   `scann.pre_reordering_num_neighbors`
        -   `scann.pct_leaves_to_search`
        -   `scann.num_search_threads`
        
        [HNSW](https://github.com/pgvector/pgvector)
        
        -   `hnsw.ef_search`
        -   `hnsw.iterative_scan`
        -   `hnsw.max_scan_tuples`
        -   `hnsw.scan_mem_multiplier`
        
        [IVF](https://github.com/pgvector/pgvector)
        
        -   `ivf.probes`
        -   `ivf.iterative_scan`
        -   `ivf.max_probes`
        
        [IVFFLAT](https://github.com/pgvector/pgvector)
        
        -   `ivfflat.probes`
        -   `ivfflat.iterative_scan`
        -   `ivfflat.max_probes`
        
        For more information about ScaNN index methods, see [AlloyDB ScaNN Index reference](/alloydb/docs/reference/ai/scann-index-reference). For more information about HNSW and IVF/IVFFLAT index methods, see [`pgvector`](https://github.com/pgvector/pgvector).
        
5.  Optional: You can also add configurations from `pg_settings` to the `QUERY_TIME_CONFIGURATIONS`. For example, to run a query with columnar engine scan enabled, add the following config from `pg_settings` as `{"google_columnar_engine.enable_columnar_scan" : on}`.
    
    The configurations are set locally in the function. Adding these configurations doesn't impact the configurations that you set in your session. If you don't set any configurations, AlloyDB uses all of the configurations that you set in the session. You can also set only those configurations that are best suited for your use case.
    
6.  Optional: To view the default configuration settings, run the `SHOW` command or view the `pg_settings`.
    
7.  Optional: If you have a ScaNN index for which you want to tune the recall, see the tuning parameters in [ScaNN index reference](/alloydb/docs/reference/ai/scann-index-reference).
    
    The following is an example output, where `ann_execution_time` is the time that it takes a vector query to execute using index scans. `ground_truth_execution_time` is the time that it takes the query to run using a sequential scan.
    
    `ann_execution_time` and `ground_truth_execution_time` are different from but directly dependent on **Execution time** in the query plan. Execution time is the total time to execute the query from the client.
    
    ```
    t=# SELECT * FROM evaluate_query_recall( $$ SELECT id FROM t1 ORDER BY val <=> '[1000,1000,49000]' LIMIT 10 $$, '{"scann.num_leaves_to_search":1, "scann.pre_reordering_num_neighbors":10, "hnsw.ef_search": 1}', ARRAY['scann', 'hnsw']);
    NOTICE:  Recall is 1. This might mean that the vector index is not present on the table or index scan not chosen during query execution.
    id|               query                                               |                                         configurations                                         |  recall |ann_execution_time | ground_truth_execution_time |  index_type
    ----+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------+--------+--------------------+-----------------------------+------------
    1 |  SELECT id FROM t1 ORDER BY val <=> '[1000,1000,49000]' LIMIT 10  | {"scann.num_leaves_to_search":1, "scann.pre_reordering_num_neighbors":10, "hnsw.ef_search": 1} |    0.5 |               4.23 |                     118.211 | scann
    2 |  SELECT id FROM t1 ORDER BY val <=> '[1000,1000,49000]' LIMIT 10  | {"scann.num_leaves_to_search":1, "scann.pre_reordering_num_neighbors":10, "hnsw.ef_search": 1} |      1 |            107.198 |                     118.211 | hnsw
    (2 rows)
    ```
    
    If the result is `Recall is 1` (recall of the query is `1`), this might indicate that the vector index isn't present on the table or that the vector index wasn't chosen during query execution. This situation occurs when no vector index exists on the table or when the planner doesn't choose the vector index scan.
    
    **Note:** Don't use columns in queries whose value may result in NULL values. If those columns are required, add the `COALESCE` function to the query.
    
    If the query is `select id, name from table order by embedding <->'[1,2,3]' LIMIT 10;.` and the expected value of the column name is `NULL`, then change the query to one of the following:
    
    ```
    select id, COALESCE(name, 'NULL') as name from table order by embedding <-> '[1,2,3]' LIMIT 10;
    ```
    
    Or
    
    ```
    select id from table order by embedding <-> '[1,2,3]' LIMIT 10;
    ```
    

## What's next

-   [Create a ScaNN index](/alloydb/docs/ai/store-index-query-vectors?resource=scann).
-   [Store, index, and query vectors](/alloydb/docs/ai#store-index-query-vectors).
-   [Tune vector query performance](/alloydb/docs/ai/tune-indexes?resource=scann).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.