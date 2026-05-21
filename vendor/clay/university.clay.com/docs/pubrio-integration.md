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

Pubrio integration

# Pubrio integration

Identify key contacts at companies, find phone numbers, analyze tech stacks, and discover job openings.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Pubrio enables efficient identification and contact extraction of key sales and recruiting leads by automating the search and enrichment of personnel information and company tech stacks.

With this integration, you can identify key contacts at companies, find phone numbers, analyze tech stacks, and discover job openings to streamline outreach and analysis processes.

## **Enriching data with Pubrio**

1.  While in a Clay table, click `Add enrichment` and search for `Pubrio`.
2.  Under `Integrations`, select one of the Pubrio options.

### `Action` Find people at company

Search for and identify key contacts at target companies based on role, department, and location filters to build targeted outreach lists.

**Inputs**

-   **Company domain:** The website domain of the company to search within (e.g., `clay.com`)
-   **Company professional profile URL:** (e.g., `https://www.linkedin.com/company/grow-with-clay/`)

_Note: Either company domain or company professional profile URL is required._

**Optional Filters**

-   **Job title:** A comma-separated list of job titles (e.g., "Software Engineer, Product Manager")
-   **Management level:** Filter by management level of the contacts
-   **Department title:** Filter by specific department names
-   **Department function:** Filter by department functions
-   **Company size:** Filter by company size ranges
-   **People locations:** Filter by contact locations
-   **Company locations:** Filter by company locations

**Output**

-   **List of matching contacts (up to 25) with details:**
-   Name and title
-   Company information
-   Department and function
-   Location
-   Professional profile URL (when available)
-   **Total number of people found**
-   **Total number of people returned** (limited to 25 per request)

### `Action` Find phone number (APAC)

The Find phone number action enriches LinkedIn profiles with phone numbers to support efficient and direct outreach.

**Inputs**

-   **Professional profile URL (Required):** The LinkedIn profile URL to find the phone number for. Must be a valid LinkedIn URL in the format `https://www.linkedin.com/in/john-doe-1234567890/`.

**Output**

-   **LinkedIn URL:** The validated LinkedIn profile URL
-   **LinkedIn name:** The LinkedIn profile name in slug format
-   **Phones:** Array of phone number details including:
-   **Value:** The phone number in E.164 format (e.g., `+16468089010`)
-   **Type:** The type of phone number
-   **Status:** Verification status of the phone number (e.g., `Verified`)

### `Action` Enrich company tech stack

Identifies and retrieves technologies used on a company's website by analyzing their domain or professional profile.

**Inputs**

-   **Company domain:** The domain of the company to find the tech stack for. (Required if profile URL not provided)
-   **Company professional profile URL:** The company professional profile URL to find the tech stack for. (Required if domain not provided)

**Output**

-   **Category ID:** Numeric identifier for the technology category
-   **Technologies:** Array of technologies found, including:
-   **Icon:** Technology's icon file name
-   **Name:** Technology name
-   **Tag ID:** Numeric identifier for the technology
-   **Version:** Version number of the technology (if available)
-   **Website:** URL of the technology provider
-   **Location:** Where the technology was detected

### `Action` Find open jobs at company

Find job listings posted by companies using their website domain or professional profile URL, returning up to 25 matching positions.

**Inputs**

-   **Company domain (Optional):** The domain of the company to find jobs for (e.g., `microsoft.com`). One of domain or company professional profile URL is required.
-   **Company professional profile URL (Optional):** The company's professional profile URL. One of domain or company professional profile URL is required.
-   **Job title (Optional):** A comma-separated list of job titles to search for (e.g., "Software Engineer, Product Manager")
-   **Post keywords (Optional):** Words to filter the results by (e.g., "Python, React")
-   **Job locations (Optional):** The locations where the jobs are based
-   **Company headquarters locations (Optional):** Filter by company headquarters location
-   **Date job posted after (Optional):** Filter jobs posted on or after a specific date (e.g., "5 days ago"or "2022-07-31")
-   **Date job posted before (Optional):** Filter jobs posted on or before a specific date (e.g., "5 days ago"or "2022-07-31")

**Output**

-   List of jobs matching the search criteria
-   Total number of jobs found
-   Total number of jobs returned (maximum 25)
-   Job title
-   Company information
-   Location
-   Posting date
-   Job description
-   Other relevant metadata

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