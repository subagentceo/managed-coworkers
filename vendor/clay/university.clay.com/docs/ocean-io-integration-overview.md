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

Ocean.io integration

# Ocean.io integration

Find companies similar to a given company based on various criteria.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

[Ocean.io](http://Ocean.io) is an AI-powered company discovery platform that helps you find companies and people similar to a given target based on criteria like industry, size, location, and technology. Within Clay, you can use [Ocean.io](http://Ocean.io) to create a new table populated with lookalike companies, or enrich existing rows to find matching companies and people that fit your ICP.

## Creating a table with [Ocean.io](http://Ocean.io)

1.  While in a Clay workbook, click `+ Add` and search for `Ocean.io`.
2.  Under `Sources`, select `Find company lookalikes with Ocean.io`.
3.  In the setup panel, you will be asked to `Select Ocean.io account`.
    -   If you haven't already connected your [Ocean.io](http://Ocean.io) account, click `+ Add account` and enter your API key. Otherwise, select the Clay-provided key.

**Note:** Before importing, Ocean.io displays a preview panel with high-level distribution stats — industries, company sizes, and countries — based on your seed domains and filters. Use this to fine-tune your configuration before any credits are consumed.

### `Source` Find company lookalikes with [Ocean.io](http://Ocean.io)

Start with up to 10 seed company domains and find a list of similar companies to populate a new Clay table. You are charged 1 credit per result returned.

**Inputs**

Required:

-   Company domain: The seed company domain(s) to use for lookalike discovery. Accepts up to 10 domains.

Optional:

-   Domains to exclude: Domains to exclude from the results. Separate multiple values with commas.
-   Primary countries (headquarters): Filter by countries where the company has its primary presence (headquarters). Multi-select.
-   Countries (general presence): Filter by all countries where the company has any presence. Multi-select. When combined with other location filters, results matching any condition are returned.
-   States: Filter by states using ISO abbreviations. Must be used with `States country`. Separate multiple values with commas.
-   States country (for states filter only): Specify the country for the states filter above.
-   Company sizes: Filter by company size ranges. Multi-select.
-   Revenue ranges: Filter by revenue ranges. Multi-select.
-   Headquarter geolocation latitude and longitude: Latitude and longitude of the target's headquarters (e.g., `37.7749,-122.4194`). Must be used with `Headquarter geolocation radius`.
-   Headquarter geolocation radius: Radius in meters around the specified geolocation. Must be used with `Headquarter geolocation latitude and longitude`.
-   Keywords: Keywords to search for in the company description. Separate multiple values with commas.
-   Keywords operator: How keywords are matched — `Any of`, `All of`, or `None of`. Default: Any of.
-   Technologies: Filter by technologies used by the company. Multi-select.
-   Technologies operator: How technologies are matched — `Any of` or `All of`. Default: Any of.
-   Industries: Filter by industries. Multi-select.
-   Industries operator: How industries are matched — `Any of`, `All of`, or `None of`. Default: Any of.
-   Industry categories: Filter by industry categories. Multi-select.
-   Industry categories operator: How industry categories are matched — `Any of`, `All of`, or `None of`. Default: Any of.
-   Include only ecommerce companies: When enabled, filters results to only ecommerce companies.
-   Exclude ecommerce companies: When enabled, excludes ecommerce companies from results.
-   Minimum similarity score: Minimum lookalike similarity threshold. Default: 0.79.
-   Limit results: Maximum number of results to return.
-   Additional filters: Dynamic field filters for additional company properties.

## Enriching data with [Ocean.io](http://Ocean.io)

1.  While in a Clay table, click `Add enrichment` and search for `Ocean.io`.
2.  Under `Integrations`, select one of the [Ocean.io](http://Ocean.io) actions.
3.  In the modal, you will be asked to `Select Ocean.io account`.
    -   If you haven't already connected your [Ocean.io](http://Ocean.io) account, click `+ Add account` and enter your API key. Otherwise, select the Clay-provided key.

### `Action` Find lookalike companies with [Ocean.io](http://Ocean.io)

Use this action to identify companies similar to a specified target based on custom filters like size, industry, location, and keywords. You are charged 1 credit per result returned.

**Inputs**

Required:

-   Company domain: The domain(s) of the target company. Accepts up to 10 domains.

Optional:

-   Domains to exclude: Domains to exclude from results. Separate multiple values with commas.
-   Primary countries (headquarters): Filter by countries where the company has its primary presence. Multi-select.
-   Countries (general presence): Filter by all countries where the company has any presence. Multi-select.
-   States: Filter by states using ISO abbreviations. Must be used with `States country`.
-   States country (for states filter only): Specify the country for the states filter.
-   Company sizes: Filter by company size ranges. Multi-select.
-   Revenue ranges: Filter by revenue ranges. Multi-select.
-   Headquarter geolocation latitude and longitude: Latitude and longitude for geolocation filtering (e.g., `37.7749,-122.4194`). Must be used with `Headquarter geolocation radius`.
-   Headquarter geolocation radius: Radius in meters around the specified geolocation. Must be used with `Headquarter geolocation latitude and longitude`.
-   Keywords: Keywords to filter by in the company description. Separate multiple values with commas.
-   Keywords operator: How keywords are matched — `Any of`, `All of`, or `None of`. Default: Any of.
-   Technologies: Filter by technologies. Multi-select.
-   Technologies operator: How technologies are matched — `Any of` or `All of`. Default: Any of.
-   Industries: Filter by industries. Multi-select.
-   Industries operator: How industries are matched — `Any of`, `All of`, or `None of`. Default: Any of.
-   Industry categories: Filter by industry categories. Multi-select.
-   Industry categories operator: How industry categories are matched — `Any of`, `All of`, or `None of`. Default: Any of.
-   Include only ecommerce companies: Filter results to only ecommerce companies.
-   Exclude ecommerce companies: Exclude ecommerce companies from results.
-   Minimum similarity score: Minimum lookalike similarity threshold. Default: 0.79.
-   Limit results: Maximum number of results to return. Default: 10. Maximum: 50.
-   Additional filters: Dynamic field filters for additional company properties.

**Outputs**

Returns up to 10 ranked lookalike results. Each result includes:

-   Company:
    -   Domain: The company's website domain.
    -   Name: The company's display name.
    -   Legal name: The company's registered legal name.
    -   Description: A brief description of the company.
    -   Company size: Employee headcount range (e.g., `51-200`).
    -   Employee count (Ocean): Employee count from [Ocean.io](http://Ocean.io)'s database.
    -   Employee count (LinkedIn): Employee count from LinkedIn.
    -   Revenue: Estimated revenue range (e.g., `10-50M`).
    -   Year founded: The year the company was founded.
    -   Primary country: The company's primary country of operation.
    -   Countries: All countries where the company has a presence.
    -   Locations: Array of office locations with latitude, longitude, country, and locality.
    -   Industries: Array of specific industries.
    -   Industry categories: Array of broader industry categories.
    -   Keywords: Keywords associated with the company's description.
    -   Technologies: Technologies used by the company.
    -   Technology categories: Categories of technologies used.
    -   Emails: Known public contact email addresses.
    -   Phones: Phone numbers with country and primary flag.
    -   Logo: URL of the company logo.
    -   Mobile apps: App store links and names for the company's mobile apps.
    -   Web traffic: Visits, page views, pages per visit, and bounce rate.
    -   Medias: Social media profiles (LinkedIn, Twitter, YouTube, Facebook) including URL, handle, and name.
-   Score: The similarity score for the result.

### `Action` Find lookalike people with [Ocean.io](http://Ocean.io)

Find people similar to given professional profiles based on various criteria. You are charged 1 credit per result returned.

**Inputs**

Required:

-   Professional profile URL: The LinkedIn profile URL of the target person.

Optional:

-   Professional profile URLs to include: Additional profile URLs to include in the search.
-   Professional profile URLs to exclude: Profile URLs to exclude from results.
-   Seniorities: Filter by professional seniority levels.
-   Job title keywords: Filter by specific job title keywords.
-   Job titles operator: Specify how job title keywords should be matched.
-   Job titles similarity threshold: Set the matching threshold for job titles.
-   States: Filter by states where lookalikes are based (ISO abbreviations). Must be used with `States country`.
-   States country (for states filter only): Specify the country for the states filter.
-   Countries: Filter by countries where lookalikes are based. Multi-select.
-   Lookalike company domain: Filter lookalikes to those working at a specific company domain.
-   Domains to include: Additional company domains to include in the search.
-   Domains to exclude: Company domains to exclude from results.
-   Company primary countries: Filter by company headquarters location. Multi-select.
-   Company sizes: Filter by company size ranges. Multi-select.
-   Company industries: Filter by specific industries. Multi-select.
-   Company industries operator: Specify how the industry filter is applied — `Any of`, `All of`, or `None of`.
-   Maximum number of lookalikes: Maximum number of results to return.
-   Maximum number of lookalikes per company: Limit the number of results returned per company.
-   Minimum lookalike score: Set the minimum similarity threshold for results — options include `Very similar`, `Similar`, and `Slightly similar`.

**Outputs**

-   People: Array of matching people, each containing:
    -   ID: [Ocean.io](http://Ocean.io) internal ID for the person.
    -   Domain: The company domain where the person works.
    -   Name: Full name.
    -   First name: First name.
    -   Last name: Last name.
    -   Country: Country where the person is based.
    -   State: State where the person is based.
    -   LinkedIn URL: The person's LinkedIn profile URL.
    -   Job title: The person's current job title.
    -   Seniorities: Array of seniority levels.
    -   Departments: Array of departments the person is associated with.
    -   Photo: URL of the person's LinkedIn profile photo.
    -   Company:
        -   Name: The company name.
        -   Company size: Headcount range of the company.
        -   Logo: URL of the company logo.

## Run settings

-   `Auto-update`: Recommended when you want new rows added to a Clay table to automatically trigger the enrichment.
-   `Only run if`: The enrichment will only run if specified conditions are met. [Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101)

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