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

Gen AI

](/docs-topics/gen-ai)

/

Sandbox mode

# Sandbox mode

Learn about sandbox mode, a playground to safely iterate + experiment with your data!

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Sandbox mode is a special table mode that lets you safely build, test, and publish table configurations using a small subset of rows—without affecting your running workflow. **With sandbox mode you can:**

-   Test enrichments and integrations on a smaller dataset so you conserve credits and prevent accidental credit usage.
-   Hand-pick specific rows from your table to experiment with in your sandbox.
-   Keep your production table safe from changes while sandbox mode is active.
-   Review all changes before applying them to your full table.

## **Enabling sandbox mode**

1.  Click the `Sandbox mode` button in the toolbar.
    -   If you do not see this button, check that you are on a Pro or Enterprise Plan
2.  After a few seconds, a new sandbox will be set up with sample rows, ready for you to make changes.
    -   **To discard changes and start a fresh copy of the sandbox:** Click `⚙️` → `Reset sandbox`.
    -   **To turn off sandbox mode:** Click `Exit sandbox` in the toolbar. This will return you to your normal table and discard all unpublished changes in your sandbox.

**Note:** During sandbox mode, your regular table becomes read-only and cannot be updated directly. You can switch between your sandbox and the read-only production table using the tabs menu. All recurring sources ([webhooks](https://www.clay.com/university/guide/webhook-integration-guide), [signals](https://www.clay.com/university/guide/signals), etc.) and [scheduled runs](https://www.clay.com/university/guide/scheduled-columns) will still run while sandbox mode is active.

## Using sandbox mode

In sandbox mode, you can test formulas, waterfalls, and enrichments. **Here are some other helpful notes:**

-   You cannot add or edit sources in sandbox mode. To make these changes, first return to your normal table, then re-enable sandbox mode.
-   To prevent accidental updates, all outbound actions (actions that send data such as exporting or [Write to Other Table](https://www.clay.com/university/guide/write-to-table-integration-overview)) are automatically disabled in sandbox mode.
    -   However, you can still manually run individual cells or columns if needed.

### Adding data to the sandbox

When you start sandbox mode, the top 10 rows from your existing table will be duplicated as samples. Sandbox tables have a maximum of 50 rows.

**To add additional rows to your sandbox:**

1.  Click `Add test data`.
2.  Enter the number of rows and select your row selection mechanism.
    -   If you select `Top rows`, it will add the next set of rows from the top of the current view in all data.
    -   If you select `Random set`, it will randomly select rows from your `All data` tab.

**To add specific rows:**

1.  Navigate back to the `All data` tab using the top navigation.
2.  Select a set of rows in the table.
3.  Click `Add X rows to test data`.

## Publishing sandbox changes

### Viewing changes

Click `Review changes` to view a list of all _structural_ column updates to your sandbox (compared to your regular table).

**This includes:**

-   Adding/deleting a new column.
-   Renaming a column name/description.
-   Update configurations to a formula, waterfall, or enrichment.

**Notes on publishing changes:**

-   Visual updates (such as pinned columns, column ordering, and colors) won't appear in the list, **but** **_will_** **be applied when you publish**.
-   Manually added rows and manual overrides to individual cell data **will not be published**.
-   Changes to a column that affect downstream columns are shown in a nested format to clearly indicate which other columns may be impacted.

### Publishing changes

When you are ready to publish the changes in your sandbox to your regular table, you have two options:

-   `Publish and don't Run` will sync all your column configuration changes to all data but will _not start_ a run for any of these columns. You would need to manually run them later.
-   `Publish and run` will sync all column configuration changes to all data **and** run all affected columns on all rows in the full table.

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

Pro

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