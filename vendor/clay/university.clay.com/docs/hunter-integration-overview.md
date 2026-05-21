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

Hunter

# Hunter

Email outreach platform.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Getting started with Hunter.io

[Hunter.io](https://www.clay.com/integrations/data-provider/hunter) helps you easily find and validate email addresses for individuals and companies, including filtering by department, all within Clay.

You can do a few things with [Hunter.io](http://hunter.io/) within Clay, including:

-   Find Emails by Company
-   Find Work Email
-   Validate Email

We'll cover how to connect Clay to Hunter. Then we'll go over each action that is available with Hunter.

But first, let's talk a little bit about data enrichment waterfalls.

## Maximize your data coverage with waterfall enrichment

[Hunter.io](https://www.clay.com/integrations/data-provider/hunter) is an amazing product for finding and verifying someone's email address. However, it's important to know it's not your only option for email enrichment.

We recommend using [Clay's waterfall data enrichment](https://www.clay.com/waterfall-enrichment) to find and verify someone's email address. This allows you to try multiple providers sequentially to maximize your data coverage.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659ff400f7b554c008e3_674e8150e401f9a1c1ee7b21_6716f7ce0cd06acd251e66f6_6716f0610a861eae20fe9b38_66e2bdd50d837588b358d418_img-waterfall-find-work-email.png)

Learn more in this Clay University lesson on [how to use Clay waterfalls.](https://www.clay.com/university/lesson/enrich-people-waterfalls-crm-enrichment)

That said, let's get into it on how to use Hunter.io with Clay!

## Connecting Clay to Hunter.io

You have two options connecting Hunter to Clay.

### Option 1: Use the Clay-managed Hunter account

This means you do not need to have a Hunter account to use the enrichment. You will be charged 2 credits per enriched cell without any need to create a Hunter account.

When you pull up the enrichment you will simply select the option for `Clay-managed Hunter account`. And you can now use the enrichment!

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ec7c0ddac45c9f5de58e_674e815a9f77c492b9e8996b_671143beb71aa6284f5bd5f8_67113e918e35c21c695f3d60_Screenshot%252525202024-10-17%25252520at%252525209.42.41%252525E2%25252580%252525AFAM.avif)

### Option 2: Add your own Hunter API key

Alternatively, if you already have a Hunter account, you can connect that by adding your own API key. However, it's only available for paying customers.

**Heads up!** You'll need [Clay's Starter plan ($149/mo)](https://www.clay.com/university/guide/hunter-integration-overview#) to use your own Hunter API key. It's not accessible on the free plan.

‍

Follow this interactive tutorial with instructions on how to do that:

You can find additional instructions on [how to find your Hunter API key](https://help.hunter.io/en/articles/1970978-what-is-and-where-i-can-find-my-api-secret-key) in their help documentation.

Next, let's learn more about the actions available with the Hunter integration.

## `Action`Find Emails by Company

The **Find Emails by Company** action helps you find public email addresses on the internet from a company domain with the ability to filter by department.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ec7c0ddac45c9f5de584_674e815a9f77c492b9e8997e_67113c751fd8772967377310_670ed9b8327a56ed3568f117_CleanShot%252525202024-10-10%25252520at%2525252020.35.50%252525402x.avif)

**Step 1: Choose the Hunter account you want to use**

First, you can use either the Clay-managed Hunter.io account or your own API key.

If you use the Clay-managed Hunter account you will be charged at 2 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://docs.clay.com/en/articles/9654103-how-clay-credits-work).

‍

**Step 2: Select what emails you'd like to find within a company**

Next, you'll select the company domain so you can identify people from that organization. Optionally, you can then select what department you'd like to search to find people.

Follow the step-by-step walkthrough in this interactive lesson for an example:

‍

**Step 3 (Optional): Select Auto-update**

By default, Hunter will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.  
  
For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

‍

**Step 4 (Optional): Select Conditional Run Criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

## `Action` Find Work Email

The **Find Work Email** action helps you find a person's email address from their name and company domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ec7c0ddac45c9f5de581_674e815a9f77c492b9e8998e_67113c751fd8772967377317_670ed9fc1448fa56e5e03dc7_CleanShot%252525202024-10-10%25252520at%2525252020.42.14%252525402x.avif)

**Step 1: Choose the Hunter account you want to use**

First, you can use either the Clay-managed Hunter.io account or your own API key.

If you use the Clay-managed Hunter account you will be charged at 2 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://docs.clay.com/en/articles/9654103-how-clay-credits-work).

‍

**Step 2: Select the individual's full name and domain of the company**

Enter the Company Domain and the full name of the contact you are performing the email search on.

‍

**Step 3 (Optional): Select Auto-update**

By default, Hunter will auto-update the integration every 24 hours. This is optional. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.  
  
For more information about how auto-update works, please read [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

‍

**Step 4 (Optional): Select Conditional Run Criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

## `Action` Validate Email

The **Validate Email** action helps you determine if an email address has as valid inbox.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ec7c0ddac45c9f5de57e_674e815a9f77c492b9e8997b_67113c751fd877296737730c_670eda0712abfa31ba75ebf7_CleanShot%252525202024-10-10%25252520at%2525252020.56.57%252525402x.avif)

**Step 1: Choose the Hunter account you want to use**

First, you can use either the Clay-managed Hunter.io account or your own API key.

If you use the Clay-managed Hunter account you will be charged at 2 credits per enriched cell. For more information on how Clay credits work, please refer to [this guide](https://docs.clay.com/en/articles/9654103-how-clay-credits-work).

‍

**Step 2: Select the email address you want to verify**

Enter the Email Address you want to verify. Please make sure it follows the format of [name@email.com](mailto:name@email.com)

‍

**Step 3 (Optional): Select Auto-update**

By default, Hunter will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update, however, you might run into stale data problems.

‍

**Step 4 (Optional): Select Conditional Run Criteria**

If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

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