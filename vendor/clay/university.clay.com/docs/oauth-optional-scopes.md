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

OAuth optional scopes

# OAuth optional scopes

Control exactly which permissions you grant to integrations.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

When connecting certain OAuth-based integrations (like HubSpot and Outreach), Clay allows you to control exactly which permissions you grant to the integration. This feature follows the **principle of least privilege**—you only enable the permissions your workflows actually need.

### Why use optional scopes?

**Security and compliance**: Limit data access to meet organizational security policies. Only grant the permissions your team truly needs.

**Read-only access**: Disable write permissions if you only need to pull data without modifying records.

**Advanced features on-demand**: Enable specialized permissions (like HubSpot sequence automation) only when needed.

## Scope types

### Required scopes

These permissions are essential for the integration to function. They **cannot be disabled** and are always requested when you connect an account. Required scopes typically include read permissions for core functionality.

**Visual indicator**: Lock icon 🔒.

**Example:** For HubSpot, required scopes include viewing contacts, companies, and leads—permissions needed for basic CRM operations.

### Optional (enabled by default)

These permissions are requested by default but **can be disabled** if you don't need them. They're pre-selected when you connect an account, but you can uncheck them if you prefer not to grant those permissions.

**Visual indicator**: Checked checkbox ☑️.

**Example:** Write permissions for contacts and companies are optional by default in HubSpot. If you only want to read data from HubSpot (not write to it), you can disable these scopes.

### Optional (disabled by default)

These permissions are available but **not requested by default**. You must explicitly enable them if you want to grant those permissions.

**Visual indicator**: Unchecked checkbox ☐.

**Example:** Sequence automation permissions in HubSpot are disabled by default. Enable them only if you need Clay to enroll contacts in HubSpot sequences.

## How to use optional scopes

### When connecting a new account

1.  Click `Add account` for your desired integration.
2.  In the connection modal, you'll see a `Scopes` section (if optional scopes are available for that integration).
3.  Review the scopes:
    -   **Required scopes** are shown with a lock icon and cannot be changed.
    -   **Optional scopes** have checkboxes you can toggle on or off.
4.  Select the scopes you need and click `Sign in with [Provider]`.
5.  Complete the OAuth flow in the provider's authentication window.

### When reconnecting an existing account

When you reconnect an account (e.g., to refresh credentials or update permissions):

1.  Go to `Settings` → `Connected accounts`.
2.  Find the account and click `Reconnect` from the menu.
3.  Your previously selected scopes will be preserved and pre-selected.
4.  Adjust the scopes as needed.
5.  Complete the reconnection flow.

## Best practices

### Follow the principle of least privilege

Only enable the scopes you actually need. This improves security by limiting what Clay can access in your connected accounts.

### Start with defaults

The default scope selections are designed to cover common use cases:

-   **Required scopes** cover essential read operations.
-   **Optional (enabled by default)** cover typical read/write workflows.
-   **Optional (disabled by default)** are for advanced features.

### Adjust as needed

If an action fails due to insufficient permissions, you can reconnect the account and enable additional scopes.

## Currently supported integrations

Optional scopes are available for the following OAuth integrations:

-   [**HubSpot**](https://www.clay.com/university/guide/hubspot-integration-overview) — Customer relationship management (CRM) platform for sales, marketing, and customer service.
-   [**Outreach**](https://www.clay.com/university/guide/outreach-integration-overview) — Sales engagement platform for automating and optimizing outreach campaigns.

## Troubleshooting

### "Insufficient permissions" error

If you see this error when running an action:

1.  Go to `Settings` → `Connected accounts`.
2.  Find the relevant account and click `Reconnect`.
3.  Enable the required scope.
4.  Complete the reconnection flow.
5.  Retry the action.

### Scope not appearing in the list

If you're looking for a specific scope that isn't shown:

-   It may be included in the required scopes (always enabled).
-   The provider may not support that scope through their OAuth API.
-   Contact Clay support if you need a scope that isn't available.

### Changes not taking effect

After updating scopes through reconnection:

1.  Ensure the OAuth flow completed successfully.
2.  Try running your action again.
3.  If issues persist, disconnect and reconnect the account completely.

## FAQs

### **Can I change scopes after connecting an account?**

Yes. Use the `Reconnect` option in `Settings` → `Connected accounts` to adjust your scope selections at any time.

### **Will my previously selected scopes be remembered?**

Yes. When you reconnect an account, Clay will pre-select the scopes you previously enabled.

### **Do optional scopes affect my existing connections?**

No. Optional scopes only affect new connections or when you explicitly reconnect an existing account.

### **What happens if I disable a scope I'm currently using?**

Enrichments or actions that require that permission will fail with an "insufficient permissions" error. You can re-enable the scope by reconnecting the account.

### **Are optional scopes available for all integrations?**

Currently available for HubSpot and Outreach, with more integrations being added over time.

### **Can different team members connect with different scopes?**

Yes. Each connected account can have different scope selections based on the team member's needs.

Table of contents

[

TOC Heading

](#)

[

TOC Heading

](#)

Plan

[

Enterprise

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