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

Clearbit integration overview

# Clearbit integration overview

B2B data solutions for lead generation and marketing personalization.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

# **Getting started with Clearbit**

Clearbit in Clay offers powerful data enrichment actions to retrieve company and person information, including logos, contacts, and domains, based on website domains or email addresses.

There are many actions you can do with Clearbit, including:

-   Find Domain from Company Name
-   Find Logo
-   Enrich Company
-   Enrich Person and Company
-   Find Contacts

We'll cover how to connect Clay to Clearbit, then we'll go over each action that is available with Clearbit.

But first let's talk a bit about data enrichment waterfalls.

## **Getting better email coverage with waterfall enrichments**

Clearbit is great for finding email contacts, but it's not the only way to get this data.

For better coverage on email data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008e3_674e8150e401f9a1c1ee7b21_6716f7ce0cd06acd251e66f6_6716f0610a861eae20fe9b38_66e2bdd50d837588b358d418_img-waterfall-find-work-email.png)

Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

That said, let's get into it on how to use Clearbit with Clay!

## **Connecting with Clay with Clearbit**

### **Option 1: Use the Clay-managed Clearbit account**

By default, Clearbit enrichments will use the Clay-managed Clearbit account. This means that any new enrichment will charge the designated credit amount. Simply pull up any Clearbit enrichment within Clay to use the Clay-managed Clearbit account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638d9_674e8150e401f9a1c1ee7b24_671a7ece312778445b2889c7_671a79d5312778445b245f9c_CleanShot%252525202024-10-23%25252520at%2525252012.53.32%252525402x.avif)

### **Option 2: Add your own Clearbit API key**

If you are currently on a paid plan, you can use your own Clearbit account within Clay through an API key.

**Important:** API key usage is only available on paid plans. Please upgrade to access the API key.

‍

For more information on how to find your Clearbit API key, please see reference [Clearbit’s documentation](https://help.clearbit.com/hc/en-us/articles/6045527495191-Access-your-Clearbit-API-key). Please note that API keys are available for Clearbit accounts created in 2023 and earlier. If you signed up in 2024, API keys are not available regardless of plan.

You can add your Clearbit API key through the enrichment panel. Below is an example of where add your API key within the enrichment panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638dc_674e8150e401f9a1c1ee7b27_671a7f7d4f3ff4bda4d076ce_671a6a7ade4d02509ca4a365_CleanShot%252525202024-10-23%25252520at%2525252012.54.04%252525402x.avif)

### `Action` Find Domain from Company Name

The **Find Domain from Company Name** action helps you find a company’s domain from a given name.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638ca_674e8151e401f9a1c1ee7b76_671a7f7d4f3ff4bda4d076e5_671a6a9e034700a201c0444b_CleanShot%252525202024-10-23%25252520at%2525252014.36.06%252525402x.avif)

**Step 1: Choose the Clearbit account you want to use**

First, you can use either the Clay-managed Clearbit account or your own API key.

If you use the Clay-managed Clearbit account you won’t be charged any credits.

**Step 2: Enter company name**

Please input the Company Name you want to find the domain for.

**Step 3 (Optional): Select Auto-update**

By default, Clearbit will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson.](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\))

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638df_674e8151e401f9a1c1ee7b43_671a8000161e79cbbab22e8a_671a6ab78bce909105a44657_CleanShot%252525202024-10-23%25252520at%2525252014.36.17%252525402x.avif)

### `Action` Find Logo

The **Find Logo** action helps you find a logo of a particular company given a domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638c4_674e8150e401f9a1c1ee7b2a_671a7fff161e79cbbab22d25_671a6af70264d96d23e4b159_CleanShot%252525202024-10-23%25252520at%2525252015.31.40%252525402x.avif)

**Step 1: Enter company domain and specify image size**

Enter the domain of the company you want to find the logo for. Optionally, you are are able to specify the size of the logo, in px, you want Clearbit to provide.

**Step 2 (Optional): Select Auto-update**

By default, Clearbit will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 3 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson.](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\))

