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

HubSpot integration

# HubSpot integration

All-in-one CRM platform for marketing, sales, and customer service.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

HubSpot is a customer relationship management (CRM) platform that helps businesses manage sales, marketing, and customer service.

With this integration, you can import, create, update, and manage HubSpot objects directly in Clay.

## Enriching data with HubSpot

1.  While in a Clay table, click `Add enrichment` and search for `HubSpot`.
2.  Under `Integrations`, select one of the HubSpot options.
3.  In the modal, select your HubSpot account.
    -   If you haven't connected your HubSpot account yet, click `+ Add account` and complete authentication.

### `Source` Import objects from HubSpot

Use this source to import objects from HubSpot into Clay.

**Inputs**

-   **Object type:** The type of HubSpot object to import.
-   **List to pull objects from (Optional):** Select a list to pull objects from. If no list is selected, all objects will be pulled.
-   **Include read-only properties? (Optional):** Include all HubSpot calculated fields for each contact (e.g., `hs_analytics_first_timestamp`). If not selected, only editable properties will be included (e.g., `domain`).
-   **Exclude empty properties? (Optional):** Exclude all empty properties from the response. If not selected, all properties will be included, even those with empty values.

### `Action` Create object

Use this action to create an object in HubSpot.

**Inputs**

-   **Object type:** The type of HubSpot object to create.

### `Action` Lookup object

Use this action to look up an object in HubSpot.

**Inputs**

-   **Object type:** The type of HubSpot object to look up.
-   **Remove blank values from results (Optional):** Helpful for reducing result size.
-   **Limit (Optional):** Maximum number of objects to return. Defaults to 10.

### `Action` Update object

Use this action to update an object in HubSpot.

**Inputs**

-   **Object type:** The type of HubSpot object to update.
-   **HubSpot Object ID:** The unique identifier of the object to update.

### `Action` Create association

Use this action to create an association between two objects in HubSpot.

**Inputs**

-   **From object type:** The type of the source object.
-   **To object type:** The type of the target object.
-   **Association type:** The type of association to create.
-   **From Object ID:** The ID of the source object.
-   **To Object ID:** The ID of the target object.

### `Action` Retrieve associated objects

Use this action to retrieve associations between two objects in HubSpot.

**Inputs**

-   **From object type:** The type of the source object.
-   **To object type:** The type of the target object.
-   **From object ID:** The unique identifier of the object you want to look up associations for.
-   **Remove blank values from results (Optional):** Exclude empty properties from the response.
-   **Include read-only properties (Optional):** Include calculated fields in the response.
-   **Limit (Optional):** Maximum number of objects to return. Defaults to 20.

### `Action` Find owner

Use this action to find a HubSpot owner by ID or email address.

**Inputs**

-   **Owner ID (Optional):** The HubSpot owner ID to search for. If both ID and email are provided, the email will be validated against the owner found by ID.
-   **Email (Optional):** The email address to search for. If both ID and email are provided, the email will be validated against the owner found by ID.

## OAuth scopes

When connecting your HubSpot account, Clay uses optional OAuth scopes to give you fine-grained control over permissions.

Learn more about [optional scopes](https://university.clay.com/docs/oauth-optional-scopes).

### Required scopes

These permissions cannot be disabled and are always requested:

-   [`crm.lists.read`](http://crm.lists.read) — View contact list details.
-   [`crm.objects.contacts.read`](http://crm.objects.contacts.read) — View contact properties and details.
-   [`crm.objects.companies.read`](http://crm.objects.companies.read) — View company properties and details.
-   [`crm.objects.leads.read`](http://crm.objects.leads.read) — View lead properties and details.
-   [`crm.objects.owners.read`](http://crm.objects.owners.read) — View details about users assigned to CRM records.
-   [`crm.schemas.companies.read`](http://crm.schemas.companies.read) — View company property settings.
-   [`crm.schemas.contacts.read`](http://crm.schemas.contacts.read) — View contact property settings.

### Optional scopes (enabled by default)

These permissions are requested by default but can be disabled:

-   `crm.objects.companies.write` — Create, delete, or edit companies.
-   `crm.objects.contacts.write` — Create, delete, or edit contacts.
-   `crm.objects.leads.write` — Create, delete, or edit leads.
-   [`crm.schemas.custom.read`](http://crm.schemas.custom.read) — View custom object definitions.
-   [`crm.objects.custom.read`](http://crm.objects.custom.read) — View custom objects.
-   `crm.objects.custom.write` — Create, delete, or edit custom objects.
-   [`crm.objects.deals.read`](http://crm.objects.deals.read) — View deal properties and details.
-   \[`crm.objects.deals](<http://crm.objects.deals>).write` — Create, delete, or edit deals.
-   [`crm.schemas.deals.read`](http://crm.schemas.deals.read) — View deal property settings.

### Optional scopes (disabled by default)

These permissions are available but not requested by default:

-   [`automation.sequences.read`](http://automation.sequences.read) — View sequence details.
-   `automation.sequences.enrollments.write` — Enroll contacts in a sequence.

### Run settings

-   **Auto-update**
-   **Only run if:** The enrichment will only run when conditions are met. [Learn more about conditional formulas](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

Pro

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