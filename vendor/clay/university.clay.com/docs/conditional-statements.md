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

Conditional statements

# Conditional statements

Control the logic of your workflow

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Conditional statements overview

Conditional statements in Clay help you control the flow of logic of your workflow, allowing you to perform different actions based on conditions. For example, if `Company Size > 100`, the output will be `true`.

In Clay, you can use conditional statements in:

-   **Conditional runs:** Run a certain enrichment based on certain criteria.
-   **AI formulas**: Transform data, like scoring leads or qualifying opportunities.
-   **Conditional Snippets**: Embed conditional logic to send outbound messages based on contact criteria.
-   **Waterfalls**: Maximizing coverage with multiple providers.

## Conditional statement structure

Conditional statements have the following structure:

1.  **IF (Condition)** – Executes a command when the condition is true.
2.  **ELSE IF (secondCondition)** – Executes a command if the second condition is true (optional).
3.  **ELSE** – Executes a command when none of the above conditions are true.

### Walkthrough

`IF Condition`

**(command to execute if condition is true)**

`ELSE IF secondCondition`

**(command to execute if secondCondition is true)**

`ELSE`

**(command to execute if no conditions are true)**

## Best practices

### **Testing**

Prevent unexpected errors with edge cases or missing data.

**Examples**

-   **Empty fields**: `IF({{company_size}} > 100) THEN "Qualified" ELSE "Not Qualified"` , Ensure blank company\_size defaults to "Not Qualified".
-   **Boundary values**: Test company\_size = 50 in `IF({{company_size}} >= 50) THEN "Medium" ELSE "Small"` to avoid misclassification.
-   **Unexpected formats**: Handle `company_size = "unknown"` by defaulting to "Not Qualified".

### **Error handling**

Handle missing or invalid data properly.

**Examples**:

-   **Missing fields**: In `IF({{company_size}} AND {{location}}) THEN "Valid" ELSE "Invalid"`, return "Invalid" if fields are missing.
-   **Clear errors**: Use `IF({{email}} == "") THEN "Error: Missing Email" ELSE "Valid Email"` to flag missing inputs.

### **Parentheses for clarity**

Use parentheses to group conditions clearly, especially when combining multiple logical operators (AND, OR, NOT).

**Examples**:

-   **Unclear**: `{{size}} > 100 AND {{location}} == "US" OR {{revenue}} > 1M` could qualify the wrong leads.
-   **Clear**: `(size > 100 AND location == "US") OR revenue > 1M` ensures correct grouping.

**Use cases:** Lead qualification, CRM updates, or email campaigns where errors could disqualify valid leads or waste resources.

## Example conditional statements within Clay

### Example #1: Basic email validation

Validate email formats to flag personal email addresses.

#### Formula

IF (person.email contains @gmail.com OR @yahoo.com)return "Invalid email format"

ELSEreturn "Valid email format"

#### **Test cases**

-   **Input:** [john.doe@gmail.com](mailto:john.doe@gmail.com)**Result:** Invalid email format
-   **Input:** [john.doe@yahoo.com](mailto:john.doe@yahoo.com)**Result:** Invalid email format
-   **Input:** [john.doe@company.com](mailto:john.doe@company.com)**Result:** Valid email format

### Example #2: Message snippets based on company size

Serve different message snippets based on the company’s size.

#### Formula

IF (company.size > 500)

return enterprise\_message\_snippet

ELSE IF (company.size > 50)

return midmarket\_message\_snippet

ELSE

return small\_message\_snippet

#### **Test cases**

-   **Input:** company.size = 750**Result:** enterprise\_message\_snippet
-   **Input:** company.size = 100**Result:** midmarket\_message\_snippet
-   **Input:** company.size = 25**Result:** small\_message\_snippet
-   **Input:** company.size = 0**Result:** small\_message\_snippetNote: Since this input doesn't satisfy any of the conditions, the final else statement is returned, but we should add some input validation here.

### **Example #3: Regional discounts based on geography**

Apply different discount rates based on the region.

#### **Formula**

IF (region == "US")

return "10% Discount"

ELSE IF (region == "EMEA")

return "15% Discount"

ELSE

return "No Discount Available”

#### Test cases

-   **Input:** region = "US"**Result:** 10% Discount
-   **Input:** region = "EMEA"**Result:** 15% Discount
-   **Input:** region = "APAC"**Result:** No Discount Available

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