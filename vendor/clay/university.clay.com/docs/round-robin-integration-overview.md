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

Round-robin integration overview

# Round-robin integration overview

Route your leads in a round robin manner

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## What is the round-robin feature?

The round-robin feature in Clay ensures leads are distributed fairly and evenly among your team members by assigning them in a rotating order. It eliminates the need for manual lead assignment, making your team’s workflow more efficient and ensuring balanced workloads.

There are two main types of round-robin distribution in Clay:

1.  **Standard round-robin:** Distribute leads evenly in a fixed order.
2.  **Weighted round-robin:** Allocate leads based on predefined weights, helping you route leads.

### Use cases

There are a few use cases where you can use round-robin routing.**‍**

**Use case #1: Lead assignment for sales teams:** Distribute inbound leads evenly or weighted among SDRs.

-   Example: Ensure workload balance across the team.

**Use case #2: Dynamic team assignments:** Adjust for changing team compositions or workloads.

-   Example: Account for “Out of Office” reps or ramp-up periods.

**Use case #3: Territory-based routing:** Assign leads based on regions or account sizes.

-   Example: Creating rotations for SMB vs. enterprise clients.

## Getting set up

### Key concepts

**Distribution**

In Clay, this can be done using **Standard Round Robin**, which assigns leads evenly in a fixed, repeating order, or **Weighted Round Robin**, which assigns leads based on predefined weights.

**Distribution weights**

Weights are numerical values used in **Weighted Round Robin** to determine how many leads each team member receives. Higher weights result in more leads being assigned to that member.

This allows you to adjust assignments based on factors like capacity, experience, or availability.

**Dynamic lists**

Dynamic lists handle changes in team composition or data. This includes accounting for new team members, removing inactive reps, or adapting to live data updates from sources like Salesforce.

Dynamic lists ensure lead distribution according to rules even as the input data evolves.

### Setup checklist

To setup round robin, you’ll need the following.

**Data Table**

Your data table should include all relevant information about your team members and leads. At a minimum, it should contain:

-   **Team Member Names:** The names of the individuals who will receive leads. For th
-   **Optional Columns:**
    -   **Weights:** Numerical values to prioritize certain team members (used for Weighted Round Robin).
    -   **Status:** A column indicating whether team members are active or unavailable, which is helpful for managing dynamic lists.

**Views for Filtering (Optional)**

If your data requires segmentation or filtering, create views to narrow down the list. For example:

-   Include only active team members.
-   Filter leads by specific criteria, such as region or account size.

**Choosing the Enrichment**

Select the type of Round Robin enrichment that suits your needs:

-   **Standard Round Robin:** For evenly distributing leads in a fixed order.
-   **Weighted Round Robin:** For assigning leads based on predefined weights.

**Integration with Data Sources (Optional)**

If you’re working with live data, such as from Salesforce or another CRM, ensure that it is integrated with Clay to keep your assignments up-to-date.

## How can I distribute leads?

Clay provides two primary options for distributing leads: **Standard Round Robin** and **Weighted Round Robin.** Below are step-by-step guides to help you configure each.

### Standard round-robin

**Step 1: Open the enrichment**

From the enrichment search bar, navigate to the **Distribute Leads Round Robin** enrichment.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7b1_674e8167760826341ca574d7_673af05c9dee069eeb8b53e5_673aeffbffda0bac46559376_CleanShot%252525202024-11-18%25252520at%2525252002.17.17%252525402x.avif)

**Step 2: Add Assignment Labels**

Input the names or identifiers of your team members (e.g., Bob, Alice, Charlie) as assignment labels.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7ba_674e8167760826341ca574c9_673af05c9dee069eeb8b53e2_673aeff61deed88e2fa46f1a_CleanShot%252525202024-11-18%25252520at%2525252002.17.53%252525402x.avif)

**Step 3: Add Vales Associated with Labels**

Optionally along with assignment labels, you can add associated values, like Salesforce IDs, for reference.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7ab_674e8167760826341ca574cf_673af05c9dee069eeb8b53e8_673aeff0fcd914b83e551643_CleanShot%252525202024-11-18%25252520at%2525252002.19.24%252525402x.avif)

**Step 4: Run the Enrichment**

Execute the enrichment, which outputs:

-   **Label:** The assigned team member.
-   **Value:** Any associated identifier (e.g., Salesforce ID).
-   **Raw Counter:** The position of the label in the rotation.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7a8_674e8167760826341ca574e5_673af05c9dee069eeb8b53ee_673aefe99be92307a9a4f18f_CleanShot%252525202024-11-18%25252520at%2525252002.23.17%252525402x.avif)

### Weighted round-robin

**Step 1: Open the enrichment**

From the enrichment search bar, navigate to the **Distribute Leads Weighted Round Robin** enrichment.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7ae_674e8167760826341ca574da_673af05c9dee069eeb8b53ff_673aefdf305a0a3886898412_CleanShot%252525202024-11-18%25252520at%2525252002.27.32%252525402x.avif)

**Step 2: Select the reps table**

Choose the data table containing your representatives. This table should include information such as:

-   **Rep Names**: Names or identifiers of your team members.
-   **Weights**: Numeric values to control the proportion of leads each rep receives.
-   **Active Status (Optional)**: A column indicating whether a rep is active or unavailable.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7b7_674e8167760826341ca574cc_673af05c9dee069eeb8b53f1_673aefd885a5ce8f5a1ea2b7_CleanShot%252525202024-11-18%25252520at%2525252002.35.19%252525402x.avif)

**Step 3: Configure the enrichment**

Set up the fields in the configuration panel:

1.  **Active Reps View**: Select a filtered view of your table to include only active team members.
2.  **Rep Names Column**: Map the column containing the names of your team members.
3.  **Values Column (Optional)**: Optionally, map a column for identifiers like Salesforce IDs for future reference.
4.  **Weights Column**: Map the column containing numeric weights for lead distribution.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924ee0ecc70179da734d7b4_674e8167760826341ca574f8_673af05c9dee069eeb8b53fc_673aefd46a0fd50da1e771f8_CleanShot%252525202024-11-18%25252520at%2525252002.36.17%252525402x.avif)

**Step 4: Save and run the enrichment**

Save your configuration and run the enrichment.

**Step 5: Adjust and refine**

Make adjustments to weights or filters as needed to reflect changes in team dynamics. You can also create advanced routing configurations by adding conditions (e.g., assigning leads based on company size or region).

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