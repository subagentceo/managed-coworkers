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

Aviato integration

# Aviato integration

Find professional profiles, normalize location data, find personal emails, retrieve company financials.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Aviato is a data enrichment platform for building and enhancing professional and company profiles using multiple data sources. With this integration, you can find professional profiles, normalize location data, find personal and hashed personal emails, retrieve company financials, find company acquisitions, retrieve legal compliance data, analyze web traffic, and track social media metrics.

## Enriching data with Aviato

1.  While in a Clay table, click `Add enrichment` and search for `Aviato`.
2.  Under `Integrations`, select one of the Aviato options.

### `Action` Find professional profile

Use this action to locate a professional profile URL matched to a provided email address.

**Inputs**

Required:

-   **Email:** The email address of the person you want to find a profile for.

**Outputs**

-   **LinkedIn URL:** The professional profile URL matched to the provided email.

### `Action` Normalize location

Use this action to enrich and standardize location data for improved accuracy and actionable insights.

**Inputs**

Required:

-   **Location:** The location to find the geo-coded location for (e.g., `San Francisco, California`).

### `Action` Find personal email

Use this action to locate personal email addresses from a professional profile URL or work email address.

**Inputs**

At least one of the following is required:

-   **Professional profile URL:** A valid LinkedIn profile URL, including `https://` (e.g., `https://www.linkedin.com/in/john-doe-1234567890/`).
-   **Work email:** The work email address of the person you want to find the personal email for.

**Outputs**

-   **Emails:** A list of personal email addresses found.
-   **First Email:** The first personal email address returned.

### `Action` Find hashed personal email

Use this action to retrieve SHA256-hashed personal emails for a person, suitable for audience matching and ad targeting.

**Inputs**

At least one of the following is required:

-   **Professional profile URL:** A valid LinkedIn profile URL, including `https://` (e.g., `https://www.linkedin.com/in/john-doe-1234567890/`).
-   **Work email:** The work email address of the person you want to find the hashed personal email for.

**Outputs**

-   **Hashed emails:** A list of SHA256-hashed personal email addresses.

### `Action` Find company financials

Use this action to retrieve detailed information about a company's funding, revenue, transactions, and other financial metrics.

**Inputs**

At least one of the following company identifiers is required:

-   **Company domain:** Company website.
-   **Professional profile URL**
-   **Facebook ID:** Company's Facebook ID (e.g., `adobe` from [facebook.com/adobe](http://facebook.com/adobe)).
-   **Twitter ID:** Company's Twitter ID (e.g., `adobe` from [twitter.com/adobe](http://twitter.com/adobe)).
-   **Crunchbase ID:** Company's Crunchbase ID (e.g., `apple` from [crunchbase.com/organization/apple](http://crunchbase.com/organization/apple)).
-   **Pitchbook ID:** Company's Pitchbook ID (e.g., `41082-40` from [pitchbook.com/profiles/company/41082-40](http://pitchbook.com/profiles/company/41082-40)).
-   **Product Hunt ID:** Company's Product Hunt ID (e.g., `airtable` from [producthunt.com/products/airtable](http://producthunt.com/products/airtable)).
-   **Dealroom ID:** Company's Dealroom ID (e.g., `swiggy` from [app.dealroom.co/companies/swiggy](http://app.dealroom.co/companies/swiggy)).
-   **Golden ID:** Company's Golden ID (e.g., `waymo-3xg88p` from [golden.com/wiki/Waymo-3XG88P](http://golden.com/wiki/Waymo-3XG88P)).
-   **AngelList ID:** Company's AngelList ID (e.g., `waymo` from [angel.co/waymo](http://angel.co/waymo)).
-   **Wellfound ID:** Company's Wellfound ID (e.g., `guideline` from [wellfound.com/company/guideline](http://wellfound.com/company/guideline)).

Optional:

-   **Limit funding rounds received:** Number of most recent funding rounds to return (default: `5`).
-   **Limit funding rounds as an investor:** Number of rounds where the company acted as an investor (default: `5`).
-   **Limit funding rounds as a lead investor:** Number of rounds where the company acted as a lead investor (default: `5`).
-   **Historical data date:** Filter data as of a specific date (e.g., `5 days ago` or `2022-07-31`).
-   **Historical card data date:** Filter card transaction data as of a specific date.

