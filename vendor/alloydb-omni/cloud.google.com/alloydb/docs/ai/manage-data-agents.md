-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Manage context sets in AlloyDB Studio Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1), and the [Additional Terms for Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos). Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

For information about access to this release, see the [access request page](https://forms.gle/pJByTWfenZAWbaXo7).

This document describes how to create context sets in AlloyDB for PostgreSQL Studio using a context set file. Context set names must be unique within a database.

To learn about context sets, see [Context sets overview](/alloydb/docs/ai/context-sets-overview).

## Before you begin

Complete the following prerequisites before creating an agent.

### Enable required services

Enable the following services for your project:

-   [Data Analytics API with Gemini](https://console.cloud.google.com/apis/library/geminidataanalytics.googleapis.com)
-   [Gemini for Google Cloud API](https://console.cloud.google.com/apis/library/cloudaicompanion.googleapis.com)
-   [Knowledge Catalog API](https://console.cloud.google.com/apis/library/dataplex.googleapis.com)

### Prepare an AlloyDB for PostgreSQL cluster, instance, and database

Make sure that you have access to an existing AlloyDB cluster and instance or [create a new one](/alloydb/docs/cluster-create).
This tutorial requires you to have a database in your AlloyDB instance. For more information, see [Create a database](/alloydb/docs/database-create).

### Required roles and permissions

-   Add an Identity and Access Management (IAM) user or service account to the cluster at the database level. For more information, see [Manage database users](/alloydb/docs/database-users/manage-roles#create).
-   Grant the `alloydb.databaseUser`, the `serviceusage.serviceUsageConsumer`, and the `geminidataanalytics.queryDataUser` roles to the IAM user at the project level. For more information, see [Add IAM policy binding for a project](/sdk/gcloud/reference/projects/add-iam-policy-binding).

### Grant `executesql` permission to AlloyDB for PostgreSQL instance

To grant the `executesql` permission to the AlloyDB for PostgreSQL instance and set the `data_api_access` instance setting to the value `ALLOW_DATA_API`, use the following `curl` command :

   curl -X PATCH \\
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
     -H "Content-Type: application/json" \\
     https://alloydb.googleapis.com/v1alpha/projects/PROJECT\_ID/locations/LOCATION/clusters/CLUSTER\_ID/instances/INSTANCE\_ID?updateMask=dataApiAccess \\
     -d '{
       "dataApiAccess": "ENABLED",
     }'
Replace the following:

-   `PROJECT_ID`: The ID of your Google Cloud project.
-   `LOCATION`: The region where your AlloyDB cluster is located.
-   `CLUSTER_ID`: The ID of your AlloyDB cluster.
-   `INSTANCE_ID`: The ID of your AlloyDB instance.

To perform steps in this tutorial, sign in to [Google Cloud](https://console.cloud.google.com/), and then authenticate to the database using IAM authentication.

## Create a context set

To create a context set, perform the following steps:

1.  In the Google Cloud console, go to the AlloyDB page.

    [Go to AlloyDB](https://console.cloud.google.com/alloydb)

2.  Select a cluster from the list.

3.  In the navigation menu, click **AlloyDB Studio**.

4.  Sign in to **Studio** using IAM authentication.

5.  In the **Explorer pane**, next to **Context sets**, click **View actions**.

6.  Click **Create context set**.

7.  In **Context set name**, provide a unique context set name. The context set name is case-sensitive and can contain letters, numbers, hyphens, and underscores.

8.  Optional. In **Context set description**, add a description for your context set.

9.  Click **Create**.


**Note:** Creating the first context set in a project can take several minutes.

## Build context sets

After creating a context set, follow the steps in [Build contexts using Gemini CLI](/alloydb/docs/ai/build-context-gemini-cli) to create a context set file. You can then edit your context set to upload the context set file.

## Edit a context set

To edit a context set, perform the following steps:

1.  In the Google Cloud console, go to the AlloyDB page.

    [Go to AlloyDB](https://console.cloud.google.com/alloydb)

2.  Select a cluster from the list.

3.  In the navigation menu, click **AlloyDB Studio**.

4.  Sign in to **Studio** using Identity and Access Management authentication.

5.  In the **Explorer pane**, next to **Context sets**, click **View actions**.

6.  Click **Edit context set**.

7.  Optional: Edit **Context set description**.

8.  Click **Browse** in the **Upload context set file** section, and select the context set file.

9.  Click **Save**.


## Delete a context set

To delete a context set, perform the following steps:

1.  In the Google Cloud console, go to the AlloyDB page.

    [Go to AlloyDB](https://console.cloud.google.com/alloydb)

2.  Select a cluster from the list.

3.  In the navigation menu, click **AlloyDB Studio**.

4.  Sign in to **Studio** using Identity and Access Management authentication.

5.  In the **Explorer pane**, next to **Context sets**, click **View actions**.

6.  Click **Delete context set**.

7.  In the **Delete context set** confirmation dialog, enter the name of the context set.

8.  Click **Confirm** to delete the context set.


**Note:** Before you delete a database, you must delete all context sets associated with that database.

## What's next

-   Learn more about [context sets](/alloydb/docs/ai/context-sets-overview).
-   Learn how to [test a context set](/alloydb/docs/ai/test-context-set).
-   Learn how to [build contexts using Gemini CLI](/alloydb/docs/ai/build-context-gemini-cli).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
