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

Adyntel integration

# Adyntel integration

Analyze ad content, campaign duration, media types, and ad counts

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Adyntel Integration allows users to gather comprehensive advertising data from major platforms like Meta, LinkedIn, and Google, helping businesses understand their advertising landscape and optimize strategies.

With this integration, you can analyze ad content, campaign duration, media types, and ad counts to personalize marketing efforts and enhance lead generation campaigns.

## **Enriching data with Adyntel**

1.  While in a Clay table, click `Add enrichment` and search for `Adyntel`.
2.  Under `Integrations`, select one of the Adyntel options.
    -   If you have your own account, click `+ Add account` and go through authentication. Otherwise, use the Clay provided key.

### `Action` Get Meta ads

View Facebook and Instagram ads that a company is currently running, including ad copy, images, advertiser details, and landing pages.

**Inputs**

-   **Facebook page URL (Optional):** The company's Facebook page URL (must start with `https://`)
-   **Company domain (Optional):** Company website domain (format: `company.com` without `https://` or `www`)
-   **Media type (Optional):** Filter results by media type
    -   Image
    -   Meme
    -   Image and Meme
    -   Video
    -   All (default)
-   **Active status (Optional):** Filter by ad status
    -   Active (default)
    -   Inactive
    -   All (active and inactive)
-   **Country (Optional):** Filter results by specific country

**Output**

-   **Total number of ads being run**
-   **Landing pages associated with the ads**
-   **Up to 10 specific ad details including:**
    -   Ad copy
    -   Ad images
    -   Advertiser name
    -   Ad URL
    -   Ad spend (when available)
    -   Creation date
    -   Platform (Facebook/Instagram)

### `Action` Get LinkedIn ads

Uncover and analyze LinkedIn ad campaigns run by companies based on their website domains or LinkedIn page IDs.

**Inputs**

-   **LinkedIn company org ID (Optional):** The LinkedIn company org ID to find ads for (e.g., `15564` from `https://www.linkedin.com/company/15564`). One of LinkedIn company org ID or company domain is required.
-   **Company domain (Optional):** The company domain to find ads for (e.g., `clay.com`). One of LinkedIn page ID or company domain is required. **_Note:_** _Using the LinkedIn page ID is more accurate than domain._

**Output**

-   **Total ads:** The total number of ads found for the company
-   **Ads:** An array of up to 10 ad details including:
    -   Creative type
    -   Ad ID
    -   Type
    -   Advertiser name and logo
    -   Ad copy/commentary
    -   Ad image
    -   Headline
    -   View details link (URL to view the ad on LinkedIn)

### `Action` Get Google ads

Retrieve and analyze detailed data on companies' Google Ads campaigns to understand their advertising strategies and campaign effectiveness.

**Inputs**

-   **Company domain:** The company domain to match (e.g., `clay.com`)
-   **Media type (Optional):** Filter results for a specific type of media:
    -   Text
    -   Image
    -   Video
    -   All (Default)

**Output**

-   **Total ad count:** Number of ads found
-   **Continuation token:** Token for pagination
-   **Country code:** Where ads were seen
-   **Detailed information for up to 10 ads:**
    -   Advertiser ID and name
    -   Creative ID
    -   Ad format (Image, Text, Video)
    -   Original ad URL
    -   Start date
    -   Last seen date
    -   Ad content variants including:
        -   Content
        -   Dimensions (height/width)
        -   Media URLs

### **Run settings**

-   **Auto-update**
-   **Only run if:** The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

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