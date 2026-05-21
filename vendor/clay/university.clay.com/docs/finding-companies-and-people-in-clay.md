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

Find

](/docs-topics/find)

/

Guide: Finding companies and people in Clay

# Guide: Finding companies and people in Clay

Best practices to Clay's company and people search features.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Clay's `Find Companies` and `Find People` sources give you instant access to billions of company and people profiles — all in one place. Here are the best practices we recommend to streamline your searches and surface the strongest results.

## Company search

### Anchor on description keywords

Industry categories map to the categories companies self-select on LinkedIn — which can be too broad for most use cases. **Description keywords** let you narrow by what a company actually does, not just how it's categorized. Use them heavily as your primary filter, and layer industry categories on top only when needed.

### Use AI filters to avoid paying for data you won't use

A common TAM sourcing mistake is pulling a large list and then running enrichments afterward to qualify it — which means paying credits for companies you'll ultimately discard. **AI filters** (sub-industries, revenue streams, business types, and other derived attributes) let you filter out noise before any rows are returned, so you only pay for companies you actually want.

‍

**Note:** Technographics filtering is also available directly in company search and costs 3 credits per company returned. This is equivalent to what you'd pay running a technographic enrichment after the fact — the difference is convenience, not cost.

### Understand how filters combine

Company search uses AND logic across filter types and OR logic within a single filter:

-   **Across filters** — every filter you apply must match. If you set industry + company size + revenue, a company must meet all three criteria.
-   **Within a filter** — any value can match. If you select two industries, a company matching either one is returned.

If you need results that meet _either_ of two different filter combinations, set up two separate searches.

## People search

### Choose your starting point

**Recommended:** If you have a company list, use Find People at These Companies (Actions → Find People at These Companies) rather than a standalone people search. This scopes results to your specific companies and keeps contacts linked to their accounts — rather than returning an unanchored list you'd need to join manually.

If you don't have a company list, use **People search as a source** — a standalone search by title or other criteria that returns a new table.

### Build job title lists instead of relying on the function dropdown

The **Job functions** and **Seniority** dropdowns can be too broad or too exclusionary. Instead, paste a comma-separated keyword list directly into the **Job title keywords** field. Use Claude or ChatGPT to generate an exhaustive list of title variations — for example, every way someone might write "VP of Sales" — and paste it in as a single string.

Always pair this with a **Job title keywords to exclude** list to filter out common false positives before they reach your table.

### Choose the right title match mode

-   **Is similar to** _(recommended default)_ — fuzzy match that finds synonyms and variations. "Chief executive officer" also returns "CEO." May occasionally return irrelevant titles; filter those out with a formula (free) or AI.
-   **Contains** — returns titles that contain your full keyword phrase as a substring. "Chief executive officer" will not match "chief financial officer."
-   **Is exactly** — matches only the precise titles you enter. Use when precision is critical.

### Use LinkedIn URLs, not domains, as company identifiers

When running a people search against a company list, provide company **LinkedIn URLs** rather than domains wherever possible. Clay resolves domains by running them through a company lookup, which can occasionally surface the wrong company — especially for subsidiaries. LinkedIn URLs map directly to the intended profile.

### Run conditional people searches with table views

Company and people search sources don't have run conditions the way enrichment actions do. If you only want to find people at companies that meet specific criteria (e.g., only public companies), the workaround is to **create a filtered view** of your company table first, then run **Find People at These Companies** from that view. The source will only pull from the rows visible in the view.

### Source vs. enrichment — when to use each

The `Find People at These Companies` feature is available as both a source and an enrichment action. Here's how they differ:

**As a source (returns a new table):**

-   Returns all results in a separate table.
-   Maxes out at 50,000 records total — once that limit is hit, the source stops returning new records even if new companies are added.
-   Best when you don't need to rank or further filter contacts before saving them.

**As an enrichment action (saves to existing table):**

-   Returns 10 people per row by default, with full profile data.
-   `Reduce data for more results` mode returns up to 500 people per row, but only name and LinkedIn URL — you'll need to run `Enrich Person` afterward to get full profiles.
-   Best when you need to rank contacts first or run a more targeted search per company.

### Use dynamic location filtering with in-table actions

When you run `Find People at These Companies` as an in-table action (rather than launching a separate people search), you can dynamically filter by location by referencing a location column from your company table. This lets you customize the location filter per company without running multiple separate searches.

For example, if you have a "Headquarters Location" column in your company table, you can reference that column in the location filter when setting up the in-table action. Each company will then be searched using its specific location, rather than applying a single static location filter across all companies.

