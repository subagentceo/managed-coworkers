-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Use the AlloyDB remote MCP server Stay organized with collections Save and categorize content based on your preferences.

**Important:** The AlloyDB for PostgreSQL remote MCP server offers a global endpoint and regional endpoints. The Global endpoint is Generally Available. Regional endpoints are in Preview and subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://docs.cloud.google.com/terms/service-terms#1). Pre-GA products and features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This document shows you how to use the AlloyDB for PostgreSQL remote Model Context Protocol (MCP) server to connect with AI applications including Gemini CLI, ChatGPT, Claude, and custom applications you are developing. The AlloyDB for PostgreSQL remote MCP server lets you access and run AlloyDB tools to manage AlloyDB clusters and instances from your AI-enabled development environments and AI agent platforms. The AlloyDB for PostgreSQL remote MCP server is enabled when you enable the AlloyDB for PostgreSQL API.

[Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro) (MCP) standardizes how large language models (LLMs) and AI applications or agents connect to external data sources. MCP servers let you use their tools, resources, and prompts to take actions and get updated data from their backend service.

## What's the difference between local and remote MCP servers?

Local MCP servers

Typically run on your local machine and use the standard input and output streams (stdio) for communication between services on the same device.

Remote MCP servers

Run on the service's infrastructure and offer an HTTP endpoint to AI applications for communication between the AI MCP client and the MCP server. For more information about MCP architecture, see [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture).

You might want to use the AlloyDB local MCP server for the following reasons:

-   Local development and testing
-   Offline MCP use
-   Manage AlloyDB clusters and instances from your AI application

For more information about how to use your local MCP server, see [Use AlloyDB for PostgreSQL with MCP, Gemini CLI, and other agents](/alloydb/docs/connect-ide-using-mcp-toolbox) or [AlloyDB for PostgreSQL MCP server](https://github.com/googleapis/mcp-toolbox). The following sections only apply to the AlloyDB for PostgreSQL remote MCP server.

## Google Cloud remote MCP servers

Google and Google Cloud remote MCP servers have the following features and benefits:

-   Simplified, centralized discovery
-   Managed global or regional HTTP endpoints
-   Fine-grained authorization
-   Optional prompt and response security with Model Armor protection
-   Centralized audit logging

For information about other MCP servers and information about security and governance controls available for Google Cloud MCP servers, see [Google Cloud MCP servers overview](https://docs.cloud.google.com/mcp/overview).

## Limitations

The AlloyDB remote MCP server has the following limitations:

-   The `create_user` tool doesn't support creating a [built-in authentication user with a password](https://www.postgresql.org/docs/16/auth-password.html#AUTH-PASSWORD). A user can only be created with [IAM authentication](/alloydb/docs/database-users/manage-iam-auth).
-   If the `execute_sql` tool returns a response that's larger than 10 MB, then the response might be truncated.
-   The IAM permission required for `execute_sql_read_only` is `alloydb.instances.executeSqlReadOnly`, which isn't visible in the Google Cloud console. To use the API or the Google Cloud CLI, you need any of the following roles: `alloydb.viewer`, `alloydb.databaseUser`, or `alloydb.admin`.
-   `execute_sql_read_only` is only supported for PostgreSQL versions 17 and later.
-   Potential write operations using foreign data wrappers (FDWs) with `execute_sql_read_only`. If you configured an FDW connection from your AlloyDB instance to a remote database, and the user mapping for this FDW connection has write permissions—for example, `INSERT`, `UPDATE`, and `DELETE`—on the remote database, these permissions can be used even when you use `execute_sql_read_only`.
    
    To prevent accidental writes to remote databases when you use `execute_sql_read_only`, verify that any user mappings configured for your FDW connections don't grant write permissions to users who are intended to have read-only access through this tool. Carefully review the permissions assigned to the users in your FDW user mappings.
    

## Before you begin

-   Sign in to your Google Cloud account. If you're new to Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in real-world scenarios. New customers also get $300 in free credits to run, test, and deploy workloads.
-   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.
    
    **Roles required to select or create a project**
    
    -   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    -   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
    
-   If you're using an existing project for this guide, [verify that you have the permissions required to complete this guide](#required-roles). If you created a new project, then you already have the required permissions.
    
-   Enable the AlloyDB API.
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).
    
    [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com)
    
-   [Install](/sdk/docs/install) the Google Cloud CLI.
    
    **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
    
-   If you're using an external identity provider (IdP), you must first [sign in to the gcloud CLI with your federated identity](/iam/docs/workforce-log-in-gcloud).
    
-   To [initialize](/sdk/docs/initializing) the gcloud CLI, run the following command:
    
    gcloud init
    

-   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.
    
    **Roles required to select or create a project**
    
    -   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    -   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
    
-   If you're using an existing project for this guide, [verify that you have the permissions required to complete this guide](#required-roles). If you created a new project, then you already have the required permissions.
    
-   Enable the AlloyDB API.
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).
    
    [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com)
    
