-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# Activate adaptive filtering in AlloyDB AI Stay organized with collections Save and categorize content based on your preferences.

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](/terms/service-terms#1). You can process personal data for this feature as outlined in the [Cloud Data Processing Addendum](/terms/data-processing-addendum), subject to the obligations and restrictions described in the agreement under which you access Google Cloud. Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

This page provides instructions for enabling adaptive filtering in AlloyDB AI, a feature that optimizes filtered vector searches.

**Note:** Inline filtering is supported only when you use the [ScaNN](/alloydb/docs/ai/scann-vector-query-perf-overview) algorithm. Inline filtering is not compatible with the Inverted File (IVF), Inverted File Flat (IVFFlat), or Hierarchical Navigable Small Worlds (HNSW) algorithms.

## Enable adaptive filtering

To enable adaptive filtering, you must set the [`scann.enable_preview_features`](/alloydb/docs/reference/alloydb-flags#scann.enable_preview_features) flag to `on`.

**Note:** The `scann.enable_preview_features` flag is an umbrella for multiple preview features and enables all of them.

```
gcloud alloydb instances update INSTANCE_ID \
    --database-flags scann.enable_preview_features=on \
    --region=REGION \
    --cluster=CLUSTER_ID \
    --project=PROJECT_ID
```

Replace the following:

-   `INSTANCE_ID`: the ID of the instance where you want to enable adaptive filtering.
-   `REGION`: the region where your instance is located for example, `us-central1`.
-   `CLUSTER_ID`: the ID of the cluster where your instance is located.
-   `PROJECT_ID`: the ID of the project where your cluster is located.

Setting this flag to `on` activates the adaptive filtering behavior, allowing the query optimizer to dynamically switch between inline and pre-filtering strategies.

## What's next

-   [Filtered vector search in AlloyDB AI](/alloydb/docs/ai/filtered-vector-search-overview)
-   [Understand adaptive filtering in AlloyDB AI](/alloydb/docs/ai/adaptive-filtering)

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
