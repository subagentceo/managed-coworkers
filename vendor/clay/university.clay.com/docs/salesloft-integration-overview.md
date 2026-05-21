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

Salesloft integration overview

# Salesloft integration overview

Sales engagement platform.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

### Integration Overview

Salesloft in Clay allows you to manage accounts and people, including creating, updating, and looking up records, as well as adding people to cadences.

For the Clay and Salesloft integration, here’s a breakdown of the actions available:

1.  **Create Account/Person**: Add new accounts or individuals directly to Salesloft.
2.  **Lookup Account/Person**: Find specific accounts or people in Salesloft using existing data fields for reference.
3.  **Add Person to Cadence**: Place individuals on designated cadences for automated outreach or follow-up.
4.  **Upsert Account/Person**: Update existing records or insert new ones to ensure the most current data for accounts and individuals.
5.  **Export Data for Bulk Email Campaigns**: Gather and export data efficiently for large-scale email campaigns, keeping your outreach organized and scalable.

### Requirements for Setting Up SalesLoft

To get set up with Salesloft, you’ll need to obtain an API key and have an existing Cadence if you want to send leads directly to a Cadence.

**Connect Salesloft with Clay via an API Key**

To set up Salesloft within Clay, you’ll need to first obtain a Salesloft API Key. You can request for an API key within Salesloft’s [New API Key](https://developers.salesloft.com/docs/platform/external-calendars/setup-api-key/) Page.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581ec_674e816a7db69f17aab81729_672af3e2f42d53e91be93b9a_672af08c1c15a75ffc5885c9_CleanShot%252525202024-10-31%25252520at%2525252013.33.12.avif)

Once you’ve obtained your API key, navigate to your enrichment panel and paste your API key when creating a new account.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e0_674e816b7db69f17aab8174c_672af3e3f42d53e91be93bc6_672af0950616d6a7ef6b34e6_CleanShot%252525202024-10-31%25252520at%2525252013.39.41%252525402x.avif)

**Set up Cadence within Salesloft**

To add leads to a Cadence directly from Clay you will need to have an existing Cadence. This must be done directly within Salesloft. Refer to [Salesloft’s documentation](https://help.salesloft.com/s/article/Create-a-Cadence?language=en_US) if you need more help.

## Salesloft use cases

There are a few important callouts

-   If you want to push personalized snippets to SalesLoft, please make sure to use custom variables within your enrichment
-   Ensure you are mapping out all fields like first name, last name and email correctly

### Action: Create Account

The Salesloft Create Account action lets you create new accounts within Salesloft.

**Step 1: Select the Create Account action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e6_674e816b7db69f17aab8177b_672af3e2f42d53e91be93b97_672af0cbad239f345426c504_CleanShot%252525202024-10-31%25252520at%2525252012.58.41%252525402x.avif)

**Step 2: Select your Salesloft account**

Select the Salesloft account to send emails from. If you have not already integrated Salesloft with Clay, please enter your API key when creating an account ([Salesloft API key documentation](https://developers.salesloft.com/docs/platform/external-calendars/setup-api-key/)).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e9_672af3e3f42d53e91be93bcd_672af0dd0d391b3fd7d9d646_CleanShot%2525202024-10-31%252520at%25252013.09.38%2525402x.png)

**Step 3: Configure the required and optional fields**

Make sure fields like first name, last name, and Personal LinkedIn URL are all mapped correctly.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581da_674e816b7db69f17aab817ae_672af3e3f42d53e91be93bdd_672af109c478f7cc2fbed8db_CleanShot%252525202024-10-31%25252520at%2525252013.15.17%252525402x.avif)

**Step 4: Insert custom variables**

Please note this step if you are inserting custom variables. This can include summaries, AI snippets, and other custom fields within Salesloft.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358228_672af3e2f42d53e91be93ba0_672af1149e2f1439876e9448_CleanShot%2525202024-10-31%252520at%25252013.58.01%2525402x.avif)

**Step 5: Configure run settings**

Specify Auto-update and Conditional run statements.

If you are running trigger campaigns please make sure to turn Auto-update on.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa1b8cb9cc1ee32da_672aeddc0616d6a7ef69234a_672aec9c4163926064f940bf_CleanShot%2525202024-10-31%252520at%25252002.14.57%2525402x%252520\(1\).png)

### Action: Upserting an Account

The Salesloft Upsert Account action lets you upsert accounts within Salesloft.

**Step 1: Select the Upsert Account action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581dd_674e816b7db69f17aab81781_672af3e3f42d53e91be93bf0_672af13fc33bceae44bcdbc3_CleanShot%252525202024-10-31%25252520at%2525252012.58.28%252525402x.avif)

**Step 2: Select your Salesloft account**

Select the Salesloft account to send emails from. If you have not already integrated Salesloft with Clay, please enter your API key when creating an account ([Salesloft API key documentation](https://developers.salesloft.com/docs/platform/external-calendars/setup-api-key/)).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e9_672af3e3f42d53e91be93bcd_672af0dd0d391b3fd7d9d646_CleanShot%2525202024-10-31%252520at%25252013.09.38%2525402x.png)

**Step 3: Configure the required and optional fields**

Make sure fields like first name, last name, and Personal LinkedIn URL are all mapped correctly.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581fc_674e816b7db69f17aab81771_672af3e3f42d53e91be93be0_672af0f8e48c63b8c39baa4c_CleanShot%252525202024-10-31%25252520at%2525252014.06.51%252525402x.avif)

**Step 4: Insert custom variables**

Please note this step if you are inserting custom variables. This can include summaries, AI snippets, and other custom fields within Salesloft.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358228_672af3e2f42d53e91be93ba0_672af1149e2f1439876e9448_CleanShot%2525202024-10-31%252520at%25252013.58.01%2525402x.avif)

