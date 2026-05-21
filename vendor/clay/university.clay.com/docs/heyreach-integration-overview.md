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

HeyReach integration

# HeyReach integration

LinkedIn automation software.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

HeyReach is an automation platform that helps sales teams and agencies automate multi-sender outreach campaigns at scale. Within Clay, you can use HeyReach to add leads directly to your campaigns and map personalization variables for custom sequences.

## Enriching data with HeyReach

1.  While in a Clay table, click `Add enrichment` and search for `HeyReach`.
2.  Under `Integrations`, select one of the HeyReach actions.
3.  In the modal, you will be asked to `Select HeyReach account`.
    -   If you haven't already connected your HeyReach account, click `+ Add account` and enter your API key. You can find your API key by going to `Integrations` > `HeyReach API` in your HeyReach account.

**Note:** Before running this action, you must create an active campaign in HeyReach. Campaigns cannot be created from within Clay.

### `Action` Add Lead to Campaign

Use this action to add a lead to an existing HeyReach campaign from a professional profile URL.

**Inputs**

Required:

-   **Campaign ID:** The HeyReach campaign you want to add the lead to. Displays as a dropdown populated from your HeyReach account.
-   **First name:** The first name of the lead.
-   **Last name:** The last name of the lead.
-   **Professional URL:** The profile URL of the lead (e.g., `https://linkedin.com/in/examplename`).

Optional:

-   **LinkedIn account:** The LinkedIn sender account you want to use for the campaign. If left empty, leads will be automatically assigned to any active LinkedIn sender in the campaign.
-   **Location:** The lead's location (e.g., `London`).
-   **Company name:** The company where the lead is employed.
-   **Current position:** The lead's current job title.
-   **Email address:** The lead's email address.
-   **Summary:** A brief summary of the lead.
-   **About:** Additional information about the lead. Supports formula mode.
-   **Custom fields:** Key-value pairs for personalization variables used in your HeyReach sequences. Custom field names must exactly match the variable names you defined in HeyReach and can only contain alphanumeric characters and underscores (e.g., `my_custom_field`).

**Outputs**

-   **Added Leads Count:** The number of leads successfully added to the campaign.
-   **Updated Leads Count:** The number of existing leads updated in the campaign.
-   **Failed Leads Count:** The number of leads that failed to be added.

### Run settings

-   **Auto-update:** Recommended for trigger-based campaigns so that new rows added to Clay are automatically pushed to HeyReach.
-   **Only run if:** The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

## Troubleshooting

### Custom field values aren't being personalized in my sequences

Custom field names in Clay must be an exact match to the variable names in your HeyReach sequence (e.g., a Clay custom field named `AI_icebreaker` will only populate a HeyReach variable also named `AI_icebreaker`). Spaces in field names are automatically converted to underscores. Only alphanumeric characters and underscores are supported.

### My campaign shows "Finished" status in HeyReach

This is expected behavior for a newly created campaign. Once Clay adds the first lead, the campaign status will update to "Ongoing."

### Leads are not being added to the campaign

Ensure your HeyReach campaign was created with `Create empty list` and is designated as a lead list. The campaign must be Active for leads to be added successfully.

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