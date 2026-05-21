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

Mixrank integration overview

# Mixrank integration overview

High-frequency data platform for sales, marketing, and investment insights.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## **Getting started with Mixrank**

[Mixrank](https://www.clay.com/integrations/data-provider/mixrank) in Clay allows users to enrich a person's profile using their email address or find their personal email address from their LinkedIn or Twitter profiles.

There are two actions you can do with [Mixrank](https://www.clay.com/integrations/data-provider/mixrank), including:

-   Enrich Person from Email
-   Find Personal Email

We'll cover how to connect Clay to Mixrank, then we'll go over each action that is available with Mixrank.

But first let's talk a bit about data enrichment waterfalls.

## **Getting better email coverage with waterfall enrichments**

Mixrank is great for finding email contacts, but it's not the only way to get this data.

For better coverage on email data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008e3_674e8150e401f9a1c1ee7b21_6716f7ce0cd06acd251e66f6_6716f0610a861eae20fe9b38_66e2bdd50d837588b358d418_img-waterfall-find-work-email.png)

Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

That said, let's get into it on how to use Mixrank with Clay!

## **Connecting with Clay with Mixrank**

By default, all Mixrank actions within Clay are handled through your Clay account. There’s no need to set up an additional Mixrank account or input an API key.

Each Mixrank action will deduct two credits from your Clay account.

### `Action` Enrich Person from Email

The **Enrich Person from Email** action enriches a person using a personal or work email address.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a4c90e6f5cefe3674b_674e816139447050ee86fa61_671a7464cd6df4bffa68331e_671a7430a7fa3767e11e9bc2_CleanShot%252525202024-10-23%25252520at%2525252017.14.54%252525402x.png)

**Step 1: Enter email address**

Please enter the email address of the person you are trying to enrich

**Step 2 (Optional): Select Auto-update**

By default, Mixrank will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 3 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 4: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a4c90e6f5cefe36748_674e816139447050ee86fa69_671a7463cd6df4bffa683306_671a743949e947f2a173dcbd_CleanShot%252525202024-10-23%25252520at%2525252017.15.12%252525402x.png)

### `Action` Find Personal Email

The **Find Personal Email** action helps you find a person’s personal email address using their LinkedIn URL or Twitter Profile.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a4c90e6f5cefe3674e_674e816139447050ee86fa79_671a7464cd6df4bffa68331b_671a7443553ee16745b14ebf_CleanShot%252525202024-10-23%25252520at%2525252017.19.04%252525402x.png)

**Step 1: Enter either Social URL (LinkedIn) or Twitter URL**

Enter either the LinkedIn or Twitter URL of the person whose personal email address you are trying to find.

**Step 2 (Optional): Select Auto-update**

By default, Mixrank will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 3 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 4: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a4c90e6f5cefe36753_674e816139447050ee86fa85_671a7463cd6df4bffa68330a_671a745fe13de15f66a5a771_CleanShot%252525202024-10-23%25252520at%2525252017.19.16%252525402x.png)

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