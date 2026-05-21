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

La Growth Machine integration overview

# La Growth Machine integration overview

Platform for automating multichannel sales outreach.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

### Integration Overview

La Growth Machine in Clay allows users to search for leads by email, LinkedIn URL, or lead ID, and create new leads from LinkedIn URLs.

For the Clay and La Growth Machine integration, here’s a breakdown of the actions available:

1.  **Search Lead**: Locate specific leads in La Growth Machine. This can be a LinkedIn URL, Lead ID, or an Email.
2.  **Create or Update Lead**: Add new leads or update existing lead information.

## Requirements for Setting Up La Growth Machine

To get set up with La Growth Machine, you’ll need to obtain an API key and have an existing Cadence if you want to send leads directly to a Cadence.

**Connect La Growth Machine with Clay via an API Key**

To set up La Growth Machine within Clay, you’ll need to first obtain a La Growth Machine API Key. You can request for an API key within your **Settings > Integrations & API.**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d6284c_674e815e99a7e1224e695c68_672af50ef7df71c54c4bdf00_672af47a7fcc9904e6341607_CleanShot%252525202024-10-31%25252520at%2525252016.22.55%252525402x.avif)

Once you’ve obtained your API key, navigate to your enrichment panel.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d62852_674e815e99a7e1224e695c62_672af50df7df71c54c4bded2_672af483c9769c30b458cf0c_CleanShot%252525202024-10-31%25252520at%2525252016.36.24%252525402x.avif)

Paste your API key when creating a new account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d62861_674e815e99a7e1224e695c47_672af50ef7df71c54c4bdefd_672af4904163926064ffb357_CleanShot%252525202024-10-31%25252520at%2525252016.28.14%252525402x.avif)

### **Set up audience to send leads to**

To add leads to an Audience directly from Clay you will need to have an existing Audience. This must be done directly within La Growth Machine. To create an audience, head over to the left sidebar and **Leads > Audiences.**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d6284f_674e815e99a7e1224e695c6b_672af50ef7df71c54c4bdeeb_672af49eedda5fdc1b5b9aff_CleanShot%252525202024-10-31%25252520at%2525252016.33.35%252525402x.avif)

## La Growth Machine use cases

There are a few important callouts

-   If you want to push personalized snippets to La Growth Machine, please make sure to use custom variables within your enrichment
-   Ensure you are mapping out all fields like first name, last name and email correctly

### Action: Create or Update Lead

Create or update a lead in La Growth Machine from a LinkedIn URL. By default, only empty fields will be updated; if you want to update fields that already have data, go to Outreach Settings in your La Growth Machine account, and turn on "Update the existing contact with changed or new fields".

**Step 1: Select the Create or update lead action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d62858_674e815e99a7e1224e695c41_672af50ef7df71c54c4bdeee_672af4ad788eec5c2d0534f0_CleanShot%252525202024-10-31%25252520at%2525252016.37.59%252525402x.avif)

**Step 2: Specify the audience of your lead**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d62864_674e815e99a7e1224e695c2d_672af50df7df71c54c4bdecc_672af4b7c0531e325c1eea3e_CleanShot%252525202024-10-31%25252520at%2525252016.41.23%252525402x.avif)

**Step 3 (Optional): Map out contact information**

Map out the contact information of the fields to export to La Growth Machine.

Note: Please make sure you are mapping your fields correctly

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d62855_674e815e99a7e1224e695c81_672af50df7df71c54c4bdecf_672af4c12c7f77c562bb34ad_CleanShot%252525202024-10-31%25252520at%2525252016.42.01%252525402x.avif)

**Step 4 (Optional): Specify custom attributes to export**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d6285b_674e815e99a7e1224e695c65_672af50ef7df71c54c4bdee8_672af4cdc33bceae44bff987_CleanShot%252525202024-10-31%25252520at%2525252016.44.43%252525402x.avif)

**Step 5 (Optional): Configure run settings**

Specify Auto-update and Conditional run statements.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa1b8cb9cc1ee32da_672aeddc0616d6a7ef69234a_672aec9c4163926064f940bf_CleanShot%2525202024-10-31%252520at%25252002.14.57%2525402x%252520\(1\).png)

### Action: Create or Update Lead

The Search Lead action allows you to search a lead in La Growth Machine from an email, LinkedIn URL, or lead ID

**Step 1: Select the Search Lead action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d6285e_674e815e99a7e1224e695c44_672af50ef7df71c54c4bdef1_672af4f4cb1c90f160842f26_CleanShot%252525202024-10-31%25252520at%2525252016.49.45%252525402x.avif)

**Step 2: Specify the Lead Identifier**

This can be a LinkedIn URL (NOT a SalesNav URL), an email, or a lead ID

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecc0782b70eb89d62867_674e815e99a7e1224e695c4a_672af50cf7df71c54c4bdec1_672af4fb88571a4bdf983410_CleanShot%252525202024-10-31%25252520at%2525252016.51.12%252525402x.avif)

**Step 3 (Optional): Configure run settings**

Specify Auto-update and Conditional run statements.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa1b8cb9cc1ee32da_672aeddc0616d6a7ef69234a_672aec9c4163926064f940bf_CleanShot%2525202024-10-31%252520at%25252002.14.57%2525402x%252520\(1\).png)

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