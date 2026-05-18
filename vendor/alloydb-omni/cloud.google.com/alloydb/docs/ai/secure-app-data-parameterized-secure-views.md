-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Secure and control access to application data using parameterized secure views Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

This tutorial describes how to use parameterized secure views in AlloyDB for PostgreSQL to restrict user access to database tables. In this tutorial, you set up parameterized secure views, configure database roles and privileges to restrict access to base tables, and verify data security. Parameterized secure views help secure applications that use natural language queries generated using the [QueryData API](/gemini/docs/conversational-analytics-api/data-agent-authored-context-databases).

Examples are included to illustrate the capabilities of parameterized secure views. These examples are intended for demonstration purposes only.

## What are parameterized secure views?

As a general best practice, your application should run using a service account with the minimal required access to your database. For example, if your application shouldn't write to your database, it should use a role with read-only access. You should configure these access controls at the database level.

However, there are times when your application needs more granular security controls than standard database-level access permits. Parameterized secure views provide application data security and row access control using SQL views. They help ensure that application users can view only the data that they are authorized to access.

Parameterized secure views mitigate security risks when handling ad hoc or LLM-generated natural language queries by parameterizing views with end-user identifiers, ensuring users access only their authorized data regardless of query phrasing. This approach also simplifies user management by allowing a single database role to serve all application users securely, avoiding the need to create separate database roles for each individual to enforce row-level security.

## Objectives

-   Create secure parameterized views with named view parameters.
-   Create the database role that is used by the application to connect to the database and access parameterized secure views.
-   Grant the new role permissions to the secure views and revoke access to the base tables.
-   Connect using the new role and verify that the restricted tables can't be accessed.
-   Run queries on the parameterized secure view using the `execute_parameterized_query` function or using the QueryData API.

## Costs

In this document, you use the following billable components of Google Cloud:

