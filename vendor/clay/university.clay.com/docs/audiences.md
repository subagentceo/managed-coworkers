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

Audiences (Beta)

# Audiences (Beta)

Build dynamic segments across millions of records, run automated enrichment and signal workflows at scale, and sync results.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

**Note:** This feature is currently in beta for Enterprise customers.

‍

Clay Audiences is the unified data layer for your workspace. It combines your CRM, data warehouse, and third-party enrichments into one persistent profile per contact and account, updated in real time.

Use it to build dynamic segments across millions of records, run automated enrichment and signal workflows at scale, and sync results back to Salesforce without managing dozens of separate tables.

Setting up Audiences is four major steps:

1.  **Import your data** — connect Salesforce or Snowflake and bring your records into Audiences.
2.  **Create audiences** — build dynamic segments using filters to target the right contacts and accounts.
3.  **Enrich and monitor** — run bulk enrichments and signals that write data permanently back to each record.
4.  **Write back to your CRM** — sync enriched data and segment membership back to Salesforce.

## Importing your data

To view your full audience, click `People` or `Companies` in the left sidebar.

To add a data source for the first time, click the `Add data` button in the top right, then click `Add Source`.

You can import data from:

-   A new people or companies search
-   Snowflake
-   Salesforce

### Importing from Salesforce

**Note:** Setup must be completed separately for People, Companies, and Opportunities. Complete steps for `People` first, then repeat for `Companies`, then `Opportunities`.

1.  Click `Add data` → `Add Source` → select your Salesforce integration.
    -   If you don't see an SFDC integration listed, contact your Growth Strategist.
2.  Select `People` at the top of the sync panel.
3.  Enable the `Import` toggle.
4.  Leave `Export Sync` and `Create new Salesforce records` off for now.
5.  Add any SFDC fields you frequently use or want to segment by.
    -   You can update these later.
6.  Name the corresponding Clay fields — these become the column names in Audiences.
7.  Select `Companies` at the top and repeat steps 3–6 for accounts.
8.  Select `Leads` at the top of the sync panel.
9.  Enable the `Import` toggle.
10.  Add any Lead fields you want to filter or segment by — common fields include `Lead Status`, `Lead Source`, `Title`, and `Company`.
     -   Lead records are automatically merged with matching Contact records into a single person record in your People audience. Data from both sources is combined, and duplicates across Salesforce Leads, Contacts, and other sources count as one person.
11.  Name the corresponding Clay fields.
12.  Select `Opportunities` at the top of the sync panel.
13.  Enable the `Import` toggle.
14.  Add any Opportunity fields you want to filter or segment by — common fields include `Stage`, `Amount`, `Close Date`, and `Owner`.
     -   Opportunity data is associated with your Companies records and becomes available as a filter in your Companies audience.
15.  Name the corresponding Clay fields.
16.  Click `Save and Preview`, then `Confirm`.

#### How Salesforce sync works

Understanding the sync cycle helps you predict when data will appear and why some fields might lag behind others.

**Sync cadence:**

-   **Incremental sync (every 15 minutes)** — pulls records whose `LastModifiedDate` has changed since the last sync. All mapped fields for that record are refreshed in Audiences. There is no field-level filtering — if a record's `LastModifiedDate` has been updated, all of its mapped fields will sync.
-   **Full sync (weekly)** — re-processes all records regardless of modification date. This catches hard deletes, resolves duplicates from deleted-and-recreated records, and refreshes fields that don't trigger `LastModifiedDate` updates.

**One important exception — fields that can't be updated:** Some Salesforce fields cannot be written back or tracked incrementally. In the field mapping UI, these appear with a greyed-out icon when selected. This applies to more than just formula or calculated fields — any field Salesforce marks as non-updateable will behave this way and will only reflect its latest value after the weekly full sync.

**Overwrite rules:** When Clay data and Salesforce data conflict on the same field, you can choose how conflicts are resolved:

-   **Always overwrite** — Clay's data takes precedence.
-   **Never overwrite** — Salesforce's value is preserved.
-   **Conditional** — Clay only writes to fields that are currently blank in Audiences.

For most teams, start with **Never overwrite** or **Conditional** to avoid overwriting maintained CRM data. You can loosen this after validating Clay's data quality.

**Deleted records:** Clay does not delete records from Audiences when they are removed from Salesforce. Instead, the record is marked as **Deleted in Source**, which you can filter out in any segment. The weekly full sync is what catches hard deletes and resolves any duplicate entries caused by deleting and recreating a record with a new Salesforce ID.

