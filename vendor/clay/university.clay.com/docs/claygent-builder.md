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

Claygent builder

# Claygent builder

Build smarter agents faster

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Claygent builder is the centralized hub for building, testing, and deploying Claygents — Clay's AI agents designed for judgment-based GTM work like account research, lead scoring, outbound copywriting, and persona classification.

With Claygent builder, you can build agents conversationally using Sculptor, test for free on your production data, add business context and documents directly to your prompts, and deploy agents across all your workflows from one place.

For example, you could create:

-   **Lead scoring agent**: Evaluates prospects against your ICP and outputs a score (1-100) with rationale.
-   **Outbound email agent**: Writes personalized cold emails using your ICP definition, tone guidelines, and enriched data.
-   **Account research agent**: Summarizes what a company is doing right now, surfaces recent news, funding events, and hiring signals.
-   **Persona classification agent**: Categorizes contacts by tier, buying role, or persona type.

## Getting to Claygent builder

Click `Agents` in the left-hand navigation bar.

Three ways to start building:

-   **From scratch** — blank canvas with full text editor and Sculptor available on the side.
-   **With Sculptor** — describe what you want in plain language and Sculptor drafts the full agent for you (fastest path).
-   **From a template** — pre-built starting points for prospecting, account scoring, contact scoring, and copywriting.

### Creating a Claygent from an existing table

If you've already built a Claygent prompt in a table that works well, you can save it as a reusable agent:

1.  Click on your `Use AI` column name.
2.  Select `Edit column`.
3.  Click `Create Claygent` in the top right.
4.  Your prompt, variables, and test cases transfer to Claygent Builder.
5.  Now you can deploy it across other tables.

This is useful when you've refined a prompt in one table and want to reuse it elsewhere without starting from scratch.

## Building an agent with Sculptor

Sculptor is Clay's conversational agent builder. Describe what you want your agent to do in natural language, and Sculptor generates the prompt, variables, output format, and test cases.

**Example prompt for Sculptor:**

_"Build an agent that scores a lead against our ICP and outputs a score from 1 to 100 with a short rationale explaining the score."_

Sculptor will:

1.  Define the prompt logic.
2.  Set up variables (company name, contact title, industry, etc.).
3.  Format the output (score plus reasoning).
4.  Create test cases so you can see it in action.

### Iterating with Sculptor

You can refine your agent by telling Sculptor what to adjust:

_"Adjust the scoring so company fit is weighted at 60% and persona fit at 40%. Also break out company size as its own factor."_

Sculptor rewrites the prompt. Run the test again to see the difference. Every change is saved automatically in version history.

## Configuring your agent

### Business context

Your company description, ICP, and buyer personas auto-populate from workspace settings. Your Claygent pulls from this automatically to write on-brand output.

If you haven't filled yours in yet, go to `Settings`, enter your domain, and Clay will research for you.

### Document uploads

Attach tone guides, messaging docs, PDFs, or CSVs directly into your agent. For copywriting agents, this ensures the Claygent writes in your voice, not a generic AI voice.

### Web search

Enable web search when your agent needs live research (recent company news, hiring signals, etc.). Disable it when working from data already in your table to keep runs faster and more consistent.

### Find contacts and jobs tool

Give your Claygent access to find people and jobs data directly. This enables prospecting workflows like "find the best person who would manage growth at a company" — where the right title varies by company size.

### Model selection

Swap between different AI models (Claude, GPT-4o, etc.) to test output quality without touching the prompt.

## Testing before you deploy

**Note:** You can have up to 10 test cases at a time for free (you can delete and add new test cases to keep testing). Test runs don't cost credits.

Run test cases to see your Claygent stream its reasoning live. You can:

-   Import test data from existing table rows.
-   Generate test inputs with AI.
-   Save test cases as a reusable suite.
-   Compare outputs across different versions.

### Testing different models

Compare outputs across different AI models without changing your prompt. Switch models in the configuration panel and run tests side-by-side to find the best performance for your use case.

This is especially useful when you want to balance output quality against cost and speed.

## Deploying your agent

Once you're happy with the output:

1.  Go to any table and add an AI column.
2.  Under Claygent options, select `Saved Claygents`.
3.  Select the agent you just built.
4.  Variables automatically map to your table columns.
5.  Save and run.

You can also deploy directly from Claygent builder by clicking `Add to table`.

## Centralized management

From the Claygent builder home, you can see every table where each agent is running.

When your ICP changes or you need to adjust agent logic:

1.  Update the agent once in Claygent builder.
2.  Changes propagate everywhere it's deployed.
3.  No need to find and update each column individually.

This is the difference between managing duplicate prompts across multiple tables versus having a single source of truth.

## Version history

Every change you make is saved automatically. You can:

-   View all previous versions.
-   See what changed between versions.
-   Roll back to any previous version.

Access version history from the Claygent builder editor.

## FAQs

### What kinds of work are Claygents best for?

Claygents handle judgment-based, nondeterministic work in your GTM stack — work that requires reasoning, not just lookups. Main use cases:

-   **Account and lead research** — summarize what a company is doing, recent news, hiring signals.
-   **Lead scoring and contact scoring** — evaluate prospects against your ICP with weighted factors.
-   **Account scoring** — same idea at the company level.
-   **Outbound copywriting** — write personalized emails using your ICP and enriched data.
-   **Persona classification** — categorize contacts by tier, role, or buying persona.

### Who can create or edit agents?

Agent access follows your workspace permissions. Editors can create and modify agents, while viewers can reference approved agents in tables.

### Does testing cost credits?

No. You can have up to 10 test cases per Claygent at a time for free. You can delete and add new test inputs to keep testing. Once you deploy and run your agent in a table, standard runs follow your normal billing.

### Can I test different models without changing my prompt?

Yes. Switch models in the configuration panel and rerun tests to compare output quality across different AI models.

### What happens if I update an agent while it's running in a table?

In-flight runs finish on the version that started them. New runs pick up the latest version automatically.

### Can I still edit prompts directly in tables?

Yes, but centralizing in Claygent builder gives you version control, free testing, and the ability to update once and deploy everywhere. It's the better choice for agents you'll reuse or iterate on.

## Tips for success

**Importing test cases**: Instead of manually creating test data, import real rows from your tables. Click `Import from table` in the test panel to pull actual data and see how your agent performs on real-world inputs.

**Variable mapping**: When deploying a Claygent to a new table with different column names, Builder will auto-suggest mappings. Review these carefully to ensure the correct data flows through.

**Start simple**: Build your agent with a basic prompt first, test it, then layer in complexity. It's easier to debug and refine when you're working incrementally.

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