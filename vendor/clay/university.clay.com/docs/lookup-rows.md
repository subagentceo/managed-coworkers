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

Lookup Rows

# Lookup Rows

Bring in data into your table from other tables.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

The Lookup Rows feature allows you to search and retrieve data from other tables in your workspace, enabling connections between tables and filtering data based on specific criteria.

Whether you need a single row or multiple matching records, these lookup actions provide flexible options to enhance your data management and create more dynamic, interconnected workflows.

### When to use Lookup Rows vs. Send Table Data

Both Lookup Rows and Send Table Data move information between tables, but they work in opposite directions and serve different purposes.

**Use Lookup Rows when...**

Lookup Rows **pulls** data from another table into your current table based on matching criteria. It's non-destructive and doesn't modify the source table.

-   You need to **enrich your current table** with data that already exists in another table
-   You want to **check if a record exists** in another table without modifying anything
-   You need to **count or aggregate** rows that share a trait (e.g., how many people work at each company)
-   You want to **reference** data from a central table (like a pricing list, messaging library, or Do Not Contact list)
-   You're working with **static reference data** that multiple tables need to access

[**Learn more about Lookup Rows →**](https://university.clay.com/docs/lookup-rows)

**Use Send Table Data when...**

Send Table Data **pushes** data from your current table into another table. It creates or updates rows in the destination table.

-   You need to **route or segment** your data into different tables based on logic or filters
-   You want to **flatten lists** into individual rows (e.g., turn a list of 5 people into 5 separate rows)
-   You need to **merge data** from several tables into one consolidated table
-   You want to **separate concerns** across multiple tables (e.g., companies in one table, people in another)
-   You're building **multi-stage workflows** where each table handles a specific step in your process

[**Learn more about Send Table Data →**](https://university.clay.com/docs/send-table-data)

### **Using `Lookup single row in other table`**

1.  Identify a shared value to compare between the two tables (e.g., company URL, email address, or other value two rows might share).
2.  Normalize your key if needed (e.g. extract the domain from an email into a `Domain` column).
3.  Add the `Lookup single row` action in the table you want to enrich.
4.  Configure the lookup:
    -   `Table to search` — the table you're checking against to look for matches
    -   `Target column` — the column to match on in that table
    -   `Filter operator` — how to compare the values (strict `Equals` or flexible `Contains`)
    -   `Row value` — the value you're looking for
5.  Run the lookup.
6.  Review results to see whether matches were found.

**Common use cases**

-   Pull company attributes into a people table (name, revenue, industry, etc.)
-   Pull people attributes into a company table (e.g., key contacts/leaders)
-   Re-use standard messaging stored in a central table
-   Check against a static reference database, like a list of users
-   Check a Do Not Contact list or verify whether a record has already been enriched, then branch actions based on yes/no

**Best practices**

-   For readability, when a result is found you can promote returned fields into their own columns (select a returned value → `Create column for it`)
-   Match on stable, unique identifiers (e.g., a URL is often better than a company name)
-   Clean and normalize both sides of the match key (trim, lowercase, consistent formatting)
-   Use single row lookup instead of multiple row lookup when you only need one result — it's faster

### **Using `Lookup multiple rows in other table`**

1.  Identify a shared value to compare between the two tables (e.g., company URL, email address, or other value two rows might share).
2.  Normalize your key if needed (e.g. extract the domain from an email into a `Domain` column).
3.  Add the `Lookup multiple rows` action in the table you want to enrich.
4.  Configure the lookup:
    -   `Table to search` — the table you're checking against to look for matches
    -   `Target column` — the column to match on in that table
    -   `Filter operator` — how to compare the values (strict `Equals` or flexible `Contains`)
    -   `Row value` — the value you're looking for
    -   `Limit (Optional)` — set max number of rows to return (useful to cut down on response size if you have large numbers of columns)
5.  Run the lookup.
6.  Review results:
    -   Each row returns a count of matches
    -   The cell also shows a sample list (up to 10) matched rows you can click into
7.  Optional: Break matches into separate columns using `Add as column` (e.g., pull the first 1–2 matched records/fields into dedicated columns)

**Common use cases**

-   Count related records (e.g., how many people map to each company)
-   Detect interest/volume (e.g., multiple inbound form submissions tied to one company)
-   Trigger follow-ups based on count (e.g., 0 → run a "find people" search; 3+ → prioritize outreach)

**Best practices**

-   Match on clean, normalized identifiers (domain/email domain beats company name)
-   Remember the UI shows up to 10 matches, but the count reflects all matches found
-   Only use `Add as column` for the few results you actually need to avoid clutter and keep tables readable

### **Using lookups in the same table**

You can also use `Lookup multiple rows` within the same table to find duplicates, count related records, or group rows by shared traits.

1.  Decide what you're trying to group/dedupe by.
2.  Create a shared match key column in the table.
3.  Add the `Lookup multiple rows` action on the table.
4.  Set `Table to search` to the same table you're enriching.
5.  Set `Target column to search` to your match key (e.g. email domain) and match it to the current row's match key.
6.  Run the action to return a count + list of matching rows for each record.
7.  Click into the result cell to view the matched rows and their details.

**Common use cases**

-   Detect duplicates or repeat submissions (e.g., multiple form fills from the same company)
-   Count related records inside one table (e.g., "how many people share this domain?")
-   Prevent duplicate enrichment (e.g., only enrich a company the first time it appears; skip repeats)

**Best practices**

-   Use a clean, consistent match key (domain is usually more reliable than company name)
-   Remember a self-lookup will usually match the row to itself—account for that when interpreting counts (e.g., "other matches" vs "total matches")
-   Use the lookup result as a gate to control downstream actions (enrich/send/route only when criteria are met)

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