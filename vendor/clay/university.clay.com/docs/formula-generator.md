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

Transform

](/docs-topics/transform)

/

Formulas

# Formulas

Generate formulas with AI to transform your data.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Clay formulas use JavaScript expressions to transform your data. The formula generator opens in a sidebar, allowing you to see your table while building formulas. When you reference a column like `{{Email}}`, Clay automatically passes the value from that column into your expression.

## **Generate formula with AI**

Clay's formula generator opens in a sidebar, allowing you to see your table and reference column data while building formulas.

To generate a formula with AI:

1.  Enter your formula instructions. Type `/` to insert a column reference.
2.  Click `Generate formula` to create your AI formula.

The sidebar highlights your formula column and any referenced columns, helping you validate your logic against real data. Click entries in referenced columns to jump to them in your table.

## **How Clay formulas work**

What's available in formulas:

-   **Standard JavaScript:** All standard JavaScript objects and methods including `Math`, `String`, `Array`, `Date`, `RegExp`, `Number`, `Object`, and more.
-   **Lodash:** Access the Lodash library using `_` for advanced data manipulation.
-   **Moment.js:** Use Moment.js with `moment` for date and time operations.
-   **Excel and Google Sheets functions:** Hundreds of familiar spreadsheet functions like `VLOOKUP`, `IF`, `SUM`, and `CONCATENATE` through the FormulaJS library.

## **AI formula generator examples**

Here are examples of formulas you can create with the formula generator:

-   Extract the domain from `{{Email}}`.
-   Use `{{LinkedIn URL}}` if available; otherwise use `{{LinkedIn Profile}}`.url.
-   Extract the text after @ in `{{Twitter Handle}}`.
-   Split `{{city}}` by comma, keep everything before the first comma, remove "Area" if present, then add quotes.
-   Extract the first word from `{{Column_1}}`, combine with `{{Column_2}}`, then remove all non-letter characters.
-   Calculate the number of days between `{{Created Date}}` and `{{Closed Date}}`.

## **Conditional run formulas**

Conditional run formulas control when enrichments execute, helping you save credits by running actions only when specific conditions are met.

**Where to find them:** In any enrichment panel, scroll to `Run Settings` and look for the `Only run if` option.

**Common use cases:**

-   Only run email enrichment if title contains "VP".
-   Only run headcount growth enrichment if company size is over 100 people.
-   Only run AI column if a news article was found.

To create a conditional run formula:

1.  In the enrichment panel, scroll to `Run Settings`.
2.  Click `Use AI` next to `Only run if`.
3.  Type your condition using `/` to reference columns (e.g., "Only run if headcount is greater than 40").
4.  Click `Generate formula`.

You can also write conditional formulas manually using JavaScript expressions that evaluate to `true` or `false`.

## **FAQs**

### **Can I create or change my formula without running it?**

Yes. When editing a formula, you'll see the option to `Save and don't run enrichments`. Clicking this prevents your formula from running on enrichment columns that cost credits. These columns will appear greyed out to indicate they're out of date.

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