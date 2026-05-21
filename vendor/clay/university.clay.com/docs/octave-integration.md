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

Octave integration

# Octave integration

Enrich lead data, qualify prospects, and generate personalized outreach sequences using AI-powered insights.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Octave enhances lead generation by automating the identification, organization, and qualification of both people and companies across multiple dimensions such as professional background and hiring needs.

With this integration, you can enrich lead data, qualify prospects, and generate personalized outreach sequences using AI-powered insights.

## **Enriching data with Octave**

1.  While in a Clay table, click `Add enrichment` and search for `Octave`.
2.  Under `Integrations`, select one of the Octave options.
    -   If you haven’t already connected your Octave, click `+ Add account` and go through authentication.

### `Action` Prospect for relevant people

Use this action to automatically identify and organize relevant contacts at recently funded startups and similar companies.

**Inputs**

-   **Company domain:** Domain of the target company (e.g., `vercel.com`)
-   **Company name:** Name of the target company
-   **Limit:** Maximum number of contacts to return
-   **Minimal (Optional):** Toggle to receive minimal contact information
-   **Search context (Optional):** Additional search parameters in JSON format
-   **Additional JSON parameters (Optional):** Extra parameters to refine the search

### `Action` Qualify person

Use this action to identify and prioritize leads who are a strong fit based on detailed professional and company information.

**Inputs**

-   **Professional social profile URL:** The LinkedIn profile URL of the person to qualify (e.g., `https://www.linkedin.com/in/colinparsonscom`)
-   **Person's full name:** The complete name of the prospect
-   **Person's job title:** Current job title of the prospect
-   **Company domain:** Website domain of the prospect's company
-   **Company name:** Name of the prospect's company
-   **Runtime context:** Additional context about the qualification criteria (e.g., "We want to see if they'd work for our B2B offering")
-   **Additional JSON parameters (Optional):** Custom parameters in JSON format for additional qualification criteria (e.g., segment, product)

### `Action` Qualify company

Use this action to assess company fit by generating qualification scores based on custom criteria and hiring data.

**Inputs**

-   **Company domain:** The website domain of the company you want to qualify (e.g., `vercel.com`)
-   **Company name:** The name of the company (e.g., `Vercel`)
-   **Runtime context:** Additional context about your qualification criteria (e.g., "We want to see if they'd work for our B2B offering")
-   **Additional JSON parameters (Optional):** Additional configuration parameters in JSON format for customizing the qualification criteria

### `Action` Enrich person

Use this action to gather detailed professional information for more effective outreach and qualification.

**Inputs**

-   **LinkedIn Profile:** Person's LinkedIn profile URL
-   **Full Name:** Person's complete name
-   **Job Title:** Current job title
-   **Email:** Work email address
-   **Company Domain:** Website domain of the person's company
-   **Company Name:** Name of the person's company
-   **Runtime Context:** Additional context about the enrichment purpose
-   **Additional JSON Parameters (Optional):** Extra parameters in JSON format for customizing the enrichment

### `Action` Enrich company

Use this action to gather detailed insights about companies, including their business model, sales motion, and market positioning.

**Inputs**

-   **Company domain:** The website domain or URL of the target company
-   **Company name:** The name of the company (optional but recommended for better results)
-   **Runtime context:** Additional context to guide the AI analysis (e.g., "We want to understand their B2B sales motion")
-   **Additional JSON parameters:** Optional JSON object containing additional parameters for the Octave agent (e.g., `{"segment": "B2B", "product": "Pro"}`)

### `Action` Use custom agent

Use this action to enrich lead data and generate insights for more personalized and effective outreach.

**Inputs**

-   **Runner:** Select the Octave agent or experiment from your Octave account
-   **LinkedIn Profile:** Professional social profile URL of the target person
-   **First Name:** First name of the target person
-   **Job Title:** Job title of the target person
-   **Company Domain:** Website domain of the target company
-   **Company Name:** Name of the target company
-   **Runtime Context (Optional):** Additional information or context for the runner
-   **Additional JSON Parameters (Optional):** Extra parameters required by your custom runner in JSON format

### `Action` Run sequence agent or experiment runner

Use this action to create highly personalized email sequences for outreach using real-time research data from Octave.

**Inputs**

-   **Runner ID:** Select an Octave email sequence agent to use
-   **LinkedIn Profile:** Prospect's LinkedIn profile URL
-   **First Name:** Prospect's first name
-   **Job Title:** Prospect's job title
-   **Company Domain:** Prospect's company website
-   **Company Name:** Prospect's company name
-   **Output Format (Optional):** Format for the generated content (default: `text`)
-   **Language (Optional):** Language for the generated content (default: `en`)
-   **Runtime Context (All Steps):** Additional context to consider for all emails in the sequence
-   **Runtime Instructions (All Steps):** Specific instructions for how to use the context in all emails
-   **Runtime Context (Step-specific):** Additional context for specific steps in the sequence
-   **Runtime Instructions (Step-specific):** Specific instructions for individual steps
-   **Additional JSON Parameters:** Any additional parameters in JSON format

### `Action` Create call prep notes

Create call prep notes tailored for each individual engagement, including background research, discovery questions, objection handling, and more.

**Inputs**

-   **Agent:** Select the Octave agent for creating call prep notes
-   **Person's professional profile URL (Optional):** LinkedIn profile URL of the person
-   **Person's first name (Optional):** First name of the target person
-   **Person's job title (Optional):** Current job title
-   **Company domain (Optional):** Website domain of the target company
-   **Company name (Optional):** Name of the target company
-   **Runtime context (Optional):** Additional context to guide the AI analysis
-   **Additional parameters (in JSON format) (Optional):** Extra parameters in JSON format

### `Action` Create personalized content

Use the context Octave has about your ICP and offerings, and Octave's real-time knowledge and research capabilities, to create a wide variety of personalized content.

**Inputs**

-   **Agent:** Select the Octave agent for creating call prep notes
-   **Person's professional profile URL (Optional):** LinkedIn profile URL of the person
-   **Person's first name (Optional):** First name of the target person
-   **Person's job title (Optional):** Current job title
-   **Company domain (Optional):** Website domain of the target company
-   **Company name (Optional):** Name of the target company
-   **Runtime context (Optional):** Additional context to guide the AI analysis
-   **Additional parameters (in JSON format) (Optional):** Extra parameters in JSON format

### **Run settings**

-   **Auto-update**
-   **Only run if:** The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

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