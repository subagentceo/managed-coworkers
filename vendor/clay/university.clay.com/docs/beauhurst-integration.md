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

](#)

/

Beauhurst integration

# Beauhurst integration

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Beauhurst is a private company intelligence platform covering every private company in the UK and Germany. Within Clay, you can use Beauhurst to enrich companies with registration details, funding history, and corporate structure data — purpose-built for UK and German markets.

## Enriching data with Beauhurst

1.  While in a Clay table, click `Add enrichment` and search for `Beauhurst`.
2.  Under `Integrations`, select one of the Beauhurst actions.
3.  In the modal, you will be asked to `Select Beauhurst account`.
    -   If you haven't already connected your Beauhurst account, click `+ Add account` and enter your API key. You can find your API key in your Beauhurst account settings.

**Note:** Beauhurst covers private companies in the **UK and Germany only**. Actions will return no data for companies outside these markets. Credits are refunded when no data is returned.

### `Action` Enrich company (UK & Germany)

Enrich a company using its domain to fetch registration details, address, live status, and contact information.

**Inputs**

Required:

-   Company domain: The domain of the company to enrich.

**Outputs**

-   Name: The company's trading name.
-   Registered Name: The company's full legal registered name.
-   Registration Date: The date the company was incorporated.
-   Other Trading Names: Any additional trading names associated with the company.
-   Company Registration Number: The official registration number (Companies House for UK; equivalent for Germany).
-   Employee Count Range: Banded employee count (e.g., `>1000`).
-   Websites: All website URLs associated with the company.
-   Company Status: The live status of the company (e.g., Active).
-   Is SME: Whether the company qualifies as a small or medium-sized enterprise.
-   Country: The country code of the company's registered country.
-   Region: The regional identifier for the company's location.
-   Address: The company's trading address.
-   Company Telephone: The company's primary phone number.
-   Company Emails: Email addresses associated with the company.
-   Registered Address: The company's official registered address.
-   LinkedIn URL: The company's LinkedIn profile URL.

### `Action` Find company funding (UK & Germany)

Get a company's funding overview using its domain to retrieve raise history, grant totals, and latest valuation.

**Inputs**

Required:

-   Company domain: The domain of the company to look up.

**Outputs**

-   N Fundraisings: The total number of fundraising rounds the company has completed.
-   Total Amount Fundraisings: The total capital raised across all fundraising rounds.
-   N Grants: The total number of grants the company has received.
-   Total Amount Grants: The total value of all grants received.
-   Latest Valuation: The company's most recent known valuation.

### `Action` Find company corporate structure (UK & Germany)

Map a company's corporate structure using its domain to identify its ultimate parent, immediate parent, and all subsidiaries.

**Inputs**

Required:

-   Company domain: The domain of the company to map.

**Outputs**

-   Ultimate Parent: The top-level parent entity in the corporate hierarchy.
    -   Name: The ultimate parent company name.
    -   Company Registration Number: The ultimate parent's registration number.
-   Immediate Parent: The direct parent company one level above.
    -   Name: The immediate parent company name.
    -   Company Registration Number: The immediate parent's registration number.
    -   Country: The country where the immediate parent is registered.
-   All Children: An array of all known subsidiaries.
    -   Name: The subsidiary company name.
    -   Company Registration Number: The subsidiary's registration number.
    -   Country: The country where the subsidiary is registered.

### Run settings

-   **Auto-update:** Turn on auto-update to keep company data current as records are added or change over time. Recommended when using Beauhurst as part of an ongoing enrichment workflow.
-   **Only run if:** The enrichment will only run when specified conditions are met. [**Learn more about conditional formulas here.**](https://www.clay.com/university/guide/conditional-formulas)

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