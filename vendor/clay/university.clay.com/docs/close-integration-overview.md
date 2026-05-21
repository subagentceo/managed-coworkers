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

Close integration overview

# Close integration overview

Streamlined CRM software for team productivity.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Setting up the Close Integration

To set up the Close and Clay integration, follow these steps:

1.  Visit the Settings page and navigate to **Connections.**
2.  Click **\+ Add Connection** and select Close the menu
3.  Enter your Close API key and name your Account. Reference [Close’s API key guide](https://help.close.com/docs/api-keys-oauth) for more help.

## Import Close contacts into Clay as a source

You can use Close as a source for a new or existing table.

To set up Close as a source:

**Step 1:** Select Close source option.

In a workbook, click `+ Add` at the bottom. Search for `Close` and select from the results.

‍

**Step 2:** Select the Close account you want to use.

**Step 3:** Fill out Auth fields to connect to Close’s database.

## Available Close actions

Within your Clay table and workbook, you’re able to run the following Close-supported actions:

-   Lookup Objects
-   Create Leads
-   Update Leads
-   Create Contact
-   Update Contact
-   Subscribe to Sequence

### `Action` Lookup Objects

Lookup an Object (Lead, Contact) in your Close CRM.

To run the Lookup Objects action:

**Step 1:** Select the **Close account** you want to use.

**Step 2:** Specify the object you are looking up

**Step 3:** Build your Query to filter contacts

Use the [**Visual Query Builder**](https://developer.close.com/resources/advanced-filtering/#visual-query-builder) to construct a query. Paste the output into the query field and adjust it to include your Clay variables.

**Step 4:** Configure run settings

By default, new rows within your Clay table will automatically run this action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run your enrichment to lookup an object.

### `Action` Create Leads

To run the Create Leads action:

**Step 1:** Select the **Close account** you want to use.

**Step 2:** Map lead fields

Map the relevant fields for the lead you want to create. Click **Refresh Fields** to update, and leave optional fields blank if not needed.

**Step 4:** Configure run settings

By default, new rows within your Clay table will automatically run this action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run your enrichment to create a lead.

### `Action` Update Leads

Update a lead in your Close CRM

To run the Update Leads action:

**Step 1:** Select the **Close account** you want to use.

**Step 2:** Specify Lead ID

Enter the Lead ID to update. Use the **Lookup Object** action if you don’t know the Lead ID.

**Step 3:** Map lead fields

Map the relevant fields for the lead you want to update. Click **Refresh Fields** to update, and leave optional fields blank if not needed.

**Step 4:** Configure run settings

By default, new rows within your Clay table will automatically run this action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run your enrichment to update a lead.

### `Action` Create Contact

To run the Create Contact action:

**Step 1:** Select the **Close account** you want to use.

**Step 2:** Map contact fields

Map the relevant fields for the contact you want to create. Click **Refresh Fields** to update, and leave optional fields blank if not needed.

**Step 4:** Configure run settings

By default, new rows within your Clay table will automatically run this action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

### `Action` Update Contact

Update a contact in your Close CRM.

To run the Update Leads action:

**Step 1:** Select the **Close account** you want to use.

**Step 2:** Specify Contact ID

Enter the Contact ID to update. Use the **Lookup Object** action if you don’t know the Contact ID.

**Step 3:** Map Contact fields

Map the relevant fields for the contact you want to update. Click **Refresh Fields** to update, and leave optional fields blank if not needed.

**Step 4:** Configure run settings

By default, new rows within your Clay table will automatically run this action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run your enrichment to update a contact.

### `Action` Subscribe to Sequence

To run the Subscribe to Sequence action:

**Step 1:** Select the **Close account** you want to use.

**Step 2:** Specify Contact and Sequence ID

Enter the Contact and Sequence ID. Use the **Lookup Object** action if you don’t know these IDs.

**(Optional) Step 3:** Enter additional Sequence information

Optionally, you can also specify the following fields for your contact: **Sender Account ID**, **Sender**, **Assign Calls To**, and **From Phone Number.**

**Step 4:** Configure run settings

By default, new rows within your Clay table will automatically run this action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run your enrichment to subscribe a contact to a sequence.

‍

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