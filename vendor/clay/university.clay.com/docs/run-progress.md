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

Transform

](/docs-topics/transform)

/

Run progress

# Run progress

Clay provides multiple ways to track and monitor run progress across your tables.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Clay provides multiple ways to track and monitor **run progress** across your tables. These tools help you confirm that columns are executing correctly, data remains current, and issues are quickly identified.

## Column progress bar

The progress bar gives you a snapshot of a column's current state. It shows:

-   Whether the column is actively running
-   The percentage of all rows in the table that have run (including rows not currently visible)
-   A breakdown of rows by status:
    -   🟢 **`Successful`** — The cell completed successfully.
        -   _Note: "Run condition not met" is also treated as a successful run_
    -   ⚪ **`Running`** — The cell is in progress or queued.
    -   🔴 **`Failed`** — The cell ran but encountered an error, such as:
        -   Missing required inputs
        -   Format/type errors
        -   Cell size limit exceeded
        -   Run timeout
        -   Other unexpected issues

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a876bd32a9f8e8f842_68ba32061e7735c4ee9b7640_Run%2520Progress%2520UI%2520Feedback.png)

Hovering over the progress bar displays a detailed status breakdown. This includes _all_ rows in the table, even if filters or row limits are applied.

**Formula & Derived Columns** — These calculate instantly. They don't display "Running" status or partial completion percentages. Instead, they appear with a ✅ once ready.

**Waterfall Columns** — The progress bar shows the overall percentage of all waterfall cells that have run.

For Sources and Signals, the status displayed depends on the update state:

-   **`Updating…`** — Actively refreshing
-   **`Waiting for events…`** — Monitoring for new events (applies to Signals + Webhooks only)
-   **`Up to date`** — Fully refreshed with the latest data

## **Run indicators**

Several icons can appear on the right side of the cell to indicate specific column statuses:

-   ⏯️ **icon:** The user has turned auto-update off for this column.
-   **Green timer icon:** This column runs automatically on a periodic schedule.
    -   Hover over the icon to see the frequency ("daily", etc.).
-   **⌨️ icon**: Basic column types with no formulas or input tokens are distinguished by this "manual entry" icon.

## **Table-level progress**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/691e65a876bd32a9f8e8f845_68ba32156edf36d6435cbe6b_Run%2520Progress%2520UI%2520Feedback%2520\(1\).png)

The table-level progress bar, shown at the bottom right of a table, provides a summary view of the entire table’s run status. It displays:

-   The percentage of **all enrichment cells** in the table that have run.
    -   _Note: Includes non-visible rows, but not non-visible columns._
-   The percentage of rows by status (same definitions as at the column level).
-   Whether any column in the table is currently running.
-   **Run summary panel** — Hovering over the panel reveals:
    -   A detailed breakdown of status percentages.
    -   Table-level auto-run and scheduled run settings.
    -   A toggle to enable/disable column-level run status data.

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