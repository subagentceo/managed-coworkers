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

Apify integration

# Apify integration

Web scraping and automation platform providing data for AI and custom solutions.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Apify Integration Overview

With Clay’s Apify integration, you can quickly retrieve data from Apify actor runs or launch actors directly in Clay to get results on demand.

## Setting up in Apify

Login to Apify to select an actor. Select the scraper, and click `Create Task`. This will add it to your library of actors.

Switch from Manual to JSON and copy the body text. This will serve as your input data in Clay when you run the actor.

## Connecting to Apify in Clay

You can connect your Apify account to Clay in two ways:

### **Method 1: Connect Apify account within enrichment panel**

When running an Apify integration in Clay, you’ll be prompted to **Add account**.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557887_674e814e9f77c492b9e8904b_673659ffa0c8bc57cf3526f1_673659db6cb58d8f803f9022_CleanShot%252525202024-11-14%25252520at%2525252014.30.49.avif)

Add your API key and name it to create an account. You can find your API token on the [Integrations](https://console.apify.com/account#/integrations) page in the Apify Console.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557866_68e92e364ee010ce20086ddd_Gemini_Generated_Image_vytxz7vytxz7vytx.avif)

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557881_674e814e9f77c492b9e89048_673659ffa0c8bc57cf3526f4_673659f134ae46b9664ebd9c_CleanShot%252525202024-11-14%25252520at%2525252014.32.53.avif)

### **Method 2: Connect Apify account through Clay settings**:

Navigate to **Settings** > **Connections** in your Clay dashboard.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c755155787b_674e814e9f77c492b9e89051_673659ffa0c8bc57cf3526e2_673659d13de3d7c782251cc7_CleanShot%252525202024-11-14%25252520at%2525252014.29.35.avif)

Click on **Add Connection** and select Apify from the list.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557878_674e814e9f77c492b9e8904e_673659ffa0c8bc57cf3526e5_673659c05e6859d122b79549_CleanShot%252525202024-11-14%25252520at%2525252014.28.50.avif)

Enter your Apify API key to establish the connection.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c755155786f_674e814e9f77c492b9e8905d_673659ffa0c8bc57cf3526ee_673659b3680be050ed97744a_CleanShot%252525202024-11-14%25252520at%2525252014.27.32.avif)

## Using the Apify integration

**Step 1: Choose Apify integration**

To connect Apify as a source: In a workbook, click `+ Add` at the bottom. Search for `Apify` and select from the results.  
  

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c755155786c_674e814e9f77c492b9e8907b_673659ffa0c8bc57cf3526fa_673659a937a2ab9618dee6cb_CleanShot%252525202024-11-14%25252520at%2525252014.43.12%252525402x.avif)

If you are using Apify as an enrichment for an existing table, access the enrichment search bar by selecting **Add enrichment** in the top right corner. Type in “Apify” in the search bar and select **Run Apify Actor**.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c755155787e_674e814e9f77c492b9e8905a_673659ffa0c8bc57cf3526fd_6736599e37a2ab9618dee583_CleanShot%252525202024-11-14%25252520at%2525252014.47.43%252525402x.avif)

**Step 2: Select Apify account**

Within the enrichment pane, select your Apify account, and add your account if you haven’t already.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557872_674e814e9f77c492b9e89060_673659ffa0c8bc57cf3526e8_6736598e1331998c2e6705ea_CleanShot%252525202024-11-14%25252520at%2525252014.51.20%252525402x.avif)

**Step 3: Select Apify actor and configure input data**

Select the Apify actor you want to run. Then In the **Input Data** section, you’ll need to specify the data the actor will use. Enter the data body in JSON format.

When referencing column tokens (dynamic data from your Clay table), ensure the key is in quotes, but do not put quotes around the token itself. For example:

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557869_674e814e9f77c492b9e89054_673659ffa0c8bc57cf3526f7_67365984a0c8bc57cf351478_CleanShot%252525202024-11-14%25252520at%2525252015.02.42.avif)

**Step 4: Configure run settings**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true.

Autoupdate: By default, the auto-update automatically enriches new rows when they were added to the table. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

Conditional run: If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557875_674e814e9f77c492b9e89057_673659ffa0c8bc57cf3526eb_673659711331998c2e66e7a1_CleanShot%252525202024-11-14%25252520at%2525252015.05.43.avif)

Now you can run your Apify actor within your Clay table!

## Utilizing your Apify data

Click into the **Source Cell** for overlapping accounts to see all the data you pulled in from your Apify actor. From here, you can create new columns with the data or reference this data in an enrichment.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f12d44c14c7551557884_674e814e9f77c492b9e89088_6736dd391f2aea2cd7a4429e_6736dd1195cd9020db05b655_CleanShot%252525202024-11-15%25252520at%2525252000.28.56%252525402x.avif)

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