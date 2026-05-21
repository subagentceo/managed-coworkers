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

CB Insights

# CB Insights

Enrich company records with funding history, valuations, revenue ranges, industry classifications, and more.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

CB Insights is a predictive intelligence platform that tracks private companies across funding, acquisitions, partnerships, and market signals. Within Clay, you can use CB Insights to enrich companies with funding history, valuations, revenue ranges, corporate hierarchies, competitor analysis, industry classifications, and commercial maturity data.

## Enrich data with CB Insights

1.  While in a Clay table, click `Add enrichment` and search for `CB Insights`.
2.  Under `Integrations`, select one of the CB Insights options.
3.  In the modal, you will be asked to `Select CB Insights account`.
    -   If you haven’t already connected your CB Insights, click `+ Add account` and go through authentication.

### `Action` Enrich company funding activity

Find a company's funding rounds and acquisitions, including dates and amounts, using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `clay.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Fundings: Array of funding rounds, each containing:
        -   Amount In Millions: Round size in millions.
        -   Date: Date of the funding round.
        -   Deal Id: CB Insights deal identifier.
        -   Round Name: Name of the funding round (e.g., `IPO`, `Series A`).
        -   Round Category: Category of the round (e.g., `IPO`).
        -   Round Category Id: Unique identifier for the round category.
        -   Simplified Round Name: Simplified round type (e.g., `IPO`).
        -   Is Exit: Boolean indicating whether this was an exit event.
        -   Sources: Array of source URLs for the funding information.

### `Action` Get company revenue

Get an estimated revenue range for a company, including the date the estimate was calculated.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Revenue Date: The date the revenue estimate was calculated.
    -   Revenue Min: Minimum revenue estimate in USD.
    -   Revenue Max: Maximum revenue estimate in USD.

### `Action` Enrich corporate hierarchy

Find a company's parent organizations and subsidiaries from its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Parent Orgs: Array of parent organizations, each containing:
        -   Org Name: Parent company name.
        -   Org Id: CB Insights organization identifier for the parent.
        -   URL: Parent company domain.
        -   Additional URLs: Additional domains associated with the parent.
    -   Child Orgs: Array of subsidiary organizations, each containing:
        -   Org Name: Subsidiary company name.
        -   Org Id: CB Insights organization identifier for the subsidiary.
        -   URL: Subsidiary company domain.
        -   Additional URLs: Additional domains associated with the subsidiary.

### `Action` Classify company industry

Classify a company's sector, industry, and sub-industry from its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Sector: High-level business sector (e.g., `Internet`).
    -   Sector Id: Unique identifier for the sector.
    -   Industry: More specific industry classification (e.g., `Internet Software & Services`).
    -   Industry Id: Unique identifier for the industry.
    -   Sub Industry: Detailed sub-industry classification (e.g., `Collaboration & Project Management`).
    -   Sub Industry Id: Unique identifier for the sub-industry.

### `Action` Find company competitors

Find a company's competitors and see how closely they compare using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `stripe.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Competitors: Array of competitor organizations, each containing:
        -   Org Name: Competitor company name.
        -   Org Id: CB Insights organization identifier for the competitor.
        -   Score: Similarity score indicating how closely the competitor compares to the target company.

### `Action` Get public identifiers

Find a company's public identifiers, such as stock tickers or regulatory IDs, using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).
-   Public identifier: The type of public identifier to retrieve. Select from:
    -   SEC Central Index Key (CIK)
    -   Committee on Uniform Securities Identification Procedures (CUSIP)
    -   Financial Instrument Global Identifier (FIGI)
    -   International Securities Identification Number (ISIN)
    -   Legal Entity Identifier (LEI)
    -   Trading Symbol

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   CIKs: Array of SEC Central Index Keys.
    -   CUSIPs: Array of CUSIP securities identification numbers.
    -   LEIs: Array of Legal Entity Identifiers.
    -   ISINs: Array of International Securities Identification Numbers.
    -   Tickers: Array of stock trading symbols (e.g., `WORK`).
    -   Tickers With Exchanges: Array of tickers paired with their exchange (e.g., `WORK:NYSE`).

### `Action` Find company partnerships

Find a company's business partnerships and partner roles using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).

Optional:

