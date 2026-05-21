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

Credit spend limits FAQ

# Credit spend limits FAQ

Answering questions about the credit spend limits feature.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

**Credit spend limits** let workspace admins control credit usage by setting spending caps on workbooks and tables. This helps teams manage budgets, prevent overspending, and allocate resources across projects and users.

**Note:** This feature is only available for Enterprise Plan.

## Who can set and manage credit limits?

**Who can create and modify credit spend limits?**

Only workspace admins can create and modify credit spend limits. While Admins and Editors can both create workbooks and tables, only Admins can control the spending limits applied to them.

**Can Editors set limits on workbooks they create?**

No. To maintain clear governance, only Admins can set credit limits. If an Editor creates a workbook and no default limits exist, the workbook will operate without spending restrictions until an Admin applies one.

**How do limits apply to Viewers?**

Since Viewers can't create workbooks, an Admin must create one on their behalf and set a spending limit for their use.

## What can have credit limits?

**What resources can have credit limits applied?**

You can apply credit limits to:

-   Workbooks (primary level)
-   Standard tables
-   Signal tables
-   Campaigns

All of these exist within workbooks, making workbook-level limits the primary control mechanism.

**What about legacy tables created outside of workbooks?**

Credit limits aren't available for legacy tables created before the workbook architecture. To set a limit for a legacy table, move it into a workbook first.

## How do credit limits work?

**Can Admins set default limits for all workbooks?**

Yes. Admins can set a workspace default limit so that every new workbook created will automatically have that limit upon creation. You can change or update this default at any time.

To set a default limit:

1.  Go to `Settings` → `Credit usage` → `Workbook limits` tab.
2.  Click `Manage Default Limit`.
3.  Set your desired default credit limit.

Previously, admins had to manually set the limit for each individual workbook. With default limits, all new workbooks automatically inherit the workspace default limit, streamlining credit management across your workspace.

**Can limits be increased or decreased after they're set?**

Yes. Admins can adjust limits up or down at any time for both workbooks and legacy tables.

**How long does a credit limit last?**

Limits are designed with a monthly cadence in mind, aligning with how most enterprise customers plan their budgets and credit usage.

**Does past credit usage count towards the credit limit?**

No — credit limits only apply to usage that occurs after the limit has been set. Any credits spent before the limit was configured will not count towards it.

**What happens when a billing cycle resets?**

Limits don't automatically reset or reapply when billing cycles reset. Admins maintain full control and can modify limits as needed.

**Are limits set as a percentage or fixed number of credits?**

Limits are set as a fixed number of credits rather than a percentage. This provides clearer control since credits don't reset, and all new workbooks are automatically assigned predetermined limits by the Admin.

**Do function calls count against a workbook's credit limit?**

Yes. When a workbook calls a function that consumes credits, those credits are attributed to the calling workbook and count against its credit limit. If the workbook reaches its credit limit, the function will be blocked from running.

## What happens when limits are reached?

**What happens when a workbook hits its credit limit?**

When a limit is reached:

-   All credit-consuming processes stop
-   Users see a message that the limit has been reached
-   Any recurring spends are canceled
-   Users are notified of canceled processes

**Can users request a limit increase?**

Users can request higher limits from their Admin outside of Clay. Since Admins can modify limits directly, there's no in-product flow for requesting increases. Team members should reach out to their Admin directly.

**What happens if an Admin lowers a limit below what's already been spent?**

If a workbook originally had a 200-credit limit with 100 credits spent, and an Admin lowers the limit to 80 credits, users will immediately see a message that the limit has been reached. Any recurring spends will be canceled, and users will be notified.

**What happens if a source is running when the limit is hit?**

The process will stop, similar to how Clay handles other credit exhaustion scenarios. Future enhancements may include options to pause and resume later.

## Notifications and communication

**Who receives notifications when a workbook approaches or hits its limit?**

Notifications are sent to:

-   Workspace Admins (who can modify limits)
-   Any users explicitly added to that specific workbook

Notifications will be delivered via both email and in-product UI across various surfaces.

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