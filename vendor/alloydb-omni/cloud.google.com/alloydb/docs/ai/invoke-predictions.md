-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Invoke predictions Stay organized with collections Save and categorize content based on your preferences.

This page describes how to invoke predictions using functions from the `public` and `google_ml` namespaces. The `google_ml_integration` extension includes prediction functions for these namespaces.

You can use the `ml_predict_row()` function in the `public` schema with any generic model hosted in Gemini Enterprise Agent Platform without registering the endpoint. You can use the `google_ml.predict_row()` function in the `google_ml` schema with any model that is [registered with Model endpoint management](/alloydb/docs/ai/register-model-endpoint).

To invoke predictions, select one of the following schemas.

public schema google\_ml schema

**Note:** You're charged for requests made to the Agent Platform models or models hosted in Model Garden. For more information about how you're charged, see [Agent Platform pricing](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing).

## Before you begin

To let AlloyDB invoke predictions, do the following:

-   You can invoke predictions in regions where generative AI on Agent Platform is available. For a list of regions, see [Deployments and endpoints](/gemini-enterprise-agent-platform/resources/locations).
-   [Connect to your database using `psql`](/alloydb/docs/connect-psql) or AlloyDB for PostgreSQL Studio.
-   [Verify that the `google_ml_integration` extension is installed](/alloydb/docs/ai/configure-vertex-ai#verify-installed-extension).
-   [Verify that the `google_ml_integration.enable_model_support` flag is set to `on`](/alloydb/docs/instance-configure-database-flags).
-   Before you can invoke predictions from an AlloyDB database, you must configure AlloyDB to work with Agent Platform. For more information, see [Integrate your database with Agent Platform](/alloydb/docs/ai/configure-vertex-ai).
-   You must have an active Agent Platform model with an active endpoint that you have Identity and Access Management (IAM) permission to access. AlloyDB doesn't support private endpoints for getting online predictions.
-   Grant permissions for database users to execute the prediction function to invoke predictions:
    
    ```
    \c DB_NAME;
    GRANT EXECUTE ON FUNCTION ml_predict_row TO USER_NAME;
    ```
    
    Replace the following:
    
    -   DB\_NAME: the name of the database on which the permissions should be granted
        
    -   USER\_NAME: the name of the user for whom the permissions should be granted
        

## Invoke online predictions

Use the `ml_predict_row()` SQL function to invoke online predictions against your data.

The format of the function's initial argument depends on whether the ML model that you want to use is in Model Garden or is an endpoint running in a Google Cloud project.

### Use a model in Model Garden

To invoke an online prediction using an ML model that's running in the Model Garden, use the following syntax for the `google_ml.predict_row()` SQL function:

```
SELECT ml_predict_row('projects/PROJECT_ID/locations/REGION_ID/publishers/google/models/MODEL_ID', '{ CONTENTS }');
```

Replace the following:

-   `PROJECT_ID`: the ID of your Google Cloud project
    
-   `REGION_ID`: the ID of the Google Cloud region that the model is located in—for example, `us-central1` for gemini-pro
    
-   `MODEL_ID`: the ID of the ML model to use—for example, gemini-pro
    
-   `CONTENTS`: the inputs to the prediction call, in JSON format
    

If the ML model is stored in the same project and region as your AlloyDB cluster, then you can abbreviate this function's first argument:

```
SELECT ml_predict_row('publishers/google/models/MODEL_ID', '{ CONTENTS }');
```

For information about the model's JSON response messages, see [Generative AI foundational model reference](/gemini-enterprise-agent-platform/reference/models/inference).

For examples, see [Example invocations](#examples).

### Use an Agent Platform model endpoint

To invoke an online prediction using an Agent Platform model endpoint, use the following syntax for the `ml_predict_row()` SQL function:

```
SELECT ml_predict_row('projects/PROJECT_ID/locations/REGION_ID/endpoints/ENDPOINT_ID', '{ CONTENTS }');
```

Replace the following:

-   `PROJECT_ID`: the ID of the Google Cloud project that the model is located in
    
-   `REGION_ID`: the ID of the Google Cloud region the model is located in—for example, `us-central1`
    
-   `ENDPOINT_ID`: the ID of the model endpoint
    
-   `CONTENTS`: the inputs to the prediction call, in JSON format
    

If the endpoint is located in the same project and region as your AlloyDB cluster, then you can abbreviate this function's first argument:

```
SELECT ml_predict_row('endpoints/ENDPOINT_ID', '{ CONTENTS }');
```

For information about the model's JSON response messages, see [PredictResponse](/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/predict#response-body).

### Example invocations

The following example uses [gemini-pro](/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api), available in Model Garden, to generate text based on a short prompt that is provided as a literal argument to `ml_predict_row()`:

```
SELECT
  json_array_elements(ml_predict_row('publishers/google/models/gemini-1.5-pro:streamGenerateContent',
      '{ "contents": [ { "role": "user", "parts": [ { "text": "For TPCH database schema as mentioned here https://www.tpc.org/TPC_Documents_Current_Versions/pdf/TPC-H_v3.0.1.pdf , generate a SQL query to find all supplier names which are located in the India nation."
} ] } ] }'))-> 'candidates' -> 0 -> 'content' -> 'parts' -> 0 -> 'text';
```

The response is a JSON object. For more information about the format of the object, see [Response body](/gemini-enterprise-agent-platform/reference/models/inference#response).

The following example modifies the previous example in the following ways:

-   The example uses the contents of the current database's `messages.message` column as input.
    
-   The example demonstrates the use of [the `json_build_object()` function](https://www.postgresql.org/docs/current/functions-json.html) as an aid to formatting the function parameters.
    

```

select ml_predict_row('projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent', json_build_object('contents', json_build_object('text', message))) from messages;
```

The returned JSON object now contains one entry in its `predictions` array for every row in the `messages` table.

Because the response is a JSON object, you can pull specific fields from it using the PostgreSQL arrow operator:

```
select ml_predict_row('projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent', json_build_object('contents', json_build_object('text', message)))->'predictions'->0->'content' FROM messages;
```

For more example arguments to `ml_predict_row()`, see [Quickstart using the Agent Platform API API](/gemini-enterprise-agent-platform/agent-studio/quickstart).

## What's next

-   [Learn how to build a smart shopping assistant with AlloyDB, pgvector, and model endpoint management](https://codelabs.developers.google.com/smart-shop-agent-alloydb#0).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.