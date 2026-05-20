-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Understand adaptive filtering in AlloyDB AI Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). You can process personal data for this feature as outlined in the [Cloud Data Processing Addendum](/terms/data-processing-addendum), subject to the obligations and restrictions described in the agreement under which you access Google Cloud. Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

This page provides a conceptual overview of adaptive filtering in AlloyDB AI, a feature designed to optimize filtered vector searches.

**Note:** Inline filtering is supported only when you use the ScaNN algorithm. Inline filtering is not compatible with the Inverted File (IVF), Inverted File Flat (IVFFlat), or Hierarchical Navigable Small Worlds (HNSW) algorithms.

## What is adaptive filtering?

Adaptive filtering analyzes query patterns and data distributions during query execution to dynamically choose the most efficient filtering strategy such as inline or pre-filtering.

The AlloyDB AI query optimizer uses [cost-based analysis](https://www.postgresql.org/docs/current/planner-optimizer.html) to determine whether inline filtering or pre-filtering provides the best performance at any given point during query execution.

This type of optimization supports AlloyDB AI's filtered vector searches, where adaptive filtering automatically switches between vector and metadata index usage, which produces efficient and accurate results without manual intervention.

## Dynamic switching between filtering strategies

Adaptive filtering automatically and dynamically switches between inline filtering and pre-filtering strategies during query execution based on real-time query patterns and data distributions. The AlloyDB AI query optimizer uses cost-based analysis to determine which strategy provides the best performance at any given point.

### From inline to pre-filtering

When the optimizer determines that pre-filtering is more efficient, adaptive filtering triggers a switch from inline filtering to pre-filtering during execution. The query plan dynamically changes to reflect this.

For example, the plan can show `Bitmap assisted pre-filtering` in the **Execution Strategy** field when the optimizer determines that pre-filtering is more efficient at that point in the query. This dynamic change occurs as the system adapts to the actual data that it encounters during the query's execution.

```
Limit (actual rows=10 loops=1)
  ->  Custom Scan (vector scan) on t1 (actual rows=10 loops=1)
        Execution Strategy: Bitmap assisted pre-filtering
        Order By: (vec_col <=> '[...]'::vector)
        Limit: 10
        ->  Bitmap Index Scan on btree_idx (actual rows=10000 loops=1)
              Index Cond: (int_col <= 100000000)
```

When using `Execution Strategy: Bitmap assisted pre-filtering`, a separate `Bitmap Index Scan` first filters a large dataset. If this pre-filtering effectively narrows down the candidates, the vector index is not used for the final vector similarity search.

### From pre-filtering to inline filtering

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). You can process personal data for this feature as outlined in the [Cloud Data Processing Addendum](/terms/data-processing-addendum), subject to the obligations and restrictions described in the agreement under which you access Google Cloud. Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Adaptive filtering can also dynamically switch from pre-filtering to inline filtering if the AlloyDB AI query optimizer determines that inline filtering is more efficient for the current query characteristics.

In such cases, the query plan dynamically adjusts to reflect a more direct processing of the vector data without an explicit pre-filtering step preceding the vector scan. This adaptability helps achieve optimal performance as data distributions or query parameters change during runtime.

For example, the query plan shows `vector scan` in the **Execution Strategy** field when the optimizer determines that an inline filtering strategy is more efficient for the given query.

```
Limit (actual rows=10 loops=1)
  ->  Custom Scan (vector scan) on t1 (actual rows=10 loops=1)
        Execution Strategy: Bitmap assisted vector Scan on scann_idx
        Order By: (vec_col <=> '[...]'::vector)
        Limit: 10
        Num Requalifications: 0
        Num filtered: 1000
        ->  Bitmap Index Scan on btree_idx (actual rows=10000 loops=1)
              Index Cond: (int_col <= 100000000)
```

In this example, the `Execution Strategy` shows `Bitmap assisted vector Scan on scann_idx`, with an underlying `Bitmap Index Scan` on `btree_idx`. This indicates that the vector search uses a bitmap filter, which the Bitmap Index Scan generates based on the `int_col <= 100000000` condition. The `Custom Scan (vector scan)` then processes only the rows identified by this bitmap, integrating the filtering directly into the vector scan process.

#### Example: How selectivity triggers a dynamic switch

Adaptive filtering bases its decisions on the selectivity of your standard filters. If a filter eliminates a large amount of data, the optimizer likely chooses pre-filtering. If the filter leaves most of the data intact, the optimizer likely chooses inline filtering.

You can observe this dynamic switch in real-time by running the same query and adjusting the selectivity of your `WHERE` clause.

For example, when you query a large table of retail products, you might want to perform a vector search on only items under a specific price.

**Low selectivity**

First, you search for products under $1,000. Because almost every product in the database is under $1,000, the filter has low selectivity. The AlloyDB AI query optimizer determines that gathering almost the entire database into a pre-filtered list is inefficient, so it performs an inline vector scan.

If you look at the query plan, you see that the system dynamically adapted to the massive dataset and chose inline filtering.

  ```
  Limit (actual rows=10)
    -> Custom Scan (vector scan)
    Execution Strategy: Bitmap assisted vector Scan on scann_idx
    Order By: (vec <=> '[...]'::vector)
    -> Bitmap Index Scan
       Index Cond: (price <= 1000)
```

**High selectivity**

Next, you change the query to search for products under $10. As the query begins executing, the AlloyDB AI query optimizer initially prepares to use inline filtering. The planner incorrectly assumes the filter isn't very selective. This happens more often than expected because the statistics used to make these estimates aren't always accurate or up to date. However, it quickly determines that the price filter has high selectivity: very few items in the database are priced this low. The optimizer determines that gathering these few rows before performing the vector scan is much faster, so it dynamically switches strategies to pre-filtering.

The query plan reflects this real-time pivot. The system chose to pre-filter the small dataset before scanning the vectors.

**Planner's initial choice**

```
Limit (actual rows=10)
  -> Custom Scan (vector scan)
     Execution Strategy: Bitmap assisted vector Scan on scann_idx
     Order By: (vec <=> '[...]'::vector)
     -> Bitmap Index Scan
        Index Cond: (price <= 10)
```

**Actual execution (adaptive switch)**

```
Limit (actual rows=10)
  -> Custom Scan (vector scan)
     Execution Strategy: Bitmap assisted pre-filtering
     Order By: (vec <=> '[...]'::vector)
     -> Bitmap Index Scan
        Index Cond: (price <= 10)
```

You don't need to rewrite your application code or manually update database indexes as your data distribution changes over time. AlloyDB AI handles the routing logic for you on every query, ensuring high performance.

## What's next

-   [Filtered vector search in AlloyDB AI](/alloydb/docs/ai/filtered-vector-search-overview)
-   [Activate adaptive filtering in AlloyDB AI](/alloydb/docs/ai/activate-adaptive-filtering)

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
