 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=zh-tw) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=zh-tw)
-   [Documentation](https://docs.cloud.google.com/docs?hl=zh-tw)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=zh-tw)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=zh-tw)
-   [指南](https://docs.cloud.google.com/alloydb/docs/overview?hl=zh-tw)

提供意見

# 總結內容重點 透過集合功能整理內容 你可以依據偏好儲存及分類內容。

**預覽**

這項功能適用《[服務專屬條款](https://docs.cloud.google.com/terms/service-terms?hl=zh-tw#1)》中「一般服務條款」一節的《正式發布前產品條款》。正式發布前功能是依「原樣」提供，支援服務可能受限。 詳情請參閱[推出階段說明](https://cloud.google.com/products/?hl=zh-tw#product-launch-stages)。

**注意：** 這項實驗功能是正式發布前產品。

`ai.summarize` 函式會運用 Gemini 等大型語言模型 (LLM)，將輸入文字改寫並重組為最精簡的形式。這項功能可擷取文件的核心論點，同時保留原始作者的語氣和細微差異。使用這項功能，您不必手動審查，就能從大量資料集中擷取重要發現項目和結論，並在提示詞中指定字數或句子限制等限制條件，控制輸出內容的長度。您也可以使用批次處理或以游標為準的快照，非同步處理數百萬列資料。

**注意：** PostgreSQL 17 以上版本支援 `ai.summarize` 函式。

AlloyDB AI 內容摘要功能支援多種用途，包括但不限於：

-   會議轉錄稿：歸納對話內容，著重於決策和待辦事項。
-   技術文件：將複雜的方法、結果和影響濃縮成高階總覽。
-   客戶服務記錄：將多則使用者評論或支援單彙整為常見問題的單一摘要。

## 事前準備

使用 `ai.summarize` 函式前，請確認您符合下列條件。

### 啟用擴充功能

確認您已安裝最新版擴充功能 (1.5.7 以上版本)，並啟用「預覽」功能。`google_ml_integration.enable_preview_ai_functions`

如要在 AlloyDB 中啟用 `google_ml_integration.enable_preview_ai_functions` 旗標，請使用 `SET` 指令。這個標記可控管 AI 預覽功能 (例如 `ai.summarize`) 的存取權。

1.  確認 `google_ml_integration extension` 為 1.5.7 以上版本。如要查看版本，請執行下列指令：

    ```
    SELECT extversion FROM pg_extension WHERE extname = 'google_ml_integration';
    ```

    如要升級至包含這些預先發布版函式的版本，請呼叫下列項目：

    ```
    CALL google_ml.upgrade_to_preview_version();
    ```

2.  為目前工作階段或整個資料庫啟用旗標。如要為目前的工作階段啟用旗標，請執行下列指令：

    ```
    SET google_ml_integration.enable_preview_ai_functions = 'on';
    ```

    這項變更不需要重新啟動資料庫。這個旗標的預設值為 `off`。


### 建立範例資料表

如要按照本文中的摘要函式範例操作，請建立資料表並填入下列電影評論。

```
CREATE TABLE movie_reviews (
    id INT PRIMARY KEY,
    movie_id INT,
    review TEXT
);

INSERT INTO movie_reviews (id, movie_id, review) VALUES
(1, 1, 'The Midnight Echo represents a masterclass in atmospheric tension. The cinematography captures the isolation of the frozen tundra perfectly while the lead actor delivers a superb performance. Although the pacing slows down significantly in the second act, the final twist remains unexpected. This is a truly remarkable experience.'),
(2, 1, 'Neon Velocity delivers high octane action but lacks the narrative depth required to make the stakes feel real. The visual effects are undeniably stunning, creating a vibrant cyberpunk world that pops off the screen. However, the dialogue feels cliched and the secondary characters are thin. This film is a shallow blockbuster.'),

-- more rows are present in this table
```

## 摘要單一字串

如要處理單一文字區塊，請使用 `ai.summarize` 的純量版本。

```
SELECT ai.summarize(
  prompt => 'TEXT_CONTENT',
  model_id => 'MODEL_ID' -- Optional
);
```

執行下列範例查詢，簡要歸納電影評論：

```
SELECT ai.summarize(review) FROM movie_reviews;
```

以下是輸出範例：

 ```
 id |                         summary
----+-----------------------------------------------------------
  1 | "Atmospheric thriller with a haunting performance and shocking twist."
  2 | "Visually stunning cyberpunk action film lacks narrative depth."
...
```

## 分批摘要

如要有效處理多筆記錄，請使用以陣列為基礎的版本。

```
SELECT ai.summarize(
  prompts => TEXT[],
  batch_size => INT, -- Optional. The default is 10.
  model_id => VARCHAR(100) -- Optional. The default value is gemini-2.5-flash-lite.
);
```

以下範例說明如何使用陣列版 `ai.summarize` 函式，在單一呼叫中有效處理多筆文字記錄。

```
WITH summarized_results AS (
SELECT
  ARRAY_AGG(id ORDER BY id) as ids,
  ai.summarize(
    prompts => array_agg( 'Please summarize this in max 10 words, review : ' || review
      ORDER BY id),
    batch_size => 15) as summaries
FROM movie_reviews
),
correlated_results AS (
    SELECT ids[i] as ID, summaries[i] as summary
    FROM summarized_results,
    generate_series(1, array_length(ids, 1)) AS i
)
SELECT movie_reviews.id, correlated_results.summary as summary
FROM movie_reviews
JOIN correlated_results ON movie_reviews.id = correlated_results.id
ORDER BY movie_reviews.id DESC ;
```

以下是輸出範例：

 ```
 id | summary
---+----------------------------------------------------------------------------
  1 | "Masterclass in tension, haunting performance with a twist."
  2 | "High octane action, stunning visuals, shallow blockbuster."
  3 | "Gentle, moving exploration of  emotional honesty."
```

## 使用游標生成摘要

您可以使用游標有效處理可能數量龐大的評論集，將這些評論提供給 AI 函式，然後逐一處理結果，再將結果儲存回資料庫。

以下範例說明如何搭配 `ai.summarize` 函式使用游標，有效處理 `movie_reviews` 資料表中的資料列、為每則評論產生摘要，並將這些摘要儲存在名為 `review_summaries` 的新資料表中。這種以游標為基礎的方法，適用於處理可能過於龐大而無法在單一批次中處理，或一次載入記憶體的大型資料集。

`input_cursor` 參數會採用 `REFCURSOR`。也就是說，您需要提供游標名稱，做為 SQL 查詢結果的指標。接著，`ai.summarize` 函式會從這個游標擷取資料，做為摘要的輸入內容。

```
CREATE OR REPLACE FUNCTION ai.summarize(
  prompt TEXT,
  input_cursor REFCURSOR,
  batch_size INT DEFAULT NULL,
  model_id VARCHAR(100) DEFAULT NULL)
RETURNS REFCURSOR
```

下列範例會建立資料表 `review_summaries` (如有需要)，然後逐一處理電影評論、使用 AI 函式為每則評論生成簡要摘要，並將摘要連結至原始評論 ID，儲存在資料表中。

```
-- Create a table to store the results
CREATE TABLE IF NOT EXISTS review_summaries (
    review_id INT,
    summary_text TEXT
);

DO $$
DECLARE
    -- Use descriptive cursor and variable names
    review_cursor   REFCURSOR;
    result_record   RECORD;
    cursor_response  REFCURSOR;
    id_array        INT[];
    idx             INT := 1;
BEGIN
    -- 1. Open cursor for the input text
    OPEN review_cursor FOR
        SELECT review AS prompt FROM movie_reviews ORDER BY id;

    -- 2. Call the AI summarize function
    cursor_response := ai.summarize(
        prompt       => 'Please summarize the following review in max 10 words: ',
        input_cursor => review_cursor
    );

    -- 3. Map IDs into an array to maintain relational integrity during the loop
    SELECT ARRAY_AGG(id ORDER BY id) INTO id_array FROM movie_reviews;

    -- 4. Iterate through AI results and insert into the results table
    LOOP
        FETCH cursor_response INTO result_record;
        EXIT WHEN NOT FOUND;

        INSERT INTO review_summaries (review_id, summary_text)
        VALUES (id_array[idx], result_record.output);

        idx := idx + 1;
    END LOOP;

    -- 5. Clean up cursors
    CLOSE review_cursor;
    CLOSE cursor_response;
END;
$$;

-- Verify results
SELECT * FROM review_summaries;
```

以下是輸出範例：

 ```
 review_id | summary_text
-----------+---------------------------------------------------------------------------
         1 | "Masterclass in atmospheric tension with haunting performance, devastating twist."
         2 | "High octane action, stunning visuals, but shallow blockbuster."
         3 | "Gentle, moving exploration of grief with poetic screenplay."
```

## 匯總資料列的摘要

`ai.agg_summarize` 函式會在資料欄的多個資料列中運作。 這項功能會將值匯總為統一提示，為整個群組產生單一摘要。

下列 SQL 查詢會使用 `ai.agg_summarize` 匯總函式，根據 `movie_reviews` 資料表中的所有評論，為每個 `movie_id` 生成單一的統一摘要。

```
select ai.agg_summarize(review) from movie_reviews group by movie_id;
```

`ai.summarize` 會個別摘要每個資料列，但 `ai.agg_summarize` 會將多個資料列的文字合併為單一輸入內容，為整個資料列群組產生一份整合摘要。

以下是輸出範例：

```
agg_summarize
"The Midnight Echo is a masterclass in atmospheric tension, featuring haunting performances and stunning cinematography, though its pacing falters in the second act before a final twist. Neon Velocity offers stunning visual effects and high-octane action within a vibrant cyberpunk world, but suffers from shallow narrative depth, cliched dialogue, and underdeveloped characters. Garden of Whispers is a gentle, moving, and emotionally honest exploration of and life, characterized by poetic screenwriting and natural performances. Shadow Protocol ambitiously attempts to reinvent the spy thriller with a non-linear narrative and precise action, but ultimately confuses the audience and presents a derivative central mystery. The Last Alchemist uniquely blends historical drama with subtle fantasy, boasting meticulous production design and electric chemistry between its protagonists."
```

## 後續步驟

-   [評估情緒](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-sentiment?hl=zh-tw)。
-   閱讀 [AI 函式總覽](https://docs.cloud.google.com/alloydb/docs/ai/ai-query-engine-landing?hl=zh-tw)。

提供意見

除非另有註明，否則本頁面中的內容是採用[創用 CC 姓名標示 4.0 授權](https://creativecommons.org/licenses/by/4.0/)，程式碼範例則為[阿帕契 2.0 授權](https://www.apache.org/licenses/LICENSE-2.0)。詳情請參閱《[Google Developers 網站政策](https://developers.google.com/site-policies?hl=zh-tw)》。Java 是 Oracle 和/或其關聯企業的註冊商標。

上次更新時間：2026-05-16 (世界標準時間)。
