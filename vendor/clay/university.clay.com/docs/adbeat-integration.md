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

Adbeat integration

# Adbeat integration

Helps with competitive analysis and lead generation by revealing advertising spend, successful campaigns,

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Adbeat provides comprehensive insights into a company's advertising strategies by analyzing media mix, geographic data, and ad networks.

This integration aids in competitive analysis and lead generation by revealing advertising spend, successful campaigns, and potential partnership opportunities.

## **Enriching data with Adbeat**

1.  While in a Clay table, click `Add enrichment` and search for `Adbeat`.
2.  In the modal, you will be asked to `Select Adbeat account`.
    -   If you have your own account, click `+ Add account` and go through authentication. Otherwise, use the Clay provided key.

### `Action` Find the ad media mix and associated spend for a company

Provides detailed insights into how companies allocate their advertising budgets across different media channels within a specific time frame.

**Inputs**

-   **Company domain:** Website domain of the company you want to analyze (e.g., `apple.com`)
-   **Start date:** Beginning of the date range to analyze (`YYYY-MM-DD` format)
-   **End date:** End of the date range to analyze (`YYYY-MM-DD` format)
-   **Country (Optional):** Filter results to a specific country

**Output**

-   **Media Mix Percentages:** Breakdown of spend across programmatic, video, native, and direct advertising
-   **Total Spend Values:** Monetary spend on each advertising channel and overall total

### `Action` Find top ads published by a company

Retrieve detailed data about a company's top performing digital ads, including creative content, network placement, estimated spend, and impression metrics.

**Inputs**

-   **Company domain:** The advertiser's website domain (e.g., `apple.com`)
-   **Start date:** Beginning of the date range to analyze (YYYY-MM-DD format or natural language like "last month")
-   **End date:** End of the date range to analyze (YYYY-MM-DD format or natural language like "today")

**Output**

-   **Ad Hash:** Unique identifier for the ad
-   **Ad Info:** Size, type, creative URL, and text content
-   **Network:** The advertising network where the ad was placed
-   **Sum Ad Spend:** Estimated total spend on the ad during the specified period
-   **Sum Impressions:** Total number of times the ad was shown
-   **Preview:** Various size options to view the ad creative

### `Action` Find top ad networks used by a company

Provides detailed insights into a company's advertising strategy by identifying which ad networks they use and analyzing their ad spend distribution.

**Inputs**

-   **Company domain:** Domain name of the advertiser you want to analyze (e.g., `apple.com`)
-   **Start date:** Beginning of the date range to analyze (YYYY-MM-DD format or natural language like "last month")
-   **End date:** End of the date range to analyze (YYYY-MM-DD format or natural language like "today")
-   **Country (Optional):** Filter results to ads shown in a specific country

**Output**

-   **Network:** The advertising network identifier (e.g., `google-dv-360`, `medianet`)
-   **Ad Type:** The type of creative being served through the network
-   **Sum Ad Spend:** Estimated total ad spend on the network during the specified period

### `Action` Find top advertising geographies for a company

Analyze where a company is focusing its advertising efforts geographically and how much they're spending in different regions.

**Inputs**

-   **Company domain:** The website domain of the company you want to analyze (e.g., `apple.com`)
-   **Start date:** The beginning of the date range for analysis
    -   YYYY-MM-DD format (e.g., `2020-09-09`)
    -   Natural language (e.g., `last month`)
-   **End date:** The end of the date range for analysis
    -   YYYY-MM-DD format (e.g., `2020-12-31`)
    -   Natural language (e.g., `today`)

**Output**

-   **Geo Data Array:**
    -   Country: Two-letter country code
    -   DMA: Designated Market Area (specific market region)
    -   Sum Ad Spend: Total advertising spend in the region
    -   Sum Impressions: Total number of ad impressions in the region
-   **Country Breakdown:**
    -   Percentages: Breakdown of spend distribution by country
    -   Totals: Advertising spend and impressions by country
-   **Total Spend:** Overall advertising spend across all regions

### `Action` Find top ad publishers used by a company

Uncovers a company's primary advertising partners and reveals details about its ad spend, volume, and impressions.

**Inputs**

-   **Domain:** Company website domain or company's Adbeat advertiser URL

**Output**

-   Publisher domain/name
-   Total ad spend on publisher
-   Number of impressions
-   Number of unique ads placed
-   Publisher performance metrics

### `Action` **Find lookalike companies based on advertising data**

Find similar companies based on their advertising behavior and strategies to expand prospecting and lead generation efforts.

**Inputs**

-   **Company domain:** The website domain of the company you want to find similar advertisers for (e.g., `geico.com`)
-   **Country (Optional):** Filter results to show similar advertisers from a specific country

**Output**

-   **Similar Advertisers:** Array of company domains that have similar advertising patterns

### `Action` Find cumulative ad spend for a company

Get detailed account-level ad spend reports to understand a company's advertising investment and prioritize prospects based on their marketing budget.

**Inputs**

-   **Company domain:** Domain name of the advertiser to search (e.g., `apple.com`)
-   **Start date:** Beginning of the desired date range (YYYY-MM-DD format or natural language like "last month")
-   **End date:** End of the desired date range (YYYY-MM-DD format or natural language like "today")
-   **Country (Optional):** Filter results to ads shown in a specific country

**Output**

-   **Advertiser:** Company domain
-   **Sum Ad Spend:** Total advertising spend during the specified period

### `Action` Find top YouTube channels a company is advertising on

Uncovers which YouTube channels a company targets with its advertising to provide insights into their video marketing strategy.

**Inputs**

-   **Company domain (Required):** Company domain of advertiser to search (e.g., `apple.com`)
-   **Start date (Required):** Start date of the desired date range (Format: `YYYY-MM-DD` or natural language like `last month`)
-   **End date (Required):** End date of the desired date range (Format: `YYYY-MM-DD` or natural language like `today`)
-   **Country of search (Optional):** Search for ads shown in a specific country

**Output**

-   **Channel:** YouTube channel URL (e.g., `youtube.com/channel/UCtQMmwBJGvINGU0lZ_GrZKQ`)
-   **Publisher Name:** Name of the YouTube channel (e.g., `PharrellWilliamsVEVO`)
-   **Sum Ad Spend:** Total advertising spend on the channel in USD

### `Action` **Find companies spending the most on an ad publisher**

Get a list of companies advertising on a specific publisher's website, including their ad spend, impression data, and number of unique ads.

**Inputs**

-   **Publisher domain:** Domain of the publisher website you want to analyze (e.g., `yahoo.com`)
-   **Start date:** Beginning of the date range for analysis (YYYY-MM-DD or natural language like "last month")
-   **End date:** End of the date range for analysis (YYYY-MM-DD or natural language like "today")
-   **Country (Optional):** Filter results by specific country

**Output**

-   **Advertiser domain:** Domain of the advertising company
-   **Total ad spend:** Amount spent on advertising
-   **Total impressions:** Number of ad impressions
-   **Number of unique ads:** Count of distinct advertisements

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