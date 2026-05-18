-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Best practices for tuning ScaNN indexes in AlloyDB for PostgreSQL Stay organized with collections Save and categorize content based on your preferences.

Follow best practices to tune your ScaNN indexes and balance between search recall and queries per second (QPS). Depending on how many levels your index has, the recommended parameters and values change.

For information about creating ScaNN indexes, see [Create a ScaNN index](/alloydb/docs/ai/create-scann-index).

## Limits

Before you start tuning your ScaNN indexes, acknowledge the following limit:

-   [`num_leaves`](/alloydb/docs/reference/ai/scann-index-reference#num_leaves) is capped at 30 million.

## Before you begin

If you want to create a four-level ScaNN index, you must first enable the [Preview](https://cloud.google.com/products#product-launch-stages) feature for your AlloyDB instance. To enable the Preview feature, choose one of the following two methods:

-   Enable the [`scann.enable_preview_features`](/alloydb/docs/reference/alloydb-flags#scann.enable_preview_features) database flag.
    
    For more information on configuring database flags, see [Configure database flags](/alloydb/docs/instance-configure-database-flags).
    
-   Set the session-level [`scann.max_allowed_num_levels`](/alloydb/docs/reference/alloydb-flags#scann.max_allowed_num_levels) database flag to `3`.
    
    ```
    SET scann.max_allowed_num_levels = 3;
    ```
    

## Two-level tree index

To apply recommendations to help you find the optimal values of `num_leaves` and `num_leaves_to_search` for your dataset, follow these recommended steps:

1.  To create the `ScaNN` index optimized for the following cases set the `num_leaves` parameter to the following value, where rows is the number of rows in the indexed table:
    -   **balanced index build time and quality** set `num_leaves` to `sqrt(rows)`.
    -   **quality** set num\_leaves to rows/100.
2.  Run your test queries, increasing the value of `scann.num_of_leaves_to_search`, until you achieve your target recall range–for example, 95%. For more information about analyzing your queries, see [Analyze your queries](/alloydb/docs/ai/tune-indexes?resource=scann#explain-analyze).
3.  Take note of the ratio between `scann.num_leaves_to_search` and `num_leaves` that will be used in subsequent steps. This ratio provides an approximation around the dataset that will help you achieve your target recall.  
      
    If you are working with high dimension vectors (500 dimensions or higher) and want to improve recall, then try tuning the value of `scann.pre_reordering_num_neighbors`. The default value is set to the value `50 * K` where `K` is the limit that you set in your query.
4.  If your QPS is too low after your queries achieve a target recall, then follow these steps:
    1.  Recreate the index, increasing the value of `num_leaves` and `scann.num_leaves_to_search` according to the following guidance:
        -   Set `num_leaves` to a larger factor of the square root of your row count. For example, if the index has `num_leaves` set to the square root of your row count, try setting it to double the square root. If the value is already double, then try setting it to triple the square root.
        -   Increase `scann.num_leaves_to_search` as needed to maintain its ratio with `num_leaves`, which you noted in Step 3.
        -   Set `num_leaves` to a value less than or equal to the row count divided by 100.
    2.  Run the test queries again. While you're running the test queries, experiment with reducing `scann.num_leaves_to_search`, finding a value that increases QPS while keeping your recall high. Try different values of `scann.num_leaves_to_search` without rebuilding the index.
5.  Repeat Step 4 until both the QPS and the recall range have reached acceptable values.

**Note:** If the query doesn't return sufficient results with filters, you can adjust the [`scann.satisfy_limit`](/alloydb/docs/reference/ai/scann-index-reference#scann-satisfy-limit)([Preview](https://cloud.google.com/products#product-launch-stages)) and [`scann.max_pct_leaves_to_search`](/alloydb/docs/reference/ai/scann-index-reference#scann-max-pct-leaves-to-search)([Preview](https://cloud.google.com/products#product-launch-stages)) parameters.

## Three-level tree index

In addition to the recommendations for the two-level tree `ScaNN` index, use the following guidance.

To apply recommendations to find the optimal value of `num_leaves` and `max_num_levels` index parameters, follow these steps:

1.  Create the `ScaNN` index with the following `num_leaves` and `max_num_levels` combinations based on your performance goals:
    
    -   **balance index build time & quality**: Set `max_num_levels` as `2` and `num_leaves` as `power(rows, ⅔)`.
    -   **optimize for quality**: Set `max_num_levels` as `2` and `num_leaves` as `rows/100`.
2.  Run your test queries. For more information about analyzing queries, see [Analyze your queries](/alloydb/docs/ai/tune-indexes?resource=scann#explain-analyze).
    
3.  Take note of the ratio between `scann.num_leaves_to_search` and `num_leaves` that will be used in subsequent steps. This ratio provides an approximation around the dataset that will help you achieve your target recall.
    

If you are working with high dimension vectors (500 dimensions or higher) and want to improve recall, then try tuning the value of `scann.pre_reordering_num_neighbors`. The default value is set to the value `50 * K` where `K` is the limit that you set in your query.

1.  If your QPS is too low after your queries achieve a target recall, then follow these steps:
    
    -   Recreate the index, increasing the value of `num_leaves` and `scann.num_leaves_to_search` according to the following guidance:
    -   Set `num_leaves` to a larger factor of the `power(rows, ⅔)`. For example, if the index has `num_leaves` set to the `power(rows, ⅔)`, try setting it to double the `power(rows, ⅔)`. If the value is already double, then try setting it to triple the `power(rows, ⅔)`.
    -   Increase `scann.num_leaves_to_search` as needed to maintain its ratio with `num_leaves`, which you noted in Step 3.
    -   Set `num_leaves` to a value less than or equal to `rows/100`.
    -   Run the test queries again. While you're running the test queries, experiment with reducing `scann.num_leaves_to_search`, finding a value that increases QPS while keeping your recall high. Try different values of `scann.num_leaves_to_search` without rebuilding the index.
2.  Repeat Step 4 until both the QPS and the recall range have reached acceptable values.
    

**Note:** If the query doesn't return sufficient results with filters, you can adjust the [`scann.satisfy_limit`](/alloydb/docs/reference/ai/scann-index-reference#scann-satisfy-limit)([Preview](https://cloud.google.com/products#product-launch-stages)) and [`scann.max_pct_leaves_to_search`](/alloydb/docs/reference/ai/scann-index-reference#scann-max-pct-leaves-to-search)([Preview](https://cloud.google.com/products#product-launch-stages)) parameters.

## Four-level tree index

**Preview — Four-level ScaNN indexes**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

In addition to the recommendations for [three-level tree indexes](#scann-index-creation-three-level), use the following guidance to find the optimal value for [`num_leaves`](/alloydb/docs/reference/ai/scann-index-reference#num_leaves) and [`max_num_levels`](/alloydb/docs/reference/ai/scann-index-reference#max_num_levels):

1.  [Create a ScaNN index](/alloydb/docs/ai/create-scann-index) with the following `num_leaves` and `max_num_levels` combinations based on your performance goals:
    
    -   Balance index build time & quality: set `max_num_levels` to `3` and `num_leaves` as `power(ROWS, 3/4)`.
        
    -   Optimize for quality: set `max_num_levels` to `3` and `num_leaves` as `ROWS/100`.
        
2.  Run your test queries. For more information about analyzing queries, see [Analyze your queries](/alloydb/docs/ai/tune-indexes#explain-analyze).
    
3.  Take note of the ratio between [`scann.num_leaves_to_search`](/alloydb/docs/reference/ai/scann-index-reference#scann_num_leaves_to_search) and `num_leaves`. You use this ratio to achieve your target recall in subsequent steps.
    
    If you are working with high dimension vectors (500 dimensions or higher) and want to improve recall, try tuning the value of [`scann.pre_reordering_num_neighbors`](/alloydb/docs/reference/ai/scann-index-reference#scann_pre_reordering_num_neighbors).
    
4.  If your QPS is too low after your queries achieve a target recall, then recreate the index, increasing the value of `num_leaves` and `scann.num_leaves_to_search` according to the following guidance:
    
    1.  Set `num_leaves` to a larger factor of `power(ROWS, 3/4)`. For example, if the index has `num_leaves` set to the `power(ROWS, 3/4)`, try setting it to double that. If the value is already double, then try setting it to triple.
        
    2.  Increase `scann.num_leaves_to_search` as needed to maintain its ratio with `num_leaves`, which you noted in step three.
        
    3.  Set `num_leaves` to a value less than or equal to `ROWS/100`.
        
    4.  Run the test queries again. While you're running the test queries, experiment with reducing `scann.num_leaves_to_search`. Find a value that increases QPS while keeping your recall high. Try different values of `scann.num_leaves_to_search` without rebuilding the index.
        
5.  Repeat step four until both recall range and QPS reach acceptable values.
    

## Improve recall for filtered searches

When performing a k-nearest neighbor (KNN) vector search that includes a filter, you might encounter situations where the query returns fewer results than requested in the `LIMIT` clause. This can lead to what is known as _insufficient recall_ and is more likely to occur when using filters that are highly selective. This happens because the initial partitions, or leaves, that ScaNN searches don't contain enough vectors that satisfy the filter conditions.

To address this, AlloyDB offers a feature that allows the search to dynamically expand beyond the initial set of leaves to find enough matching results.

### How streaming works

You can enable the streaming functionality by setting the `scann.satisfy_limit` parameter to `relaxed_order`. When enabled, the vector scan continues searching through additional leaf partitions until it finds enough results to satisfy the `LIMIT` of your query, thereby improving recall.

To prevent a search from continuing for too long and to control the performance impact, you can use the `scann.max_pct_leaves_to_search` parameter. This setting acts as a safeguard by setting an upper bound on the percentage of total leaves that a query can visit. The default value for this is `15%`.

### When to use streaming

Consider using the streaming feature when:

-   You use filters with your vector searches.
-   You observe that your queries return fewer results than you expect based on your `LIMIT` clause.

By enabling `scann.satisfy_limit`, you can improve the recall of your filtered searches. It is recommended to also configure `scann.max_pct_leaves_to_search` to reach balance between recall and query performance.

## Index maintenance

If your table is prone to frequent updates or insertions, then we recommend periodically reindexing the existing `ScaNN` index in order to improve the recall accuracy. You can monitor index metrics to view changes in vector distributions or vector mutations since the index was built, and then reindex accordingly. For more information about metrics, see [View Vector index metrics](/alloydb/docs/reference/vector-index-metrics).

## What's next

-   [Get started with vector embeddings using AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-embedding#0).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.