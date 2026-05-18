-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Maintain vector indexes Stay organized with collections Save and categorize content based on your preferences.

To ensure that your vector indexes adapt to changes that might impact the accuracy of your search results, maintain your vector indexes.

## Before you begin

Before you manage index maintenance, install or update the `vector` and `alloydb_scann` extensions:

-   If the `vector` and `alloydb_scann` extensions are not installed, install them.
    
    ```
    CREATE EXTENSION IF NOT EXISTS vector;
    CREATE EXTENSION IF NOT EXISTS alloydb_scann;
    ```
    
-   If the `vector` and `alloydb_scann` extensions are already installed, update them.
    
    ```
    ALTER EXTENSION vector UPDATE;
    ALTER EXTENSION alloydb_scann UPDATE;
    ```
    

## Maintain indexes automatically

You can let AlloyDB automatically manage your vector indexes. As your dataset grows, AlloyDB analyzes and updates centroids and splits large outlier partitions. This automatically improves queries per second (QPS) and search result quality. Any automatic updates are permanent until the next maintenance run.

AlloyDB enables automatic index maintenance by default for [automatically-tuned ScaNN indexes](/alloydb/docs/ai/create-scann-index#create-auto-tuned-scann-index). If you want to create automatically-tuned ScaNN indexes, but disable automatic maintenance, see [Disable automatic maintenance for auto indexes](#disable-auto-maintenance).

To enable automatic maintenance for manually-created indexes, see [Enable automatic maintenance during index creation](#enable-auto-maintenance).

**Note:** If you're using [four-level tree indexes](/alloydb/docs/ai/create-scann-index#create-scann-index-manual) ([Preview](https://cloud.google.com/products#product-launch-stages)), you can't use automatic index maintenance.

### Enable automatic maintenance during index creation

To enable auto maintenance during index creation, set the `auto_maintenance` parameter to `on`. For example, see the following command that creates a ScaNN vector index.

```
CREATE INDEX INDEX_NAME ON TABLE_NAME \
USING scann (EMBEDDING_COLUMN_NAME DISTANCE_FUNCTION_NAME) \
WITH (mode='INDEX_MODE', num_leaves=NUM_PARTITIONS, auto_maintenance=on);
```

Replace the following variables:

-   `INDEX_NAME`: name of the index you want to create. For example, `my_scann_index`. Index names are shared across your database. Ensure that each index name is unique to each table in your database.
    
-   `TABLE_NAME`: table that you want to add the index to.
    
-   `EMBEDDING_COLUMN_NAME`: column that stores the `vector` data you want to index.
    
-   `DISTANCE_FUNCTION_NAME`: distance function to use with this index. Choose one of the following:
    
    -   **L2 distance:** `l2`
        
    -   **Dot product:** `dot_product`
        
    -   **Cosine distance:** `cosine`
        
-   `INDEX_MODE`: mode to create the ScaNN index in. The available values are as follows:
    
    -   `AUTO`: AlloyDB automatically manages and tunes the index's structure. The default `auto_maintenance` value, when `mode` is set to `AUTO`, is `on`.
        
    -   `MANUAL`: Manually manage and tune your ScaNN index. The default `auto_maintenance` value, when `mode` is set to `MANUAL`, is `off`.
        
    
    For more information on which index mode to use, see [Create a ScaNN index](/alloydb/docs/ai/create-scann-index).
    
-   `NUM_PARTITIONS`: number of partitions to apply to this index. Set this to any value between `3` and `1048576`. For more information about how to decide this value, see [Tune a `ScaNN` index](/alloydb/docs/ai/tune-indexes).
    

### Configure automatic maintenance for existing indexes

To configure automatic maintenance for existing manual indexes, run the following command:

```
ALTER INDEX INDEX_NAME SET (auto_maintenance = AUTOMATIC_MAINTENANCE);
```

Replace the following variables:

-   `INDEX_NAME`: name of the index you want to alter. For example, `my_scann_index`.
    
-   `AUTOMATIC_MAINTENANCE`: enable or disable automatic maintenance. To enable, set the value to `on`. To disable, set the value to `off`.
    

### Increase automatic maintenance throughput

To increase automatic maintenance throughput, configure the [`scann.max_background_workers`](/alloydb/docs/reference/alloydb-flags#scann.max_background_workers) database flag. Increasing the number of background workers increases the number of indexes processed per unit of time. It doesn't reduce the processing time for individual indexes. This value must be less than the [`max_worker_processes`](https://www.postgresql.org/docs/17//runtime-config-resource.html#GUC-MAX-WORKER-PROCESSES) value set for your database cluster.

For more information on configuring database flags, see [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags).

### Increase automatic maintenance delay

To increase the delay between automatic maintenance runs, configure the [`scann.maintenance_background_naptime_s`](/alloydb/docs/reference/alloydb-flags#scann.maintenance_background_naptime_s) database flag.

For more information on configuring database flags, see [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags).

### Search percentage of partitions

As the number of partitions grows from AlloyDB automatically splitting large outlier partitions, we recommend that you adjust the number of leaves that you search to maintain optimal performance. To manage this number automatically, configure the `scann.pct_leaves_to_search` parameter.

`scann.pct_leaves_to_search` represents the percentage of current partitions to search. You can set this parameter to any value between `0` and `100`. The default value is `0`, which disables this parameter, and uses the value set in [`scann.num_leaves_to_search`](/alloydb/docs/reference/ai/scann-index-reference#scann_num_leaves_to_search) instead. If `scann.num_leaves_to_search` is also set to `0`, then AlloyDB defaults to `1%` of leaves.

If you expect your dataset to grow significantly, set the initial value to `1`.

To set the `scann.pct_leaves_to_search`, run the following command:

```
ALTER DATABASE DB_NAME SET scann.pct_leaves_to_search = PERCENTAGE_PARTITIONS_TO_SEARCH;
```

Replace the following variables:

-   `DB_NAME`: name of your database.
-   `PERCENTAGE_PARTITIONS_TO_SEARCH`: percentage of partitions to search.

### Manually invoke index maintenance

If you want to invoke maintenance on a particular index manually, run the following command:

```
SELECT scann_index_maintenance('INDEX_NAME');
```

Replace `INDEX_NAME` with the name of the index you want to invoke maintenance on. For example, `my_scann_index`.

### Disable automatic maintenance for auto indexes

To disable automatic maintenance for automatically-tuned ScaNN indexes, set the `auto_maintenance` parameter to `OFF` during index creation. For example, see the following command that creates an automatically-tuned ScaNN index:

```
CREATE INDEX similarity_index ON products
       USING scann (description_embedding cosine)
WITH (MODE = 'AUTOMATIC', auto_maintenance = 'OFF');
```

If you want to disable automatic maintenance on an existing automatically-tuned ScaNN index, see [Configure automatic maintenance for existing indexes](#configure-auto-maintenance-existing-indexes).

## Manually rebuild your index

If your table is prone to frequent updates or insertions, we recommend periodically rebuilding your ScaNN index to improve its recall accuracy. For more information on viewing changes in vector distributions or mutations since your index was built, see [View vector index metrics](/alloydb/docs/reference/vector-index-metrics).

To manually rebuild your index using its original configurations, run the following command:

```
REINDEX INDEX CONCURRENTLY INDEX_NAME;
```

Replace `INDEX_NAME` with the name of the index you want to rebuild. For example, `my_scann_index`.

For more information about reindexing in PostgreSQL, see [REINDEX](https://www.postgresql.org/docs/17/sql-reindex.html).

## What's next

-   [Create a ScaNN index](/alloydb/docs/ai/create-scann-index)
-   [Vector index metrics](/alloydb/docs/reference/vector-index-metrics)
-   [Optimize vector query performance for ScaNN](/alloydb/docs/ai/scann-vector-query-perf-overview)

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.