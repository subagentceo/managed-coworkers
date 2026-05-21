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

EmailBison integration

# EmailBison integration

Import leads into campaigns directly from Clay, ensuring accurate and efficient campaign execution.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

EmailBison is a lead management platform that enables seamless synchronization of lead data between Clay and campaign interfaces.

With this integration, you can import leads into campaigns directly from Clay, ensuring accurate and efficient campaign execution.

## Enriching data with EmailBison

1.  While in a Clay table, click `Add enrichment` and search for `EmailBison`.
2.  Under `Integrations`, select one of the EmailBison options.
3.  In the modal, you'll be asked to `Select EmailBison account`.
    -   If you haven't already connected your EmailBison account, click `+ Add account` and go through authentication.

### `Action` Create or update lead

Use this action to create a new lead in EmailBison or update an existing lead if one with the same email already exists.

**Inputs**

-   **Email:** The email address of the lead (required - used as unique identifier).
-   **First name:** The first name of the lead (required).
-   **Last name:** The last name of the lead (required).
-   **Existing lead behavior:** Choose how to handle updates to existing leads (required).
    -   **PATCH:** Only update provided fields, leaving other values unchanged.
    -   **PUT:** Replace all fields with new values.
-   **Title:** The job title of the lead (optional).
-   **Company name:** The company name of the lead (optional).
-   **Notes:** Additional notes about the lead (optional).
-   **Custom variables:** Any custom variables defined in your workspace (optional).

### `Action` Find lead

Use this action to look up an existing lead in EmailBison by email address or lead ID.

**Inputs**

-   **Email:** The email address of the lead to find (optional).
-   **Lead ID:** The EmailBison lead ID to find (optional).

_Note: You must provide either email or lead ID. If both are provided, email will be prioritized._

**Output**

-   **ID:** The unique lead identifier in EmailBison.
-   **Email:** Email address.
-   **First name:** First name.
-   **Last name:** Last name.
-   **Company:** Company name.
-   **Title:** Job title.
-   **Notes:** Any notes on the lead.
-   **Status:** Lead status.
-   **Tags:** Associated tags.
-   **Created at:** When the lead was created.
-   **Updated at:** When the lead was last updated.

### `Action` Import lead to campaign

Use this action to add qualified or updated leads from Clay into a designated EmailBison campaign for targeted outreach.

**Inputs**

-   **Email:** The email address of the lead to import into the campaign.
-   **Campaign ID:** The unique identifier of the EmailBison campaign to which the lead will be added.

**Output**

-   **Success:** Lead successfully added to the EmailBison campaign.
-   **Lead ID:** The unique identifier assigned to the lead in EmailBison.
-   **Campaign ID:** Confirmation of the campaign to which the lead was added.

### `Action` Add email to blocklist

Use this action to add an email address to your workspace's blocklist to prevent sending emails to that address.

**Inputs**

-   **Email:** The email address to add to your workspace's blocklist (required).

### `Action` Remove email from blocklist

Use this action to remove an email address from your workspace's email blocklist.

**Inputs**

-   **Email address (or blocklist email ID):** The email address to remove from the blocklist, or the ID of the EmailBison email blocklist entry to remove (required).

### `Action` Add domain to blocklist

Use this action to add an entire domain to your workspace's blocklist to prevent sending emails to any address at that domain.

**Inputs**

-   **Domain:** The domain to add to your workspace's blocklist (required).

### `Action` Remove domain from blocklist

Use this action to remove a domain from your workspace's domain blocklist.

**Inputs**

-   **Domain (or blocklisted domain ID):** The domain to remove from the blocklist, or the ID of the EmailBison domain blocklist entry to remove (required).

### Run settings

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