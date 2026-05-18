-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Build realtime vector embedding pipeline for AlloyDB with Dataflow Stay organized with collections Save and categorize content based on your preferences.

**Note:** AlloyDB for PostgreSQL offers a built-in, scalable solution for generating and maintaining vector embeddings. For more information, see [Generate and manage auto vector embeddings for large tables](/alloydb/docs/ai/generate-manage-auto-embeddings-for-tables). We recommend using this solution for most use cases, including semantic search and Retrieval Augmented Generation (RAG). The Dataflow-based method described on this page is available as a fallback option.

This document shows you how to create an AlloyDB Extract, Transform, Load (ETL) pipeline using [Dataflow](/dataflow/docs/machine-learning). Google Cloud Dataflow is a fully managed Google Cloud service for developing and running data processing pipelines.

You can use the instructions in the document, which are based on the [Vector Embedding Ingestion with Apache Beam and AlloyDB](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb) Colab, which uses Python to create the `basic_ingestion_pipeline.py` ingestion pipeline. Some of the use cases where you can apply the information in this document are semantic search or retrieval augmented generation (RAG).

These instructions describe the following Dataflow pipeline components:

-   Setting up an AlloyDB and Dataflow connection
-   Generating embeddings in AlloyDB using the Apache Beam `VertexAITextEmbeddings` handler and the Gemini Enterprise Agent Platform text embedding model
-   Creating a streaming pipeline in Dataflow

## Before you begin

Before you create the Dataflow pipeline using the Colab, complete these prerequisites:

-   [Configure your environment](/dataflow/docs/quickstarts/create-pipeline-python#before-you-begin) to create a Dataflow pipeline.
-   Enable the AlloyDB and other required APIs:
    
    ```
    gcloud services enable alloydb.googleapis.com cloudresourcemanager.googleapis.com \
    servicenetworking.googleapis.com
    ```
    
-   [Create an AlloyDB cluster and primary instance](/alloydb/docs/quickstart/create-and-connect).
    
-   [Install the AlloyDB vector extension in your database](/alloydb/docs/instance-configure-extensions#enable).
    
-   [Grant the AlloyDB Admin (roles/alloydb.admin) role](/alloydb/docs/user-grant-access#procedure) to the Dataflow user account.
    

## Set up your AlloyDB instance and pipeline components

First, configure your pipeline to connect to an AlloyDB instance. This configuration includes defining the Google Cloud project ID, AlloyDB instance URI, user, and password to connect using the AlloyDB language connector. For more information about setting up the connection, see [Database Setup](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Database_Setup).

The Retrieval-Augmented Generation (RAG)-specific Apache Beam modules provide classes for the following tasks:

-   Ingesting data from AlloyDB
-   Generating embeddings
-   Writing these vector embeddings back to AlloyDB

Import the required classes into your pipeline code before you build the pipeline logic. For more information about pipeline components, see [Importing Pipeline Components](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Importing_Pipeline_Components).

## Create sample data

The [Vector Embedding Ingestion with Apache Beam and AlloyDB](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb) Colab provides sample `products_data` data for running the pipeline. The pipeline uses this sample data as input, along with the embedding model, to generate embeddings.

For more information, see [Create sample data](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Create_Sample_Product_Catalog_Data).

## Create a table to store embeddings

The pipeline stores the generated embeddings in the `default_dataflow_product_embeddings` table. For more information about creating the table schema, see [Create table with default schema](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Create_table_with_default_schema).

## Optional: Prepare data for embedding ingestion

Based on your dataset, you can split your data into metadata and text that the embedding model must convert to embeddings. The `MLTransform()` and `VectorDatabaseWriteTransform()` classes process input data into a size that the embedding model supports. Include the metadata and format the input data according to the specifications of the embedding model that you are using.

For more information about preparing data, see [Map products data to chunks](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Map_products_to_Chunks).

## Configure the embedding handler to generate embeddings

The `VertexAITextEmbeddings()` class defines the text embedding model that creates vector embeddings. This embedding model converts the chunked data to embeddings.

For more information, see [Configure Embedding Handler](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Configure_Embedding_Handler).

You can also use a pre-trained model that is created with the Huggingface SentenceTransformers framework to generate vector embeddings. For more information, see [Generate embeddings with HuggingFace](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Generate_embeddings_with_HuggingFace).

## Create an ingestion pipeline

The `basic_ingestion_pipeline.py` pipeline, provided in the [Vector Embedding Ingestion with Apache Beam and AlloyDB](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Quick_Start_Basic_Vector_Ingestion) Colab, incorporates the configurations from the earlier sections, including AlloyDB setup, loading data to AlloyDB, optional data chunking, and embedding handler configuration.

The ingestion pipeline does the following:

-   Creates product data tables
-   Converts data to chunks
-   Generates embeddings
-   Writes the converted embeddings to the `products_data` table in AlloyDB

You can run this pipeline using a direct local runner or a cloud-based runner such as Dataflow.

For more information about creating the ingestion pipeline, see [Save our Pipeline to a python file](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Save_our_Pipeline_to_a_python_file).

## Run the Dataflow pipeline

You can run a Dataflow pipeline from the command line. Pass credentials, such as your project ID, AlloyDB connection details, Cloud Storage bucket location, execution environment details, network information, and the name of the ingestion pipeline (`basic_ingestion_pipeline.py`).

In the [Vector Embedding Ingestion with Apache Beam and AlloyDB](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb) Colab, the AlloyDB for PostgreSQL instance and Dataflow jobs run in the same VPC network and subnetwork.

For more information about running a pipeline in Dataflow, see [Run Pipeline on Dataflow](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Run_Pipeline_on_Dataflow).

In the Google Cloud console, in the [Dataflow dashboard](https://console.cloud.google.com/dataflow/jobs), you can view execution graphs, logs, and metrics while your pipeline executes.

## Optional: Run the streaming Dataflow pipeline

For data that is expected to change often, such as similarity searches or recommendation engines, consider creating a streaming pipeline using Dataflow and Pub/Sub.

Instead of processing a batch of data, this pipeline continuously reads incoming messages from a Pub/Sub topic, converts the messages into chunks, generates embeddings using a specified model (like Hugging Face or Agent Platform), and updates the AlloyDB table.

For more information, see [Streaming Embeddings Updates from Pub/Sub](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Streaming_Embeddings_Updates_from_PubSub).

## Verify vector embeddings in AlloyDB for PostgreSQL

After the pipeline executes, verify that the pipeline wrote the embeddings to your AlloyDB database.

For more information, see [Verify the Written Embeddings](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb#scrollTo=Verify_the_Written_Embeddings).

## What's next

-   Learn how to perform [vector embedding ingestion with Apache Beam, Dataflow, and AlloyDB](https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/beam-ml/alloydb_product_catalog_embeddings.ipynb).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.