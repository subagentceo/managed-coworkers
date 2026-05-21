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

Microsoft Dynamics 365 CRM integration overview

# Microsoft Dynamics 365 CRM integration overview

Cloud-based Customer Relationship Management platform

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Microsoft Dynamics Integration Overview

Connect Clay to your Dynamics CRM to:

-   Import Objects as a source
-   Lookup Objects
-   Update Objects
-   Create Objects

## Use Cases

There are many powerful use cases with the Microsoft Dynamics Integration. Examples include:

-   **Lead Scoring:** Build accurate lead scores from your enriched contacts.
-   **Customer Segmentation:** Sort customers, companies, and leads into custom industry categories.
-   **Automated Outbound:** Run outbound campaigns based on company size and industry.
-   **TAM Sourcing:** Build targeted lead lists using Clay to import back to your CRM.

## Setting up Dynamics integration

To set up the Dynamics 365 CRM Integration, follow these steps:

**Step 1:** Visit the **Settings** page and navigate to **Connections.**

**Step 2:** Click + Add Connection and select **Dynamics 365 CRM**.

**Step 3:** Enter the **domain** of your Dynamics 365 CRM and sign in to your Dynamics account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924f056fd233429264a5f1d_674e8160776fdbeaf8a74b30_673fb6279161b6781d8dcc11_673fb5b0ede09f3caa8e57b7_CleanShot%252525202024-11-21%25252520at%2525252012.06.13%252525402x.png)

**Step 4:** Name your account key.

Optionally, you can set this account as the default for your workspace.

## [‍](https://app.arcade.software/share/IiX3ez8JQvNmSDhn9F7w)Import your Microsoft Dynamics data into Clay

You can import your Dynamics data as a source for a new or existing table.

To get started:

### **Step 1:** Navigate to the **Source panel.**

To access source panel:

**New table:** In a workbook, click `+ Add` at the bottom. Search for `Microsoft` and select from the results.

**Existing Table:** In an existing table, open the table and select **Actions > Import** to configure Dynamics as a data source.

### **Step 2:** Select your Dynamics account

Choose the Dynamics account you wish to use for importing data. Ensure the selected account has the appropriate permissions to access the objects you need.

### Select 3: Import your objects

Specify the **Object Type** to import. Choose from Accounts, Leads, Contacts, or Opportunities

Optionally you can select a **view** to load data from and the fields you want to return. If left blank, all data will be imported for the selected **Object Type** and **Fields**.

### `Actions` Create Object

Select object and map out object type.

**Step 1:** Select your Dynamics 365 account.

**Step 2:** Specify **Object Type** to create.

This can be **Account**, **Contact**, **Lead**, or **Opportunity.**

**Step 3:** Map fields for created object.

Match the relevant fields from your Clay table to the corresponding Dynamics properties, ensuring data types and formats align.

**Step 4:** Configure run settings.

By default auto-update, any new row added to your Clay table will automatically create an object in Dynamics.  Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run enrichment to create an object.

### `Actions` Lookup Object

Check if an object exists in your Dynamics CRM.

**Step 1:** Select your Dynamics 365 account.

**Step 2:** Specify **Object Type** to lookup.

**Step 3:** Filter **Objects**

Define at least one field you want to filter by, then provide the corresponding filter values.

You can either type in these filter values directly or reference data from other columns.

**Step 4 (Optional):** Specify fields to return

Choose the fields you want to return. If no fields are selected, all available fields will return.

**Step 5:** Configure run settings.

By default auto-update, any new row added to your Clay table will automatically lookup for a matching object in Dynamics.  Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 5:** Run enrichment to lookup an object.

### `Actions` Update Object

Update an object in your Dynamics CRM.

**Step 1:** Select your Dynamics 365 account.

**Step 2:** Specify **Object Type** to update.

**Step 3:** Enter the **Object ID** to update.

**Step 4:** Map fields for created object.

Match the relevant fields from your Clay table to the corresponding Dynamics properties you want to update. Ensure that data types and formats align.

**Step 5:** Configure run settings.

By default auto-update, any new row added to your Clay table will automatically update the object in Dynamics.  Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 6:** Run enrichment to update an object.

‍

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