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

Settings & admin

](/docs-topics/data-destinations)

/

Credit usage

# Credit usage

Track credit consumption across your workspace.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Track, analyze, and optimize your credit consumption by breaking down usage across workbooks, tables, and integrations.

## Credit usage dashboard

To check the credit usage in your workspace:

1.  Click your account name in the corner.
2.  Go to `Settings` and then `Credit usage` in the sidebar.
3.  Within `Workspace`, you can view folders, workbooks, and tables sorted by their usage.

Sort the content by `Name` (alphabetically) or by number of `Credits used` by clicking the column titles. You can `Export` this content as a CSV.

### Filter and sort credit usage

The columns in this view display:

-   `Name:` The folder, workbook, or table. Click the dropdown next to a folder or workbook to see the contents.
-   `Usage:` Marked as `Recurring` when it contains recurring credit usage (e.g., scheduled runs or signals).
-   `Owner:` The person who owns the project.
-   `Credits used:` The amount of credits used for this period.

Filter any of the content on this page by:

1.  When the credits were used.
2.  Owner of the project.
3.  Specific integrations being used.

### Understanding table-specific credit usage

For deeper insights into credit spend within a specific table, you can access the table credit usage dashboard. This gives you realtime data on when and how credits were spent within that table.

**Note:** Historical data for the table credit dashboard begins on November 5th, 2025. You’ll see a warning about incomplete data if your selected time range begins before this date.

**How to access the table dashboard:**

_From a table:_

-   Click the `Credit usage` button within the Credits popover and select `Table credit usage`.
-   Click the `Table History` button in the lower right corner of your table.

_From the workspace credit dashboard:_

-   Click the chart button next to any table's name to open its table-level dashboard.

**Dashboard views:**

The table credit dashboard offers three ways to analyze your credit spend:

`Time view:` See a time series graph of your table's credit spend over time. You can:

-   Choose your time range
-   Aggregate by different time units (day, week, month)
-   Break down each bar by action type to see what consumed credits

`Column view:` See your spend broken down by each column in your table, helping you identify which enrichments are using the most credits.

`Run view:` See spend events grouped by run, where a run could be:

-   A manual action (clicking the `Run` button on a column)
-   An automated action (scheduled source import or auto-update)

All views allow you to download the data as a CSV for further analysis.

**Note:** Historical data for the table credit dashboard begins on November 5th, 2025. You’ll see a warning about incomplete data if your selected time range begins before this date.

## **Credit usage breakdown**

The credit usage dashboard is organized into tabs, each covering a different slice of your workspace spend. Use the `When` dropdown and `Apply filters` to scope each tab to a specific time period.

-   **Workbooks** — shows credit spend broken down by folder, workbook, and table. Click the dropdown next to any folder or workbook to drill into its contents. Sort by `Name` or `Credits used`. Click `Export` to download a CSV for offline analysis.
-   **Integrations** — shows credit spend grouped by integration across your entire workspace, so you can quickly see which data providers are consuming the most credits. Sort by `Name` or `Credits used`. Click `Export` to download a CSV.
-   **Signals** — shows credit spend broken down by individual signal. A totals row (`All Signals`) appears at the top, followed by a per-signal breakdown of `Credits used` and `Actions used`.
-   **MCP** — shows programmatic spend from team members who access Clay through ChatGPT or Claude, broken down by user. Spend that can't be attributed to a specific user appears as `Unattributed`. For per-user credit limits and live usage tracking, see `Settings → MCP users`.
-   **API** — shows programmatic spend generated through Clay's API and Exportly, broken down by user. Like MCP, unattributable spend appears as `Unattributed`.

## Credit estimates before running

Clay provides transparent cost estimates before you run enrichments or actions in your tables. This helps you understand and manage your credit usage.

### Run cost breakdown

When you run a column that has dependent columns (downstream enrichments that will automatically trigger), you'll see:

-   Total estimated credits for the run.
-   Breakdown by column showing which columns will run and their individual costs.
-   Number of rows that will be affected.

This estimate appears for any column run that would trigger dependent enrichment columns, including runs initiated by:

-   Manual column runs
-   Changes to data sources
-   Adding new rows

### Expensive run warnings

Clay shows a warning when you're about to initiate a run that will use a significant portion of your workspace's monthly credit allotment. Specifically:

-   Runs that cost more than 10% of your monthly credit allotment.
-   With a minimum threshold of 500 credits.
-   Runs over 50,000 credits will always trigger this warning.

This helps prevent accidental large credit expenditures.

### Import warnings

When you import data to existing tables (via Copy Paste from URLs, adding a source, or CSV upload), you'll see a confirmation modal if the import would trigger downstream actions. This modal:

-   Warns you about potential credit usage from auto-running enrichments
-   Shows estimated credit impact
-   Gives you the option to toggle auto-run off for the table before importing

This prevents unexpected credit usage when you add new data to tables with existing enrichment workflows.

**Learn more:** For related information, check out our [credit limit FAQs doc](http://university.clay.com/docs/credit-spend-limits-faq).

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