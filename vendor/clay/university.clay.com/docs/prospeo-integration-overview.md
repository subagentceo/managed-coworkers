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

Prospeo integration overview

# Prospeo integration overview

Find work emails and enrich person details using name, domain, or LinkedIn.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Getting started with Prospeo

[Prospeo](https://www.clay.com/integrations/data-provider/prospeo) in Clay allows you to find work email addresses and enrich person details using a person's name, company domain, or LinkedIn URL.

There are three actions you can perform with [Prospeo](https://www.clay.com/integrations/data-provider/prospeo):

-   Find Work Email
-   Find Email Addresses Associated with a Domain
-   Find Work Email and Enrich Person from LinkedIn URL

We'll cover how to connect Clay to Prospeo, then we'll go over each action that is available with Prospeo.

But first let's talk a bit about data enrichment waterfalls.

## Getting better email coverage with waterfall enrichments

Prospeo is great for finding email contacts, but it's not the only way to get this data.

For better coverage on email data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers. Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

That said, let's get into it on how to use Prospeo with Clay!

## Connecting with Clay with Prospeo

You have two options to connect Prospeo with Clay.

### Option 1: Use the Clay-managed Prospeo account

By default, Prospeo enrichments will use the Clay-managed Prospeo account. This means that any new enrichment will charge the designated credit amount.

Simply pull up any Datagma enrichment within Clay to use the Clay-managed Prospeo account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edd27a8208116797ab1d_674e8165782cbe659813bd75_671706c22ffbe34b8807016c_6716fad5e5bd608da4936bac_Find_Email.avif)

### Option 2: Add your own Prospeo API key

If you are currently on paid plan (Starter, Explorer, Pro) you can use your own Prospeo account within Clay through an API key.

To add your own API key for any Prospeo enrichment, you can do so when you're selecting an account.

Below is an example of where to click within the enrichment panel to add your API key. For more instructions on how to find your Prospeo API key, [follow these instructions](https://datagmaapi.readme.io/reference/getting-started-with-your-api) within Prospeo's documentation.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edd27a8208116797ab11_674e8165782cbe659813bd6d_6717079eb8150ee152ecc9d9_6716fb443b0af1458023462e_Prospeo_Account.avif)

## `Action` Find Work Email

The **Find Work Email** action lets you find the work email of a contact using a person's name and company domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edd27a8208116797ab17_674e8165782cbe659813bd89_6715e8d7fd996720e38f0267_6715e85b81737b2fff838ec9_CleanShot%252525202024-10-11%25252520at%2525252000.11.10.avif)

**Step 1: Choose the Prospeo account you want to use**  
You can use either the Clay-managed Prospeo account or bring your own key.  
If you use the Clay-managed Prospeo account you will be charged at 2 credits per enriched cell.

**Step 2: Select Required and Optional Setup Inputs**  
You will need to enter the Full Name and Company Domain of person you want to find the Work Email for.  
Optionally, you are also able to include catch-all emails.

**Step 3 (Optional): Select Auto-update**  
By default, Prospeo will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update. However if you do so, you might run into stale data problems.

**Step 4 (Optional): Select Conditional Run Criteria**  
If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

## `Action` Find Email Addresses Associated with a Domain

The **Find Email Addresses Associated with a Domain** action lets you find email addresses associated with a company domain and can also be used to find generic email addresses for a given domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edd27a8208116797ab14_6715e8d7fd996720e38f026e_6715e896be3603c8a2b48832_CleanShot%2525202024-10-11%252520at%25252000.24.26.avif)

**Step 1: Choose the Prospeo account you want to use**  
You can use either the Clay-managed Prospeo account or bring your own key.  
If you use the Clay-managed Prospeo account you will be charged at 2 credits per enriched cell.

**Step 2: Select Required and Optional Setup Inputs**  
To find the email addresses associated with a given domain using Prospeo’s email database, you will need to provide the domain and email type which you want to receive (generic, professional). Even though these are marked as optional, it’s best advised to enter both fields.

**Step 3 (Optional): Select Auto-update**  
By default, Prospeo will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update. However if you do so, you might run into stale data problems.

**Step 4 (Optional): Select Conditional Run Criteria**  
If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

## `Action` Find Work Email and Enrich Person from LinkedIn URL

The **Find Work Email and Enrich Person from LinkedIn URL** action lets you find email addresses associated with the given company domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edd27a8208116797ab14_6715e8d7fd996720e38f026e_6715e896be3603c8a2b48832_CleanShot%2525202024-10-11%252520at%25252000.24.26.avif)

**Step 1: Choose the Prospeo account you want to use**  
You can use either the Clay-managed Prospeo account or bring your own key.  
If you use the Clay-managed Prospeo account you will be charged at 2 credits per enriched cell.

**Step 2: Enter LinkedIn URL as setup input**  
Please input the **Linkedin URL** of your contact to find their work email and enriched profile.

**Step 3 (Optional): Select Auto-update**  
By default, Prospeo will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update. However if you do so, you might run into stale data problems.

**Step 4 (Optional): Select Conditional Run Criteria**  
If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).)

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