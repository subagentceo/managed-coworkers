-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Use AlloyDB AI natural language to generate SQL Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

**Note:** This experimental launch is a Pre-GA offering.

This tutorial describes how to set up and use the AlloyDB AI natural language API using the Google Cloud console. You learn how to configure the AlloyDB AI natural language API so that you can ask natural language questions and receive SQL queries and results.

The examples in this tutorial are intended for demonstration purposes only.

**Note:** To provide feedback about your experiences using AlloyDB AI natural language, [submit the User Experience Research: AlloyDB AI Natural Language form](https://docs.google.com/forms/d/e/1FAIpQLSfksRzklOU_T1aMVbI0tb0O5ZNpnone7XiD_KCBW2GWHo9uqA/viewform).

## Objectives

-   Create and populate tables, and use auto generation to create context.
-   Create a value index for the columns in the database.
-   Create and configure a natural language configuration (`nl_config`) object.
-   Create templates for a sample query in the application.
-   Use the `get_sql()` function to produce a SQL query that answers a question.
-   Use the `execute_nl_query()` function to answer a natural language question using the database.

## Costs

In this document, you use the following billable components of Google Cloud:

-   [AlloyDB for PostgreSQL](/alloydb/pricing)
-   [Gemini Enterprise Agent Platform](/gemini-enterprise-agent-platform/pricing)

To generate a cost estimate based on your projected usage, use the [pricing calculator](/products/calculator).

New Google Cloud users might be eligible for a [free trial](/free).

When you finish the tasks that are described in this document, you can avoid continued billing by deleting the resources that you created. For more information, see [Clean up](#clean-up).

## Before you begin

### Enable billing and required APIs

1.  In the Google Cloud console, select a project.
    
    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
    
2.  [Make sure that billing is enabled for your Google Cloud project.](/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project)
    
3.  Enable the Cloud APIs necessary to create and connect to AlloyDB for PostgreSQL.
    
    [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com)
    
    1.  In the **Confirm project** step, click **Next** to confirm the name of the project you are going to make changes to.
    2.  In the **Enable APIs** step, click **Enable** to enable the following:
        
        -   AlloyDB API

### Create and connect to a database

1.  [Create a cluster and its primary instance](/alloydb/docs/quickstart/create-and-connect#create-cluster).
2.  [Connect to your instance and create a database](/alloydb/docs/quickstart/create-and-connect#run).
3.  Enable Agent Platform integration. For more information, see [Integrate with Agent Platform](/alloydb/docs/ai/configure-vertex-ai).

### Enable and install the required extension

To install and use the `alloydb_ai_nl extension`, you must first enable the extension using the `alloydb_ai_nl.enabled` flag. For more information, see [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags).

To install the `alloydb_ai_nl` extension, which is the AlloyDB AI natural language support API, run the following query:

```
CREATE EXTENSION alloydb_ai_nl cascade;
```

Since AlloyDB AI natural language objects created on the primary instance are propagated to read-only replicas and cross-region replicas, ensure that you enable the AlloyDB AI natural language flag on every instance of AlloyDB for PostgreSQL.

### Upgrade the alloydb\_ai\_nl extension

If you already installed the extension, then run the following statement to update it to the latest version:

```
ALTER EXTENSION alloydb_ai_nl UPDATE;
```

## Create the nla\_demo schema and tables

In the following steps, you create the `nla_demo` schema and tables in the schema. You populate the tables with synthetic data. The provided schema and data are designed to support the fundamental operations of an online retail business, with potential applications extending to customer management, analytics, marketing, and operational aspects.

The sample data shows how you can use AlloyDB AI natural language for development, testing, and demonstration purposes, particularly for features like natural language interfaces.

1.  Create the schema by running the following query:
    
    ```
    CREATE SCHEMA nla_demo;
    ```
    
2.  Create tables in the `nla_demo` schema. The `addresses` table stores the address information for customers and orders.
    
    ```
    CREATE TABLE nla_demo.addresses (
        address_id      SERIAL         PRIMARY KEY,
        street_address  VARCHAR(255)   NOT NULL,
        city            VARCHAR(255)   NOT NULL,
        country         VARCHAR(255)
    );
    ```
    
3.  Create the `customers` table by running the following query. This table stores customer information including the customer ID, name, contact details, address reference, birth date, and record creation time.
    
    ```
    CREATE TABLE nla_demo.customers (
        customer_id     SERIAL         PRIMARY KEY,
        first_name      VARCHAR(255)   NOT NULL,
        last_name       VARCHAR(255)   NOT NULL,
        email           VARCHAR(255)   UNIQUE NOT NULL,
        address_id      INTEGER        REFERENCES nla_demo.addresses(address_id),
        date_of_birth   DATE,
        created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
    );
    ```
    
4.  Create the `categories` table, which stores product categories.
    
    ```
    CREATE TABLE nla_demo.categories (
        category_id     INTEGER        PRIMARY KEY,
        category_name   VARCHAR(255)   UNIQUE NOT NULL
    );
    ```
    
5.  Create the `brands` table, which stores brand names.
    
    ```
    CREATE TABLE nla_demo.brands (
        brand_id      INTEGER        PRIMARY KEY,
        brand_name    VARCHAR(255)   NOT NULL
    );
    ```
    
6.  Create the `products` table, which stores product information like the product ID, name, description, brand, category linkage, and record creation time.
    
    ```
    CREATE TABLE nla_demo.products (
        product_id    INTEGER        PRIMARY KEY,
        name          VARCHAR(255)   NOT NULL,
        description   TEXT           DEFAULT 'Not available',
        brand_id      INTEGER        REFERENCES nla_demo.brands(brand_id),
        category_id   INTEGER        REFERENCES nla_demo.categories(category_id),
        created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
        price         DECIMAL(10, 2),
        description_embedding        VECTOR(768)
    );
    ```
    
7.  Create the `orders` table. This table stores information about customer orders, including the customer, date, total amount, shipping and billing addresses, and order status.
    
    ```
    CREATE TABLE nla_demo.orders (
        order_id            INTEGER        PRIMARY KEY,
        customer_id         INTEGER        REFERENCES nla_demo.customers(customer_id),
        order_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
        total_amount        DECIMAL(10, 2) NOT NULL,
        shipping_address_id INTEGER        REFERENCES nla_demo.addresses(address_id),
        billing_address_id  INTEGER        REFERENCES nla_demo.addresses(address_id),
        order_status        VARCHAR(50)
    );
    ```
    
8.  Create the `order_items` table. This table records individual items in an order, links to the order and product variant, and specifies quantity and price.
    
    ```
    CREATE TABLE nla_demo.order_items (
        order_item_id   SERIAL         PRIMARY KEY,
        order_id        INTEGER        REFERENCES nla_demo.orders(order_id),
        product_id      INTEGER        REFERENCES nla_demo.products(product_id),
        quantity        INTEGER        NOT NULL,
        price           DECIMAL(10, 2) NOT NULL
    );
    ```
    

## Populate tables in the nla\_demo schema

1.  Populate the `addresses` table by running the following query:
    
    ```
    INSERT INTO nla_demo.addresses (street_address, city, country)
    VALUES
        ('1800 Amphibious Blvd', 'Mountain View', 'USA'),
        ('Avenida da Pastelaria, 1903', 'Lisbon', 'Portugal'),
        ('8 Rue du Nom Fictif 341', 'Paris', 'France');
    ```
    
2.  Populate the `customers` table.
    
    ```
    INSERT INTO nla_demo.customers (first_name, last_name, email, address_id, date_of_birth)
    VALUES
        ('Alex', 'B.', 'alex.b@example.com', 1, '2003-02-20'),
        ('Amal', 'M.', 'amal.m@example.com', 2, '1998-11-08'),
        ('Dani', 'G.', 'dani.g@example.com', 3, '2002-07-25');
    ```
    
3.  Populate the `categories` table.
    
    ```
    INSERT INTO nla_demo.categories (category_id, category_name)
    VALUES
        (1, 'Accessories'),
        (2, 'Apparel'),
        (3, 'Footwear'),
        (4, 'Swimwear');
    ```
    
4.  Populate the `brands` table.
    
    ```
    INSERT INTO nla_demo.brands (brand_id, brand_name)
    VALUES
        (1, 'CymbalPrime'),
        (2, 'CymbalPro'),
        (3, 'CymbalSports');
    ```
    
5.  Populate the `products` table.
    
    ```
    INSERT INTO nla_demo.products (product_id, brand_id, category_id, name, description, price)
    VALUES
        (1, 1, 2, 'Hoodie', 'A comfortable, casual sweatshirt with an attached hood.', 79.99),
        (2, 1, 3, 'Running Shoes', 'Lightweight, cushioned footwear designed for the impact of running.', 99.99),
        (3, 2, 4, 'Swimsuit', 'A garment designed for swimming or other water activities.', 20.00),
        (4, 3, 1, 'Tote Bag', 'A large, unfastened bag with two parallel handles.', 69.99),
        (5, 3, 3, 'CymbalShoe', 'Footwear from Cymbal, designed for your life''s rhythm.', 89.99);
    
    UPDATE nla_demo.products SET description_embedding = embedding('text-embedding-004', description);
    ```
    
6.  Populate the `orders` table.
    
    ```
    INSERT INTO nla_demo.orders (order_id, customer_id, total_amount, shipping_address_id, billing_address_id, order_status)
    VALUES
        (1, 1, 99.99, 1, 1, 'Shipped'),
        (2, 1, 69.99, 1, 1, 'Delivered'),
        (3, 2, 20.99, 2, 2, 'Processing'),
        (4, 3, 79.99, 3, 3, 'Shipped');
    ```
    
7.  Populate the `order_items` table.
    
    ```
    INSERT INTO nla_demo.order_items (order_id, product_id, quantity, price)
    VALUES
        (1, 1, 1, 79.99),
        (1, 3, 1, 20.00),
        (2, 4, 1, 69.99),
        (3, 3, 1, 20.00),
        (4, 2, 1, 79.99);
    ```
    

## Create a natural language configuration

To use AlloyDB AI natural language, make sure that the [Agent Platform endpoint is configured](/alloydb/docs/ai/register-model-endpoint). Then you create a configuration and register a schema. `g_alloydb_ai_nl.g_create_configuration` creates the model.

1.  Create a natural language configuration.
    
    ```
    SELECT alloydb_ai_nl.g_create_configuration( 'nla_demo_cfg' );
    ```
    
2.  Register tables to the `nla_demo_cfg` config.
    
    ```
    SELECT alloydb_ai_nl.g_manage_configuration(
        operation => 'register_table_view',
        configuration_id_in => 'nla_demo_cfg',
        table_views_in=>'{nla_demo.customers, nla_demo.addresses, nla_demo.brands, nla_demo.products, nla_demo.categories, nla_demo.orders, nla_demo.order_items}'
    );
    ```
    

## Create and apply context for tables and columns

To provide accurate answers to natural language questions, you use the AlloyDB AI natural language API to provide context about tables, views, and columns. You can use the automated context generation feature of the AlloyDB AI natural language API to produce context from tables and columns, and apply the context as `COMMENTS` attached to tables, views, and columns.

1.  To generate schema contexts for the tables and their columns that are registered in the `nla_demo_cfg` configuration, run the following:
    
    ```
    SELECT alloydb_ai_nl.generate_schema_context(
      'nla_demo_cfg',
      TRUE
    );
    ```
    
    The preceding query populates the `alloydb_ai_nl.generated_schema_context_view` view with context. Passing `TRUE` overwrites the context in this view from previous runs.
    
2.  To verify the generated context for the `nla_demo.products` table, run the following query:
    
    ```
    SELECT object_context
    FROM alloydb_ai_nl.generated_schema_context_view
    WHERE schema_object = 'nla_demo.products';
    ```
    
    The resulting context is similar to the following:
    
    ```
    The products table stores information about products, including their name,
    a brief description, the brand they belong to (referenced by brand_id),
    and the category they fall under (referenced by category_id). Each product
    has a unique identifier (product_id) and a timestamp indicating its creation
    time (created_at).
    ```
    
3.  To verify the produced context for a column, such as `nla_demo.products.name`, run the following:
    
    ```
    SELECT object_context
    FROM alloydb_ai_nl.generated_schema_context_view
    WHERE schema_object = 'nla_demo.products.name';
    ```
    
    The query output is similar to the following:
    
    ```
    The name column in the nla_demo.products table contains the specific
    name or title of each product. This is a short, descriptive text string
    that clearly identifies the product, like "Hoodie," "Tote Bag,"
    "Running Shoes," or "Swimsuit." It helps distinguish individual products
    within the broader context of their brand and category. The name column
    specifies the exact product. This column is essential for users and
    systems to identify and refer to specific products within the database.
    ```
    
4.  Review the generated context in the `alloydb_ai_nl.generated_schema_context_view` view, and update the context that needs revision.
    
    ```
    SELECT alloydb_ai_nl.update_generated_relation_context(
      'nla_demo.products',
      'The "nla_demo.products" table stores product details such as ID, name, description, brand, category linkage, and record creation time.'
    );
    
    SELECT alloydb_ai_nl.update_generated_column_context(
      'nla_demo.products.name',
      'The "name" column in the "nla_demo.products" table contains the specific name or title of each product.'
    );
    ```
    
5.  Apply the generated context that you want to attach to the corresponding objects:
    
    ```
    SELECT alloydb_ai_nl.apply_generated_relation_context(
      'nla_demo.products', true
    );
    
    SELECT alloydb_ai_nl.apply_generated_column_context(
      'nla_demo.products.name',
      true
    );
    ```
    
    The resulting context entries in the `alloydb_ai_nl.generated_schema_context_view` view are applied to the corresponding schema objects, and the comments are overwritten.
    
6.  Apply the generated schema context.
    
    ```
    SELECT alloydb_ai_nl.apply_generated_schema_context(
      'nla_demo_cfg',
      TRUE);
    ```
    
    Passing `TRUE` overwrites existing context for objects registered to 'nla\_demo\_cfg'.
    

## Construct the value index

The AlloyDB AI natural language API produces accurate SQL queries by using value linking. Value linking associates value phrases in natural language statements with pre-registered concept types and column names which can enrich the natural language question.

For example, the question "Give me the price of a Hoodie" can be answered more accurately if `Hoodie` is associated with a `product_name` concept, which is associated with the `nla_demo.products.name`. column.

1.  To define the `product_name` concept type and associate it with the `nla_demo.products.name` column, run the following queries:
    
    ```
    SELECT alloydb_ai_nl.add_concept_type(
        concept_type_in => 'product_name',
        match_function_in => 'alloydb_ai_nl.get_concept_and_value_generic_entity_name',
        additional_info_in => '{
          "description": "Concept type for product name.",
          "examples": "SELECT alloydb_ai_nl.get_concept_and_value_generic_entity_name(''Hoodie'')" }'::jsonb
    );
    SELECT alloydb_ai_nl.associate_concept_type(
        'nla_demo.products.name',
        'product_name',
        'nla_demo_cfg'
    );
    ```
    
2.  To verify that the `product_name` concept type is added to the list of concept types, run the following query to make sure that `product_name` is included in the result of this query:
    
    ```
    SELECT alloydb_ai_nl.list_concept_types();
    ```
    
3.  To verify that the `nla_demo.products.name` column is associated with the `product_name` concept type, run the following query:
    
    ```
    SELECT *
    FROM alloydb_ai_nl.value_index_columns
    WHERE column_names = 'nla_demo.products.name';
    ```
    
4.  To define the `brand_name` concept type and associate it with the `nla_demo.brands.brand_name` column, run the following queries:
    
    ```
    SELECT alloydb_ai_nl.add_concept_type(
        concept_type_in => 'brand_name',
        match_function_in => 'alloydb_ai_nl.get_concept_and_value_generic_entity_name',
        additional_info_in => '{
          "description": "Concept type for brand name.",
          "examples": "SELECT alloydb_ai_nl.get_concept_and_value_generic_entity_name(''CymbalPrime'')" }'::jsonb
    );
    SELECT alloydb_ai_nl.associate_concept_type(
        'nla_demo.brands.brand_name',
        'brand_name',
        'nla_demo_cfg'
    );
    ```
    
5.  After you define the concept types and associate columns with them, create a value index.
    
    ```
    SELECT alloydb_ai_nl.create_value_index('nla_demo_cfg');
    SELECT alloydb_ai_nl.refresh_value_index('nla_demo_cfg');
    ```
    

### Autogenerate concept type associations

Using AlloyDB AI natural language, you can autogenerate associations based on the existing concept types, instead of having to manually associate a concept type with columns—for example, manually calling `alloydb_ai_nl.associate_concept_type`.

To autogenerate a concept type association, follow these steps:

1.  Generate associations for all relations within the scope of `nla_demo_cfg`:
    
    ```
    SELECT alloydb_ai_nl.generate_concept_type_associations('nla_demo_cfg');
    ```
    
2.  Review the generated associations.
    
    ```
    SELECT * from alloydb_ai_nl.generated_value_index_columns_view;
    ```
    
    The result is similar to the following. Built-in concepts are considered as well as user-defined concepts.
    
     ```
     -[ RECORD 1 ]---+-----------------------------------------------------------
     id              | 1
     config          | nla_demo_cfg
     column_names    | nla_demo.addresses.city
     concept_type    | city_name
     additional_info | {}
     -[ RECORD 2 ]---+-----------------------------------------------------------
     id              | 2
     config          | nla_demo_cfg
     column_names    | nla_demo.addresses.country
     concept_type    | country_name
     additional_info | {}
     -[ RECORD 3 ]---+-----------------------------------------------------------
     id              | 3
     config          | nla_demo_cfg
     column_names    | nla_demo.customers.first_name,nla_demo.customers.last_name
     concept_type    | full_person_name
     additional_info | {}
     -[ RECORD 4 ]---+-----------------------------------------------------------
     id              | 4
     config          | nla_demo_cfg
     column_names    | nla_demo.brands.brand_name
     concept_type    | brand_name
     additional_info | {}
     -[ RECORD 5 ]---+-----------------------------------------------------------
     id              | 5
     config          | nla_demo_cfg
     column_names    | nla_demo.products.name
     concept_type    | product_name
     additional_info | {}
    
     ....
     ```
    ```
    
3.  Optional: Update or drop the generated associations.
    
    ```
    -- Update, NULL means keeping the original value.
    SELECT alloydb_ai_nl.update_generated_concept_type_associations(
     id => 1,
     column_names => NULL,
     concept_type => 'generic_entity_name',
     additional_info => NULL
    );
    
    -- Drop
    SELECT alloydb_ai_nl.drop_generated_concept_type_association(id => 1);
    ```
    
4.  Apply the generated associations.
    
    ```
    SELECT alloydb_ai_nl.apply_generated_concept_type_associations('nla_demo_cfg');
    ```
    
5.  To reflect the changes, refresh the value index.
    
    ```
    SELECT alloydb_ai_nl.refresh_value_index('nla_demo_cfg');
    ```
    

## Define query templates

You can define templates to improve the quality of the answers produced by the AlloyDB AI natural language API.

1.  To provide example templates for business critical questions, and to provide anticipated questions for which high accuracy is expected, run the following query to add a template:
    
    ```
    SELECT alloydb_ai_nl.add_template(
        nl_config_id => 'nla_demo_cfg',
        intent => 'List the first names and the last names of all customers who ordered Swimsuit.',
        sql => 'SELECT c.first_name, c.last_name FROM nla_demo.Customers c JOIN nla_demo.orders o ON c.customer_id = o.customer_id JOIN nla_demo.order_items oi ON o.order_id = oi.order_id JOIN nla_demo.products p ON oi.product_id = p.product_id  AND p.name = ''Swimsuit''',
        sql_explanation => 'To answer this question, JOIN `nla_demo.Customers` with `nla_demo.orders` on having the same `customer_id`, and JOIN the result with nla_demo.order_items on having the same `order_id`. Then JOIN the result with `nla_demo.products` on having the same `product_id`, and filter rwos that with p.name = ''Swimsuit''. Return the `first_name` and the `last_name` of the customers with matching records.',
        check_intent => TRUE
    );
    ```
    
2.  To view the list of added templates, query the view `alloydb_ai_nl.template_store_view`:
    
    ```
    SELECT nl, sql, intent, psql, pintent
    FROM alloydb_ai_nl.template_store_view
    WHERE config = 'nla_demo_cfg';
    ```
    
    The following output is returned:
    
    ```
    nl      | List the first names and the last names of all customers who ordered Swimsuit.
    sql     | SELECT c.first_name, c.last_name
            | FROM nla_demo.Customers c
            | JOIN nla_demo.orders o ON c.customer_id = o.customer_id
            | JOIN nla_demo.order_items oi ON o.order_id = oi.order_id
            | JOIN nla_demo.products p ON oi.product_id = p.product_id
            | AND p.name = 'Swimsuit'
    intent  | List the first names and the last names of all customers who ordered
            | Swimsuit.
    psql    | SELECT c.first_name, c.last_name
            | FROM nla_demo.Customers c JOIN nla_demo.orders o
            | ON c.customer_id = o.customer_id 
            | JOIN nla_demo.order_items oi ON o.order_id = oi.order_id
            | JOIN nla_demo.products p ON oi.product_id = p.product_id
            | AND p.name = $1
    pintent | List the first names and the last names of all customers who ordered
            | $1.
    ```
    
    In this template, the value corresponding to the `psql` attribute is the parameterized SQL query, and the value for the `pintent` column is the parameterized intent statement. The ID of a recently added template can be different, based on the templates that you added previously. Templates provide highly accurate answers to questions.
    
3.  To create a template that uses semantic search, run the following example statement:
    
    ```
    SELECT alloydb_ai_nl.add_template(
     nl_config_id => 'nla_demo_cfg',
     intent => 'List 3 products most similar to a Swimwear.',
     sql => $$SELECT name FROM nla_demo.products 
             ORDER BY description_embedding <=> embedding('text-embedding-004', 'Swimwear')::vector$$,
     sql_explanation => $$To answer this question, ORDER products in `nla_demo.products` , based by their distance of the descrption_embedding of the product with the embedding of 'Swimwear'.$$,
     check_intent => TRUE
    );
    ```
    
    The preceding template adds the following row to the view `alloydb_ai_nl.template_store_view`:
    
    ```
    nl      | List 3 products most similar to a Swimwear.
    sql     | SELECT name FROM nla_demo.products                                                                
            | ORDER BY description_embedding <=>
            | embedding('text-embedding-004', 'Swimwear')::vector
    intent  | List 3 products most similar to a Swimwear.
    psql    | SELECT name FROM nla_demo.products                                                                
            | ORDER BY description_embedding <=>
            | embedding('text-embedding-004', $1)::vector
    pintent | List 3 products most similar to a $1.
    ```
    

### Define a query fragment

You can define fragments to improve the quality of the answers produced by the AlloyDB AI natural language API.

To provide a fragment for business critical predicates, and to provide anticipated conditions for which high accuracy is expected, run the following query:

```
SELECT alloydb_ai_nl.add_fragment(
  nl_config_id => 'nla_demo_cfg',
  table_aliases => ARRAY['nla_demo.products AS T'],
  intent => 'luxury product',
  fragment => $$description LIKE '%luxury%' OR description LIKE '%premium%' OR description LIKE '%exclusive%' OR description LIKE '%high-end%' OR description LIKE '%finest%' OR description LIKE '%elite%' OR description LIKE '%deluxe%'$$);
```

To view the list of added fragments, query the view `alloydb_ai_nl.fragment_store_view`:

```
SELECT intent, fragment, pintent
FROM alloydb_ai_nl.fragment_store_view;
```

The following output is returned:

```
intent    | luxury product
fragment  | description LIKE '%luxury%' OR description LIKE '%premium%' OR description LIKE '%exclusive%' OR description LIKE '%high-end%' OR description LIKE '%finest%' OR description LIKE '%elite%' OR description LIKE '%deluxe%'
pintent   | luxury product
```

## Generate SQL results from natural language questions

1.  To use the AlloyDB AI natural language API to produce SQL queries and result sets, run the following query:
    
    ```
    SELECT
        alloydb_ai_nl.get_sql(
            'nla_demo_cfg',
            'Find the customers who purchased Tote Bag.'
        ) ->> 'sql';
    ```
    
    The following output is returned:
    
    ```
    SELECT DISTINCT "c"."first_name", "c"."last_name"
    FROM "nla_demo"."customers" AS "c"
    JOIN "nla_demo"."orders" AS "o" ON "c"."customer_id" = "o"."customer_id"
    JOIN "nla_demo"."order_items" AS "oi" ON "o"."order_id" = "oi"."order_id"
    JOIN "nla_demo"."products" AS "p" ON "oi"."product_id" = "p"."product_id"
    WHERE "p"."name" = 'Tote Bag';
    ```
    
    The JSON output is a SQL query using the template that you added in [Define a query template](#query-template).
    
2.  To use the AlloyDB AI natural language API to produce SQL queries, run the following query:
    
    ```
    SELECT
        alloydb_ai_nl.get_sql(
            'nla_demo_cfg',
            'List the maximum price of any CymbalShoe.'
        ) ->> 'sql';
    ```
    
    The following output is returned:
    
    ```
    SELECT max("price")
    FROM "nla_demo"."products"
    WHERE "name" = 'CymbalShoe'
    ```
    
    AlloyDB AI natural language API recognizes that `CymbalShoe` is the name of the product, by using the value index. Run the following query to replace `CymbalShoe` with a brand name (`CymbalPrime`):
    
    ```
    SELECT
        alloydb_ai_nl.get_sql(
            'nla_demo_cfg',
            'List the maximum price of any CymbalPrime.'
        ) ->> 'sql';
    ```
    
    The following output is produced:
    
    ```
    SELECT max("price")
    FROM "nla_demo"."products" AS t1
    JOIN "nla_demo"."brands" AS t2
    ON t1."brand_id" = t2."brand_id"
    WHERE t2."brand_name" = 'CymbalPrime';
    ```
    
    AlloyDB AI uses the value index created in [Construct the value index](#value-index) to resolve `CymbalPrime` into the `brand_name` concept type, and uses the `nla_demo.brands.brand_name` column associated to the `brand_name`.
    
3.  To use the AlloyDB AI natural language API to produce the result of a question, run the following query:
    
    ```
    SELECT
    alloydb_ai_nl.execute_nl_query(
        'nla_demo_cfg',
        'Find the last name of the customers who live in Lisbon.'
    );
    ```
    
    The following output is returned:
    
    ```
    execute_nl_query     
    --------------------------
    {"last_name":"M."}
    ```
    
4.  To use the AlloyDB AI natural language API to produce SQL statements that use semantic search, run the following query:
    
    ```
    SELECT
     alloydb_ai_nl.get_sql(
         'nla_demo_cfg',
         'List 2 products similar to a Tote Bag.');
    ```
    
    The following SQL statement is returned:
    
    ```
    SELECT name FROM nla_demo.products
    ORDER BY description_embedding <=> embedding(
        'text-embedding-004', 'Tote Bag')::vector
    LIMIT 2;
    ```
    

## Get SQL summaries

You can produce a result summary from a natural language question based on the data that's stored in the database. This helps end users understand data by posing natural language questions directly.

To get a SQL summary, run the following example query:

```
SELECT
   alloydb_ai_nl.get_sql_summary(
      nl_config_id => 'nla_demo_cfg',
      nl_question => 'which brands have the largest number of products.'
);
```

This query returns a JSON object as output, similar to the following:

   ```
   "answer": "The result set lists three brands: CymbalSports, CymbalPro, and CymbalPrime. Each brand is represented once, suggesting an equal distribution of products across these three brands within the dataset."
```

## Clean up

To avoid incurring charges to your Google Cloud account for the resources used in this tutorial, either delete the project that contains the resources, or keep the project and delete the individual resources.

The following sections describe how to delete these resources and objects.

### Delete the cluster

When you delete the cluster that you created in [Before you begin](#create-and-connect-to-database), all of the objects that you created are also deleted.

1.  In the Google Cloud console, go to the **Clusters** page.
    
    [Go to Clusters](https://console.cloud.google.com/alloydb/clusters)
    
2.  Click the name of your cluster, `my-cluster`, in the **Resource name** column.
    
3.  Click _delete_ **Delete cluster**.
    
4.  In **Delete cluster my-cluster**, enter `my-cluster` to confirm you want to delete your cluster.
    
5.  Click **Delete**.
    
6.  If you created a private connection when you [created a cluster](#create-and-connect-to-database), go to the Google Cloud console [VPC networks page](https://console.cloud.google.com/networking/networks/details/default) and click **Delete VPC network**.
    

### Delete the objects

You can choose to keep the resources that you set up in [Before you begin](#create-and-connect-to-database), and you can delete just the objects that you created in the Google Cloud project.

1.  To remove the template that you defined in [Define a query template](#query-template), run the following query:
    
    ```
    SELECT alloydb_ai_nl.drop_template(id)
    FROM alloydb_ai_nl.template_store_view
    WHERE config = 'nla_demo_cfg';
    ```
    
2.  To remove the autogenerated concept associations generated in [Autogenerate concept type associations](#autogenerate-concept-type-associations), run the following query:
    
    ```
    SELECT alloydb_ai_nl.drop_generated_concept_type_association(id)
    FROM alloydb_ai_nl.generated_value_index_columns_view
    WHERE config = 'nla_demo_cfg';
    ```
    
3.  To remove the `product_name` concept type that you defined in [Construct the value index](#value-index), run the following query:
    
    ```
    SELECT alloydb_ai_nl.drop_concept_type('product_name');
    ```
    
4.  To refresh the value index after you remove the `product_name` concept type, run the following query:
    
    ```
    SELECT alloydb_ai_nl.refresh_value_index();
    ```
    
5.  To remove the `nla_demo_cfg` configuration that you created in [Create a natural language configuration](#create-config), run the following query:
    
    ```
    SELECT
    alloydb_ai_nl.g_manage_configuration(
        'drop_configuration',
        'nla_demo_cfg'
    );
    ```
    
6.  To remove the nla\_demo schema and tables that you created and populated in [Create the `nla_demo` schema and tables](#create-schema) and [Populate tables in the `nla_demo` schema](#populate-tables), run the following query:
    
    ```
    DROP SCHEMA nla_demo CASCADE;
    ```
    

## What's next

-   Learn about [AlloyDB AI natural language use cases and key capabilities](/alloydb/docs/ai/natural-language-overview).
-   [Generate SQL queries that answer natural language questions](/alloydb/docs/ai/generate-sql-queries-natural-language).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-16 UTC.