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

Debounce integration overview

# Debounce integration overview

Validate and clean email lists for accurate and deliverable campaigns.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

### What is Debounce?

Debounce in Clay validates work emails to ensure they’re safe, reducing bounces, protecting your sender reputation, and improving deliverability.

### Connecting Clay with Debounce

There are two options to connect Debounce to Clay.

### Option 1: Use the Clay-managed Debounce account

By default, Debounce enrichments will use the Clay-managed Debounce account. This means that any new enrichment will charge the designated credit amount.

Simply pull up any Debounce enrichment within Clay to use the Clay-managed Debounce account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659a270bad2a0079cf7f_674e81527db69f17aab8073c_671a757de22b97165acef682_671a752f06e7644cd6e3be6f_validate.png)

‍

### Option 2: Use your own Debounce API key

If you are currently on a paid plan, you can use your own Debounce account within Clay through an API key.

**Important:** API key usage is only available on paid plans. Please upgrade to access the API key.

‍

To access your Debounce API key, please visit [app.debounce.io/api](https://app.debounce.io/api).

You can add your Debounce API key to Clay within the enrichment panel. Below is where you'd add your API key within the enrichment panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659a270bad2a0079cf7b_674e81517db69f17aab8072c_671a757de22b97165acef685_671a7563583a01a80b2cb105_CleanShot%252525202024-10-24%25252520at%2525252002.11.10%252525402x.png)

### How do you use Debounce to validate an email address?

Debounce’s **Validate Email** action allows you to verify one or multiple email addresses by simply inputting them.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659a270bad2a0079cf82_674e81527db69f17aab80746_671a757de22b97165acef688_671a756cdf0c6d608bfd0736_CleanShot%252525202024-10-23%25252520at%2525252015.58.24%252525402x.png)

**Step 1: Choose the Debounce account you want to use**

You can use either the Clay-managed Debounce account or bring your own key.

If you use the Clay-managed Debounce account, you will be charged at 1 credit per enriched cell.

**Step 2: Select the email(s) you want to verify**

With Debounce, you are able to input multiple emails to verify.

By default, emails classified as “risky” by Debounce will still be marked as valid. However, if the “Safe to Send” option is enabled, only emails that Debounce has classified as “Safe to Send” will be returned as valid.

When you **Exclude “Free” Emails**, you have the option of removing any email address that comes through a free domain (e.g. @gmail.com).

**Step 3 (Optional): Select Auto-update**

By default, Debounce will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select Conditional Run Criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659a270bad2a0079cf87_674e81527db69f17aab8073f_671a757de22b97165acef6b2_671a7574f4682b628ef5b70a_CleanShot%252525202024-10-23%25252520at%2525252016.00.39%252525402x.png)

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