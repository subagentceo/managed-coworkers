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

How AI is priced

# How AI is priced

This guide explains how each works, which models they apply to, and how credits are calculated.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

_Clay uses two pricing structures for AI models—fixed and variable—so you pay based on actual usage. This guide explains how each works, which models they apply to, and how credits are calculated._

## **Two pricing structures**

**Fixed AI pricing** charges a flat number of data credits per task. It applies to 80% of models in Clay, including all of Clay's own models (Neon, Helium, Argon). The cost is exact and known before you run.

**Variable AI pricing** charges data credits based on the actual cost of each run, with **0% markup**. It applies to 20% of models—the most advanced reasoning models available in Clay, typically used for sophisticated web-research tasks with multi-step reasoning—where the underlying compute cost can vary significantly from one prompt to the next. You'll see the exact cost per row in your Clay table once the run is completed. Rather than setting a flat rate high enough to cover the most expensive use cases—which would overcharge most users—variable pricing ensures each task is priced according to what it actually costs to run. This blended model of fixed and variable pricing results in customers paying less overall for AI in Clay.

You can always see which pricing structure applies when selecting a model in the product.**‍**

## **Select model pricing reference**

Provider

Model

Content Generation

Web Research

Clay

Helium

—

1

Argon

—

3

OpenAI

GPT-4o

1

variable

GPT-4.1

1

variable

GPT-5.1

2

variable

GPT-5 Mini

0.4

1

GPT-5 Nano

0.2

0.5

o3

5

variable

Anthropic

Claude 4.5 Haiku

1

variable

Claude 4.5 Sonnet

1.5

variable

Claude 4.6 Opus

7.5

variable

Gemini

2.5 Pro

3

variable

2.5 Flash

0.5

1

2.5 Flash Lite

0.5

1

_Costs are in data credits._

## **How variable pricing works**

**_Data credit formula:_** _Credit Charge = Actual LLM Cost ($) ÷ Workspace Cost Per Credit ($)_

The actual LLM cost is the cost charged by the AI provider of the model you've selected. Clay applies 0% markup on variable AI pricing for the most sophisticated reasoning models. Your cost per credit (CPC) is determined by your subscription plan.

**What happens during a run**

1.  **Withhold.** Clay withholds an estimated number of data credits upfront—based on the 75th percentile of past runs for that model—multiplied by the number of rows.
2.  **Execute.** The model processes your task.
3.  **Calculate.** Clay calculates the actual LLM cost for each row.
4.  **Reconcile.** The withheld amount is compared to the actual cost. Any surplus is refunded; any additional cost is deducted. You only pay for what was used.

Every AI prompt counts as **one action**. The variable component affects only the data credit cost of that action.

**Balance protection**

If your data credit balance reaches zero during a run, processing stops. You will never be charged beyond your available balance. Rows that haven't started will not run, and results from completed rows are retained.

## **Fixed vs. variable: a comparison**

The example below details a fixed vs variable AI model being run on 100 rows in Clay. The fixed rate model is priced at 1 credit per row. The variable rate model withholds 1 credit per row as an estimate, but after running the realized cost is only 0.8 credits.

Fixed Pricing

Variable Pricing

**Starting balance**

100 credits

100 credits

**Start of run**

Charges 100 credits

Withholds 100 credits

**End of run**

—

Refunds 20 credits

**Ending balance**

0 credits

20 credits

In this scenario, the variable model's withholding mechanism protects both the customer and Clay from unexpected cost overruns—while returning unused credits at the end.

## **Using your own API keys**

You can always use your own API keys instead of Clay data credits. That said, many customers prefer Clay's built-in AI for two reasons:

-   **Model selection.** Clay gives you access to a broader set of models than any single provider.
-   **Speed.** Actual usage data shows that AI tasks run through Clay's APIs run up to 2× faster than tasks run through customers' own API keys because Clay has negotiated significantly higher rate limits than most customers have independently.

## **FAQs**

**How do I know if a model uses fixed or variable pricing?**

The product displays the pricing type when you select a model. Fixed-price models show a flat credit cost (e.g., `3/row`), while variable-price models show an estimate (e.g., ~2) with a note that the final charge depends on actual usage.

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/69b17b4dae3ccfe64cf05df8_Screenshot%202026-03-11%20at%2010.12.18%E2%80%AFAM.png)

**Will I always know what a task will cost before I run it?**

For fixed-price models, yes—the cost shown is exact. For variable-price models, you'll see an estimate upfront. The final cost may differ, but credits are withheld before the run starts so there are no surprises to your balance.

**Could a variable-priced task cost significantly more than the estimate?**

In most cases, the final cost will be at or below the estimate. Complex, multi-step tasks can cost more, but these are a small minority of runs. Most customers pay less under variable pricing than they would under a flat rate for the same model.

Customers who are configuring complex, multi-step web research tasks may wish to run their prompt on 10 or 50 rows so they are able to see the credit charge for each row before running the prompt across their full table.

**What happens if I run out of data credits mid-run?**

Processing stops when your balance reaches zero. You won't be charged beyond your available credits. Rows that haven't started will not run; rows that completed successfully retain their results.

**Why not just use fixed pricing for everything?**

Advanced reasoning models have high cost variability from task to task. A fixed rate would need to be high enough to cover the most expensive use cases—overcharging the majority of users on simpler work. Variable pricing ensures every task is priced according to its actual cost.

**Does Clay charge a markup on variable AI pricing?**

No. Clay charges 0% markup on variable AI pricing for reasoning models. You pay exactly what Clay pays the AI provider, making this the most fair and customer-friendly pricing possible.

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