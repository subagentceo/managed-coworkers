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

People Data Labs integration overview

# People Data Labs integration overview

Enrich B2B person and company profiles with comprehensive, actionable data.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## **Getting started with People Data Labs**

The People Data Labs integration in Clay enables users to enrich person data, find personal emails, and generate segmented lists of people based on query parameters in Clay.

With People Data Labs, you can perform a variety of actions, including:

-   Enrich Company
-   Enrich Person
-   Find Personal Email
-   Get Employee Count by Criteria

With People Data Labs, you can perform a variety of actions, including:

## **Getting better email and phone number coverage with waterfall enrichments**

People Data Labs is great for finding email and phone number contacts, but it's not the only way to get this data.

For better coverage on email data, we recommend using [Clay's waterfall enrichments](https://www.clay.com/waterfall-enrichment), which will let you search sequentially across multiple data providers. Learn more on how to use Clay waterfalls with this [Clay University lesson](https://www.clay.com/university/lesson/enrich-people-waterfalls-clay-101).

With that in mind, let’s dive into using People Data Labs within Clay!

## **Connecting with Clay with People Data Labs**

### **Option 1: Use the Clay-managed People Data Labs account**

By default, People Data Labs enrichments will use the Clay-managed People Data Labs account. This means that any new enrichment will charge the designated credit amount.

Simply pull up any People Data Labs enrichment within Clay to use the Clay-managed People Data Labs account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a5f078facf2f1bbf55_674e81636f7ad240fd62c60f_67306c6ea6c230323ab96374_67306c3b47a5e516c0a3aa8a_CleanShot%252525202024-10-23%25252520at%2525252013.10.49%252525402x.png)

For more information on how many credits you’ll be charged for each action, check out the list below.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a5f078facf2f1bbf58_674e81636f7ad240fd62c612_67306c6ea6c230323ab96378_67306c4824e5d4624f56893a_CleanShot%252525202024-10-23%25252520at%2525252017.03.26%252525402x.png)

### **Option 2: Add your own People Data Labs API key**

If you are currently on a paid plan, you can use your own People Data Labs account within Clay through an API key.

You can access your People Data Labs API key through the **Integrations** section.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a5f078facf2f1bbf5b_674e81636f7ad240fd62c602_67306c6ea6c230323ab96394_67306c5647a5e516c0a3cb4b_CleanShot%252525202024-10-23%25252520at%2525252013.09.50%252525402x.png)

You can add your API key by **Add Account** through any People Data Labs enrichment.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a5f078facf2f1bbf5e_674e81636f7ad240fd62c60c_67306c6ea6c230323ab9637c_67306c6524e5d4624f56a453_CleanShot%252525202024-10-23%25252520at%2525252013.12.13%252525402x.png)

## Available actions with the People Data Labs integration

### `Action` Enrich Company

Retrieve enriched company data such as industry, revenue, employee count, and more.

**Setup Inputs**

-   **Company Domain**: The company’s primary domain, e.g., [google.com](http://google.com).
-   **Company Social Profile** (Optional): Social URL for the company, e.g., LinkedIn profile.
-   **Company Stock Ticker** (Optional): Stock ticker symbol like “GOOGL.”
-   **Minimum Likelihood Score** (Optional): Set a likelihood score threshold to refine data accuracy.

### `Action` Enrich Person

Use this action to retrieve comprehensive personal data such as social profiles, contact details, and employment history using People Data Labs.

**Setup Inputs**

-   **Person’s Name**: Provide the full name of the individual.
-   **Company Name**: Specify the company name associated with the person. Must be used with Person’s Name.
-   **Social Media Profile URL** (Optional): Enter the LinkedIn, Twitter, or Facebook URL for the person to narrow down results.

### `Action` Find Personal Email

Retrieve a person’s personal email by searching with available identifiers.

**Setup Inputs**

-   **Person’s Name**: The individual’s full name. Used in combination with Company Name.
-   **Company Name**: The company associated with the individual. Must be used with Person’s Name.
-   **Social Media Profile URL** (Optional): Provide a LinkedIn, Twitter, or other social profile URL to improve accuracy.

### `Action` Get Employee Count by Criteria

Retrieve the employee count for a company based on role or geographic location criteria.

**Setup Inputs**

-   **Company Domain**: The domain URL of the company (e.g., [google.com](http://google.com)).
-   **Company Social Profile** (Optional): LinkedIn or other social media URL of the company.
-   **Company Stock Ticker** (Optional): Stock ticker symbol, such as “GOOGL.”
-   **Role Filter** (Optional): Specify the job roles to filter the employee count.
-   **Country Filter** (Optional): Filter results by country for location-specific data.

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