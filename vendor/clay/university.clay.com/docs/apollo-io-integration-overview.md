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

Apollo.io integration

# Apollo.io integration

AI-powered platform for sales intelligence, engagement, and workflow automation.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

The Apollo and Clay integration enables users to find and enrich leads within Clay by leveraging [Apollo.io](http://Apollo.io)'s extensive B2B database.

## **Creating a table with** [**Apollo.io**](http://Apollo.io)

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for [`Apollo.io`](http://Apollo.io) and select from the results.
3.  In the modal, you will be asked to `Select Apollo.io account`.
    -   If you haven't already connected your [Apollo.io](http://Apollo.io) account, click `+ Add account` and go through authentication.

### **`Source`** **Find People from Apollo**

Find people in [Apollo.io](http://Apollo.io) based on job titles and company domains.

**Inputs**

-   **Job Titles** (Required): Enter job titles to search for, separated by commas (e.g., `CEO, CTO, VP of Sales`)
-   **Company Domains** (Optional): Filter results to people at specific companies
-   **Limit** (Optional): Maximum number of people to return (1-1,000)

## **Setting up the** [**Apollo.io**](http://Apollo.io) **integration**

1.  While in a Clay table, click `Add enrichment` and search for [`Apollo.io`](http://Apollo.io).
2.  Under `Integrations`, select one of the [Apollo.io](http://Apollo.io) options.
3.  In the modal, you will be asked to `Select [Apollo.io](<http://Apollo.io>) account`.
    -   If you haven't already connected your [Apollo.io](http://Apollo.io) account, click `+ Add account` and go through authentication.

## **Using the** [**Apollo.io**](http://Apollo.io) **integration**

### **`Action`** **Enrich Person**

Retrieve additional data about an individual in [Apollo.io](http://Apollo.io) by providing identifying details.

**Inputs**

-   First Name (Optional): First name of the individual
-   Last Name (Optional): Last name of the individual
-   Name (Optional): Full name of the individual
-   Email Address (Optional): Email address of the individual
-   Company Name (Optional): Company where the individual works
-   Company Domain (Optional): Domain of the company
-   Apollo ID (Optional): Unique Apollo ID for the person

**Output:**

Returns comprehensive person details including:

-   Contact information (email, phone numbers)
-   Job title and employment history
-   Company and organization details
-   LinkedIn profile and social URLs
-   Department and seniority level
-   Location information

### **`Action`** **Enrich Company**

Enrich company data by providing a company domain, using [Apollo.io](http://Apollo.io)'s extensive database.

**Inputs**

-   **Company Domain**: The domain of the company to enrich (e.g., "[example.com](http://example.com)")

**Output:**

Returns detailed company information including:

-   Industry and company description
-   Employee count and departmental headcount
-   Annual revenue and financial data
-   Technologies used (tech stack)
-   Company headquarters and office locations
-   Social media profiles (LinkedIn, Twitter, Facebook)
-   Founded year and company type

### **`Action`** **Find Open Jobs**

Retrieve open job postings for a company using [Apollo.io](http://Apollo.io)'s job database.

**Inputs**

-   Company ID (Optional): Apollo organization ID to identify the company
-   Job Search Terms (Optional): Keywords to filter job postings (comma-separated)

**Output:**

Returns:

-   **Job Postings** array containing:
    -   Job title
    -   Job posting URL
    -   Location (city, state, country)
    -   Posted date and last seen date
-   **Total Jobs Count**: Total number of open positions

### **`Action`** **Find Account by ID**

Use this action to retrieve detailed information for a specific account in [Apollo.io](http://Apollo.io) using an Account ID.

**Inputs**

-   **Apollo Account ID**: The unique Account ID in Apollo to search for

**Output:**

Returns comprehensive account information including:

-   Organization details (name, domain, industry)
-   Employee count and company size
-   Technologies and tech stack
-   Contact information
-   Office locations
-   Social profiles and website information

### **`Action`** **Find Contact by ID**

Retrieve detailed information about a specific contact in [Apollo.io](http://Apollo.io) by using a Contact ID.

**Inputs**

-   **Apollo Contact ID**: The unique Contact ID in Apollo to look up the contact

**Output:**

Returns detailed contact information including:

-   Full name and job title
-   Email addresses and phone numbers
-   Company and account details
-   LinkedIn profile and social URLs
-   Email verification status
-   Engagement history

### **`Action`** **Find People at Company By Job Title**

Use this action to search for individuals at specified companies by their job titles within [Apollo.io](http://Apollo.io).

**Inputs**

-   **Job Titles**: A comma-separated list of job titles to search for (e.g., "Marketing Manager, Sales Director")
-   **Company Domains**: A comma-separated list of company domains to filter the search (e.g., "[example.com](http://example.com)")
-   Locations (Optional): A comma-separated list of locations to further refine the search
-   Limit (Optional): Specify the maximum number of people to return in the search, up to 10
-   Include Contacts (Optional): Include relevant contacts from your linked CRM. If a limit is set, CRM contacts will be prioritized within the results

**Output:**

Returns a **Results** object containing:

-   **People** array with details for each person found:
    -   Name and contact information
    -   Job title and seniority
    -   Company and employment information
    -   LinkedIn profile
    -   Department and location
-   Contact verification status
-   Employment history

### **`Action`** **Find Saved Contacts**

Find saved contacts in your [Apollo.io](http://Apollo.io) account by searching with keywords.

**Inputs**

-   **Keywords**: Keywords to search by (recommended to use email address for best results). Keywords can also include combinations of names, job titles, and employers (company names)
-   Limit (Optional): Maximum number of contacts to return in the search (1-10)

**Output:**

Returns array of matching contacts including:

-   Contact information (name, email, phone numbers)
-   Job title and organization details
-   LinkedIn profile
-   Email verification status
-   Contact stage and owner information
-   Custom fields
-   Sequence enrollment status (if applicable)

### **`Action`** **Find or Create Contact**

Finds a contact in [Apollo.io](http://Apollo.io) or creates a new one if it doesn't exist.

**Inputs**

-   Run Dedupe (Optional, default: true): If enabled, Apollo will dedupe contacts by email address, LinkedIn URL, or name and organization name, returning existing contacts instead of creating duplicates
-   First Name (Optional): First name of contact
-   Last Name (Optional): Last name of contact
-   Email (Optional): Email address of contact
-   Job Title (Optional): Job title of contact
-   Organization Name (Optional): Name of organization contact belongs to
-   Website URL (Optional): Website URL of organization
-   Account ID (Optional): Apollo ID of organization contact belongs to
-   Direct Phone (Optional): Primary phone number for contact
-   Mobile Phone (Optional): Mobile phone number of contact
-   Present Raw Address (Optional): Personal location for contact (city, US state, country)
-   Contact Stage ID (Optional): Current stage of contact in sales process
-   Custom Fields (Optional): Custom fields defined in Apollo account settings

**Output:**

Returns contact object with:

-   Contact ID and basic information
-   Email verification status
-   Organization and location details
-   Custom field values
-   A flag indicating whether the contact was newly created or already existed (`was_existing`)

**Note:** This action intelligently finds existing contacts when deduplication is enabled, preventing duplicate records in your Apollo account.

### **`Action`** **Update Contact**

Updates an existing contact's information in [Apollo.io](http://Apollo.io).

**Inputs**

-   **Contact ID**: Apollo contact ID to update
-   First Name (Optional): First name of contact
-   Last Name (Optional): Last name of contact
-   Email (Optional): Email address of contact
-   Job Title (Optional): Job title of contact
-   Organization Name (Optional): Name of organization contact belongs to
-   Website URL (Optional): Website URL of organization
-   Account ID (Optional): Apollo ID of organization contact belongs to
-   Direct Phone (Optional): Primary phone number for contact
-   Mobile Phone (Optional): Mobile phone number of contact
-   Present Raw Address (Optional): Personal location for contact (city, US state, country)
-   Contact Stage ID (Optional): Current stage of contact in sales process
-   Custom Fields (Optional): Custom fields defined in Apollo account settings

**Output:**

Returns updated contact object with:

-   Complete contact information
-   Email verification status
-   Organization and location details
-   Updated custom field values
-   Metadata (owner, creator, timestamps)

**Note:** At least one optional field must be provided along with the Contact ID to perform an update.

### **`Action`** **Add Contact to Sequence**

Add a contact to a sequence in [Apollo.io](http://Apollo.io). The contact must already exist in [Apollo.io](http://Apollo.io).

**Inputs**

-   **Sequence ID**: ID of sequence to add contact to
-   **Contact ID**: ID of contact to add to sequence
-   **Send Email From Email Account ID**: ID of email account to send from
-   User ID (Optional): ID of user adding the contact to sequence
-   Add Without Email (Optional, default: false): Add contact to sequence without an email address?
-   Add Unverified Email (Optional, default: false): Add contact to sequence with unverified email address?
-   Add With Job Change (Optional, default: false): Add contact to sequence with a job change?
-   Add Active in Other Campaigns (Optional, default: false): Add contact to sequence if active in other campaigns?
-   Add Finished in Other Campaigns (Optional, default: false): Add contact to sequence if finished in other campaigns?

**Output:**

Returns confirmation of whether the contact was successfully added to the sequence, or if skipped, the reason for skipping (e.g., already in sequence, missing email, etc.)

**Note:** The optional override flags allow you to bypass common sequence enrollment restrictions.

### **`Action`** **Update Contact Status in Sequence**

Update the status of a contact in a sequence in [Apollo.io](http://Apollo.io). The contact must already exist in [Apollo.io](http://Apollo.io) and be enrolled in the sequence.

**Inputs**

-   **Sequence ID**: ID of sequence the contact is in
-   **Contact ID**: ID of contact to update in sequence
-   **Mode**: Action to take on the contact:
    -   **Remove from Sequence**: Permanently removes the contact from the sequence
    -   **Pause in Sequence**: Pauses the contact in the sequence (can be resumed later)
    -   **Mark as Finished**: Marks the contact as having completed the sequence

**Output:**

Returns confirmation of whether the contact's status was successfully updated, including details about the operation performed.

**Note:** Use this action to manage contact progression through your sequences, whether pausing outreach temporarily, removing contacts entirely, or marking campaigns as complete.

### **Run settings**

-   **Auto-update**
-   **Only run if**: The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.notion.so/source-S3-bucket-1417e66eb01481cc8a4cc485b14af577?pvs=21))

## ‍

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