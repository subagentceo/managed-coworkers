[Home](https://sift.com)/[Blog](https://sift.com/blog/)

Table of Contents

Explore AI Summary

![chat-gpt-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![chat-gpt-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![google-ai-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![google-ai-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![perplexity-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![perplexity-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![grok-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![grok-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![claude-summary](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

![claude-summary-pink](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

Share post on:

-   [](https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fsift.com%2Fblog%2F3-common-ato-attacks-and-how-to-stop-them%2F&title=3%20common%20ATO%20attacks%E2%80%94and%20how%20to%20stop%20them)
-   [](https://twitter.com/intent/tweet?text=3%20common%20ATO%20attacks%E2%80%94and%20how%20to%20stop%20them&url=https%3A%2F%2Fsift.com%2Fblog%2F3-common-ato-attacks-and-how-to-stop-them%2F)
-   [](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fsift.com%2Fblog%2F3-common-ato-attacks-and-how-to-stop-them%2F&picture=&title=3%20common%20ATO%20attacks%E2%80%94and%20how%20to%20stop%20them)
-   [](/cdn-cgi/l/email-protection#f6c98583949c939582cbc5d3c4c695999b9b9998d3c4c6b7a2b9d3c4c697828297959d85d3b3c4d3cec6d3cfc2979892d3c4c69e9981d3c4c68299d3c4c685829986d3c4c6829e939bd0d5c6c5cecd9499928fcb9e82828685d3c5b7d3c4b0d3c4b0859f9082d895999bd3c4b0949a9991d3c4b0c5db95999b9b9998db978299db97828297959d85db979892db9e9981db8299db85829986db829e939bd3c4b0)

-   [Account Takeover](https://sift.com/blog/category/ato/)
-   [Digital Trust](https://sift.com/blog/category/digital-trust/)

# 3 common ATO attacks—and how to stop them

Learn about common ways fraudsters attempt to gain access to your users’ accounts and how to combat them.

[![Sift Author Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20504%20504'%3E%3C/svg%3E)](https://sift.com/blog/author/kathryn-schneider/)

[Kathryn Schneider](https://sift.com/blog/author/kathryn-schneider/)

Apr 12, 2022

![black-dot](https://sift.com/wp-content/uploads/2024/12/black-dot.svg)

![Press-Release-Tile-Image-Color-Pills\_Blue](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)

Legacy account security—e.g., passwords and usernames—is nearing the end of its usefulness as a means to protect against account takeover (ATO) fraud. In fact, ATO attacks are growing exponentially. Accelerated by the global pandemic, more consumers are relying on online services rather than brick-and-mortar stores—leading to a reliance on digital accounts and the need to protect those accounts from cybercriminals who want to steal stored value, payment information, demographics, and personally identifiable information (PII).

Successful online businesses need a multi-pronged, layered approach that addresses every step of the user journey, authenticates users, secures accounts, and stops ATO while also future-proofing against the more aggressive fraud attacks emerging every day.

Each layer can be viewed as a tool among many to protect various points of the user journey. In this article, we’ll go over some of the common attack methods Sift customers face and how to combat them.

![](https://dev-sift.pantheonsite.io/app/uploads/2022/04/Blog-Image-1116x648-header-1.jpg)

## **Stolen login credential attacks**

We’ve all experienced it: you get an email or text notification about suspicious login activity on one of your accounts—and it definitely wasn’t you trying to access the site or app. It’s a quick way to ruin a day, and it happens all too often. Somewhere along the line, a fraudster gained access to your account credentials (whether that’s through the dark web, phishing, or some other means). Fortunately, it’s much less common for nefarious actors to gain control over your device. 

With this in mind, a common way to protect users and detect account takeover attempts is to analyze the device being used to log in. With Sift, you can use Device Fingerprinting to uniquely identify the device a visitor is using to interact with your site, determine whether you’ve flagged that device as being associated with fraudulent behavior in the past, and prevent that visitor from using your site in the future.

_To learn how to implement Sift Device Fingerprinting, read our integration guide._

In addition to analyzing the device, it’s also important to analyze the connecting IP address to determine if this is an IP the customer has used in the past. This can be determined using the Sift Console. A login using an unfamiliar device but a familiar and commonly used IP address may be a signal that the legitimate user has a different or new device. If both the device and IP address are unfamiliar, this indicates a higher-risk login event.

## **Credential stuffing attacks**

Credential stuffing attacks are a form of stolen login credential attacks, and are automated using scripts and/or bots. In this type of attack, fraudsters use these automated tools to test large lists of stolen login credentials for popular websites. Because the attack is automated, the speed at which the stolen credentials are tested is an indicator that an ATO attempt is in progress.

![](https://dev-sift.pantheonsite.io/app/uploads/2022/04/Blog-Image-1116x648-1.jpg)

Sift’s industry-leading, custom ATO machine learning model detects real-time risk at the point of login using over 100 signals, and can alert trust and safety teams of suspicious failed login attempts and potential bot-based attacks.

## **Social engineering and phishing**

[Ninety-eight percent of cybercrime involves social engineering](https://purplesec.us/resources/cyber-security-statistics/), with attacks becoming increasingly complex. In many social engineering attacks, the victim is convinced to reveal important PII to a fraudster or complete an action that gives a fraudster access to an account.

Protecting accounts against these types of complex attacks requires access to, and analysis of, real-time data at multiple touchpoints. [Dynamic Friction](/platform/) can play a critical role here, guiding users along whatever experience is appropriate for them on your site, and preventing cybercriminals from successfully mimicking trustworthy customers.

Learn how to simplify account security and accelerate growth with [Sift Account Defense](/platform/account-defense/).

Share post on:

-   [](https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fsift.com%2Fblog%2F3-common-ato-attacks-and-how-to-stop-them%2F&title=3%20common%20ATO%20attacks%E2%80%94and%20how%20to%20stop%20them)
-   [](https://twitter.com/intent/tweet?text=3%20common%20ATO%20attacks%E2%80%94and%20how%20to%20stop%20them&url=https%3A%2F%2Fsift.com%2Fblog%2F3-common-ato-attacks-and-how-to-stop-them%2F)
-   [](https://www.facebook.com/sharer.php?u=https%3A%2F%2Fsift.com%2Fblog%2F3-common-ato-attacks-and-how-to-stop-them%2F&picture=&title=3%20common%20ATO%20attacks%E2%80%94and%20how%20to%20stop%20them)
-   [](/cdn-cgi/l/email-protection#c5fab6b0a7afa0a6b1f8f6e0f7f5a6aaa8a8aaabe0f7f584918ae0f7f5a4b1b1a4a6aeb6e080f7e0fdf5e0fcf1a4aba1e0f7f5adaab2e0f7f5b1aae0f7f5b6b1aab5e0f7f5b1ada0a8e3e6f5f6fdfea7aaa1bcf8adb1b1b5b6e0f684e0f783e0f783b6aca3b1eba6aaa8e0f783a7a9aaa2e0f783f6e8a6aaa8a8aaabe8a4b1aae8a4b1b1a4a6aeb6e8a4aba1e8adaab2e8b1aae8b6b1aab5e8b1ada0a8e0f783)

## You may also like

[![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)](https://sift.com/blog/what-fraud-leaders-need-to-build-and-scale-a-modern-fraud-organization/)

-   [Fraud](https://sift.com/blog/category/fraud/)

### [What Fraud Leaders Need to Build and Scale a Modern Fraud Organization](https://sift.com/blog/what-fraud-leaders-need-to-build-and-scale-a-modern-fraud-organization/)

[![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)](https://sift.com/blog/author/sift-trust-and-safety-team/)

[Sift Trust and Safety Team](https://sift.com/blog/author/sift-trust-and-safety-team/)

May 18, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

7 min read

[![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)](https://sift.com/blog/how-sift-helps-businesses-get-the-fraud-out/)

-   [Fraud](https://sift.com/blog/category/fraud/)

### [Get the Fraud Out: How Sift Helps Businesses Stop Fraud Before It Hits Revenue](https://sift.com/blog/how-sift-helps-businesses-get-the-fraud-out/)

[![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)](https://sift.com/blog/author/kathryn-schneider/)

[Kathryn Schneider](https://sift.com/blog/author/kathryn-schneider/)

May 14, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

6 min read

[![blog image](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20683'%3E%3C/svg%3E)](https://sift.com/blog/are-you-benchmarking-against-the-right-threats-q1-2026-insights-from-sifts-fibr/)

-   [Data & Insights](https://sift.com/blog/category/data-insights/)

### [Are You Benchmarking Against the Right Threats? Q1 2026 Insights from Sift’s FIBR](https://sift.com/blog/are-you-benchmarking-against-the-right-threats-q1-2026-insights-from-sifts-fibr/)

[![dummy user](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20434'%3E%3C/svg%3E)](https://sift.com/blog/author/mbenjamin/)

[Maria Benjamin](https://sift.com/blog/author/mbenjamin/)

Apr 20, 2026

![black-dot](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)

7 min read

## Dare to grow differently.

Flip the switch on fraud-fueled fear. Make risk work for your business and scale securely into new markets with Sift’s AI-powered platform.

[see sift in action](/demo/)

-   ![remitly](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    
-   ![swan](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20560%20160'%3E%3C/svg%3E)
    
-   ![yelp-white](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)
    
-   ![taptap](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    

-   ![remitly](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)
    
-   ![swan](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20560%20160'%3E%3C/svg%3E)
    
-   ![yelp-white](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20%20'%3E%3C/svg%3E)
    
-   ![taptap](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20162%20100'%3E%3C/svg%3E)