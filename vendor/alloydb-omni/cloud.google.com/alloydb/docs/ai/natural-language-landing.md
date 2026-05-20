-   [Home](https://docs.cloud.google.com/?hl=ja)
-   [Documentation](https://docs.cloud.google.com/docs?hl=ja)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=ja)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=ja)
-   [ガイド](https://docs.cloud.google.com/alloydb/docs/overview?hl=ja)

フィードバックを送信

# AlloyDB AI 自然言語の概要 コレクションでコンテンツを整理 必要に応じて、コンテンツの保存と分類を行います。

自然言語の質問を直接 SQL に変換します。AlloyDB AI の自然言語機能（[プレビュー版](https://cloud.google.com/products?hl=ja#product-launch-stages)）は、自然言語クエリをスキーマ対応の SQL クエリに変換し、デベロッパーとアナリストの両方がより迅速に回答を得られるようにします。

**注:** この試験運用版は pre-GA サービスです。

![AI によるフィルタリングのサムネイル](https://docs.cloud.google.com/static/alloydb/images/nl-semantic-layer.png?hl=ja)

### [コンテキスト レイヤを構築する](https://docs.cloud.google.com/alloydb/docs/ai/generate-sql-queries-natural-language?hl=ja)

テーブル、列、リレーションシップを理解して、正確なコンテキスト認識クエリを生成し、機能豊富な**コンテキスト レイヤ**を作成します。

![インデータベース テキスト生成のサムネイル](https://docs.cloud.google.com/static/alloydb/images/nl-intelligentsql.png?hl=ja)

### [インテリジェントな SQL 生成](https://docs.cloud.google.com/alloydb/docs/ai/use-natural-language-generate-sql-queries?hl=ja)

**コンセプト検索**を使用してインテントをインテリジェントに解析し、テンプレートの**テンプレート ストア**を活用して、SQL クエリを迅速かつ確実に構築します。

![直接モデル統合のサムネイル](https://docs.cloud.google.com/static/alloydb/images/nl-psv.png?hl=ja)

### [パラメータ化されたセキュアビュー](https://docs.cloud.google.com/alloydb/docs/parameterized-secure-views-overview?hl=ja)

**きめ細かなアクセス制御**を提供し、エンドユーザーがアクセス権のあるデータのみを表示できるようにします。これは、AI 生成のクエリを実行するアプリケーションにとって重要です。

## 仕組み

AlloyDB AI 自然言語（[プレビュー版](https://cloud.google.com/products?hl=ja#product-launch-stages)）機能は、データベース スキーマで安全に動作するように設計されています。自然言語構成でスキーマ オブジェクトを登録すると、アプリケーションから `alloydb_ai_nl.get_sql()` 関数を呼び出して、わかりやすい英語の質問を SQL クエリに変換することや、`explain_sql` を使用してクエリを理解することが可能です。この機能は、セキュリティのために標準の PostgreSQL ロールや IAM と統合されています。また、[パラメータ化されたセキュアビュー](https://docs.cloud.google.com/alloydb/docs/parameterized-secure-views-overview?hl=ja)を使用して、きめ細かなアクセス制御を行えます。

設定を迅速化し、精度を確保するために、AlloyDB には、スキーマから**コンテキストの自動生成のための生産性向上ツール**が用意されています。こうしたツールは、スキーマ コンテキストを自動的に生成し、クエリ テンプレートを提案するため、手動で作業を開始する手間を省けます。ビジネスに固有のクエリ テンプレートを**テンプレート ストア**に追加すると、結果をさらに絞り込むことが可能です。基盤となるモデルは、ユーザーの意図とスキーマ コンテキストに基づいて、複数テーブルの結合、集計、ウィンドウ関数などの複雑な SQL を生成できます。コンテキストとテンプレートが多いほど、精度が向上します。

**注:** AlloyDB AI 自然言語の使用に関するフィードバックを送信するには、[ユーザー エクスペリエンス調査: AlloyDB AI 自然言語フォームを送信](https://docs.google.com/forms/d/e/1FAIpQLSfksRzklOU_T1aMVbI0tb0O5ZNpnone7XiD_KCBW2GWHo9uqA/viewform?hl=ja)してください。

![AlloyDB AI 自然言語のビジュアル概要](https://docs.cloud.google.com/static/alloydb/images/natural-language-landing.png?hl=ja)

## ユースケース

AlloyDB AI の自然言語クエリを一般的なビジネス シナリオに適用する方法について説明します。

ユースケース

ビジネスの目標

質問例

ビジネスへの影響

trending\_up セールス分析

販売実績を追跡し、上位の営業担当者を特定する

`"Who were our top 3 sales reps by revenue in Austin for the last quarter?"`

\- 意思決定の高速化
\- 即時のセルフサービス型セールス分析。

explore プロダクトの導入

ユーザーの行動と機能の導入を把握する

`"How many users on our 'Pro' plan used the new reporting feature last week?"`

\- イテレーションの高速化
\- 仮説を迅速に検証し、より優れたプロダクトを構築します。

local\_shipping サプライ チェーン

サプライ チェーンをモニタリングしてボトルネックを特定する

`"Show me all shipments from the Reno warehouse that are delayed by more than 3 days."`

\- 効率の向上
\- 運用上の問題を事前に解決します。

support\_agent カスタマー サポート

サポート チケットを分析して傾向を特定する

`"What is the most common complaint category for tickets created in the last 7 days?"`

\- サービス向上
\- お客様の懸案事項をより迅速に特定して解決します。

## 詳細

Google デベロッパー向けリソースで、AlloyDB を使用して自然言語クエリ アプリケーションを構築する方法を説明します。

チュートリアル

### [会話型アプリのチュートリアル](https://medium.com/google-cloud/alloydb-powered-conversational-commerce-using-natural-language-to-sql-google-cloud-serverless-38773a2f7eac)

AlloyDB AI とサーバーレスを使用して会話型コマースアプリを構築する方法を学習します。

ガイド

### [入門ガイド](https://docs.cloud.google.com/alloydb/docs/ai/generate-sql-queries-natural-language?hl=ja)

`get_sql()` 関数の設定、構成、使用に関する段階的なテクニカル ガイド。

Codelab

### [AlloyDB AI の自然言語を使用して SQL を生成する](https://codelabs.developers.google.com/alloydb-ai-nl-sql?hl=ja)

自然言語による SQL の生成に関するガイド付きチュートリアルを使用して、実践的な経験を積みます。

フィードバックを送信

特に記載のない限り、このページのコンテンツは[クリエイティブ・コモンズの表示 4.0 ライセンス](https://creativecommons.org/licenses/by/4.0/)により使用許諾されます。コードサンプルは [Apache 2.0 ライセンス](https://www.apache.org/licenses/LICENSE-2.0)により使用許諾されます。詳しくは、[Google Developers サイトのポリシー](https://developers.google.com/site-policies?hl=ja)をご覧ください。Java は Oracle および関連会社の登録商標です。

最終更新日 2026-05-16 UTC。
