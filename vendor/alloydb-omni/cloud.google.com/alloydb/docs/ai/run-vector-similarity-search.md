-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Run a vector similarity search Stay organized with collections Save and categorize content based on your preferences.

This document explains how to perform vector similarity searches in AlloyDB for PostgreSQL using the `pgvector` extension. Vector similarity search, also known as nearest neighbor search, lets you find the data points in your data that are most similar to a given query vector.

You can query your AlloyDB database for semantically similar vectors after storing and indexing embeddings. Use `pgvector` query features to find the nearest neighbors for an embedding vector.

For more information about storing vector embeddings and creating an index, see [Store vector embeddings](/alloydb/docs/ai/store-embeddings) and [Create indexes](/alloydb/docs/ai/create-scann-index) respectively.

## Run a similarity search with vector input

To run a similarity search, specify the table, embedding column, distance function, target embedding, and the number of rows to return. You can also use the `embedding()` function to translate text into a vector and then compare the vector to stored embeddings using `pgvector` operators.

**Note:** You cannot run bulk search queries using the `alloydb_scann` extension.

To find the nearest semantic neighbors for an embedding vector, you can run the following example query, where you set the same distance function that you used during the index creation.

  ```
  SELECT * FROM TABLE
    ORDER BY EMBEDDING_COLUMN DISTANCE_FUNCTION_QUERY ['EMBEDDING']
    LIMIT ROW_COUNT
```

Replace the following:

-   `TABLE`: the table containing the embedding to compare the text to.

-   `EMBEDDING_COLUMN`: the column containing the stored embeddings.

-   `DISTANCE_FUNCTION_QUERY`: the distance function to use with this query. Choose one of the following based on the distance function used while creating the index:

    -   **L2 distance:** `<->`

    -   **Inner product:** `<#>`

    -   **Cosine distance:** `<=>`

-   `EMBEDDING`: the embedding vector you want to find the nearest stored semantic neighbors of.

-   `ROW_COUNT`: the number of rows to return.

    Specify `1` if you want only the single best match.


For more information about other query examples, see [Querying](https://github.com/pgvector/pgvector?tab=readme-ov-file#querying).

## Run a similarity search using `pgvector` with text input

You can use also use the [`embedding()`](/alloydb/docs/ai/work-with-embeddings) function to translate the text into a vector, and to find the database rows with the most semantically similar embeddings. The stock `pgvector` PostgreSQL extension is customized for AlloyDB, and referred to as `vector`. You apply the vector to one of the `pgvector` nearest-neighbor operators, for example `<=>` for cosine distance.

Because `embedding()` returns a `real` array, you must explicitly cast the `embedding()` call to `vector` in order to use these values with `pgvector` operators.

  ```
  CREATE EXTENSION IF NOT EXISTS vector;

  SELECT * FROM TABLE
    ORDER BY EMBEDDING_COLUMN::vector
    <=> google_ml.embedding('MODEL_IDVERSION_TAG', 'TEXT')
    LIMIT ROW_COUNT
```

Replace the following:

-   `MODEL_ID`: the ID of the model to query.

    If you're using the Model Garden, then specify `text-embedding-005` as the model ID. These are the cloud-based models that AlloyDB can use for text embeddings. For more information, see [Text embeddings](/gemini-enterprise-agent-platform/reference/models/text-embeddings-api).

-   Optional: `VERSION_TAG`: the version tag of the model to query. Prepend the tag with `@`.

    If you are using one of the `text-embedding-005` English models with Gemini Enterprise Agent Platform, then specify one of the version tags—for example, `text-embedding-005`, listed in [Model versions](/gemini-enterprise-agent-platform/reference/models/text-embeddings-api#model_versions).

    Google strongly recommends that you always specify the version tag. If you don't specify the version tag, then AlloyDB uses the latest model version, which might lead to unexpected results.


-   `TABLE`: the table to query.

-   `EMBEDDING_COLUMN`: the column containing the stored embeddings.

-   `TEXT`: the text to translate into a vector embedding.

-   `ROW_COUNT`: the number of rows to return.


To accelerate your filtered KNN search, you can use the AlloyDB columnar engine. For more information, see [Accelerate your filtered vector search](/alloydb/docs/ai/perform-vector-search#accelerate-filtered-vector-search) ([Preview](https://cloud.google.com/products#product-launch-stages)) and [Configure the columnar engine](/alloydb/docs/columnar-engine/configure).

## What's next

-   [Perform vector search tutorial](/alloydb/docs/ai/perform-vector-search)
-   [Tune vector query performance](/alloydb/docs/ai/store-index-query-vectors)
-   [Vector index metrics](/alloydb/docs/reference/vector-index-metrics)
-   [Learn how to build a smart shopping assistant with AlloyDB, pgvector, and model endpoint management](https://codelabs.developers.google.com/smart-shop-agent-alloydb#0).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
