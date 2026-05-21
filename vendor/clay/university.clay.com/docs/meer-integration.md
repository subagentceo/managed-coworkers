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

Web scraping

](/docs-topics/web-scraping)

/

Meer integration

# Meer integration

Screen phone numbers against national do-not-call registries before initiating outbound calls.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

**Important:** Before you can use the Meer integration, you must first accept the compliance terms and conditions. Visit the [Compliance page](https://app.clay.com/settings/enrichments?enrichmentTab=compliance) in your workspace settings to accept the terms. Once accepted, the Meer enrichment will appear in your actions panel.

‍

The Meer integration helps you maintain Do Not Contact (DNC) compliance by screening phone numbers against national do-not-call registries before initiating outbound calls.

With this integration, you can check phone numbers against regularly updated DNC registries and receive status information to help you avoid contacting numbers on do-not-call lists.

## Using Meer in Clay

1.  While in a Clay table, click `Actions` and search for `Meer`.
2.  Under `Enrichments`, select `Screen phone number against DNC registries`.
3.  Choose to use your own Meer API key or the Clay-managed account.

### `Action` Screen phone number against DNC registries

Check if a phone number appears in National Do Not Call registries. Currently supports US (National DNC Registry), UK (TPS/CTPS) registries, Germany ([Robinsonliste.de](http://robinsonliste.de/)), and Ireland ([comreg.ie](http://comreg.ie/)) refreshed weekly. Returns DNC status and source information if found.

**Inputs**

-   **Phone Number (Required):** The phone number to check against DNC registries. Phone numbers are automatically normalized, but E.164 format is recommended (e.g., `+19199463022`).

**Output**

-   **Do Not Call:** Boolean value indicating whether the phone number is on a DNC registry (`true`) or not (`false`).
-   **Timestamp:** The date and time when the DNC status was checked.
-   **DNC List Source:** URL of the official registry where the phone number was found (if applicable).

**Pricing**

2 Clay credits per call (charged even if the number is not on the list).

**Rate Limits**

-   Clay key: 100 requests per second, 100 concurrent requests
-   User private key: 10 requests per second, 10 concurrent requests

## Compliance notes

-   You are responsible for your own compliance. Do Not Call Suppression is a risk-mitigation tool. It does not ensure compliance. It's always your job to assess your compliance obligations and ensure you meet them. For more guidance, see our [DNC compliance best practices](https://university.clay.com/docs/dnc-compliance) and [B2B email marketing best practices](https://university.clay.com/docs/direct-marketing-best-practices).
-   Clay and its third-party providers are not liable for any fines or costs associated with any DNC violations you might commit.
-   You are responsible for adding the DNC screening actions into your Clay workflows and refreshing the data in your CRM on a regular basis to avoid calling DNC numbers.
-   Clay's third-party providers may submit your company name to the applicable governing bodies for the purpose of proving that you are using a screening tool to help respect DNC rules.
-   You must have the authority to accept these terms on behalf of your organization.

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