### `Action` Find private company acquisitions

Use this action to retrieve a company's recent acquisition history and acquiree details.

**Inputs**

At least one of the following company identifiers is required:

-   **Company domain:** The company's website domain.
-   **Professional profile URL:** The company's LinkedIn URL (e.g., `https://www.linkedin.com/company/grow-with-clay`).
-   **Facebook ID:** Company's Facebook ID (e.g., `adobe` from [facebook.com/adobe](http://facebook.com/adobe)).
-   **Twitter ID:** Company's Twitter ID (e.g., `adobe` from [twitter.com/adobe](http://twitter.com/adobe)).
-   **Crunchbase ID:** Company's Crunchbase ID (e.g., `apple` from [crunchbase.com/organization/apple](http://crunchbase.com/organization/apple)).
-   **Pitchbook ID:** Company's Pitchbook ID (e.g., `41082-40` from [pitchbook.com/profiles/company/41082-40](http://pitchbook.com/profiles/company/41082-40)).
-   **Product Hunt ID:** Company's Product Hunt ID (e.g., `airtable` from [producthunt.com/products/airtable](http://producthunt.com/products/airtable)).
-   **Dealroom ID:** Company's Dealroom ID (e.g., `swiggy` from [app.dealroom.co/companies/swiggy](http://app.dealroom.co/companies/swiggy)).
-   **Golden ID:** Company's Golden ID (e.g., `waymo-3xg88p` from [golden.com/wiki/Waymo-3XG88P](http://golden.com/wiki/Waymo-3XG88P)).
-   **AngelList ID:** Company's AngelList ID (e.g., `waymo` from [angel.co/waymo](http://angel.co/waymo)).
-   **Wellfound ID:** Company's Wellfound ID (e.g., `guideline` from [wellfound.com/company/guideline](http://wellfound.com/company/guideline)).

**Outputs**

-   **Acquisition list:** A list of acquisitions, each containing:
    -   **Id:** The unique ID of the acquisition record.
    -   **Announced on:** The date the acquisition was announced.
    -   **Acquiree name:** The name of the company that was acquired.
    -   **Acquirer name:** The name of the acquiring company.
    -   **Acquiree company:** Details about the acquired company, including:
        -   Id, Name, Country, Region, Locality
        -   URLs: Links to the acquiree's Golden, LinkedIn, Pitchbook, Crunchbase, and other profiles.

### `Action` Find private company legal compliance data

Use this action to retrieve legal and compliance identifiers for a company, including regulatory codes and registered entity information.

**Inputs**

At least one of the following company identifiers is required:

-   **Company domain:** The company's website domain.
-   **Professional profile URL:** The company's LinkedIn URL (e.g., `https://www.linkedin.com/company/grow-with-clay`).
-   **Facebook ID:** Company's Facebook ID (e.g., `adobe` from [facebook.com/adobe](http://facebook.com/adobe)).
-   **Twitter ID:** Company's Twitter ID (e.g., `adobe` from [twitter.com/adobe](http://twitter.com/adobe)).
-   **Crunchbase ID:** Company's Crunchbase ID (e.g., `apple` from [crunchbase.com/organization/apple](http://crunchbase.com/organization/apple)).
-   **Pitchbook ID:** Company's Pitchbook ID (e.g., `41082-40` from [pitchbook.com/profiles/company/41082-40](http://pitchbook.com/profiles/company/41082-40)).
-   **Product Hunt ID:** Company's Product Hunt ID (e.g., `airtable` from [producthunt.com/products/airtable](http://producthunt.com/products/airtable)).
-   **Dealroom ID:** Company's Dealroom ID (e.g., `swiggy` from [app.dealroom.co/companies/swiggy](http://app.dealroom.co/companies/swiggy)).
-   **Golden ID:** Company's Golden ID (e.g., `waymo-3xg88p` from [golden.com/wiki/Waymo-3XG88P](http://golden.com/wiki/Waymo-3XG88P)).
-   **AngelList ID:** Company's AngelList ID (e.g., `waymo` from [angel.co/waymo](http://angel.co/waymo)).
-   **Wellfound ID:** Company's Wellfound ID (e.g., `guideline` from [wellfound.com/company/guideline](http://wellfound.com/company/guideline)).

Optional:

