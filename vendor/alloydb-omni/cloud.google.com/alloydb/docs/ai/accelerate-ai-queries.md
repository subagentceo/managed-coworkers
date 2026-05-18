 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=ko) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=ko)
-   [Documentation](https://docs.cloud.google.com/docs?hl=ko)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=ko)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=ko)

의견 보내기

# AI 함수를 사용하여 쿼리 성능 가속화 컬렉션을 사용해 정리하기 내 환경설정을 기준으로 콘텐츠를 저장하고 분류하세요.

**미리보기 — AI 함수 가속**

이 기능에는 [서비스별 약관](https://docs.cloud.google.com/terms/service-terms?hl=ko#1)의 일반 서비스 약관 섹션에 있는 'GA 이전 제품 또는 서비스 약관'이 적용됩니다. GA 이전 기능은 '있는 그대로' 제공되며 지원이 제한될 수 있습니다. 자세한 내용은 [출시 단계 설명](https://cloud.google.com/products/?hl=ko#product-launch-stages)을 참조하세요.

AI 함수 가속화를 사용하면 AI 함수를 사용하는 쿼리를 실행할 때 성능을 최적화할 수 있습니다. 복잡한 쿼리를 작성하지 않아도 [배열 기반 함수](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=ko#filter-batch-arrays)와 동일하거나 더 나은 성능을 제공합니다. AI 함수에 대한 자세한 내용은 [AI 함수 개요](https://docs.cloud.google.com/alloydb/docs/ai/ai-query-engine-landing?hl=ko)를 참고하세요.

AI 함수 가속은 다음 AI 함수를 지원합니다.

-   `ai.if`: 가속은 함수가 `WHERE` 절에 있는 `SELECT` 쿼리에만 적용됩니다. 스캔당 하나의 `ai.if` 함수를 지원하며 순차, 색인, 비트맵 힙 스캔과 함께 작동합니다. 쿼리에 여러 테이블, 관계 또는 공통 테이블 표현식 (CTE)에 대한 테이블 스캔이 포함된 경우 스캔당 하나의 `ai.if` 함수를 가속화할 수 있습니다.
-   `ai.rank`: 가속은 함수가 `ORDER BY` 절에 있는 `SELECT` 쿼리에만 적용됩니다. 스캔당 하나의 `ai.rank` 함수를 지원합니다. 쿼리에 여러 테이블 스캔(예: 서로 다른 테이블, 관계 또는 CTE)이 포함된 경우 스캔당 하나의 `ai.rank` 함수를 가속화할 수 있습니다.

**참고:** 이 기능은 PostgreSQL 17에서 생성된 AlloyDB 인스턴스에서만 사용할 수 있습니다.

## AI 기능 가속 사용 설정

AI 함수 가속을 사용 설정하려면 `google_ml_integration.enable_ai_function_acceleration` 플래그를 `on`로 설정합니다. 이 플래그는 기본적으로 사용 중지되어 있으며 쿼리 실행기가 적격한 AI 작업을 가속화를 위해 AI 함수 적용 노드로 오프로드할 수 있는지 여부를 제어합니다. 설정하지 않거나 `off`로 설정하면 모든 쿼리 작업이 표준 PostgreSQL 실행자에 의해 실행됩니다.

세션 또는 인스턴스 수준에서 이 플래그를 구성할 수 있습니다.

인스턴스 수준에서 AI 함수 가속을 사용 설정하려면 `gcloud alloydb instances update` 명령어를 사용하세요.

```
gcloud alloydb instances update INSTANCE_ID \
  --database-flags google_ml_integration.enable_ai_function_acceleration=on \
  --region=REGION_ID \
  --cluster=CLUSTER_ID \
  --project=PROJECT_ID
```

다음을 바꿉니다.

-   `INSTANCE_ID`: 업데이트하려는 인스턴스의 ID입니다.
-   `REGION_ID`: 클러스터가 있는 리전의 ID입니다. 자세한 내용은 [지원되는 리전](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-lite?hl=ko#supported-regions)을 참고하세요.
-   `CLUSTER_ID`: 클러스터의 ID입니다.
-   `PROJECT_ID`: 프로젝트의 ID

인스턴스 수준 플래그를 설정하는 방법에 대한 자세한 내용은 [데이터베이스 플래그 구성](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=ko)을 참고하세요.

## AI 함수 가속화 확인

AI 함수 가속이 사용 설정되어 있는지 확인하려면 `EXPLAIN` 문을 사용하여 쿼리를 분석하면 됩니다.

### `ai.if` 쿼리의 AI 함수 가속화 확인

다음 예시에서는 현재 세션에 AI 함수 가속을 사용 설정하고 `ai.if` 함수를 사용하여 쿼리를 실행하는 방법을 보여줍니다.

```
SET google_ml_integration.enable_ai_function_acceleration = on;

EXPLAIN (COSTS OFF) SELECT r.name
FROM restaurant_reviews r
WHERE ai.if('Is the following a positive review? Review: '||r.review) AND r.city = 'Los Angeles'
GROUP BY r.name
HAVING count(*) > 20
ORDER BY r.name;
```

`EXPLAIN` 문을 사용하여 쿼리를 분석하면 쿼리 계획에 `AI Function Apply` 노드가 표시됩니다.

                                       ```
                                       QUERY PLAN                                       
----------------------------------------------------------------------------------------
 GroupAggregate
   Group Key: name
   Filter: (count(*) > 20)
   ->  Sort
         Sort Key: name
         ->  AI Function Apply
               Filter: ai.if((('Is the following a positive review? Review: '::text || review)), NULL::character varying)
               ->  Index Scan using idx_restaurant_reviews_city on restaurant_reviews r
                     Index Cond: ((city)::text = 'Los Angeles'::text)
```

### `ai.rank` 쿼리의 AI 함수 가속화 확인

다음 예시에서는 현재 세션에 AI 함수 가속을 사용 설정하고 `ai.rank` 함수를 사용하여 쿼리를 실행하는 방법을 보여줍니다.

```
SET google_ml_integration.enable_ai_function_acceleration = on;

EXPLAIN (COSTS OFF) SELECT r.name, r.review
FROM restaurant_reviews r
WHERE r.city = 'Los Angeles'
ORDER BY ai.rank('Rank these reviews based on how much they emphasize high-quality ingredients. Review: ' || r.review) DESC
LIMIT 50;
```

`EXPLAIN` 문을 사용하여 쿼리를 분석하면 쿼리 계획에 `AI Function Apply` 노드가 표시됩니다.

                                       ```
                                       QUERY PLAN                                       
----------------------------------------------------------------------------------------
 Limit
  ->  Sort
        Sort Key: (ai.rank(('Rank these reviews based on how much they emphasize high-quality ingredients. Review: ' || r.review'), NULL)) DESC
        ->  AI Function Apply
              ->  Bitmap Heap Scan on restaurant_reviews r
                    Recheck Cond: (city = 'Los Angeles')
                    ->  Bitmap Index Scan on idx_restaurant_reviews_city
                          Index Cond: (city = 'Los Angeles')
```

쿼리 계획의 `AIFunctionApply` 노드는 쿼리에서 AI 함수 가속을 사용했음을 나타냅니다. 이 노드가 없으면 쿼리에서 표준 PostgreSQL 실행을 사용한 것입니다.

## 제한사항

-   함수의 기본 인수만 지원됩니다. `ai.if` 및 `ai.rank`의 경우 `prompt` 인수는 열 참조이거나 열 참조와 연결된 문자열 리터럴이어야 합니다. 다른 인수는 단순 상수여야 합니다. 지원되는 `prompt` 인수의 예는 다음과 같습니다.
    -   `ai.if(r.review)`
    -   `ai.if('Is this true? : ' || r.review)`
    -   `ai.rank(r.review)`
    -   `ai.rank('Rate this review: ' || r.review)`
-   `WHERE` 절에 `ai.if`이 있거나 `ORDER BY` 절에 `ai.rank`이 있는 `SELECT` 쿼리만 지원됩니다.
-   테이블 스캔당 하나의 AI 함수만 지원됩니다.
-   기본 Gemini 모델만 지원됩니다. 자세한 내용은 [Gemini 모델](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini?hl=ko)을 참고하세요. 다른 모델을 사용하려면 `google_ml_integration.default_llm_model` 플래그를 사용하려는 모델 ID로 설정하면 됩니다.
-   이 기능은 `gemini-2.5-flash-lite` 모델을 지원하는 리전 또는 `google_ml_integration.default_llm_model` 플래그를 사용하여 설정한 LLM 모델의 리전에서만 사용할 수 있습니다. 자세한 내용은 [지원되는 리전](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-lite?hl=ko#supported-regions)을 참고하세요.

## 다음 단계

-   [AI 함수를 사용하여 지능형 SQL 쿼리 실행](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=ko)
-   [최적화된 함수를 사용하여 AI 쿼리 가속화](https://docs.cloud.google.com/alloydb/docs/ai/accelerate-queries-optimized-functions?hl=ko)
-   [배열 기반 함수를 사용하여 필터링 실행](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=ko#filter-batch-arrays)

의견 보내기

달리 명시되지 않는 한 이 페이지의 콘텐츠에는 [Creative Commons Attribution 4.0 라이선스](https://creativecommons.org/licenses/by/4.0/)에 따라 라이선스가 부여되며, 코드 샘플에는 [Apache 2.0 라이선스](https://www.apache.org/licenses/LICENSE-2.0)에 따라 라이선스가 부여됩니다. 자세한 내용은 [Google Developers 사이트 정책](https://developers.google.com/site-policies?hl=ko)을 참조하세요. 자바는 Oracle 및/또는 Oracle 계열사의 등록 상표입니다.

최종 업데이트: 2026-05-17(UTC)