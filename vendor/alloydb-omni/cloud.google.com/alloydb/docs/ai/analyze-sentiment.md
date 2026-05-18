-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Analyze text sentiment Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

**Note:** This experimental launch is a Pre-GA offering.

The `ai.analyze_sentiment` function is a built-in AlloyDB AI tool that classifies the sentiment of text as positive, negative, or neutral. By embedding this capability directly into the database, AlloyDB for PostgreSQL lets you process unstructured data without building complex Extract, Transform, and Load (ETL) pipelines or external service integrations.

**Note:** The `ai.analyze_sentiment` function is supported on PostgreSQL version 17 and later.

The sentiment analysis function provides the following benefits:

-   World knowledge: the vast collection of facts, concepts, relationships, and contextual understanding of the world that Large Language Models (LLM) acquire during their pre-training phase.
-   Real-time analysis: brings Gemini's world knowledge to enterprise data using SQL.
-   Scalability: supports array-based and cursor-based processing to handle thousands of rows efficiently.
-   Simplicity: provides a high-level abstraction that manages model invocation and data preparation automatically.

AlloyDB AI's sentiment analysis function supports several use cases, including the following:

-   Customer feedback: classify thousands of raw, unstructured product reviews to identify customer satisfaction levels.
-   Social media monitoring: analyze sentiment on social mentions or comments to gauge public perception of a brand.

## Before you begin

Make sure that you meet the following requirements before you use the `ai.analyze_sentiment` function.

### Enable the extension

Make sure that you have the latest version of the `google_ml_integration.enable_preview_ai_functions` extension (version 1.5.7 or higher) installed with Preview functionality enabled.

To enable the `google_ml_integration.enable_preview_ai_functions` flag in AlloyDB, you use the `SET` command. This flag controls access to preview AI functions like `ai.analyze_sentiment`.

1.  Make sure that your `google_ml_integration extension` is version 1.5.7 or higher. You can check the version by running the following:
    
    ```
    SELECT extversion FROM pg_extension WHERE extname = 'google_ml_integration';
    ```
    
    If you need to upgrade to a version that includes these preview functions, call the following:
    
    ```
    CALL google_ml.upgrade_to_preview_version();
    ```
    
2.  Enable the flag for the current session or for the entire database. To enable the flag for your current session, execute the following:
    
    ```
    SET google_ml_integration.enable_preview_ai_functions = 'on';
    ```
    
    This change doesn't require a database restart. The default value of this flag is `off`.
    

### Create an example table

To follow the analyze sentiment function examples in this document, create a table and populate it with the following movie reviews.

```
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY,
    review_content TEXT
);

INSERT INTO reviews (id, review_content) VALUES 
(1, 'This movie is very good'),
(2, 'The actors play the parts well'),
(3, 'I like the music in this film'),
(4, 'The story is easy to follow'),
(5, 'Many people will enjoy this show'),
(6, 'The film is too long'),
(7, 'I do not like the ending'),
(8, 'This movie is very boring'),
(9, 'The story is okay'),
(10, 'Some parts are fine');
```

## Analyze sentiment of a single string

To evaluate the sentiment of a single text input, use the scalar version of `ai.analyze_sentiment`.

```
SELECT ai.analyze_sentiment(
  prompt => 'TEXT_CONTENT',
  model_id => 'MODEL_ID' -- Optional. The default value is gemini-2.5-flash-lite.
);
```

The following example shows you how to perform row-level sentiment analysis on text data stored in a table named `reviews` with columns `id` and `review_content` to store review data. The example executes a `SELECT` query that applies the `ai.analyze_sentiment()` function to the `review_content` column for each row in the table. This function processes each review individually and returns its calculated sentiment (`positive`, `negative`, or `neutral`).

```
--- Row Level sentiment analysis
SELECT ai.analyze_sentiment(review_content) FROM reviews;
```

The following is the example output:

 ```
 id | analyze_sentiment
----+-------------------
  1 | positive
  2 | positive
  3 | positive
  4 | positive
  5 | positive
  6 | negative
  7 | negative
  8 | negative
  9 | neutral
 10 | neutral
```

