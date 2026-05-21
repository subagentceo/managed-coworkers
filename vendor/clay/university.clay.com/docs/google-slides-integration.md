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

Export

](/docs-topics/export)

/

Google Slides integration

# Google Slides integration

Create customized presentations at scale using your table data.

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Clay's Google Slides integration lets you create customized presentations at scale using your table data. Build one smart template and generate hundreds of personalized decks in minutes—perfect for sales materials, QBRs, client updates, and more.

## **How it works**

The Google Slides integration uses a template-based approach to create personalized presentations:

1.  **Create a template** in Google Slides with variables (placeholders) in double curly brackets like `{{company_name}}` or `{{revenue}}`
2.  **Connect the integration** in Clay and select your template
3.  **Map your data** from Clay table columns to template variables
4.  **Generate presentations** automatically for each row in your table

Each presentation is saved as a new file in your Google Drive, dynamically filled with data from your Clay table.

## **Setting up the integration**

### **Connect your Google account**

1.  In a Clay table, click `Add enrichment` and search for `Google Slides`. Under `Integrations`, select `Create presentation`.
2.  In the modal, click `Select Google Slides account`:
    -   If you haven't connected Google Slides yet, click `+ Add account` and complete the authentication process.
    -   When adding your account, select your template presentation and click `Select files and folders` that Clay can access.

 **Tip:** Make sure to grant Clay access to both the template file and the folder where you want new presentations saved.

### **Create your template**

In Google Slides, create a presentation to use as your template. Add variables anywhere in your slides using double curly brackets:

**Examples:**

-   `{{company_name}}` → Company name from your table
-   `{{first_name}}` → Contact's first name
-   `{{custom_pitch}}` → Personalized pitch text
-   `{{company_logo-image}}` → Company logo (see image support below)

Variables can be placed in text boxes, headers, bullet points, or anywhere text appears in your slides.

### **Configure the enrichment**

**Inputs:**

**Template presentation**

Select the Google Slides file you want to use as your template.

**Google Drive folder** (Optional)

Choose where new presentations will be saved. If left empty, presentations are saved to your Google Drive root folder.

**Placeholders**

Map Clay table columns to the variables in your template. The integration automatically detects all variables from your template and creates input fields for each one.

### **Image support**

Google Slides supports dynamic images! Add images to your presentations by using variables that end in `-image`:

**Example:** `{{company_logo-image}}`

**Requirements:**

-   Image URLs must be publicly accessible
-   Images inherit the size of the text box containing the tag
-   Supported formats: JPG, PNG, GIF

**Note:** The Google Slides integration supports images! If you end your tag in `-image` (e.g., `company-logo-image`), the integration will replace your tag with the image. Image URLs must be publicly accessible, and images will take the size of the textbox that contains the tag.

### **Run settings**

-   **Auto-update**
-   **Only run if:** The enrichment will only run if conditions are met. ([Learn more about conditional formulas here!](https://www.clay.com/university/lesson/ai-formulas-conditional-runs-clay-101))

## **FAQs**

### **Can I use the same template for multiple tables?**

Yes! You can reuse templates across different tables. Just make sure the variable names in your template match the column names you want to map.

### **What happens if a variable has no value?**

If a Clay table cell is empty, the variable in the presentation will remain as the placeholder text (e.g., `{{company_name}}`). Use conditional formulas in the `Only run if` setting to prevent generating presentations with missing data.

### **Can I edit presentations after they're generated?**

Yes! Generated presentations are standard Google Slides files saved to your Drive. You can edit them manually after creation.

### **How many presentations can I generate at once?**

You can generate presentations for every row in your Clay table. For tables with thousands of rows, consider using filters or the `Only run if` setting to control which rows generate presentations.

### **Do images need to be hosted somewhere specific?**

Images must be publicly accessible via URL. You can use image URLs from company websites, uploaded files with public links, or image hosting services. Private or authentication-required URLs won't work.

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