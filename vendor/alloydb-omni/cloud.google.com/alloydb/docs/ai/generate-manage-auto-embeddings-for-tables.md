 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=es) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=es)
-   [Documentation](https://docs.cloud.google.com/docs?hl=es)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=es)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=es)
-   [Guías](https://docs.cloud.google.com/alloydb/docs/overview?hl=es)

Enviar comentarios

# Generar y gestionar incrustaciones de vectores automáticas para tablas grandes Organízate con las colecciones Guarda y clasifica el contenido según tus preferencias.

**Vista previa**

Esta función está sujeta a los "Términos de las Ofertas de Acceso Previo a la Disponibilidad General" de la sección Términos Generales de los Servicios de los [Términos Específicos de los Servicios](https://docs.cloud.google.com/terms/service-terms?hl=es#1). Las funciones previas a la disponibilidad general están disponibles tal cual y pueden tener una compatibilidad y asistencia limitadas. Para obtener más información, consulta las [descripciones de las fases de lanzamiento](https://cloud.google.com/products/?hl=es#product-launch-stages).

Puedes generar y gestionar inserciones de vectores de una columna de una tabla completa, lo que te ofrece una solución escalable para crear inserciones de vectores a gran escala. Esta solución es especialmente útil para facilitar la búsqueda semántica y la generación aumentada de recuperación (RAG) en contenido de texto, como los siguientes:

-   Crear una incrustación de vector inicial para una tabla nueva
-   Generar inserciones después de importar una gran cantidad de datos
-   Actualizar las inserciones después de hacer cambios significativos en los datos
-   Mantener las inserciones de forma incremental

## Acerca de las incrustaciones de vectores automáticas

Las inserciones de vectores automáticas de AlloyDB ofrecen una forma escalable de automatizar la generación y el mantenimiento de inserciones de vectores para tus datos. En lugar de generar manualmente las inserciones de cada texto nuevo o actualizado, puedes configurar las inserciones de vectores automáticas para que se encarguen de este proceso. Esto es especialmente útil para las aplicaciones que dependen de las inserciones actualizadas para la búsqueda semántica, la generación aumentada de recuperación (RAG) y otras funciones basadas en IA.

Con las incrustaciones de vectores automáticas, puedes hacer lo siguiente:

-   Inicializar las inserciones de una tabla completa: genera inserciones de todos los datos de una columna de una tabla con un solo comando.
-   Mantener las inserciones sincronizadas: actualiza automáticamente las inserciones cuando cambien los datos de origen para que tus aplicaciones de IA siempre trabajen con la información más reciente.
-   Generar embeddings a gran escala: crea embeddings de forma eficiente para tablas grandes con millones de filas.
-   Configura y gestiona las inserciones de varias columnas de la misma tabla llamando a las funciones de gestión de cada columna de inserción.

Esta función simplifica el desarrollo y el mantenimiento de aplicaciones de IA al abstraer la complejidad de la creación y el mantenimiento de incrustaciones de vectores.

**Nota:** Las inserciones vectoriales automáticas solo se admiten en tablas de PostgreSQL normales y permanentes. No admite tablas particionadas, tablas temporales ni tablas sin registro.

## Antes de empezar

Antes de generar y gestionar las inserciones vectoriales de tablas grandes, haz lo siguiente:

-   [Conéctate a tu base de datos mediante `psql`](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=es) o AlloyDB para PostgreSQL Studio como usuario `postgres`.
-   [Verifica que la extensión `google_ml_integration` esté instalada.](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=es#verify-installed-extension)
-   [Verifica que la marca google\_ml\_integration.enable\_model\_support esté definida como `on`.](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=es)
-   Comprueba que la extensión `google_ml_integration` sea la versión 1.5.2 o una posterior y que la marca [`google_ml_integration.enable_faster_embedding_generation`](https://docs.cloud.google.com/alloydb/docs/reference/database-flags?hl=es) esté definida como `on`.
    
    Para comprobar la versión de tu extensión con el siguiente comando:
    
    ```
    SELECT extversion FROM pg_extension WHERE extname = 'google_ml_integration';
    ```
    
    Si necesitas actualizar la extensión, usa el comando `ALTER EXTENSION google_ml_integration UPDATE;`.
    
    **Nota:** Si no tienes los permisos necesarios, ponte en contacto con el administrador de tu base de datos para realizar la actualización. También puedes esperar a que la nueva versión se implemente automáticamente en tu clúster.
    
-   Antes de generar incrustaciones a partir de una base de datos de AlloyDB, debes configurar AlloyDB para que funcione con Vertex AI. Para obtener más información, consulta [Integrar tu base de datos con Vertex AI](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=es).
    
-   Para gestionar y monitorizar la generación de inserciones automáticas, los usuarios tienen acceso `Select` a las tablas `google_ml.embed_gen_progress` y `google_ml.embed_gen_settings` de forma predeterminada.
    
    Para permitir que un usuario gestione la generación de inserciones automáticas, concédele los permisos `INSERT`, `UPDATE` y `DELETE` en las tablas `google_ml.embed_gen_progress` y `google_ml.embed_gen_settings`:
    
    ```
    GRANT INSERT, UPDATE, DELETE ON google_ml.embed_gen_progress TO 'USER_NAME';
    ```
    
    Haz los cambios siguientes:
    
    -   USER\_NAME: el nombre del usuario al que se le conceden los permisos.
-   Verifica que `AUTOCOMMIT` esté configurado como `ON` en el cliente de PostgreSQL que utilices.
    
-   Confirma que el modelo de incrustaciones que usas tiene suficiente cuota para las incrustaciones de vectores automáticas. Si la cuota es insuficiente, la operación de inserción automática puede ser lenta o fallar. Por ejemplo, estos son los límites de los modelos de inserciones de Vertex AI:
    
    -   [Límites de inserciones de texto:](https://docs.cloud.google.com/vertex-ai/docs/quotas?hl=es#text-embedding-limits) cada solicitud puede tener hasta 250 textos de entrada, lo que genera una inserción por texto de entrada, y 20.000 tokens por solicitud. Solo se usan los primeros 2048 tokens de cada texto de entrada para calcular las inserciones.
    -   [Solicitudes por minuto:](https://docs.cloud.google.com/vertex-ai/docs/quotas?hl=es#view-the-requests-per-minute-rpm-quotas-by-region-and-by-model) la cuota pertinente es `Regional online prediction requests per base model per minute per region per base_model`.
    -   En el modelo `text-embedding-005`, la dimensión `base_model` de la consola Google Cloud es `textembedding-gecko`.
    -   En el modelo `gemini-embedding-001`, la dimensión `base_model` es `gemini-embedding`.
        
    -   [Límite de tokens del modelo de inserción de Gemini:](https://docs.cloud.google.com/vertex-ai/docs/quotas?hl=es#embed-content-input-tokens-per-minute-per-base-model) A diferencia de otros modelos de inserción, que estaban limitados principalmente por las cuotas de RPM, la serie de modelos de inserción de Gemini está limitada a 5.000.000 de tokens por minuto y por proyecto. La cuota correspondiente es `Embed content input tokens per minute per region per base_model`.
        

## Inicializar embeddings de una tabla

Las funciones para gestionar las inserciones vectoriales automáticas están disponibles en el esquema `ai`. Este esquema proporciona una interfaz para las funciones de IA más recientes de AlloyDB.

Usa la función `ai.initialize_embeddings()` SQL para generar las inserciones de la columna de contenido de una tabla. Esta es una llamada de bloqueo:

-   Si la función devuelve un valor que indica que el proceso se ha completado correctamente, la creación de la incrustación de vector habrá finalizado.
-   La función intenta recuperarse automáticamente de problemas transitorios, como errores de cuota de modelos. Solo se te devolverá un error si estos intentos de recuperación no tienen éxito. Si se producen problemas persistentes, como una configuración incorrecta de `batch_size` que provoca que la solicitud supere los límites de tamaño o si la operación se ha cancelado manualmente, debes volver a emitir la llamada manualmente.

**Nota:** Si la llamada `ai.initialize_embeddings()` falla, primero debes limpiar la configuración con la función `ai.drop_embedding_config()` antes de volver a emitir la llamada. Por ejemplo, `SELECT ai.drop_embedding_config('my_table');`.

Esta función admite modelos proporcionados por Google (por ejemplo, `text-embedding-005` de Vertex AI) y modelos personalizados que hayas registrado.

Antes de generar embeddings, crea una columna `content_embeddings` en tu tabla. Esta columna suele tener el tipo `vector(DIMENSION)` y el valor `DEFAULT NULL`.

```
ALTER TABLE user_reviews ADD COLUMN IF NOT EXISTS content_embeddings vector(768) DEFAULT NULL;
```

## Generar contenido por lotes

De forma predeterminada, AlloyDB usa el procesamiento por lotes para generar incrustaciones de varias entradas de texto en una sola solicitud, lo que mejora la eficiencia. Si no proporciona un tamaño de lote específico, AlloyDB aplica un valor predeterminado determinado automáticamente.

### Tamaño del lote de sugerencias

El parámetro `batch_size` de `ai.initialize_embeddings` te permite guiar al optimizador de consultas de AlloyDB sugiriendo un tamaño de lote preferido para los modelos compatibles directamente. AlloyDB puede reducir dinámicamente este tamaño en función de los límites o las cuotas del modelo, pero tu sugerencia ayuda a influir en el plan de ejecución de la consulta.

```
CALL ai.initialize_embeddings(
    model_id => 'text-embedding-005',
    table_name => 'user_reviews',
    content_column => 'content',
    embedding_column => 'content_embeddings',
    batch_size => 50
);
```

### Usar un modelo de inserción personalizado con compatibilidad con lotes

Si quieres usar un modelo personalizado o externo que admita el procesamiento por lotes, define las funciones de transformación por lotes y especifícalas como `model_batch_in_transform_fn` y `model_batch_out_transform_fn` al crear un modelo. También puedes especificar un `batch_size` en la `initialize_embeddings`. En los modelos que admiten el procesamiento por lotes, te recomendamos que uses un `batch_size` superior a 1 para mejorar el rendimiento.

1.  Define las funciones de entrada, salida y transformación por lotes de tu modelo personalizado.
    
    ```
    -- Scalar input transform functions
    CREATE OR REPLACE FUNCTION acme_text_input_transform(model_id TEXT, input TEXT) RETURNS JSON;
    CREATE OR REPLACE FUNCTION acme_text_output_transform(model_id TEXT, model_output JSON) RETURNS real[];
    CREATE OR REPLACE FUNCTION acme_generate_headers(model_id TEXT, input TEXT) RETURNS JSON;
    -- Batch input transform functions
    CREATE OR REPLACE FUNCTION acme_text_batch_input_transform(model_id TEXT, input TEXT[]) RETURNS JSON;
    CREATE OR REPLACE FUNCTION acme_text_batch_output_transform(model_id TEXT, model_output JSON) RETURNS real[][];
    ```
    
2.  Para crear el modelo, especifica las funciones de transformación por lotes.
    
    ```
    CALL
      ai.create_model(
        model_id => 'custom-embedding-model',
        model_request_url => 'https://acme.com/models/text/embeddings/v1',
        model_type => 'text_embedding',
        model_in_transform_fn => 'acme_text_input_transform',
        model_out_transform_fn => 'acme_text_output_transform',
        generate_headers_fn => 'acme_generate_headers',
        model_batch_in_transform_fn => 'acme_text_batch_input_transform',
        model_batch_out_transform_fn => 'acme_text_batch_output_transform'
      );
    ```
    
3.  Genera incrustaciones de vectores con tu modelo personalizado.
    
    ```
    CALL
      ai.initialize_embeddings(
        model_id => 'custom-embedding-model',
        table_name => 'user_reviews',
        content_column => 'content',
        embedding_column => 'content_embeddings',
        batch_size => 10
    );
    ```
    

También puedes usar la función de inserción automática con modelos personalizados que no admitan de forma nativa el procesamiento por lotes. Para ello, debes definir las funciones de transformación por lotes `model_batch_in_transform_fn` y `model_batch_out_transform_fn`. En el caso de un modelo sin procesamiento por lotes, define estas funciones para procesar una sola entrada a la vez desde la matriz de entrada. Cuando llames a `ai.initialize_embeddings` para este modelo, asigna el valor `1` a `batch_size`.

## Actualizar las inserciones de forma incremental

Cuando actualiza una inserción, se vuelve a generar en función del último valor de la columna de contenido de entrada.

Para que tengas control sobre la coherencia y el rendimiento, AlloyDB admite varios modos de actualización incremental de las inserciones. Puedes seleccionar un modo con el argumento de enumeración `incremental_refresh_mode` en `ai.initialize_embeddings()`. A continuación se muestra una lista con los posibles modos:

-   `transactional`: las inserciones se actualizan como parte de la transacción que actualiza la columna de contenido. Este proceso, que suele usar un mecanismo similar a un activador de base de datos para generar automáticamente las inserciones cuando se actualiza la columna de contenido, puede introducir una sobrecarga y ralentizar las operaciones de actualización. La sobrecarga introducida es una contrapartida para mantener la semántica transaccional y asegurarse de que las inserciones estén sincronizadas con el contenido. Este modo se basa en las funciones de transformación escalar de tu modelo, por lo que debes definir `model_in_transform_fn` y `model_out_transform_fn` al crear el modelo. Para usar el modo `transactional`, debes tener el [rol](https://docs.cloud.google.com/alloydb/docs/reference/iam-roles-permissions?hl=es) de propietario en la tabla.
    
    ```
    CALL
      ai.initialize_embeddings(
        model_id => 'text-embedding-005',
        table_name => 'user_reviews',
        content_column => 'content',
        embedding_column => 'content_embeddings',
        batch_size => 10,
        incremental_refresh_mode => 'transactional'
    );
    ```
    
-   `none`: este es el modo predeterminado. En este modo, AlloyDB no actualiza las inserciones automáticamente. No se hace un seguimiento de los cambios incrementales, por lo que, al llamar a la función `ai.refresh_embeddings()`, se regeneran las inserciones de toda la tabla. Este modo ofrece un control total.
    

## Actualizar todos los embeddings de una tabla

Una vez que hayas ejecutado `ai.initialize_embeddings()` correctamente en una tabla, puedes usar la función `ai.refresh_embeddings()` para volver a generar las inserciones. Puedes usar una operación de actualización para actualizar las inserciones de las filas que se modifican simultáneamente durante la llamada `initialize_embeddings` inicial o para realizar una actualización completa periódica.

**Nota:** `ai.refresh_embeddings()` vuelve a generar las inserciones de toda la tabla, incluidas las filas que ya había y las que se han añadido recientemente.

La función de actualización reutiliza los ajustes de la llamada inicial, por lo que solo tiene que especificar la tabla y la columna de inserción. También puede proporcionar un `batch_size` opcional para anular el valor predeterminado.

```
CALL ai.refresh_embeddings(
    table_name => 'user_reviews',
    embedding_column => 'content_embeddings',
    batch_size => 50  -- Optional override
);
```

**Nota:** Si se produce un error como `AutoEmbeddingGeneration: Request size is greater than 4MB`, significa que el tamaño de la solicitud de un lote ha superado el tamaño máximo admitido de 4 MB. Para solucionarlo, reduce el valor de `batch_size` en la llamada a la función y vuelve a intentarlo.

## Trabajar con datos de tablas durante la creación de incrustaciones de vectores

Aunque `ai.initialize_embeddings()` es una llamada de bloqueo para la sesión en la que se ejecuta, otras conexiones pueden seguir trabajando con la tabla. El proceso de inserción de vectores automática actualiza las filas en lotes, lo que implica el bloqueo estándar a nivel de fila. Esto significa que las operaciones DML simultáneas, como `UPDATE` o `DELETE`, solo se bloquean brevemente si intentan modificar las mismas filas que está actualizando el proceso de inserción. Las consultas de otras conexiones no se bloquean. Ten en cuenta que `initialize_embeddings` omite las filas que se modifican simultáneamente. Si `incremental_refresh_mode` es `none`, las inserciones de estas filas modificadas no se actualizan hasta que se llama a una actualización posterior.

```
-- connection1 (starts embedding generation)
SELECT
  ai.initialize_embeddings(
    model_id => 'text-embedding-005',
    table_name => 'user_reviews',
    content_column => 'content',
    embedding_column => 'content_embeddings'
  );

-- connection2 (performs DMLs/queries without blocking)
INSERT INTO user_reviews(id, review_time, is_edited, content)
VALUES (48290, now(), false, 'I really liked the product functionality, but wish it came in orange color');

UPDATE user_reviews
SET is_edited = TRUE, content = 'Changing to 5 star. My issue is resolved by the support'
WHERE id = 700;
```

Si cancelas `initialize_embeddings` mediante `pg_cancel` o si `initialize_embeddings` falla debido a un error interno, se devuelve un estado de fallo. Las incrustaciones de vectores que se hayan creado correctamente no se restaurarán. Para recuperarte del error y completar la creación de la inserción de vector, primero debes limpiar la configuración con la función `ai.drop_embedding_config()` y, a continuación, volver a emitir la llamada `ai.initialize_embeddings()`.

Para actualizar las inserciones de las filas modificadas simultáneamente, llama a `ai.refresh_embeddings` después de que se complete la llamada `ai.initialize_embeddings`. Esta llamada de actualización vuelve a generar las inserciones de toda la tabla.

### Eliminar los ajustes de inserción de vectores automática

Si necesitas quitar la configuración de la inserción de vectores automática de una combinación específica de tabla y columna de inserción, usa la función `ai.drop_embedding_config()`. Esta función puede ser útil para limpiar o cuando vuelvas a configurar la gestión de la inserción de una columna.

```
CALL
  ai.drop_embedding_config(
    table_name => 'user_reviews',
    embedding_column => 'content_embeddings');
```

## Ejemplos de generación de inserciones en el sector de la automoción

En esta sección se proporcionan ejemplos para generar inserciones automáticamente mediante los endpoints de modelos registrados.

### Modelo de inserción de OpenAI

Para generar inserciones mediante el [endpoint del modelo `text-embedding-3-small`registrado](https://docs.cloud.google.com/alloydb/docs/ai/register-model-endpoint?hl=es#add-openai) proporcionado por OpenAI, ejecuta la siguiente instrucción:

```
CALL ai.initialize_embeddings(
    model_id => 'text-embedding-3-small',
    table_name => 'user_reviews',
    chunk_column => 'content',
    embedding_column => 'content_embeddings'
);
```

### Modelos de inserciones personalizados

En el caso de los modelos propios o compatibles externamente, debes definir funciones de transformación de entrada y salida, y registrarlas con `ai.create_model`. Si tiene previsto usar la función de inserción automática, debe especificar tanto funciones de transformación escalar (por ejemplo, `acme_text_input_transform` y `acme_text_output_transform`) como funciones de transformación por lotes (por ejemplo, `acme_text_batch_input_transform` y `acme_text_batch_output_transform`).

## Siguientes pasos

-   [Ejecuta búsquedas por similitud de vectores](https://docs.cloud.google.com/alloydb/docs/ai/run-vector-similarity-search?hl=es).
-   [Consulta cómo crear un asistente de compras inteligente con AlloyDB, pgvector y la gestión de endpoints de modelos](https://codelabs.developers.google.com/smart-shop-agent-alloydb?hl=es#0).
-   [Crea índices y vectores de consulta.](https://docs.cloud.google.com/alloydb/docs/ai/store-index-query-vectors?hl=es)
-   Consulta [un ejemplo de flujo de trabajo de una incrustación](https://docs.cloud.google.com/alloydb/docs/ai/example-embeddings?hl=es).

Enviar comentarios

A menos que se indique lo contrario, el contenido de esta página está sujeto a la [licencia Reconocimiento 4.0 de Creative Commons](https://creativecommons.org/licenses/by/4.0/) y las muestras de código están sujetas a la [licencia Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para obtener más información, consulta las [políticas del sitio web de Google Developers](https://developers.google.com/site-policies?hl=es). Java es una marca registrada de Oracle o sus afiliados.

Última actualización: 2026-01-15 (UTC).