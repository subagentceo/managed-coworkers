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

HTTP API with JWT authentication

# HTTP API with JWT authentication

Use HTTP API connections authenticated securely with JWT tokens.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

The **HTTP API with JWT Authentication** action connects Clay to APIs that issue short-lived JWT tokens as part of their authentication flow. Before making API calls, Clay authenticates to your provider's token endpoint using stored credentials, then automatically injects the resulting JWT into each request's authorization header.

**Note:** For general information on HTTP methods, endpoint setup, request bodies, and response handling, see the [HTTP API guide](https://university.clay.com/docs/http-api-integration-overview).

## What is JWT authentication?

JWT (JSON Web Token) authentication is a two-step process:

1.  **Token fetch** — Clay calls your API's token endpoint (e.g., `https://api.example.com/oauth/token`) using the username and password stored in your JWT account, and receives a JWT in response.
2.  **Authenticated request** — Clay attaches the JWT as a header (e.g., `Authorization: Bearer <token>`) on every API call made by the enrichment.

The token is automatically refreshed approximately every 55 minutes, so you don't need to manage token expiry manually.

## How JWT authentication differs from standard HTTP API

Use this table to decide which action to use:

HTTP API

HTTP API with JWT Authentication

**Auth flow**

Direct — pre-stored headers sent with every request

Two-step — token fetch, then API call

**Account required?**

Optional

Required

**What the account stores**

Header key-value pairs (e.g., API keys, permanent bearer tokens)

Username, password, and token endpoint URL

**Token expiry handled?**

N/A

Auto-refreshed every ~55 minutes

‍

Use **standard HTTP API** when the API accepts static credentials (an API key, a permanent bearer token). Use **HTTP API with JWT Authentication** when the API issues a dynamically generated JWT — common in enterprise APIs like Gong and [Snov.io](http://Snov.io).

## Setting up your JWT account

Before adding the enrichment, you'll need to connect a JWT account to store your credentials at the workspace level. This account can be reused across any enrichment column that calls the same API.

**Note:** Have your API provider's authentication documentation open before completing these steps. You'll need the token endpoint URL and the correct format for credentials (some APIs use `client_id` and `client_secret` rather than traditional username/password).

‍

1.  Navigate to `Settings` → `Connections`.
2.  Search for and select `HTTP API JWT Auth`.
3.  Click `+ Add account`.
4.  Enter the following details:
    -   `Username` — your API username or client ID.
    -   `Password` — your API password or client secret.
    -   `JWT Token Endpoint` — the URL Clay will call to obtain the JWT (e.g., `https://api.example.com/oauth/token`).
5.  Give the account a recognizable name (e.g., `Gong JWT`) and click `Save`.

## Enriching data with HTTP API with JWT Authentication

1.  Open your Clay table.
2.  Click `Add enrichment`.
3.  Search for and select `HTTP API with JWT Authentication`.
4.  In the `Account` dropdown, select your saved JWT account.
    -   If you haven't connected one yet, click `+ Add account` and complete the steps above.
5.  Configure the JWT-specific inputs (see below), then fill in the standard HTTP request fields for your API call.

### `Action` HTTP API with JWT Authentication

Sends HTTP requests authenticated with a dynamically fetched JWT token to any API endpoint.

**JWT auth fields — Required:**

-   `Location of JWT token in auth response` — The key name (using dot-notation) that identifies where the JWT appears in the token endpoint's JSON response. For example: `access_token`, `jwt`, or `data.token`. Check your API's documentation or test the token endpoint directly to confirm the exact path.

**JWT auth fields — Optional:**

-   `Token type` — The prefix added before the token value in the authorization header. Defaults to `Bearer`. Change this only if the API expects a different token type prefix (e.g., `Token`).
-   `Auth header name` — The name of the HTTP header Clay sets on each API request. Defaults to `Authorization`. Change this only if the API expects a non-standard header name (e.g., `X-Auth-Token`).

**Standard HTTP request fields:**

For all remaining request configuration — HTTP method, endpoint URL, query parameters, request body, headers, response filtering, retry settings, and redirect handling — see the [**HTTP API guide**](https://university.clay.com/docs/http-api-integration-overview). All options work identically between the two actions.

### Run settings

-   `Auto-update` — Re-runs the enrichment automatically when a referenced column value changes. Enable this if you're mapping dynamic values (such as a record ID) into the endpoint URL or request body.
-   `Only run if` — Add a conditional formula to skip rows that don't meet a specified condition. See [**conditional formulas**](https://university.clay.com/docs/formulas).

## FAQs

### How is this different from standard HTTP API?

Standard HTTP API attaches static, pre-stored headers (like an API key or a permanent bearer token) directly to each request. HTTP API with JWT Authentication first calls your API's token endpoint to obtain a fresh JWT, then uses that JWT for requests. This two-step flow is required by APIs that use short-lived tokens as part of their security model.

### When does my JWT token refresh?

Clay automatically refreshes the token approximately every 55 minutes. No manual action is needed when a token expires.

### What if the token is nested inside the response JSON?

Use dot-notation in the `Location of JWT token in auth response` field. For example, if the token endpoint returns `{"data": {"access_token": "eyJ..."}}`, enter `data.access_token`.

### Do I need a separate JWT account for each API I connect to?

Yes — each API has its own token endpoint and credentials, so a separate account is needed per API. Once created, however, an account can be reused across multiple enrichment columns within your workspace without re-entering credentials.

### What if I update my JWT account credentials?

Editing a saved JWT account will affect every enrichment column across your workspace that uses it. If you update the token endpoint or credentials, rerun any affected columns to confirm they're still returning results.

### What happens if I enter the wrong token location?

The enrichment will fail with the message `Please fill out your auth fields.` If you see this error, double-check the `Location of JWT token in auth response` field against the actual JSON structure returned by your token endpoint.

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