### Verify current employment before using results

People search data reflects snapshot data, which can lag behind real-time LinkedIn changes. After running `Enrich Person`, use this formula to confirm the person is still employed at the expected company:

`{{Enrich person}}?.current_experience?.some(e => (e?.company_domain || "").toLowerCase() === ({{Company Domain}} || "").toLowerCase()) || false   `

This runs as a formula (no credit cost) and returns `true` if a matching current experience is found.

**Note:** This check requires running Enrich Person first. In most workflows you'll be running Enrich Person anyway — the formula adds no additional cost on top of that.

## Excluding companies and people

You can exclude up to **150,000 companies or people** from any company or people search by adding up to **three exclusion sources**. Each exclusion source can be one of:

-   A Clay table
-   A comma-separated list of URLs (e.g., LinkedIn profile or company page URLs)
-   A CSV file

**Identifiers to use:**

-   For companies: domain or LinkedIn URL
-   For people: LinkedIn URL

This is the current way to suppress your existing CRM or list against new searches. In the future, Audiences will allow you to exclude an entire synced CRM instance (e.g., all of Salesforce) in one step.

## Limitations

**Geographic coverage**

**United States:** Highest data quality and coverage.

**International (EMEA/APAC):**

-   Expect 15–25% lower coverage than US
-   Phone numbers especially may have limited availability
-   Europe/DACH regions may require adjusted expectations

**Company segments with lower data quality**

-   SMB businesses (especially those with limited social profiles)
-   Agencies
-   Companies with minimal online presence

## Troubleshooting

### Find People returns fewer results than expected

Clay uses stored snapshot data rather than live LinkedIn search, so results will never be a perfect mirror of what LinkedIn shows on a company's people page. Common causes:

-   **Private or restricted profiles** — Clay can only surface profiles that are accessible in the stored dataset. Profiles set to private on LinkedIn are excluded.
-   **Domain-to-company mapping issues** — when you provide a domain instead of a LinkedIn URL, Clay resolves it through a company lookup that can occasionally return the wrong entity, especially for subsidiaries, rebranded companies, or companies with stale LinkedIn slugs. Switch to the **LinkedIn company URL** as your input to bypass this lookup entirely.
-   **Filters set too narrowly** — title, location, or seniority filters that are too specific can exclude real matches. Try broadening one filter at a time to diagnose where results drop off.

If profiles still appear to be missing after switching to LinkedIn URLs, use **Claygent** to find the missing profiles via Google search, then pass those LinkedIn URLs directly into `Enrich Person`. This uses a live-scraping fallback that isn't constrained by the stored dataset.

### Find People is returning people from the wrong company

This almost always points to a domain-to-company mapping issue. When Clay resolves a domain to a LinkedIn company, it can occasionally surface a parent company, subsidiary, or a generic LinkedIn company page instead of the intended one. Use the company's **LinkedIn URL** as the input instead of the domain to ensure Clay maps to the exact intended entity.

## FAQs

### Why is this person showing up despite having moved companies?

Clay's company and people search relies on snapshot data that may lag behind real-time changes. To confirm current employment, run `Enrich Person` and use the formula in the **Verify current employment** section above to check whether the company matches.

### Why am I finding people with unexpected job titles?

First, check that you're filtering on **Job title keywords** (not just function or seniority). If you're using **Is similar to** mode, you may get some fuzzy matches — filter those out with a formula or AI after the fact.

### Why isn't someone I found on LinkedIn showing in Clay?

Your search filters may be too specific. Try broadening your criteria incrementally. The profile may also not yet be in the dataset.

### How often is company and people data updated?

High-importance profiles (frequently accessed records, decision-makers, active companies) are updated much more frequently. The full universe of long-tail profiles is updated regularly, though high-importance profiles refresh more frequently.

### Can I run a people search only on companies that meet certain criteria?

Company and people search sources don't support run conditions. The workaround is to create a **filtered view** of your company table (showing only the rows you want), then run **Find People at These Companies** from that view. The source will only process the companies visible in that view.

### What's the difference between the people search source and the enrichment action?

The source returns results in a new table and maxes out at 50,000 records. The enrichment action saves results to your existing table, returns 10 people by default with full profile data, and supports a **Reduce data for more results** option that returns up to 500 people (name and LinkedIn URL only). Use the action when you need to rank or filter contacts before saving them, or when you need more than 50,000 total records across multiple searches.

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

Enrich

### CB Insights

Enrich company records with funding history, valuations, revenue ranges, industry classifications, and more.

View article

[View article](/docs/cb-insights)View article

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