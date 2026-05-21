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

Export

](/docs-topics/export)

/

Autobound integration

# Autobound integration

Automates personalized email creation and insight generation

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Autobound automates personalized email creation and insight generation, improving outreach efficiency by tailoring content to each contact's unique profile and company data.

With this integration, you can create targeted outreach, generate personalized content, and gather comprehensive company insights based on data analysis.

## **Enriching data with Autobound**

1.  While in a Clay table, click `Add enrichment` and search for `Autobound`.
2.  Under `Integrations`, select one of the Autobound options.
3.  In the modal, you will be asked to `Select Autobound account`.
    -   If you have your own account, click `+ Add account` and go through authentication. Otherwise, use the Clay provided key.

### `Action` Generate personalized content

Use this action to create highly personalized outreach by leveraging 300+ data points about both sender and recipient, including news, growth trends, social media, and podcast mentions.

**Inputs**

-   **User Identity** (at least one required):
    -   User LinkedIn URL: Identifies sender for relevant insights
    -   User email address: Alternative sender identification
    -   User company URL: Explicitly sets sender's company
-   **Contact Identity** (at least one required):
    -   Contact LinkedIn URL: Identifies prospect and their company
    -   Contact email address: Alternative prospect identification
    -   Contact company URL: Identifies company when other identifiers unavailable
-   **Content type:**
    -   Email
    -   Email opener
    -   Call script
    -   LinkedIn connection request
    -   SMS text
    -   Email sequence (2 steps, 10.5 credits)
    -   Email sequence (3 steps, 14 credits)
    -   Email sequence (4 steps, 17.5 credits)
-   **Writing style:** Basho, Challenger sale, Clever poet, C-suite pitch, Data-driven, Why you why now, or Custom
-   **Value proposition:** Format example: "Most \[personas\] struggle with \[pain point\]. We help achieve \[benefit\] by \[unique approach\]"
-   **Additional context:** Freeform guidance like opportunity notes or past conversations

**Output**

-   Emails: Subject line and message body
-   Email sequences: Multiple email messages with subject lines
-   Other content types: Appropriately formatted content

### `Action` Generate people and company insights

Use this action to create personalized insights for outreach by leveraging LinkedIn and email data to streamline research and power personalized content creation.

**Inputs**

-   **User LinkedIn URL or User email address (Required):** Used to identify the seller for generating relevant relationship insights.
-   **Contact LinkedIn URL or Contact email address (Required):** Used to identify the prospect and their company.
-   **Insight subtypes (Optional):** Specify up to 5 types of insights you want to focus on.

### `Action` Generate company insights

Use this action to gather company-level intelligence to enhance lead engagement and conversion strategies.

**Inputs**

-   **Contact company URL (Required):** Used to resolve the prospect's company domain.
-   **Optional Identification Fields (at least one required):**
-   **User LinkedIn URL:** Used to identify the seller for returning relevant insights, including relationship insights between companies.
-   **User email address:** Alternative way to identify the seller.
-   **User company URL:** Used to identify the seller's company.
-   **Insight subtypes (Optional):** Specify up to 5 specific insight types:
    -   Company business model
    -   Employee breakdown and growth (by department & over time)
    -   HR Specific: Employee breakdown and growth
    -   Finance Specific: Employee breakdown and growth
    -   Market trends
    -   Prospect's case study
    -   Prospect's customers
    -   Prospect's investors
    -   Competitor's earnings call
    -   Names of prospect's competitors
    -   Prospect's competitor is your customer
    -   Company is earning less and profits are shrinking
    -   Company's earnings and operational efficiency are too low

**Output**

-   Funding rounds
-   Hiring trends
-   Competitor moves
-   10-K filings
-   Earnings calls
-   35+ news event types

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