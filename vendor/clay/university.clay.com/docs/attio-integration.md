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

Attio integration

# Attio integration

Pull your Attio records directly into a table as a source and push enriched data back by creating, updating, or upserting records across any Attio object.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Attio is a modern, data-driven CRM built for high-growth teams. Within Clay, you can pull your Attio records directly into a table as a source and push enriched data back by creating, updating, or upserting records across any Attio object. Common workflows include:

-   **Inbound enrichment:** Connect lead sources to Clay, enrich across 150+ data providers, and push complete records to Attio with scoring and routing.
-   **Outbound prospecting:** Build lists in Clay or import Attio records, enrich with company data and intent signals, and push back as qualified deals.
-   **CRM maintenance:** Schedule automatic refreshes to keep records current with job changes, funding rounds, and company updates.

## Creating a table with Attio

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for `Attio` and select from the results.
3.  In the modal, you will be asked to `Select Attio account`.
    -   If you haven't already connected your Attio account, click `+ Add account` and authorize Clay to access your Attio workspace via OAuth.
    -   **_Note:_** _Only Attio workspace admins can authorize this connection._
4.  Select a source and configure its inputs.

### `Source` Import records

Imports records from an Attio object into your Clay table.

**Inputs:**

-   `Object`: The Attio object to import records from (e.g., People, Companies). Populated dynamically from your connected account.
-   `View (optional)`: A saved view in Attio to filter the records by. Populated dynamically from your connected account. If provided, takes precedence over the custom `Filter` query. If neither are provided, all records are returned.
-   `Filter (optional)`: A JSON filter query to narrow which records are imported. See [**Attio's filtering and sorting docs**](https://docs.attio.com/rest-api/guides/filtering-and-sorting) for syntax. Ignored if a `View` is selected.
-   `Sort (optional)`: A JSON sort query to order the imported records. See [**Attio's filtering and sorting docs**](https://docs.attio.com/rest-api/guides/filtering-and-sorting) for syntax.
-   `Limit (optional)`: The maximum number of records to import. The maximum is 50,000 records.

### `Source` Import records from list

Imports records from a specific Attio list into your Clay table.

**Inputs:**

-   `List`: The Attio list to import records from. Populated dynamically from your connected account.
-   `Filter (optional)`: A JSON filter query to narrow which records are imported from the list. See [Attio's filtering and sorting docs](https://docs.attio.com/rest-api/guides/filtering-and-sorting) for syntax.
-   `Sort (optional)`: A JSON sort query to order the imported records. See [Attio's filtering and sorting docs](https://docs.attio.com/rest-api/guides/filtering-and-sorting) for syntax.
-   `Limit (optional)`: The maximum number of records to import. The maximum is 50,000 records.

## Enriching data with Attio

1.  While in a Clay table, click `Add enrichment` and search for `Attio`.
2.  Under `Integrations`, select one of the Attio actions.
3.  In the modal, you will be asked to `Select Attio account`.
    -   If you haven't already connected your Attio account, click `+ Add account` and authorize Clay to access your Attio workspace via OAuth.
    -   **_Note:_** _Only Attio workspace admins can authorize this connection._

### `Action` Create record

Creates a new record in an Attio object. Costs 1 credit per run.

**Inputs:**

-   `Object`: The Attio object to create the record in (e.g., People, Companies). Populated dynamically from your connected account.
-   `Object Schema (optional)`: Attribute fields for the record, populated dynamically based on the selected object. Use these to set values on the new record.

**Outputs:**

-   `Record`: The newly created Attio record.

### `Action` Lookup records

Looks up existing records in an Attio object. Returns up to 10 matching records.

**Inputs:**

-   `Object`: The Attio object to search for records in. Populated dynamically from your connected account.
-   `Record ID (optional)`: The UUID of the record to look up. (Required if no Object Schema attribute filters are provided.)
-   `Object Schema (optional)`: Attribute fields to filter records by, populated dynamically based on the selected object. (Required if Record ID is not provided.)
-   `Extract data by field paths (optional)`: JSON path filters to extract or remove specific fields from the response.

**Outputs:**

-   `Records`: An array of up to 10 matching Attio records.

### `Action` Update record

Updates an existing record in an Attio object by its Record ID. Costs 1 credit per run.

**Inputs:**

-   `Multiselect Behavior`: How to handle multiselect attribute values when updating — either `Append multiselect values` (adds to existing values) or `Overwrite multiselect values` (replaces existing values).
-   `Object`: The Attio object containing the record to update. Populated dynamically from your connected account.
-   `Record ID`: The UUID of the record to update.
-   `Object Schema (optional)`: Attribute fields to update, populated dynamically based on the selected object.

**Outputs:**

-   `Record`: The updated Attio record.

### `Action` Upsert record

Creates a new record or updates an existing one in an Attio object, matched on a unique attribute. Costs 1 credit per run.

**Inputs:**

-   `Object`: The Attio object to upsert the record in. Populated dynamically from your connected account.
-   `Matching Attribute`: The unique attribute to use when determining whether to create or update a record (e.g., email address, domain). Populated dynamically from the writable, unique attributes on the selected object.
-   `Object Schema (optional)`: Attribute fields for the record, populated dynamically based on the selected object.

**Outputs:**

-   `Record`: The created or updated Attio record.

### Run settings

-   **Auto-update:** Recommended when you want new rows added to your Clay table to automatically sync back to Attio.
-   **Only run if:** The enrichment will only run when specified conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/guide/conditional-formulas))

## Best practices

-   **Start with lookup:** Use the free `Lookup records` action first to check for duplicates before creating new records.
-   **Use upsert when uncertain:** If you're unsure whether a record already exists in Attio, use `Upsert record` instead of `Create record` to avoid duplicates.
-   **Enable auto-update for syncing:** Turn on auto-update when you want new rows added to your Clay table to automatically sync back to Attio.
-   **Use conditional runs:** Apply conditional formulas to control when records sync back to Attio based on data quality, enrichment status, or other criteria.

## FAQs

### What Attio objects can I use with Clay?

Any standard or custom object in your Attio workspace is supported. The `Object` dropdown is populated dynamically from your connected Attio account, so all available objects will appear automatically.

### What is the difference between Upsert record and Update record?

`Update record` requires a specific Record ID and always modifies an existing record. `Upsert record` matches on a unique attribute (e.g., email address or domain) and will update a record if a match is found, or create a new one if not. Use Upsert when you're unsure whether a record already exists in Attio.

### What is the difference between the View and Filter inputs?

`View` lets you select a saved view from your Attio workspace, which applies any filters and segments already configured in that view. `Filter` accepts a raw JSON filter query for custom filtering logic. If both are provided, the `View` takes precedence and the `Filter` is ignored.

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