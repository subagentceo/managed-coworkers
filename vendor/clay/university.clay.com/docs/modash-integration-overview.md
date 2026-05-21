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

Find

](/docs-topics/find)

/

Modash integration

# Modash integration

Discover and analyze social media creators.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Modash provides real-time creator data and analytics across Instagram, TikTok, and YouTube. With this integration, you can discover influencers, analyze their audience and content performance, and gather contact information — all within Clay.

## Creating a table with Modash

1.  In a workbook, click `+ Add` at the bottom.
2.  Search for `Modash` and select from the results.
3.  In the modal, you will be asked to `Select Modash account`.
    -   If you haven't already connected your Modash account, click `+ Add account` and go through authentication. Otherwise, use the Clay-provided key.

### `Source` Find Instagram creators (keyword search)

Find Instagram creators by keyword.

**Inputs**

-   **Search query:** Keyword or phrase (e.g., "vegan food NYC", "fitness coach").
-   **Number of results:** How many creators to return.

### `Source` Find Instagram creators (AI search)

Find Instagram creators using natural language descriptions of the content, aesthetic, or audience you're looking for.

**Inputs**

-   **Natural language query:** Describe your ideal creator (e.g., "woman with curly hair lifting weights").
-   **Filters (Optional):** Follower count range, location, gender, engagement rate, account type, language, has email, last posted within X days.
-   **Number of results:** Max 1,500 per search.

**Limitation:** Instagram AI Search only supports creators with **\>10,000 followers**.

**Note:** Profiles are refreshed on a ~4-week cadence. Follower counts and engagement rates may lag real-time by up to 4 weeks.

### `Source` Find TikTok creators (keyword search)

Find TikTok creators by keyword.

**Inputs**

-   **Search query:** Keyword or phrase (e.g., "makeup tutorial", "coding tips").
-   **Number of results:** How many creators to return.

### `Source` Find TikTok creators (AI search)

Find TikTok creators using natural language descriptions.

**Inputs**

-   **Natural language query:** Describe your ideal creator (max 1,024 characters or 64 words).
-   **Filters (Optional):** Same as Instagram AI Search (minus content type, since TikTok is video-only).
-   **Number of results:** Max 1,500 per search.

## Enriching data with Modash

1.  While in a Clay table, click `Add enrichment` and search for `Modash`.
2.  Under `Integrations`, select one of the Modash options.
3.  In the modal, you will be asked to `Select Modash account`.
    -   If you have your own account, click `+ Add account` and go through authentication. Otherwise, use the Clay-provided key.

### `Action` Get Instagram user info

Enrich an Instagram profile with follower count, engagement rate, bio, recent posts, and audience demographics.

**Inputs**

-   **Instagram handle or profile URL:** e.g., `@username` or `https://instagram.com/username`

### `Action` Get Instagram user feed

Pull the most recent posts from an Instagram profile, including captions, likes, comments, and media URLs.

**Inputs**

-   **Instagram handle or profile URL**

### `Action` Get Instagram media info

Get detailed stats for a specific Instagram post or reel, including likes, comments, views, and engagement rate.

**Inputs**

-   **Instagram post URL or shortcode:** e.g., `https://www.instagram.com/p/ABC123/` or `ABC123`

### `Action` Get Instagram media comments

Extract all comments from an Instagram post or reel.

**Inputs**

-   **Instagram post URL or shortcode**

### `Action` Get TikTok user info

Enrich a TikTok profile with follower count, video count, likes, bio, and audience demographics.

**Inputs**

-   **TikTok handle, profile URL, or user ID**

### `Action` Get TikTok media info

Get detailed stats for a specific TikTok video, including views, likes, comments, shares, and play duration.

**Inputs**

-   **TikTok video URL or video ID**

### `Action` Get TikTok comments

Extract all comments from a TikTok video.

**Inputs**

-   **TikTok video URL or video ID**

### `Action` Get YouTube channel info

Enrich a YouTube channel with subscriber count, video count, total views, and recent uploads.

**Inputs**

-   **YouTube channel URL or channel ID**

### `Action` Get YouTube uploaded videos

Pull the most recent videos from a YouTube channel, including titles, views, likes, and publish dates.

**Inputs**

-   **YouTube channel URL or channel ID**

### `Action` Get YouTube video info

Get detailed stats for a specific YouTube video, including views, likes, comments, and engagement rate.

**Inputs**

-   **YouTube video URL or video ID**

### `Action` Get YouTube video subtitles

Extract the full transcript/subtitles from a YouTube video.

**Inputs**

-   **YouTube video URL or video ID**

### Run settings

-   **Auto-update:** Re-run enrichment when source data changes.
-   **Only run if:** The enrichment will only run if conditions are met. [Learn more about conditional formulas](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101).

## Best practices

### For AI Search

-   **Write descriptive queries:** Instead of "fitness", try "female fitness coaches who post workout routines for beginners".
-   **Use filters strategically:** Narrow by follower count, location, or engagement rate to get more relevant results.
-   **Keep pageSize constant:** When requesting large result sets (>50), Modash paginates automatically. Don't change the page size mid-search or you may get duplicate/missed results.

### For enrichments

-   **Handle URLs flexibly:** Clay automatically parses handles from full URLs, so you can pass `https://instagram.com/username` instead of just `@username`.
-   **Use conditional runs:** Save credits by only enriching profiles that meet certain criteria (e.g., follower count > 10K).
-   **Combine with AI formulas:** After pulling comments or transcripts, use Clay's AI formulas to analyze sentiment, extract themes, or summarize content.

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