## Analyze sentiment in batches

For better performance on larger datasets, use the array-based version of the function to process multiple strings in a single call.

```
SELECT ai.analyze_sentiment(
  prompts => ARRAY['TEXT_1', 'TEXT_2'],
  batch_size => BATCH_SIZE, -- Optional. The default value is 10.
  model_id => 'MODEL_ID' -- Optional. The default value is gemini-2.5-flash-lite.
);
```

The following example analyzes the sentiment of customer reviews from a table named `reviews`.

```
WITH sentiment_results AS (
SELECT
  ARRAY_AGG(id ORDER BY id) as ids,
  ai.analyze_sentiment( 
    prompts => array_agg( 'Please analyze the sentiment of this review  : ' || review_content
      ORDER BY id),
    batch_size => 15) as sentiments 
FROM reviews
),
correlated_results AS (
    SELECT ids[i] as id, sentiments[i] as sentiment
    FROM sentiment_results,
    generate_series(1, array_length(ids, 1)) AS i
)
SELECT reviews.id, correlated_results.sentiment as sentiment 
FROM reviews
JOIN correlated_results ON reviews.id = correlated_results.id
ORDER BY reviews.id DESC;
```

The following is the example output:

 ```
 id | sentiment
----+-----------
  1 | positive
  2 | positive
  3 | positive
  4 | positive
  5 | positive
  6 | negative
  7 | negative
  8 | negative
  9 | neutral
 10 | neutral
```

## Analyze sentiment using cursors

The cursor-based function is intended for processing large datasets efficiently, because it lets the system stream data through the AI model in manageable batches without requiring all of the data to be loaded into memory at once.

The function signature for the cursor-based version of `ai.analyze_sentiment` is as follows:

```
CREATE OR REPLACE FUNCTION ai.analyze_sentiment(
    prompt TEXT,
    input_cursor REFCURSOR,
    batch_size INT DEFAULT NULL,
    model_id VARCHAR(100) DEFAULT NULL)
  RETURNS REFCURSOR
```

You can now use the `ai.analyze_sentiment` function. Since it expects a `REFCURSOR`, you need to open a cursor for the input data that you want to analyze. In this example, you analyze the `review_content` from the `reviews` table.

The following example shows how to feed data to the `ai.analyze_sentiment` function row by row using a cursor:

```
-- Start a transaction
BEGIN;

-- Declare a cursor for the review content
DECLARE review_cursor REFCURSOR;

-- Open the cursor with the query to fetch the review content
OPEN review_cursor FOR SELECT review_content FROM reviews;

-- Call the AI function, passing the cursor
-- This function will return another cursor containing the results
DECLARE result_cursor REFCURSOR;
SELECT ai.analyze_sentiment(
    prompt => 'Analyze the sentiment of the following movie review:',
    input_cursor => review_cursor,
    batch_size => 5  -- Optional: Process in batches of 5
) INTO result_cursor;

-- Fetch and display results from the result_cursor
-- The exact way to fetch from a REFCURSOR depends on the SQL environment.
-- This is a conceptual example.
FETCH ALL FROM result_cursor;

-- Close the cursors
CLOSE review_cursor;
CLOSE result_cursor;

-- End the transaction
COMMIT;
```

The following is the output:

      ```
      review_content            | sentiment | score
------------------------------+-----------+-------
This movie is very good        | Positive  |   0.9
The actors play the parts well | Positive  |   0.8
I like the music in this film  | Positive  |   0.8
The story is easy to follow    | Positive  |   0.7
Many people will enjoy this show | Positive  |   0.8
The film is too long           | Negative  |  -0.6
I do not like the ending       | Negative  |  -0.8
This movie is very boring      | Negative  |  -0.9
The story is okay              | Neutral   |   0.1
Some parts are fine            | Neutral   |   0.2
```

## What's next

-   [Summarize content](/alloydb/summarize-content).
-   Read the [AI functions overview](/alloydb/docs/ai/ai-query-engine-landing).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.