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

Guide: Ways to save Clay credits

# Guide: Ways to save Clay credits

Make the most out of your Clay credits.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Guide: Ways to Save Clay Credits

Clay credits are valuable resources that help you save both time by automating manual work and money on go-to-market resources. By optimizing how you use credits, you can ensure your workflows remain efficient while delivering the results you need growth. This guide outlines a few best practices to help you get the most out of your credits.

## Pause enrichments for new entries by turning off auto-update

**How does this save credits?**

Auto-update allows Clay to enrich any new rows added to your table automatically. While this can be helpful when your table is set up for a fully automated workflow, it can also result in unnecessary credit usage if rows are added by mistake or before you’re ready.

The best practice here is to **turn off auto-update** while building your table. Once your setup is finalized, you can turn it back on when you’re ready to launch and start enriching new entries.

**How do you implement this?**

To turn off auto-update for a column, go to **Run Settings** and toggle off the Auto-Update button.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4558542415e81f0082e_674e814edd898a9e4c23a583_67182796c58ecf6a84a49a9d_67180d01969ef81c792b7b63_CleanShot%252525202024-10-21%25252520at%2525252023.33.36%252525402x.avif)

You can also “turn off” an entire table from auto-updating by clicking the three little dots next to your table name, then click on “Auto-Update Columns”.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4568542415e81f0083a_674e814edd898a9e4c23a586_67182796c58ecf6a84a49aa3_67180d17b684eeb70008cf4e_CleanShot%252525202024-10-21%25252520at%2525252023.32.50%252525402x.avif)

## Leveraging your API Keys

**How does this save credits?**

If you are on a paid plan and have credits with other data providers, Clay allows you to integrate your own API keys, giving you the flexibility to use those resources directly within your workflows.

**How do you use your own API key?**

You can access adding your API key two ways:

1.  Profile picture  > Settings > Navigation Bar
2.  Go to your profile picture in the top right corner, navigate to Settings, and head over to the Connections section. From there, you can add your API keys to the Clay panel.
3.  Enrichment Panel > Account > Add Account
4.  When setting up an enrichment that accepts an API key, you can add an account linked to your API key. By default, Clay’s API key will be selected, but if you want to use your own, simply switch to your account by selecting **Add Account**.

Some common API keys you can swap out:

-   **OpenAI API keys**
-   **Anthropic**
-   **Apollo** (_Make sure to use the correct API key for the specific service you are integrating)_
-   **Email Providers** (e.g., Findymail, Prospeo)**‍**
-   **Email Verifiers** (e.g., Debounce, NeverBounce)

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4558542415e81f00828_674e814edd898a9e4c23a58c_67182796c58ecf6a84a49a93_67180d666ad244cd09467c9e_CleanShot%252525202024-10-21%25252520at%2525252023.36.50%252525402x.avif)

You can add your own API keys when you select the account your enrichment runs on (Paid Feature)

## Qualify leads before enriching

**How does this help conserve credits?**

By adjusting the order of enrichments, you can save credits by enriching only the leads that meet specific criteria. If you have leads that can be disqualified early in the process, filtering them out ensures that only qualified contacts are enriched, preventing unnecessary credit usage.

**How do you implement this?**

You can set up **conditional runs** or use **AI formulas** to filter rows based on specific criteria (e.g., location, company size, or industry) to enrich only the contacts that are most relevant to your criteria.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4558542415e81f0082b_674e814edd898a9e4c23a5ad_67182796c58ecf6a84a49aa0_67180f3d602119d53cca96c2_CleanShot%252525202024-10-21%25252520at%2525252023.40.12%252525402x.avif)

Here is an example of a way to use AI formulas to filter out leads

‍

## Test out your data

**How does this save credits?**

When using a new integration, it’s best to start by testing a small sample—about 10 rows—before running the entire column. This allows you to identify and fix any errors in advance (ex. import errors, column filter error)

For AI enrichments, prompts may need several iterations to get right, so testing and refining your prompts before running the full enrichment will help ensure better results.

**How do you implement this?**

Before running an enrichment, you can test it on 10 rows or apply it to the entire column. This gives you flexibility in troubleshooting and improving your setup before committing fully.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4558542415e81f00837_674e814edd898a9e4c23a5a4_67182796c58ecf6a84a49a9a_671825f00da5388030b99334_CleanShot%252525202024-10-21%25252520at%2525252023.29.42%252525402x.avif)

## Conditional runs

**How does this save credits?**

Conditional formulas help you conserve credits by ensuring that enrichments only run when specific conditions are met. Instead of enriching every row, you can create rules that limit enrichments to only the most relevant rows, such as leads that meet certain criteria. This prevents unnecessary enrichments on disqualified or low-priority leads, allowing you to use credits more efficiently.

**How do you implement this?**

There are two ways to implement conditional runs:

**Method #1: Conditional Runs**

1.  Go to the **Run Settings** of any enrichment column.
2.  In the **“Only run if”** box, add your conditional formula to specify when the enrichment should run.
3.  **Tip:** Use the **“Use AI”** button to input plain language instructions, making it easier to define your conditions without needing complex formulas.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4558542415e81f00831_674e814edd898a9e4c23a5a1_67182796c58ecf6a84a49a97_67182609898b1c3a97094d2a_CleanShot%252525202024-10-21%25252520at%2525252023.30.49%252525402x.avif)

**Method #2: Filter Existing Rows**

You can also conditionally run columns through filtering rows.

Filtered views only enriches the rows you're viewing so this can be used as a way to run enrichments conditionally

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f4558542415e81f00834_674e814edd898a9e4c23a589_67182795c58ecf6a84a49a87_67182615ea07206bf07a513f_CleanShot%252525202024-10-22%25252520at%2525252011.09.01%252525402x.avif)

## Look up existing data to avoid duplicate enrichments

If you’ve already enriched contacts in another table or your CRM, you can use **Lookup** columns to pull that existing data, saving credits by avoiding duplicate enrichments. Before running a new enrichment, check if the data already exists in your CRM or another Clay table. If it does, use a Lookup column to pull the data into your current table.

**How do you implement this?**

1) Pull Data from Your CRM  
‍

‍  
2) Leverage Data from Other Tables  
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