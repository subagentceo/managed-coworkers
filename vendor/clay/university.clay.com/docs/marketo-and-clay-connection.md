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

Connect Clay to Marketo via a webhook

# Connect Clay to Marketo via a webhook

Connect Marketo to your Clay table.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

This guide outlines how to connect your Marketo instance to Clay.

## Steps

### Set up Clay table

Step 1: Copying the Webhook URL from Clay

In a new or existing Clay table, locate the **Webhook URL** option. Copy the Webhook URL provided. This is the URL where you will send data via a POST request to integrate with Clay.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a2776beee8e298c4c3_674e816004f66afe45297f6b_6737cf3f8082f63a5d599d54_6737cf0895e77493b49b9788_CleanShot%252525202024-11-15%25252520at%2525252017.27.36%252525402x.png)

### Configure Marketo Webhook

**Step 2: Go to the Admin area in Marketo**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a2776beee8e298c4b4_674e816004f66afe45297f4b_6737cf3e8082f63a5d599d3b_6737cf116e35f7309c1d7853_image_4.png)

**Step 3: Click on Wehooks in the left hand menu**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a2776beee8e298c4ba_674e816004f66afe45297f4e_6737cf3e8082f63a5d599d38_6737cf1cdffce19e42d6779a_image_333.png)

**Step 4: Click New Webhook to create a new webhook**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a2776beee8e298c4bd_674e815f04f66afe45297f46_6737cf3e8082f63a5d599d33_6737cf26508825466b660d72_image_2.jpeg)

**Step 5: Name and configure your Webhook.**

To properly configure Marketo’s webhook to send data to Clay, please fill in the following details exactly as shown:

-   URL: The webhook URL you copied from Step 1
-   Payload Template: first\_name={{lead.First Name:default=editme}} &last\_name={{lead.Last Name:default=editme}} &company={{company.Company Name}} &title={{lead.Job Title}} &email={{lead.Email Address:default=editme}} &id={{[lead.Id](http://lead.id/)}}
-   Request Token Encoding: None
-   Request Type: Post
-   Response Format: JSON

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a2776beee8e298c4b7_674e816004f66afe45297f54_6737cf3e8082f63a5d599d3e_6737cf32dffce19e42d686df_image.jpeg)

**Step 6: Click Create webhook**

Congratulations, you are all set up!

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