-   **Require legal name:** Toggle to only return results that include a legal name.
-   **Require DUNS number:** Toggle to only return results that include a DUNS number.
-   **Require CAGE code:** Toggle to only return results that include a CAGE code.
-   **Require NAICS code:** Toggle to only return results that include a NAICS code.
-   **Require CIK number:** Toggle to only return results that include a CIK number.
-   **Require Glassdoor ID:** Toggle to only return results that include a Glassdoor ID.
-   **Require Wikidata ID:** Toggle to only return results that include a Wikidata ID.
-   **Require Wellfound ID:** Toggle to only return results that include a Wellfound ID.
-   **Require Hugging Face ID:** Toggle to only return results that include a Hugging Face ID.

<div style="background-color: #FDFBF0; padding: 16px; border-radius: 8px; border: 1px solid #F4E8C1; font-family: Arial, sans-serif;">

<strong>Note:</strong> If a <code>Require</code> toggle is not enabled, you will be charged credits even if the specific data point is not returned.

</div>

**Outputs**

-   **CAGE Code:** The company's Commercial and Government Entity code.
-   **DUNS Number:** The company's Dun & Bradstreet unique nine-digit identification number.
-   **NAICS Code:** The North American Industry Classification System code for the company.
-   **CIK Number:** The company's SEC Central Index Key number.
-   **Wikidata ID:** The company's Wikidata identifier.
-   **Wellfound ID:** The company's Wellfound identifier.
-   **Hugging Face ID:** The company's Hugging Face identifier.
-   **Glassdoor ID:** The company's Glassdoor identifier.
-   **Legal Entity ID:** The company's Legal Entity Identifier (LEI).
-   **Legal Name:** The official registered legal name of the company.

### `Action` Find private company web traffic

Use this action to retrieve detailed web traffic metrics for comprehensive performance analysis.

**Inputs**

Required:

-   **Company domain:** The company's website domain.

Optional:

-   **Professional profile URL**
-   **Facebook ID:** Company's Facebook page ID (e.g., `adobe` from [facebook.com/adobe](http://facebook.com/adobe)).
-   **Twitter ID:** Company's Twitter handle.
-   **Crunchbase ID:** Company's Crunchbase identifier.
-   **Pitchbook ID:** Company's Pitchbook identifier.
-   **Product Hunt ID:** Company's Product Hunt identifier.
-   **Dealroom ID:** Company's Dealroom identifier.
-   **Golden ID:** Company's Golden identifier.
-   **AngelList/Wellfound ID:** Company's AngelList/Wellfound identifier.
-   **Historical data date:** Filter historical data from a specific date (defaults to 12 months of data).
-   **Require traffic trends:** Toggle to only return results with traffic trend data.
-   **Require top countries:** Toggle to only return results with visitor country data.

**Outputs**

-   Web traffic sources breakdown (direct, search, social, mail, referrals).
-   Historical traffic data over time.
-   Top visitor countries and percentages.
-   Year-over-year traffic growth percentage.

### `Action` Find private company social metrics

Use this action to retrieve historical social media metrics for companies, including Twitter followers and Facebook likes data over time.

**Inputs**

At least one of the following company identifiers is required:

-   **Company domain:** The company's website domain.
-   **Professional profile URL**
-   **Facebook ID:** Company's Facebook profile ID (e.g., `adobe` from [facebook.com/adobe](http://facebook.com/adobe)).
-   **Twitter ID:** Company's Twitter handle (e.g., `adobe` from [twitter.com/adobe](http://twitter.com/adobe)).
-   **Crunchbase ID:** Company's Crunchbase identifier.
-   **Pitchbook ID:** Company's Pitchbook identifier.
-   **Product Hunt ID:** Company's Product Hunt identifier.
-   **Dealroom ID:** Company's Dealroom identifier.
-   **Golden ID:** Company's Golden identifier.
-   **AngelList/Wellfound ID:** Company's AngelList/Wellfound identifier.

Optional:

-   **Date filter:** Filter historical data from a specific date (defaults to 12 months ago if not specified).
-   **Require Facebook likes trends:** Toggle to include historical Facebook page likes data.
-   **Require Twitter followers trends:** Toggle to include historical Twitter followers data.

### Run settings

-   **Auto-update:** Turn on to automatically re-run the enrichment when row data changes. Recommended when data is expected to update regularly.
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