-   Limit: Maximum number of business partnerships to return. Defaults to a maximum of `500`.
-   Extract data by field paths: Extract specific fields from the response using JSONPath filters. A suggested filter extracts partner names, URLs, sources, and start dates.

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Business Relationships: Array of partnerships, each containing:
        -   Relationship Id: CB Insights internal identifier for the relationship.
        -   Start Date: Date the partnership began.
        -   Last Update Time: Timestamp of the most recent update to this relationship record.
        -   Country: Partner organization's country.
        -   Partner Name: Name of the partner organization.
        -   Partner Org Id: CB Insights organization identifier for the partner.
        -   Partner Role: Type of relationship (e.g., `Vendor`, `Customer`).
        -   Partner URL: Partner company domain.
        -   Source: URL where the partnership was identified.

### `Action` Get company total funding

Summarize how much funding a company has raised and its current investment stage using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `clay.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Total Funding: Total funding raised in millions, including all funding types.
    -   Total Equity Funding: Total equity funding raised in millions, excluding debt financing.
    -   Investment Stage: Current investment stage (e.g., `Series H`).

### `Action` Assess commercial maturity

Assess how commercially mature a company is based on CB Insights signals using its website or domain. Results score maturity from 1–5, with 5 being the most established organizations.

**Inputs**

Required:

-   Company domain: Company website (e.g., `stripe.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Signals: Array of indicators used to calculate maturity (e.g., `Founded 5+ years ago`).
    -   Signal Calculation Date: Date the signals were calculated.
    -   Maturity Level: Numeric score from 1 to 5, where 5 represents the most established organizations.
    -   Maturity Level Calculation Date: Date the maturity level was determined.
    -   Organization Stage: Text description of the company's stage (e.g., `Established`).
    -   Organization Stage Description: Additional context about the stage (e.g., `Major market presence`).

### `Action` Get company valuation

Estimate a company's valuation and related funding context using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Round Id: Identifier for the associated funding round.
    -   Simplified Round Name: Type of funding round associated with the valuation (e.g., `Series H`).
    -   Valuation Date: Date the valuation was recorded.
    -   Valuation In Millions: Company valuation in millions (USD).

### `Action` Classify company technology

Identify the technology markets and categories a company operates in using its website or domain.

**Inputs**

Required:

-   Company domain: Company website (e.g., `slack.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Markets: Array of technology markets the company operates in, each containing:
        -   Market Name: Name of the technology market (e.g., `Virtual meeting software`).
        -   Market Id: Unique identifier for the market.
    -   Expert Collections: Array of CB Insights expert collections the company belongs to, each containing:
        -   Expert Collection Name: Name of the collection (e.g., `Tech IPO Pipeline`).
        -   Expert Collection Id: Unique identifier for the collection.

### `Action` Enrich company acquisitions

Get previous acquisition activity for a given target domain, returning the total number of acquisitions and up to 200 acquisitions with details.

**Inputs**

Required:

-   Company domain: Company website (e.g., `clay.com`).

**Outputs**

-   Org Name: The company name as identified by CB Insights.
-   Org Id: CB Insights' unique identifier for the organization.
-   Data:
    -   Total Acquisitions: Total count of acquisitions found.
    -   Acquisitions: Array of up to 200 most recent acquisitions, each containing:
        -   Valuation In Millions: Deal valuation amount in millions.
        -   Deal Date: Date of the acquisition.
        -   Deal Id: CB Insights deal identifier.
        -   Round Name: Type of transaction (e.g., `Acquired`).
        -   Round Category: Deal category (e.g., `M&A`).
        -   Round Category Id: Unique identifier for the round category.
        -   Simplified Round Name: Simplified transaction type (e.g., `Acquisition`).
        -   Is Exit: Boolean indicating whether this was an exit event.
        -   Sources: Array of up to 3 source URLs for deal information.
        -   Recipient Org Id: CB Insights organization identifier for the acquired company.
        -   Recipient Org Name: Name of the acquired company.
        -   Recipient URL: Website of the acquired company.

### Run settings

-   Auto-update: Recommended if your underlying company data changes frequently so that enrichment results stay current.
-   Only run if: The enrichment will only run if conditions are met. ([**Learn more about conditional formulas here!**](https://www.clay.com/university))

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