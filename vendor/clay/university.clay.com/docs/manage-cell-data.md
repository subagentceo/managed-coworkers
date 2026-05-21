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

Find

](/docs-topics/find)

/

Manage cell data

# Manage cell data

Learn how to manage cell data within your Clay table.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Inspect cell details

View and analyze enriched data or outputs within a specific cell.

To inspect cell details:

1.  Locate the cell you want to inspect.
2.  Click on the cell to open the cell details panel.

## Search within a cell

Quickly find specific data within a cell's outputs using the search feature.

To search for outputs in a cell:

1.  Click on the cell to open the cell details panel.
2.  Type a keyword or data point into the search bar to filter and display matching outputs.

## Cell output schema

A cell output schema describes how data is structured in an enrichment output. It shows:

-   **Keys and values:** Labels like "Company Name" or "Contact Email" with their corresponding data types (text, numbers, or lists).
-   **Organization:** Whether data is a single value (e.g., "John Doe") or a grouped list (e.g., multiple contacts).
-   **Nested data:** Information grouped under larger categories. For example, "Company Lookalikes" might contain "Lookalike #1" and "Lookalike #2," each with their own details.

## Lists

A list is an array of items grouped together in a single cell within an enrichment.

Lists use zero-based indexing, where the first item is at index 0, the second at index 1, and so on. For example, in a skills list, "Solution Selling" is at index 0, "Cloud Computing" is at index 1, and "Virtualization" is at index 2.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a2bbccf5fe904bd326_679b19a00f92a592a5db4e42_679b198ee4a342cb7a896aae_CleanShot%2525202025-01-15%252520at%25252002.39.34%2525402x.png)

## Take action on a list

In the **Cell details** panel, hover to the right of a list to access actions:

-   **Filter or find keywords:** Search for specific items using formulas.
-   **Turn items into rows:** Move each item into its own row in another table.
-   **Combine items into one text field:** Join all items into one line, separated by commas.
-   **Ask AI questions:** Get answers or summaries about the list.

## Cell size limits

Clay has two types of cell size limits:

-   **Basic columns** (text and formula columns): 8KB limit
-   **Action columns** (enrichment outputs): 200KB limit

The final step of a waterfall returns a basic column with an 8KB limit. If your waterfall contains large amounts of data, it may exceed this limit.

**Common scenarios where cell size limits are encountered:**

-   **Gong transcripts:** Often exceed the 200KB limit.
-   **Technology waterfall (BuiltWith):** Can output over 200KB; use keywords to filter.
-   **HTTP-API and webhooks:** May bring in over 200KB; use field-path filters.
-   **Extracting to basic columns:** May hit the 8KB limit when extracting large action fields.

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