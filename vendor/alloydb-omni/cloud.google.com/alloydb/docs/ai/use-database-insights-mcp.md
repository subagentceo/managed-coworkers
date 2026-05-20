-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Monitor AlloyDB using the Database Insights MCP server Stay organized with collections Save and categorize content based on your preferences.

This document describes how to use the Database Insights remote Model Context Protocol (MCP) server to monitor AlloyDB for PostgreSQL from AI applications such as Gemini CLI, agent mode in Gemini Code Assist, Claude Code, or in AI applications that you're developing.

The Database Insights remote MCP server lets you monitor AlloyDB clusters and instances from your AI-enabled development environments and AI agent platforms by fetching query and system metrics.

The Database Insights remote MCP server is enabled when you enable Database Insights.

[Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro) (MCP) standardizes how large language models (LLMs) and AI applications or agents connect to external data sources. MCP servers let you use their tools, resources, and prompts to take actions and get updated data from their backend service.

## What's the difference between local and remote MCP servers?

Local MCP servers

Typically run on your local machine and use the standard input and output streams (stdio) for communication between services on the same device.

Remote MCP servers

Run on the service's infrastructure and offer an HTTP endpoint to AI applications for communication between the AI MCP client and the MCP server. For more information about MCP architecture, see [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture).

## Google and Google Cloud remote MCP servers

Google and Google Cloud remote MCP servers have the following features and benefits:

-   Simplified, centralized discovery
-   Managed global or regional HTTP endpoints
-   Fine-grained authorization
-   Optional prompt and response security with Model Armor protection
-   Centralized audit logging

For information about other MCP servers and information about security and governance controls available for Google Cloud MCP servers, see [Google Cloud MCP servers overview](https://docs.cloud.google.com/mcp/overview).

## Before you begin

-   Sign in to your Google Cloud account. If you're new to Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in real-world scenarios. New customers also get $300 in free credits to run, test, and deploy workloads.
-   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.

    **Roles required to select or create a project**

    -   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    -   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).

    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.

    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)

-   If you're using an existing project for this guide, [verify that you have the permissions required to complete this guide](#required-roles). If you created a new project, then you already have the required permissions.

-   Enable the AlloyDB, Database Insights APIs.

    **Roles required to enable APIs**

    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).

    [Enable the APIs](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com,dbinsights.googleapis.com)

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

-   Enable the AlloyDB, Database Insights APIs.

    **Roles required to enable APIs**

    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](/iam/docs/granting-changing-revoking-access).

    [Enable the APIs](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com,dbinsights.googleapis.com)

-   [Install](/sdk/docs/install) the Google Cloud CLI.

    **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.

-   If you're using an external identity provider (IdP), you must first [sign in to the gcloud CLI with your federated identity](/iam/docs/workforce-log-in-gcloud).

-   To [initialize](/sdk/docs/initializing) the gcloud CLI, run the following command:

    gcloud init


### Required roles

To get the permissions that you need to use the Database Insights MCP server, ask your administrator to grant you the following IAM roles on the project where you want to use the Database Insights MCP server:

-   Make MCP tool calls: [MCP Tool User](/iam/docs/roles-permissions/mcp#mcp.toolUser) (`roles/mcp.toolUser`)
-   View Cloud Monitoring data: [Monitoring Viewer](/iam/docs/roles-permissions/monitoring#monitoring.viewer) (`roles/monitoring.viewer`)
-   View Database Insights data: [Database Insights Viewer](/iam/docs/roles-permissions/databaseinsights#databaseinsights.viewer) (`roles/databaseinsights.viewer`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](/iam/docs/granting-changing-revoking-access).

These predefined roles contain the permissions required to use the Database Insights MCP server. To see the exact permissions that are required, expand the **Required permissions** section:

#### Required permissions

The following permissions are required to use the Database Insights MCP server:

-   Make MCP tool calls: `mcp.tools.call`
-   Get query metrics: `queryMetrics.fetch`
-   Get system metrics: `systemMetrics.fetch`
-   View Monitoring metrics: `monitoring.timeseries.list`

You might also be able to get these permissions with [custom roles](/iam/docs/creating-custom-roles) or other [predefined roles](/iam/docs/roles-overview#predefined).

## Authentication and authorization

The Database Insights remote MCP server uses the [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) protocol with [Identity and Access Management (IAM)](https://docs.cloud.google.com/iam/docs/overview) for authentication and authorization. All [Google Cloud identities](https://docs.cloud.google.com/docs/authentication/identity-products) are supported for authentication to MCP servers.

The Database Insights remote MCP server doesn't accept API keys.

We recommend that you create a separate identity for agents that are using MCP tools so that access to resources can be controlled and monitored. For more information about authentication, see [Authenticate to MCP servers](/mcp/authenticate-mcp).

## Database Insights MCP OAuth scopes

Database Insights has the following MCP tool OAuth scopes:

Scope URI for gcloud CLI

Description

`https://www.googleapis.com/auth/cloud-platform`

Queries and analyzes database performance and system metrics.

Additional scopes might be required on the resources accessed during a tool call.

## Configure an MCP client to use the Database Insights MCP server

AI applications and agents, such as Claude or Gemini CLI, can instantiate an MCP client that connects to a single MCP server. An AI application can have multiple clients that connect to different MCP servers. To connect to a remote MCP server, the MCP client must know the remote MCP server's URL.

In your AI application, look for a way to connect to a remote MCP server. You are prompted to enter details about the server, such as its name and URL.

For the Database Insights MCP server, enter the following as required:

-   **Server name**: Database Insights MCP server
-   **Server URL** or **Endpoint**: `https://databaseinsights.googleapis.com/mcp`
-   **Transport**: HTTP
-   **Authentication details**: Depending on how you want to authenticate, you can enter your Google Cloud credentials, your OAuth Client ID and secret, or an agent identity and credentials. For more information about authentication, see [Authenticate to MCP servers](/mcp/authenticate-mcp).
-   **OAuth scope**: the [OAuth 2.0 scope](https://developers.google.com/identity/protocols/oauth2/scopes) that you want to use when connecting to the Database Insights MCP server.

For host-specific guidance about setting up and connecting to MCP server, see the following:

-   [Claude.ai](/mcp/configure-mcp-ai-application#claude-ai)
-   [Gemini CLI](/mcp/configure-mcp-ai-application#gemini-cli)

For more general guidance, see the following resources:

-   [Connect to remote MCP servers](https://modelcontextprotocol.io/docs/develop/connect-remote-servers).
-   [Configure MCP in an AI application](/mcp/configure-mcp-ai-application).

## Available tools

To view details of available MCP tools and their descriptions for the Database Insights MCP server, see the [Database Insights MCP reference](/alloydb/docs/reference/mcp/databaseinsights/mcp).

### List tools

Use the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector) to list tools, or send a `tools/list` HTTP request directly to the Database Insights remote MCP server. The `tools/list` method doesn't require authentication.

```
POST /mcp HTTP/1.1
Host: databaseinsights.googleapis.com
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "tools/list",
}
```

## Sample use cases

The following are sample use cases for monitoring AlloyDB using the Database Insights MCP server.

### Monitor query performance

You can use the Database Insights MCP server to identify slow queries and understand database workload patterns.

**Sample prompt:**

"Find the top 5 queries with the highest execution time on my AlloyDB instance in project PROJECT\_ID over the last hour."

**Workflow:** The workflow for monitoring query performance includes the following steps:

-   **Data fetching**: The agent calls the `query_metrics` tool with a PromQL query configured to fetch `alloydb.googleapis.com/database/postgresql/insights/perquery/execution_time`.

-   **Analysis**: The agent processes the returned time-series data to identify the queries with the highest accumulated execution time.

-   **Reporting**: The agent lists the query hashes and their respective execution times, helping you identify potential bottlenecks.


### System health check

You can monitor the resource utilization of your AlloyDB instances to ensure they are sized correctly and performing optimally.

**Sample prompt**:

"What has been the average CPU utilization and available memory for my AlloyDB instance INSTANCE\_ID over the past 24 hours?"

**Workflow**: The workflow for a system health check includes the following steps:

-   **Metric retrieval**: The agent uses the `system_metrics` tool to fetch `alloydb.googleapis.com/instance/cpu/average_utilization` and `alloydb.googleapis.com/instance/memory/min_available_memory` for the specified instance.

-   **Summarization**: The agent aggregates the data over the 24-hour period.

-   **Reporting**: The agent provides a summary of the CPU and memory trends, alerting you if utilization peaked near the limits.


## Optional security and safety configurations

MCP introduces new security risks and considerations due to the wide variety of actions that you can do with the MCP tools. To minimize and manage these risks, Google Cloud offers default settings and customizable policies to control the use of MCP tools in your Google Cloud organization or project.

For more information about MCP security and governance, see [AI security and safety](https://docs.cloud.google.com/mcp/ai-security-safety).

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

-   Read the [Database Insights MCP reference documentation](/alloydb/docs/reference/mcp/databaseinsights/mcp).
-   Learn more about [Google Cloud MCP servers](/mcp/overview).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