-   [Install](/sdk/docs/install) the Google Cloud CLI.
    
    **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
    
-   If you're using an external identity provider (IdP), you must first [sign in to the gcloud CLI with your federated identity](/iam/docs/workforce-log-in-gcloud).
    
-   To [initialize](/sdk/docs/initializing) the gcloud CLI, run the following command:
    
    gcloud init
    

### Required roles

To get the permissions that you need to use the AlloyDB for PostgreSQL MCP server, ask your administrator to grant you the following IAM roles on the project where you want to use the AlloyDB for PostgreSQL MCP server:

-   Create an AlloyDB instance: [AlloyDB Admin](/iam/docs/roles-permissions/alloydb#alloydb.admin) (`roles/alloydb.admin`)
-   Create an AlloyDB user: [AlloyDB Admin](/iam/docs/roles-permissions/alloydb#alloydb.admin) (`roles/alloydb.admin`)
-   Execute SQL queries in AlloyDB:
    -   [AlloyDB Admin](/iam/docs/roles-permissions/alloydb#alloydb.admin) (`roles/alloydb.admin`)
    -   AlloyDB Database User (`roles/alloydb.databaseUser`) (Studio Query User (`roles/databasesconsole.studioQueryUser`) also works)
-   Execute read-only SQL queries in AlloyDB:
    -   [AlloyDB Viewer](/iam/docs/roles-permissions/alloydb#alloydb.viewer) (`roles/alloydb.viewer`)
    -   [AlloyDB Admin](/iam/docs/roles-permissions/alloydb#alloydb.admin) (`roles/alloydb.admin`)
    -   [AlloyDB Database User](/iam/docs/roles-permissions/alloydb#alloydb.databaseUser) (`roles/alloydb.databaseUser`)
-   Get a AlloyDB instance or list all AlloyDB instances in a project: [AlloyDB Viewer](/iam/docs/roles-permissions/alloydb#alloydb.viewer) (`roles/alloydb.viewer`)
-   List AlloyDB users: [AlloyDB Viewer](/iam/docs/roles-permissions/alloydb#alloydb.viewer) (`roles/alloydb.viewer`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](/iam/docs/granting-changing-revoking-access).

These predefined roles contain the permissions required to use the AlloyDB for PostgreSQL MCP server. To see the exact permissions that are required, expand the **Required permissions** section:

#### Required permissions

The following permissions are required to use the AlloyDB for PostgreSQL MCP server:

-   Make MCP tool calls: `mcp.tools.call`
-   Create an AlloyDB cluster: `alloydb.cluster.create`
-   Create an AlloyDB user: `alloydb.users.create`
-   Clone an AlloyDB instance: `alloydb.instances.create`
-   Execute SQL queries on an AlloyDB instance:
    -   `alloydb.instances.executeSql`
    -   `alloydb.instances.login`
-   Execute read-only SQL queries on an AlloyDB instance:
    -   `alloydb.instances.executeSqlReadOnly`
    -   `alloydb.instances.login`
-   Get an AlloyDB cluster: `alloydb.instances.get`
-   Get an AlloyDB cluster operation: `alloydb.clusters.get`
-   Import data to an AlloyDB cluster: `alloydb.clusters.import`
-   Export data from an AlloyDB cluster to Cloud Storage: `alloydb.clusters.export`
-   List AlloyDB clusters in a project: `alloydb.clusters.list`
-   List AlloyDB users: `alloydb.users.list`
-   Update an AlloyDB cluster: `alloydb.clusters.update`
-   Update an AlloyDB user: `alloydb.users.update`

You might also be able to get these permissions with [custom roles](/iam/docs/creating-custom-roles) or other [predefined roles](/iam/docs/roles-overview#predefined).

## Authentication and authorization

The AlloyDB for PostgreSQL remote MCP server uses the [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) protocol with [Identity and Access Management (IAM)](https://docs.cloud.google.com/iam/docs/overview) for authentication and authorization. All [Google Cloud identities](https://docs.cloud.google.com/docs/authentication/identity-products) are supported for authentication to MCP servers.

The AlloyDB remote MCP server doesn't accept API keys.

We recommend that you create a separate identity for agents using MCP tools so that access to resources can be controlled and monitored. For more information on authentication, see [Authenticate to MCP servers](/mcp/authenticate-mcp).

## AlloyDB MCP OAuth scopes

OAuth 2.0 uses scopes and credentials to determine if an authenticated principal is authorized to take a specific action on a resource. For more information about OAuth 2.0 scopes at Google, read [Using OAuth 2.0 to access Google APIs](https://developers.google.com/identity/protocols/oauth2).

AlloyDB has the following MCP tool OAuth scopes:

Scope URI for gcloud CLI

Description

`https://www.googleapis.com/auth/alloydb`

View, edit, configure, and delete your Google Cloud AlloyDB data, and view the email address for your Google Account.

Additional scopes might be required on the resources accessed during a tool call. To view a list of scopes required for AlloyDB, see [AlloyDB Admin API](https://developers.google.com/identity/protocols/oauth2/scopes#alloydb).

## Configure an MCP client to use the AlloyDB MCP server

AI applications and agents, such as Claude or Gemini CLI, can instantiate an MCP client that connects to a single MCP server. An AI application can have multiple clients that connect to different MCP servers. To connect to a remote MCP server, the MCP client must know the remote MCP server's URL.

In your AI application, look for a way to connect to a remote MCP server. You are prompted to enter details about the server, such as its name and URL.

For the AlloyDB for PostgreSQL MCP server, enter the following as required:

-   **Server name**: AlloyDB for PostgreSQL MCP server
-   **Server URL** or **Endpoint**: `https://alloydb.googleapis.com/mcp`
-   **Transport**: HTTP
-   **Authentication details**: Depending on how you want to authenticate, you can enter your Google Cloud credentials, your OAuth Client ID and secret, or an agent identity and credentials. For more information about authentication, see [Authenticate to MCP servers](/mcp/authenticate-mcp).
-   **OAuth scope**: the [OAuth 2.0 scope](https://developers.google.com/identity/protocols/oauth2/scopes) that you want to use when connecting to the AlloyDB for PostgreSQL MCP server.

For host-specific guidance about setting up and connecting to MCP server, see the following:

-   [Claude.ai](/mcp/configure-mcp-ai-application#claude-ai)
-   [Gemini CLI](/mcp/configure-mcp-ai-application#gemini-cli)

For more general guidance, see the following resources:

-   [Connect to remote MCP servers](https://modelcontextprotocol.io/docs/develop/connect-remote-servers).
-   [Configure MCP in an AI application](/mcp/configure-mcp-ai-application).

## Available tools

To view details of available MCP tools and their descriptions for the AlloyDB for PostgreSQL MCP server, see the [AlloyDB for PostgreSQL MCP reference](/alloydb/docs/reference/mcp/alloydb/mcp).

### List tools

Use the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector) to list tools, or send a `tools/list` HTTP request directly to the AlloyDB for PostgreSQL remote MCP server. The `tools/list` method doesn't require authentication. You must provide a string or numeric ID—for example, `1` or `my-id`.

```
POST /mcp HTTP/1.1
Host: alloydb.googleapis.com
Content-Type: application/json

{
  "id": USER_SPECIFIED_ID,
  "jsonrpc": "2.0",
  "method": "tools/list",
}
```

### Execute SQL

**Important:** Enabling Data API access on your instance lets authorized users access your instance from the public internet for private IP instances.

To execute SQL statements, follow these steps:

1.  Set the `data_api_access` instance setting on the AlloyDB instance to the value `ALLOW_DATA_API_ACCESS`. When you create an instance using the `create_instance` tool, the `data_api_access` configuration is enabled automatically.
    
    If the `data_api_access` configuration isn't enabled on an instance, you can enable it using the curl command to update the value of the field `dataApiAccess` to `ENABLED`:
    
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
2.  In the Gemini CLI, enter a prompt similar to the following:
    
    `Enable IAM database authentication on the AlloyDB instance INSTANCE_NAME Make sure that the SQL statements use the privileges associated with the IAM database authentication user account USER_ACCOUNT`
    
    Replace the following:
    
    -   `INSTANCE_NAME`: the name of the AlloyDB instance.
    -   `USER_ACCOUNT`: the IAM user account to use for [authentication](/alloydb/docs/database-users/manage-iam-auth) when executing SQL statements.

## Sample use cases

The following are sample use cases for the AlloyDB MCP server.

### Web application development

A sample use case might be the rapid development of web applications and the provisioning of AlloyDB instances as their source database. In this use case, using the AlloyDB MCP server lets you build a new database and populate it with initial data for a new project using natural language.

**Sample prompt:**

"Create a new alloydb PostgreSQL development instance and set up a table called products."

**Workflow:** the workflow for setting up a web application might look like the following:

-   **Provisioning**: The agent creates a cluster that the instance can be allocated in. The agent then calls the `create_instance` tool to create a new AlloyDB instance with development environment-sized specifications. You can [enable Public IP connectivity](/alloydb/docs/connect-public-ip) on the new instance. You can also [automate Private Service Connect](/alloydb/docs/configure-private-service-connect) endpoint configuration.
    
-   **Verification**: The agent uses the `get_operation` tool to poll the status of the instance creation operation.
    
-   **Connection**: When the operation is complete, the agent uses the `get_instance` tool to retrieve the instance connection metadata.
    
-   **Schema setup**: The agent creates the database and then uses the `execute_sql` to run the `CREATE TABLE products` SQL statement.
    
-   **Data seeding**: The agent uses `execute_sql` again to insert initial seed data (DML) into the newly created table.
    

### Operational and database configuration management

In this sample use case, you might review existing database instances to help ensure they meet operational configuration standards. You can also use the agent to manage database users on the instance.

**Sample prompt**:

"List all the PostgreSQL instances in my project and show me their details to verify that they're using the same configuration and that the most recent list database users has been successfully updated."

**Workflow**: the workflow for checking AlloyDB instance and database user configuration might look like the following.

-   **Discovery**: The agent uses `list_instances` to retrieve a list of all AlloyDB instances in the project.
    
-   **Inspection**: For each instance identified, the agent calls `get_instance` to fetch detailed configuration metadata, such as the database version, region, and machine type, and calls `list_users` to check the database users on the instance. This metadata includes information about whether [public IP connectivity](/alloydb/docs/connect-public-ip) is enabled or if [Private Service Connect endpoints](/alloydb/docs/configure-private-service-connect) are configured.
    
-   **Reporting**: The agent summarizes the findings, highlighting any instances or users that deviate from the expected configuration.
    

## Optional security and safety configurations

MCP introduces new security risks and considerations due to the wide variety of actions that can be taken with MCP tools. To minimize and manage these risks, Google Cloud offers defaults and customizable policies to control the use of MCP tools in your Google Cloud organization or project.

**Note:** When you use MCP and you execute SQL on an instance—even with a private IP— traffic is sent across the internet.

For more information about MCP security and governance, see [AI security and safety](/mcp/ai-security-safety).

### Use Model Armor

[Model Armor](https://docs.cloud.google.com/model-armor/overview) is a Google Cloud service designed to enhance the security and safety of your AI applications. It works by proactively screening LLM prompts and responses, protecting against various risks and supporting responsible AI practices. Whether you are deploying AI in your cloud environment, or on external cloud providers, Model Armor can help you prevent malicious input, verify content safety, protect sensitive data, maintain compliance, and enforce your AI safety and security policies consistently across your diverse AI landscape.

When Model Armor is enabled with [logging enabled](https://docs.cloud.google.com/model-armor/configure-logging), Model Armor logs the entire payload. This might expose sensitive information in your logs.

**Caution:** Model Armor is available in [certain regions](https://docs.cloud.google.com/model-armor/locations). When Model Armor is enabled and you use an MCP server in a jurisdiction that Model Armor doesn't support, the routing behavior of the call might be different for different MCP servers. For more information about the behavior of individual MCP servers, see [Model Armor supported products](https://docs.cloud.google.com/mcp/model-armor-supported-products).

#### Enable Model Armor

You must enable Model Armor APIs before you can use Model Armor.

### Console

1.  Enable the Model Armor API.
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).
    
    [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=modelarmor.googleapis.com)
    
2.  Select the project where you want to activate Model Armor.
    

### gcloud

Before you begin, follow these steps using the Google Cloud CLI with the Model Armor API:

1.  In the Google Cloud console, activate Cloud Shell.
    
    [Activate Cloud Shell](https://console.cloud.google.com/?cloudshell=true)
    
    At the bottom of the Google Cloud console, a [Cloud Shell](/shell/docs/how-cloud-shell-works) session starts and displays a command-line prompt. Cloud Shell is a shell environment with the Google Cloud CLI already installed and with values already set for your current project. It can take a few seconds for the session to initialize.
    
2.  Run the following command to set the API endpoint for the Model Armor service.
    
    gcloud config set api\_endpoint\_overrides/modelarmor "https://modelarmor.LOCATION.rep.googleapis.com/"
    
    Replace `LOCATION` with the region where you want to use Model Armor.
    

#### Configure protection for Google and Google Cloud remote MCP servers

To help protect your MCP tool calls and responses you can use Model Armor floor settings. A floor setting defines the minimum security filters that apply across the project. This configuration applies a consistent set of filters to all MCP tool calls and responses within the project.

**Tip:** Don't enable the prompt injection and jailbreak filter unless your MCP traffic carries natural language data.

Set up a Model Armor floor setting with MCP sanitization enabled. For more information, see [Configure Model Armor floor settings](https://docs.cloud.google.com/model-armor/configure-floor-settings).

**Note:** If the agent and the MCP server are in different projects, you can create floor settings in both projects (the client project and the resource project). In this case, Model Armor is invoked twice, once for each project.

See the following example command:

gcloud model-armor floorsettings update \\
--full-uri\='projects/PROJECT\_ID/locations/global/floorSetting' \\
--enable-floor-setting-enforcement\=TRUE \\
--add-integrated-services\=GOOGLE\_MCP\_SERVER \\
--google-mcp-server-enforcement-type\=INSPECT\_AND\_BLOCK \\
--enable-google-mcp-server-cloud-logging \\
--malicious-uri-filter-settings-enforcement\=ENABLED \\
--add-rai-settings-filters\='\[{"confidenceLevel": "MEDIUM\_AND\_ABOVE", "filterType": "DANGEROUS"}\]'

Replace `PROJECT_ID` with your Google Cloud project ID.

Note the following settings:

-   `INSPECT_AND_BLOCK`: The enforcement type that inspects content for the Google MCP server and blocks prompts and responses that match the filters.
-   `ENABLED`: The setting that enables a filter or enforcement.
-   `MEDIUM_AND_ABOVE`: The confidence level for the Responsible AI - Dangerous filter settings. You can modify this setting, though lower values might result in more false positives. For more information, see [Model Armor confidence levels](https://docs.cloud.google.com/model-armor/overview#ma-confidence-levels).

#### Disable scanning MCP traffic with Model Armor

To stop Model Armor from automatically scanning traffic to and from Google MCP servers based on the project's floor settings, run the following command:

```
gcloud model-armor floorsettings update \
  --full-uri='projects/PROJECT_ID/locations/global/floorSetting' \
  --remove-integrated-services=GOOGLE_MCP_SERVER
```

Replace `PROJECT_ID` with the Google Cloud project ID. Model Armor doesn't automatically apply the rules defined in this project's floor settings to any Google MCP server traffic.

Model Armor floor settings and general configuration can impact more than just MCP. Because Model Armor integrates with services like Vertex AI, any changes you make to floor settings can affect traffic scanning and safety behaviors across all integrated services, not just MCP.

### Control MCP use with IAM deny policies

[Identity and Access Management (IAM) deny policies](https://docs.cloud.google.com/iam/docs/deny-overview) help you secure Google Cloud remote MCP servers. Configure these policies to block unwanted MCP tool access.

For example, you can deny or allow access based on:

-   The principal
-   Tool properties like read-only
-   The application's OAuth client ID

For more information, see [Control MCP use with Identity and Access Management](https://docs.cloud.google.com/mcp/control-mcp-use-iam).

## What's next

-   Read the [AlloyDB MCP reference documentation](/alloydb/docs/reference/mcp/alloydb/mcp).
-   Learn more about [Google Cloud MCP servers](/mcp/overview).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.