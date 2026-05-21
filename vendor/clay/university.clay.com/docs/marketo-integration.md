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

Marketo integration

# Marketo integration

Create, update, and lookup Marketo objects directly from Clay.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Marketo is a marketing automation platform for managing leads and campaigns. With this integration, you can create, update, and look up Marketo objects directly from Clay, and connect Marketo via webhook to enrich inbound leads in real time.

## Enriching data with Marketo

1.  While in a Clay table, click `Add enrichment` and search for `Marketo`.
2.  Under `Integrations`, select one of the Marketo options.
3.  In the modal, you will be asked to `Select Marketo account`.
    -   If you haven't already connected your Marketo account, click `+ Add account` and go through authentication.

**Note:** When setting up a role in Marketo to connect with Clay, the role requires two minimum permissions: `Read-Write Schema Standard Field` and `Read-Write Schema Custom Field`. You will also need to grant access to any objects you'd like to work with in Clay (e.g., Leads, Companies). You can edit the role later to include other objects.

### `Action` Create object

Use this action to create a new object in Marketo.

**Inputs**

Required:

-   Object type: The Marketo object type you want to create. Select `Person` (leads) or `Company`.
-   Fields: Dynamic fields that appear after selecting an object type. For `Person`, `Email` is required. For `Company`, `Company Name` is required.

Optional:

-   Fields: All remaining fields for the selected object type, populated dynamically from your Marketo schema.

### `Action` Lookup object

Use this action to look up an existing object in Marketo.

**Inputs**

Required:

-   Object type: The Marketo object type you want to look up. Select `Person` (leads) or `Company`.
-   Filter type: The field to filter on, populated dynamically from the searchable fields for the selected object type.
-   Filter values: The value(s) to filter on. Accepts a comma-separated list. Matching is case-insensitive and uses OR logic.

Optional:

-   Remove blank values from results: When enabled, blank values are removed from the returned object — helpful for reducing response size. Defaults to on.

### `Action` Update object

Use this action to update an existing object in Marketo.

**Inputs**

Required:

-   Object type: The Marketo object type you want to update. Select `Person` (leads) or `Company`.
-   Marketo object ID: The ID of the Marketo object to update. You can retrieve this using the `Create object` or `Lookup object` action.

Optional:

-   Ignore blank values: When enabled, blank values from Clay will be ignored in Marketo. When disabled, blank values will overwrite existing Marketo field values. Defaults to on.
-   Fields: The fields to update, populated dynamically from your Marketo schema.

### Run settings

-   Auto-update: Recommended when writing enriched data back to Marketo, so that new or updated rows are automatically pushed.
-   Only run if: The enrichment will only run if conditions are met. ([**Learn more about conditional formulas here!**](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

## Connecting Marketo via webhook

Use webhooks to send data from Marketo to Clay for real-time lead enrichment. This is ideal for capturing inbound leads as they arrive — such as form fills, demo requests, or other lead events. After enrichment, you can use the Marketo enrichment actions above to write the enriched data back to Marketo.

1.  **Copy the webhook URL from Clay.** In a new or existing Clay table, locate the `Webhook URL` option and copy it. This is the endpoint Marketo will POST lead data to.
2.  **Go to the Admin area in Marketo.** Navigate to the `Admin` section in your Marketo instance.
3.  **Open Webhooks.** In the Admin area, click `Webhooks` in the left-hand menu.
4.  **Create a new webhook.** Click `New webhook` to begin configuration.
5.  **Configure the webhook.** Fill in the following details:
    -   `URL`: The webhook URL copied in step 1.
    -   `Header`: Add a custom header with the key `Content-Type` and the value `application/json`.
    -   `Request type`: POST
    -   `Request token encoding`: None
    -   `Response format`: JSON
    -   `Payload template`: Use the JSON template below, customizing fields as needed.

`{  "id": "{{lead.Id}}",    "first_name": "{{lead.FirstName}}",    "last_name": "{{lead.LastName}}",    "email": "{{lead.EmailAddress}}",    "title": "{{lead.JobTitle}}",    "company": "{{lead.CompanyName}}",    "industry": "{{lead.Industry}}",    "country_code": "{{lead.Country}}"   }`

## Troubleshooting

### Field values containing special characters are split incorrectly in Clay

If a lead field value contains an ampersand (`&`) — such as a job title like "VP & Head of Sales" — and you're using a form-encoded payload template in Marketo, the `&` will be interpreted as a field separator, causing the value to be split across multiple fields in Clay. To avoid this, use a JSON-formatted payload template (as shown in step 5 above). JSON handles special characters correctly and will not split values on `&`.

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

Enterprise

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