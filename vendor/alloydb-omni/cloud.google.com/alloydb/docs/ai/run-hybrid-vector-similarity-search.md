-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Run a hybrid vector similarity search Stay organized with collections Save and categorize content based on your preferences.

Hybrid search improves search relevance by combining standard keyword-based text search with semantic vector search. While keyword search finds exact matches, vector search finds results that are semantically similar in meaning to the query, even if they don't share keywords. By combining these methods, hybrid search retrieves results that are both lexically and semantically relevant, providing more comprehensive and accurate results than either search method alone.

AlloyDB for PostgreSQL lets you perform a hybrid search that combines vector and text search. For example, you can create [full-text search indexes](/alloydb/docs/ai/full-text-search-overview) such as a GIN or RUM index for full text search. You can create [vector indexes like ScaNN](/alloydb/docs/ai/create-scann-index) or [HNSW](/alloydb/docs/ai/create-hnsw-index) for vector similarity search. AlloyDB can then combine and re-rank results from both search types using algorithms like [Reciprocal Rank Fusion (RRF)](#rank-fusion), which merges multiple search result lists into a single, relevance-ranked list.

For a more performant full text search experience, you can [create a RUM index](/alloydb/docs/ai/create-rum-index).

You can perform hybrid search in AlloyDB in several ways. Use the following table to choose the best approach for your use case:

Approach

Description

Use case

[SQL function](#hybrid-search)

`hybrid_search()` is a built-in function that simplifies hybrid search by combining vector and text search results using RRF.

Recommended for most use cases where you need a convenient way to run hybrid searches directly in SQL.

[Raw SQL query](#rank-fusion)

Manually construct a SQL query to perform vector and text searches separately and combine them using RRF.

If you need full control over the query logic or you need to implement custom ranking beyond the `hybrid_search()` function's capabilities.

[LangChain integration](#hybrid-search-langchain)

Use the `AlloyDBVectorStore` class in LangChain to perform hybrid search.

If you're building Python applications using the LangChain framework and you want to integrate AlloyDB as a vector store with hybrid search capabilities.

## Before you begin

-   [Enable the `google_ml_integration` extension](/alloydb/docs/reference/extensions#enable).
-   Enable preview AI functions:
    
    ```
    SET google_ml_integration.enable_preview_ai_functions = true;
    ```
    

## Run a similarity search with text and vector input

To perform a hybrid search in AlloyDB, you create a vector index and a text search index on your table. Then you combine the results from both searches and re-rank them to present the most relevant information.

### Create a GIN index

A Generalized Inverted Index (GIN) index is a specialized index type optimized for searching within composite values, such as arrays, JSONB, and full-text search data.

To create a GIN index on your text data to perform a full text search, run the following:

```
CREATE INDEX INDEX_NAME ON TABLE USING GIN (to_tsvector('english', COLUMN_NAME));
```

Replace the following:

-   `INDEX_NAME`: the name of the index you want to create —for example, `my_gin_index`.
    
-   `TABLE`: the table to add the index to.
    
-   `COLUMN_NAME`: the column that stores the text data you want to search.
    

### Create a ScaNN index

To apply a two-level tree index using the ScaNN algorithm to a column containing stored vector embeddings, run the following DDL query:

```
CREATE INDEX INDEX_NAME ON TABLE
  USING scann (EMBEDDING_COLUMN DISTANCE_FUNCTION)
  WITH (num_leaves=NUM_LEAVES_VALUE);
```

Replace the following:

-   `INDEX_NAME`: the name of the index you want to create—for example, `my_scann_index`. The index names are shared across your database. Ensure that each index name is unique to each table in your database.
    
-   `TABLE`: the table to add the index to.
    
-   `EMBEDDING_COLUMN`: a column that stores `vector` data.
    
-   `DISTANCE_FUNCTION`: the distance function to use with this index. Choose one of the following:
    
    -   **L2 distance:** `l2`
        
    -   **Dot product:** `dot_product`
        
    -   **Cosine distance:** `cosine`
        
-   `NUM_LEAVES_VALUE`: the number of partitions to apply to this index. Set to any value between 1 to 1048576. For more information about how to decide this value, see [Tune a `ScaNN` index](/alloydb/docs/ai/tune-indexes).
    

To learn more about different ScaNN index configurations, see [Choose a](/alloydb/docs/ai/create-scann-index) .

**Note:** Although this is an example of a ScaNN vector index, you can also create [HNSW](/alloydb/docs/ai/create-hnsw-index), [IVF](/alloydb/docs/ai/create-ivf-index), and [IVFFLAT](/alloydb/docs/ai/create-ivfflat-index) indexes.

### Perform a hybrid search using the hybrid\_search function

The [`ai.hybrid_search()`](/alloydb/docs/reference/ai/hybrid-search-function-parameters) function lets you combine results from multiple search types, such as vector search and full-text search. The function merges the ranked results from each search component into a single, unified list using the RRF algorithm. This approach provides more relevant results than a single search type alone.

The `hybrid_search()` function dynamically constructs and executes a single SQL query. It creates a Common Table Expression (CTE) for each search component that you define. The function then joins the results from all CTEs and calculates a final RRF score for each document to produce a unified, ranked list.

#### Prepare your data and create indexes

Before you use the `hybrid_search` function, prepare your data and create the necessary indexes.

1.  Create a table to store your documents.
    
    ```
    CREATE TABLE documents (
      doc_id TEXT PRIMARY KEY,
      content TEXT,
      text_tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
      text_embedding vector(3072) GENERATED ALWAYS AS (embedding('gemini-embedding-001', content)) STORED 
    );
    ```
    
2.  Insert your data.
    
    ```
    INSERT INTO documents (doc_id, content) VALUES
      ('doc1', 'AlloyDB is a fully managed, PostgreSQL-compatible database service.'),
      ('doc2', 'It offers enterprise-grade performance, availability, and security.'),
      ('doc3', 'You can use it for demanding transactional and analytical workloads.'),
      ('doc4', 'AlloyDB integrates with Google Cloud services like Gemini Enterprise Agent Platform.'),
      ('doc5', 'The database supports vector embeddings for semantic search.'),
      ('doc6', 'alloydb_scann is an AlloyDB specific extension that provides scann index for vector search.'),
      ('doc7', 'alloydb_scann extension depends upon pgvector extension '),
      ('doc8', 'With alloydb_scann extension'),
      ('doc9', 'customers can create scann index'),
      ('doc10', 'to speed up their vector search workloads');
    ```
    
3.  Create indexes to accelerate search performance. For vector search, create a `scann` index. For full-text search, create a `GIN` index.
    
    **Note:** You can also create a RUM index for a more performant full text search experience. For more information about creating RUM indexes, see [Create a RUM index](/alloydb/docs/ai/create-rum-index).
    
    ```
    CREATE EXTENSION IF NOT EXISTS alloydb_scann;
    CREATE INDEX documents_text_embedding_idx
    ON documents USING scann (text_embedding cosine)
    WITH(num_leaves = 10, quantizer = 'SQ8');
    
    CREATE INDEX documents_text_tsv_idx ON documents USING GIN (text_tsv);
    ```
    

#### Call the hybrid\_search function and review example output

To learn about the parameters that the `hybrid_search` function accepts to help you control the search and fusion process, see [Hybrid search function parameters](/alloydb/docs/reference/ai/hybrid-search-function-parameters).

1.  Call the `hybrid_search` function to combine vector and full-text search results. This step combines the search results achieved by running the query defined by the user's search input.
    
    ```
    SELECT *
    FROM ai.hybrid_search(
      search_inputs => ARRAY[
          '{
            "data_type": "vector",
            "weight": 0.5,
            "table_name": "documents",
            "key_column": "doc_id",
            "vec_column": "text_embedding",
            "distance_operator": "public.<=>",
            "limit": 5,
            "query_vector": "ai.embedding(''gemini-embedding-001'', ''managed database'')::vector"
          }'::JSONB,
          '{
            "data_type": "text",
            "weight": 0.5,
            "table_name": "documents",
            "key_column": "doc_id",
            "text_column": "text_tsv",
            "limit": 5,
            "ranking_function": "ts_rank",
            "query_text_input": "database"
          }'::JSONB
      ],
      include_json_output => false
    );
    ```
    
    `include_json_output` is an optional parameter. For more information, see [Hybrid search function parameters](/alloydb/docs/reference/ai/hybrid-search-function-parameters).
    
    **Note:** If you created a RUM index for full text search, then change the value of the `ranking` parameter to `<=>`.
    
2.  Review the output.
    
    When `include_json_output` is `false`, the output contains the document ID and the final score.
    
      ```
      id  |        score
    ------+----------------------
     doc1 | 0.016393442622
     doc5 | 0.016129032258
     doc3 | 0.007936512936
     doc2 | 0.007812504999
     doc4 | 0.007692312692
    (5 rows)
    ```
    
    When `include_json_output` is `true`, the output includes a `detail_json` column with a breakdown of the score calculation for each component.
    
      ```
      id  |        score         |                                                                                                                                                detail_json
    ------+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
     doc1 |  0.01639344262 | {"item_id": "doc1", "calculation": {"component_1": {"rank": 1, "weight": 0.5, "data_type": "vector", "component_score": 0.01639344262295081967, "execute_time_ms": 5}, "component_2": {"rank": 1, "weight": 0.5, "data_type": "text", "component_score": 0.01639344262295081967, "execute_time_ms": 4}}, "final_score": 0.01639344262295082}
     doc5 | 0.016129032258 | {"item_id": "doc5", "calculation": {"component_1": {"rank": 2, "weight": 0.5, "data_type": "vector", "component_score": 0.01612903225806451613, "execute_time_ms": 5}, "component_2": {"rank": 2, "weight": 0.5, "data_type": "text", "component_score": 0.01612903225806451613, "execute_time_ms": 4}}, "final_score": 0.016129032258064516}
     ...
    ```
    

#### Specify the data type of the final return type

The `id_type` parameter lets you specify the data type of the final return type. AlloyDB AI automatically performs a cast.

For example, if your `doc_id` column is `TEXT`, and you want to convert it to `INTEGER`, pass `NULL::INTEGER` to the `id_type` parameter.

```
CREATE TABLE product_logs (
    log_id_str TEXT PRIMARY KEY,
    content TEXT,
    content_tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED
);

INSERT INTO product_logs (log_id_str, content)
VALUES ('999', 'system start and services initialized');

CREATE INDEX idx_product_logs_rum ON product_logs USING rum (content_tsv rum_tsvector_ops);

SELECT
    id,
    pg_typeof(id)
FROM ai.hybrid_search(
    ARRAY['{
        "data_type": "text",
        "table_name": "product_logs",
        "key_column": "log_id_str",
        "text_column": "content_tsv",
        "query_text_input": "system",
        "limit": 1
    }'::jsonb],
    id_type => NULL::INTEGER
);
```

The output shows that the `id` column is cast to `INTEGER`:

  ```
  id  | pg_typeof
------+-----------
 999  | integer
(1 rows)
```

The following example shows why specifying the data type for the return ID column is important, by showing what happens when there's a mismatch.

```
DROP TABLE IF EXISTS product_logs;
CREATE TABLE product_logs (
    log_id_str TEXT PRIMARY KEY,
    content TEXT,
    content_tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED
);
INSERT INTO product_logs VALUES ('999', 'system start');

SELECT
    id,
    pg_typeof(id),
    score
FROM ai.hybrid_search(
    ARRAY['{
        "data_type": "text",
        "table_name": "product_logs",
        "key_column": "log_id_str",
        "text_column": "content_tsv",
        "query_text_input": "system",
        "limit": 1
    }'::jsonb],
    id_type => NULL::INTEGER --- CAST to INT
);
```

#### Choose a text search query parser

When you perform full-text search, AlloyDB provides the `g_to_tsquery()` function to achieve high-relevance information retrieval. `g_to_tsquery()`, which is the default, improves information retrieval by transforming plain text or standard `tsquery` formats into a more data-rich `tsquery` output.

If you prefer PostgreSQL parser functions, you can use the following functions by explicitly specifying them as follows:

-   [`plainto_tsquery()`](https://www.postgresql.org/docs/current/functions-textsearch.html)
-   [`to_tsquery()`](https://www.postgresql.org/docs/current/functions-textsearch.html)

### Perform a hybrid search using raw SQL

Hybrid search involves performing separate vector and text searches, then combining and re-ranking results using Reciprocal Rank Fusion (RRF). RRF is a rank-based algorithm that combines multiple ranked lists of search results into a single ranked list by assigning a score to each document. This score is based on RRF's reciprocal rank across all contributing lists, with higher-ranked documents receiving a greater contribution.

The following example shows you how to combine full text search and hybrid search, and re-rank the results.

**Important:** You must use the same model in the `ai.embedding` call that you used to generate the embedding column.

        ```
        WITH vector_search AS (
            SELECT id,
                RANK () OVER (ORDER BY embedding <=> ai.embedding('MODEL_ID', 'TEXT')) AS rank
                FROM TABLE
                ORDER BY embedding <=> ai.embedding('MODEL_ID', 'TEXT') LIMIT 10
        ),
        text_search AS (
            SELECT id,
                RANK () OVER (ORDER BY ts_rank(to_tsvector('english', COLUMN_NAME), to_tsquery(KEYWORD)) desc)
            FROM TABLE
            WHERE to_tsvector('english', COLUMN_NAME) @@ to_tsquery(KEYWORD)
            ORDER BY ts_rank(to_tsvector('english', COLUMN_NAME), to_tsquery(KEYWORD)) desc
            LIMIT 10
        )
        SELECT
            COALESCE(vector_search.id, text_search.id) AS id,
            COALESCE(1.0 / (60 + vector_search.rank), 0.0) + COALESCE(1.0 / (60 + text_search.rank), 0.0) AS rrf_score
        FROM vector_search FULL OUTER JOIN text_search ON vector_search.id = text_search.id
        ORDER BY rrf_score DESC
        LIMIT 5;
```

Replace the following:

-   `MODEL_ID`: the ID of the model to query.
    
    If you're using the Model Garden, then specify `gemini-embedding-001` as the model ID. These are the cloud-based models that AlloyDB can use for text embeddings. For more information, see [Text embeddings](/gemini-enterprise-agent-platform/reference/models/text-embeddings-api).
    
-   `TABLE`: the table containing your data.
    
-   `TEXT`: the text to translate into a vector embedding.
    
-   `KEYWORD`: the keyword you want to search for.
    
-   `COLUMN_NAME`: a column that stores contains the text data you want to search.
    

Explanation of the Hybrid Search Query and related Common Table Expression (CTE):

-   `vector_search` CTE: Performs a standard vector similarity search, ordering results by cosine distance and assigning a rank. It retrieves the top 10 most semantically similar products.
-   `text_search` CTE: Executes a text search using `to_tsvector` and `to_tsquery`, calculating relevance with `ts_rank` and retrieving the top 10 most relevant text matches.
-   `Final SELECT Statement` CTE: Joins vector and text search results using a `FULL OUTER JOIN`, selects the product ID, calculates the RRF score, orders by score, and retrieves the top 5 results.

### Perform a hybrid search using LangChain

Hybrid search with the AlloyDB vector store enhances search accuracy by combining two different lookup strategies: dense embedding vector search and keyword-based search. `AlloyDBVectorStore` is a LangChain vector store class that uses LangChain by acting as a specific implementation of LangChain's `VectorStore` class. Learn how to [use AlloyDB to store vector embeddings with the AlloyDBVectorStore class](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/vector_store.ipynb).

You can enable and configure this hybrid search using the `HybridSearchConfig` class when you set up your `AlloyDBVectorStore`.

Hybrid search with the AlloyDB vector store simultaneously performs a semantic search to understand the meaning and context of a query, and a keyword search to find exact lexical matches. The results from both searches are then merged to provide a more comprehensive set of results.

## What's next

-   Learn about [hybrid search function parameters](/alloydb/docs/reference/ai/hybrid-search-function-parameters).
-   View a [hybrid search and AI functions demo](https://github.com/paulramsey/stylesearch-alloydb-ai-demo).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.