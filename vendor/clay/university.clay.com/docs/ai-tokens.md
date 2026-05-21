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

Gen AI

](/docs-topics/gen-ai)

/

AI Tokens

# AI Tokens

Understand AI Tokens

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

# Understanding AI Tokens

In the world of Large Language Models (LLMs), **tokens** are the fundamental building blocks for processing and understanding text.

Think of tokens as small chunks, each typically representing 3-4 characters. A 100-word passage generally breaks down into approximately **125–135 tokens**.

When working with AI models, you'll encounter two types:

-   **Input tokens**: The prompts you send to the AI.
-   **Output tokens**: The AI’s generated response.

**Note:** In Clay, you can control usage by setting a maximum output length in your model configuration.

## What Is TPM?

**TPM (Tokens Per Minute)** refers to how many tokens a model can process within one minute—across both input and output. Different features and providers have different TPM requirements, often tied to your API tier.

## API tier requirements

### ChatGPT Generate Text

-   **Requirement**: 30,000 TPM
-   **Access**: Works with **any paid tier** as long as the API key has access to GPT-4 or GPT-4 Turbo
-   _(Note: Free-tier or unpaid OpenAI keys may not have access)_

### ClayGent Web Research

-   **OpenAI**: Requires **Tier 2 or higher** (≥450,000 TPM)
-   **Anthropic**: Requires **Tier 4 or higher** (≥400,000 TPM)
-   **Gemini**:
    -   Requires **Tier 2**, but only works with the **Gemini 2.0 Flash model**
    -   **Gemini 1.5 models** may require additional access through **Vertex AI** or custom tiers

## Upgrade API tier

If you need higher token limits or access to advanced features, you'll need to upgrade your API tier with your chosen provider.

Here's how to find more information on upgrading, with each major provider.

-   [OpenAI](https://platform.openai.com/docs/guides/rate-limits/usage-tiers#usage-tiers)
-   [Anthropic](https://docs.anthropic.com/en/api/rate-limits)
-   [Gemini](https://support.google.com/gemini/answer/14517446?hl=en-MY)

## Monitoring API Usage

Each platform provides tools to track your usage:

-   [OpenAI](https://platform.openai.com/account/usage)
-   [Anthropic](https://docs.anthropic.com/en/api/rate-limits)
-   [Gemini](https://cloud.google.com/gemini/docs/monitor-gemini)

## AI pricing in Clay

When using AI features in Clay, you'll consume both **Actions** and **Data Credits**:

-   **Actions**: Each AI enrichment consumes 1 Action (platform orchestration work)
-   **Data Credits**: Cost varies by model—Clay offers both fixed and variable AI pricing

Clay uses two pricing structures for AI models:

-   **Fixed pricing**: A flat number of data credits per task (applies to most models, including Clay's own models like Neon, Helium, and Argon)
-   **Variable pricing**: Data credits based on actual token usage plus a 20% premium (applies to advanced reasoning models used for sophisticated web research)

You can control AI spending by:

-   Setting maximum output length in your model configuration
-   Setting custom budgets for each run
-   Choosing more cost-effective models for simpler tasks
-   Selecting fixed-price models when cost predictability is important

To learn more about how AI is priced in Clay, see our guide on [how AI is priced](https://www.clay.com/university/guide/how-ai-is-priced).

## Clay credits vs. personal API keys

When you're using Clay's AI tools, you have two options for managing your API access: using [Clay credits](https://www.clay.com/university/guide/credits) or connecting your own personal API keys.

Each option has different benefits and considerations in terms of cost, convenience, and management requirements. Let's explore these options:

### Clay credits

-   Clay manages rate limits, tier access, and scaling for you
-   No need to worry about upgrading API tiers manually
-   Pricing varies by model (fixed or variable depending on which model you select)
-   Cost visibility in Clay UI shows data credit consumption

### Personal API Keys

-   Can reduce data credit costs (you only pay Actions, not Data Credits)
-   Requires **meeting provider-specific tier requirements**
-   You manage your own API billing directly with the provider

‍

**Note:** When using a personal API key, price breakdowns won't appear in the Clay UI. You'll need to monitor your usage and upgrade tiers manually.

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