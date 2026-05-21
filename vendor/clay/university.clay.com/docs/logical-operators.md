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

Logical operators

# Logical operators

Automate decisions with AND, OR, and NOT expressions

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

## Logical operators overview

A logical operator evaluates one or more conditions and returns a boolean value (`true` or `false`). In Clay, these operators let you combine and modify conditions to build complex logical expressions.

The three main types of logical operators are:

-   `AND` (`&&`): Returns true only if all conditions are true
-   `OR` (`||`): Returns true if at least one condition is true
-   `NOT` (`!`): Reverses a boolean value

## When do you use logical operators?

Logical operators are commonly used in several contexts within Clay.

**AI Formula Columns:** Create complex conditions for data transformation with multiple criteria.

**Conditional Runs:** Control when enrichments should execute by definingspecific trigger conditions.

**SOQL Queries:** Filter Salesforce objects based on multiple criteria.

## Best practices

When using logical operators, follow these guidelines:

-   Use parentheses to clearly group conditions and control evaluation order
-   Test edge cases to ensure correct behavior

## **`AND` statements**

### **Syntax**

`condition1 AND condition2`

### **Overview**

-   Returns true if **both conditions** are true.
-   Returns false if either condition is false.
-   In formulas, represented as `&&` .

### **Example cases**

**Example 1:** `true AND true` → `true`

**Example 2:** `true AND false` → `false`

**Example 3:** `false AND false` → `false`

### **Use case example**

**Scenario**: _You want to qualify a lead if they have more than 500 employees_ **_and_** _are located in the US._

**Formula:** `{{employee_count}} > 500 && {{location}} == "US"`

**Logic:** Returns true if the lead has more than 500 employees **and** is in the US.

## **`OR` statements**

### **Syntax**

`condition1 OR condition2`

### **Overview**

Returns true if **at least one condition** is true.

Returns false only if **both conditions** are false.

In formulas, represented as `||` .

### **Example cases**

**Example 1:** `true OR true` → `true`

**Example 2:** `true OR false` → `true`

**Example 3:** `false OR false` → `false`

### **Use case example**

**Scenario**: _You want to qualify a lead if they have more than 500 employees_ **_or_** _are located in the US._

**Formula:** `{{employee_count}} > 500 || {{location}} == "US"`

**Logic:** Returns true if the lead meets **either** condition.

## **`NOT` Statements**

### **Syntax**

`NOT condition1`

### **Overview**

Returns the **opposite** of the condition:

-   true becomes false.
-   false becomes true.

Often used to **exclude specific conditions**.

In formulas, represented as `!` .

### **Example cases**

**Example 1:** `NOT true` → `false`

**Example 2:** `NOT false` → `true`

### **Use Case Example**

**Scenario**: _You want to exclude leads marked as competitors from being qualified._

**Formula:** `!{{competitor}}`

**Logic:** Returns true if the lead is **not** a competitor.

## **Combining `AND`, `OR`, and `NOT`**

### **Syntax**

(condition1 AND condition2) OR NOT condition3

### **Use case example**

**Scenario**: You want to qualify a lead if either of the following is true:

1.  The lead has more than 500 employees **and** is based in the US.
2.  The lead is **not** a competitor.\*

**Formula:** `({{employee_count}} > 500 AND {{location}} == "US") OR !{{competitor}}`

**Logic Breakdown:**

-   **Part 1**: {{employee\_count}} > 500 && {{location}} == "US" → Returns true if the lead has more than 500 employees **and** is located in the US.
-   **Part 2**: !{{competitor}} → Returns true if the lead is **not** marked as a competitor.
-   The entire formula returns true if **either** part is true.

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