**Step 4: Choose data to add as columns to table**

Select if you want to add the Url of the profile image into your table. Even if you choose not to add the URL column at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638c7_674e8150e401f9a1c1ee7b34_671a8000161e79cbbab22e8d_671a6b0b1adb5076c8bdbdfa_CleanShot%252525202024-10-23%25252520at%2525252014.35.46%252525402x.avif)

### `Action` Enrich Company

The **Enrich Company** action helps you get key data about a company given the company website domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638e2_674e8151e401f9a1c1ee7b56_671aacb21414f44c2b3a3cd8_671a6b3e4adb1f08dc0bd5dd_CleanShot%252525202024-10-23%25252520at%2525252015.33.15%252525402x.avif)

**Step 1: Choose the Clearbit account you want to use**

First, you can use either the Clay-managed Clearbit account or your own API key.

If you use the Clay-managed Clearbit account you will be charged at 8 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

Please input the domain of the company which you are trying to enrich.

If you want to ensure you are enriching the right company, you can also add the LinkedIn URL, Twitter URL, Facebook URL, and Company Name.

**Step 3 (Optional): Select Auto-update**

By default, Clearbit will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson.](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\))

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638e5_674e8151e401f9a1c1ee7b73_671aacb21414f44c2b3a3cb5_671a6b4dcc4b02524e63bb65_CleanShot%252525202024-10-23%25252520at%2525252015.34.36%252525402x.avif)

### `Action` Enrich Person & Company

The **Enrich Person & Company** action helps you find key data about a person and their current company from a given work email.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638d3_674e8151e401f9a1c1ee7b5c_671aacb21414f44c2b3a3cc2_671a6be58a594522061bcefa_CleanShot%252525202024-10-23%25252520at%2525252015.36.03%252525402x.avif)

**Step 1: Choose the Clearbit account you want to use**

First, you can use either the Clay-managed Clearbit account or your own API key.

If you use the Clay-managed Clearbit account you will be charged at 8 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://www.clay.com/university/lesson/clay-credits-overview).

**Step 2: Enter optional and required setup inputs**

Please input the work email of the person and their company you are trying to enrich. Make sure this is a work email address.

**Step 3 (Optional): Select Auto-update**

By default, Clearbit will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson.](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\))

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638d6_674e8151e401f9a1c1ee7b79_671aacb21414f44c2b3a3cbf_671a6bf3e0d46205855c4e9d_CleanShot%252525202024-10-23%25252520at%2525252015.37.49%252525402x.avif)

### `Action` Find Contacts

The **Find Contacts** action helps you find contacts that work for a company given company domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638d0_674e8151e401f9a1c1ee7b70_671aacb21414f44c2b3a3cef_671a6cdf57b9c9f0303b8abe_CleanShot%252525202024-10-23%25252520at%2525252015.39.00%252525402x.avif)

**Step 1: Select Clearbit account**

Please enter your the Clearbit account you want to use. Note that for this action, there is no Clay-managed account.For more information on how to access your Clearbit API Key, please reference [Clearbit’s API documentation](https://help.clearbit.com/hc/en-us/articles/6045527495191-Access-your-Clearbit-API-key).

**Step 2: Enter optional and required setup inputs**

Please input the domain you are trying to find contacts from.

Additionally, adding the name, roles, titles, and other information can help you narrow your search. You can also limit the amount of searches run on your Clearbit account.

**Step 3 (Optional): Select Auto-update**

By default, Clearbit will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

**Step 4 (Optional): Select conditional run criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson.](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).\))

**Step 5: Choose data to add as columns to table**

Select which data from the enrichment you’d like to add as columns to your table. Even if you choose not to add columns at this point, the enriched data will still be available and accessible for later use.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6920f1a4e30fe8146e1638cd_674e8151e401f9a1c1ee7b59_671aacb21414f44c2b3a3cec_671a6cea23ce03999db56a46_CleanShot%252525202024-10-23%25252520at%2525252015.40.05%252525402x.avif)

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