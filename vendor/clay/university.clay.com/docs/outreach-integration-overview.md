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

Outreach integration

# Outreach integration

AI-powered sales platform.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Outreach is a sales engagement platform that helps sales teams automate and optimize their outreach campaigns.

With this integration, you can create and update prospects, look up existing prospect data, add prospects to sequences, and find mailbox IDs in Outreach directly from Clay.

## Enriching data with Outreach

1.  While in a Clay table, click `Add enrichment` and search for `Outreach`.
2.  Under `Integrations`, select one of the Outreach options.
3.  In the modal, you will be asked to `Select Outreach account`.
    -   If you haven't already connected your Outreach account, click `+ Add account` and go through authentication.

### `Action` Update prospect

Use this action to update existing prospect records in Outreach.

-   **ID**
-   **Email**
-   **Basic information like name, company, title, etc. (Optional)**
-   **Address information (Optional)**
-   **Contact preferences (Optional)**
-   **Social media & websites (Optional)**
-   **Additional phone numbers (Optional)**
-   **Campaign & source information like tags, campaign name, event name, etc. (Optional)**
-   **Personal details like date of birth, gender, graduation date, etc. (Optional)**

### `Action` Create prospect

Use this action to create new prospect records in Outreach.

**Inputs**

-   **Email**
-   **Basic information like name, company, title, etc. (Optional)**
-   **Address information (Optional)**
-   **Contact preferences (Optional)**
-   **Social media & websites (Optional)**
-   **Additional phone numbers (Optional)**
-   **Campaign & source information like tags, campaign name, event name, etc. (Optional)**
-   **Personal details like date of birth, gender, graduation date, etc. (Optional)**

### Sending emails with `Create prospect`

When using this action, you may want to send emails to your new prospects. You can do this by adding email templates to your table and sending them with custom field inputs.

### `Action` Lookup prospect

Use this action to find and retrieve existing prospect data from Outreach.

**Inputs**

-   **Email (Optional)**
-   **Prospect ID (Optional)**
-   **Include Sequences (Optional)**

### `Action` Add to sequence

Use this action to add prospects to an Outreach sequence.

_Note: Sequences must be "Active" in Outreach for a lead to be successfully added._

**Inputs**

-   **Prospect ID**
-   **Sequence ID**
-   **Mailbox ID**

### `Action` Lookup mailbox by email address

Find the mailbox ID for a given email address in Outreach.

**Inputs**

-   **Email address**

## OAuth scopes

When connecting your Outreach account, Clay uses optional OAuth scopes to give you fine-grained control over permissions. Learn more about [optional scopes](https://university.clay.com/docs/oauth-optional-scopes).

### Required scopes

These permissions cannot be disabled and are always requested:

-   `users.all` — Read and write all users.
-   `stages.all` — Read and write all stages.
-   `sequenceSteps.all` — Read and write all sequence steps.
-   `sequenceStates.all` — Read and write all sequence states.
-   `sequences.all` — Read and write all sequences.
-   `roles.all` — Read and write all roles.
-   `recipients.all` — Read and write all recipients.
-   `prospects.all` — Read and write all prospects.
-   `opportunityStages.all` — Read and write all opportunity stages.
-   `opportunities.all` — Read and write all opportunities.
-   `mailboxes.all` — Read and write all mailboxes.
-   `events.all` — Read and write all events.

### Optional scopes (enabled by default)

These permissions are requested by default but can be disabled:

-   `tasks.all` — Read and write all tasks.
-   [`taskDispositions.read`](http://taskDispositions.read) — Read all task dispositions.
-   [`taskPriorities.read`](http://taskPriorities.read) — Read all task priorities.
-   [`taskPurposes.read`](http://taskPurposes.read) — Read all task purposes.

### Run settings

-   `Auto-update`
-   `Only run if:` The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

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