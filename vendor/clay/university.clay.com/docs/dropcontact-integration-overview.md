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

DropContact integration overview

# DropContact integration overview

B2B email finder to find emails, enrich contacts, validate data, and clean duplicates.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Get started with DropContact

[DropContact](#) in Clay allows you to find work email addresses and company names from domain names, streamlining your contact research process.

There are two actions you can perform with [DropContact](https://www.clay.com/integrations/data-provider/dropcontact):

-   Find Work Email
-   Find Company Name from Company Domain

We'll cover how to connect Clay to DropContact, then we'll go over each action that is available with DropContact.

But first let's talk a bit about data enrichment waterfalls.

## Getting better email coverage with waterfall enrichments

[DropContact](https://www.clay.com/integrations/data-provider/dropcontact) is great for finding email contacts, but it's not the only way to get email data.

For better coverage on email data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers. Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

That said, let's get into it on how to use DropContact with Clay! 

## Connecting with Clay with DropContact

You have two options to connect DropContact with Clay.

### Option 1: Use the Clay-managed DropContact account

By default, DropContact enrichments will use the Clay-managed DropContact account. This means that any new enrichment will charge the designated credit amount.

Simply pull up any DropContact enrichment within Clay to use the Clay-managed DropContact account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659b7f00944b3b6fbcc3_674e8152688eb6c97004eb9a_6716f5bfe5b3b85778cc30a1_6716f474d415b2c09c63ae61_Dropcontact.png)

### Option 2: Add your own DropContact API key

If you are currently on a paid plan, you can use your own DropContact account within Clay through an API key.

You can add your own API key for any DropContact enrichment when selecting an account within the enrichment panel.

Below is an example of where to click within the enrichment panel to add your API key. For more instructions on how to find your DropContact API key, [follow these instructions](https://support.dropcontact.com/article/237-how-to-use-the-dropcontact-api-key) within DropContact's documentation.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659b7f00944b3b6fbcc6_674e8152688eb6c97004eba3_6716f5bfe5b3b85778cc30b9_6716f44ee6221188577db00c_DropContact_Add.png)

## `Action` Find Work Email

The **Find Work Email** action allows for you to find a person's email address with a company domain, phone number, or social URL.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659b7f00944b3b6fbcbb_674e8152688eb6c97004eb92_6715ebd677f6f03a8a94714d_6715ebcd38f5c9a3529b6045_CleanShot%252525202024-10-11%25252520at%2525252001.08.57.png)

**Step 1: Choose the Dropcontact account you want to use**  
You can use either the Clay-managed Dropcontact account or bring your own key.  
If you use the Clay-managed Dropcontact account you will be charged at 2 credits per enriched cell.

**Step 2: Select Inputs to provide**  
Make the to provide the inputs to Dropcontact. Please note that while all the inputs are optional, the data quality will improve with the amount of data you put in.  
As a rule of thumb, inputting more unique identifiers will help improve data quality.

**Step 3 (Optional): Select Auto-update**  
By default, Dropcontact will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update. However if you do so, you might run into stale data problems.

**Step 4 (Optional): Select Conditional Run Criteria**  
If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

## `Action` Find Company Name from Company Domain

The **Find Company Name from Company Domain** action helps you search for a company's name from a given domain.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659b7f00944b3b6fbcc0_674e8152688eb6c97004eb97_6715ebd677f6f03a8a947147_6715ebae1f2b5e6872be0451_CleanShot%252525202024-10-11%25252520at%2525252000.42.49.png)

**Step 1: Choose the Dropcontact account you want to use**  
You can use either the Clay-managed Dropcontact account or bring your own key.  
If you use the Clay-managed Dropcontact account you will be charged at 2 credits per enriched cell.

**Step 2: Select Company Domain as input**  
Enter the company domain to receive the company name as the output.

**Step 3 (Optional): Select Auto-update**  
By default, Dropcontact will auto-update the integration every 24 hours. Make sure to toggle this step off if you do not want to auto-update. However if you do so, you might run into stale data problems.

**Step 4 (Optional): Select Conditional Run Criteria**  
If you want to only run this enrichment under set circumstances, you are able to input formulas where the column runs only if the formula is true. Learn more about conditional runs in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101#:~:text=Conditional%20runs%20\(which%20make%20use,personal%20emails%20for%20all%20rows\).).

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