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

Salesforce integration FAQs

# Salesforce integration FAQs

Answering common questions about connecting and troubleshooting the Salesforce integration.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

This doc answers common questions about connecting and troubleshooting the Salesforce integration. For setup instructions and how to use Salesforce actions in Clay, see [this doc](https://www.clay.com/university/guide/salesforce-integration-overview).

## What permissions and scope do I need for the Salesforce enrichment?

**Required Permissions for Your Clay User**

To connect Clay to Salesforce, your Clay user needs:

1.  Access Identity Information (profile, email, address, phone)
2.  Manage Data via APIs
3.  Perform Requests Anytime (refresh\_token, offline\_access)

An OAuth user must set up the initial connection. After that, any user in your Clay workspace can use the integration.

**Connection Scope and Permissions**

The Salesforce connection is tied to the OAuth user who sets it up:

-   **Data Pull**: Import or look up Salesforce records, limited to the fields and objects the OAuth user can access
-   **Data Push**: Create or update Salesforce records where the OAuth user has write access

For sensitive fields, you can create a permission set to restrict the OAuth user's access.

## **Can I use AI to generate SOQL queries?**

Yes! Describe the data you want in natural language, and Clay will generate the SOQL query automatically. This works for standard objects, custom objects, and complex relationships.

You can always test the generated query and preview results before running it on your full dataset. If the query needs adjustment, refine your natural language description and Clay will regenerate it.

## Will Clay create duplicate records in Salesforce?

No. By default, Clay prevents duplicate records. However, you can allow duplicates by enabling the "Duplicate Rule Override" in the Create Record enrichment.

To avoid creating duplicates from your Clay table, first look up an object to check if it exists, then create it only if it doesn't.

[Learn more about Salesforce's duplicate rules here.](https://help.salesforce.com/s/articleView?id=sales.duplicate_rules_map_of_reference.htm&type=5)

## What are the default sync settings for CRM integrations?

By default, Clay syncs Salesforce imports every 24 hours. When new records or updates occur, this triggers action runs that enrich and export the updated fields.

**How do I turn on or off autoupdate?**

To modify this setting, click your table name in the top bar. From the dropdown menu, select `Disable` or `Enable auto-update`.

## Is there a way I can test Salesforce enrichments?

Yes, you can test enrichments by connecting your sandbox test environment.

Go to `Settings` → `Connections` → `Salesforce Test Env` to set it up.

## Can I reverse my Salesforce enrichment?

No, once you update or create an object in Salesforce from Clay, you cannot undo these actions.

Please check with your Salesforce admin before making any changes to your Salesforce CRM.

## Do we need to create a custom Salesforce object to integrate Salesforce data?

No, one of Clay's benefits is that you can update any object and any field in Salesforce.

## Why am I seeing an "OAUTH\_APPROVAL\_ERROR\_GENERIC" error when connecting Salesforce?

This error typically occurs when:

-   **Integration User License limitation:** The user attempting the connection has a Salesforce Integration User License or API Only license, which cannot complete UI-based OAuth approval flows.
-   **Connected app not pre-approved:** Your org requires pre-installation of connected apps. If Clay's connected app isn't pre-approved, Salesforce will block the OAuth approval.
-   **SSO enforcement:** When "Is Single Sign-On Enabled" is set on the user or an IdP-redirect flow is forced, Salesforce may not present the OAuth approval screen.

**How to fix:**

1.  Use a full Salesforce user license (not Integration User) with a profile or permission set that includes API Enabled and Connected App Access.
2.  If your org enforces SSO, temporarily allow direct username/password login for this user, or create a non-SSO service account for authorization.
3.  In `Setup` → `Connected Apps OAuth Usage`, verify the Clay app is listed and not blocked. If your org uses App Access Control, pre-install or whitelist the app first.

## Why doesn't the Clay connected app appear under "Connected Apps OAuth Usage"?

A connected app only appears after a successful OAuth authorization. If it's missing, one of these is typically true:

-   The user's profile lacks the "Approve uninstalled connected apps" permission (required when the app isn't pre-installed).
-   Org policies block uninstalled connected apps entirely (via App Access Control).
-   SSO or login flows prevent the OAuth approval prompt.
-   IP restrictions, login-hour restrictions, or Transaction Security Policies block the OAuth request.

**How to fix:**

1.  Add "Approve uninstalled connected apps" to the user's profile or permission set.
2.  Try authorizing with a System Administrator user first—this lifts the "uninstalled" status and populates Connected Apps OAuth Usage.
3.  Once it appears, configure Connected App Policies (e.g., Permitted Users, IP Relaxation, Profile Assignments).

## What callback URL does Clay use for Salesforce?

-   [https://api.clay.com/v3/app-accounts/oauth/salesforce/callback](https://api.clay.com/v3/app-accounts/oauth/salesforce/callback)

## What OAuth scopes does Clay require for Salesforce?

Clay requires these scopes:

-   `api`
-   `refresh_token`
-   `id`
-   `openid`
-   `profile`

## Do I need to adjust IP or session restrictions in Salesforce to connect Clay?

Sometimes. Salesforce session-level or connected-app-level restrictions can interrupt OAuth flows or token exchanges.

**Common blockers:**

-   "Lock sessions to IP address" in Session Settings.
-   Strict HTTPS and network policies that reject redirects from Clay's servers.
-   Very short session timeouts that expire during the OAuth handshake.
-   Permitted IP ranges on the user's profile that exclude the browser or integration IP.
-   Connected App Policies requiring logins from fixed IP ranges.

**Recommendations:**

In `Setup` → `Session Settings`:

-   Disable "Lock sessions to IP address".
-   Use a reasonable session timeout to allow OAuth redirects.

In `Setup` → `Manage Connected Apps` → `Clay`:

-   Set `IP Relaxation` to "Relax IP Restrictions" (Clay's integration calls originate from cloud IPs that may change).
-   Set `Permitted Users` to "All users may self-authorize" unless your org requires admin approval.

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