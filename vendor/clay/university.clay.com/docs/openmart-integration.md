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

Openmart integration

# Openmart integration

Automate data gathering, verification, and updates across multiple channels.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

The Openmart Integration helps users improve SMB outreach and lead management by analyzing and enriching contact information, technology stacks, and decision-maker details.

This integration automates data gathering, verification, and updates across multiple channels, delivering accurate insights for targeted marketing campaigns.

## **Enriching data with Openmart**

1.  While in a Clay table, click `Add enrichment` and search for `Openmart`.
2.  Under `Integrations`, select one of the Openmart options.

### `Action` Find tech stack

Use this action to identify the technology stack and ordering systems used by small and medium businesses through analysis of their digital presence.

**Inputs**

-   **Company domain (Required):** The domain of the company to find a tech stack for. Only the top-level domain will be used (e.g., `example.com` for `subdomain.example.com`).
-   **Company name (Optional):** The name of the company to find a tech stack for.
-   **Location (Optional):** The city, state, or country of the company. Note: If you provide a postal code, the search will be performed for the entire city where that postal code is located.
-   **Types of technologies to find (Required):** The types of technologies to look for in the company's tech stack (e.g., website builder, payment gateway, hosting provider).
-   **Specific technologies to look for (Optional):** Specific technologies to look for in the company's tech stack.
-   **Instructions for finding the technology (Optional):** Optional instructions to help Openmart's AI find the technology, e.g., "Look at the contact us page."

**Output**

-   **Tech Stack:** A structured list of technologies grouped by type
-   **All Technologies:** A flat list of all detected technologies
-   **Unformatted Technologies:** A text summary of the findings
-   **Source:** The URL where the technology information was found

### `Action` Find businesses

Find local small and medium businesses. Openmart will first try to find businesses in the provided location with a matching domain.

**Inputs**

-   **Parent company identifier (Required):** At least one parent company identifier (domain, professional social media URL, Facebook URL, or Instagram URL) must be provided.
-   **Location (Optional)**
-   **Limit (Optional):** Maximum number of local businesses to return.

**Output**

-   **Email information (if requested):**
    -   Email address
    -   Verification status
-   **Phone numbers (if requested):**
    -   Phone number
    -   Line type
    -   Validation status
    -   Confidence grade
-   **Personal information:**
    -   Full name
    -   First name
    -   Last name
    -   LinkedIn URL

### `Action` Find people at company

Find people in a specific role at a small and medium business (SMB), or at the SMB's parent company.

**Inputs**

-   **Company domain (Required):** The domain of the company to find decision makers for (only the top-level domain will be used)
-   **Company name (Optional):** The name of the company to find decision makers for
-   **Location (Optional):** The city, state, or country of the company
-   **Job title (Optional):** The job title of the decision maker to find (defaults to "owner/decision maker")
-   **Include emails (Optional):** Whether to include email addresses for the decision makers found
-   **Include phone numbers (Optional):** Whether to include phone numbers for the decision makers found
-   **Max people to find (Optional):** Maximum number of decision makers to find per company

**Output**

For each decision maker found, the action returns:

-   **Full Name**
-   **First Name**
-   **Last Name**
-   **Job Title**
-   **LinkedIn URL**
-   **Email (if requested):**
    -   Email address
    -   Verification status
-   **Phone Numbers (if requested):**
    -   Phone number
    -   Line type
    -   Validity status
    -   Confidence grade

### `Action` Enrich and verify email

Use this action to find, verify, and update contact information for professionals at small and medium-sized businesses.

**Inputs**

-   **Company domain (Required):** The domain of the company where the person works (e.g., `example.com`). Only the top-level domain will be used.
-   **Full name (Required):** The person's complete name (must include both first and last name).
-   **Company name (Optional):** The name of the company where the person works.
-   **Location (Optional):** The city, state, or country where the person works. Note: Postal code inputs will search the entire associated city.
-   **Professional URL (Optional):** The person's LinkedIn profile URL (format: `https://www.linkedin.com/in/username`).

**Output**

-   Email address
-   Email verification status
-   Full name
-   First name
-   Last name
-   LinkedIn URL (if found)

### `Action` Enrich and verify phone

Use this action to identify and verify phone numbers for SMB contacts, with confidence grading to ensure reliable outreach.

**Inputs**

-   **Company domain (Required):** The domain of the company where the person works (e.g., `example.com` for `subdomain.example.com`). Only the top-level domain will be used.
-   **Full name (Required):** The full name of the person. Must contain both first and last name.
-   **Company name (Optional):** The name of the company where the person works
-   **Location (Optional):** The city, state, or country where the person works
-   **Professional URL (Optional):** The professional profile URL of the person (e.g., `https://www.linkedin.com/in/colinparsonscom`)

**Output**

-   **Phone:**
    -   Phone Number: The discovered phone number (e.g., `+18167038759`)
    -   Line Type: Type of phone line (e.g., `MOBILE`)
    -   Valid: Boolean indicating if the phone number is valid
    -   Confidence Grade: Confidence rating of the data (e.g., `A`)
-   **Full Name:** The person's complete name
-   **First Name:** The person's first name
-   **Last Name:** The person's last name
-   **LinkedIn URL:** The person's professional profile URL

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