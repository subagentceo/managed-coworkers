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

Lusha integration

# Lusha integration

Verify contact and company data, including work emails, phone numbers, and buying signals.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Lusha is a B2B sales intelligence platform that provides verified contact and company data, including work emails, phone numbers, and buying signals.

With Clay's Lusha integration, you can enrich person and company records, detect career-change and company-level signals, and build targeted prospect lists using lookalike prospecting.

## **Creating a table with Lusha**

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for `Lusha` and select from the results.
3.  In the modal, you will be asked to `Select Lusha account`.
    -   If you haven't already connected your Lusha account, click `+ Add account` and enter your Lusha API key. You can find your API key in your Lusha account under `Settings → API`.
    -   **Note:** Lusha sources (lookalike searches) can be run using Clay credits without requiring a Lusha API key.

### `Source` Find company lookalikes

Find similar companies based on a list of seed companies using Lusha.

**Inputs**

-   **Company domains:** Comma-separated list of company domains to use as seeds (e.g., `sap.com, oracle.com`). Required if Company professional profile URLs is not provided. Total unique company identifiers across both fields must be between 5 and 100.
-   **Company professional profile URLs:** Comma-separated list of company LinkedIn URLs (e.g., `https://www.linkedin.com/company/sap`). Required if Company domains is not provided.
-   **Company domains to exclude** (Optional): Domains to exclude from results. Maximum 500 unique exclusions.
-   **Company professional profile URLs to exclude** (Optional): Company LinkedIn URLs to exclude from results. Maximum 500 unique exclusions.
-   **Max results** (Optional): Maximum number of lookalike companies to return. Defaults to 5,000.

**Outputs**

-   **Company name:** The lookalike company's name.
-   **Company domain:** The company's domain.
-   **Company LinkedIn URL:** The company's LinkedIn profile URL.
-   **Employee count:** The number of employees at the company.
-   **Industry:** The company's industry.
-   **Location:** The company's country, state, and city.

### `Source` Find people lookalikes

Start with a list of seed contacts and find similar people aligned by job title, seniority, and company context.

**Inputs**

-   **Professional profile URLs:** Comma-separated list of LinkedIn URLs of seed contacts (e.g., `https://www.linkedin.com/in/john-doe`). Required if Emails is not provided. Total unique personal identifiers across both fields must be between 5 and 100. Best practice is to provide 10 or more.
-   **Emails:** Comma-separated list of seed contact email addresses. Required if Professional profile URLs is not provided.
-   **Professional profile URLs to exclude** (Optional): LinkedIn URLs to exclude from results. Maximum 500 unique exclusions.
-   **Emails to exclude** (Optional): Email addresses to exclude from results. Maximum 500 unique exclusions.
-   **Max results** (Optional): Maximum number of lookalike people to return. Defaults to 5,000.

**Outputs**

-   **ID:** Lusha's internal identifier for the person.
-   **First name:** The person's first name.
-   **Last name:** The person's last name.
-   **Social links → LinkedIn:** The person's LinkedIn profile URL.
-   **Company:** The person's employer, including company ID, name, and domain.
-   **Job title:** The person's title, department(s), and seniority level.
-   **Location:** The person's country, state, and city.

## **Enriching data with Lusha**

1.  While in a Clay table, click `Add enrichment` and search for `Lusha`.
2.  Under `Integrations`, select one of the Lusha options.
3.  In the modal, you will be asked to `Select Lusha account`.
    -   If you haven't already connected your Lusha account, click `+ Add account` and enter your Lusha API key.
    -   **Note:** All Lusha actions except for **Enrich person** can be run using Clay credits without requiring a Lusha API key. Only **Enrich person** requires you to connect your own Lusha account.

### `Action` Enrich person

Get key data about a person given a professional profile URL, email, or full name combined with a company name or domain.

**Inputs**

**Required (one of the following combinations):**

-   **Professional Profile URL:** The person's LinkedIn URL (e.g., `https://www.linkedin.com/in/john-doe`).
-   **Email:** The person's email address.
-   **Full Name + Company Name:** The person's full name paired with the name of the company they work at.
-   **Full Name + Company Domain:** The person's full name paired with the company's domain (e.g., `clay.com`).

**Optional:**

-   **Include Email:** Returns the person's work email. Consumes 1 Lusha Unified Credit from your Lusha account. Defaults to off.
-   **Include Phone:** Returns the person's phone number. Consumes 5 Lusha Unified Credits from your Lusha account. Defaults to off.
-   **Partial Profile:** Returns basic profile data even when no email or phone is found. Defaults to on.

**Outputs**

-   **First Name:** The person's first name.
-   **Last Name:** The person's last name.
-   **Full Name:** The person's full name.
-   **Person ID:** Lusha's internal identifier for the person.
-   **Company ID:** Lusha's internal identifier for the person's current company.
-   **Job Title:** The person's current title, department(s), and seniority level.
-   **Job Start Date:** The date the person started their current role.
-   **Previous Job:** The person's prior employer, including company name, domain, title, and seniority.
-   **Social Links:** The person's LinkedIn profile URL.
-   **Update Date:** The date this record was last updated in Lusha's database.
-   **Company:** The person's current employer, including name, description, domains, homepage URL, location (city, state, country), company size range, revenue range, and logo URL.

### `Action` Enrich company

Get firmographic data about a company using its name or domain.

**Inputs**

**Required (one of the following):**

-   **Company Name:** The name of the company to enrich (e.g., `Intercom`). Required if Company Domain is not provided.
-   **Company Domain:** The company's domain (e.g., `intercom.com`). Required if Company Name is not provided.

**Outputs**

