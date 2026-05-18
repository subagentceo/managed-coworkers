-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Rank search results Stay organized with collections Save and categorize content based on your preferences.

Learn how to rank and rerank your search results for applications using Gemini Enterprise Agent Platform ranking models such as `semantic-ranker-default-003`. You can use the `ai.rank()` function to score documents based on relevance to a query, and improve vector search results by reranking them for better query ordering.

The Agent Platform ranking API takes a list of documents and ranks those documents based on how relevant the documents are to a given query (a search string). When you use the `ai.rank()` function, it returns scores for how well a document answers a given query.

To use instructions on this page, you must have an understanding of AlloyDB for PostgreSQL and be familiar with generative AI concepts.

AlloyDB reserves, and creates, the `ai` schema.

**Note:** Agent Platform model support is governed by Agent Platform model versioning and lifecycle guidelines. For more information about stable versions, see [Model versions and lifecycle](/vertex-ai/generative-ai/docs/learn/model-versions).

## Before you begin

Before you rank search results, do the following:

-   [Verify that the `google_ml_integration` extension is installed](/alloydb/docs/ai/configure-vertex-ai#verify-installed-extension).
-   [Verify that the `google_ml_integration.enable_model_support` flag is set to `on`](/alloydb/docs/instance-configure-database-flags).
-   [Integrate with Agent Platform](/alloydb/docs/ai/configure-vertex-ai).
-   [Enable the Discovery Engine API](#enable-discovery-engine-api).
-   [Get the required roles to use ranking models](#required-roles).

### Enable the Discovery Engine API

### Console

1.  [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=discoveryengine.googleapis.com)
2.  In the **Confirm project** step, click **Next** to confirm the name of the project you are going to make changes to.
3.  In the **Enable APIs** step, click **Enable** to enable the Discovery Engine API. If you already enabled this API, you won't see it listed here.

### gcloud

To use ranking models, you must enable the Discovery Engine API.  
Replace `PROJECT_ID` with your Google Cloud project ID and `PROJECT_NUMBER` with your corresponding project number.

    # Enable Discovery Engine API
    gcloud services enable discoveryengine.googleapis.com --project=PROJECT\_ID
    gcloud projects add-iam-policy-binding PROJECT\_ID \\
    --member="serviceAccount:service-PROJECT\_NUMBER@gcp-sa-alloydb.iam.gserviceaccount.com" \\
    --role="roles/discoveryengine.viewer"

Model registration for ranking isn't required for Agent Platform models. You can use the Agent Platform model name as the `model_id`, which is shown in the following example.

    SELECT index, score
    FROM
      ai.rank(
        model\_id \=\> 'semantic-ranker-default-003',
        search\_string \=\> 'Affordable family-friendly vacation spots in Southeast Asia?',
        documents \=\>
    ARRAY\[
      'Luxury resorts in South Korea',
      'Family vacation packages for Vietnam: Ha Long Bay and Hoi An',
      'Budget-friendly beaches in Thailand perfect for families',
      'A backpacker guide to solo travel in India'\])

A common use case for the semantic ranker is to rerank the results returned by vector search for better query ordering. The following example shows how to use the semantic ranking model for this use case. The example retrieves an initial result set for the query `personal fitness equipment` using vector search. These results are then re-ranked to return the top five results.

    WITH initial\_ranking AS (
      SELECT id, description, ROW\_NUMBER() OVER () AS ref\_number
      FROM product
      ORDER BY
        embedding <\=\> google\_ml.embedding(
          'gemini-embedding-001', 'personal fitness equipment')::vector
      LIMIT 10
    ), reranked\_results AS (
      SELECT index, score
      FROM ai.rank(
          model\_id \=\> 'semantic-ranker-default-003',
          search\_string \=\> 'personal fitness equipment',
          documents \=\> (SELECT ARRAY\_AGG(description ORDER BY ref\_number) FROM initial\_ranking),
          top\_n \=\> 5)
    )
    SELECT id, description
    FROM initial\_ranking, reranked\_results
    WHERE initial\_ranking.ref\_number \= reranked\_results.index
    ORDER BY reranked\_results.score DESC;
  

For a list of available models and use cases, see [Supported models](/generative-ai-app-builder/docs/ranking#models).

### Integrate with Agent Platform and install the extension

1.  [Configure user access to Agent Platform models](/alloydb/docs/ai/configure-vertex-ai).
2.  Verify that the latest version of `google_ml_integration` is installed.
    1.  To check the installed version, run the following command:
        
        SELECT extversion FROM pg\_extension WHERE extname \= 'google\_ml\_integration';
        extversion 
        \------------
        1.5.2
        (1 row)
        
    2.  If the extension isn't installed or if the installed version is earlier than 1.5.2, update the extension.
        
        CREATE EXTENSION IF NOT EXISTS google\_ml\_integration;
        ALTER EXTENSION google\_ml\_integration UPDATE;
        
        If you experience issues when you run the preceding commands, or if the extension isn't updated to version 1.5.2 after you run the preceding commands, contact [Google Cloud support](https://cloud.google.com/support).
        
3.  To use the AlloyDB AI query engine functionality, set the `google_ml_integration.enable_ai_query_engine` flag to `on`.
    
    ### SQL
    
    1.  Enable the AI query engine for the current session.  
        
        SET google\_ml\_integration.enable\_ai\_query\_engine \= on;
        
    2.  Enable features for a specific database across sessions.  
        
        ALTER DATABASE DATABASE\_NAME SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';
        
    3.  Enable the AI query engine for a specific user across sessions and databases.  
        
        ALTER ROLE postgres SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';
        
    
    ### Console
    
    To modify the value of the `google_ml_integration.enable_ai_query_engine` flag, follow the steps in [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags#console).
    
    ### gcloud
    
    To use the gcloud CLI, you can [install and initialize](/sdk/docs/install) the Google Cloud CLI, or you can use [Cloud Shell](/shell/docs/using-cloud-shell).
    
    You can modify the value of the `google_ml_integration.enable_ai_query_engine` flag. For more information, see [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags#console).
    
    gcloud alloydb instances update INSTANCE\_ID \\
      --database-flags google\_ml\_integration.enable\_ai\_query\_engine=on \\
      --region=REGION\_ID \\
      --cluster=CLUSTER\_ID \\
      --project=PROJECT\_ID
    

### Required roles

To get the permissions that you need to use ranking models from Discovery Engine, ask your administrator to grant you the Discovery Engine Viewer (`roles/discoveryengine.viewer`) Identity and Access Management (IAM) role on `your project`. For more information about granting roles, see [Manage access to projects, folders, and organizations](/iam/docs/granting-changing-revoking-access).

You might also be able to get the required permissions through [custom roles](/iam/docs/creating-custom-roles) or other [predefined roles](/iam/docs/roles-permissions).

## Rank your search results

The following SQL query shows how to rank your search results :

**Note:** For API limits related to Agent Platform ranking models, see [Rank (or rerank) a set of records according to a query](/generative-ai-app-builder/docs/ranking#rank_or_rerank_a_set_of_records_according_to_a_query).

```
SELECT
  ai.rank(
    model_id => 'MODEL_ID',
    search_string => 'SEARCH_STRING',
    documents => ARRAY['DOCUMENT_1', 'DOCUMENT_2', 'DOCUMENT_3']);
```

Replace the following:

Parameter

Description

`MODEL_ID`

A unique ID for the model endpoint that you define.

`SEARCH_STRING`

A search string against which the records are ranked.

`DOCUMENTS`

A unique string that identifies the record.

For a list of the supported Agent Platform ranking models, see [Supported models](/generative-ai-app-builder/docs/ranking#models).

## Examples

To rank search results using a Vertex AI ranking model, run the following query:

```
SELECT index, score
FROM
  ai.rank(
    model_id => 'semantic-ranker-default-003',
    search_string => 'AlloyDB is a PostgreSQL compatible AI database that is ready for production.',
    documents =>
      ARRAY[
        'Alloys are made from combination of metals',
        'The best enterprise-ready PostgreSQL database.',
        'You can feel the heat in Alloy apartments.']);
```

The response is a table that shows each document and the score based on relevance to the search query. The following is the sample response:

 ```
 index | score
-------+------------
     2 |  0.33
     1 |  0.28
     3 |  0.16
(3 rows)
```

Consider an example AlloyDB database with a list of review descriptions that are converted to embeddings. The following sample code snippet shows how to use the ranking model to retrieve the name of the top-ranked products based on their review descriptions' semantic similarity to a query.

```
WITH initial_ranking AS (
    SELECT product_id, name, review, review_id, ROW_NUMBER() OVER () AS ref_number
    FROM user_reviews
    ORDER BY
      review_desc_embedding <=> google_ml.embedding(
        'gemini-embedding-001', 'good desserts')::vector
    LIMIT 10
  ), reranked_results AS (
    SELECT index, score
    FROM
      ai.rank(
        model_id => 'semantic-ranker-512',
        search_string => 'good desserts',
        documents => (SELECT ARRAY_AGG(review ORDER BY ref_number) FROM initial_ranking),
        top_n => 5)
  )
SELECT product_id, name
FROM initial_ranking, reranked_results
WHERE initial_ranking.ref_number = reranked_results.index
ORDER BY reranked_results.score DESC;
```

**Note:** You get the 'semantic-ranker-default-003' model after you enable the Discovery Engine API and grant required permissions. For more information, see [Before you begin](#before-you-begin).

## What's next

-   [Register a model endpoint with model endpoint management](/alloydb/docs/ai/register-model-endpoint).
    
-   [Query using AI powered SQL operators](/alloydb/docs/ai/evaluate-semantic-queries-ai-operators).
    
-   [Perform time-series forecasting](/alloydb/docs/ai/perform-time-series-forecasting)
    

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-16 UTC.