**Stopping an ongoing import:** To stop an in-progress import or prevent future syncs from running, disable the `Import sync` toggle in the Salesforce settings panel for the relevant entity type (People, Companies, or Opportunities).

### Importing from Snowflake

Clay Audiences supports importing data directly from Snowflake using a SQL query, letting you bring in product usage signals, website analytics, or any other warehouse data and layer it alongside CRM records and Clay-sourced contacts — all deduplicated around a shared identifier like company domain.

**Note:** Clay uses Key Pair Authentication for Snowflake — username/password is not supported. If you haven't set up key pair auth yet, see the [Snowflake integration doc](https://university.clay.com/docs/snowflake-integration) for step-by-step instructions on generating your RSA key pair and assigning the public key to your Snowflake user.

#### Connecting your Snowflake account

1.  In your Audiences workspace, click `Add data` → `Add Source` → search for `Snowflake` → select `Import from Snowflake`.
2.  Click `+ Add account` and fill in the connection fields:
3.  Click `Test Account and Save`.

#### Writing your SQL query

After connecting, Clay prompts you to enter a SQL query that determines which records are imported.

`SELECT      domain,      company_name,      total_sessions,      last_session_at,      trial_status,      engagement_score   FROM your_database.your_schema.your_table_or_view   `

Any valid `SELECT` works — tables, views, joins, and aggregations are all supported. Two things to keep in mind:

-   **Use fully qualified table names** (`DATABASE.SCHEMA.TABLE`). Snowflake doesn't always default to the database and schema from your connection settings.
-   **Test your query in a Snowflake worksheet first** to confirm it returns the rows you expect before connecting it to Clay.

Click `Test` to preview results, then click `Continue`.

**Note:** Each Snowflake connection in Audiences supports one import query. If you need to import from multiple tables or views, combine them in your SQL query using joins or unions, or add a second Snowflake connection.

#### Finishing setup

1.  Define the **Unique Identifier**:
    -   For People: `email` or `user_id`.
    -   For Companies: `company_id` or `domain`.
2.  (Optional) Configure a **Timestamp Field** for incremental syncing:
    -   With a timestamp: syncs run every **15 minutes** and only import new/changed records.
    -   Without a timestamp: the full query reruns every **12 hours**.
3.  Map your Snowflake columns to Audience fields.
4.  Review and click `Confirm` — Clay begins importing immediately.
5.  Monitor the import. If records don't appear right away, refresh the page to see the latest count.

#### Configuring Import sync

Once connected, toggle on `Import sync` to keep your data current automatically. When enabled:

-   **Incremental imports** run every 15 minutes — picking up new or changed records.
-   A **full sync** runs once a week — refreshing all records.

You can also trigger a manual sync at any time, which is useful when testing. To check sync status or update settings, click `Add data` in your Audiences workspace, find the Snowflake integration, click the `⋯` menu, and select `Settings`.

**Note:** Records cannot be deleted from Audiences after they've been imported. If you're experimenting, consider testing in a separate workspace first.

### Importing from people and companies search

1.  Click `Add data` → `Find people` or `Find companies` to open a search.
2.  Narrow your search using parameters like `Job title`, `Experience`, and `Technographics` (for Find Companies).
3.  Click `Continue` → `Save to People/Companies`.
    -   Note: This sends your search results to a draft version—it won't combine them with your existing Audience data.
4.  In your draft, click `Enrich` to bulk enrich and refine your data, keeping only high-quality leads.
5.  When your search data looks good, click `All people` to merge.

### Sending data from a Clay table

You can also send contacts from any existing Clay table directly to your Audience:

1.  Open any table with contacts you want to save to your Audience.
2.  Click `Continue` at the bottom of the table.
3.  Select `Save to People` or `Save to Companies` depending on the record type.

Records saved from tables are automatically deduplicated and merged with your existing audience data.

### Combining multiple sources

Audiences is most powerful when you layer sources together. Clay deduplicates all of them on your unique identifier, so you end up with one unified row per contact or company combining internal signals, CRM status, and third-party data. A common layering pattern:

-   **Snowflake** — product usage signals, website session data, trial status
-   **Salesforce** — deal stage, account owner, last activity
-   **Find Companies / Find People** — net-new contacts or accounts sourced from Clay's dataset
-   **Upsert Audiences Record enrichments** — data from any other source (e.g., webhooks, HubSpot, unsupported integrations)

### Entity resolution and deduplication

Clay matches records using LinkedIn URL and email to:

-   **Cross-source deduplication** — merge the same person from multiple sources.
-   **Whitespace detection** — exclude CRM records when importing from CPJ/People Search.

