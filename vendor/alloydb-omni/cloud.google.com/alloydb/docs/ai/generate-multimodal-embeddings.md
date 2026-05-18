-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Generate multimodal embeddings Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

**Note:** This experimental launch is a Pre-GA offering.

You can generate multimodal embeddings in AlloyDB for PostgreSQL using the supported Gemini Enterprise Agent Platform multimodal model, `multimodalembedding@001`.

You can use the Agent Platform multimodal embedding models referred to in [Supported models](/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models).

This page assumes that you're familiar with AlloyDB for PostgreSQL and [generative AI concepts](/docs/generative-ai). For more information, see [What are embeddings](/alloydb/docs/ai/work-with-embeddings#what-are-embeddings).

## Before you begin

Before you use multimodal embeddings, do the following:

-   [Verify that the `google_ml_integration` extension is installed](/alloydb/docs/ai/configure-vertex-ai#verify-installed-extension).
-   [Verify that the `google_ml_integration.enable_model_support` flag is set to `on`](/alloydb/docs/instance-configure-database-flags).
-   [Integrate with Agent Platform](/alloydb/docs/ai/configure-vertex-ai).
-   [Access data in Cloud Storage to generate multimodal embeddings](#access-data-in-storage).

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
    

### Access data in Cloud Storage to generate multimodal embeddings

-   To generate multimodal embeddings, refer to content in Cloud Storage using a `gs://` URI.
-   Access Cloud Storage content through your current project's Agent Platform service agent. By default, the Agent Platform service agent already has permission to access the bucket in the same project. For more information, see [IAM roles and permissions index](/iam/docs/roles-permissions/aiplatform#aiplatform.serviceAgent).
-   To access data in a Cloud Storage bucket in another Google Cloud project, run the following gcloud CLI command to grant the [Storage Object Viewer role (`roles/storage.objectViewer`)](/storage/docs/access-control/iam-roles) to the Agent Platform service agent of your AlloyDB project.
    
    ```
    gcloud projects add-iam-policy-binding <ANOTHER_PROJECT_ID> \
    --member="serviceAccount:service-<PROJECT_ID>@gcp-sa-aiplatform.iam.gserviceaccount.com" \
    --role="roles/storage.objectViewer"
    ```
    
    For more information, see [Set and manage IAM policies on buckets](/storage/docs/access-control/using-iam-permissions).
    

To generate multimodal embeddings, select one of the following schemas.

ai schema google\_ml schema

## Generate multimodal embeddings

To generate text embeddings for a `multimodalembedding@001` model endpoint, run the following statement:

```
SELECT
  ai.text_embedding(
    model_id => 'multimodalembedding@001',
    content => 'TEXT');
```

Replace `TEXT` with the text to generate the embedding for.

To generate image embeddings for a registered `multimodalembedding@001` model endpoint where the image mimetype is default `image/jpeg`, run the following statement:

```
SELECT
  ai.image_embedding(
    model_id => 'multimodalembedding@001',
    image => 'IMAGE_PATH_OR_TEXT',
    mimetype => MIMETYPE');
```

Replace the following:

-   `IMAGE_PATH_OR_TEXT` with the Cloud Storage URI of the image, for example, `gs://my-bucket/embeddings/flowers.jpeg`, or the base64 string of the image.
-   `MIMETYPE` with the mimetype of the image, for example, `image/jpeg`. For the full list of supported mimetypes, see the [Multimodal embeddings API](/gemini-enterprise-agent-platform/reference/models/multimodal-embeddings-api#image).

To generate video embeddings for a registered `multimodalembedding@001` model endpoint, run the following statement:

```
SELECT
  ai.video_embedding(
    model_id => 'multimodalembedding@001',
    video => 'VIDEO_URI');
```

Replace `VIDEO_URI` with the Cloud Storage URI of the target video, for example, `gs://my-bucket/embeddings/supermarket-video.mp4`, or the base64 string of the video. These are two-dimensional arrays that can be accessed as `my_array[0][5]` like syntax. For more information, see [Arrays](https://www.postgresql.org/docs/17/arrays.html).

## What's next

-   [Register a model endpoint with model endpoint management](/alloydb/docs/ai/register-model-endpoint).
    
-   [Query using AI powered SQL operators](/alloydb/docs/ai/evaluate-semantic-queries-ai-operators).
    

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.