-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Perform a vector search Stay organized with collections Save and categorize content based on your preferences.

This tutorial describes how to set up and perform a vector search in AlloyDB for PostgreSQL using the Google Cloud console. Examples are included to show vector search capabilities, and they're intended for demonstration purposes only.

For information about how to use filtered vector search to refine your similarity searches, see [Filtered vector search in AlloyDB for PostgreSQL](/alloydb/docs/ai/filtered-vector-search-overview).

To learn how to perform a vector search with Gemini Enterprise Agent Platform embeddings, see [Getting started with Vector Embeddings with AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-embedding).

## Objectives

-   Create an AlloyDB cluster and primary instance.
-   Connect to your database and install required extensions.
-   Create a `product` and `product inventory` table.
-   Insert data to the `product` and `product inventory` tables and perform a basic vector search.
-   Create a ScaNN index on the products table.
-   Perform a basic vector search.
-   Perform a complex vector search with a filter and a join.

## Costs

In this document, you use the following billable components of Google Cloud:

To generate a cost estimate based on your projected usage, use the [pricing calculator](/products/calculator).

New Google Cloud users might be eligible for a [free trial](/free).

When you finish the tasks that are described in this document, you can avoid continued billing by deleting the resources that you created. For more information, see [Clean up](#clean-up).

## Before you begin

**Note:** If you already performed the steps in this section, proceed directly to [Insert product and product inventory data and perform a basic vector search](#insert-product-data) and continue the tutorial.

### Enable billing and required APIs

1.  In the Google Cloud console, go to the **Clusters** page.

    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)

2.  [Make sure that billing is enabled for your Google Cloud project.](/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project)

3.  Enable the Cloud APIs necessary to create and connect to AlloyDB for PostgreSQL.

    [Enable the APIs](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com,compute.googleapis.com,servicenetworking.googleapis.com,aiplatform.googleapis.com)

    1.  In the **Confirm project** step, click **Next** to confirm the name of the project you are going to make changes to.
    2.  In the **Enable APIs** step, click **Enable** to enable the following:

        -   AlloyDB API
        -   Compute Engine API
        -   Service Networking API
        -   Agent Platform API

### Create an AlloyDB cluster and primary instance

**Note:** Some regions that are available for AlloyDB aren't available for Agent Platform text embedding models. To learn which Agent Platform features are available in each Agent Platform region, see [Locations for machine learning services](/gemini-enterprise-agent-platform/machine-learning/general/locations#feature-availability).

1.  In the Google Cloud console, go to the **Clusters** page.

    [Go to Clusters](https://console.cloud.google.com/alloydb/clusters)

2.  Click **Create cluster**.

3.  In **Cluster ID**, enter `my-cluster`.

4.  Enter a password. Take note of this password because you use it in this tutorial.

5.  Select a region—for example, `us-central1 (Iowa)`.

6.  Select the default network.

    If you have a private access connection, continue to the next step. Otherwise, click **Set up connection** and follow these steps:

    1.  In **Allocate an IP range**, click **Use an automatically allocated IP range**.
    2.  Click **Continue** and then click **Create connection**.
7.  In **Zonal availability**, select **Single zone**.

8.  Select the `2 vCPU,16 GB` machine type.

9.  In **Connectivity**, select **Enable public IP**.

10.  Click **Create cluster**. It might take several minutes for AlloyDB to create the cluster and display it on the primary cluster **Overview** page.

11.  In **Instances in your cluster**, expand the **Connectivity** pane. Take note of the **Connection URI** because you use it in this tutorial.

     The connection URI is in the `projects/<var>PROJECT_ID</var>/locations/<var>REGION_ID</var>/clusters/my-cluster/instances/my-cluster-primary` format.


### Grant Agent Platform user permission to AlloyDB service agent

To enable AlloyDB to use Agent Platform text embedding models, you must add Agent Platform user permissions to the AlloyDB service agent for the project where your cluster and instance is located.

For more information about how to add the permissions, see [Grant Agent Platform user permission to AlloyDB service agent](/alloydb/docs/ai/configure-vertex-ai#grant-iam-permissions).

### Connect to your database using a web browser

1.  In the Google Cloud console, go to the **Clusters** page.

    [Go to Clusters](https://console.cloud.google.com/alloydb/clusters)

2.  In the **Resource name** column, click the name of your cluster, `my-cluster`.

3.  In the navigation pane, click **AlloyDB Studio**.

4.  In the **Sign in to AlloyDB Studio** page, follow these steps:

    1.  Select the `postgres` database.
    2.  Select the `postgres` user.
    3.  Enter the password you created in [Create a cluster and its primary instance](#create_an_alloydb_cluster_and_primary_instance).
    4.  Click **Authenticate**. The **Explorer** pane displays a list of the objects in the `postgres` database.
5.  Open a new tab by clicking **\+ New SQL editor tab** or + **New tab**.


### Install required extensions

Run the following query to install the `vector` and `alloydb_scann` extensions:

  ```
  CREATE EXTENSION IF NOT EXISTS vector;
  CREATE EXTENSION IF NOT EXISTS alloydb_scann;
```

## Insert product and product inventory data and perform a basic vector search

1.  Run the following statement to create a `product` table that does the following:

    -   Stores basic product information.
    -   Includes an `embedding` vector column that computes and stores an embedding vector for a product description of each product.

    **Note:** If you have more than 100k rows in a table, we don't recommend using the `embedding()` function to generate stored embeddings on existing data in a table. It is best suited for inline embedding generation.

      ```
      CREATE TABLE product (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255),
        color VARCHAR(255),
        embedding vector(768) GENERATED ALWAYS AS (embedding('text-embedding-005', description)) STORED
      );
    ```

    If needed, you can use the [Logs Explorer](/logging/docs/view/logs-explorer-interface) to view logs and troubleshoot errors.

2.  Run the following query to create a `product_inventory` table that stores information about available inventory and corresponding prices. The `product_inventory` and `product` tables are used in this tutorial to run complex vector search queries.

    ```
    CREATE TABLE product_inventory (
      id INT PRIMARY KEY,
      product_id INT REFERENCES product(id),
      inventory INT,
      price DECIMAL(10,2)
    );
    ```

3.  Run the following query to insert product data into the `product` table:

    ```
    INSERT INTO product (id, name, description,category, color) VALUES
    (1, 'Stuffed Elephant', 'Soft plush elephant with floppy ears.', 'Plush Toys', 'Gray'),
    (2, 'Remote Control Airplane', 'Easy-to-fly remote control airplane.', 'Vehicles', 'Red'),
    (3, 'Wooden Train Set', 'Classic wooden train set with tracks and trains.', 'Vehicles', 'Multicolor'),
    (4, 'Kids Tool Set', 'Toy tool set with realistic tools.', 'Pretend Play', 'Multicolor'),
    (5, 'Play Food Set', 'Set of realistic play food items.', 'Pretend Play', 'Multicolor'),
    (6, 'Magnetic Tiles', 'Set of colorful magnetic tiles for building.', 'Construction Toys', 'Multicolor'),
    (7, 'Kids Microscope', 'Microscope for kids with different magnification levels.', 'Educational Toys', 'White'),
    (8, 'Telescope for Kids', 'Telescope designed for kids to explore the night sky.', 'Educational Toys', 'Blue'),
    (9, 'Coding Robot', 'Robot that teaches kids basic coding concepts.', 'Educational Toys', 'White'),
    (10, 'Kids Camera', 'Durable camera for kids to take pictures and videos.', 'Electronics', 'Pink'),
    (11, 'Walkie Talkies', 'Set of walkie talkies for kids to communicate.', 'Electronics', 'Blue'),
    (12, 'Karaoke Machine', 'Karaoke machine with built-in microphone and speaker.', 'Electronics', 'Black'),
    (13, 'Kids Drum Set', 'Drum set designed for kids with adjustable height.', 'Musical Instruments', 'Blue'),
    (14, 'Kids Guitar', 'Acoustic guitar for kids with nylon strings.', 'Musical Instruments', 'Brown'),
    (15, 'Kids Keyboard', 'Electronic keyboard with different instrument sounds.', 'Musical Instruments', 'Black'),
    (16, 'Art Easel', 'Double-sided art easel with chalkboard and whiteboard.', 'Arts & Crafts', 'White'),
    (17, 'Finger Paints', 'Set of non-toxic finger paints for kids.', 'Arts & Crafts', 'Multicolor'),
    (18, 'Modeling Clay', 'Set of colorful modeling clay.', 'Arts & Crafts', 'Multicolor'),
    (19, 'Watercolor Paint Set', 'Watercolor paint set with brushes and palette.', 'Arts & Crafts', 'Multicolor'),
    (20, 'Beading Kit', 'Kit for making bracelets and necklaces with beads.', 'Arts & Crafts', 'Multicolor'),
    (21, '3D Puzzle', '3D puzzle of a famous landmark.', 'Puzzles', 'Multicolor'),
    (22, 'Race Car Track Set', 'Race car track set with cars and accessories.', 'Vehicles', 'Multicolor'),
    (23, 'RC Monster Truck', 'Remote control monster truck with oversized tires.', 'Vehicles', 'Green'),
    (24, 'Train Track Expansion Set', 'Expansion set for wooden train tracks.', 'Vehicles', 'Multicolor');
    ```

4.  Optional: Run the following query to verify that the data is inserted in the `product` table:

    ```
    SELECT * FROM product;
    ```

5.  Run the following query to insert inventory data into the `product_inventory` table:

    ```
    INSERT INTO product_inventory (id, product_id, inventory, price) VALUES
    (1, 1, 9, 13.09),
    (2, 2, 40, 79.82),
    (3, 3, 34, 52.49),
    (4, 4, 9, 12.03),
    (5, 5, 36, 71.29),
    (6, 6, 10, 51.49),
    (7, 7, 7, 37.35),
    (8, 8, 6, 10.87),
    (9, 9, 7, 42.47),
    (10, 10, 3, 24.35),
    (11, 11, 4, 10.20),
    (12, 12, 47, 74.57),
    (13, 13, 5, 28.54),
    (14, 14, 11, 25.58),
    (15, 15, 21, 69.84),
    (16, 16, 6, 47.73),
    (17, 17, 26, 81.00),
    (18, 18, 11, 91.60),
    (19, 19, 8, 78.53),
    (20, 20, 43, 84.33),
    (21, 21, 46, 90.01),
    (22, 22, 6, 49.82),
    (23, 23, 37, 50.20),
    (24, 24, 27, 99.27);
    ```

6.  Run the following vector search query that tries to find products that are similar to the word `music`. This means that even though the word `music` isn't explicitly mentioned in the product description, the result shows products that are relevant to the query:

    ```
    SELECT * FROM product
    ORDER BY embedding <=> embedding('text-embedding-005', 'music')::vector
    LIMIT 3;
    ```

    The result of the query is as follows: ![Basic search query result](https://docs.cloud.google.com/alloydb/images/basic-search-result.png)

    Performing a basic vector search without creating an index uses exact nearest neighbor search (KNN), which provides efficient recall. At scale, using KNN might impact performance. For a better query performance, we recommend that you use the ScaNN index for approximate nearest neighbor (ANN) search, which provides high recall with low latencies.

    Without creating an index, AlloyDB defaults to using exact nearest-neighbor search (KNN).

    To learn more about using ScaNN at scale, see [Getting started with Vector Embeddings with AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-embedding#0).


## Create an manually-tuned ScaNN index on products table

**Important:** The examples in this tutorial are intended for demonstration purposes only. We recommend that you only create ScaNN indexes on tables that are larger than 10K.

Run the following query to create a `product_index` ScaNN index on the `product` table:

```
CREATE INDEX product_index ON product
USING scann (embedding cosine)
WITH (mode='MANUAL', num_leaves=4);
```

For more information on creating a ScaNN index, see [Create a ScaNN index](/alloydb/docs/ai/create-scann-index).

## Perform a vector search

Run the following vector search query that tries to find products that are similar to the natural language query `music`. Even though the word `music` isn't included in the product description, the result shows products that are relevant to the query:

```
SET LOCAL scann.num_leaves_to_search = 2;

SELECT * FROM product
ORDER BY embedding <=> embedding('text-embedding-005', 'music')::vector
  LIMIT 3;
```

The query results are as follows: ![Vector search query result](https://docs.cloud.google.com/alloydb/images/perform-vector-search.png)

The `scann.num_leaves_to_search` query parameter controls the number of leaf nodes that are searched during a similarity search. The `num_leaves` and `scann.num_leaves_to_search` parameter values help to achieve a balance of performance and recall.

## Perform a vector search that uses a filter and a join

You can run filtered vector search queries efficiently even when you use the ScaNN index. Run the following complex vector search query, which returns relevant results that satisfy the query conditions, even with filters:

```
SET LOCAL scann.num_leaves_to_search = 2;

SELECT * FROM product p
JOIN product_inventory pi ON p.id = pi.product_id
WHERE pi.price < 80.00
ORDER BY embedding <=> embedding('text-embedding-005', 'music')::vector
LIMIT 3;
```

## Accelerate your filtered vector search

You can use the columnar engine content store to improve the performance of vector similarity searches, specifically K-Nearest Neighbor (KNN) searches, when combined with highly selective predicate filtering —for example, using `LIKE`— in databases. In this section, you use the `vector` extension and the AlloyDB [`google_columnar_engine` extension](/alloydb/docs/columnar-engine/configure). For more information on how the columnar engine works, see [About the AlloyDB columnar engine](/alloydb/docs/columnar-engine/about).

Performance improvements come from the columnar engine's built-in efficiency in scanning large datasets and applying filters —such as `LIKE` predicates— coupled with its ability, using vector support, to pre-filter rows. This functionality reduces the number of data subsets required for subsequent KNN vector distance calculations, and it helps to optimize complex analytical queries involving standard filtering and vector search.

The columnar store offers two options to manage its content:

-   [Automatically manage the column store content](/alloydb/docs/columnar-engine/manage-content-recommendations): new AlloyDB instances use auto-columnarization by default. Alternatively, you can manually run the auto columnarization functionality.
-   [Manage column store content manually](/alloydb/docs/columnar-engine/manage-content-manually): if you need to manually manage the columns in the column store for your workload, you can [disable auto columnarization](/alloydb/docs/columnar-engine/manage-content-recommendations#disable-auto).

To compare the execution time of a KNN vector search filtered by a `LIKE` predicate before and after you enable the columnar engine, follow these steps:

1.  Enable the `vector` extension to support vector data types and operations. Run the following statements to create an example table (items) with an ID, a text description, and a 512-dimension vector embedding column.

    ```
    CREATE EXTENSION IF NOT EXISTS vector;

    CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        description TEXT,
        embedding VECTOR(512)
    );
    ```

2.  Populate the data by running the following statements to insert 1 million rows into the example `items` table.

    ```
    -- Simplified example of inserting matching (~0.1%) and non-matching data
    INSERT INTO items (description, embedding)
    SELECT
        CASE WHEN g % 1000 = 0 THEN 'product_' || md5(random()::text) || '_common' -- ~0.1% match
        ELSE 'generic_item_' || g || '_' || md5(random()::text)    -- ~99.9% don't match
        END,
        random_vector(512) -- Assumes random_vector function exists
    FROM generate_series(1, 999999) g;
    ```

3.  Measure the baseline performance of the vector similarity search without the columnar engine.

    ```
    SELECT id, description, embedding <-> '[...]' AS distance
    FROM items
    WHERE description LIKE '%product_%_common%'
    ORDER BY embedding <-> '[...]'
    LIMIT 100;
    ```

4.  Enable columnar engine and vector support by running the following command in the Google Cloud CLI. To use the gcloud CLI, you can [install and initialize](/sdk/docs/install) the gcloud CLI.

    ```
    gcloud beta alloydb instances update INSTANCE_ID \
        --cluster=CLUSTER_ID \
        --region=REGION_ID \
        --project=PROJECT_ID \
        --database-flags=google_columnar_engine.enabled=on,google_columnar_engine.enable_vector_support=on
    ```

    Replace the following:

    -   `INSTANCE_ID`: the ID of the instance.
    -   `CLUSTER_ID`: the ID of the cluster.
    -   `REGION_ID`: the region where the cluster is located.
    -   `PROJECT_ID`: the ID of the project where the cluster is located.
5.  Add the `items` table to the columnar engine:

    ```
    SELECT google_columnar_engine_add('items');
    ```

6.  Measure the performance of the vector similarity search using the columnar engine. You re-run the query that you previously ran to measure baseline performance.

    ```
    SELECT id, description, embedding <-> '[...]' AS distance
    FROM items
    WHERE description LIKE '%product_%_common%'
    ORDER BY embedding <-> '[...]'
    LIMIT 100;
    ```

7.  To check whether the query ran with the columnar engine, run the following command:

    ```
    explain (analyze) SELECT id, description, embedding <-> '[...]' AS distance
    FROM items
    WHERE description LIKE '%product_%_common%'
    ORDER BY embedding <-> '[...]'
    LIMIT 100;
    ```


## Clean up

1.  In the Google Cloud console, go to the **Clusters** page.

    [Go to Clusters](https://console.cloud.google.com/alloydb/clusters)

2.  Click the name of your cluster, `my-cluster`, in the **Resource name** column.

3.  Click _delete_ **Delete cluster**.

4.  In **Delete cluster my-cluster**, enter `my-cluster` to confirm you want to delete your cluster.

5.  Click **Delete**.

6.  If you created a private connection when you [created a cluster](#create_an_alloydb_cluster_and_primary_instance), go to the Google Cloud console [Networking page](https://console.cloud.google.com/networking/networks/details/default) and click **Delete VPC network**.


## What's next

-   Learn [real-world use cases for vector search](/alloydb/docs/ai/alloydb-ai-use-cases).
-   [Get started with vector embeddings using AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-embedding#0).
-   Learn how to [build generative AI applications using AlloyDB AI](/alloydb/docs/ai).
-   [Create a ScaNN index](/alloydb/docs/ai/create-scann-index).
-   [Tune your ScaNN indexes](/alloydb/docs/ai/tune-indexes).
-   [Learn how to build a smart shopping assistant with AlloyDB, pgvector, and model endpoint management](https://codelabs.developers.google.com/smart-shop-agent-alloydb#0).
-   [Accelerate vector search with the columnar engine](/alloydb/docs/ai/accelerate-with-ce).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-16 UTC.
