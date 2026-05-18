 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=es) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=es)
-   [Documentation](https://docs.cloud.google.com/docs?hl=es)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=es)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=es)
-   [Guías](https://docs.cloud.google.com/alloydb/docs/overview?hl=es)

Enviar comentarios

# Almacenar incrustaciones de vectores Organízate con las colecciones Guarda y clasifica el contenido según tus preferencias.

En esta página se explica cómo usar AlloyDB como base de datos de vectores con la extensión `vector`, que incluye funciones y operadores `pgvector`. Estas funciones y operadores te permiten almacenar las inserciones como valores vectoriales.

## Extensión de base de datos obligatoria

Usa la extensión `vector`, versión `0.5.0.google-1` o posterior, que incluye funciones y operadores de `pgvector`, para almacenar las incrustaciones generadas como valores de `vector`. Esta es una versión de `pgvector` que Google ha ampliado con optimizaciones específicas para AlloyDB.

```
CREATE EXTENSION IF NOT EXISTS vector;
```

## Incrustaciones generadas por la tienda

Asegúrate de que ya has creado una tabla en tu base de datos de AlloyDB.

**Nota:** Si tu aplicación usa el framework LangChain y tu conjunto de datos tiene `O(100k)` incrustaciones, te recomendamos que uses la clase de vector `AlloyDBVectorStore` incluida en la biblioteca LangChain de AlloyDB para almacenar tus incrustaciones. Para obtener más información, consulta el artículo [Desarrollar aplicaciones basadas en LLM con LangChain](https://docs.cloud.google.com/alloydb/docs/ai/langchain?hl=es#vector_store_procedure_guide)

.

Para almacenar incrustaciones de vectores, siga estos pasos:

1.  Crea una columna `vector[]` en tu tabla para almacenar los embeddings:
    
    ```
    ALTER TABLE TABLE ADD COLUMN EMBEDDING_COLUMN vector(DIMENSIONS);
    ```
    
    Haz los cambios siguientes:
    
    -   `TABLE`: el nombre de la tabla
        
    -   `EMBEDDING_COLUMN`: el nombre de la nueva columna de inserciones
        
    -   `DIMENSIONS`: número de dimensiones que admite el modelo.
        
        Por ejemplo, si usas uno de los modelos en inglés de `text-embedding`, como `text-embedding-005` con Vertex AI, especifica `768`.
        
2.  Copia los vectores en la columna de vectores. En el siguiente ejemplo se da por hecho que tus inserciones están disponibles en un archivo CSV:
    
    ```
    COPY TABLE (EMBEDDING_COLUMN) FROM 'PATH_TO_VECTOR_CSV (FORMAT CSV);
    ```
    
    Haz los cambios siguientes:
    
    -   `PATH_TO_VECTOR_CSV`: la ruta completa de la ubicación en la que has almacenado el archivo `.CSV`.

Una vez que hayas almacenado las inserciones, puedes usar la extensión `vector` o la extensión `alloydb_scann` para crear índices y mejorar el rendimiento de las consultas.

## Siguientes pasos

-   [Crear índices y vectores de consulta](https://docs.cloud.google.com/alloydb/docs/ai/create-scann-index?hl=es)
-   [Ejemplo de flujo de trabajo de una incrustación](https://docs.cloud.google.com/alloydb/docs/ai/example-embeddings?hl=es)

Enviar comentarios

A menos que se indique lo contrario, el contenido de esta página está sujeto a la [licencia Reconocimiento 4.0 de Creative Commons](https://creativecommons.org/licenses/by/4.0/) y las muestras de código están sujetas a la [licencia Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para obtener más información, consulta las [políticas del sitio web de Google Developers](https://developers.google.com/site-policies?hl=es). Java es una marca registrada de Oracle o sus afiliados.

Última actualización: 2026-01-14 (UTC).