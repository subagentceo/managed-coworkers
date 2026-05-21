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

Gong integration

# Gong integration

Obtain call data of your prospects.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

[Gong.io](http://Gong.io) empowers revenue teams to enhance sales effectiveness through AI-powered conversation intelligence, analyzing customer interactions across calls, emails, and meetings to provide actionable insights, enable data-driven coaching, and improve deal execution at scale.

Clay's Gong integration lets users push contacts from Clay tables into Gong Engage flows and retrieve call data from Gong—streamlining workflows and improving campaign targeting.

**Heads up!** To use this integration, you will need:

-   A Launch Plan at Clay
-   A Gong Engage subscription

‍

## Creating a table with Gong

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for `Gong` and select from the results.

### `Source` Pull calls from Gong

Retrieve call data from Gong to analyze conversations and enhance workflow insights.

-   **Gong User ID (Optional):** If left empty, calls from all users will be pulled.
-   **Start date**
-   **End date**

## Enriching data with Gong

To connect your Gong account for Clay actions:

1.  In your Clay table, click `Add enrichment` and search for `Gong`.
2.  Under `Integrations`, select one of the Gong actions.
3.  Within the settings side panel, you will be asked to `Select Gong account`.
    -   To connect your Gong account, click `Add account` and go through authentication.

### `Action` Get call details

Use this action to retrieve the information about a Gong call.

**Inputs**

-   **Gong Call ID:** Enter the Gong Call ID of transcript you want to retrieve.
-   **Details to pull:** Select the details you want to pull from the call.

### `Action` Get call transcript

Use this action to retrieve the transcript of a Gong call.

**Note: Due to transcript size limitations, this action can only process one call ID at a time. To view multiple transcripts, access each complete transcript from the action column.**

**Inputs**

-   **Gong Call ID:** Enter the Gong Call ID of transcript you want to retrieve.
-   **Combine transcript text:** By default, the transcript is returned as a list of messages. To merge the result into a single text block, enable this option.

### `Action` Add Prospect to Flow

Use this action to add a prospect to a Gong Engage flow.

**Inputs**

-   **Prospect Owner email:** Email of the Gong Engage user who owns the flow instance. Once this is selected, you'll be able to assign the prospect.
-   **Flow ID:** ID of the Gong Engage flow you want to add the prospect to.
-   **CRM Prospect ID:** This is the CRM ID of the prospect you want to add to the flow (Hubspot, Salesforce, etc.). For this to work properly, you must have the CRM connected to your Gong account.

### `Action` Get Assigned Flows for Prospect

Use this action to retrieve the Gong Engage flows assigned to a prospect.

**Inputs**

-   **CRM Prospect ID:** This is the CRM ID of the prospect you want to add to the flow (Hubspot, Salesforce, etc.). For this to work properly, you must have the CRM connected to your Gong account.

## `Guide` Pushing Gong call into Clay via webhook

Connect Gong to Clay to automatically send new call data in real time. With this setup, you can enrich each call record, generate insights, and keep your systems, like Salesforce or Notion, continuously in sync.

_(For example, use this flow to auto-draft post-meeting follow-ups or update CRM opportunities with call analysis such as MEDDPIC criteria.)_

1.  **Create a webhook rule in Gong:** From the [Gong Admin Panel](https://help.gong.io/docs/create-a-webhook-rule?utm_source=chatgpt.com), create an Automation Rule that triggers **`When a new call is processed`** and sends data **`via Webhook`**.
    -   In Clay, click **`+ Add`** at the bottom of your workbook, search for **`Webhook`**, and select **`Monitor webhook`**. Copy your webhook URL.
    -   Paste it into the Gong rule as the destination.
2.  **Capture call data in Clay:** When the rule fires, Gong sends call information, including `callId`, participants, timestamps, and metadata, into your Clay table as new rows.
3.  **Enrich with full call details:** Add the **`Get call details`** enrichment action.
    -   Map the `callId` column from your webhook data to the **Gong Call ID** input field to retrieve full call details like duration, transcript links, and insights.

Once enriched, you can:

-   Sync call summaries to **Salesforce**, **Snowflake**, or **Google Sheets.**
-   Trigger **follow-up emails**, CRM updates, or analytics workflows in Clay.

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

All plans

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