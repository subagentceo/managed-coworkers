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

Owler integration

# Owler integration

Business intelligence platform offering competitive insights, lead generation, and real-time alerts.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Owler is a business intelligence platform for competitive insights, lead generation, and company data research.

With this integration, you can enrich company profiles, retrieve recent company updates, and identify competitors by providing a company domain.

## Enriching data with Owler

1.  While in a Clay table, click `Add enrichment` and search for `Owler`.
2.  Under `Integrations`, select one of the Owler actions.
3.  In the modal, you will be asked to `Select Owler account`.
    -   If you haven't already connected an account, click `+ Add account`. You can either use a **Clay-managed account** (billed with Clay Credits) or bring your own Owler API key. Connecting via API key is only available to paid Clay users.

### `Action` Enrich Company

Retrieves comprehensive company information — including revenue, funding history, employee count, and leadership — for a given company domain.

**Note:** For best coverage, Owler recommends using this action for North American companies with over 500 employees.

**Inputs**

Required:

-   Company Domain: The domain of the company to enrich (e.g., `google.com`).

**Outputs**

-   Name: The company's full legal name.
-   Website: The company's website URL.
-   Description: A short description of the company.
-   Revenue: The company's estimated annual revenue.
-   Status: The company's operational status (e.g., Private, Subsidiary).
-   Company ID: Owler's internal identifier for the company.
-   Short Name: The company's commonly used short name.
-   Logo URL: URL of the company's logo image.
-   Profile URL: URL of the company's Owler profile page.
-   Company Type: The type of company (e.g., Private, Public).
-   Founded Date: The year the company was founded.
-   Employee Count: The estimated number of employees.
-   Total Funding: Total funding amount raised.
-   Latest Funding Round: The most recent funding round type (e.g., Series B, IPO).
-   Investor Names: Comma-separated list of investor names.
-   Perm ID: The company's Refinitiv Permanent Identifier URL.
-   SIC Code: Array of Standard Industrial Classification codes.
-   Facebook Link: URL of the company's Facebook page.
-   Twitter Link: URL of the company's Twitter/X profile.
-   YouTube Link: URL of the company's YouTube channel.
-   LinkedIn Link: URL of the company's LinkedIn page.
-   Portfolio Company IDs: Array of IDs for companies in the company's portfolio.
-   Stock: Stock information for publicly traded companies.
    -   Ticker: The stock ticker symbol (e.g., GOOG).
    -   Exchange: The exchange the stock is listed on (e.g., NASDAQ).
-   CEO: Information about the company's chief executive officer.
    -   First Name: The CEO's first name.
    -   Last Name: The CEO's last name.
    -   Image URL: URL of the CEO's profile image.
    -   CEO Rating: Owler community rating for the CEO.
-   Sectors: Array of sectors the company operates in.
    -   Name: The sector name (e.g., Search Engine Optimization).
    -   Parent Industry: The broader industry category.
-   Funding: Array of individual funding rounds.
    -   Date: The date of the funding round.
    -   Amount: The amount raised in the round.
    -   Type: The round type (e.g., Angel, Series A).
    -   Undisclosed: Whether the amount was undisclosed.
    -   Investor: Array of investors in the round.
        -   Name: Investor name.
        -   Company ID: Owler's internal ID for the investor.
        -   Website: Investor's website.
-   Acquisition: Array of companies acquired.
    -   Name: Name of the acquired company.
    -   Date: Date of the acquisition.
    -   Website: Website of the acquired company.
    -   Amount: Acquisition price.
    -   Undisclosed: Whether the price was undisclosed.
    -   Status: Acquisition status (e.g., Subsidiary).
    -   Company ID: Owler's internal ID for the acquired company.
-   HQ Address: The company's headquarters location.
    -   Street 1: Street address.
    -   City: City name.
    -   State: State or region code.
    -   Country: Country code.
    -   Phone: HQ phone number.
    -   Postal Code: ZIP or postal code.
-   Industries: Array of industry categories the company belongs to.
-   Parent Name: Name of the parent company, if applicable.
-   Parent Website: Website of the parent company.
-   Parent Date: Date the parent relationship was established.
-   Parent ID: Owler's internal ID for the parent company.

### `Action` Find Company Updates

Retrieves recent company updates — including news, press releases, funding announcements, acquisitions, personnel changes, blog posts, and videos — for a given company domain.

**Inputs**

Required:

-   Company Domain: The domain of the company to retrieve updates for (e.g., `google.com`).

Optional:

-   Update Categories: Filter results by update type. Select one or more: News, Press, Funding, Acquisition, People, Blog, Videos.
-   Limit: The number of updates to return (maximum: 20). Defaults to 20, sorted by most recent first.

**Outputs**

-   Feeds: Array of company update items.
    -   ID: Unique identifier for the feed item.
    -   Category: The type of update (e.g., NEWS, FUNDING).
    -   Title: Headline or title of the update.
    -   Description: Short summary of the update.
    -   Publisher Name: Name of the publishing outlet.
    -   Publisher Logo: URL of the publisher's logo.
    -   Source URL: Link to the original article or source.
    -   Enclosure Image: URL of the associated image.
    -   Feed Date: Publication date of the update.
    -   Owler Feed URL: URL to the update on Owler's platform.
-   Company Data: Basic profile of the company associated with the updates.
    -   Name: The company's name.
    -   Website: The company's website URL.

### `Action` Find Company Competitors

Retrieves a list of competitors for a given company based on Owler's competitive intelligence data.

**Inputs**

Required:

-   Company Domain: The domain of the company to find competitors for (e.g., `google.com`).

**Outputs**

-   Competitor: Array of competitor company objects.
    -   Name: The competitor's full name.
    -   Website: The competitor's website URL.
    -   Score: Owler's competitive relevance score.
    -   Company ID: Owler's internal identifier for the competitor.
    -   Short Name: The competitor's commonly used short name.
    -   Logo URL: URL of the competitor's logo image.
    -   Profile URL: URL of the competitor's Owler profile page.
-   Competitor Names: Comma-separated list of all competitor names.

### Run settings

-   Auto-update: Turn on to re-run this enrichment automatically when the table updates. Recommended if you regularly add new companies and want fresh data without manual re-runs.
-   Only run if: Set conditions to control when this enrichment runs. [**Learn more about conditional formulas here!**](https://university.clay.com/docs/only-run-if-conditional-formulas)

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