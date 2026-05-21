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

ClearoutPhone integration overview

# ClearoutPhone integration overview

Validate phone numbers for accuracy, line type, and global outreach.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

### What is ClearoutPhone?

ClearoutPhone validates phone numbers by checking if they are active and identifying the line type (e.g., mobile or landline). It supports global numbers but requires a country code for non-US numbers to ensure accuracy.

### Setting up ClearoutPhone and Clay

You can connect ClearoutPhone in Clay two ways.

### Option 1: Use the Clay-managed ClearoutPhone account

By default, ClearoutPhone enrichments in Clay use the Clay-managed ClearoutPhone account, which charges one credit for each enrichment.

### Option 2: Use your own ClearoutPhone API key

If you are currently on a paid plan, you can use your own ClearoutPhone account within Clay through an API key.

Within ClearoutPhone, you’re able to access your API key through the API Section of your settings.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65985b1a18cd686ebcc3_674e8150caf4a74398b7feb6_672b0b799b09aec870609e18_672b0b3aaf6d63a749a7ca99_CleanShot%252525202024-11-01%25252520at%2525252012.41.58%252525402x.png)

You can add your ClearoutPhone API key to Clay within the enrichment panel. The image below shows where to add your API key in the enrichment panel.

### `Action` Check Phone Line Type & Status

The **Check Phone Line Type & Status** action helps you verify if a phone number is active and determines the type of line (e.g., mobile or landline).

**Step 1: Check Phone Line Type & Status**

Access this action through the integration panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65985b1a18cd686ebcc0_674e8150caf4a74398b7fead_672b0b799b09aec870609df9_672b0b452c7f77c562ce4dfc_CleanShot%252525202024-11-01%25252520at%2525252003.40.06%252525402x.png)

**Step 2: Select ClearoutPhone account**

Proceed with either a Clay-managed or a personal account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65985b1a18cd686ebcc9_674e8150caf4a74398b7feb3_672b0b799b09aec870609df6_672b0b4f96b80ca285054141_CleanShot%252525202024-11-01%25252520at%2525252012.43.28%252525402x.png)

**Step 3: Enter phone number additional setup information**

Input the phone number you are trying to verify. Additionally, you can also add the following information to better search results:

-   **Country (Optional)**: Select a country to refine results to a specific region.
-   **Mobile Phone Only (Optional)**: Toggle on if you only want results with mobile phone numbers.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65985b1a18cd686ebcc6_674e8150caf4a74398b7feaa_672b0b799b09aec870609df1_672b0b5d8593a867cbb8c206_CleanShot%252525202024-11-01%25252520at%2525252012.48.32%252525402x.png)

**Step 4: Configure run settings**

Auto-update: HitHorizons will automatically enrich any new rows that get added to the table. Learn more about auto-update in this [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

Conditional runs: To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. See [this Clay University lesson](<https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional runs \(which make use,personal emails for all rows\).\)>).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e6595df4a0b9292375fe6_674e814e3eeb5b64242d8f2a_672b09c329e5f9706170c4bd_672b09aafbb01b1ebb824e5f_CleanShot%252525202024-11-01%25252520at%2525252003.05.26%252525402x.png)

**Step 5: Choose data to add as columns to table**

Select the data from the enrichment you want to add as columns to your table.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65985b1a18cd686ebcd0_674e8150caf4a74398b7feb0_672b0b799b09aec870609e0b_672b0b2eef5683ec8d2b9056_CleanShot%252525202024-11-01%25252520at%2525252012.53.52%252525402x.png)

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