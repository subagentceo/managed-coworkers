-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Register and call remote AI models in AlloyDB overview Stay organized with collections Save and categorize content based on your preferences.

Before registering an AI model endpoint and invoking predictions with Learn about key concepts for registering AI model endpoints and invoking predictions with Model endpoint management. This document provides an overview of model endpoint management, use cases, and concepts such as schemas, model providers and types, authentication, and various function types.

To register remote model endpoints with AlloyDB Omni, see [Register and call remote AI models in AlloyDB Omni](/alloydb/omni/docs/model-endpoint-overview).

## Overview

_Model endpoint management_ is an AlloyDB AI feature that includes functions and operators that help you register and manage AI model metadata. You can register a model endpoint, manage model endpoint metadata in your database cluster, and make calls to the remote model endpoints using SQL queries.

Model endpoint management provides the [`google_ml_integration`](/alloydb/docs/reference/model-endpoint) extension that includes functions that let you register the metadata related to AI models with AlloyDB. This registered metadata is used to generate vector embeddings or invoke predictions.

AI functions includes a suite of functions that build on model endpoint management ([Preview](https://cloud.google.com/products#product-launch-stages)), and adds support for AI operators that let you combine natural language phrases with SQL queries, like `ai.if()` for filters and joins, `ai.rank()` for ordering, and `ai.generate()` for generating summaries of your data. It also adds support for Gemini Enterprise Agent Platform multimodal and ranking models.

Some of the example model types that you can register using model endpoint management are as follows:

-   [Agent Platform](/gemini-enterprise-agent-platform/overview) text embedding and generic models
-   [Agent Platform Multimodal model](/gemini-enterprise-agent-platform/models/multimodal-embeddings-api)
-   [Agent Platform ranking models](/generative-ai-app-builder/docs/ranking) ([Preview](https://cloud.google.com/products#product-launch-stages))
-   Embedding models provided by third-party providers, such as Hugging Face or OpenAI
-   Custom-hosted text embedding models, including self-hosted models or models available through private endpoints
-   Generic models with a JSON-based API—for example, `facebook/bart-large-mnli` model hosted on Hugging Face, `gemini-pro` model from the Model Garden, or `claude` models by Anthropic

**Note:** Agent Platform model support is governed by Agent Platform model versioning and lifecycle guidelines. For more information about stable versions, see [Model versions and lifecycle](/gemini-enterprise-agent-platform/models/model-versions).

## Use cases

You can call the registered model endpoints to interact with existing data in your database to generate embeddings or predictions. Some application use cases are as follows:

-   **Real-time inference with transaction application**: provides real-time recommendations based on the user's current browsing history and in-cart content.
-   **Identify sentiment and generate summaries**: for a database of customer reviews, generates summaries or identify the key sentiment for each review.
-   **Intelligent search and retrieval systems**: build search systems for a database of internal knowledge base, and query using AI powered SQL operators instead of keywords.
-   **Personalized user experiences**: optimize a content platform to dynamically personalize what content is displayed to each user based on their past interactions.

For more information about AlloyDB AI use cases, see [AlloyDB AI use cases](/alloydb/docs/ai/alloydb-ai-use-cases).

## How it works

You can use model endpoint management to register a model endpoint that complies to the following:

-   Model input and output supports JSON format.
-   Model can be called using the REST protocol.

When you [register a model endpoint with the model endpoint management](/alloydb/docs/ai/register-model-endpoint), it registers each endpoint with a unique model ID that you provided as a reference to the model.

You can use the model endpoint ID to query models to do the following:

-   Generate embeddings to translate text prompts to numerical vectors. You can store generated embeddings as vector data when the `vector` extension is enabled in the database. For more information, see [Query and index embeddings with pgvector](/alloydb/docs/ai/store-embeddings).

-   Generate multimodal embeddings to translate multimodal data such as text, images, and videos to embeddings. ([Preview](https://cloud.google.com/products#product-launch-stages))

-   Rank or score a list of items in a query based on a criteria stated using natural language. ([Preview](https://cloud.google.com/products#product-launch-stages))

-   Invoke predictions using SQL.


## Key concepts

Before you start using model endpoint management, understand the concepts required to connect to and use the models.

### Schemas

Your applications can access model endpoint management using the `google_ml_integration` extension. The `google_ml_integration` extension includes functions in `public`, `google_ml`, and `ai` schema. All the functions are included in the `google_ml` schema, and certain functions are available in the `public` and `ai` schemas.

For more information about schemas, see [Schemas](/alloydb/docs/reference/model-endpoint#namespaces).

### Model provider

_Model provider_ indicates the supported model hosting providers. Setting the model provider is optional, but helps model endpoint management by identifying the provider, and automatically formatting headers for supported models.

For more information about model provider, see [Model provider](/alloydb/docs/reference/model-endpoint#model-provider).

### Model type

_Model type_ indicates the type of the AI model. The extension supports text embedding as well as any generic model type. The supported model type you can set when registering a model endpoint are `text-embedding` and `generic`.

Setting model type is optional when registering generic model endpoints as `generic` is the default model type.

For more information about model type, see [Model type](/alloydb/docs/reference/model-endpoint#model-type).

### Authentication

_Auth types_ indicate the authentication type that you can use to connect to the model endpoint management using the `google_ml_integration` extension. Setting authentication is optional and is required only if you need to authenticate to access your model.

For more information about authentication, see [Authentication](/alloydb/docs/reference/model-endpoint#authentication).

### Prediction functions

Prediction functions are SQL functions that let you interact with AI models from within your AlloyDB database. These functions let you use standard SQL queries to send data to a model endpoint and generate embeddings or predictions.

For more information about prediction functions, see [Prediction functions](/alloydb/docs/reference/model-endpoint#prediction-functions).

### Operator functions

The `google_ml_integration` extension includes the following operator functions, which use default Gemini to query using AI powered SQL operators.

For more information about operator functions, see [Operator functions](/alloydb/docs/reference/model-endpoint#operator-functions).

### Transform functions

Transform functions modify the input to a format that the model understands, and converts the model response to the format that the prediction function expects. The transform functions are used when registering the `text-embedding` model endpoint without built-in support. The signature of the transform functions depends on the input expected by the model.

For more information about transform functions, see [Transform functions](/alloydb/docs/reference/model-endpoint#transform-functions).

### HTTP header generation function

The HTTP header generation function generates the output in JSON key value pairs that are used as HTTP headers. The signature of the prediction function defines the signatures of the header generation function.

For more information about HTTP header generation function, see [HTTP header generation function](/alloydb/docs/reference/model-endpoint#header-gen-function).

## What's next

-   [Set up authentication](/alloydb/docs/ai/register-model-endpoint#before-you-begin) for model providers.
-   [Register a model endpoint with model endpoint management](/alloydb/docs/ai/register-model-endpoint).
-   Learn about the [model endpoint management reference](/alloydb/docs/reference/model-endpoint).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
