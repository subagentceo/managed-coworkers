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

Enrichments

# Enrichments

Learn how to run an enrichment within Clay.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Enrichments in Clay transform your data by pulling in additional information from various sources. Whether you need to verify email addresses, gather company details, or find social media profiles, Clay's enrichment tools enhance your data quickly and efficiently.

You can run enrichments individually, use pre-built templates, or create powerful recipes to automate complex workflows.

## Running an enrichment

1.  In a Clay table, click `Add enrichment` and search for an enrichment.
2.  Under `Integrations`, select an option.
3.  In the modal, select your account.
    -   Clay provides API keys for certain enrichments, but you can save [credits](https://www.clay.com/university/guide/credits) by using your own account—click `+ Add account` to set it up.

## Run settings

Run settings give you control over when and how your enrichments execute. Access these settings by clicking into any enrichment column.

### Auto-update

When enabled, the enrichment will automatically re-run whenever its input values change. This keeps your data fresh without manual intervention.

-   Toggle **on** to automatically update results when input data changes
-   Toggle **off** to run the enrichment only when you manually trigger it

### Only run if

Use conditional logic to control when an enrichment runs. The enrichment only executes if your specified conditions are met.

1.  Enter a formula in the `Only run if` field.
2.  The enrichment runs when the formula evaluates to `true`.
3.  Click `Use AI` to generate conditional formulas automatically.

## Delay run

Delay when an enrichment runs after its conditions are met. This is useful when you need to wait for external systems to process data before continuing your workflow.

`Run immediately`

-   Runs the action as soon as run conditions are met.
-   Default behavior for all enrichments.

`Run after delay`

-   Waits a specified number of seconds before running (maximum 10 minutes).
-   Delay starts after run conditions are met.
-   Useful for syncing between external systems, like waiting for Salesforce to sync data to Outreach.

To configure a delay:

1.  Select `Run after delay`.
2.  Enter the number of seconds to wait (up to 600 seconds/10 minutes).
3.  Use a formula to set different delays per row.

## Troubleshooting

### "Is there a way to make one enrichment (column) run only after another has finished?"

You can use a boolean formula to check if an enrichment has finished, then use that in a conditional formula to control when another enrichment runs. [Learn more here](https://www.notion.so/Sources-1577e66eb01480eba5f5dd85343aeb07?pvs=21).

### "How can I tell how my credits are being used?"

You can track credit usage for your workspace in the [credit usage](https://www.clay.com/university/guide/credit-usage) dashboard. This shows detailed breakdowns of credit consumption by table, integration, and time period, helping you monitor and optimize your usage.

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

Starter

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