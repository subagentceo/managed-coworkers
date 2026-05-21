-   [
    
    ​
    
    Overview
    
    ](/)
-   [
    
    ​
    
    Courses
    
    ](/courses)
-   [
    
    ​
    
    Docs
    
    ](/docs)
-   [
    
    ​
    
    Use case templates
    
    ](/use-case-templates)
-   [
    
    ​
    
    Certifications
    
    ](/certifications)
-   [
    
    ​
    
    Cohorts
    
    ](/cohorts)
-   [
    
    ​
    
    Clay.com
    
    ](https://www.clay.com/)

Doc Topics

[

Getting started

](/docs-topics/getting-started)

[

Find

](/docs-topics/find)

[

Enrich

](/docs-topics/enrich)

[

Transform

](/docs-topics/transform)

[

Web scraping

](/docs-topics/web-scraping)

[

Gen AI

](/docs-topics/gen-ai)

[

Export

](/docs-topics/export)

[

Settings & admin

](/docs-topics/data-destinations)

[

Signals & triggers

](/docs-topics/signals)

[

All docs

](/docs)

/

[

Export

](/docs-topics/export)

/

Databricks integration

# Databricks integration

Import, insert, update, upsert or look up rows in Databricks.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Databricks is a unified data and analytics platform for managing, transforming, and querying data at scale.

With this integration, you can connect to your Databricks workspace and perform SQL operations — such as importing, inserting, updating, upserting, or looking up rows — all directly from your Clay table.

## Connecting to Databricks

Clay supports two methods for authenticating your Databricks account. You can choose the one that fits your organization's setup when adding a new connection or when reconnecting an existing one.

-   **Service Principal** — the recommended method. You connect via OAuth M2M (machine-to-machine) with a Service Principal for secure, server-to-server authentication.
-   **Personal Access Token** — a simpler method using a personal access token. No OAuth configuration is required.

### Service Principal

Connect to Databricks using OAuth M2M with a Service Principal for secure, server-to-server access.

1.  In the home sidebar, click `Settings` → `Connections`.
2.  Click `Add connection` and search for `Databricks`.
3.  Under `Service Principal`, fill in the following fields:
    -   `Name your connection`: A descriptive name for this connection.
    -   `Use static IP?`: Optional. Use a static IP when connecting to ensure that enrichments are run from a static list of IP addresses, which can be useful for allow-listing.
    -   `Workspace URL`: Your Databricks workspace URL (e.g. `https://adb-1234567890123456.7.azuredatabricks.net/`).
    -   `Client ID`: The client ID from your Databricks Service Principal.
    -   `Client secret`: The client secret from your Databricks Service Principal.
4.  Click `Authenticate` to save the connection.

### Personal Access Token

Connect to Databricks using a Personal Access Token.

1.  In the home sidebar, click `Settings` → `Connections`.
2.  Click `Add connection` and search for `Databricks`.
3.  Under `Personal Access Token`, complete the authentication flow.
    -   You'll need to generate a Personal Access Token in your Databricks workspace. See [Databricks documentation](https://docs.databricks.com/aws/en/dev-tools/auth/pat) for instructions.

## Setting up the Databricks integration

1.  While in a Clay table, click `Add enrichment` and search for Databricks.
2.  Under `Integrations`, select one of the Databricks options.
3.  In the modal, you will be asked to `Select Databricks account`.
    -   If you haven't already connected your Databricks account, click `+ Add account` and go through authentication.

## Using the Databricks integration

### `Source` Import from Databricks

Use this action to pull data from a Databricks table into Clay.

**Inputs**

-   **Databricks SQL warehouse**
-   **SQL query**

### `Action` Lookup row

Use this action to check if a row exists in a Databricks table.

**Inputs**

-   **Databricks SQL warehouse**
-   **SQL query**

### `Action` Insert row

Use this action to insert a new row into a Databricks table.

**Inputs**

-   **Databricks SQL warehouse**
-   **Databricks catalog**
-   **Databricks schema**
-   **Databricks table**
-   **Column values to insert**

### `Action` Update row

Use this action to update existing rows in a Databricks table.

**Inputs**

-   **Databricks SQL warehouse**
-   **Databricks catalog**
-   **Databricks schema**
-   **Databricks table**
-   **WHERE clause**
-   **Column values to update**

### `Action` Upsert row

Use this action to insert or update a row in a Databricks table using a unique identifier.

**Inputs**

-   **Databricks SQL warehouse**
-   **Databricks catalog**
-   **Databricks schema**
-   **Databricks table**
-   **Unique key column**
-   **Column values to insert or update**

**Run settings**

-   **Auto-update**
-   **Only run if:** The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

](https://www.clay.com/pricing)

## Explore other docs

Find

### Scoreplex integration

Validate contact information, detect fraud risk, and discover social profiles

View article

[View article](/docs/scoreplex-integration)View article

Settings & admin

### MCP settings

Connect your Clay workspace to AI tools.

View article

[View article](/docs/mcp-settings)View article

Find

### Guide: Finding companies and people in Clay

Best practices to Clay's company and people search features.

View article

[View article](/docs/finding-companies-and-people-in-clay)View article

Find

### ContactLevel integration

Enrich contacts in Clay with SHA-256 hashed personal email addresses for use in high-match ad audiences.

View article

[View article](/docs/contactlevel-integration)View article

Enrich

### Google BigQuery integration

Import records from BigQuery into Clay using SQL queries, and send enriched data back by inserting, looking up, updating, or upserting rows in your BigQuery tables.

View article

[View article](/docs/google-bigquery-integration)View article

Find

### Enigma integration

View article

[View article](/docs/enigma-integration)View article

Find

### Vector integration

Find hashed emails with Vector.

View article

[View article](/docs/vector-integration)View article

## Other popular resources

Experts

### Find a Clay Expert

Explore our network of Clay experts and agencies.

View experts

[View experts](https://www.clay.com/experts)View experts

Community

### Join our slack community

Find help in our slack community, and support channels.

Go to slack

[Go to slack](https://community.clay.com)Go to slack

Cohorts

### Join a cohort, learn Clay fast!

The faster way to master Clay. Sign in if you're enrolled in a cohort (current or past) or apply!

Learn more about cohorts

[Learn more about cohorts](/cohorts)Learn more about cohorts

Talents

### Hire GTME Talent

Find and connect with GTM talent who've demonstrated expertise in building advanced workflows

Explore GTME talents

[Explore GTME talents](https://www.clay.com/talent)Explore GTME talents

## Explore, practice and master Clay

![Clay logo](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691f411366a473645359848d_clay-logo.avif)

Powered education

[

![Go to linkedin page](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691f43d42bf3bbe05953cffb_LinkedIn%2C%20LinkedIn%20Brand%20Mentions.avif)

Linkedin

](https://www.linkedin.com/company/grow-with-clay/posts/?feedView=all)[

![Go to youtube page](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691f43d488f69c05d83a1d71_YouTube.avif)

Youtube

](https://www.youtube.com/@GrowWithClay/videos)[

![Join our slack community](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691f43d4f37ea0be2ff2fd18_Claymation.avif)

Slack community

](https://www.clay.com/slack-community)

Explore Clay

-   [Visit Clay.com](https://www.clay.com)
-   [Integrations](https://www.clay.com/integrations)
-   [Multi-provider data enrichment](https://www.clay.com/waterfall-enrichment)
-   [Sculptor](https://www.clay.com/sculptor)
-   [AI Claygent](https://www.clay.com/claygent)
-   [Audiences](https://www.clay.com/audiences)
-   [Sequencer](https://www.clay.com/sequencer)
-   [Pricing](https://www.clay.com/pricing)
-   [Changelog](https://www.clay.com/changelog)

Get started here

-   [Get started lesson](https://university.clay.com/lessons/intro-to-clay-101-fete-jigsaw)
-   [Clay 101](https://university.clay.com/courses/clay-101)
-   [Enroll in Clay cohorts](https://university.clay.com/cohorts)

Engage

-   [Find a Clay experts](https://www.clay.com/experts)
-   [Hire a GTME talent](https://www.clay.com/talent)
-   [GTM job board](https://www.clay.com/job-board)
-   [Community](https://community.clay.com/)
-   [Join Slack](https://www.clay.com/slack-community)
-   [FAQ](https://clay.com/faq)

Legal

-   [Privacy policy](https://privacy.clay.com/policies)
-   [Terms of service](https://www.clay.com/terms-of-service)
-   [Do not sell my data](https://docs.google.com/forms/d/e/1FAIpQLSeAsU1U-AJfhqzDx6-6eVcyQ_kBD1J9cw1y0huQiS-HCkRf0Q/viewform)

© Clay 2025 – Born in Brooklyn. Claymation illustrations by the wonderful [Hudson Christie](https://www.hudsonchristie.com/).