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

Infinite loops

# Infinite loops

Learn about infinite loops and how to prevent/fix them.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

An **infinite loop** occurs when a workflow or automation continuously triggers itself without stopping, creating a cycle that can consume credits, slow down your workspace, and disrupt your work.

An infinite loop happens when the output of an action becomes the input that triggers the same action again, creating a never-ending cycle. In workflow automation, this typically occurs when:

-   Action A triggers Action B
-   Action B's result triggers Action A again
-   The cycle repeats indefinitely

**Warning:** Infinite loops can rapidly consume credits and may require intervention to stop. Always test workflows carefully before deploying them at scale.

## Why infinite loops occur in Clay

Infinite loops in Clay typically happen in these scenarios:

**1\. Webhook-triggered table updates**

When a table sends data to a webhook, and that webhook writes back to the same table, creating a continuous loop.

**2\. Cross-table circular references**

When Table A enriches data and writes to Table B, and Table B's automation writes back to Table A, triggering the cycle again.

**3\. Auto-enrichment recursion**

When an enrichment column triggers based on a field that the enrichment itself updates, causing it to re-run continuously.

**4\. API integrations with bidirectional sync**

When Clay sends data to an external system, and that system has a webhook configured to send updates back to Clay, which then triggers another send.

## Common Clay examples

### Example 1: Webhook loop

**The scenario:** A table triggers a webhook on new rows, which sends data back to Clay via API, creating or updating rows and retriggering the webhook.

**The loop:**

1.  New row → Webhook fires
2.  External system processes → Sends to Clay
3.  Clay receives data → Row added/updated
4.  **Repeat step 1**

**How to fix it:**

-   Use a status column (e.g., "Not Sent", "Sent", "Completed")
-   Only trigger webhook when status is "Not Sent"
-   Update status to "Sent" immediately after webhook fires
-   Configure external system to NOT write back to the triggering table

### Example 2: Cross-table enrichment loop

**The scenario:** Table A enriches contacts and writes to Table B. Table B enriches company data and writes back to Table A, creating a cycle.

**The loop:**

1.  Table A enriches → Writes to Table B
2.  Table B processes → Enriches → Updates Table A
3.  Table A update triggers enrichment → Writes to Table B
4.  **Repeat step 2**

**How to fix it:**

-   Design unidirectional data flow (no circular references)
-   Use conditional logic to only run enrichments when fields are empty
-   Implement a "processed" flag to prevent re-triggering

### Example 3: Auto-run enrichment on its own output

**The scenario:** An enrichment column auto-runs when a field changes, but the enrichment updates that same field, causing continuous re-runs.

**The loop:**

1.  Field X updates → Enrichment runs
2.  Enrichment modifies Field X (or trigger field)
3.  Field change detected → Enrichment runs again
4.  **Repeat step 2**

**How to fix it:**

-   Set enrichments to manual or specific triggers only
-   Use a separate trigger field that the enrichment doesn't update
-   Add conditional logic: "Only run if \[processed field\] is empty"

### How to identify an infinite loop

**Signs you're in a loop:**

-   Credits depleting rapidly without clear cause
-   Tables continuously showing "running" enrichments
-   Duplicate rows appearing repeatedly
-   Same enrichment columns running multiple times on the same row
-   Webhook logs showing repeated calls in quick succession

**Diagnostic steps:**

1.  **Check your table activity** – Look for patterns of repeated enrichments on the same rows
2.  **Review webhook configurations** – Identify any bidirectional webhook setups
3.  **Examine column dependencies** – Map out which columns trigger which enrichments
4.  **Check external integrations** – Review if external systems are writing back to Clay

## How to fix and prevent infinite loops

### Immediate fixes:

1.  **Pause or disable the triggering automation** – Turn off auto-run on suspect enrichment columns
2.  **Stop webhook deliveries** – Temporarily disable webhook integrations
3.  **Use filters to break the cycle** – Add conditions that prevent re-triggering
4.  **Archive or delete problem rows** – If specific rows are looping, remove them

## Prevention strategies:

-   **Use status/flag columns**
    -   Create a column that tracks whether a row has been processed. Only trigger actions on unprocessed rows.

`IF(Status = "Not Processed", [run enrichment], [skip])   `

-   **Implement one-way data flows**
    -   Design your workflow so data flows in a single direction. Avoid circular references between tables.

`Source → Table A → Table B → Destination   (No writes back from B to A)   `

-   **Add conditional triggers**
    -   Only run enrichments when specific conditions are met, not on every change.

`Auto-run when: Company Name is not empty AND Enriched is empty   `

-   **Use manual run for sensitive operations**
    -   For enrichments that could create loops, disable auto-run and trigger them manually or via API.
-   **Separate trigger fields from output fields**
    -   Don't let an enrichment modify the field that triggers it.
-   **Test with small batches first**
    -   When setting up new automations, test with 5-10 rows before scaling up.

### Best practices for loop-free workflows

1.  **Map your workflow before building** – Diagram how data flows through your tables and integrations
2.  **Use clear naming conventions** – Label status columns consistently (e.g., "Enrichment\_Complete", "Webhook\_Sent")
3.  **Set up monitoring** – Regularly check credit usage and enrichment run counts
4.  **Document trigger conditions** – Keep notes on what triggers each automation
5.  **Leverage pass-through patterns** – For high-volume data that doesn't need storage, use auto-delete to prevent accumulation

### Getting help

If you're experiencing an infinite loop that you can't resolve:

1.  Pause all automations in the affected table(s).
2.  Document the loop pattern (which columns/webhooks are involved).
3.  Reach out to Clay support with details about your workflow structure.

The support team can help identify the root cause and suggest architectural changes to prevent future loops.

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