-   **Name:** The company's name.
-   **Domain:** The company's domain.
-   **Description:** A brief description of the company.
-   **Employees:** The company's employee count range (e.g., `501 - 1000`).
-   **Founded:** The company's founding date.
-   **Logo:** URL of the company's logo.
-   **Website:** The company's website URL.
-   **Main Industry:** The company's primary industry.
-   **Categories:** A list of industry categories associated with the company.
-   **Address:** The company's full address string.
-   **Location:** The company's city, state, state code, country, and full location string.
-   **Social:**
    -   LinkedIn URL: The company's LinkedIn profile URL.
    -   Crunchbase URL: The company's Crunchbase profile URL.

### `Action` Enrich person signals

Search for contact-level signals — such as promotions or company changes — for a specific person.

**Inputs**

**Required:**

-   **Signal Type:** The type of signal to search for. Options are dynamically loaded from your Lusha account and include `All Signals`, `Promotion`, and `Company Change`.

**Required (one of the following combinations, paired with Signal Type):**

-   **Professional Profile URL:** The person's LinkedIn URL.
-   **Email:** The person's email address.
-   **Full Name + Company Name:** The person's full name and company name.
-   **Full Name + Company Domain:** The person's full name and company domain.

**Outputs**

-   **Contacts → Contact → Person ID:** The Lusha ID of the contact associated with the signal.
-   **Signal Date:** The date the signal event occurred.
-   **End Date:** The end date of the signal window returned.

### `Action` Enrich company headcount growth

Search for a company's headcount growth over a specified time period using its domain or company name. Costs 8 Clay credits per run, refunded if no data is found.

**Inputs**

**Required (one of the following):**

-   **Company Name:** The name of the company (e.g., `Clay`). Required if Company Domain is not provided.
-   **Company Domain:** The company's domain (e.g., `clay.com`). Required if Company Name is not provided.

**Optional:**

-   **Start date:** The beginning of the time window to analyze. For best results, do not go shorter than the past month. Maximum lookback is 6 months, which is also the default.

**Outputs**

-   **Headcount Growth:** An array of headcount growth signals, each containing:
    -   Company ID: Lusha's internal identifier for the company.
    -   Signal Type: The type of headcount signal detected.
    -   Score: The relative strength of the signal (e.g., `low`, `medium`, `high`).
    -   Signal Date: The date the signal was detected.
    -   Historical Avg: The historical average value for this signal type.
    -   New Value: The current value of the headcount metric.
    -   Old Value: The previous value of the headcount metric.

### `Action` Enrich company jobs growth

Search for a company's job posting growth over a specified time period using its domain or company name.

**Inputs**

**Required (one of the following):**

-   **Company Name:** The name of the company (e.g., `Clay`). Required if Company Domain is not provided.
-   **Company Domain:** The company's domain (e.g., `clay.com`). Required if Company Name is not provided.

**Optional:**

-   **Start date:** The beginning of the time window to analyze. For best results, do not go shorter than the past month. Maximum lookback is 6 months, which is also the default.

**Outputs**

-   **New Jobs Open:** An array of job growth signals, each containing:
    -   Company ID: Lusha's internal identifier for the company.
    -   Signal Type: The type of job signal detected (e.g., `new_jobs_count`).
    -   Score: The relative strength of the signal (e.g., `low`, `medium`, `high`).
    -   Signal Date: The date the signal was detected.
    -   Historical Avg: The historical average number of open jobs for this company.
    -   New Value: The current number of open jobs.
    -   Old Value: The previous number of open jobs.

### `Action` Enrich company news

Search for company-level news signals — such as funding rounds, acquisitions, or leadership changes — using a company's domain or name.

**Inputs**

**Required (one of the following):**

-   **Company Name:** The name of the company (e.g., `Clay`). Required if Company Domain is not provided.
-   **Company Domain:** The company's domain (e.g., `clay.com`). Required if Company Name is not provided.

**Optional:**

-   **Start date:** The beginning of the news window. Defaults to 6 months ago. Maximum lookback is 6 months.

**Outputs**

-   **News:** An array of news signals, each containing:
    -   Company ID: Lusha's internal identifier for the company.
    -   Event Type: The type of news event (e.g., `receives investment`).
    -   Event Category: The broader category of the event (e.g., `Financial Growth`).
    -   Event Effective Date: The date the event occurred.
    -   Event Summary: A short summary of the event.
    -   Article Sentence: A single headline sentence from the source article.
    -   Article Title: The full title of the source article.
    -   Article URL: A link to the source article.
    -   Article Published Date: The date the article was published.

### **Run settings**

-   **Auto-update:** Recommended for signal-based workflows where you want Clay to re-check for new signals or updated contact data on a recurring basis.
-   **Only run if:** The enrichment will only run when a specified condition is met. ([Learn more about conditional formulas here.](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

## **FAQs**

**Can I use multiple types of inputs to find company or person lookalikes?**

Yes! Both `Find company lookalikes` and `Find people lookalikes` support combining multiple types of inputs, whether domains, professional profile URLs, or emails. When finding person lookalikes using first name and last name, you must also include a company domain or company name to help match the correct contact.

**What happens if I toggle on additional datapoints in Enrich Person?**

Turning on additional data points, like email and phone, will consume Lusha Unified Credits from your Lusha account. Emails deduct 1 credit per contact, while phone numbers deduct 5 credits per contact.

**Are Lusha's signals actions always-on monitors?**

No. Lusha's signals actions (`Enrich person signals`, `Enrich company headcount growth`, `Enrich company jobs growth`, and `Enrich company news`) are retroactive lookups, not always-on monitors like Clay's native Signals. These actions check for events that occurred within a specified lookback window, but they won't notify you of future events as they happen.

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