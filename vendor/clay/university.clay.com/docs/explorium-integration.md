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

Explorium integration

# Explorium integration

Access structured data from public filings, employee reviews, and social media.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Explorium provides five company-level enrichments that return structured data from public filings, employee reviews, and social media. These enrichments support prospecting, segmentation, qualification, and research workflows directly in Clay.

## Enriching data with Explorium

-   While in a Clay table, click `Add enrichment` and search for `Explorium`.
-   Under `Integrations`, select one of the Explorium enrichment options.
-   In the modal, you will be asked to `Select Explorium account`.
    -   If you haven't already connected your Explorium account, click `+ Add account` and go through authentication.

### `Action` Enrich company ratings and employee sentiment

Use this action to access company ratings and employee sentiment data, including information about company culture, management quality, work-life balance, compensation satisfaction, and overall employee sentiment.

**Inputs**

**Company identifiers** (at least one required): Explorium uses a multi-step resolution strategy based on the fields you provide. The company domain is the most accurate resolution method. The more fields you provide, the more accurate the resolution will be.

-   **Company domain** (Optional): The domain of the company you are trying to enrich. Example: `clay.com`
-   **Company professional profile URL** (Optional): Company professional profile URL of the company you are trying to enrich. Example: `https://www.linkedin.com/company/grow-with-clay`
-   **Company name** (Optional): Company name of the company you are trying to enrich. Example: `Clay`
-   **Explorium ID** (Optional): Explorium ID of the company you are trying to enrich if you already have it from a previous enrichment.

**Output:** This enrichment returns ratings that cover various aspects of company culture, management quality, work-life balance, salary satisfaction, and overall employee sentiment. The information is sourced from online ratings and reviews published by current and former employees, as well as interview candidates.

**Key data points:**

-   **Company information:** Company name, location (city, region, country), address, and website
-   **Overall rating:** Overall company rating score
-   **Business outlook:** Employee sentiment about the company's business outlook (percentage)
-   **Career opportunities:** Rating for career growth opportunities
-   **CEO approval:** CEO approval rating and number of responses
-   **Compensation & benefits:** Rating for compensation and benefits packages
-   **Diversity & inclusion:** Rating for diversity and inclusion initiatives
-   **Senior management:** Rating for senior management effectiveness
-   **Work-life balance:** Rating for work-life balance
-   **Recommend to friend:** Percentage of employees who would recommend the company to a friend
-   **Review counts:** Total number of reviews and all reviews count

**Important notes:**

-   This action costs 4 credits per successful enrichment.
-   If no data is found for a company, credits are automatically refunded.
-   If the company is not found in Explorium's database, the enrichment will return an error.

### `Action` Enrich public company competitive landscape

Use this action to get insights into a company's market positioning, competitive differentiation, and key competitors sourced from publicly available financial reports, regulatory filings, and industry analysis, with links to official SEC filings such as `10-K` reports.

**Inputs**

**Company identifiers** (at least one required):

-   **Company domain:** Company website domain (e.g., `apple.com`)
-   **Company professional profile URL:** Company LinkedIn URL (e.g., `https://www.linkedin.com/company/apple`)
-   **Company name:** Full legal name of the company (e.g., `Apple Inc.`)
-   **Explorium ID:** Explorium's internal company identifier (if known from a previous enrichment)

**Output:**

-   **Key competitors:** Array of competitor company names
-   **Competitive differentiation:** Array of statements describing the company's competitive advantages and unique positioning
-   **Company name:** Official company name from SEC filings
-   **Ticker:** Stock ticker symbol (e.g., `xnas:aapl`)
-   **CIK:** Central Index Key (SEC company identifier)
-   **Form type:** Type of SEC filing (typically `10-K`)
-   **Form description:** Description of the filing type
-   **Filed at:** Date when the report was filed with the SEC
-   **Accession number:** SEC filing accession number
-   **Link to filing details:** Direct link to the detailed SEC filing page
-   **Link to HTML:** Direct link to the HTML version of the SEC filing

**Important notes:**

-   This action costs 4 credits per successful enrichment.
-   If no data is found for a company, credits are automatically refunded.

### `Action` Enrich public company strategic insights

Use this action to get in-depth information on target markets, value proposition, supplier relationships, product strategies, and sales/marketing priorities of public companies sourced from regulatory filings, earnings reports, and official company disclosures.

**Inputs**

**Company identifiers** (at least one required):

-   **Company domain:** Company website domain
-   **Company professional profile URL:** Company LinkedIn URL
-   **Company name:** Full legal name of the company
-   **Explorium ID:** Explorium's internal company identifier (if known)

**Important notes:**

-   This action costs 4 credits per successful enrichment.
-   If no data is found for a company, credits are automatically refunded.

### `Action` Enrich public company business challenges

Use this action to get insights into a company's investment history, advisory board, M&A activity, and funding rounds sourced from regulatory filings, public disclosures, and investment databases.

**Inputs**

**Company identifiers** (at least one required):

-   **Company domain:** Company website domain
-   **Company professional profile URL:** Company LinkedIn URL
-   **Company name:** Full legal name of the company
-   **Explorium ID:** Explorium's internal company identifier (if known)

**Output:** This enrichment returns business challenge categories including:

-   **Technological disruption:** Challenges related to rapid technological change and innovation requirements
-   **Company data security breach:** Risks related to cyberattacks and data breaches
-   **Company data security privacy:** Data protection and privacy compliance challenges
-   **Company competition:** Competitive pressures and market challenges
-   **Company customer adoption:** Product adoption and transition management issues
-   **Company market saturation:** Market saturation and competition in established markets
-   **Company name:** Name of the company
-   **CIK:** Central Index Key (SEC identifier)
-   **Ticker:** Stock ticker symbol
-   **Form type:** Type of SEC filing (e.g., `10-K`)
-   **Form description:** Description of the filing
-   **Accession number:** SEC filing accession number
-   **Filed at:** Date when the filing was submitted
-   **Link to HTML:** Link to the SEC filing HTML page
-   **Link to filing details:** Link to detailed SEC filing

**Important notes:**

-   This action costs 4 credits per successful enrichment.
-   If no data is found for a company, credits are automatically refunded.

### `Action` Enrich company social media metrics

Use this action to track a company's professional social media activity, engagement, and messaging trends sourced from public social media feeds.

**Inputs**

**Company identifiers** (at least one required):

-   **Company domain:** Company website domain
-   **Company professional profile URL:** Company LinkedIn URL
-   **Company name:** Full legal name of the company
-   **Explorium ID:** Explorium's internal company identifier (if known)

**Important notes:**

-   This action costs 4 credits per successful enrichment.
-   If no data is found for a company, credits are automatically refunded.

## Run settings

-   **Auto-update:** Set enrichment to refresh automatically at regular intervals.
-   **Only run if:** The enrichment will only run if conditions are met. Learn more about [conditional formulas](https://www.clay.com/university/lesson/conditional-formulas-only-run-if).

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