Deduplication across sources is automatic. Within Salesforce, it uses SFDC IDs — org duplicates carry over as-is. Native within-source deduplication is coming.

Records need a high-confidence identifier to match. Auto-enrichment adds `LinkedIn URL` and `CPJ ID` at no cost to improve matching.

For the Upsert Audiences Record enrichment, deduplication may not work as cleanly as native "Add Data" sources. Use the "Lookup in Audiences" option with conditional logic to handle matches when upserting from a table.

## Creating an audience

After importing, you will want to create new audiences to target the right contacts.

To create a new audience:

1.  Click `People` or `Companies` in the left sidebar.
2.  Click the `+` next to `My Audiences`.
3.  Select `Criteria` and then add a `Filter` or `Filter group`.

## Enriching and monitoring

### Adding enrichments

Bulk enrichments add contact data, firmographics, technographics, and more to your audience records at scale. They run on an audience and write results permanently back to All People — not just the segment you ran them from. This means any enriched field is immediately available as a filter in any other segment.

Common enrichments to run on your audience:

-   **Domain validation** — periodic HTTP check to confirm domains are still live
-   **Company logos** — auto-fetch when a new company is added
-   **Firmographic enrichment** — industry, employee count, revenue, tech stack
-   **Contact discovery** — find decision makers at high-engagement accounts

Since Audiences is persistent and auto-syncing, these enrichments run once per record and stay current — you're not re-enriching the same companies every time you pull a new list.

To add an enrichment:

1.  Navigate to an audience and click `Enrich` → `Add bulk enrich`.
2.  Add enrichment columns as you normally would (e.g., `Enrich Person` for LinkedIn URL, title, phone).
3.  Test on a small batch first — click `Run on 10 rows` to verify output before running at scale.
4.  Open `Field Mapping` and map each column you want to save back to Audiences.
    -   Enable the auto-enrich toggle so that any new record entering this segment is automatically passed through the enrichment — typically within 15 minutes.
5.  Click `Start Run`.

**Using Audiences from a Clay table:**

Two Clay enrichments let you move data between a Clay table and your Audience directly. In any Clay table, click `Add enrichment` and search for:

-   `Upsert Audiences Record` — pushes records from a table into your Audience, creating a new record if no match exists or updating an existing one if a match is found. Use it to commit data from unsupported integrations (e.g., HubSpot), qualify event lists in a table before adding them to your Audience, or migrate enrichment work already done in a table.
-   `Lookup in Audiences` — pulls data from your Audience into a table row. Use it to reference enriched or signal data in a table workflow without making Salesforce API calls.

### Signals

Signals monitor your audience for key changes and write results permanently to each matching record so you can segment on them.

To add a signal to a segment:

1.  Navigate to an audience and click `Enrich`.
2.  Click `Signals` → select a signal type (e.g., `Job Change`).
3.  Set the **look-back period** for the initial run: `3 months`, `6 months`, or `1 year`.
4.  Set the **recurrence frequency** — how often it re-runs going forward.
5.  Review the **cost preview per record** shown before the run begins.
6.  Click `Save and Run`.

After you add a signal:

-   Results write to a **dedicated signal column** on each matching record — stored permanently and globally (not scoped to this segment).
-   Clay **automatically creates a companion segment** combining your original filters plus a filter for the new signal result — this is expected, not an error.
-   Multiple signals each get their own column; the **Signal Summary** column aggregates all results. Click any row to see per-signal detail.
-   Any other segment that filters on this signal type will also surface these results.

Signals also work from outside Audiences. Any webhook, HTTP source, or Clay table can trigger an Audiences update — for example:

-   Webhook fires → Clay table receives it → looks up company in Audiences → updates the record
-   Web session spike detected → update engagement score → trigger outreach sequence
-   Trial converts → update status → move to different segment → notify AE

### Sending audiences to workbooks or ad platforms

When you have a segment ready, you can send it to a workbook or an ad platform to act on it.

1.  Click `Send` → `Export action`.
2.  Then click `Add to workbook` or `Sync to ad platforms`.

How you might use this:

-   **Outbound sequences** — send high-fit contacts to a workbook, add personalization (LinkedIn activity, news, custom snippets), then enroll in Outreach or Salesloft.
-   **Account-based advertising** — sync company segments to LinkedIn, Meta, or Google Ads. Contacts who no longer qualify are automatically removed.
-   **Rep-owned outbound** — scope workbooks by territory or rep so each AE works only their assigned accounts.
-   **Additional processing** — send to a workbook to enrich, score, or filter before pushing to your destination.

