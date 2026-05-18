-   [Home](https://docs.cloud.google.com/?hl=ja)
-   [Documentation](https://docs.cloud.google.com/docs?hl=ja)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=ja)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=ja)
-   [ガイド](https://docs.cloud.google.com/alloydb/docs/overview?hl=ja)

フィードバックを送信

# IVF インデックスを作成する コレクションでコンテンツを整理 必要に応じて、コンテンツの保存と分類を行います。

このページでは、保存されたエンベディングを使用してインデックスを生成し、AlloyDB for PostgreSQL で `IVF` インデックスを使用してエンベディングをクエリする方法について説明します。エンベディングの保存の詳細については、[ベクトル エンベディングを保存する](https://docs.cloud.google.com/alloydb/docs/ai/store-embeddings?hl=ja)をご覧ください。

**注:** インデックスを作成する前に、AlloyDB データベースのテーブルにエンベディング ベクトルを追加してください。

## 始める前に

インデックスの作成を開始する前に、以下の前提条件を整える必要があります。

-   AlloyDB データベースの[テーブルにエンベディング ベクトルが追加されている](https://docs.cloud.google.com/alloydb/docs/ai/store-embeddings?hl=ja)。
    
-   Google が AlloyDB 用に拡張した `pgvector` に基づく `vector` 拡張機能のバージョン `0.5.0` 以降がインストールされている。
    
    ```
    CREATE EXTENSION IF NOT EXISTS vector;
    ```
    

## `IVF` インデックスを作成する

ストック [`pgvector` は、インデックスによる近似最近傍検索をサポートしています](https://github.com/pgvector/pgvector#indexing)。AlloyDB では、インデックス作成時に指定できるスカラー量子化機能により、このサポートが強化されています。有効にすると、スカラー量子化により、より大きい次元ベクトルを持つクエリを大幅に高速化できます。また、最大 8,000 個のディメンションを持つベクトルを保存できます。

`pgvector` ベースのインデックスでスカラー量子化を有効にするには、インデックス方式として `IVF` を指定します。また、量子化方式として `SQ8` を指定します。

```
CREATE INDEX INDEX_NAME ON TABLE
  USING ivf (EMBEDDING_COLUMN DISTANCE_FUNCTION)
  WITH (lists = LIST_COUNT, quantizer = 'QUANTIZER');
```

次のように置き換えます。

-   `INDEX_NAME`: 作成するインデックスの名前（例: `my-ivf-index`）。インデックス名はデータベース全体で共有されます。各インデックス名はデータベース内の各テーブルで一意となるようにしてください。
    
-   `TABLE`: インデックスを追加するテーブル。
    
-   `EMBEDDING_COLUMN`: `vector` データを格納する列。
    
-   `DISTANCE_FUNCTION`: このインデックスで使用する距離関数。次のいずれかを選択します。
    
    -   **L2 距離:** `vector_l2_ops`
        
    -   **内積:** `vector_ip_ops`
        
    -   **コサイン距離:** `vector_cosine_ops`
        
-   `LIST_COUNT`: このインデックスで使用するリストの数。この値を決定する方法の詳細については、[IVF インデックスをチューニングする](https://docs.cloud.google.com/alloydb/docs/ai/tune-indexes?hl=ja)をご覧ください。
    
-   `QUANTIZER`: 使用する量子化方式のタイプ。
    
    次のいずれかに設定します。
    
    -   `SQ8`: 推奨。クエリ レスポンスが速くなりますが、一部の回帰損失が発生します。これは本番環境のシナリオには影響しません。
    -   `FLAT`: クエリ レスポンスが遅くなり、メモリ使用量が増加しますが、無視できる程度の再現率の低下にとどまります。
    
    このインデックスを、`vector` ではなく `real[]` データ型を使用するエンベディング列に作成するには、列を `vector` データ型にキャストします。
    

```
CREATE INDEX INDEX_NAME ON TABLE
  USING ivf (CAST(EMBEDDING_COLUMN AS vector(DIMENSIONS)))'}} DISTANCE_FUNCTION)
  WITH (lists = LIST_COUNT, quantizer = 'SQ8');
```

`DIMENSIONS` は、エンベディング列のディメンション幅に置き換えます。ディメンションの確認方法については、[ベクトル関数](https://github.com/pgvector/pgvector?tab=readme-ov-file#vector-functions)の `vector_dims` 関数をご覧ください。

インデックス作成の進行状況を確認するには、`pg_stat_progress_create_index` ビューを使用します。

```
SELECT * FROM pg_stat_progress_create_index;
```

`phase` 列にはインデックス作成の現在のステータスが表示されます。`building postings` フェーズは、インデックスの作成が完了に近づいていることを示します。

目標の再現率と QPS のバランスを考慮してインデックスをチューニングするには、[`IVF` インデックスをチューニングする](https://docs.cloud.google.com/alloydb/docs/ai/tune-indexes?hl=ja)をご覧ください。

## クエリを実行する

エンベディングをデータベースに保存してインデックスを作成した後は、[`pgvector` クエリ機能](https://github.com/pgvector/pgvector#querying)を使用してクエリを開始できます。

エンベディング ベクトルの最も近いセマンティック ネイバーを見つけるには、次のサンプルクエリを実行します。ここでは、インデックスの作成時に使用した距離関数を設定します。

  ```
  SELECT * FROM TABLE
    ORDER BY EMBEDDING_COLUMN DISTANCE_FUNCTION_QUERY ['EMBEDDING']
    LIMIT ROW_COUNT
```

次のように置き換えます。

-   `TABLE`: テキストを比較するエンベディングを含むテーブル。
    
-   `INDEX_NAME`: 使用するインデックスの名前。例: `my-scann-index`
    
-   `EMBEDDING_COLUMN`: 保存されたエンベディングを含む列。
    
-   `DISTANCE_FUNCTION_QUERY`: このクエリで使用する距離関数。インデックスの作成時に使用した距離関数に基づいて、次のいずれかを選択します。
    
    -   **L2 距離:** `<->`
        
    -   **内積:** `<#>`
        
    -   **コサイン距離:** `<=>`
        
-   `EMBEDDING`: 保存されているセマンティック ネイバーの中で最も近いものを見つけるエンベディング ベクトル。
    
-   `ROW_COUNT`: 返される行数。
    
    最も適合するものが 1 つだけ必要な場合は、`1` を指定します。
    

他のクエリの例については、[クエリ](https://github.com/pgvector/pgvector?tab=readme-ov-file#querying)をご覧ください。

[`embedding()`](https://docs.cloud.google.com/alloydb/docs/ai/work-with-embeddings?hl=ja) 関数を使用してテキストをベクトルに変換することもできます。ベクトルを `pgvector` 最近傍演算子（L2 距離の場合は `<->`）のいずれかに適用して、意味的に最も類似したエンベディングを含むデータベース行を見つけます。

`embedding()` は `real` 配列を返すため、これらの値を `pgvector` 演算子で使用するには、`embedding()` 呼び出しを `vector` に明示的にキャストする必要があります。

## 次のステップ

-   [ScaNN インデックスを作成する](https://docs.cloud.google.com/alloydb/docs/ai/create-scann-index?hl=ja#before-you-begin)
-   [ベクトル類似性検索を実行する](https://docs.cloud.google.com/alloydb/docs/ai/run-vector-similarity-search?hl=ja)
-   [ベクトルクエリのパフォーマンスを調整する](https://docs.cloud.google.com/alloydb/docs/ai/tune-indexes?hl=ja)
-   [ベクトル インデックス指標](https://docs.cloud.google.com/alloydb/docs/reference/vector-index-metrics?hl=ja)
-   [AlloyDB、pgvector、モデル エンドポイント管理を使用してスマート ショッピング アシスタントを構築する方法について学習する](https://codelabs.developers.google.com/smart-shop-agent-alloydb?hl=ja#0)。

フィードバックを送信

特に記載のない限り、このページのコンテンツは[クリエイティブ・コモンズの表示 4.0 ライセンス](https://creativecommons.org/licenses/by/4.0/)により使用許諾されます。コードサンプルは [Apache 2.0 ライセンス](https://www.apache.org/licenses/LICENSE-2.0)により使用許諾されます。詳しくは、[Google Developers サイトのポリシー](https://developers.google.com/site-policies?hl=ja)をご覧ください。Java は Oracle および関連会社の登録商標です。

最終更新日 2026-04-21 UTC。