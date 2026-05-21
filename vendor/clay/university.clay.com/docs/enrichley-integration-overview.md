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

Enrichley integration overview

# Enrichley integration overview

Verify and validate risky emails to ensure accuracy and deliverability.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

### What is Enrichley?

Enrichley in Clay validates work emails to ensure they’re safe, reducing bounces, protecting your sender reputation, and improving deliverability.

We'll cover how to connect Clay to Enrichley, and then we'll go over how to validate an email with Enrichley.

### Connecting Clay with Enrichley

There are two options to connect Enrichley to Clay.

### Option 1: Use the Clay-managed Enrichley account

By default, Enrichley enrichments will use the Clay-managed Enrichley account. This means that any new enrichment will charge the 1 credit

Simply pull up any Enrichley enrichment within Clay to use the Clay-managed Enrichley account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659bcc7d6363728aed3c_674e81536f7ad240fd62bbc6_6719f8bc86aac9e74a26b005_6719f8666995b0004ca9de0e_CleanShot%252525202024-10-24%25252520at%2525252002.48.22%252525402x.png)

### Option 2: Use your own Enrichley API key

If you are currently on a paid plan, you can use your own Enrichley account within Clay through an API key.

**Important:** API key usage is only available on paid plans. Please upgrade to access the API key.

‍

You can add your Enrichley API key to Clay within the enrichment panel. Below is an example of where to add your API key.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659bcc7d6363728aed34_674e81536f7ad240fd62bbd4_6719f8bd86aac9e74a26b017_6719f882299eab62c7e5f653_CleanShot%252525202024-10-24%25252520at%2525252002.46.12%252525402x.png)

### How do you use Enrichley to validate your emails?

Enrichley’s **Validate Email** action helps you determine if the email address you’re sending to has a valid inbox. Follow the steps below to validate your emails with Enrichley.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659bcc7d6363728aed3f_674e81536f7ad240fd62bbd7_6719f8bd86aac9e74a26b014_6719f88e905bb6c7a9c3eaa9_CleanShot%252525202024-10-23%25252520at%2525252015.43.42%252525402x.png)

**Step 1: Select input Enrichley API key to create account**

You can use either the Clay-managed Enrichley account or bring your own key.

If you use the Clay-managed Enrichley account, you will be charged at 1 credit per enriched cell.

**Step 2: Select the email you want to verify**

For this step, input the email address you want to verify

**Step 3 (Optional): Select Auto-update**

By default, Enrichley will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update. However if you do so, you might run into stale data problems.

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659bcc7d6363728aed42_674e81536f7ad240fd62bbd1_6719f8bd86aac9e74a26b00b_6719f8a1f23fc99c7db48cb5_CleanShot%252525202024-10-23%25252520at%2525252015.47.31%252525402x.png)

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