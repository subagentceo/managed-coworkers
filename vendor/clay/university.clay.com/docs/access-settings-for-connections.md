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

Access settings for connections

# Access settings for connections

Determine who in the workspace is allowed to build with certain connections or MCP servers.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

**Note:** This feature is for users on an Enterprise Plan.

Workspace admins can control who is allowed to add connections and build with them, preventing unauthorized tools from accessing your data.

**Two levels of control:**

-   **Require approval to add new connections** — Members must request admin approval before adding any new connection (e.g., Salesforce, OpenAI, MCP servers) to the workspace
-   **Restrict who can build with existing connections** — Set permissions on each connection to control which users or groups can configure workflows and columns with it

When building in Clay, users only see connections they have access to. All users can still run workflows and columns that are already set up — controls apply at configuration time, not run time.

## Managing connections as an admin

Admins can control connection access in two ways: (1) setting permissions on existing connections to determine who can build workflows and columns with them; (2) requiring approval before members add new connections to the workspace.

### Requiring approval to add new connections

Admins can require that workspace members request approval before adding any new connection to the workspace. When enabled, this helps prevent unapproved tools from accessing workspace data.

**To enable:**

1.  Navigate to `Settings` → `Connections`.
2.  Toggle on `Require approval to add connections` in the connection settings panel.

**How it works:**

Once enabled, when a non-admin member tries to add a new connection to an external provider, they will see `Request access` instead of the standard add-connection flow. The member can include an optional reason for the request. The request is then sent to all workspace admins via email.

Admins will have seven days to **approve** or **deny** each request from the email notification. If approved:

-   The member can add **one connection** for the approved provider. The member will have seven days from the request being approved to do so.
-   To add another connection to the same provider, they must submit a new request.

### Setting permissions on a connection

1.  Navigate to `Settings` → `Connections`
2.  Find the connection you want to manage (e.g., OpenAI, Salesforce, HubSpot).
3.  Under access settings, choose one of the following options:
    -   `Anyone in the workspace` — All workspace members can configure columns or workflows with this connection
    -   `Specific people and groups` — Only admins and the people or user groups you name can configure workflows or columns with this connection
4.  If you selected `Specific people and groups`:
    -   Search for and add individual  members or user groups who should have access
    -   Add [user groups](https://university.clay.com/docs/user-groups) to grant access to all members of that group
    -   To remove access, simply remove individual members or groups from the allowlist.
5.  Click `Save` to apply the changes

To update access later, just edit the connection and add or remove users or user groups from the allowlist.

## What users can and cannot do

If a user does not have access to a connection, they can or cannot do the following across Clay:

**Not allowed ❌**

-   Configure a workflow or column using that connection
-   Edit existing column logic and mappings
-   Duplicate the column or rename it
-   Save it as a function (the function will be saved, but the connection will not be copied over — you'll need to select a connection you have access to)
-   Edit or reorder steps in a waterfall that uses that connection
-   Leverage that connection for Claygent context or AI snippets in campaigns

**Allowed ✅**

-   Run the column and view run info
-   View column logic in read-only mode
-   Swap the restricted connection to a different connection the user **does** have access to
-   Edit table data and build derived tables/columns (unless in view-only mode)

## Controls by feature

### Columns

If the column uses a connection the user doesn't have access to, users can see the column logic in read-only mode. They can swap the restricted connection for one they have access to. Once they do, the column becomes fully editable under their credentials.

### Waterfalls

A waterfall is a priority-ordered list of providers tried in sequence until one returns a usable result. A user's ability to edit a waterfall depends on how many of connections in the waterfall they're allowlisted for:

Access level

Enable/disable providers

Edit provider settings

Reorder / add steps

Delete connections

Swap connections

**No connection access**

❌

❌

❌

❌

✅

**Mixed connection access**

❌

❌

❌

❌

✅

**Full connection access**

✅

✅

✅

✅

✅

‍

Regardless of access state, users can always view the full waterfall configuration (providers, order, selected connections) and swap in connections they're allowlisted for.

### Signals

Signals follow the same access rules as a single column:

-   The connection dropdown only shows connections the user is allowed to use.
-   If the user doesn't have access to the connection currently on the signal, the logic editor is read-only. They can swap in a connection they do have access to to unlock editing.

### Functions

-   When building a function, you can only leverage connections you're allowed to use
-   When **using** an existing function, any columns that leverage connections a user doesn’t have access to appear as read only. Users must swap in their own key to unlock edit functionality.
-   To prevent others from editing your function, use view-only permissions on the function itself until a more comprehensive permissions model is available.

### Claygent

-   When **creating** a Claygent, connection access controls apply when adding documents or connecting data sources.
-   When running an existing Claygent, users can only leverage connections they're allowlisted for. For example, if you run a Claygent, it will use your own OpenAI connection rather than another user's connection. Within the Claygent builder experience itself, no functionality is limited.

### Audiences, Sculptor, and Prospector

Enrichment columns within bulk enrichment tables (Audiences) and Sculptor/Prospector surfaces follow the same access rules described above for individual columns and waterfalls.

## FAQs

**Can admins access every connection in the workspace?**Admins do not, by default, have access to build workflows with every connection in the workspace. All admins can, however, add themselves to any connection in the workspace. Admins are always able to manage and view all connections in the workspace.

**What's the default for new keys?**

Admins and connection owners must explicitly add users or user groups to build workflows and columns with that key.

**Can a user still run a column that uses a connection they don't have access to?**

Yes. Controls are enforced at configuration time, not run time. Users can run existing columns and view run results even if they can't edit the underlying logic of a column.

**What if I want to use a different connection for my own work?**

You can swap the restricted connection out for any connection you're allowlisted for. This lets you run the same logic under your own credentials without changing it for others.

**What happens when an employee leaves the workspace?**

When a user is deactivated, their personal credentials are disabled by default.

**How do I set up controls for my workspace?**

Enterprise customers can configure allowlists independently or with the help of their Growth Strategist.

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