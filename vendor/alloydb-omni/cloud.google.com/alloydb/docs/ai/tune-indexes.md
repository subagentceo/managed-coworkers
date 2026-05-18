-   [Home](https://docs.cloud.google.com/?hl=zh-cn)
-   [Documentation](https://docs.cloud.google.com/docs?hl=zh-cn)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=zh-cn)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=zh-cn)
-   [指南](https://docs.cloud.google.com/alloydb/docs/overview?hl=zh-cn)

发送反馈

# 在 AlloyDB for PostgreSQL 中对向量查询性能进行调优 使用集合让一切井井有条 根据您的偏好保存内容并对其进行分类。

本页面介绍如何在 AlloyDB for PostgreSQL 中对索引进行调优，以实现更快的查询性能和更高的召回率。

ScaNN IVF IVFFlat HNSW

## 准备工作

在构建 `ScaNN` 索引之前，请完成以下操作：

-   确保已创建包含您数据的表。
-   如需避免在生成索引时出现问题，请确保您为 `maintenance_work_mem` 和 `shared_buffers` 标志设置的值小于机器总内存。

## 对 `ScaNN` 索引进行调优

请按照以下指导信息在二级和三级 ScaNN 索引之间进行选择：

-   如果向量行数少于 1000 万行，请选择二级索引。
-   如果向量行数超过 1 亿行，请选择三级索引。
-   如果向量行数介于 1000 万行到 1 亿行之间，可选择三级索引以针对索引构建时间进行优化，或是选择二级索引以针对搜索召回率进行优化。

请考虑以下关于二级和三级 `ScaNN` 索引的示例，它们展示了如何为包含 1000000 行的表设置调优参数：

### 二级索引

```
SET LOCAL scann.num_leaves_to_search = 1;
SET LOCAL scann.pre_reordering_num_neighbors=50;

CREATE INDEX my_scann_index ON my_table
  USING scann (vector_column cosine)
  WITH (num_leaves = [power(1000000, 1/2)]);
```

### 三级索引

```
SET LOCAL scann.num_leaves_to_search = 10;
SET LOCAL scann.pre_reordering_num_neighbors=50;

CREATE INDEX my_scann_index ON my_table
  USING scann (vector_column cosine)
  WITH (num_leaves = [power(1000000, 2/3)], max_num_levels = 2);
```

如需在对 ScaNN 索引进行调优时优化召回率和 QPS 之间的平衡，请参阅[对 ScaNN 索引进行调优的最佳实践](https://docs.cloud.google.com/alloydb/docs/ai/best-practices-tuning-scann?hl=zh-cn)。

## 分析查询

如以下 SQL 查询示例所示，使用 `EXPLAIN ANALYZE` 命令分析查询分析洞见。

  ```
  EXPLAIN ANALYZE SELECT result-column
  FROM my_table
  ORDER BY EMBEDDING_COLUMN <-> embedding('text-embedding-005', 'What is a database?')::vector
  LIMIT 1;
```

示例响应 `QUERY PLAN` 包含所用时间、扫描或返回的行数以及使用的资源等信息。

```
Limit  (cost=0.42..15.27 rows=1 width=32) (actual time=0.106..0.132 rows=1 loops=1)
  ->  Index Scan using my_scann_index on my_table  (cost=0.42..858027.93 rows=100000 width=32) (actual time=0.105..0.129 rows=1 loops=1)
        Order By: (embedding_column <-> embedding('text-embedding-005', 'What is a database?')::vector(768))
        Limit value: 1
Planning Time: 0.354 ms
Execution Time: 0.141 ms
```

## 查看向量索引指标

您可以使用向量索引指标来查看向量索引的性能、确定需要改进的方面，以及在需要时根据指标对索引进行调优。 `pg_stat_ann_indexes` 视图可帮助您了解索引利用率的状态，而 `pg_stat_ann_index_creation` 视图则提供有关在创建索引时创建的行的信息。

如需查看索引利用率指标，请运行以下命令：

```
SELECT * FROM pg_stat_ann_indexes;
```

您将看到类似如下所示的输出：

```
-[ RECORD 1 ]----------+---------------------------------------------------------------------------
relid                  | 271236
indexrelid             | 271242
schemaname             | public
relname                | t1
indexrelname           | t1_ix1
indextype              | scann
indexconfig            | {num_leaves=100,,max_num_levels=1,quantizer=SQ8}
indexsize              | 832 kB
indexscan              | 0
insertcount            | 250
deletecount            | 0
updatecount            | 0
partitioncount         | 100
distribution           | {"average": 3.54, "maximum": 37, "minimum": 0, "outliers": [37, 12, 11, 10, 10, 9, 9, 9, 9, 9]}
distributionpercentile |{"10": { "num_vectors": 0, "num_partitions": 0 }, "25": { "num_vectors": 0, "num_partitions": 30 }, "50": { "num_vectors": 3, "num_partitions": 30 }, "75": { "num_vectors": 5, "num_partitions": 19 }, "90": { "num_vectors": 7, "num_partitions": 11 }, "95": { "num_vectors": 9, "num_partitions": 5 }, "99": { "num_vectors": 12, "num_partitions": 4 }, "100": { "num_vectors": 37, "num_partitions": 1 }}
```

如需查看创建索引时创建的行数，请运行以下命令：

```
SELECT * FROM pg_stat_ann_index_creation;
```

您将看到类似如下所示的输出：

```
-[ RECORD 1 ]----------+---------------------------------------------------------------------------
relid                         | 271236
indexrelid                    | 271242
schemaname                    | public
relname                       | t1
indexrelname                  | t1_ix1
index_rows_at_creation_time   | 262144
```

如需详细了解指标的完整列表，请参阅[向量索引指标](https://docs.cloud.google.com/alloydb/docs/reference/vector-index-metrics?hl=zh-cn)。

## 后续步骤

-   [维护向量索引](https://docs.cloud.google.com/alloydb/docs/ai/maintain-vector-indexes?hl=zh-cn)。
-   了解[嵌入工作流示例](https://docs.cloud.google.com/alloydb/docs/ai/example-embeddings?hl=zh-cn)。

发送反馈

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-04-16。