## Writing back to your CRM

Audiences supports **bidirectional sync** with Salesforce. Enriched data and segment changes write back automatically.

Map any Clay data or segment membership to Salesforce fields. Examples:

-   Personal email → SFDC `Personal Email` field.
-   Segment membership → CRM status, campaign enrollment, lead score, or owner assignment.

Export settings control whether Clay **creates new Salesforce records** for net-new contacts or **only updates existing ones**.

Export sync behavior:

-   **Frequency:** every 24 hours.
-   **Batch size:** ~10,000 records per batch, up to 150M records per job.
-   **Speed:** approximately 2.5 minutes per 1M records.
-   **API limit type:** counts against Salesforce's **Bulk API limits** (separate from the standard per-24-hour API request limit). Bulk limits are based on total records processed per 24 hours.

### Salesforce API usage

**Import (Salesforce → Clay)** uses the Bulk V2 Query API:

-   **Batch size:** ~50,000 records per API request (though the exact number can vary based on the number of fields per record).
-   **API requests per import:** at minimum, 1 per 2,000 records; at maximum, 1 per record in extreme cases. Weekly full syncs consume approximately the same number of API requests as the initial import.
-   **API limit type:** counts against both your standard Salesforce API request limit (per-24-hour limit based on license type) and the separate [Salesforce Bulk API limits](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_concepts_limits.htm).

**Export (Clay → Salesforce)** uses the Bulk API 2.0 Ingest:

-   **Batch size:** ~10,000 records per batch, up to 150M records per job.
-   **API limit type:** counts against Salesforce's Bulk API limits only (separate from the standard request limit).

**Checking your remaining quota:** Go to `Settings` → `Connections` → find your Salesforce account → click `Test connection`. This will display your remaining standard API requests. Note that this may not appear depending on the permissions of your Salesforce connection.

**Checking Bulk API limits:** Navigate to `Setup` → `System Overview` → `API Usage` in Salesforce. Most Enterprise Salesforce orgs have limits in the hundreds of millions, making API usage a non-issue for the majority of customers.

**Note:** CRM export is admin-only and currently free during beta. Enrichments and signals follow standard Clay table pricing. Export pricing may change at GA.

## FAQs

### When should I use Audiences vs. a table?

Use Audiences by default for anything you want to reuse, segment on, or build automations on top of. Use tables for one-off workflows, integrations Audiences doesn't yet support natively, or cases where data doesn't need to persist beyond a single run.

### What if my integration isn't supported yet?

Use the `Upsert Audiences Record` table enrichment as a bridge. Bring your data into a Clay table from any source, then use Upsert to push those records permanently into your audience. This works for any source Audiences doesn't yet natively support.

### My CRM is messy. Should I clean it up before setting up Audiences?

You don't need a clean CRM to get started — CRM cleanup is often the first use case Audiences enables. A common approach: sync your existing CRM, run LinkedIn enrichments to refresh contact data, use the enriched identifiers to surface duplicates, then build further enrichments from there.

### Does Audiences update automatically?

Yes. Segments update in real time as records enter or change, typically within 15 minutes. Enrichments and actions trigger automatically for new records when the auto-enrich toggle is enabled. No manual runs required after initial setup.

### What happens to a contact's ad targeting when they become a customer?