**Step 5: Configure run settings**

Specify Auto-update and Conditional run statements.

If you are running trigger campaigns please make sure to turn Auto-update on.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa1b8cb9cc1ee32da_672aeddc0616d6a7ef69234a_672aec9c4163926064f940bf_CleanShot%2525202024-10-31%252520at%25252002.14.57%2525402x%252520\(1\).png)

### Action: Adding Person to Cadence

The Add Person to Cadence action lets you create new leads within Salesloft.

**Step 1: Select the Add Person to Cadence action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581f9_674e816b7db69f17aab8177e_672af3e3f42d53e91be93be4_672af1f5d10182c411550fd9_CleanShot%252525202024-10-31%25252520at%2525252012.57.56%252525402x.avif)

**Step 2: Select your Salesloft account**

Select the Salesloft account to send emails from. If you have not already integrated Salesloft with Clay, please enter your API key when creating an account ([Salesloft API key documentation](https://developers.salesloft.com/docs/platform/external-calendars/setup-api-key/)).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e9_672af3e3f42d53e91be93bcd_672af0dd0d391b3fd7d9d646_CleanShot%2525202024-10-31%252520at%25252013.09.38%2525402x.png)

**Step 3: Specify the Salesloft Person and Cadence ID**

The SalesLoft Person you'd like to add to a cadence. This is normally taken from a Lookup Person or Upsert Person step.

The Cadence you'd like to add this person to.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358202_674e816b7db69f17aab81752_672af3e3f42d53e91be93bed_672af221c21c0fb947efd58f_CleanShot%252525202024-10-31%25252520at%2525252014.07.50%252525402x.avif)

**Step 4: Configure run settings**

Specify Auto-update and Conditional run statements.

If you are running trigger campaigns please make sure to turn Auto-update on.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa1b8cb9cc1ee32da_672aeddc0616d6a7ef69234a_672aec9c4163926064f940bf_CleanShot%2525202024-10-31%252520at%25252002.14.57%2525402x%252520\(1\).png)

### Action: Upsert Person

The Upsert Person action lets you Upsert leads within Salesloft.

**Step 1: Select the Upsert Person action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581ff_674e816b7db69f17aab81778_672af3e3f42d53e91be93bc2_672af364bdc3c5888444d501_CleanShot%252525202024-10-31%25252520at%2525252013.03.05%252525402x.avif)

**Step 2: Select your Salesloft account**

Select the Salesloft account to send emails from. If you have not already integrated Salesloft with Clay, please enter your API key when creating an account ([Salesloft API key documentation](https://developers.salesloft.com/docs/platform/external-calendars/setup-api-key/)).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e9_672af3e3f42d53e91be93bcd_672af0dd0d391b3fd7d9d646_CleanShot%2525202024-10-31%252520at%25252013.09.38%2525402x.png)

**Step 3: Input mandatory and optional setup inputs**

Enter the contact information of the lead you want to upsert.

If you want to add any additional information to the contacts you are upserting, you can map out the dynamic fields as inputs.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358218_672af3e4f42d53e91be93c1e_672af37f12dadcdce08b6bae_CleanShot%2525202024-10-31%252520at%25252014.12.53%2525402x.png)

**Step 4: Insert custom variables**

Please note this step if you are inserting custom variables. This can include summaries, AI snippets, and other custom fields within Salesloft.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358228_672af3e2f42d53e91be93ba0_672af1149e2f1439876e9448_CleanShot%2525202024-10-31%252520at%25252013.58.01%2525402x.avif)

**Step 5: Configure run settings**

Specify Auto-update and Conditional run statements.

If you are running trigger campaigns please make sure to turn Auto-update on.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e659fa1b8cb9cc1ee32da_672aeddc0616d6a7ef69234a_672aec9c4163926064f940bf_CleanShot%2525202024-10-31%252520at%25252002.14.57%2525402x%252520\(1\).png)

### Action: Create Person

The Salesloft Create Person action lets you create new leads within Salesloft.

**Step 1: Select the Create Person action**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4e82320dd36a35825a_674e816b7db69f17aab81774_672af3e3f42d53e91be93bbf_672af3a888571a4bdf971dd0_CleanShot%252525202024-10-31%25252520at%2525252013.03.14%252525402x.avif)

**Step 2: Select your Salesloft account**

Select the Salesloft account to send emails from. If you have not already integrated Salesloft with Clay, please enter your API key when creating an account ([Salesloft API key documentation](https://developers.salesloft.com/docs/platform/external-calendars/setup-api-key/)).

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a3581e9_672af3e3f42d53e91be93bcd_672af0dd0d391b3fd7d9d646_CleanShot%2525202024-10-31%252520at%25252013.09.38%2525402x.png)

**Step 3: Input mandatory and optional setup inputs**

Enter the contact information of the lead you want to upsert.

If you want to add any additional information to the contacts you are upserting, you can map out the dynamic fields as inputs.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358218_672af3e4f42d53e91be93c1e_672af37f12dadcdce08b6bae_CleanShot%2525202024-10-31%252520at%25252014.12.53%2525402x.png)

**Step 4: Insert custom variables**

Please note this step if you are inserting custom variables. This can include summaries, AI snippets, and other custom fields within Salesloft.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee4d82320dd36a358228_672af3e2f42d53e91be93ba0_672af1149e2f1439876e9448_CleanShot%2525202024-10-31%252520at%25252013.58.01%2525402x.avif)

**Step 5: Configure run settings**

Specify Auto-update and Conditional run statements.

If you are running trigger campaigns please make sure to turn Auto-update on.

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