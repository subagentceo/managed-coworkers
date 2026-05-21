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

\[Data test\] Mobile phone providers by region

# \[Data test\] Mobile phone providers by region

Mobile phone providers by region

![](https://cdn.prod.website-files.com/687563213dfbc91a782122b1/691d4e5421aa15e276c6ab37_Web%20Scraping.avif)

Overview

Sales teams often lose valuable time calling inaccurate mobile phone numbers from contact databases. It's frustrating to call an inaccurate phone number or the wrong person picks up.

In our endless quest to help you save time (and Clay credits!), we partnered with TitanX to test over 9,806 mobile numbers to find the best combination of accuracy and cost across North America, Europe, and APAC. Our data test focused on three key areas:

1.  **Accuracy:** When you dial a number, how likely are you to actually reach your intended recipient?
2.  **Coverage:** Which provider produced the most mobile numbers for prospects, both in sheer volume and across different regions? **‍**
3.  **Budget:** Which provider offers the best price per mobile number, and saves your sales team the most time in the long run?  
    

We recommend using [mobile phone data waterfalls](https://www.clay.com/waterfall-enrichment) to get best combination price and coverage. However, if you’re choosing just one provider, we’ll guide you to the best fit.

## **Our data test methodology**

We started by amassing over 6,000 B2B contacts across North America (NAMER), Europe, the Middle East, and Africa (EMEA), and the Asia Pacific (APAC). We then [enriched](https://www.clay.com/blog/anthropic-case-study) these contacts by running them through the following B2B data providers:

-   Forager
-   Nimbler
-   Wiza
-   Datagma
-   Leadmagic
-   RocketReach
-   People Data Labs
-   ContactOut
-   Findymail
-   Prospeo

After enriching our contact data, we received 9,806 mobile numbers. Seeing as different providers may offer different phone numbers for a single contact, we then sifted through this list to extract only unique combinations of mobile numbers and full names.

From there, we measured each provider’s coverage based on the quantity of numbers they delivered for each region.

💡**Pro tip:** _Data coverage can vary not only from region to region but also from industry to industry. While we didn't evaluate coverage based on industry in this particular report, this is still something you should take into account as you search for providers that will help you to connect with prospects that meet your ideal customer profile (ICP)._

#### **Testing & Scoring Phone Numbers**

We partnered with [TitanX](https://www.titanx.io/?utm_source=clay&utm_medium=blog&utm_campaign=scoring) (formerly Phone Ready Leads) to implement their proprietary scoring algorithm for numbers across the NAMER and EMEA regions. For scoring numbers in the APAC region, we partnered with an offshore team who verified calls using the comprehensive method outlined below.

#### NAMER & EMEA

TitanX kicked off our evaluation by implementing their proprietary Titan Scoring algorithm, which includes both manual cold calling as well as an evaluation of 11 other data signals over the course of four days. Think of this algorithm as a form of intent data [lead scoring](https://www.clay.com/blog/lead-scoring-in-clay); it not only verifies mobile numbers, but also offers one of the following weighted scores for each number:

-   **P1 mobile numbers** are not only verified, but they also lead to contacts that have a high propensity for picking up the phone. Due to these two factors, P1 numbers are likely to connect you with your intended contact at least 25% of the time.
-   **P2 mobile numbers** are also verified, but they lead to contacts with a lower propensity to answer calls. This means that the mobile number may only connect you with your intended contact around 4-10% of the time.
-   **P3 mobile numbers** are unverified, and lead to contacts with a very low propensity to answer the phone. They have a connection rate that’s usually under 1%.
-   **Mobile numbers that “need attention”** are usually inactive, disconnected, and/or belong to the wrong person. Naturally, they have a 0% connection rate and you should continue enriching with other providers to find the right number.

TitanX approached scoring this way to address the dreaded "Right Name, Wrong Person" problem. This occurs when data appears to be accurate on the surface, but actually belongs to a different person with the same name. TitanX's process catches these mix-ups, ensuring you don't waste time calling John Smith the professor when you're trying to reach John Smith the CEO. This level of accuracy is crucial for effective prospecting and targeted marketing campaigns.

**TitanX Benchmarks for Scoring Mobile Numbers**

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924f030bd3e5d845f86c23f_675c6a7df5ee53721b65fc90_AD_4nXds1vxByfnDqctfq0gh10EbvNb5Q0mLwApT8GRhsk8i1F-LeTgaWsJegItnZeBiaSEcspAaFOKhiRQNkU6dWmpLhbjBPAiLTGhmzKH1RDKSbujKu7nu9Uz--ifffZqzpfrUCENu.avif)

After scoring mobile numbers with TitanX, here’s the formula we used to standardize the quality score for each provider:

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924f030bd3e5d845f86c242_675c6a7ec0972e1f82771746_AD_4nXegQ0tK8wJPHXm7s6tf1Q3tis3x11v_yyi18QhlPCy3DOpFZoN60TA3DLChjcVFtLsvQJBPBMRPdsxFMLiWyrK-v6t4ezwHUrUDwSd2cmuF5mEe9zcnisz30nlkWdgMEezjKt0.avif)

This formula assumes that P2 is half the quality of P1, and that P3 is a quarter of the quality of P1. “NA” scores, or mobile numbers that “Need attention,” have a completely negative impact.

💡**Did you know?** _With our upcoming integration, you’ll be able to harness the power of TitanX without leaving your Clay workbook._

#### APAC

For our APAC contacts, we took a slightly different approach. Our offshore team called each number at least five times, or until we reached a deterministic outcome, like a number being out of service, or a person with a different name picking up the phone. This hands-on method helped us to assign the following scores to each of the mobile numbers in our dataset:

-   **Good phone numbers** are verified by contacts answering the phone _and_ confirming their name. They can also be verified by a voicemail mentioning the contact’s name.
-   **Unverified phone numbers** led to calls that went completely unanswered, or did not have a voicemail mentioning the contact’s name.
-   **Bad phone numbers** were out of service, or led to calls where the wrong contact picked up. These numbers should be removed from your contact lists to maintain data quality and optimize your sales process.

Similar to our formula for the NAMER and EMEA scores, we used the following to calculate the quality score for each provider:

![](https://cdn.prod.website-files.com/687e604972375496b891fe58/6924f030bd3e5d845f86c245_675c6a7ec0972e1f82771749_AD_4nXdFqHyvrgBRIkoy1rFA_dhIYhADd-ydHQa3K8ZF-EGM8cwQahb6oXY_HmFTC1kKmSgABYchYHpdtH1AC5coxBqUM18-hDl1WAlinB7u71Ic6ADjxhVXTuhN6E3LSjXUdWdNt6vxow.avif)

This formula assumes that unverified phone numbers are a quarter of the quality of good phone numbers, and that bad phone numbers have a completely negative impact.

#### **Calculating Budget & Costs**

We calculated each provider’s cost per quality mobile number according to the value of Clay credits you’d need to purchase it.

However, the dollar amount isn't the only thing that you should include in your budget; there's also the efficiency factor. If a sales team is stuck using unverified numbers, they might waste precious hours on unproductive calls. Taking this under consideration, we also factored potential [time savings](https://www.clay.com/blog/how-chatmetrics-saved-time-cut-costs-and-replaced-their-sdrs-with-clay) into our findings.

### **Results & Analysis**

After enriching 6,000 contacts, we found 9,806 mobile numbers. Only 23% of those numbers were deemed to be P1 or “Good” numbers. (Remember: These are verified numbers for contacts who have a high propensity for answering calls.)

This number may be lower than expected, but shows why it's essential to reference each provider's quality score before buying. By choosing a provider with more accurate, actionable data, you'll be better able to prioritize your sales reps' time so that they don't have to keep getting stuck at voicemail.

In fact, TitanX found that by using providers with more verified mobile numbers, sales reps can have up to 5X more conversations every hour—thereby significantly improving their sales process and lead generation efforts.

‍

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