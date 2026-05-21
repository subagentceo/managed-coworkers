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

Salesforce SOQL

# Salesforce SOQL

The Salesforce SOQL source enables you to import records from Salesforce by writing custom queries.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

The Salesforce SOQL source enables you to import records from Salesforce by writing custom queries, giving you complete control over which data to pull into Clay.

Use this when you need specific Salesforce records that don't match an existing list or report, want to query across related objects, or need complex filtering that's easier to express in SOQL.

## Creating a table with Salesforce SOQL

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for `Salesforce SOQL` and select from the results.
3.  In the modal, you will be asked to `Select Salesforce account`.
    -   If you haven't already connected your Salesforce account, click `+ Add account` and go through authentication.

### `Source` Import records from a Salesforce SOQL query

Build lists of Salesforce records using custom SOQL queries. Query across objects, apply complex filters, and select specific fields without creating dedicated lists in Salesforce first.

**Inputs:**

-   **SOQL Query:** Your SELECT statement with explicitly listed fields (e.g., `SELECT Id, Name, Industry FROM Account WHERE Industry = 'Technology' LIMIT 100`).
-   **Unique Fields (Optional):** Select which field(s) determine record uniqueness for deduplication (e.g., `Id`, `Email`).

**Query requirements:**

-   Must be a valid SELECT statement.
-   Fields must be explicitly named (no `SELECT *`).
-   Maximum 50,000 records per import.

**Pro tip:** Keep Salesforce's [**SOQL documentation**](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm) open while building queries. You can also use AI tools like Claude or ChatGPT to help generate SOQL queries from natural language descriptions.

## Best practices

### Start with test queries

Always test queries with a `LIMIT` clause before running them on large datasets:

-   `SELECT Id, Name FROM Account LIMIT 10`

### Query only needed fields

Selecting fewer fields makes queries faster and reduces permission errors:

✅ **Do this:**

-   `SELECT Id, Name, Industry FROM Account`

❌ **Avoid this:**

-   `SELECT Id, Name, Description, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, ... (20+ fields)`

### Use indexed fields for performance

Salesforce queries run faster when filtering on indexed fields like `Id`, `Name`, `CreatedDate`, and `SystemModstamp`.

### Be mindful of the 50,000 record limit

For larger datasets, break queries into smaller batches using `WHERE` conditions (e.g., by date ranges).

### Respect field-level security

Clay inherits Salesforce permissions from your connected user. If your query includes fields you don't have access to, it will fail with a permission error.

### Querying related objects

Use dot notation to pull data from parent objects:

```javascript
SELECT Id, FirstName, LastName, Account.Name, Account.Industry
FROM Contact
WHERE Account.Type = 'Customer'
```

## FAQs

### What Salesforce permissions do I need?

Your Salesforce user must have:

-   **View access** to objects and fields in your query
-   **API Enabled** permission
-   OAuth scopes: `api`, `refresh_token`, `id`, `profile`

### Why is my query failing with a "field not found" error?

Common causes:

1.  Typo in field name (case-sensitive)
2.  Field doesn't exist on that object
3.  Custom fields missing `__c` suffix (e.g., `MyCustomField__c`)
4.  Insufficient permissions

**Troubleshooting tip:** Test your query in Salesforce's Developer Console (Setup → Developer Console → Query Editor) to isolate whether the issue is with the query or Clay's connection.

### Can I use SOQL functions like COUNT() or aggregate queries?

Not currently. Clay's SOQL source only supports standard SELECT queries that return records.

**Workaround:** Import raw records and use Clay's formula columns to perform calculations.

### What happens if my query returns more than 50,000 records?

Clay will import the first 50,000 records and stop. Split your query using date ranges or filters to work with larger datasets.

### How do I query custom objects?

Use the API name with the `__c` suffix:

```javascript
SELECT Id, Name, Custom_Field__c
FROM Custom_Object__c
WHERE Status__c = 'Active'
```

### Can I schedule SOQL queries to run automatically?

Yes! Use Clay's auto-update feature to re-run your query on a schedule.

### Why am I getting rate limit errors?

Salesforce enforces API request limits. If you hit limits:

1.  Reduce query frequency
2.  Limit concurrent Salesforce operations
3.  Contact Salesforce support to increase your API allocation

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