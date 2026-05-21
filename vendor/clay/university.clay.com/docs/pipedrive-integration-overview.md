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

Pipedrive integration overview

# Pipedrive integration overview

Sales CRM software boosting sales with automation.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Pipedrive Overview

The Pipedrive integration lets you sync data within your Clay table to the Pipedrive platform. With this integration you’re able to:

-   Lookup people and organizations
-   Create people and organizations
-   Update people and organizations

## Connecting Pipedrive to Clay

You can connect your Pipedrive account to Clay in two ways via OAuth:

### Method 1: Connect Pipedrive within enrichment panel

When running a Pipedrive integration in Clay, you’ll be prompted to **Add account**.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc7908_674e8168caf4a74398b8103d_6736c923c6b14d71c6e6bb7d_6736c88844177d9a105aa53b_CleanShot%252525202024-11-14%25252520at%2525252021.22.46%252525402x.avif)

From there you will be prompted to sign into Pipedrive to connect your account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc7904_6736c923c6b14d71c6e6ba82_6736c892cf3c78ea561c1cd4_CleanShot%2525202024-11-14%252520at%25252021.28.56%2525402x.png)

## Method 2: Connect Pipedrive account through Clay settings:

Navigate to **Settings** > **Connections** in your Clay dashboard.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc78fd_674e8168caf4a74398b80ffa_6736c923c6b14d71c6e6ba7f_6736c89c4596c6215bc099c2_otherimage.avif)

Click on **Add Connection** and select Pipedrive from the list.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc7918_674e8168caf4a74398b80ffd_6736c923c6b14d71c6e6ba79_6736c8a70085453be024b191_accountimage.avif)

From there you will be prompted to sign into Pipedrive to connect your account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc7904_6736c923c6b14d71c6e6ba82_6736c892cf3c78ea561c1cd4_CleanShot%2525202024-11-14%252520at%25252021.28.56%2525402x.png)

## Available actions with the Pipedrive integration

Clay’s integration with Pipedrive enables you to efficiently manage your data by allowing you to look up, create, and update people and organizations. When performing these actions, your custom fields in Pipedrive are all accessible within the platform.

### `Action` Lookup Person

Retrieve a contact in Pipedrive by searching for a name, email, phone number, or custom field.

**Input Fields**:

-   **Term to search for**: The value to search within Pipedrive (e.g., name, email).
-   **Exact Match?**: Only return exact matches. Defaults to false.
-   **Fields to search**: Specify which fields to search. Defaults to all fields.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc791b_674e8168caf4a74398b8101a_6736c923c6b14d71c6e6baed_6736c8cb613e6a37e8a339a3_CleanShot%252525202024-11-14%25252520at%2525252022.09.11%252525402x.avif)

### `Action` Create Person

Add a new contact to your Pipedrive directly from Clay.

**Input Fields**:

-   **Name**: The name of the person to add.
-   **Email**: The email address of the new contact.
-   **Phone**: The phone number of the new contact.
-   **Organization**: The organization associated with the new contact.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc7901_674e8168caf4a74398b81040_6736c923c6b14d71c6e6bad6_6736c8d9963ad292b25d6c83_CleanShot%252525202024-11-14%25252520at%2525252021.42.50%252525402x.avif)

### `Action` Update Person

Update an existing contact in Pipedrive using the contact’s ID.

**Input Fields**:

-   **ID**: The unique ID of the person in Pipedrive.
-   **Fields to Update**: Specify fields and values to update (e.g., name, email).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc7915_674e8168caf4a74398b8101d_6736c923c6b14d71c6e6bb80_6736c8eb613e6a37e8a3629c_CleanShot%252525202024-11-14%25252520at%2525252022.46.38%252525402x.avif)

### `Action` Lookup Organization

Retrieve a contact in Pipedrive by searching for a name, email, phone number, or custom field.

**Input Fields**:

-   **Term to search for**: The value to search within Pipedrive (e.g., name, email).
-   **Exact Match?**: Only return exact matches. Defaults to false.
-   **Fields to search**: Specify which fields to search. Defaults to all fields.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc790b_674e8168caf4a74398b81037_6736c923c6b14d71c6e6bad9_6736c8fc688d9216321a5d0c_CleanShot%252525202024-11-14%25252520at%2525252022.47.17%252525402x.avif)

### `Action` Create Organization

Create a new organization in Pipedrive directly from Clay.

**Input Fields**:

-   **Name**: The name of the organization.
-   **Address**: The address of the organization.
-   **Custom Fields**: Any additional fields and values for the organization.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc78fa_674e8168caf4a74398b81034_6736c923c6b14d71c6e6ba98_6736c9068864b0ad3b3ebbce_CleanShot%252525202024-11-14%25252520at%2525252021.41.12%252525402x.avif)

### `Action` Update Organization

Update an existing organization in Pipedrive using the organization’s ID.

**Input Fields**:

-   **ID**: The unique ID of the organization in Pipedrive. You can use **Lookup Organization** action to find the ID.
-   **Account Fields**: The fields available for updating will appear based on the specific fields configured in your Pipedrive instance.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924edb73174080025cc790f_674e8168caf4a74398b8103a_6736c923c6b14d71c6e6ba9b_6736c9192f107419827797f1_CleanShot%252525202024-11-14%25252520at%2525252021.40.21%252525402x.avif)

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