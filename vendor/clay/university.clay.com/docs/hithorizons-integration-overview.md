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

HitHorizons integration overview

# HitHorizons integration overview

Europe-focused company data provider.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

### What is HitHorizons?

The HitHorizons integration in Clay gives you access to firmographic data on over 80 million European companies, including sales, employee count, industry, and location.

### Setting up HitHorizons and Clay

You can connect HitHorizons in Clay two ways.

### Option 1: Use the Clay-managed HitHorizons account

By default, HitHorizons enrichments in Clay use the Clay-managed HitHorizons account, which charges one credit for each enrichment.

To utilize this, simply open any HitHorizons enrichment within Clay.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d810_674e81591ca3b15ecc5c9a13_6731a0a0bf257dde56ebbd08_67319216d9c1ba17f3b3e983_CleanShot%252525202024-11-01%25252520at%2525252005.02.42%252525402x%25252520\(1\).png)

### Option 2: Use your own HitHorizons API key

If you are currently on a paid plan, you can use your own HitHorizons account within Clay through an API key.

To access your HitHorizons API key, head over to **My Account > My Services > API Dashboard.**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d807_674e81591ca3b15ecc5c99f2_6731a0a0bf257dde56ebbcfa_6731921eefa10fbd48c43386_CleanShot%252525202024-11-01%25252520at%2525252005.04.54%25252520\(1\).png)

You can then access your API key by selecting **API Management > Resend Key.**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d7ff_674e81591ca3b15ecc5c99ef_6731a0a0bf257dde56ebbcee_6731922fa22914011e5504c3_CleanShot%252525202024-11-01%25252520at%2525252005.07.17%25252520\(1\).png)

You can add your HitHorizons API key to Clay within the enrichment panel. The image below shows where to add your API key in the enrichment panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d825_674e81591ca3b15ecc5c9a0d_6731a0a0bf257dde56ebbd05_67319247ea942fb4bed038a8_CleanShot%252525202024-11-01%25252520at%2525252005.09.42%252525402x%25252520\(1\).png)

### `Action` Find EMEA Company Firmographics

The **Find EMEA Company Firmographics** helps find company sales, employee count, industry code, and location based on Government data. This integration works best when both Company Name and Country are inputted.

**Step 1: Select Find EMEA Company Firmographics**

Access this action through the integration panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d804_674e81591ca3b15ecc5c9a0a_6731a0a0bf257dde56ebbcf7_6731926124ef91a4104c7181_CleanShot%252525202024-11-01%25252520at%2525252003.34.31%252525402x.png)

**Step 2: Select HitHorizons Account**

Proceed with either a Clay-managed or a personal account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d80a_674e81591ca3b15ecc5c9a32_6731a0a0bf257dde56ebbd0b_6731926c91f7134a65262fd8_CleanShot%252525202024-11-01%25252520at%2525252005.09.42%252525402x%25252520\(2\).png)

**Step 3: Input Company data**

This integration works best when both company name and country are inputted. More information will lead to better results searches.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d80d_674e81591ca3b15ecc5c9a23_6731a0f68cf692eceeaee922_67319288755dee25179320b4_CleanShot%252525202024-11-01%25252520at%2525252005.14.24%252525402x.png)

**Step 4: Configure run settings**

Auto-update: HitHorizons will automatically enrich any new rows that get added to the table. Learn more about auto-update in this [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

Conditional runs: To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. See [this Clay University lesson.](<https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional runs \(which make use,personal emails for all rows\).>)

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e6595df4a0b9292375fe6_674e814e3eeb5b64242d8f2a_672b09c329e5f9706170c4bd_672b09aafbb01b1ebb824e5f_CleanShot%252525202024-11-01%25252520at%2525252003.05.26%252525402x.png)

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa43832e5c673d828_674e81591ca3b15ecc5c9a10_6731a0f68cf692eceeaee94e_6731a0d8f33d960c26bf1001_CleanShot%252525202024-11-01%25252520at%2525252005.17.28%252525402x.png)

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