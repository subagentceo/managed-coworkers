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

Enrow integration

# Enrow integration

Data tool for email verification and contact finding.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Enrow is an email finding and validation tool that also provides mobile phone number lookup. In Clay, you can use Enrow to find a contact's work email, verify its deliverability, and find their mobile phone number.

## Enriching data with Enrow

1.  While in a Clay table, click `Add enrichment` and search for `Enrow`.
2.  Under `Integrations`, select one of the Enrow actions.
3.  Choose to use your own Enrow API key or the Clay-managed account.
    -   If you haven't connected an account yet, click `+ Add account` and enter your API key. You can find your API key in the `Integrations` section of your Enrow account.

### `Action` Find work email

Find a person's work email address from their name and company domain or company name.

**Inputs**

Required:

-   `Person's name`: The person's full name.

Optional:

-   `Company domain`: The person's company domain (e.g., `clay.com`). Required if `Company name` is not provided.
-   `Company name`: The person's company name (e.g., `Clay`). Required if `Company domain` is not provided.
-   `Country`: The country of the provided company (e.g., `US` or `United States of America`). Only relevant when using `Company name` instead of `Company domain`.

**Outputs**

-   `Result`:
    -   `Email`: The found work email address.
    -   `Qualification`: The email qualification status (e.g., `valid`).
    -   `Info`:
        -   `Company domain`: The company domain associated with the email.
        -   `First name`: The person's first name as interpreted by Enrow.
        -   `Last name`: The person's last name as interpreted by Enrow.

### `Action` Validate work email

Validate a person's work email address for deliverability.

**Inputs**

Required:

-   `Person's work email`: The work email address to validate (e.g., `colin@clay.com`).

**Outputs**

-   `Email`: The validated email address.
-   `Qualification`: The validation status (e.g., `valid`).
-   `ID`: A unique identifier for the validation result.

### `Action` Find mobile phone number

Find a person's mobile phone number from their professional profile URL or basic identifying information.

**Note:** You must provide either a **Professional profile URL**, or a combination of **First name**, **Last name**, and at least one of **Company name** or **Company domain**.

**Inputs**

-   `Professional profile URL`: URL of the person's professional profile (e.g., a LinkedIn URL). Required if first name, last name, and company information are not provided.
-   `First name`: The person's first name. Required if `Professional profile URL` is not provided.
-   `Last name`: The person's last name. Required if `Professional profile URL` is not provided.
-   `Company name`: The person's company name. Required if `Professional profile URL` is not provided and `Company domain` is not provided.
-   `Company domain`: The person's company domain (e.g., `clay.com`). Required if `Professional profile URL` is not provided and `Company name` is not provided.

**Outputs**

-   `Phone number`: The person's mobile phone number in international format (e.g., `+18682835770`).
-   `Qualification`: The status of the phone number result (e.g., `found`).
-   `Country`: The country code associated with the phone number (e.g., `TT`).

### Run settings

-   `Auto-update`: Automatically re-runs the enrichment when new rows are added to the table. Recommended when you are regularly adding new contacts and want enrichment to stay current.
-   `Only run if`: Only run the enrichment when certain conditions are met (e.g., when a specific column has a value).

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