-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Perform time-series forecasting Stay organized with collections Save and categorize content based on your preferences.

This page describes how to perform [time-series](https://en.wikipedia.org/wiki/Time_series) predictions directly in your AlloyDB database. You can use various forecasting models, including the [TimesFM](https://github.com/google-research/timesfm) models, to help you navigate uncertainty and make informed strategic decisions. For more details on the model, see the [TimesFM research blog](https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/).

AlloyDB's `ai.forecast` function is designed to work with any model registered with the `ts_forecasting` model type, providing you with the flexibility to use the best model for your needs. This document provides a detailed guide on using TimesFM, but you can apply the principles to other models as well.

## Before you begin

Before you can perform time-series forecasting, you must enable the forecasting feature in AlloyDB and register a model.

### Register a forecasting model

You can use various forecasting models with AlloyDB.

This section provides instructions for registering the TimesFM model. For instructions on registering other models, see [Register a model endpoint with model endpoint management](/alloydb/docs/ai/register-model-endpoint).

#### Use the TimesFM model

[TimesFM](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/timesfm) models come in two versions:

-   TimesFM 1.0: the initial version of the TimesFM model.
-   TimesFM 2.0: this version is recommended, as it delivers up to 25% higher accuracy compared to version 1.0.

Both models are available in the Model Garden for rapid deployment.

To use TimesFM models, you must first deploy the TimesFM model to a Gemini Enterprise Agent Platform endpoint and then register it in AlloyDB.

##### Deploy the TimesFM model to an Agent Platform endpoint

You can deploy the model using a one-click deployment from the Google Cloud console, or manually using a Colaboratory notebook.

### One-click deployment

To deploy the TimesFM model using a one-click deployment, follow these steps:

1.  In the Google Cloud console, go to the **Model Garden** page:

    [Go to Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden)
2.  In the **Search** field, enter `TimesFM`.
3.  In the search results, click `TimesFM`.
4.  In the **TimesFM** page, complete the following steps:

5.  Click **Deploy model**.
6.  Select **Agent Platform**.
7.  In the **Deploy on Agent Platform** pane, configure and deploy your model:

    1.  To use the latest version of the TimesFM model, in the **Resource ID** drop-down, select `google/timesfm-2.0`.
    2.  To make it easier to identify the deployment later, enter the following:
        1.  In the **Model name**, a unique `MODEL_NAME`.
        2.  In the **Endpoint name**, a unique `ENDPOINT_NAME`.
    3.  To expand the configuration options, in **Deployment settings**, click **Advanced**.
        1.  To ensure the lowest possible latency, in the **Region** drop-down, select the same region where your AlloyDB instance is located.
        2.  For the best performance, in the **Machine spec** drop-down, select an appropriate machine specification. Note that a GPU or TPU might offer lower latency.
    4.  In the **Endpoint access** drop-down of **Availability policies**, select **Public (Shared endpoint)**.

        This creates an endpoint in the `aiplatform` domain that works with AlloyDB.

    5.  To deploy the model to a managed endpoint, click **Deploy**. The deployment might take about 10–15 minutes.
8.  After the TimesFM model is deployed, a link similar to `google_timesfm-VERSION-one-click-deploy` displays in **Endpoints**.
9.  To get the model request URL, in **Endpoints**, click the deployment link.
10.  On the endpoint details page, click **Sample request**.
11.  In the **Sample request** pane, find and take note of the model request URL. You use this information in [Register the TimesFM model in AlloyDB](#register-timesfm-alloydb)—for example, `https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/endpoints/ENDPOINT_ID:predict`.

     Make sure the request URL has `aiplatform.googleapis.com` in it.


### Manual deployment

To manually deploy the TimesFM model using a Colaboratory notebook, follow these steps:

1.  Navigate to the **Model Garden** page in the Google Cloud console:

    [Go to Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden)
2.  In the **Search** field, enter `TimesFM`.
3.  In the search results, click `TimesFM` to open the model card.
4.  In the **TimesFM** page, click **CO Open Notebook**.
5.  In the **Open Notebook** window, click the **Collab Enterprise** link for TimesFM 2.0.
6.  In the **Collab Enterprise** page, complete the following steps:

    1.  To establish a connection to the runtime environment, click **Connect**.
    2.  Optional: Complete the following steps if needed:

        -   In the **Prerequisites** section of **Setup Google Cloud project**, set the BUCKET\_URI and REGION—for example, set the BUCKET\_URI to `gs://your-unique-bucket-name` and the REGION to `us-central1`.

            **Note:** The bucket name must be globally unique. If you don't set a region, it's set automatically based on the Colab Enterprise environment.

        -   In the **accelerator\_type** drop-down of **Deploy TimesFM to a Vertex AI Endpoint**, select a different accelerator type if needed.
        -   In **Step 3: Set the maximum forecast horizon**, fill out the **horizon** and **max\_context** fields—for example, set horizon to `128` and max\_context to `512`.
    3.  Deselect the `use_dedicated_endpoint` checkbox.
    4.  Execute all cells in the Notebook.

    The output of the notebook provides the endpoint details in the following format: `projects/PROJECT_ID/locations/REGION/endpoints/ENDPOINT_ID`.

7.  To construct the `model_request_url` for the SQL model creation call, replace the project and endpoint identifiers with the endpoint details from the preceding step as follows:

    CALL google\_ml.create\_model(
     model\_id \=> 'timesfm\_v2',
     model\_qualified\_name \=> 'timesfm\_v2',
     model\_type \=> 'ts\_forecasting',
     model\_provider \=> 'google',
     model\_request\_url \=> 'https://REGION\-aiplatform.googleapis.com/v1/projects/PROJECT\_ID/locations/REGION/endpoints/ENDPOINT\_ID:predict');

    You need this `model_request_url` in `the google_ml.create_model` call when you register the TimesFM model in AlloyDB, as described in the following section.

8.  To confirm that the `ai.forecast` function works as expected, run the following sample query:

    SELECT \* FROM ai.forecast(
       source\_query\=> '
         SELECT my\_timestamp, my\_data\_value FROM (
           VALUES
             (CAST(''2025-01-01'' AS TIMESTAMP), 10.0),
             (CAST(''2025-01-02'' AS TIMESTAMP), 12.0),
             (CAST(''2025-01-03'' AS TIMESTAMP), 11.0),
             (CAST(''2025-01-04'' AS TIMESTAMP), 13.0),
             (CAST(''2025-01-05'' AS TIMESTAMP), 15.0),
             (CAST(''2025-01-06'' AS TIMESTAMP), 14.0),
             (CAST(''2025-01-07'' AS TIMESTAMP), 16.0),
             (CAST(''2025-01-08'' AS TIMESTAMP), 18.0),
             (CAST(''2025-01-09'' AS TIMESTAMP), 17.0),
             (CAST(''2025-01-10'' AS TIMESTAMP), 20.0)
           ) AS t (my\_timestamp, my\_data\_value)
         ' ,
       model\_id \=> 'timesfm\_v2',
       data\_col \=> 'my\_data\_value',
       timestamp\_col \=> 'my\_timestamp',

       \-- The rest of the parameters are the same
       horizon \=> 7,
       conf\_level \=> 0.80
    );


##### Register the TimesFM model in AlloyDB

To register the TimesFM model in AlloyDB, follow these steps:

1.  Verify that [the `google_ml_integration` extension is installed](/alloydb/docs/ai/configure-vertex-ai#verify-installed-extension) in the AlloyDB database that contains the data that you want to run predictions on.

2.  Confirm that you have version 1.4.5 or later of the `google_ml_integration` extension installed.

    ```
    SELECT extversion FROM pg_extension WHERE extname = 'google_ml_integration';
    ```

    The following is the sample output:

    ```
    extversion
    ------------
    1.4.5
    (1 row)
    ```

3.  Call `google_ml.create_model` using the model request URL you took note of in [Register a forecasting model](#register-forecasting-model).

    ```
    CALL
    google_ml.create_model(
      model_id => 'MODEL_ID',
      model_qualified_name => 'MODEL_QUALIFIED_NAME',
      model_type => 'ts_forecasting',
      model_provider => 'google',
      model_request_url => 'https://REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/endpoints/ENDPOINT_ID:predict' -- Example endpoint from Model Garden
      );
    ```

    Replace the following:

    -   `MODEL_ID`: a unique identifier for the registered model you want to use for forecasting—for example, `vertex_timesfm`.
    -   `MODEL_QUALIFIED_NAME`: a user-defined name for the model—for example, `timesfm_v2`.
    -   `REGION`: the region where the instance is placed—for example, `us-central1`.
    -   `PROJECT_ID`: the name of the project where the model is deployed—for example, `forecast_project`.
    -   `ENDPOINT_ID`: the name of the model deployment—for example, `my-timesfm-endpoint`.

        The `model_request_url` is provided by Agent Platform after you deploy your model. Copy the entire URL from the **Sample request** pane in the Agent Platform console. It already contains the correct project and endpoint information.


    **Note:** If your AlloyDB instance is in a different Google Cloud project than the Agent Platform model endpoint, make sure that the AlloyDB Service Account is granted the Vertex AI User role, which is `roles/aiplatform.user`, in the project where the Agent Platform model is hosted.


## Generate forecasts

After registering the TimesFM model and enabling the necessary flag, you can generate forecasts by passing either a source table or query with your time series data.

The `ai.forecast` function is documented separately. For a complete list of parameters, including their descriptions and examples, see the [Model endpoint management reference](/alloydb/docs/reference/model-endpoint#ai-forecast).

### Generate forecasts from a source table

The following example shows how to call the `ai.forecast` function using a source table to generate predictions:

```
SELECT * FROM ai.forecast(
    model_id => 'MODEL_ID',
    source_table => 'time_series_data',
    data_col => 'data_points',
    timestamp_col => 'timestamp',
    horizon => 2,
    conf_level => 0.80
);
```

### Generate forecasts from a query

The following example shows how to generate forecasts by calling the `ai.forecast` function using a subquery as the data source:

```
SELECT * FROM ai.forecast(
    model_id => 'MODEL_ID',
    source_query => '(SELECT * FROM time_series_data ORDER BY timestamp LIMIT 1) AS time_series_data',
    data_col => 'data_points',
    timestamp_col => 'timestamp',
    horizon => 2,
    conf_level => 0.80
);
```

## Use other forecasting models

You can use the `ai.forecast` function with any other time-series forecasting model that you register in AlloyDB. The key is to ensure that your model is registered with the `ts_forecasting` model type.

For detailed instructions on how to register different types of models, see [Register and call remote AI models using model endpoint management](/alloydb/docs/ai/register-model-endpoint). Once your model is registered, you can use it with the `ai.forecast` function by specifying its `model_id`.

## What's next

-   [Register a model endpoint with model endpoint management](/alloydb/docs/ai/register-model-endpoint).

-   [Query using AI powered SQL operators](/alloydb/docs/ai/evaluate-semantic-queries-ai-operators).


Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
