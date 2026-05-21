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

Enrich

](/docs-topics/enrich)

/

Google BigQuery integration

# Google BigQuery integration

Import records from BigQuery into Clay using SQL queries, and send enriched data back by inserting, looking up, updating, or upserting rows in your BigQuery tables.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Google BigQuery is a fully managed, serverless data warehouse built for large-scale analytics. With this integration, you can import records from BigQuery into Clay using SQL queries, and send enriched data back by inserting, looking up, updating, or upserting rows in your BigQuery tables.

## Create a table with Google BigQuery

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for `Google BigQuery` and select it from the results.
3.  In the modal, you will be asked to `Select Google BigQuery account`.
    -   If you haven't connected BigQuery yet, click `+ Add account` and upload your service account JSON key file. Follow the prompts to assign the required IAM roles, or use [Google's service account docs](https://developers.google.com/workspace/guides/create-credentials#service-account).

### `Source` Import data from BigQuery

Imports records from Google BigQuery into a Clay table using a custom SQL query.

**Inputs**

-   SQL query: A `SELECT` or `WITH` statement to run against your BigQuery project. Use standard SQL syntax (e.g., `SELECT * FROM \\`project.dataset.table `WHERE created_at > "2024-01-01"`).
-   Unique identifier: The column to use for row deduplication. This field appears as a dropdown after you enter a valid query — select a column that contains unique values for each record.

**Note:** The Import Data from BigQuery source supports up to 50,000 rows per run.

## Enrich data with Google BigQuery

1.  While in a Clay table, click `Add enrichment` and search for `Google BigQuery`.
2.  Under `Integrations`, select one of the options.
3.  In the modal, you will be asked to `Select Google BigQuery account`.
    -   If you haven't already connected your Google BigQuery account, click `+ Add account` and upload your service account JSON key file.

### `Action` Insert row into BigQuery

Inserts a new row into a Google BigQuery table using streaming inserts for high throughput.

**Inputs**

Required:

-   Dataset ID: The BigQuery dataset to insert into. Displays as a dropdown populated from your connected account.
-   Table ID: The table to insert into. Displays as a dropdown populated from the selected dataset.

Optional:

-   Column mapping: Map Clay values to each table column. Columns are dynamically loaded from the selected table's schema. Columns marked `Required` in BigQuery will be flagged as required in the mapping.

**Outputs**

-   Inserted Count: The number of rows successfully inserted.

### `Action` Lookup row in BigQuery

Looks up rows in a Google BigQuery table by matching one or more column values.

**Inputs**

Required:

-   Dataset ID: The BigQuery dataset to search. Displays as a dropdown populated from your connected account.
-   Table ID: The table to search. Displays as a dropdown populated from the selected dataset.
-   Lookup column(s): The column(s) to filter by. Select multiple columns to combine search conditions.
-   Search operator: (Required if multiple lookup columns are selected.) Choose `AND` to require all conditions to match, or `OR` to require at least one to match.
-   \[Column name\] value: The value to search for in each selected lookup column. One input field appears per selected column.

Optional:

-   Returned fields: Select which columns to return in the output. Leave empty to return all columns.
-   Limit: The maximum number of matching rows to return. Defaults to 10; maximum is 1,000.

**Outputs**

-   Row data: Returns the column values of matching rows, dynamically based on the selected table's schema and the `Returned fields` configuration.

### `Action` Update row in BigQuery

Updates rows in a Google BigQuery table that match a specified WHERE clause.

**Inputs**

Required:

-   Dataset ID: The BigQuery dataset containing the table. Displays as a dropdown populated from your connected account.
-   Table ID: The table to update. Displays as a dropdown populated from the selected dataset.
-   WHERE clause: The filter condition identifying rows to update (e.g., `WHERE email = "john@example.com"`). Must begin with the `WHERE` keyword.

Optional:

-   Column mapping: The columns to update and their new values. Columns are dynamically loaded from the selected table. Leave a field empty to keep the existing value in that column.

**Outputs**

This action does not return output values.

### `Action` Upsert row in BigQuery

Inserts a new row or updates an existing row in a Google BigQuery table using a `MERGE` statement.

**Inputs**

Required:

-   Dataset ID: The BigQuery dataset to upsert into. Displays as a dropdown populated from your connected account.
-   Table ID: The table to upsert into. Displays as a dropdown populated from the selected dataset.
-   Lookup field: The column to match on when determining whether to insert a new row or update an existing one.

Optional:

-   Column mapping: Map Clay values to each table column. Columns are dynamically loaded from the selected table.

**Outputs**

This action does not return output values.

### Run settings

-   Auto-update: Recommended for keeping BigQuery data in sync as new rows are added or updated in your Clay table.
-   Only run if: The enrichment will only run if conditions are met. ([Learn more about conditional formulas](https://university.clay.com/docs/conditional-formulas)).

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

Find

### Enigma integration

View article

[View article](/docs/enigma-integration)View article

Find

### Vector integration

Find hashed emails with Vector.

View article

[View article](/docs/vector-integration)View article

Enrich

### CB Insights

Enrich company records with funding history, valuations, revenue ranges, industry classifications, and more.

View article

[View article](/docs/cb-insights)View article

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