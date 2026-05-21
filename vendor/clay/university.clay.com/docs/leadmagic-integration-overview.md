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

Leadmagic integration overview

# Leadmagic integration overview

Accurate B2B data enrichment for improved prospecting and sales conversion.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## **Getting started with LeadMagic**

LeadMagic in Clay allows you to easily enrich company, find work email and mobile data, add or update lead using their social URL

There are many actions you can do with [LeadMagic](https://www.clay.com/integrations/data-provider/leadmagic), including:

-   Enrich Company
-   Find Mobile Number
-   Find Social Profile
-   Find Work Email
-   Validate Email

We'll cover how to connect Clay to LeadMagic, then we'll go over each action that is available with LeadMagic.

But first let's talk a bit about data enrichment waterfalls.

## **Getting better email and phone number coverage with waterfall enrichments**

LeadMagic is great for finding email and phone number contacts, but it's not the only way to get this data.

For better coverage on contact data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008e3_674e8150e401f9a1c1ee7b21_6716f7ce0cd06acd251e66f6_6716f0610a861eae20fe9b38_66e2bdd50d837588b358d418_img-waterfall-find-work-email.png)

Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

That said, let's get into it on how to use LeadMagic with Clay!

## **Connecting with Clay with LeadMagic**

### **Option 1: Use the Clay-managed LeadMagic account**

By default, LeadMagic enrichments will use the Clay-managed LeadMagic account. This means that any new enrichment will charge the designated credit amount. Simply pull up any LeadMagic enrichment within Clay to use the Clay-managed LeadMagic account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e164_674e81606e4a4c5575155f5b_671a7d7ec925722787a52ddb_671a72d2378cbfc221716805_CleanShot%252525202024-10-23%25252520at%2525252013.36.27%252525402x.avif)

### **Option 2: Add your own LeadMagic API key**

If you are currently on a paid plan, you can use your own LeadMagic account within Clay through an API key.

**Important:** API key usage is only available on paid plans. Please upgrade to access the API key.

‍

To obtain your LeadMagic API key

1.  Log in to your LeadMagic account.
2.  Navigate to your Account Profile.
3.  Locate the API Key section and copy your API key.

You can easily add your LeadMagic API key through the enrichment panel when selecting an account. Below is an example of where you can access the account creation process.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e15e_674e81606e4a4c5575155f58_671a7d7ec925722787a52df3_671a72e6c4e81c20d91ef4cf_CleanShot%252525202024-10-23%25252520at%2525252013.37.25%252525402x.avif)

### `Action` Enrich Company

The **Enrich Company** action enriches a company using their LinkedIn URL.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e167_674e81606e4a4c5575155f61_671aaa76a59961341adea5ab_671a73010a409592d154ab50_CleanShot%252525202024-10-23%25252520at%2525252013.55.05%252525402x.avif)

**Step 1: Choose the LeadMagic account you want to use**

First, you can use either the Clay-managed LeadMagic account or your own API key.

If you use the Clay-managed LeadMagic account you will be charged at 1 credit per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

Please input the Social URL of the company you want to enrich. Most commonly this will be a LinkedIn profile.

**Step 3 (Optional): Select Auto-update**

By default, LeadMagic will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e170_674e81606e4a4c5575155f97_671aaa76a59961341adea5a8_671a731f317c112175ab9aa6_CleanShot%252525202024-10-23%25252520at%2525252013.55.20%252525402x.avif)

### `Action` Find Mobile Number

The **Find Mobile Number** integration finds a person’s mobile number from their LinkedIn profile.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e150_674e81606e4a4c5575155f7e_671aaa77a59961341adea5d4_671a732a06e7644cd6e1e106_CleanShot%252525202024-10-23%25252520at%2525252013.54.36%252525402x.avif)

**Step 1: Choose the LeadMagic account you want to use**

First, you can use either the Clay-managed LeadMagic account or your own API key.

If you use the Clay-managed LeadMagic account you will be charged at 6 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

Please input the contact’s LinkedIn URL to find their mobile number.

**Step 3 (Optional): Select Auto-update**

By default, LeadMagic will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e161_674e81606e4a4c5575155f5e_671aaa77a59961341adea5c1_671a734ec02f0722655fb52f_CleanShot%252525202024-10-23%25252520at%2525252013.54.46%252525402x.avif)

### `Action` Find Social Profile

The **Find Social Profile** action finds a contact’s social profile from their work or personal email.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e15b_674e81606e4a4c5575155f75_671aaa75a59961341adea59d_671a735c825713264c0f86da_CleanShot%252525202024-10-23%25252520at%2525252013.44.23%252525402x.avif)

**Step 1: Choose the LeadMagic account you want to use**

First, you can use either the Clay-managed LeadMagic account or your own API key.

If you use the Clay-managed LeadMagic account you will be charged at 10 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

In this step, please input either the person’s work or personal email to obtain the social profile.

**Step 3 (Optional): Select Auto-update**

By default, LeadMagic will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece19b261c13eb56e174_674e81606e4a4c5575155f8e_671aaa75a59961341adea5a2_671a7365c4e81c20d91f67be_CleanShot%252525202024-10-23%25252520at%2525252013.44.33%252525402x.avif)

### `Action` Find Work Email

The **Find Work Email** helps find a person’s work email from name and company domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece19b261c13eb56e177_674e81606e4a4c5575155f7b_671aaa77a59961341adea661_671a73721c73a515da0f46c2_CleanShot%252525202024-10-23%25252520at%2525252013.58.40%252525402x.avif)

**Step 1: Choose the LeadMagic account you want to use**

First, you can use either the Clay-managed LeadMagic account or your own API key.

If you use the Clay-managed LeadMagic account you will be charged at 1 credit per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

Please input the person’s name and either the company domain to obtain the contact’s work email you are trying to find.

**Step 3 (Optional): Select Auto-update**

By default, LeadMagic will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e158_674e81606e4a4c5575155f78_671aaa77a59961341adea5d1_671a73953da503bf865bf0aa_CleanShot%252525202024-10-23%25252520at%2525252013.58.56%252525402x.avif)

### `Action` Validate Email

The **Validate Email** action helps you determine if an email address has a valid inbox.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e16d_674e81606e4a4c5575155f91_671a783b583a01a80b2f72be_671a73a0d156bb66275c6cae_CleanShot%252525202024-10-23%25252520at%2525252013.43.35%252525402x.avif)

**Step 1: Choose the LeadMagic account you want to use**

First, you can use either the Clay-managed LeadMagic account or your own API key.

If you use the Clay-managed LeadMagic account you will be charged at 1 credit per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

Please input the email you want to validate in this step.

**Step 3 (Optional): Select Auto-update**

By default, LeadMagic will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\)).

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ece09b261c13eb56e16a_674e81606e4a4c5575155f81_671a783b583a01a80b2f72c1_671a73a74e47f522c55d266c_CleanShot%252525202024-10-23%25252520at%2525252013.44.01%252525402x.avif)

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