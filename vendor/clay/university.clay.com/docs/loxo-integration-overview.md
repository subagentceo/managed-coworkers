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

Loxo integration

# Loxo integration

Talent intelligence platform streamlining recruitment.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Loxo is an AI-powered talent intelligence platform that combines ATS, CRM, and recruitment tools to streamline recruiting workflows. Within Clay, you can pull candidate records directly from Loxo lists, find and create people, update existing profiles, and retrieve activity history.

## **Creating a table with Loxo**

1.  While in a workbook, click `+ Add` and select `Source`.
2.  Search for `Loxo` and select it.
3.  In the modal, you will be asked to select a Loxo account.
    -   If you haven't connected your account yet, click `+ Add account` and enter your **Agency Slug** (as the username) and **API Key** (as the password). You can find both in Loxo's [developer documentation](https://loxo.co/).

### **`Source`** **Pull in People from Lists in Loxo**

Imports all people from one or more of your Loxo lists into Clay as rows.

**Inputs**

-   **List(s) to Pull From**: The Loxo list(s) you want to import people from. Displays as a multi-select dropdown populated from your connected Loxo account.

_Note: This source pulls a maximum of 10,000 people per run._

## **Enriching data with Loxo**

1.  While in a Clay table, click `Add enrichment` and search for `Loxo`.
2.  Under `Integrations`, select one of the Loxo actions.
3.  In the modal, you will be asked to select a Loxo account.
    -   If you haven't connected your account yet, click `+ Add account` and enter your **Agency Slug** (as the username) and **API Key** (as the password). You can find both in Loxo's [developer documentation](https://loxo.co/).

### **`Action`** **Find Person**

Finds a person in your Loxo account using an email address, professional social URL, or Loxo ID.

**Inputs**

-   **Email Address, Professional Social URL, or Loxo ID**: The unique identifier of the person you want to find

**Outputs**

-   **Total People Found**: The total number of matching records found in Loxo
-   **Person**: The matched person record, including name, email addresses, professional social URL, phone number, current job title, current company, description, personal website, Loxo ID, and owner name

### **`Action`** **Create Person**

Creates a new person record in your Loxo account.

**Inputs**

-   **Name**: The full name of the person to create
-   Description (Optional): Notes or a brief description about the person
-   Email Address (Optional): The person's email address
-   Professional Social URL (Optional): The person's professional social profile URL
-   Phone Number (Optional): The person's phone number
-   Personal Website (Optional): The URL of the person's personal website
-   Current Job Title (Optional): The person's current job title
-   Current Company Name (Optional): The name of the person's current employer
-   Person Owner ID (Optional): The Loxo user to assign as the owner of this record. Displays as a dropdown populated from your Loxo account
-   Tags (Optional): A comma-separated list of tags to apply to the person
-   Add to List(s) (Optional): One or more Loxo lists to add this person to. Displays as a multi-select dropdown
-   Custom Fields (Optional): Any custom person fields configured in your Loxo account

**Outputs**

-   **Person**: The newly created person record, including all submitted fields and the assigned Loxo ID
-   **Loxo URL**: A direct link to the person's profile in Loxo

### **`Action`** **Update Person**

Updates an existing person record in your Loxo account.

**Inputs**

-   **Person ID**: The Loxo ID of the person to update. Typically retrieved from a prior **Find Person** action or from a Loxo source
-   Name (Optional): The updated name of the person
-   Description (Optional): Updated notes or description
-   Email Address (Optional): The updated email address
-   Professional Social URL (Optional): The updated professional social profile URL
-   Phone Number (Optional): The updated phone number
-   Personal Website (Optional): The updated personal website URL
-   Current Job Title (Optional): The updated job title
-   Current Company Name (Optional): The updated company name
-   Person Owner ID (Optional): The updated owner of the record. Displays as a dropdown
-   Tags (Optional): A comma-separated list of tags to add. Note: This will not remove existing tags
-   Add to List(s) (Optional): One or more lists to add the person to. Note: This will not remove existing list memberships
-   Custom Fields (Optional): Any custom person fields configured in your Loxo account

**Outputs**

-   **Person**: The updated person record
-   **Loxo URL**: A direct link to the updated person's profile in Loxo

### **`Action`** **Find Activity**

Retrieves activity records of a specific type associated with a person in your Loxo account.

**Inputs**

-   **Person ID**: The Loxo ID of the person whose activity you want to retrieve. Typically sourced from a prior **Find Person** action
-   **Activity Type**: The type of activity to retrieve (e.g., notes, emails, tasks). Displays as a dropdown populated from your Loxo account

**Outputs**

-   **Person Events**: A list of activity records matching the selected type, including activity details, creation date, and the name of the user who created each activity

### Run settings

-   `Auto-update`
-   `Only run if:` The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

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