If your segment has an exclusion condition (e.g., Account Type ≠ "Customer"), the contact is automatically removed from the synced ad audience as soon as that condition is met. See [Clay Ads](https://university.clay.com/docs/clay-ads) for platform-specific guidance.

### What triggers an incremental Salesforce sync?

An incremental sync runs every 15 minutes. Any Salesforce record whose `LastModifiedDate` has been updated since the last sync will be pulled in — and all of that record's mapped fields will refresh in Audiences. There is no field-level filtering: it's record-level.

### Why are some of my Salesforce fields not updating on incremental sync?

The most common cause is fields that Salesforce doesn't update `LastModifiedDate` or `SystemModstamp` for when their values change — this includes calculated and formula fields, as well as certain other non-updateable field types. In the field mapping UI, these appear with a **greyed-out icon** when selected. These fields will only reflect their latest values after the weekly full sync runs.

### How long does an initial Salesforce import take?

Import speed depends on the number of columns per record. Typical benchmarks:

-   **~700 records/second** (~2.5M records/hour) under average conditions
-   **~500 records/second** (~1.8M records/hour) in slower conditions
-   **As low as ~100 records/second** (~360K records/hour) under high load

As a rough guide, expect around 5 hours for 1 million records, though this varies. After editing field mappings, allow approximately 2.5 hours per 1 million records for the changes to propagate.

### Does editing my Salesforce field mappings consume additional API requests?

No. Adding or editing field mappings in Audiences does not trigger additional Salesforce API requests on its own. New field data will be pulled on the next sync cycle.

### How do I stop an ongoing import?

Disable the `Import sync` toggle in the Salesforce settings panel for the relevant entity type (People, Companies, or Opportunities). This will both stop any in-progress sync and prevent future syncs from starting.

### I deleted and recreated a Salesforce record — I'm now seeing duplicates in Audiences. Will this resolve?

Yes. When a Salesforce record is deleted and recreated with a new ID, Audiences will temporarily show both the old (deleted) record and the new one, since they have different Salesforce IDs. The weekly full sync will catch this and resolve the duplicate. The old record is marked as **Deleted in Source** and can be filtered out in any segment.

### What happens to deleted Salesforce records in Audiences?

Clay does not delete records from Audiences when they are removed from Salesforce. The record remains in your audience but its status is updated to **Deleted in Source** — a field you can filter on to exclude deleted records from any segment. Hard deletes are caught on the weekly full sync.

### Is there a way to manually trigger a full sync or cleanup sooner?

There is no self-serve way to trigger a full sync early. Engineering can manually kick one off, but this is not recommended as a routine practice — a full re-sync processes all records and consumes a significant amount of Salesforce API quota, which is why it only runs automatically once per week. Contact your Growth Strategist if you need to escalate.

## Troubleshooting

### Enriched data isn't appearing in my audience after running a bulk enrichment

This is almost always a field mapping issue. The default behavior is _never write_ — if field mappings weren't configured before the run, nothing saved back. Go back to the bulk enrich table, set up field mappings for each column you want to persist, and re-run.

### New records aren't being automatically enriched when they enter a segment

The auto-enrich toggle is likely off. When disabled, bulk enrichments run as one-time batches and don't pick up new records automatically. Enable the toggle to make the enrichment continuous.

### I'm seeing duplicate records after syncing from Salesforce

Clay deduplicates based on Salesforce IDs within a single source. If your Salesforce org is configured to allow duplicates, those carry into Audiences as-is. Cross-source deduplication (e.g., same person in Salesforce and Snowflake) is handled automatically. For within-CRM duplicates, run a deduplication workflow before or alongside your Audiences setup.

If duplicates appeared because a record was deleted and recreated with a new Salesforce ID, they will resolve on the next weekly full sync.

### Records aren't falling out of a segment when they should

Segments are dynamic but depend on the incremental CRM sync running first. If a record was updated in Salesforce, wait for the next sync cycle to complete (up to 15 minutes after the sync) before the segment reflects the change.

### Export to Salesforce isn't writing data back

Check in order: (1) the export toggle is **off by default** and must be explicitly enabled; (2) Audiences CRM export is **admin-only** — confirm the user configuring export has admin access.

### A Salesforce field has a greyed-out icon in the field mapping UI

This means the field cannot be updated by Clay — it's flagged by Salesforce as non-updateable. This applies to formula fields, calculated fields, and certain other system-managed field types. These fields will only reflect their latest values after the weekly full sync. You can still map them for reading/filtering, but Clay cannot write new values to them.

### "Connection timed out" when connecting Snowflake

Click the `⋯` menu on the Snowflake integration → `Reconnect`. If that doesn't work, delete the connection and re-add it using the same credentials.

### Companies or people aren't appearing after a Snowflake import

Make sure `Import sync` is toggled on — it's not always enabled by default. Click `Add data` in your Audiences workspace, find the Snowflake integration, click the `⋯` menu, and select `Settings` to check.

### "No results found" after connecting Snowflake

Verify your SQL query works directly in Snowflake first. Run it in a Snowflake worksheet and confirm it returns rows before connecting it to Clay.

### Snowflake permissions errors

This commonly happens if you're using a Snowflake free account or a role with restricted access. Run this in a new Snowflake worksheet to confirm what your session is pointed at:

`SELECT CURRENT_USER(), CURRENT_ROLE(), CURRENT_DATABASE(), CURRENT_SCHEMA();   `

If `CURRENT_DATABASE()` or `CURRENT_SCHEMA()` return null, your `USE` statements aren't sticking — try opening a brand new worksheet, as old sessions can get stuck with stale context.

### Audiences tabs aren't visible

If your workspace was recently added to Audiences (via feature flags), give it a minute to propagate, then refresh and try again.

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