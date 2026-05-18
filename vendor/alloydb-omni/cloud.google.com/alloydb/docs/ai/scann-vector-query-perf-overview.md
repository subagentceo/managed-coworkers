-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview)

Send feedback

# ScaNN vector query performance overview Stay organized with collections Save and categorize content based on your preferences.

This page gives a conceptual overview of improving vector query performance with the ScaNN Index.

ScaNN index uses tree-quantization based indexing. In Tree-quantization techniques, indexes learn a search tree together with a quantization (or hashing) function. When you run a query, the search tree is used to prune the search space while quantization is used to compress the index size. This pruning speeds up the scoring of the similarity (i.e., distance) between the query vector and the database vectors.

To achieve both a high query-per-second rate (QPS) and a high recall with your nearest-neighbor queries, you must partition the tree of your `ScaNN` index in a way that is most appropriate to your data and your queries.

A common characteristic of the current generation of high-dimensional embedding models is they can still retain much of the information at much lower dimensionality, for example 90% of the information can be retained with only 20% of the embedding's dimensions. To help speed up such datasets, AlloyDB ScaNN will automatically perform dimension reduction using Principal Component Analysis (see `scann.enable_pca` below) on the indexed vectors which further reduces cpu & memory usage for the vector search. Because dimension reduction still causes minor recall loss in the index, AlloyDB ScaNN compensates through an initial ranking step with a larger number of PCA'ed vector candidates from the index then re-ranking them by the original vectors (see `scann.pre_reordering_num_neighbors`).

## What's next

-   [Get started with vector embeddings using AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-embedding#0).

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.