-   [AlloyDB for PostgreSQL](https://cloud.google.com/alloydb/pricing)

To generate a cost estimate based on your projected usage, use the [pricing calculator](https://cloud.google.com/products/calculator).

New Google Cloud users might be eligible for a [free trial](https://cloud.google.com/free).

To avoid continued billing, delete the resources you created when you finish the tasks in this document. For more information, see [Clean up](#clean-up).

## Before you begin

Complete the following prerequisites before creating a context set.

### Enable billing and required APIs

1.  In the Google Cloud console, select a project.
    
    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
    
2.  [Make sure that billing is enabled for your Google Cloud project.](/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project)
    
3.  Enable the Cloud APIs necessary to create and connect to AlloyDB for PostgreSQL.
    
    -   [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com,dataplex.googleapis.com)
    
    1.  In the **Confirm project** step, click **Next** to confirm the name of the project you are going to make changes to.
    2.  In the **Enable APIs** step, click **Enable** to enable the following:
        
        -   AlloyDB for PostgreSQL API
        -   Knowledge Catalog API

### Create and connect to a database

1.  [Create a cluster and its primary instance](/alloydb/docs/quickstart/create-and-connect#create-cluster).
2.  [Connect to your instance and create a database](/alloydb/docs/quickstart/create-and-connect#run).

## Prepare your environment

To prepare for running queries on a parameterized secure view, set up the database, database roles, the `parameterized_view` extension, and the application schema.

### Enable the required extension

Enable the `parameterized_views.enabled` database flag, which loads the required extension libraries. For more information, see [Configure an instance's database flags](/alloydb/docs/instance-configure-database-flags).

**Note:** After you enable the `parameterized_views.enabled` database flag, your database restarts to make these changes take effect.

### Set up the database

-   Create a database called `database` for the application data and parameterized views. For more information, see [Create a database](/alloydb/docs/database-create).

### Create database roles, the extension, and the application schema

1.  In the Google Cloud console, go to the AlloyDB page.
    
    [Go to AlloyDB](https://console.cloud.google.com/alloydb)
    
2.  Select a cluster from the list.
    
3.  In the navigation menu, click **AlloyDB Studio**.
    
4.  Sign in to **Studio** using postgres authentication.
    
5.  Click **Authenticate**. The Explorer pane displays a list of the objects in your database.
    
6.  Click **New SQL editor tab** or **New tab** to open a new tab
    
7.  Create the `parameterized_views` extension in the database.
    
    ```
    -- Requires parameterized_views.enabled set to true
    CREATE EXTENSION parameterized_views;
    ```
    
    When the extension is created, the system also creates a schema named `parameterized_views` so that the APIs are contained in that schema's namespace and so that those APIs don't conflict with existing APIs.
    
    **Note:** You must create an extension in every database in which parameterized views are created.
    
8.  Sign in as a user with superuser privileges, such as the built-in postgres user. If you want to create a a new superuser, for example `admin_user`, then run the following commands:
    
    ```
    CREATE ROLE admin_user WITH LOGIN PASSWORD '...';
    GRANT ALL PRIVILEGES ON DATABASE database TO admin_user;
    ```
    
    For more information, see [`CREATE USER`](https://www.postgresql.org/docs/15/sql-createuser.html).
    
9.  Create a new database role for executing queries against parameterized secure views. This is an AlloyDB role that the application uses to connect and sign into the database to execute queries with limited access to public functions or objects to the minimal required set.
    
    ```
    CREATE ROLE psv_user WITH LOGIN PASSWORD '...';
    ```
    
    For more information, see [`CREATE USER`](https://www.postgresql.org/docs/15/sql-createuser.html).
    
10.  Connect as the administrative user.
     
     ```
     SET role TO admin_user;
     ```
     
11.  Create the schema that contains the tables.
     
     ```
     CREATE SCHEMA schema;
     ```
     
12.  Create the tables and insert data.
     
     ```
     CREATE TABLE store.checked_items(bag_id INT,timestamp TIMESTAMP, loc_code CHAR(3), scan_type CHAR(1), location TEXT, customer_id INT);
     
     INSERT INTO store.checked_items (bag_id, timestamp, loc_code, scan_type, location, customer_id) VALUES
     (101, '2023-10-26 10:00:00', 'ABC', 'I', 'Warehouse A', 123),
     (102, '2023-10-26 10:15:30', 'DEF', 'O', 'Loading Dock B', 456),
     (103, '2023-10-26 10:30:45', 'GHI', 'I', 'Conveyor Belt 1', 789),
     (104, '2023-10-26 11:00:00', 'JKL', 'O', 'Shipping Area C', 101),
     (105, '2023-10-26 11:45:15', 'MNO', 'I', 'Sorting Station D', 202),
     (106, '2023-10-26 12:00:00', 'PQR', 'O', 'Truck Bay E', 303);
     ```
     

## Create secure parameterized views and set up access privileges

To create secure parameterized views and to set up appropriate access privileges for the base table and views, follow these steps:

1.  In the Google Cloud console, go to the AlloyDB page.
    
    [Go to AlloyDB](https://console.cloud.google.com/alloydb)
    
2.  Select a cluster from the list.
    
3.  In the navigation menu, click **AlloyDB Studio**.
    
4.  Sign in to **Studio** and connect to the `database` as the `admin_user`.
    
5.  Click **Authenticate**. The Explorer pane displays a list of the objects in your database.
    
6.  Click **New SQL editor tab** or **New tab** to open a new tab.
    
7.  To provide limited access to the view, create a parameterized secure view:
    
    ```
    CREATE VIEW store.secure_checked_items WITH (security_barrier) AS
    SELECT bag_id, timestamp, location
    FROM store.checked_items t
    WHERE customer_id = $@app_end_userid;
    ```
    
    **Note:** Ensure that you use unique parameter names, such as `$@app_end_userid`, when creating the parameterized views.
    
8.  Grant access to the view.
    
    ```
    GRANT SELECT ON store.secure_checked_items TO psv_user;
    ```
    
9.  To access the view, grant access to the schema.
    
    ```
    GRANT USAGE ON SCHEMA store TO psv_user;
    ```
    
10.  Revoke direct access to the base table.
     
     ```
     REVOKE ALL PRIVILEGES ON store.checked_items FROM psv_user;
     ```
     
     **Note:** The owner of the parameterized view must have `SELECT` privileges on the base tables. In addition, the user of the parameterized view must have `USAGE` on the schema of the view and `SELECT` on the view. For example, the `admin_use r` owns the parameterized view, so it has `SELECT` privileges on the base tables while the `psv_user` must have `USAGE` on the `store` schema and `SELECT` on the view.
     
11.  Sign in as the `admin_user` administrator, and grant the `psv_user` role to an IAM-authenticated user
     
     ```
     GRANT psv_user TO "IAM_USER_EMAIL";
     ```
     
     Replace `IAM_USER_EMAIL` with your IAM user email address.
     

## Verify data security

To verify that the parameterized secure views are restricting access to the designated views, sign into the database as the IAM-authenticated user. In AlloyDB, IAM users inherit the permissions of the database roles assigned to them.

1.  Sign into the database as the IAM-authenticated user.
    
2.  Verify that the base table can't be accessed.
    
    ```
    SELECT * FROM store.checked_items;
    ERROR:  permission denied for table checked_items
    ```
    
3.  Access the parameterized secure view using the `execute_parameterized_query` function:
    
    ```
    SELECT * FROM parameterized_views.execute_parameterized_query(
      query => 'SELECT * from store.secure_checked_items',
      param_names => ARRAY ['app_end_userid'],
      param_values => ARRAY ['303']
    );
    ```
    
4.  Query the parameterized secure view using SQL syntax and the `QueryData` request with PSV parameters.
    

    ```
    curl -X POST \
      "https://geminidataanalytics.googleapis.com/v1beta/projects/PROJECT_ID/locations/REGION:queryData" \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json; charset=utf-8" \
      -d '{
        "prompt": "Show me the checked items.",
        "context": {
          "datasource_references": {
            "alloydb": {
              "database_reference": {
                "project_id": "PROJECT_ID",
                "region": "REGION",
                "cluster_id": "CLUSTER_ID",
                "instance_id": "INSTANCE_ID",
                "database_id": "DATABASE_ID"
              }
            }
          },
          "parameterized_secure_view_parameters": {
            "parameters": {
              "app_end_userid": "303"
            }
          }
        },
        "generation_options": {
          "generate_query_result": true,
          "generate_natural_language_answer": true,
          "generate_explanation": true
        }
      }'
```

Replace the following values:

-   `PROJECT_ID`: Your Google Cloud project ID.
-   `REGION`: The region where your AlloyDB for PostgreSQL instance is located.
-   `CLUSTER_ID`: The ID of your AlloyDB for PostgreSQL cluster.
-   `INSTANCE_ID`: The ID of your AlloyDB for PostgreSQL instance.
-   `DATABASE_ID`: The ID of your AlloyDB for PostgreSQL database.

## Clean up

### Delete the cluster

When you delete the cluster that you created in the [before you begin](/alloydb/docs/ai/use-natural-language-generate-sql-queries#create-and-connect-to-database) section, you also delete all of the objects you created.

1.  In the Google Cloud console, go to the AlloyDB page.
    
    [Go to AlloyDB](https://console.cloud.google.com/alloydb)
    
2.  Select a cluster from the list.
    
3.  Click **Delete cluster**.
    
4.  In **Delete cluster**, enter name of the cluster to confirm you want to delete your cluster.
    

## What's next

-   Learn about [parameterized secure views](/alloydb/docs/parameterized-secure-views-overview).
-   Learn how to [manage application data security using parameterized secure views](/alloydb/docs/manage-application-data-security-parameterized-secure-views).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-16 UTC.