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

Signals & triggers

](/docs-topics/signals)

/

Custom Signals

# Custom Signals

Create unique signals to monitor changes to your team's data sources.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Custom Signals let you monitor data sources for specific changes on a regular schedule. You can:

-   Monitor websites, social media platforms, and other digital sources.
-   Track technology adoption, hiring profiles, and new feature rollouts.
-   Monitor compliance changes (e.g., when a company adds GDPR compliance to their trust center).
-   Set up RSS feeds for web mentions.
-   Schedule automated runs using Clay's AI tool to create your own unique signals.

## Creating a custom signal

1.  To create a custom signal:
    -   **In a workbook**: Click `+ Add` → `Custom signal`.
    -   **In a table**: Click `Actions` → `Import` → `Custom signal`.
2.  Select a source to monitor.
    -   Next to each source, you'll see the estimated cost per result.
3.  Configure your source.
    -   Some sources require an account, while others use a Clay-provided account.
4.  Set how frequently you want your signal to run.
5.  Optionally, add enrichments (such as Slack notifications or Salesforce updates that trigger when the signal runs).
6.  Click `Save`.

## Editing a custom signal

1.  Click the column title of the signal (signals will have a toggle next to their titles)
2.  Click `Edit column`.
3.  Adjust any of the configurations or the frequency to run and click `Save`.

**Clay offers several pre-created Signals for common use cases:**

-   [New hires](https://www.clay.com/university/guide/new-hire-signal-overview): Keep track of new hires at target companies within the last three months, enabling you to engage during the crucial decision-making window.
-   [Promotions](https://www.clay.com/university/guide/promotion-signal-overview): Monitor when contacts receive promotions within their current company, allowing you to engage during high-intent decision-making periods.
-   [Job changes](https://www.clay.com/university/guide/job-change-signal-overview): Track when your contacts move to new companies, helping you leverage existing relationships for new opportunities or prepare for shifts in account engagement.
-   [LinkedIn brand mentions](https://www.clay.com/university/guide/monitor-for-linkedin-brand-mentions): Track company mentions, identify partnerships, address feedback, find testimonials, and measure campaign impact.
-   [News & fundraising](https://www.clay.com/university/guide/monitor-for-news-fundraising): Alert you to significant events at monitored companies, helping you spot timely engagement opportunities.

## Guide: Turning enrichments into signals

You may occasionally need to monitor changes in an enrichment. Below is a step-by-step guide on creating a signal for any enrichment. **In this guide, we'll start with a list of companies and add enrichments to monitor.**

### Table 1: Setting up an enrichment

1.  Start with a list of companies (Create a new table or in an existing table, click `Actions` → `Import`)
2.  If you don't already have one, create the enrichment you want to turn into a signal.
3.  Set up a [scheduled run](https://www.clay.com/university/guide/scheduled-columns) for your enrichment by clicking the `⚙️` → enable `Re-run columns on a schedule`.
4.  Under `Actions` → click `Send table data` and include the enrichment in the columns that are sent. Send this data to a new table that we'll call "Run history".
    -   Make sure the **company name** or **company domain** is part of the data sent to the new table, as these will be essential in the upcoming steps.
5.  Toggle off `Update existing rows on re-run` to create new rows for each recurring run.

### Table 2: Setting up a run history table

1.  Go into the "Run history" table and pull out the company name/domain and the output of the enrichment as columns from the source.
2.  Click the columns dropdown in the upper left corner of the table and unhide `Created At`.

### Table 3: Identify the difference between runs

1.  In a third table, which we'll call the "Lookup" table, click `Actions` → `Lookup Multiple Rows in Other Table`.
2.  Set up the lookup to check the "Run history" table and use the company name or domain as the identifier.
3.  Set up a [scheduled run](https://www.clay.com/university/guide/scheduled-columns) for this lookup by clicking `⚙️` in the bottom right corner → enable `Re-run columns on a schedule`.
    -   This should run at the same schedule as the first table.
    -   **Note:** You can't currently set a specific time for a scheduled run. Instead, it runs every 24 hours from when you first schedule it. To avoid conflicts, ensure a short delay between the scheduled times of the first and second table.
4.  Click `Actions` → `Use AI`. Generate a prompt that references the output from the `Lookup Multiple Rows in Other Table` and identifies the difference between the two most recent runs, using `Created At`.  
    -   This prompt will provide two outputs: any new information returned from the 2nd run that wasn't in the 1st run, and a True/False boolean indicating if there is any new information.**‍**
    -   **Note:** If your data is structured or numerical, you can use a formula to detect changes. However, if there's significant variability between outputs, you'll likely want to use an AI action to holistically determine the difference between runs.
5.  Take the result from `Use AI` and write it to a fourth table (the "Signal" table), using `Actions` → `Send table data`.  
    -   You can do this using run conditions.  
        -   For a numerical output, the run condition should be if the change is not 0.  
            
        -   For a text output (string), the run condition should be if the boolean generated from the AI action is True.

### Table 4: Store the signal

1.  Go into the "Signal" table and pull out the company name/domain and the output from the AI action that described the difference between runs.
2.  Click the columns dropdown in the upper left corner of the table and unhide `Created At`. This date will serve as a timestamp showing when the signal was detected.

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