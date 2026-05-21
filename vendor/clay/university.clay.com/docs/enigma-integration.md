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

Find

](/docs-topics/find)

/

Enigma integration

# Enigma integration

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Enigma is a business intelligence platform that provides accurate identity, payment technographic, and financial data on U.S. businesses. With this integration, you can enrich company records in Clay with Enigma's identity resolution, operating location data, payment technology detection, and card transaction metrics.

## Enriching data with Enigma

1.  While in a Clay table, click `Add enrichment` and search for `Enigma`.
2.  Under `Integrations`, select one of the Enigma actions.
3.  In the modal, you will be asked to `Select Enigma account`.
    -   If you haven't already connected your Enigma account, click `+ Add account` and enter your API key. You can find your API key in your [Enigma console](https://console.enigma.com/).

**Note:** Enigma's data covers U.S. businesses only. An active Enigma account with API access is required to use this integration.

### `Action` Resolve company identity

Resolve a company's brand name, legal name, and website using partial company identifiers.

**Inputs:**

Required:

-   Company domain: The domain of the company you are trying to resolve. (Required if Company name or Legal company name is not provided.)
-   Company name: The brand name of the company you are trying to resolve, e.g. `Clay`. (Required if Company domain or Legal company name is not provided.)
-   Legal company name: The legal name of the company you are trying to resolve, e.g. `Clay Labs Inc`. (Required if Company domain or Company name is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   Legal Entity Name: The legal entity name of the company.
-   Company Name: The brand name of the company.
-   Company Website: The website URL of the company.

### `Action` Find person's company affiliations

Find the companies, brands, or websites associated with a specific person.

**Inputs:**

Required:

-   First name: The first name of the person you are looking up company affiliations for.
-   Last name: The last name of the person you are looking up company affiliations for.

Optional:

-   Max company affiliations to return: The maximum number of company affiliations to return. Defaults to `10`, maximum is `100`. Costs 0.4 or 0.2 credits per company affiliation depending on your plan.

**Outputs:**

-   Company name: The brand name of the top affiliated company.
-   Company website: The website of the top affiliated company.
-   Legal entity name: The legal entity name of the top affiliated company.
-   Number of affiliations requested: The total number of affiliations returned.
-   Company affiliations: An array of all returned company affiliations, each containing:
    -   Job title: The person's job title at the affiliated company.
    -   Company name: The brand name of the affiliated company.
    -   Company website: The website of the affiliated company.
    -   Legal entity name: The legal entity name of the affiliated company.

### `Action` Get operating location addresses

Retrieve the physical addresses for all operating locations associated with a brand. A maximum of 100 operating locations can be returned.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Max operating locations to return: The maximum number of operating locations to return. Defaults to `10`, maximum is `100`. Costs 0.8 credits per operating location returned.

**Outputs:**

-   Operating Locations: An array of physical address strings for each operating location (e.g., `410 TERRY AVE N SEATTLE WA 98109`).
-   Operating Location Requested Count: The number of operating locations returned.

### `Action` Get operating location count

Count the total number of operating locations a brand operates.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   Operating location count: The total number of operating locations associated with the brand.

### `Action` Get payment technologies

Identify payment technologies used by a brand's operating locations and website.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   Number of Operating Location Payment Technologies: The count of payment technologies detected at the company's operating locations.
-   Number of Website Payment Technologies: The count of payment technologies detected on the company's website.
-   Number of Payment Technologies: The total combined count of payment technologies detected.
-   Operating Location Payment Technologies: An array of payment technology names detected at operating locations (e.g., `Square`).
-   Website Payment Technologies: An array of payment technology names detected on the website (e.g., `Square`).

### `Action` Get 12-month card revenue

Fetch the estimated card transaction revenue for a company over the last 12 months.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   12-Month Card Revenue Projected Quantity: The estimated total card transaction revenue over the last 12 months.

### `Action` Get 12-month average transaction size

Fetch the average card transaction size for a company over the last 12 months.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   12-Month Average Card Transaction Size Projected Quantity: The average value per card transaction over the last 12 months.

### `Action` Get 12-month card growth rate

Retrieve the year-over-year card transaction growth rate for a company over the last 12 months.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   12-Month Card Growth Rate Projected Quantity: The year-over-year card transaction growth rate for the last 12 months.

### `Action` Get 3-month card growth rate

Retrieve the year-over-year card transaction growth rate for a company over the last 3 months.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   3-Month Card Growth Rate Projected Quantity: The year-over-year card transaction growth rate for the last 3 months.

### `Action` Get 12-month average transaction count

Retrieve the total number of card transactions for a company over the last 12 months.

**Inputs:**

Required:

-   Company domain: The domain of the company. (Required if Company name is not provided.)
-   Company name: The name of the company. (Required if Company domain is not provided.)

Optional:

-   Street address 1: The first line of the company's street address. Only US addresses are supported.
-   Street address 2: The second line of the company's street address. Only US addresses are supported.
-   City: The city of the company. Only US addresses are supported.
-   State: The state of the company. Only US addresses are supported.
-   ZIP code: The ZIP code of the company. Only US addresses are supported.

**Outputs:**

-   12-Month Card Transaction Count Projected Quantity: The total number of card transactions over the last 12 months.

### Run settings

-   `Auto-update`: Automatically re-runs the enrichment when a row changes. Recommended when your input data (e.g., company domain or name) may be updated over time and you want Enigma results to stay current.
-   `Only run if`: The enrichment will only run if specified conditions are met. [Learn more about conditional formulas here!](https://www.clay.com/university/guide/conditional-formulas)

## FAQs

### What businesses does Enigma cover?

Enigma's data covers U.S. businesses only. Address fields (street address, city, state, ZIP code) only support U.S. addresses when used as lookup filters.

### Do I need a paid Enigma account to use this integration?

Yes. An active Enigma account with API access is required. You can request access and retrieve your API key from the [Enigma console](https://console.enigma.com/).

### Can I use a company name instead of a domain?

Yes. For most Enigma actions, either a company domain or a company name is sufficient to run the enrichment. Providing both, or adding optional address fields, can help improve match accuracy for companies with common names or multiple locations.

### Why do some actions return a "Projected Quantity" output?

Enigma's card transaction metrics (revenue, growth rate, transaction count, and transaction size) are derived from a large anonymized panel of credit and debit card data and are modeled estimates, not exact figures reported by the business.

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

### Vector integration

Find hashed emails with Vector.

View article

[View article](/docs/vector-integration)View article

Enrich

### CB Insights

Enrich company records with funding history, valuations, revenue ranges, industry classifications, and more.

View article

[View article](/docs/cb-insights)View article

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