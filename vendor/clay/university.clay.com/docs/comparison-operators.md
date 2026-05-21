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

Comparison operators

# Comparison operators

Define workflow logic based on comparing numbers, text, or dates

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Comparison operators overview

A comparison operator evaluates the relationship between two values and returns a boolean value (`true` or `false`).

In Clay, these operators allow you to compare values to define conditions that can drive workflows and decision-making. For example, if a comparison operator evaluates to `true`, execute a specific action, and if `false`, take an alternative action.

The most common comparison operators are:

-   `==` (Equal to): Returns true if the values are equal.
-   `!=` (Not equal to): Returns true if the values are not equal.
-   `>` (Greater than): Returns true if the left value is greater than the right value.
-   `<` (Less than): Returns true if the left value is less than the right value.
-   `>=` (Greater than or equal to): Returns true if the left value is greater than or equal to the right value.
-   `<=` (Less than or equal to): Returns true if the left value is less than or equal to the right value.

## When do you use comparison operators?

Common applications of comparison operators in Clay workflows include:

### **Conditional Branching**

Use operators to create if/then logic in your workflows.

**Examples**

If `lead.score > 80`, mark as "Hot Lead".

If `email.domain contains "[gmail.com](<http://gmail.com>)"`, categorize as "Personal Email".

### **Data Validation**

Verify data meets specific criteria before processing.

**Examples**

Ensure `company.revenue >= 1000000` for enterprise leads.

Check if `[contact.name](<http://contact.name>) is not empty` before sending emails.

### **Data Filtering**

Use the **Filter** feature to refine your table view by applying specific rules to include or exclude records.

**Examples**

Filter where `date.created > "2024-01-01"`.

Exclude records where `status == "Inactive"`.

### **Lead Scoring**

Implement scoring rules based on multiple criteria.

**Examples**

If `employee_count >= 500 AND industry == "Technology"`, add 20 points.

If `last_activity_date <= "30 days ago"`, subtract 10 points.

## Numeric comparison operators

Numeric operators allow you to compare numerical fields (e.g., Lead Score, Revenue) to apply rules or filter data.**‍**

**Equal To (**`==`**)**‍

Filters records where the value matches exactly.

Example: Include rows where `Lead Score = 50`.**‍**

**Not Equal To (**`!=`**)**

Excludes records where the value matches exactly.

Example: Exclude leads with `Revenue == 0`.**‍**

**Greater Than (**`>`**)**

Includes records where the value is greater than specified.

Example: Show leads with `Employee Count > 500`.**‍**

**Greater or Equal To (**`>=`**)**

Includes records where the value is greater than or equal to specified.

Example: Include accounts with `Revenue >= 1,000,000`.**‍**

**Less Than (**`<`**)**

Includes records where the value is less than specified.

Example: Identify deals with `Probability < 50%`.**‍**

**Less or Equal To (**`<=`**)**

Includes records where the value is less than or equal to specified.

Example: Show tasks with `Priority <= 2`.**‍**

**Is Empty**

Filters records where the field is blank or missing.

Example: Find rows where `Lead Score is empty`.**‍**

**Is Not Empty**

Filters records where the field contains a value.

Example: Exclude rows where `Lead Score is missing`.

## String comparison operators

String operators compare text fields (e.g., Names, Email Domains, Industries) to match, include, or exclude records,**‍**

**Equal To (**`==`**)**

Checks if the text matches the specified value exactly.

**Example**: Filter leads where the `First name == "John"`.**`‍`**

**Not Equal To (**`!=`**)**

Excludes records where the text matches the specified value.

Example: Exclude companies where `Company Name != "Competitor Inc"`.**‍**

**Contains**

Filters records that include the specified substring.

Example: Find email domains where `Email contains "gmail" (e.g., john@gmail.com)`.

**Contains Any Of**

Checks if the text contains any value from a list.

Example: Filter industries where `Industry contains any of ["Tech", "Finance"]`.

**Does Not Contain**

Excludes records that contain the specified substring.

**Example:** Filter out email domains where `Email does not contain "gmail.com"`.

**Does Not Contain Any Of**

Excludes records that contain any values from a specified list.

**Example:** Filter out industries where `Industry does not contain any of ["Retail", "Healthcare"]`.

**Is Empty**

Identifies records where the field is blank.

Example: Find leads where `First Name is empty`.

**Is Not Empty**

Identifies records where the field contains any value.

Example: Include leads where `Email is not empty`.

## **Date comparison operators**

Date operators compare date fields (e.g., Created At, Last Updated) to filter or evaluate records based on specific timeframes.**‍**

**Equal To (`==`)**

Filters records with a date matching the specified value exactly.

Example**:** Find records where `Created At == "2023-01-01"`.

**Not Equal To (**!=**)**

Excludes records with a specific date.

Example: Exclude leads where `Created At != "2023-01-01"`.

**Greater Than (`>`)**

Filters records with dates after the specified value.

Example: Show leads where `Created At > "2023-01-01"`.

**Greater or Equal To (`>=`)**

Includes records created on or after the specified date.**‍**

Example: Find tasks where `Due Date >= "2023-01-01"`.

**Less Than (`<`)**

Filters records with dates before the specified value.

**Example:** Show leads where `Created At < "2023-01-01"`.

**Less or Equal To (`<=`)**

Includes records created on or before the specified date.

Example: Find leads where `Created At <= "2023-01-01"`.

**Is Empty**

Identifies records with no date value in the field.

Example: Find leads where `Created At is empty`.

**Is Not Empty**

Identifies records with a date value in the field.

Example: Include records where `Created At is empty`.

## Best Practices

-   Test edge cases thoroughly, including empty fields and boundary values
-   Include validation for missing or incorrect data
-   Provide clear error handling in formulas

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