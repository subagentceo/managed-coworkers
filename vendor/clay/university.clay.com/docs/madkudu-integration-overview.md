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

Madkudu integration overview

# Madkudu integration overview

Predictive intelligence platform boosting sales and marketing ROI via scoring.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## What is the Madkudu integration?

Start from an email address and get intent data and relevant signals. Clay's API key is setup to give a lead score for B2B SaaS, SMB Mid-market, sign up with Madkudu directly and use your own API key to create a custom score.

## Setting up Madkudu within Clay

You can score the leads within your table two ways.

### Option 1: Use the Clay-managed Madkudu Account

By default, Madkudu enrichments will use the Clay-managed Madkudu account. This means that any new enrichment will charge the designated credit amount.

Simply pull up any Madkudu enrichment within Clay to use the Clay-managed Madkudu account.

Please note the lead scores from the Clay account assumes a generic score as if you are selling a B2B SaaS product to larger companies.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a3936a92f201ba1f5e_674e815fcaf4a74398b80791_672afdb221d98dcfc6b3bb63_672afc36c21c0fb947f80434_CleanShot%252525202024-10-25%25252520at%2525252019.27.42.png)

### (Recommended) Option 2: Use your own Madkudu API key

If you are currently on a paid plan, you can use your own Madkudu account within Clay through an API key.

**If you have your own Madkudu account, it’s recommended that you link your API key to given that lead scores are best when customized.**

To access your Madkudu API key, please visit [Madkudu's documentation](https://support.madkudu.com/hc/en-us/articles/360036533372-MadKudu-API).

You can add your Madkudu API key to Clay within the enrichment panel. Below is an example of where add your API key within the enrichment panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a3936a92f201ba1f64_674e815fcaf4a74398b80780_672afdb221d98dcfc6b3bb5d_672afd528593a867cbad796d_CleanShot%252525202024-10-25%25252520at%2525252019.27.51.png)

### How do you use Madkudu within Clay?

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a3936a92f201ba1f6c_674e815fcaf4a74398b80794_672afdb321d98dcfc6b3bb80_672afd8513b8d09bddc50a12_CleanShot%252525202024-10-31%25252520at%2525252018.15.41%252525402x.png)

**Step 1: Choose the Madkudu account you want to use**

You can use either the Clay-managed Madkudu account or bring your own key.

If you use the Clay-managed Madkudu account, you will be charged at 1 credit per enriched cell.

**Step 2: Input the email address for company lead scoring**

Please input the email address of the person you are lead scoring.

**Step 3 (Optional): Configure run settings**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true.

Autoupdate: By default, the auto-update automatically enriches new rows when they were added to the table. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

Conditional run: If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in \[this Clay University lesson\]([https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional runs (which make use,personal emails for all rows).)](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 4: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a3936a92f201ba1f69_674e815fcaf4a74398b80797_672afdb321d98dcfc6b3bb7d_672afd94871881309de9a404_CleanShot%252525202024-10-31%25252520at%2525252018.29.31%252525402x.png)

**Step 5: Click into the enriched cell to verify the data**

Click into the enriched cell.

You can verify enriched data to assess lead score. Indicators like low customer fit scores and personal email domains help identify lower-priority leads for efficient prioritization.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a3936a92f201ba1f61_674e815fcaf4a74398b8079a_672afdb221d98dcfc6b3bb60_672afd9d1ba414606cc808c7_CleanShot%252525202024-10-25%25252520at%2525252019.32.27.png)

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