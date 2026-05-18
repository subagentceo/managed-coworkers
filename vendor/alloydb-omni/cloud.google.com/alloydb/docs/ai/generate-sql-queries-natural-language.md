-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Generate SQL queries using natural language questions Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

**Note:** This experimental launch is a Pre-GA offering.

This page describes how to set up, configure, and generate SQL statements using AlloyDB AI natural language. Natural language lets you create user-facing generative AI applications using natural language to query databases.

To enable the `alloydb_ai_nl` extension, which is the AlloyDB for PostgreSQL natural language support API, you perform the following high-level steps:

1.  Install the `alloydb_ai_nl` extension.
2.  Define a natural language configuration for your application.
3.  Register a schema.
4.  Add context.
5.  Add query templates.
6.  Define concept types and create a value index.
7.  Generate SQL statements using a natural language interface.

**Note:** To provide feedback about your experiences using AlloyDB AI natural language, [submit the User Experience Research: AlloyDB AI Natural Language form](https://docs.google.com/forms/d/e/1FAIpQLSfksRzklOU_T1aMVbI0tb0O5ZNpnone7XiD_KCBW2GWHo9uqA/viewform).

## Before you begin

-   Understand how to connect to the AlloyDB database and run PostgreSQL commands. For more information, see [Connection overview](/alloydb/docs/connection-overview) and [Choose how to connect to AlloyDB](/alloydb/docs/choose-alloydb-connectivity).
-   Populate the database with the data and schema that the end user wants to access.

### Enable the required extension

Before you can install and use AlloyDB AI natural language, you must enable the extension by adding the `alloydb_ai_nl.enabled` flag.

Since AlloyDB AI natural language objects created on the primary instance are propagated to read-only replicas and cross-region replicas, ensure that you enable the AlloyDB AI natural language flag on every instance of AlloyDB for PostgreSQL. For more information, see [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags).

### Create a cluster and enable Gemini Enterprise Agent Platform integration

1.  [Create an AlloyDB cluster and instance](/alloydb/docs/cluster-create). You use the AlloyDB instance to create the application database and the schema.
2.  Enable Agent Platform integration. For more information, see [Integrate with Agent Platform](/alloydb/docs/ai/configure-vertex-ai).

### Required roles

To install the `alloydb_ai_nl` extension and grant access to other users, you must have the following Identity and Access Management (IAM) role in the Google Cloud project that you're using:

-   [`roles/alloydb.admin`](/alloydb/docs/reference/iam-roles-permissions) (the AlloyDB Admin predefined IAM role)

For more information, see [Manage PostgreSQL users with standard authentication](/alloydb/docs/database-users/manage-roles#predefined-role).

## Prepare your environment

To prepare to generate natural language queries, you must install the required extension, create a configuration, and register a schema.

### Install the `alloydb_ai_nl` extension

The `alloydb_ai_nl` extension uses the `google_ml_integration` extension, which interacts with large language models (LLM), including Gemini models on Agent Platform.

To install the `alloydb_ai_nl` extension, connect to the database and run the following command:

```
CREATE EXTENSION alloydb_ai_nl cascade;
```

### Upgrade the `alloydb_ai_nl` extension

Make sure that you have the latest version of the `alloydb_ai_nl` extension. If you already installed the extension, check if there is a new extension version available, and upgrade the extension if you aren't using the latest version. For more information about the `alloydb_ai_nl` extension, see the [AlloyDB AI natural language overview](/alloydb/docs/ai/natural-language-overview).

1.  Determine if you need to upgrade the extension. If the `default_version` is later than the `installed_version`, upgrade the extension.
    
    ```
    SELECT * FROM pg_available_extensions where name = 'alloydb_ai_nl';
    ```
    
2.  Upgrade the extension.
    
    ```
    ALTER EXTENSION alloydb_ai_nl UPDATE;
    ```
    

### Create a natural language configuration and register a schema

AlloyDB AI natural language uses `nl_config` to associate applications to certain schemas, query templates, and model endpoints. `nl_config` is a configuration that associates an application to schema, templates, and other contexts. A large application can also use different configurations for different parts of the application, as long as you specify the right configuration when a question is sent from that part of the application. You can register an entire schema, or you can register specific schema objects, like tables, views, and columns.

1.  To create a natural language configuration, use the following example:
    
    ```
    SELECT
      alloydb_ai_nl.g_create_configuration(
        'my_app_config'        -- configuration_id
      );
    ```
    
    `gemini-2.0-flash:generateContent` is the model endpoint.
    
2.  Register a schema for a specified configuration using the following example:
    
    ```
    SELECT
      alloydb_ai_nl.g_manage_configuration(
        operation => 'register_schema',
        configuration_id_in => 'my_app_config',
        schema_names_in => '{my_schema}'
      );
    ```
    

## Add context

_Context_ includes any kind of information that you can use to answer an end user question., such as the following:

-   Schema structure and relationships
-   Summaries and descriptions of columns
-   Column values and their semantics
-   Rules or statements of business logic specific to the application or domain

### Add general context for application-specific rules

General context items include application-specific rules, business logic statements, or any application- and domain-specific terminology that isn't linked to a specific schema object.

To add general context for application-specific rules and application or domain-specific terminology, follow these steps:

1.  To add a general context item for the specified configuration, run the following query:
    
    ```
    SELECT
      alloydb_ai_nl.g_manage_configuration(
        'add_general_context',
        'my_app_config',
        general_context_in => '{"If the user asks for a good seat, assume that means a window or aisle seat."}'
      );
    ```
    
    The preceding statement helps AlloyDB AI natural language provide higher quality responses to users' natural language questions.
    
2.  To view the general contexts for the specified configuration, run the following query:
    
    ```
    SELECT alloydb_ai_nl.list_general_context(nl_config TEXT);
    ```
    

### Generate and review schema context

Schema context describes schema objects including tables, views, materialized views, and columns. This context is stored as the `COMMENT` of each schema object.

1.  To generate contexts for schema objects, call the following APIs. For best results, make sure that the database tables contain representative data.
    
    ```
    -- For all schema objects (tables, views, materialized views and columns)
    -- within the scope of a provided nl_config.
    SELECT
      alloydb_ai_nl.generate_schema_context(
        'my_app_config' -- nl_config
      );
    ```
    
2.  Review the generated schema contexts by running the following query:
    
    ```
    SELECT schema_object, object_context
    FROM alloydb_ai_nl.generated_schema_context_view;
    ```
    
    The generated schema contexts are stored in the preceding view.
    
3.  Optional: Update the generated schema contexts.
    
    ```
    SELECT
      alloydb_ai_nl.update_generated_relation_context(
        'my_schema.my_table',
        'This table contains archival records, if you need latest records use records_new table.'
      );
    
    SELECT
      alloydb_ai_nl.update_generated_column_context(
        'my_schema.my_table.column1',
        'The seat_class column takes single letters like "E" for economy, "P" for premium economy, "B" for business and "F" for First.'
      );
    ```
    
4.  Apply the context. When you apply the context, the context takes effect immediately and is deleted from the view `generated_schema_context_view`.
    
    ```
    -- For all schema objects (tables, views, materialized views and columns)
    -- within the scope of nl_config.
    SELECT
      alloydb_ai_nl.apply_generated_schema_context(
        'my_app_config' --nl_config
      );
    ```
    
5.  Optional: Verify the generated context. The following API lets you check the schema contexts, which are used when you generate SQL statements.
    
    ```
    -- For table, view or materialized view.
    SELECT
      alloydb_ai_nl.get_relation_context(
        'my_schema.my_table'
      );
    
    -- For column.
    SELECT
      alloydb_ai_nl.get_column_context(
        'my_schema.my_table.column1'
      );
    ```
    
6.  Apply the generated schema context.
    
    ```
    SELECT alloydb_ai_nl.apply_generated_schema_context(
      'nla_demo_cfg',
      TRUE);
    ```
    
    Passing `TRUE` overwrites existing context for objects registered to 'nla\_demo\_cfg'.
    
7.  Optional: Manually set the schema context.
    
    ```
    -- For table, view or materialized view.
    SELECT
      alloydb_ai_nl.set_relation_context(
        'my_schema.my_table',
        'One-to-many mapping from product to categories'
      );
    
    -- For column.
    SELECT
      alloydb_ai_nl.set_column_context(
        'my_schema.my_table.column1',
        'This column provides additional tagged info for the product in  Json format, e.g., additional color or size information of the product - tags: { "color": "red", "size": "XL"}'
      );
    ```
    

## Create query templates

To enhance the quality of generative AI applications built with LLMs, you can add templates. A _query template_ is a curated set of representative or common natural language questions, with corresponding SQL queries, as well as explanations to provide a declarative rationale for the natural language-to-SQL (NL2SQL) generation. Templates are primarily intended to be specified by the application, but templates can also be automatically generated by the `alloydb_ai_nl` extension based on frequently used SQL queries. Each template must be associated with an `nl_config`.

The `alloydb_ai_nl` extension uses a `template_store` to dynamically incorporate relevant SQL templates in the process of generating a SQL statement to answer the end user's question. The `template_store` does the following:

-   Identifies templates with similar intentions to the natural language question that the end user asked.
-   Identifies the corresponding parameterized SQL statement.
-   Synthesizes a SQL statement by instantiating parameters with values from the natural language question.

If there isn't a template with the same intention as the question that the end user asked, `alloydb_ai_nl` uses every relevant template and context to compose a SQL statement.

## Add a template to the template store

You add templates by specifying the question—using a parameter named `intent`—and the SQL query.

To add a template to the template store, run the following query:

```
SELECT
  alloydb_ai_nl.add_template(
    nl_config_id => 'my_app_config',
    intent => 'How many accounts associated with loans are located in the Prague region?',
    sql => 'SELECT COUNT(T1.account_id)
            FROM bird_dev_financial.account AS T1
            INNER JOIN bird_dev_financial.loan AS T2
              ON T1.account_id = T2.account_id
            INNER JOIN bird_dev_financial.district AS T3
              ON T1.district_id = T3.district_id
            WHERE T3."A3" = ''Prague''',
    check_intent => TRUE
  );
```

When `check_intent` is `TRUE`, `alloydb_ai_nl` performs a semantic check to confirm that the provided intent matches the passed-in SQL statement. If the intent doesn't match the SQL statement, the template isn't added.

The SQL and intent are parameterized by `alloydb_ai_nl`. The `alloydb_ai_nl.template_store_view` view exposes the parameterized SQL statements and their intents.

```
SELECT psql
FROM alloydb_ai_nl.template_store_view
WHERE intent = 'How many accounts associated with loans are located in the Prague region?';
```

This statement returns the following:

```
SELECT COUNT(T1.account_id)
FROM account AS T1 INNER JOIN loan AS T2
  ON T1.account_id = T2.account_id
INNER JOIN district AS T3
  ON T1.district_id = T3.district_id WHERE T3."A3" = $1
```

#### Provide a customized parameterization

To provide a customized parameterization for a SQL statement using the manual interface of the `add_template` function, run the statement in the following example:

```
SELECT
  alloydb_ai_nl.add_template(
     nl_config_id => 'my_app_config',
     intent => 'Among the accounts opened, how many customers born before 1950 resided in Slokolov at the time of account opening?',
     sql => $$SELECT COUNT(DISTINCT T2.client_id)
              FROM district AS T1 INNER JOIN client AS T2
                ON T1.district_id = T2.district_id
             INNER JOIN account AS T3 ON T2.client_id IN (
                   SELECT client_id FROM disp WHERE account_id = T3.account_id)
             WHERE to_char(T2.birth_date::timestamp, 'YYYY') < '1950'
               AND T1."A2" = 'Slokolov'$$,
  parameterized_sql => $$SELECT COUNT(DISTINCT T2.client_id)
                         FROM district AS T1 INNER JOIN client AS T2
                           ON T1.district_id = T2.district_id
                   INNER JOIN account AS T3 ON T2.client_id IN (
                         SELECT client_id FROM disp WHERE account_id = T3.account_id)
                   WHERE to_char(T2.birth_date::timestamp, 'YYYY') < $2
                     AND T1."A2" = $1$$,
  parameterized_intent => $$Among the accounts opened, how many customers born before $2 resided in $1 at the time of account opening?$$,
  manifest => $$Among the accounts opened, how many customers born before a given date resided in a given city at the time of account opening?$$,
  check_intent => TRUE);
```

In the preceding definition, the parameterization of the SQL statement is provided. The parameters are `$1` and `$2`, respectively, for `Slokolov` and `1950`. A manifest is provided as a generalized version of the intent, where the values of literals are replaced with generic descriptions of the values.

In this example, the value of `1950` in the intent is replaced with `a given date`, and the value of `Slokolov` is replaced in the manifest with `a given city`. When a `TRUE` value is provided for the optional argument `check_intent` , an LLM-based intent verification is performed during `add_template`. During this check, when the provided SQL statement doesn't capture the purpose and goal of the provided intent statement, `add_template` fails and the reason is provided as output.

In the following example, the purpose of the template—as indicated in the intent—is to retrieve the account ID of the accounts that are associated with the load and that are located in a region. The provided SQL statement returns the number of accounts, as opposed to the list of account IDs, as shown in the following example.

```
SELECT
  alloydb_ai_nl.add_template(
    nl_config_id => 'my_app_config',
    intent => 'List the account id for all accounts that associated with loans and are located in the Prague region.',
    sql => 'SELECT COUNT(T1.account_id)
            FROM account AS T1 INNER JOIN loan AS T2
              ON T1.account_id = T2.account_id
            INNER JOIN district AS T3
              ON T1.district_id = T3.district_id
            WHERE T3."A3" = ''Prague''',
    check_intent => TRUE
  );
```

When `check_intent` is set to `TRUE`, you can't add the preceding template to the template store. If you run the preceding statement, an error similar to the following is returned:

```
ERROR:  Checking intent failed, for nl_question:List the account id for all accounts that associated with loans and are located in the Prague region...reason:The SQL query only counts the number of account IDs, but the question asks for a list of the account IDs.
```

#### Manage templates

You can manage templates in the template store using the following APIs:

```
-- To disable a template:
SELECT alloydb_ai_nl.disable_template(INPUT template_id);

-- To enable a template which has been disabled:
SELECT alloydb_ai_nl.enable_template(INPUT template_id);

-- To permanently remove a template:
SELECT alloydb_ai_nl.drop_template(INPUT template_id);
```

When you create a template, it's enabled by default. A template which is disabled remains in the template store, but it isn't used by `alloydb_ai_nl` for query synthesizing. You can enable a disabled template using `alloydb_ai_nl.enable_template`. Running `alloydb_ai_nl.drop_template` permanently removes the template from the template store.

You can use `alloydb_ai_nl.template_store_view` to extract the `template_id` of a template, given its content. For example, to find the identifier of templates which has the intent `accounts that associated with loans`, run the following query, which returns a template identifier and identifies whether the template is enabled from `alloydb_ai_nl.template_store_view`:

```
SELECT id, enabled
FROM alloydb_ai_nl.template_store_view
WHERE intent ILIKE '%accounts that associated with loans%';
```

#### Update a template

When you use the templates in `alloydb_ai_nl.template_store_view`, make sure that the intent of every template is consistent with the following:

-   The SQL statement
-   The parameterized SQL statement
-   The parameterized intent
-   The manifest of the template

`alloydb_ai_nl` can retrieve relevant templates if the embedding maintained for templates corresponds with template contents.

To update a template, follow these steps:

1.  Identify the `template_id` using `alloydb_ai_nl.template_store_view`.
2.  Remove the template.
3.  Redefine the new template with the required modification using the `alloydb_ai_nl.add_template` function.

### Create query fragments

You can specialize templates at query time using fragments, which help query templates perform faceted search like natural language questions. A _fragment_ is a curated set of representative or common natural language conditions with corresponding SQL predicates. Fragments are intended to be specified by the application.

Each fragment must be associated with an `nl_config_id` and with an array of tables and views with aliases the fragment predicate applies to. You can verify the purpose of a fragment when the argument `check_intent` is set to `TRUE`. The `alloydb_ai_nl` extension can use a template with a combination of fragments to synthesize the answer to a natural language query.

The `alloydb_ai_nl` extension uses `fragment_store` to dynamically incorporate the conditions in relevant fragments in the process of generating a SQL statement to answer the end user's question. First, the `template_store` identifies templates with similar intentions to the natural language question that the end user asked. Next, the fragments that can provide specialization to identified templates are retrieved. Parameter replacement is applied to both templates and fragments to synthesize a SQL statement.

Parameter values are extracted from the natural language question and are replaced by the LLM using the patterns implied from relevant templates and fragments. However, if the combination of templates and fragments don't have the same purpose for the question that the end user asked, `alloydb_ai_nl` uses every relevant template and context to compose a SQL statement.

#### Add a fragment

To add a fragment, run the following example queries using the `alloydb_ai_nl.add_fragment` function. Each fragment must be associated with an `nl_config_id` identifier from the application.

```
-- A fragment that cannot be parameterized.
SELECT alloydb_ai_nl.add_fragment(
  nl_config_id => 'my_app_config',
  table_aliases => ARRAY['account AS T'],
  intent => 'Accounts with issuance after transaction',
  fragment => 'T.frequency = ''POPLATEK PO OBRATU''',
  check_intent => True);

-- A fragment that can be parameterized.
SELECT alloydb_ai_nl.add_fragment(
  nl_config_id => 'my_app_config',
  table_aliases => ARRAY['district AS T'],
  intent => 'Average salary between 6000 and 10000',
  fragment => 'T."A11" BETWEEN 6000 AND 10000',
  check_intent => True);
```

When the `alloydb_ai_nl.add_fragment` runs, the `alloydb_ai_nl` extension extracts a manifest from the provided intent, and the extension parameterizes the intent and the condition for the fragment, if possible. Available fragments are exposed by views like `alloydb_ai_nl.fragment_store_view`, as shown in the following example:

```
SELECT manifest, scope, fragment, intent, pfragment, pintent
FROM alloydb_ai_nl.fragment_store_view
WHERE intent = 'Average salary between 6000 and 10000';
```

The query returns a result set similar to the following:

```
manifest  | Average salary between a given number and a given number
scope     | district AS T
fragment  | T."A11" BETWEEN 6000 AND 10000
intent    | Average salary between 6000 and 10000
pfragment | T."A11" BETWEEN $2 AND $1
pintent   | Average salary between $2 and $1
```

A manifest in a fragment is generated automatically from the intent, and it represents a generalized version of the intent. For example, the numbers `6000` and `10000` in the intent are each replaced with `a given number` in the manifest. The numbers are replaced, respectively, with `$2` and `$1` in the `pfragment` and `pintent` columns. The columns `pfragment` and `pintent` in `alloydb_ai_nl.fragment_store_view` are, respectively, the parameterized representation for `fragment` and `intent`.

To provide a customized parameterization of a fragment, use the manual version of `alloydb_ai_nl.add_fragment`, as shown in the following example:

```
SELECT alloydb_ai_nl.add_fragment(
  nl_config_id => 'my_app_config',
  table_aliases => ARRAY['bird_dev_financial.district AS T'],
  intent => $$districts in 'Prague'$$,
  parameterized_intent => $$districts in $1$$,
  fragment => $$T."A3" = 'Prague'$$,
  parameterized_fragment => $$T."A3" = $1$$,
  manifest => $$districts in a given city$$,
  check_intent => TRUE);
```

#### Manage fragments

To manage fragments, use the following APIs:

```
-- To disable a fragment:
SELECT alloydb_ai_nl.disable_fragment(INPUT fragment_id);

-- To enable a fragment which has been disabled:
SELECT alloydb_ai_nl.enable_fragment(INPUT fragment_id);

-- To permanently remove a fragment:
SELECT alloydb_ai_nl.drop_fragment(INPUT fragment_id);
```

You can use the view `alloydb_ai_nl.fragment_store_view` to extract the `fragment_id` of a fragment, given its content. For example, to find the identifier of a fragment which has the intent `Average salary between 6000 and 10000`, run the following example query:

```
SELECT id
FROM alloydb_ai_nl.fragment_store_view
WHERE intent = "Average salary between 6000 and 10000";
```

#### Update a fragment

When you update a fragment, make sure that the fragment intent is consistent with the following:

-   The fragment's manifest and SQL statement
-   The parameterized SQL statement
-   The parameterized intent

To establish consistency when you update a fragment, follow these steps:

1.  Remove the fragment that you want to modify using the `alloydb_ai_nl.drop_fragment` function.
2.  Insert the updated fragment using the `alloydb_ai_nl.add_fragment` function.

### Autogenerate templates

After you have a representative dataset in your tables, we recommend that you run SQL queries that correspond to the common questions that your end users are likely to ask. Make sure that the queries have complete query plans and that they perform well.

After you run the queries, AlloyDB AI natural language can automatically generate templates based on the query history. You can call the following APIs to generate templates. You need to review and apply the generated templates before they take effect.

Template auto generation is based on the most frequently used queries in the query log, [`google_db_advisor_workload_statements`](/alloydb/docs/use-index-advisor#view-logs). The queries are filtered based on the following criteria:

-   `SELECT` statements
-   Executables: the query can be successfully processed by the `EXPLAIN` command.
-   No duplication: the query has not been previously used to generate templates.
-   All referred tables and views are within the scope of the `nl_config`.

To autogenerate, review, and apply templates, follow these steps:

1.  Request AlloyDB to generate templates based on your query history:
    
    ```
    SELECT
      alloydb_ai_nl.generate_templates(
        'my_app_config',
    );
    ```
    
    Use the provided view, `alloydb_ai_nl.generated_templates_view`, to review the `generated_templates`.
    
    The following output shows the number of generated templates:
    
    ```
    -[ RECORD 1 ]------+--
    generate_templates | 1
    ```
    
2.  Review the generated templates using the `generated_templates_view` view.
    
    ```
    SELECT *
    FROM alloydb_ai_nl.generated_templates_view;
    ```
    
    The following is an example of the returned output:
    
    ```
    -[ RECORD 1 ]----------------------------------------------------------------
    id          | 1
    config      | my_app_config
    type        | Template
    manifest    | How many clients have a birth year of a given number?
    nl          | How many clients have a birth year of 1997?
    sql         | select count(*) from public.client as T where
                 to_char(T.birth_date::timestamp, 'YYYY') = '1997';
    intent      | How many clients have a birth year of 1997?
    psql        | select count(*) from public.client as T where
                 to_char(T.birth_date::timestamp, 'YYYY') = $1;
    pintent     | How many clients have a birth year of $1?
    comment     |
    explanation |
    weight      | 1
    ```
    
    The `manifest` in the returned output is a general template or a broad description of the question type or the operation that can be performed. The `pintent` is a parameterized version of the `intent`, and it generalizes `intent` by replacing the specific value (`1997`) with a placeholder (`$1`).
    
3.  To update a generated template, run the following example statement:
    
    ```
    SELECT alloydb_ai_nl.update_generated_template(
      id => 1,
      manifest => 'How many clients are born in a given year?',
      nl => 'How many clients are born in 1997?',
      intent => 'How many clients are born in 1997?',
      pintent => 'How many clients are born in $1?'
    
    );
    ```
    
4.  Apply the templates. The templates that you apply are immediately added to the template store, and they are deleted from the review view.
    
    ```
    -- For all templates generated under the nl config.
    SELECT
      alloydb_ai_nl.apply_generated_templates('my_app_config');
    ```
    

## Configure security for natural language

To configure security for AlloyDB AI natural language, see [Manage data application security using parameterized secure views](/alloydb/docs/manage-application-data-security-parameterized-secure-views).

## Define concept types and value indexes

You define concept types and value indexes to provide a deeper understanding of questions being asked. A _concept type_ is a category or class of entities that identifies the semantic meaning of words and phrases, rather than just their literal form.

For example, two country names might be the same even if one country name is in upper case, for example, `USA`, and the other country name is in lower case, for example, `usa`. In this case, the country name is the concept type. Other examples of concept types include person name, city name, and date.

A _value index_ is an index on top of values in the columns that are part of the natural language configuration `nl_config`, based on the concept types associated with each column. A value index enables efficient matching of value phrases for the question being asked and values in the database.

To define concept types and a value index, follow these steps using the provided examples. The examples associate a column to a concept type, create and refresh a value index, and use a synonym set to perform a value search.

1.  To associate a column with a concept type, run the following query:
    
    ```
    SELECT
      alloydb_ai_nl.associate_concept_type(
        column_names_in => 'my_schema.country.country_name',
        concept_type_in => 'country_name',
        nl_config_id_in => 'my_app_config'
      );
    ```
    
2.  To create a value index based on all the columns that are part of a natural language config and are associated with a concept type, run the following statement:
    
    ```
    SELECT
      alloydb_ai_nl.create_value_index(
        nl_config_id_in => 'my_app_config'
      );
    ```
    
3.  When you associate concept types to new columns, refresh the value index to reflect the changes.
    
    ```
    SELECT
      alloydb_ai_nl.refresh_value_index(
        nl_config_id_in => 'my_app_config'
      );
    ```
    
4.  To enable AlloyDB AI natural language to match synonyms of a value, run the following example statement:
    
    ```
    SELECT
      alloydb_ai_nl.insert_synonym_set(
        ARRAY [
          'USA',
          'US',
          'United States',
          'United States of America'
        ]
      );
    ```
    
    Although the data in your tables might use a specific value—for example, if `United States` is used to identify a country—you can define a synonym set that contains all the synonyms for `United States`. If any of the synonyms appear in the natural language question, AlloyDB AI natural language matches the synonyms with the values in your tables.
    
5.  Perform a value search to find the correct database values, given an array of value phrases.
    
    ```
    SELECT
      alloydb_ai_nl.get_concept_and_value(
        value_phrases_in => ARRAY['United States'],
        nl_config_id_in  => 'my_app_config'
      );
    ```
    
    For example, if a user asks a question like "What is the population of the United States?" that uses the following `get_sql` query, AlloyDB AI natural language uses the `get_concept_and_value` function with the value phrase `United States` to perform a _fuzzy search_ against the value indexes. A _fuzzy search_ is a search technique that finds matches even when the search query doesn't exactly match corresponding data.
    
    Natural language finds a result—the value `USA`— that is close to the search query, and it uses that result to generate the SQL query.
    
    ```
    SELECT
      alloydb_ai_nl.get_sql(
        nl_config_id    => 'my_app_config',
        nl_question     => 'What is the population of the United States?',
        additional_info => json_build_object('enrich_nl_question', TRUE)
      ) ->> 'sql';
    ```
    
    Built-in concept types defined by AlloyDB AI natural language are listed in the following table.
    
     
    
    **Concept name**
    
    **Description**
    
    `generic_entity_name`
    
    A single string type column can be used for a generic entity name. For example:  
    
      SELECT alloydb\_ai\_nl.associate\_concept\_type('public.item.item\_name', 'generic\_entity\_name')
      
    
    `country_name`, `city_name`, `region_name`
    
    Names of countries, cities, and regions. The usage is exactly the same as the `generic_entity_name` concept type.
    
    `full_person_name`
    
    Name of the person, consisting of the first, last, and middle names. Up to three string type columns can be used for a full person name. Any of the columns can be skipped when associating name columns to the `full_person_name`. For example:  
    
      SELECT alloydb\_ai\_nl.associate\_concept\_type('public.person.last\_name,public.person.first\_name,public.person.middle\_name','full\_person\_name')
      
    
    `ssn`
    
    A single string column containing a social security number. For example:  
    
      SELECT alloydb\_ai\_nl.associate\_concept\_type('public.person.ssn','ssn')
     
    
    `date`
    
    A date or timestamp. For example:  
    
     SELECT alloydb\_ai\_nl.associate\_concept\_type('public.person.date\_col','date')
     
    

### Autogenerate concept type associations

To automatically associate columns with concept types, use the automated concept type association feature of the AlloyDB AI natural language API. A _concept type association_ defines the relationship between a concept type and one or more database columns, which is a prerequisite for creating value indexes.

To autogenerate concept type associations, follow these steps:

1.  To generate associations, call the following APIs.
    
    ```
    -- To cover all relations within the scope of a provided nl_config.
    SELECT alloydb_ai_nl.generate_concept_type_associations(
      nl_config => 'my_app_config'
    );
    
    -- To cover a specific relation.
    SELECT alloydb_ai_nl.generate_concept_type_associations(
      nl_config => 'my_app_config',
      relation_name => 'my_app_table'
    );
    ```
    
2.  Review the generated associations by running the following query.
    
    ```
    SELECT * FROM alloydb_ai_nl.generated_value_index_columns_view;
    ```
    
3.  Optional: Update the generated associations.
    
    ```
    -- NULL means keeping the original value.
    SELECT alloydb_ai_nl.update_generated_concept_type_associations(
      id => 1,
      column_names => NULL,
      concept_type => 'generic_entity_name',
      additional_info => NULL
    );
    ```
    
4.  Optional: Remove a generated association.
    
    ```
    SELECT alloydb_ai_nl.drop_generated_concept_type_association(id => 1);
    ```
    
5.  Apply the generated associations.
    
    ```
    -- To apply all associations under a nl config.
    SELECT alloydb_ai_nl.apply_generated_concept_type_associations(
      nl_config => 'my_app_config'
    );
    
    -- To apply a specific association by id.
    SELECT alloydb_ai_nl.apply_generated_concept_type_association(
      id => 1
    );
    ```
    
6.  Refresh the value index to reflect the changes.
    
    ```
    SELECT alloydb_ai_nl.refresh_value_index(
      nl_config_id_in => 'my_app_config'
    );
    ```
    

## Generate SQL statements from natural language inputs

You can use AlloyDB AI natural language to generate SQL statements from natural language inputs. When you run the generated SQL statement, it provides the data from the database that you need to answer the natural language question.

**Note:** To get SQL statements with the level of accuracy that you want, you must iterate the system configuration and tune context, query templates and value index.

1.  To use natural language to get results from your database using the `alloydb_ai_nl.get_sql` function, use the following example:
    
    ```
    SELECT
      alloydb_ai_nl.get_sql(
        'my_app_config', -- nl_config
        'What is the sum that client number 4''s account has following transaction 851?' -- nl question
      );
    ```
    
    The following JSON output is returned:
    
    ```
    {
      "sql": "SELECT T3.balance FROM public.client AS T1 INNER JOIN public.account AS T2 ON T1.district_id = T2.district_id INNER JOIN public.trans AS T3 ON T2.account_id = T3.account_id WHERE T1.client_id = 4 AND T3.trans_id = 851",
      "prompt": "",
      "retries": 0,
      "error_msg": "",
      "nl_question": "What is the sum that client number 4's account has following transaction 851?"
    }
    ```
    
2.  Optional: To extract the generated SQL query as a text string, add `->>'sql'`:
    
    ```
    SELECT
      alloydb_ai_nl.get_sql(
        'my_app_config', -- nl_config
        'What is the sum that client number 4''s account has following transaction 851?' -- nl question
      ) ->> 'sql';
    ```
    
    The `->>` operator is used to extract a JSON value as text. The `alloydb_ai_nl.get_sql` function returns a JSON object, which is the part of the statement that retrieves the value associated with the key `sql`. This value is the generated SQL query.
    

## Generate result summaries from natural language inputs

You can use AlloyDB AI natural language to generate result summaries from natural language inputs. The `alloydb_ai_nl.get_sql_summary` function securely executes the natural language question on the underlying table, summarizes a sample of the result set, and returns the summary in natural language.

To produce a summary of results for a natural language question in your database, use the `alloydb_ai_nl.get_sql_summary` function as shown in the following example:

```
SELECT
  alloydb_ai_nl.get_sql_summary(
    nl_config_id => 'my_app_config',
    nl_question => 'Give me the total number of accounts and the earliest opening date and other information for accounts who choose issuance after transaction are staying in east Bohemia region?');
```

Calling the preceding statement produces the following example JSON object:

```
{
  "answer": "The result set indicates that there are 13 accounts that chose issuance after a transaction and are located in the East Bohemia region. The earliest opening date among these accounts is August 21, 1993. Other information about these accounts is not provided in the result set."
}
```

You can secure the tables and views accessed by a query in `alloydb_ai_nl.get_sql_summary` using one or more [parameterized secure views](/alloydb/docs/manage-application-data-security-parameterized-secure-views). The parameter names and their values are available to an application, and are required by `alloydb_ai_nl.get_sql_summary`.

For example, the application might want to provide the `user_id` parameter for an authenticated user with a user ID of `123`. You achieve this by providing `param_names` and `param_values` inputs, as shown in the following example:

```
SELECT
  alloydb_ai_nl.get_sql_summary(
    nl_config_id => 'my_app_config',
    nl_question => 'Give me the total number of accounts and the earliest opening date and other information for accounts who choose issuance after transaction are staying in east Bohemia region?',
    param_names => ARRAY ['user_id'],
    param_values => ARRAY ['123']
);
```

Providing `param_names` and `param_values` arguments makes sure that, when the `nl_question` is answerable by a SQL statement that is enforced by parameterized secure views, the designated security filters are applied when the result set is produced and the summary is generated.

## Test and refine

To get improved auto-generated queries, [modify or add better context](#add-context), [query templates](#create-query-templates), and [value indexes](#define-concept-types-and-value-index), then iterate until you achieve the results that you want.

## What's next

-   Learn about [AlloyDB AI natural language use cases and key capabilities](/alloydb/docs/ai/natural-language-overview).
-   [Use AlloyDB AI natural language to generate SQL](/alloydb/docs/ai/use-natural-language-generate-sql-queries).
-   Learn how to [search your relational data stored in AlloyDB in Gemini Enterprise using AlloyDB AI natural language](/gemini/enterprise/docs/connectors/connect-alloydb-data) ([Preview](https://cloud.google.com/products#product-launch-stages)).
-   [Manage application data security using AlloyDB parameterized secure views](/alloydb/docs/manage-application-data-security-parameterized-secure-views)

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.