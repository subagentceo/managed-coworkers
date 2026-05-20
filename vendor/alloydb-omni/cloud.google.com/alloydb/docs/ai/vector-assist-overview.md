 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=zh-cn) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=zh-cn)
-   [Documentation](https://docs.cloud.google.com/docs?hl=zh-cn)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=zh-cn)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=zh-cn)

发送反馈

# 向量辅助概览 使用集合让一切井井有条 根据您的偏好保存内容并对其进行分类。

**预览版 - 向量辅助**

此功能受服务专用条款的 [“通用服务条款”部分中的“非正式版产品条款”](https://docs.cloud.google.com/terms/service-terms?hl=zh-cn#1)的约束。 您可以按照[云数据处理附录](https://docs.cloud.google.com/terms/data-processing-addendum?hl=zh-cn)中的说明针对此功能处理个人数据，但需遵守您访问 Google Cloud 时所依据的协议中的相关义务和限制。非正式版功能“按原样”提供，可能只能获得有限的支持。 如需了解详情，请参阅 [发布阶段说明](https://cloud.google.com/products/?hl=zh-cn#product-launch-stages)。

向量辅助是一项 AlloyDB for PostgreSQL 扩展服务，可简化向量工作负载的部署和管理。它提供了一个声明式 SQL 框架，可帮助您设置可用于生产用途的向量搜索能力，例如嵌入生成、查询优化和索引创建。此框架通过以下方式降低了向量工作负载的复杂性：

-   **简化意图声明**：使用 SQL 函数声明要求（例如表、文本 列或目标召回率）。
-   **自动执行最佳实践**：生成优化的 SQL 命令（也称为建议），以使用您定义的 向量规范和一种可计算最佳索引配置的优化自动调优算法来设置向量工作负载。
-   **提供透明度和控制力**：在自动执行任务时，为每项 建议提供清晰的说明，让您可以按照自己的节奏查看、修改和应用 建议。
-   **实现快速原型设计**：让您可以快速部署经过适当调整的向量 搜索设置，从而缩短从概念到生产的时间。
-   **注重易用性**：简化了语义搜索的复杂性， 弥合了业务要求和工程要求之间的差距。

借助向量辅助，您可以通过简化的设置构建具有语义搜索功能的端到端应用。

## 向量辅助的工作原理

向量辅助要求您定义向量规范。该框架使用这些向量规范（也称为向量规范）来生成创建向量索引所需的步骤。向量辅助功能会以建议的形式输出部署向量工作负载所需的步骤。每次修改向量规范时，向量辅助都会重新生成建议。

使用这些建议的步骤生成向量索引后，您可以使用向量辅助来生成优化的搜索查询。

### 向量辅助规范

设置向量索引规范（或_向量规范_）是使用向量辅助功能的第一步 。向量规范是一个对象，您可以在其中定义向量工作负载的意图和要求。它包含所有必要信息，包括以下内容：

-   表和相关列（文本或向量）
-   嵌入模型偏好设置（如果使用嵌入生成）
-   首选索引类型：[`HNSW`](https://docs.cloud.google.com/alloydb/docs/ai/create-hnsw-index?hl=zh-cn) 或 [`IVFFlat`](https://docs.cloud.google.com/alloydb/docs/ai/create-ivfflat-index?hl=zh-cn)。 [`ScaNN`](https://docs.cloud.google.com/alloydb/docs/ai/create-scann-index?hl=zh-cn) 不受支持。
-   搜索查询的目标召回率
-   内存限制

**注意**： 如果您在向量规范中定义了 `target_recall` 规范，并且 向量辅助无法在给定数据集和配置上构建索引以实现指定的 `target_recall`，则它会返回构建 向量工作负载的配置，并尽可能实现最佳 `target_recall`。这可能低于您定义的 `target_recall`。

您可以使用 [`vector_assist.define_spec`](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=zh-cn#define-spec) 函数定义向量规范，并且可以随时对其进行修改。系统会为每个规范分配一个唯一 ID，并将其存储在一个名为 `vector_assist.VECTOR_SPECS` 的表中。

向量辅助会推断规范输入和一种可计算最佳索引配置的优化自动调优算法。虽然向量辅助功能会使用这些值来简化开发流程，但您仍然可以根据自己的偏好自定义这些值。

### 向量辅助建议

定义向量规范后，向量辅助会处理您的输入并生成建议。这些建议是一个有序的实用步骤列表（通常是 SQL 命令），您必须执行这些步骤才能按照规范部署向量工作负载。每项建议都包含以下内容：

-   要运行的 SQL 查询。
-   对查询的作用以及推荐原因的详细说明。
-   有关潜在权衡或费用的信息，例如估计的索引大小或构建时间。

向量辅助会将建议存储在一个名为 `vector_assist.RECOMMENDATIONS` 的表格中，您可以单独或整体查看、修改和应用这些建议。

每次修改工作负载的向量规范时，向量辅助都会重新生成建议，以符合更新后的规范。

## 限制

将向量辅助功能与 AlloyDB 实例搭配使用时，请考虑以下限制：

-   向量辅助仅支持 PostgreSQL 17 及更高版本。
-   虽然向量辅助功能支持所有 `pgvector` 版本，但我们建议您使用最新版本，以获得最佳性能和功能支持。如需了解 详情，请参阅 [`pgvector`更改日志](https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md#080-2024-10-30)。
-   如果您的实例使用 `google_ml_integration` 扩展程序生成嵌入，那么在使用向量辅助时，其限制也适用。 如需了解详情，请参阅 [AlloyDB 概览中的注册和调用远程 AI 模型](https://docs.cloud.google.com/alloydb/docs/ai/model-endpoint-overview?hl=zh-cn)。
-   向量辅助仅支持 `HNSW` 和 `IVFFlat` 索引类型。不支持 `ScaNN` 索引类型。
-   向量辅助功能仅支持文本嵌入模型来自动生成嵌入，并使用 `text_column_name` 作为输入参数。如果您的向量工作负载需要多模态嵌入模型，请使用 `google_ml_integration` 扩展程序或其他扩展程序手动生成这些嵌入，然后再使用向量辅助对这些嵌入启用语义搜索。

## 后续步骤

-   [使用向量辅助](https://docs.cloud.google.com/alloydb/docs/ai/use-vector-assist?hl=zh-cn)
-   [向量辅助参考信息](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=zh-cn)

发送反馈

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-05-16。
