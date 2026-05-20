-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Filtered vector search in AlloyDB overview Stay organized with collections Save and categorize content based on your preferences.

This page gives an overview of filtered vector search in AlloyDB for PostgreSQL.

A _filtered vector search_ consists of a query vector and a filter for a specific field. AlloyDB uses PostgreSQL's rich querying capabilities, allowing you to perform vector search and query both structured and unstructured data from a single SQL interface.

## Filtering options

The AlloyDB query optimizer plays a crucial role in determining the most efficient filtering strategy for your vector search.

To estimate the cost of different execution plans, the query optimizer analyzes your query and considers factors like filter selectivity, data distribution, and index availability.

Based on the cost estimation, the optimizer chooses an optimal filtering strategy from the following:

-   [pre-filtering](#pre-filtering)
-   [post-filtering](#post-filtering)
-   [inline filtering](#inline-filtering)

**Note:** Inline filtering is supported when using the ScaNN algorithm only. Inline filtering is not compatible with the Inverted File (IVF), Inverted File Flat (IVFFlat), or Hierarchical Navigable Small Worlds (HNSW) algorithms.

### Pre-filtering

Pre-filtering is a query optimization strategy where AlloyDB uses your filters to find a smaller group of items that match your criteria instead of searching through the entire dataset. Then, AlloyDB runs the vector search on that smaller group.

For example, if you're looking for similar blue shirts, AlloyDB first finds all the blue shirts and then searches for similar items within that group.

This strategy improves performance because it runs the computationally intensive vector similarity search on a reduced dataset.

### Post-filtering

Post-filtering is a strategy that AlloyDB uses when your filters don't narrow down the results considerably. Instead of filtering first, AlloyDB starts by finding a broad list of similar items based on your vector search. Then, it checks the results against your filter conditions to generate the final list.

For example, if you search for similar movies and you have a very broad filter like `genre = drama`, AlloyDB first finds a large set of movies that are similar to your search and then filters them by genre since most movies might be dramas.

This strategy is efficient when you expect many results to match your filter.

### Inline filtering

Inline filtering is a query optimization strategy where AlloyDB uses both vector and other secondary indexes to perform vector search and filter evaluation in tandem. AlloyDB searches through the vector index to find similar vectors and also checks if each vector matches your metadata filter conditions, leveraging indexes such as B-trees, GIN, or GiST for quick evaluation of these conditions.

For example, if you search for similar shoes and you filter by `color = black`, inline filtering means AlloyDB only checks the similarity of shoes that are already black. This is more efficient than checking the similarity of all shoes and then filtering by color, or filtering all shoes by color and then checking similarity.

Inline filtering excels when filters narrow down results moderately.

## Understand query plans

A query plan provides a comprehensive view of the query execution process and shows which filtering strategy AlloyDB chooses for the vector scan operation in the **Execution Strategy** field.

### A query plan for inline filtering

For inline filtering, AlloyDB uses a Custom Scan plan node, also known as vector scan, that relies on a Bitmap Index Scan plan node to provide the bitmap for the filter clauses.

The vector scan computes distances only for rows that satisfy the filter criteria.

The following query demonstrates inline filtering for a `shoes` search filtered by `color = black`

```
EXPLAIN
SELECT *
FROM products
WHERE color = 'black'
ORDER BY embedding <=> embedding('text-embedding-005', 'shoes')::vector
LIMIT 10;
```

The following example query plan illustrates an optimized vector search using inline filtering:

```
Limit (actual rows=10)
  ->  Custom Scan (vector scan) on products
      Execution Strategy: Bitmap assisted vector Scan on products_embedding_index
      Order By: (embedding <=> '[...]')::vector)
      Limit: 10
      ->  Bitmap Index Scan on products (color_index)
          Index Cond: (color = 'black')
```

In the example query plan, `Limit (actual rows=10)` shows that the query used the SQL `LIMIT 10;` clause to restrict the output. `actual rows=10` means this node returned 10 rows during query execution.

The `-> Custom Scan (vector scan) on products` node represents a vector search operation. It is a Custom Scan because it's a special scan for vector data, and it operates on the `products` table. The example query plan for inline filtering shows `Bitmap assisted vector Scan on products_embedding_index` in the **Execution Strategy** field, which indicates that the vector scan uses the bitmap to create a shortlist of rows on which similarity search needs to be performed. The bitmap index scan is used to filter the data based on the `color = 'black'` condition.

The `Order By: (embedding <=> '[...]')::vector` attribute indicates that the results are ordered based on vector similarity, calculated using the expression `(embedding <=> '[...]')::vector`, where `embedding` refers to the vector column, `<=>` represents the nearest neighbor operator, `[...]` is the query vector, and `::vector` performs type casting to the vector data type.

The `-> Bitmap Index Scan on products (color_index)` node represents a bitmap index scan on the `colors_index`. A bitmap index scan selects rows matching the filter condition using a bitmap, and uses the `color_index` for filtering.

The `Index Cond: (color = 'black')` attribute specifies the filter condition used by the `color = 'black'` index scan from the query's `WHERE` clause.

## What's next

-   [Adaptive filtering in AlloyDB](/alloydb/docs/ai/adaptive-filtering)
-   [Perform a vector search](/alloydb/docs/ai/perform-vector-search)

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
