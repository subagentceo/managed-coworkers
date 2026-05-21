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

Getting started

](/docs-topics/getting-started)

/

Message drafting overview

# Message drafting overview

Write personalized message sequences with AI, conditionals and more.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Message drafting overview

The **Message drafting** feature streamlines the process of creating personalized, dynamic messages for export to your chosen sequencer.

This is particularly useful for automating outbound campaigns, such as sales outreach, as well as creating personalized intake messages for signups.

## Steps to using the message drafting feature

**Step 1: Open message drafting feature**

Access the message drafting tool through the export actions menu: **Actions > Export > Export Messages to Sequencer**.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecff0a8ba49f68018413_675219b5b5998c2f29abdf22_675218adda94277afe144b04_CleanShot%2525202024-12-05%252520at%25252006.25.51.avif)

**Step 2: Select your sequencer**

Choose the sequencer you want to export your messages to from the list.

**Note:** Each sequencer has unique export requirements and settings. For details, refer to the notes on sequencer-specific settings below.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecff0a8ba49f68018416_675219b5b5998c2f29abdefa_675219015aa26a5ac735d519_CleanShot%2525202024-12-05%252520at%25252016.19.10%2525402x.avif)

**Step 3: Write your message(s)**

Within the **Message Drafting Panel**, craft your messages.

Be mindful of your sequencer’s export settings to ensure compatibility.

**Step 4: Configure field mappings**

Click **Continue** to review and verify the field mappings for custom fields with your sequencer.

**Tip:** Some sequencers require fields to be pre-configured, while others allow you to create fields directly from within the action.

**Step 5: Verify run settings and run the enrichment**

Check your auto-update and conditional run-settings, as well as any other setting within your action to verify exporting.

## Message drafting panel components

The **Message Drafting Panel** is composed of several key components that work together to help you create dynamic, personalized messages efficiently.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecff0a8ba49f6801841f_675219b5b5998c2f29abdf07_6752192065014fd1abf90e22_CleanShot%2525202024-12-05%252520at%25252006.52.38.avif)

‍

### **Subject line**

-   Enter your desired subject line in the **Subject** field.

### **Message body**

-   Write your message directly in the **Body** field.
-   Use **AI Snippets** to generate suggestions or enhance your content.
-   Add **Conditional Snippets** to include dynamic content based on specific conditions, such as field values or logical operators.

### **AI model and account settings**:

-   Select the desired AI model for drafting (e.g., gpt-4o-mini).
-   Ensure the correct account is connected to access the AI functionality.

### **Run action settings**

-   Toggle **Auto-update** to refresh message drafts automatically with updated data.
-   Configure the **Only Run If** condition to control when the action should execute (e.g., only if a specific field exists).

## **AI Snippets**

Create dynamic, tailored content directly within your message drafter using AI snippets.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecff0a8ba49f6801841c_675219b5b5998c2f29abdf00_6752193b286c623ed435c06e_CleanShot%2525202024-12-05%252520at%25252007.31.22.avif)

## **Conditional snippets**

Conditional Snippets allow you to add dynamic logic to your messages, displaying specific content based on defined conditions.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ecff0a8ba49f68018419_675219b5b5998c2f29abdefd_6752194367ea87463878420e_CleanShot%2525202024-12-05%252520at%25252007.41.08.avif)

### **Key Features**

-   [**Conditional Logic**](https://www.clay.com/university/guide/conditional-statements): Define “if/else” conditions to display different content based on recipient-specific data, such as including a personalized greeting if a first name exists.
-   [**Logical Operators**](https://www.clay.com/university/guide/logical-operators): Combine multiple conditions using operators like AND (e.g., First Name exists AND Company Name does not include “Clay”) or OR.
-   [**Comparison Operators**](https://www.clay.com/university/guide/comparison-operators): Compare data values (e.g., check if a field “equals,” “does not equal,” or “contains” specific information) to tailor your message logic.
-   **Custom Fields**: Insert dynamic fields from your data for tailored messaging.

### **How to Use Conditional Snippets**

1.  **Insert a Conditional Snippet**:
    -   In your message body, type `/` to open the conditional snippet panel.
2.  **Define Your Conditions**:
    -   Use the **Where** fields to set conditions based on your data.
    -   Add multiple conditions using **AND** or **OR** to refine your logic branches.
    -   Example: Check if a field (`First Name`) exists or if another field (`Company Name`) contains specific text.
3.  **Set the “If” Output**:
    -   Define the content that will appear if the conditions are met.
    -   Use placeholders to dynamically insert data (e.g., `Hey {{First Name}}`,).
4.  **Set the “Else” Output**:
    -   Provide fallback content for cases where the conditions aren’t met (e.g., `Hey there`).
5.  **Save and Test**:
    -   Save your snippet and test it with sample data to verify that the correct content displays for both “if” and “else” scenarios.

## Lemlist

Lemlist's custom fields support HTML. Note that message draft editor newlines get replaced with spaces so for new lines within Lemlist use <br> or <p> tags.

For more information on Lemlist’s actions, refer to the [Lemlist documentation](https://www.clay.com/university/guide/lemlist-integration-overview).

## Smartlead

Smartlead's custom fields support HTML and newlines. You are able to create new custom fields from your Clay action panel.

For more information on Smartlead’s actions, refer to the [Smartlead documentation](https://www.clay.com/university/guide/smartlead-integration-overview).

## Instantly

Smartlead's custom fields support HTML and newlines.

For more information on Instantly’s actions, refer to the [Instantly documentation](https://www.clay.com/university/guide/instantly-integration-overview).

## Outreach

Outreach's custom fields fully support HTML and newline characters.

We recommend reserving specific Prospect custom fields (e.g. custom10 to custom15) for Clay usage to avoid conflicts with other custom field data. You will have to manually map your messages to these custom fields.

For more information on Outreach’s actions, refer to the [Outreach documentation](https://www.clay.com/university/guide/outreach-integration-interview).

## Salesloft

Salesloft's custom fields do not support HTML or newlines.

Custom fields must be manually defined in Salesloft before they can be exported from Clay. You will have to manually map your messages to these custom fields.

For more information on Salesloft’s actions, refer to the [Salesloft documentation](https://www.clay.com/university/guide/salesloft-integration-overview).

## Reply.io

Reply.io's custom fields support HTML. Use <br> or <p> tags for newlines.

Note that there is a default maximum of 50 custom variables in total.

For more information on Reply.io’s actions, refer to the [Reply.io documentation](https://www.clay.com/university/guide/reply-io-integration-overview).

## HeyReach

HeyReach's custom fields only support alphanumeric characters.

For more information on Salesloft’s actions, refer to the [Heyreach documentation](https://www.clay.com/university/guide/heyreach-integration-overview).

## La Growth Machine

La Growth Machine's custom attributes support HTML. Use <br> or <p> tags for newlines.

La Growth Machine supports a maximum of 10 custom attributes per lead. Each custom attribute can be up to 250 characters long.

For more information on La Growth Machine’s actions, refer to the [La Growth Machine documentation](https://www.clay.com/university/guide/la-growth-machine-integration-overview).

## Customer.io

Customer.io's attributes support HTML. Use <br> or <p> tags for newlines.

Each attribute has a maximum length of 250 characters.

For more information on Customer.io's actions, refer to the [Customer.io documentation](http://www.clay.com/university/guide/customer-io-integration-overview).

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