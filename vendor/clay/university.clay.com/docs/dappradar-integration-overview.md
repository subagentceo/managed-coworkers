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

Dappradar integration overview

# Dappradar integration overview

Blockchain dapp store providing data and analytics for NFT, DeFi, and gaming exploration.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## DappRadar overview

DappRadar is a platform that provides comprehensive data and metrics for decentralized applications (Dapps) and NFT collections across multiple blockchains.

You can use the DappRadar integration to:

-   Find the top Decentralized Applications or NFT collections
-   Get NFT Collection Data and Metrics
-   Get Decentralized Application Data and Metrics

All DappRadar actions in Clay use a Clay-managed account and utilize your Clay credits.

## Using DappRadar data as a source

Import DappRadar data into a new existing table to find top Dapps or NFT collections across 50+ blockchains, filtering by blockchain, category, or metrics like transactions and volume.

Note that the limit on this search is 10,000 results and Clay will only import the first 10,000 results.

**Step 1:** Specify if you want to search for NFT collections or Dapps

### **Optional Steps**

**Step 2:** Specify Blockchain

To filter data by a specific blockchain, select the desired chain from the dropdown.

**Step 3:** Select Metric to Sort By

In the **Metric to Sort By** dropdown, choose a metric (e.g., Average Price, Traders, Volume, Sales, Market Cap, or Floor Price) to prioritize your data.

**Step 4:** Set Time Range and Limit

Specify a time range for the data, with options from 15 minutes to 30 days. The default is **24 hours**.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e6598977fd5ea3fded321_6740c1acfc82495944b0dbfb_6740c19e8e3497fd45a9e643_CleanShot%2525202024-11-20%252520at%25252016.11.45%2525402x.png)

## Available DappRadar Actions

Within your Clay table, you’re able to run the following DappRadar-supported actions:

-   Get NFT Collection Data and Metrics
-   Get Decentralized Application Data and Metrics

### `Action` Get NFT Collection Data and Metrics

Get data and metrics from a single DappRadar NFT collection. This will find the blockchains the collection is on, as well as metrics -- sales, volume, traders, floor price -- during a specified time period, as well as percentage change in these metrics.

**Step 1:** Specify search parameters.

Enter the **Collection ID** from the NFT object.

Choose a **Timeframe** for metrics like transactions and balance. The default is 24 hours.

Select a specific **Blockchain**, or leave it blank to include all chains.

**Step 2:** Configure run settings.

By default, new rows within your Clay table will automatically run a DappRadar action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 3:** Run your enrichment to Get NFT Collection Data within DappRadar.

### `Action` Get Decentralized Application Data and Metrics

Get data and metrics from a single DappRadar dapp. This will find social links, dapp category, and description for a dapp. It will also find the metrics such as transactions, UAW, and balance, as well as percentage changes over a specified time period.

**Step 1:** Specify search parameters.

Provide the **Dapp ID** from the DappRadar page, such as [Uniswap V3 About Page](https://dappradar.com/multichain/exchanges/uniswap-v3/about).

Set a **Timeframe** for metrics like transactions and balance. If no timeframe is specified, the default is 24 hours.

Enter the **Name** of the Dapp and provide its **Website URL**.

Include the **Smart Contract** address if applicable.

Specify a **Blockchain** for data filtering, or leave it blank to include all associated chains.

**Step 2:** Configure run settings.

By default, new rows within your Clay table will automatically run a DappRadar action. Learn more about auto-update in [this brief guide](https://docs.clay.com/en/articles/9642165-auto-update-and-auto-dedupe-table).

To run enrichment only under specific conditions, use formulas that trigger the column when the formula is true. Learn more about AI formulas in [this Clay University lesson](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

**Step 3:** Run your enrichment to Get Decentralized Application Data within DappRadar.

‍

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