 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=es) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=es)
-   [Documentation](https://docs.cloud.google.com/docs?hl=es)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=es)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=es)
-   [Guías](https://docs.cloud.google.com/alloydb/docs/overview?hl=es)

Enviar comentarios

# Hacer consultas SQL inteligentes con funciones de IA Organízate con las colecciones Guarda y clasifica el contenido según tus preferencias.

**Vista previa**

Esta función está sujeta a los "Términos de las Ofertas de Acceso Previo a la Disponibilidad General" de la sección Términos Generales de los Servicios de los [Términos Específicos de los Servicios](https://docs.cloud.google.com/terms/service-terms?hl=es#1). Las funciones previas a la disponibilidad general están disponibles tal cual y pueden tener una compatibilidad y asistencia limitadas. Para obtener más información, consulta las [descripciones de las fases de lanzamiento](https://cloud.google.com/products/?hl=es#product-launch-stages).

**Nota:** Este lanzamiento experimental es una oferta previa a la disponibilidad general.

En esta página se describe cómo hacer consultas con operadores de SQL basados en IA proporcionados por funciones de IA. Puedes usar los operadores `ai.if`, `ai.rank` y `ai.generate` para combinar lenguaje natural con consultas SQL.

Para seguir las instrucciones de esta página, debes tener conocimientos de AlloyDB y estar familiarizado con los conceptos de IA generativa.

AlloyDB AI reserva y crea el esquema [`ai`](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=es).

## Antes de empezar

Antes de usar el lenguaje natural en los operadores de SQL, haz lo siguiente:

-   [Verifica que la extensión `google_ml_integration` esté instalada.](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=es#verify-installed-extension)
-   [Verifica que la marca `google_ml_integration.enable_model_support` esté definida como `on`](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=es).
-   [Integración con Vertex AI.](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=es)
-   [Usa un modelo de Gemini que esté disponible en tu zona](#use-gemini-model).

### Integrar Vertex AI e instalar la extensión

1.  [Configura el acceso de los usuarios a los modelos de Vertex AI](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=es).
2.  Comprueba que tienes instalada la versión más reciente de `google_ml_integration`.
    1.  Para comprobar la versión instalada, ejecuta el siguiente comando:

                SELECT extversion FROM pg\_extension WHERE extname \= 'google\_ml\_integration';
                extversion
                \------------
                1.5.2
                (1 row)

    2.  Si la extensión no está instalada o la versión instalada es anterior a la 1.5.2, actualízala.

                CREATE EXTENSION IF NOT EXISTS google\_ml\_integration;
                ALTER EXTENSION google\_ml\_integration UPDATE;


        Si tienes problemas al ejecutar los comandos anteriores o si la extensión no se actualiza a la versión 1.5.2 después de ejecutar los comandos anteriores, ponte en contacto con el [Google Cloud equipo de Asistencia](https://cloud.google.com/support?hl=es).

3.  Para usar la función del motor de consultas de AlloyDB AI, define la marca `google_ml_integration.enable_ai_query_engine` en `true`.

    ### SQL

    1.  Habilita el motor de consultas de IA para la sesión actual.

                      SET google\_ml\_integration.enable\_ai\_query\_engine \= true;

    2.  Habilita funciones para una base de datos específica en todas las sesiones.

                      ALTER DATABASE DATABASE\_NAME SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';

    3.  Habilita el motor de consultas de IA para un usuario específico en todas las sesiones y bases de datos.

                      ALTER ROLE postgres SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';


    ### Consola

    Para modificar el valor de la marca `google_ml_integration.enable_ai_query_engine`, sigue los pasos que se indican en [Configurar las marcas de base de datos de una instancia](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=es#console).

    ### gcloud

    Para usar la CLI de gcloud, puedes [instalar e inicializar](https://docs.cloud.google.com/sdk/docs/install?hl=es) Google Cloud CLI o usar [Cloud Shell](https://docs.cloud.google.com/shell/docs/using-cloud-shell?hl=es).

    Puedes modificar el valor de la marca `google_ml_integration.enable_ai_query_engine`. Para obtener más información, consulta [Configurar las marcas de la base de datos de una instancia](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=es#console).

                 gcloud alloydb instances update INSTANCE\_ID \\
                   --database-flags google\_ml\_integration.enable\_ai\_query\_engine=on \\
                   --region=REGION\_ID \\
                   --cluster=CLUSTER\_ID \\
                   --project=PROJECT\_ID


### Usar un modelo de Gemini que esté disponible en tu zona

Si tu clúster de AlloyDB para PostgreSQL se encuentra en una región en la que `gemini-2.0-flash`no está disponible, puedes usar uno de los otros modelos de Gemini disponibles en tu región mediante la `model_id parameter`.

**Nota:** Comprueba la disponibilidad del modelo en tu zona. Para obtener más información, consulta [Gemini 2.0 Flash](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash?hl=es).

También puedes registrar un endpoint de modelo de Gemini y proporcionar ese ID de modelo a los operadores de IA. Para obtener más información, consulta [Registrar y llamar a modelos de IA remotos con la gestión de endpoints de modelos](https://docs.cloud.google.com/alloydb/docs/ai/register-model-endpoint?hl=es).

En el siguiente ejemplo se muestra cómo registrar otro endpoint de Gemini. En este ejemplo, este segundo endpoint de Gemini es el endpoint global de `gemini-2.0-flash`. Puedes usar este modelo registrado con operadores de IA si pasas `model_id =>`gemini-2.0-flash-global\` como argumento adicional.

```
CALL
  google_ml.create_model(
    model_id => 'gemini-2.0-flash-global',
    model_type => 'llm',
    model_provider => 'google',
    model_qualified_name => 'gemini-2.0-flash',
    model_request_url =>  'https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent',
    model_auth_type => 'alloydb_service_agent_iam'
);
```

#### Usar modelos de Gemini 3.0

Algunos modelos de Gemini, como `gemini-3.0-pro-preview`, solo están disponibles a través del endpoint global. Debes registrar estos modelos de la siguiente manera:

```
CALL
  google_ml.create_model(
    model_id => 'gemini-3-preview-model',
    model_request_url => 'https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-3-pro-preview:generateContent',
    model_qualified_name => 'gemini-3-pro-preview',
    model_provider => 'google',
    model_type => 'llm',
    model_auth_type => 'alloydb_service_agent_iam'
);
```

Sustituye `PROJECT_ID` por el ID del proyecto en el que está disponible el modelo de Vertex AI. Ten en cuenta que la cuenta de servicio de AlloyDB debe tener el [rol de usuario de Vertex AI](https://docs.cloud.google.com/vertex-ai/docs/general/access-control?hl=es#predefined-roles) en ese proyecto.

Una vez que hayas registrado el modelo, podrás usarlo en funciones de IA de la siguiente forma:

```
SELECT ai.generate(prompt => 'What is AlloyDB?', model_id => 'gemini-3-preview-model');
```

## Usar filtros en las consultas

AlloyDB AI ofrece varias funciones de SQL basadas en IA que te permiten usar el procesamiento del lenguaje natural y los LLMs directamente en tus consultas de bases de datos, incluidos los operadores `ai.if` y `ai.rank`.

### Filtros

Para evaluar si se cumple una condición expresada en lenguaje natural, usa el operador `ai.if`/`google_ml.if`. La función devuelve el valor booleano true o false y `false` si la salida no se detecta claramente.

```
- Function signature
FUNCTION ai.if(prompt TEXT, model_id VARCHAR(100) DEFAULT NULL) RETURNS bool
```

En el siguiente ejemplo se muestra el uso del operador `ai.if` como filtro para encontrar restaurantes con más de 500 reseñas positivas ubicados en ciudades con una población superior a 100.000 habitantes. En el ejemplo se usa `restaurant_reviews` y se incluyen datos como reseñas y la ubicación de la ciudad. El operador `ai.if` te ayuda a entender el sentimiento de las reseñas y a combinar las ubicaciones de la base de datos con el conocimiento general de Gemini sobre la población de esas ubicaciones.

```
SELECT r.name, r.location_city
FROM restaurant_reviews r
WHERE
  AI.IF(r.location_city || ' has a population OF more than 100,000 AND the following is a positive review; Review: ' || r.review)
GROUP BY r.name, r.location_city
HAVING COUNT(*) > 500;
```

A continuación, se muestra el mismo ejemplo con el modelo que has registrado en [Usar un modelo de Gemini compatible en tu región](#use-gemini-model).

```
SELECT r.name, r.location_city
FROM restaurant_reviews r
WHERE
  AI.IF(r.location_city || ' has a population of more than 100,000 AND the following is a positive review; Review: ' || r.review, model_id => 'gemini-2.0-flash-global')
GROUP BY r.name, r.location_city
HAVING COUNT(*) > 500;
```

#### Realizar una combinación en una consulta que usa el operador if

Para realizar una operación de unión, usa el operador `ai.if`/`google_ml.if` con join. La siguiente consulta de ejemplo busca el número de reseñas que mencionan cada elemento del menú del restaurante.

    ```
    SELECT item_name, COUNT(*)
    FROM menu_items JOIN user_reviews
      ON ai.if(
        prompt => 'Does the following user review talk about the menu item mentioned ? review: ' || user_reviews.review_text || ' menu item: ' || item_name)
    GROUP BY item_name;
```

## Generación y resumen de texto

La función `ai.generate` genera texto combinando los datos proporcionados con la petición del usuario.

```
-- Function Signature
FUNCTION ai.generate(prompt TEXT, model_id VARCHAR(100) DEFAULT NULL) RETURNS TEXT
```

Por ejemplo, puedes usar la siguiente consulta para generar un resumen conciso de cada reseña de usuario.

```
SELECT
  ai.generate(
    prompt => 'Summarize the review in 20 words or less. Review: ' || review) AS review_summary
FROM user_reviews
```

## Puntuación de los resultados de las consultas

Si necesitas ordenar los resultados de una consulta mediante instrucciones personalizadas en lenguaje natural, usa el operador `ai.rank`. Esta función te permite proporcionar una petición que describe los criterios de clasificación y devuelve una puntuación para cada elemento.

```
-- Function signature
FUNCTION ai.rank(prompt TEXT, model_id VARCHAR(100) DEFAULT NULL) RETURNS real
```

Por ejemplo, la siguiente consulta obtiene las 20 reseñas de restaurantes más positivas mediante las puntuaciones de un LLM.

```
SELECT review AS top20
FROM user_reviews
ORDER BY ai.rank(
  'Score the following review according to these rules:
  (1) Score OF 8 to 10 IF the review says the food IS excellent.
  (2) 4 to 7 IF the review says the food is ok.
  (3) 1 to 3 IF the review says the food is not good. Here is the review:' || review) DESC
LIMIT 20;
```

## Siguientes pasos

-   [Registra un endpoint de modelo con la gestión de endpoints de modelos](https://docs.cloud.google.com/alloydb/docs/ai/register-model-endpoint?hl=es).

-   [Clasifica y puntúa los resultados de búsqueda para RAG.](https://docs.cloud.google.com/alloydb/docs/ai/rank-rerank-search-results-rag?hl=es)

-   [Filtrar semánticamente las consultas de SQL y clasificar los resultados.](https://codelabs.developers.google.com/alloydb-ai-operators?hl=es)

-   [Realizar previsiones de series temporales](https://docs.cloud.google.com/alloydb/docs/ai/perform-time-series-forecasting?hl=es)


Enviar comentarios

A menos que se indique lo contrario, el contenido de esta página está sujeto a la [licencia Reconocimiento 4.0 de Creative Commons](https://creativecommons.org/licenses/by/4.0/) y las muestras de código están sujetas a la [licencia Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para obtener más información, consulta las [políticas del sitio web de Google Developers](https://developers.google.com/site-policies?hl=es). Java es una marca registrada de Oracle o sus afiliados.

Última actualización: 2026-01-15 (UTC).
```
