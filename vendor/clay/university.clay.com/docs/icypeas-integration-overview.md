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

Icypeas integration overview

# Icypeas integration overview

Email discovery and verification tool.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## **Getting started with Icypeas**

Icypeas in Clay allows you easily find the work email of a contact from Name and Company Domain.

We'll cover how to connect Clay to Icypeas, then we'll go over each action that is available with Icypeas.

But first let's talk a bit about data enrichment waterfalls.

## **Getting better email coverage with waterfall enrichments**

Icypeas is great for finding email contacts, but it's not the only way to get this data.

For better coverage on email data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008e3_674e8150e401f9a1c1ee7b21_6716f7ce0cd06acd251e66f6_6716f0610a861eae20fe9b38_66e2bdd50d837588b358d418_img-waterfall-find-work-email.png)

Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

That said, let's get into it on how to use Icypeas with Clay!

## **Connecting with Clay with Icypeas**

### **Option 1: Use the Clay-managed Icypeas account**

By default, Icypeas enrichments will use the Clay-managed Icypeas account. This means that any new enrichment will charge the designated credit amount. Simply pull up any Icypeas enrichment within Clay to use the Clay-managed Icypeas account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008ef_674e815a776fdbeaf8a747de_6719ff317ed99405c18f74db_6719ff15115c54de4ce91352_CleanShot%252525202024-10-24%25252520at%2525252004.01.28%252525402x.png)

### **Option 2: Add your own Icypeas API key**

If you are currently on a paid plan, you can use your own Icypeas account within Clay through an API key.

**Important:** API key usage is only available on paid plans. Please upgrade to access the API key.

‍

To obtain your Icypeas API key, follow these instructions within [Icypeas’ documentation](https://api-doc.icypeas.com/api-auth/access-keys).

You can easily add your Icypeas API key by selecting **Add account** through the enrichment panel. Below is an example of where you can access the account creation process:

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008ea_674e815a776fdbeaf8a747e9_6719ff317ed99405c18f74e3_6719ff2686aac9e74a2cfd2e_CleanShot%252525202024-10-23%25252520at%2525252016.17.18%252525402x.png)

### `Action` Find Work Email

The **Find Work Email** action helps you find the work email from the name and company domain of a contact.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008f3_674e815a776fdbeaf8a747db_6719ff317ed99405c18f74d1_6719ff2ec0e9ffdafbdbf1f7_CleanShot%252525202024-10-23%25252520at%2525252016.06.02%252525402x.png)

**Step 1: Choose the Icypeas account you want to use**

First, you can use either the Clay-managed Icypeas account or your own API key.

If you use the Clay-managed Icypeas account you will be charged at 1 credit per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://docs.clay.com/en/articles/9654103-how-clay-credits-work).

**Step 2: Enter email address**

You will need to enter the Full Name and Company Domain of person you want to find the Work Email for.

Optionally, you are also able to include catch-all emails.

**Step 3 (Optional): Select Auto-update**

By default, Icypeas will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

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