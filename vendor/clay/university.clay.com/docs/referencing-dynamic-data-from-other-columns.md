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

Getting started

](/docs-topics/getting-started)

/

Referencing dynamic data from other columns

# Referencing dynamic data from other columns

Reference data from other columns for AI prompting, formulas, and message drafting.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Reference an endpoint from a column

You can use forward slash (`/`)  to access the menu to reference enrichment data from other columns.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578cd_67606c04de2d266d3cb5532a_67606ad3bd3c6aef8766a3f3_CleanShot%2525202024-12-16%252520at%25252003.20.09%2525402x.avif)

## Use cases for dynamic column referencing

Dynamic referencing allows you to reference and insert fields — like a contact’s name, location, or company — into formulas, prompts, or message drafts.

### Formula generator

Use dynamic data to build formulas that pull in fields like names, locations, or domains.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578dc_67606c04de2d266d3cb55341_67606ae4fc32d2868dd76752_CleanShot%2525202024-12-16%252520at%25252003.23.43%2525402x.avif)

### Prompt editor

Referencing dynamic fields within AI enrichments is a key step for data orchestration in Clay.

The **Prompt Editor** lets you insert dynamic fields to customize content for specific use cases. For example, you can add the **Company Website** field for account research.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578c4_67606c05de2d266d3cb553b9_67606afc1bd33d2f599cc18b_CleanShot%2525202024-12-16%252520at%25252003.25.51%2525402x.avif)

### Message drafting

When writing messages, you can use dynamic data to personalize content with fields like **First Name**, **Location**, or **current experience**.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578d6_67606c05de2d266d3cb553ad_67606b0a52526badc2e6428b_CleanShot%2525202024-12-16%252520at%25252003.32.26%2525402x.avif)

## Required fields for AI prompt editors

In the **Prompt Editor**, the **Required to Run** toggle ensures your AI enrichments only run when specific fields contain data. This helps avoid errors caused by empty or incomplete rows

### Setting required fields

To mark a field as required or unnecessary:

1.  Open the **Prompt Editor** where you are configuring your enrichment.
2.  Identify the field that must contain data before the enrichment runs (e.g., **Created At**).
3.  Optionally, you can toggle **Required to Run** next to the selected field. When enabled, the cell actwill be skipped if the referenced field does not contain a value.  
    
4.  Save your prompt configuration.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578d9_67606c04de2d266d3cb5533b_67606b1dfc32d2868dd7a270_CleanShot%2525202024-12-16%252520at%25252003.55.58%2525402x.avif)

## Types of data you can reference from enrichment columns

When working with enrichment columns in Clay, you can reference data at multiple levels:

1.  **Entire enrichment**: Access all data returned by an enrichment at once.
2.  **Entire Lists**: Reference all items in a list as a complete dataset.
3.  **Individual List Items**: Extract a specific item within a list and access all its properties.
4.  **Specific Endpoints**: Drill down into an item to reference specific fields, such as a URL or title.

### **Entire enrichment**

You can reference all the data returned by an enrichment, giving you access to every endpoint within that enrichment.

**Example**

Let’s say you want to reference all the data from a **Website Summary** enrichment:

1.  Locate the **Website Summary** column, which contains the enrichment results.
2.  Select **Insert all properties** to reference the entire enrichment.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578c7_67606c05de2d266d3cb55359_67606b4156a4d15f48181143_CleanShot%2525202024-12-16%252520at%25252001.52.25%2525402x.avif)

### **Entire lists**

You can reference all items within a list, giving you access to the complete set of data at once.

This is useful when you need to process or extract information for all entries in the list.

**Example**

Let’s say you want to pull the first names of all employees in a list:

1.  Locate the **“people”** list, which contains multiple items.
2.  Select **Insert all items** to reference the entire list.
3.  Extract the **first\_name** property from the list with formulas.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578ca_67606c04de2d266d3cb5533e_67606b532dc5cd1c048b8210_CleanShot%2525202024-12-16%252520at%25252001.57.19%2525402x.avif)

### **Individual list items**

You can reference specific items within a list when a column returns multiple results.

Referencing an item gives you access to **all the data** contained within it, including its individual endpoints.

**Example**

Let’s say you want to reference the first employee from a list of employees:

1.  Locate the **“people”** list, which contains multiple items.
2.  Expand the first item (Index **0**) to view its details.
3.  Referencing this item gives you access to all its data, such as **name**, **first\_name**, **last\_name**, and **url.**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578d3_67606c04de2d266d3cb55344_67606b738778e70f3e6007ee_CleanShot%2525202024-12-16%252520at%25252002.03.54%2525402x.avif)

### **Specific endpoints**

You can drill down into an **item** within a list to reference its specific fields **endpoints**. This allows you to target and pull precise details, such as a URL or title, from within an individual item.

**Example**

Let’s say you want to reference the **URL** of the latest experience from a contact. You can:

1.  Locate the **“experience”** list, which contains multiple items, or in this case experiences.
2.  Expand the first item (Index **0**) to access its details.
3.  From the item, select the specific endpoint, such as url. This allows you to reference endpoints such as the **URL** of the experience, **title** of the role, **company** name, or a **summary** of the experience.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edf1704aa4a4b49578d0_67606c04de2d266d3cb55338_67606b87230ab113ad9f8065_CleanShot%2525202024-12-16%252520at%25252002.11.02%2525402x.avif)

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