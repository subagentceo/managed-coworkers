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

Creating a restricted Salesforce user

# Creating a restricted Salesforce user

Create a restricted user with limited field-level access.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

When connecting Salesforce to Clay, you want to prevent accidental exposure of sensitive CRM data. By creating a restricted user with limited field-level access, you can safely enrich your data without giving Clay full visibility into your entire Salesforce org.

This restricted user can still write approved enrichment data back into Salesforce, without exposing your entire CRM.

Salesforce permissions work in 3 layers:

1.  **Object Permission**: Can you open the file cabinet?
2.  **Field Permission**: Can you see the papers inside?
3.  **Record Sharing**: Can you see every file cabinet?

We'll configure all three to ensure Clay has just the access it needs.

## **Create a custom permission set**

1.  In Salesforce, go to `Setup` → `Permission Sets` → `New`
2.  Enter these details:
    -   `Label`: Account Limited Read + Writeback
    -   `License`: Salesforce
3.  Click `Save`

## **Set object-level permissions**

1.  Within your new permission set, go to `Object Settings`
2.  Find and select `Account`
3.  Enable `Read` only
    -   If you plan to write enrichment data directly to Account fields, also enable `Edit`
    -   Otherwise, leave `Edit` disabled for maximum security

**Optional best practice**: Instead of editing Account directly, create a custom object like `Clay_Writeback__c` to store enriched data. This keeps your core CRM objects clean and auditable.

If you create a custom writeback object:

-   Grant `Read`, `Create`, and `Edit` on the custom object
-   Keep `Account` as `Read` only

## **Configure field-level security**

1.  Go to `Object Settings` → `Account` → `Field Permissions`
2.  Make these fields visible:
    -   `Account Name`
    -   `Domain` (or `Website` field)
    -   `Record ID`
    -   Any other limited fields you want Clay to access
3.  Hide all other `Account` fields

### **If writing directly to Account fields**

If you're writing enrichment data back to `Account` (rather than a custom object), grant `Edit` access to specific fields only:

-   `Clay_Status__c`
-   `Clay_Enriched__c`
-   `Clay_Last_Update__c`
-   Any other approved enrichment fields

Everything else should remain hidden.

## **Set system permissions**

1.  Within your permission set, go to `System Permissions`
2.  Enable:
    -   `API Enabled`
3.  Do NOT enable:
    -   `View All Data`
    -   `Modify All Data`
    -   `Customize Application`

## **Restrict record visibility (optional)**

If you only want Clay to see a subset of your `Accounts` (e.g., certain regions or segments), configure record-level sharing:

1.  Go to `Setup` → `Sharing Settings`
2.  Set `Accounts` organization-wide default to `Private`
3.  Create a sharing rule:
    -   Go to `Sharing Rules` for `Accounts`
    -   Click `New`
    -   Define criteria (e.g., `Region = EMEA`)
    -   Share with the integration user or their role

You can also use manual sharing or role-based access depending on your needs.

## **What this user can do**

The user you authenticate with Clay can now:

-   ✅ See only `Account Name`, `Domain`, and `Record ID`
-   ✅ Write back approved enrichment fields
-   ❌ View other `Account` fields
-   ❌ Access `Contacts`, `Opportunities`, `Leads`, etc.

## **Static IP addresses for allowlisting**

For additional security, you can allowlist these IP addresses in your Salesforce settings:

-   52.7.81.233
-   18.209.121.250
-   35.170.109.137
-   54.86.28.41

To add these, go to `Setup` → `Network Access` → `New` and enter each IP range.

## **FAQs**

### **Can I use an integration-only user license for this?**

Yes, but integration user licenses have some limitations with OAuth flows. If you run into authentication issues, try using a full Salesforce user license instead.

### **What if I need Clay to access multiple objects?**

Repeat the object-level and field-level security steps for each object you want to grant access to (e.g., Contacts, Leads). Always follow the principle of least privilege—only grant the minimum access needed.

### **How do I test that the restricted user is working correctly?**

Log in to Salesforce as the restricted user (or use "Login as" if you're an admin) and verify:

-   You can only see the fields you configured
-   Object access matches your permission set
-   Clay can successfully authenticate and pull data

### **Can I revoke access later?**

Yes. You can disable the permission set, delete it entirely, or disconnect the user from Clay at any time through `Setup` → `Permission Sets` or your Clay workspace settings.

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