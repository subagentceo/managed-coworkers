 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=es-419) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=es-419)
-   [Documentation](https://docs.cloud.google.com/docs?hl=es-419)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=es-419)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=es-419)
-   [Guías](https://docs.cloud.google.com/alloydb/docs/overview?hl=es-419)

Enviar comentarios

# Migra datos de una base de datos de vectores a AlloyDB Organiza tus páginas con colecciones Guarda y categoriza el contenido según tus preferencias.

En este instructivo, se describe cómo migrar datos de una base de datos vectorial de terceros a AlloyDB para PostgreSQL con un VectorStore de [LangChain](https://www.langchain.com/). En este instructivo, se supone que los datos de las bases de datos de vectores de terceros se crearon con una integración de LangChain VectorStore. Si ingresas información en una de las siguientes bases de datos sin usar LangChain, es posible que debas editar las secuencias de comandos que se proporcionan a continuación para que coincidan con el esquema de tus datos. Se admiten las siguientes bases de datos vectoriales:

-   [Pinecone](https://python.langchain.com/docs/integrations/vectorstores/pinecone/)
-   [Weaviate](https://python.langchain.com/docs/integrations/vectorstores/weaviate/)
-   [Croma](https://python.langchain.com/docs/integrations/vectorstores/chroma/)
-   [Qdrant](https://python.langchain.com/docs/integrations/vectorstores/qdrant/)
-   [Milvus](https://python.langchain.com/docs/integrations/vectorstores/milvus/)

**Nota:** En este instructivo, se usan valores predeterminados de los almacenes de vectores de LangChain admitidos. Para migrar bases de datos personalizadas, es posible que debas actualizar los campos de datos especificados en este documento.

En este instructivo, se supone que conoces Google Cloud, AlloyDB y la programación asíncrona en Python.

## Objetivos

En este instructivo, se muestra cómo realizar lo siguiente:

-   Extrae datos de una base de datos de vectores existente.
-   Conéctate a AlloyDB.
-   Inicializa la tabla de AlloyDB.
-   Inicializa un objeto de almacén de vectores.
-   Ejecuta la secuencia de comandos de migración para insertar los datos.

## Costos

En este documento, usarás los siguientes componentes facturables de Google Cloud:

-   [AlloyDB for PostgreSQL](https://cloud.google.com/alloydb/pricing?hl=es-419)

You might be eligible for a free trial cluster. For more information, see [AlloyDB free trial clusters overview](https://docs.cloud.google.com/alloydb/docs/free-trial-cluster?hl=es-419).

Para generar una estimación de costos en función del uso previsto, usa la [calculadora de precios](https://docs.cloud.google.com/products/calculator?hl=es-419).

Es posible que los usuarios de Google Cloud nuevos cumplan con los requisitos para acceder a una [prueba gratuita](https://docs.cloud.google.com/free?hl=es-419).

Cuando completes las tareas que se describen en este documento, podrás borrar los recursos que creaste para evitar que se te siga facturando. Para obtener más información, consulta [Realiza una limpieza](#clean-up).

## Antes de comenzar

Asegúrate de tener uno de los siguientes almacenes de vectores de bases de datos de terceros de LangChain:

-   [Pinecone](https://python.langchain.com/docs/integrations/vectorstores/pinecone/)
-   [Weaviate](https://python.langchain.com/docs/integrations/vectorstores/weaviate/)
-   [Croma](https://python.langchain.com/docs/integrations/vectorstores/chroma/)
-   [Qdrant](https://python.langchain.com/docs/integrations/vectorstores/qdrant/)
-   [Milvus](https://python.langchain.com/docs/integrations/vectorstores/milvus/)

### Habilita la facturación y las APIs obligatorias

1.  En la consola de Google Cloud , en la página del selector de proyectos, selecciona o crea un proyecto deGoogle Cloud .

    Nota: Si no planeas conservar los recursos que creaste durante este instructivo, crea un proyecto en lugar de seleccionar uno existente. Cuando termines, puedes borrar el proyecto si quitas todos los recursos asociados con él.

    [Ir al selector de proyectos](https://console.cloud.google.com/projectselector2/home/dashboard?hl=es-419)

2.  [Asegúrate de tener habilitada la facturación para tu proyecto de Google Cloud](https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled?hl=es-419#confirm_billing_is_enabled_on_a_project) .

3.  Habilita las API de Cloud necesarias para crear una conexión a AlloyDB para PostgreSQL.

    [Habilita las APIs](https://console.cloud.google.com/apis/enableflow?apiid=alloydb.googleapis.com%2Ccompute.googleapis.com%2Cservicenetworking.googleapis.com%2Caiplatform.googleapis.com&hl=es-419)

    1.  En el paso **Confirmar proyecto**, haz clic en **Siguiente** para confirmar el nombre del proyecto en el que realizarás cambios.
    2.  En el paso **Habilitar APIs**, haz clic en **Habilitar** para habilitar lo siguiente:

        -   API de AlloyDB
        -   API de Compute Engine
        -   API de Service Networking

### Roles obligatorios

Para obtener los permisos que necesitas para completar las tareas de este instructivo, debes tener los siguientes roles de Identity and Access Management (IAM), que permiten la creación de tablas y la inserción de datos:

-   Propietario (`roles/owner`) o editor (`roles/editor`)
-   Si el usuario no es propietario ni editor, se requieren los siguientes roles de IAM y privilegios de PostgreSQL:

    -   Cliente de instancia de AlloyDB ([`roles/alloydb.client`](https://docs.cloud.google.com/alloydb/docs/reference/iam-roles-permissions?hl=es-419#roles))
    -   Administrador de Cloud AlloyDB ([`roles/alloydb.admin`](https://docs.cloud.google.com/alloydb/docs/reference/iam-roles-permissions?hl=es-419#roles))
    -   Usuario de la red de Compute ([`roles/compute.networkUser`](https://docs.cloud.google.com/compute/docs/access/iam?hl=es-419#compute.networkUser))

Si deseas autenticarte en tu base de datos con la autenticación de IAM en lugar de usar la autenticación integrada en este instructivo, usa el notebook que muestra cómo [usar AlloyDB para PostgreSQL para almacenar embeddings de vectores con la clase `AlloyDBVectorStore`](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/vector_store.ipynb).

## Crea un clúster y un usuario de AlloyDB

1.  [Crea un clúster y una instancia de AlloyDB](https://docs.cloud.google.com/alloydb/docs/cluster-create?hl=es-419).
    -   Habilita la IP pública para ejecutar este instructivo desde cualquier lugar. Si usas una IP privada, debes ejecutar este instructivo desde tu VPC.
2.  [Crea o selecciona un usuario de la base de datos de AlloyDB](https://docs.cloud.google.com/alloydb/docs/database-users/about?hl=es-419).
    -   Cuando creas la instancia, se crea un usuario `postgres` con una contraseña. Este usuario tiene permisos de superusuario.
    -   En este instructivo, se usa la autenticación integrada para reducir la fricción de autenticación. La autenticación de IAM es posible con [AlloyDBEngine](https://docs.cloud.google.com/python/docs/reference/langchain-google-alloydb-pg/latest/langchain_google_alloydb_pg.engine.AlloyDBEngine?hl=es-419).

## Recupera la muestra de código

1.  Clona el repositorio para copiar la muestra de código de GitHub:

    ```
    git clone https://github.com/googleapis/langchain-google-alloydb-pg-python.git
    ```

2.  Navega al directorio `migrations`:

    ```
    cd langchain-google-alloydb-pg-python/samples/migrations
    ```


## Extrae datos de una base de datos de vectores existente

**Nota:** Es posible que debas modificar los ejemplos de código de esta sección según tu caso de uso.

1.  Crea un cliente.

    ### Pinecone

    ```
    from pinecone import Pinecone  # type: ignore

    pinecone_client = Pinecone(api_key=pinecone_api_key)
    pinecone_index = pinecone_client.Index(pinecone_index_name)
    ```

    ### Weaviate

    ```
    import weaviate

    # For a locally running weaviate instance, use `weaviate.connect_to_local()`
    weaviate_client = weaviate.connect_to_weaviate_cloud(
        cluster_url=weaviate_cluster_url,
        auth_credentials=weaviate.auth.AuthApiKey(weaviate_api_key),
    )
    ```

    ### Croma

    ```
    from langchain_chroma import Chroma

    chromadb_client = Chroma(
        collection_name=chromadb_collection_name,
        embedding_function=embeddings_service,
        persist_directory=chromadb_path,
    )
    ```

    ### Qdrant

    ```
    from qdrant_client import QdrantClient

    qdrant_client = QdrantClient(path=qdrant_path)
    ```

    ### Milvus

    ```
    milvus_client = MilvusClient(uri=milvus_uri)
    ```

2.  Obtener todos los datos de la base de datos

    ### Pinecone

    Recupera los IDs de vectores del índice de Pinecone:

    ```
    results = pinecone_index.list_paginated(
        prefix="", namespace=pinecone_namespace, limit=pinecone_batch_size
    )
    ids = [v.id for v in results.vectors]
    if ids:  # Prevents yielding an empty list.
        yield ids

    # Check BOTH pagination and pagination.next
    while results.pagination is not None and results.pagination.get("next") is not None:
        pagination_token = results.pagination.get("next")
        results = pinecone_index.list_paginated(
            prefix="",
            pagination_token=pagination_token,
            namespace=pinecone_namespace,
            limit=pinecone_batch_size,
        )

        # Extract and yield the next batch of IDs
        ids = [v.id for v in results.vectors]
        if ids:  # Prevents yielding an empty list.
            yield ids
    ```

    Luego, recupera los registros por ID del índice de Pinecone:

    ```
    import uuid

    # Iterate through the IDs and download their contents
    for ids_batch in id_iterator:
        all_data = pinecone_index.fetch(ids=ids_batch, namespace=pinecone_namespace)
        ids = []
        embeddings = []
        contents = []
        metadatas = []

        # Process each vector in the current batch
        for doc in all_data.vectors.values():
            # You might need to update this data translation logic according to one or more of your field names
            if pinecone_id_column_name in doc.metadata:
                # pinecone_id_column_name stores the unqiue identifier for the content
                ids.append(doc[pinecone_id_column_name])
            else:
                # Generate a uuid if pinecone_id_column_name is missing in source
                ids.append(str(uuid.uuid4()))
            # values is the vector embedding of the content
            embeddings.append(doc.values)
            # Check if pinecone_content_column_name exists in metadata before accessing
            if pinecone_content_column_name in doc.metadata:
                # pinecone_content_column_name stores the content which was encoded
                contents.append(str(doc.metadata[pinecone_content_column_name]))
                # Remove pinecone_content_column_name after processing
                del doc.metadata[pinecone_content_column_name]
            else:
                # Handle the missing pinecone_content_column_name field appropriately
                contents.append("")
            # metadata is the additional context
            metadatas.append(doc.metadata)

        # Yield the current batch of results
        yield ids, contents, embeddings, metadatas
    ```

    ### Weaviate

    ```
    # Iterate through the IDs and download their contents
    weaviate_collection = weaviate_client.collections.get(weaviate_collection_name)
    ids: list[str] = []
    content: list[Any] = []
    embeddings: list[list[float]] = []
    metadatas: list[Any] = []

    for item in weaviate_collection.iterator(include_vector=True):
        # You might need to update this data translation logic according to one or more of your field names
        # uuid is the unqiue identifier for the content
        ids.append(str(item.uuid))
        # weaviate_text_key is the content which was encoded
        content.append(item.properties[weaviate_text_key])
        # vector is the vector embedding of the content
        embeddings.append(item.vector["default"])  # type: ignore
        del item.properties[weaviate_text_key]  # type: ignore
        # properties is the additional context
        metadatas.append(item.properties)

        if len(ids) >= weaviate_batch_size:
            # Yield the current batch of results
            yield ids, content, embeddings, metadatas
            # Reset lists to start a new batch
            ids = []
            content = []
            embeddings = []
            metadatas = []
    ```

    **Nota:** Actualiza `WEAVIATE_COLLECTION_NAME` con el nombre de la colección y `WEAVIATE_TEXT_KEY` con el nombre del campo en el esquema de Weaviate que contiene contenido de texto. Si tienes varias colecciones, ejecuta la migración para cada una de ellas.

    ### Croma

    ```
    # Iterate through the IDs and download their contents
    offset = 0
    while True:
        # You might need to update this data translation logic according to one or more of your field names
        # documents is the content which was encoded
        # embeddings is the vector embedding of the content
        # metadatas is the additional context
        docs = chromadb_client.get(
            include=["metadatas", "documents", "embeddings"],
            limit=chromadb_batch_size,
            offset=offset,
        )

        if len(docs["documents"]) == 0:
            break

        # ids is the unqiue identifier for the content
        yield docs["ids"], docs["documents"], docs["embeddings"].tolist(), docs[
            "metadatas"
        ]

        offset += chromadb_batch_size
    ```

    ### Qdrant

    ```
    # Iterate through the IDs and download their contents
    offset = None
    while True:
        docs, offset = qdrant_client.scroll(
            collection_name=qdrant_collection_name,
            with_vectors=True,
            limit=qdrant_batch_size,
            offset=offset,
            with_payload=True,
        )

        ids: List[str] = []
        contents: List[Any] = []
        embeddings: List[List[float]] = []
        metadatas: List[Any] = []

        for doc in docs:
            if doc.payload and doc.vector:
                # You might need to update this data translation logic according to one or more of your field names
                # id is the unqiue identifier for the content
                ids.append(str(doc.id))
                # page_content is the content which was encoded
                contents.append(doc.payload["page_content"])
                # vector is the vector embedding of the content
                embeddings.append(doc.vector)  # type: ignore
                # metatdata is the additional context
                metadatas.append(doc.payload["metadata"])

        yield ids, contents, embeddings, metadatas

        if not offset:
            break
    ```

    **Nota:** Actualiza `QDRANT_COLLECTION_NAME` con el nombre de la colección. Si tienes varias colecciones, ejecuta la migración para cada una de ellas.

    ### Milvus

    ```
    # Iterate through the IDs and download their contents
    iterator = milvus_client.query_iterator(
        collection_name=milvus_collection_name,
        filter='pk >= "0"',
        output_fields=["pk", "text", "vector", "idv"],
        batch_size=milvus_batch_size,
    )

    while True:
        ids = []
        content = []
        embeddings = []
        metadatas = []
        page = iterator.next()
        if len(page) == 0:
            iterator.close()
            break
        for i in range(len(page)):
            # You might need to update this data translation logic according to one or more of your field names
            doc = page[i]
            # pk is the unqiue identifier for the content
            ids.append(doc["pk"])
            # text is the content which was encoded
            content.append(doc["text"])
            # vector is the vector embedding of the content
            embeddings.append(doc["vector"])
            del doc["pk"]
            del doc["text"]
            del doc["vector"]
            # doc is the additional context
            metadatas.append(doc)
        yield ids, content, embeddings, metadatas
    ```

    **Nota:** Actualiza `MILVUS_COLLECTION_NAME` con el nombre de la colección. Si tienes varias colecciones, ejecuta la migración para cada una de ellas.


## Inicializa la tabla de AlloyDB

**Nota:** Es posible que debas modificar los ejemplos de código de esta sección según tu caso de uso.

1.  Define el servicio de embedding.

    La interfaz VectorStore requiere un servicio de incorporación. Este flujo de trabajo no genera embeddings nuevos, por lo que se usa la clase `FakeEmbeddings` para evitar costos.

    ### Pinecone

    ```
    # The VectorStore interface requires an embedding service. This workflow does not
    # generate new embeddings, therefore FakeEmbeddings class is used to avoid any costs.
    from langchain_core.embeddings import FakeEmbeddings

    embeddings_service = FakeEmbeddings(size=vector_size)
    ```

    ### Weaviate

    ```
    # The VectorStore interface requires an embedding service. This workflow does not
    # generate new embeddings, therefore FakeEmbeddings class is used to avoid any costs.
    from langchain_core.embeddings import FakeEmbeddings

    embeddings_service = FakeEmbeddings(size=vector_size)
    ```

    ### Croma

    ```
    # The VectorStore interface requires an embedding service. This workflow does not
    # generate new embeddings, therefore FakeEmbeddings class is used to avoid any costs.
    from langchain_core.embeddings import FakeEmbeddings

    embeddings_service = FakeEmbeddings(size=vector_size)
    ```

    ### Qdrant

    ```
    # The VectorStore interface requires an embedding service. This workflow does not
    # generate new embeddings, therefore FakeEmbeddings class is used to avoid any costs.
    from langchain_core.embeddings import FakeEmbeddings

    embeddings_service = FakeEmbeddings(size=vector_size)
    ```

    ### Milvus

    ```
    # The VectorStore interface requires an embedding service. This workflow does not
    # generate new embeddings, therefore FakeEmbeddings class is used to avoid any costs.
    from langchain_core.embeddings import FakeEmbeddings

    embeddings_service = FakeEmbeddings(size=vector_size)
    ```

2.  Prepara la tabla de AlloyDB.

    1.  Conéctate a AlloyDB con una conexión IP pública. Para obtener más información, consulta [Cómo especificar el tipo de dirección IP](https://github.com/GoogleCloudPlatform/alloydb-python-connector?tab=readme-ov-file#specifying-ip-address-type).

        ### Pinecone

        ```
        from langchain_google_alloydb_pg import AlloyDBEngine

        alloydb_engine = await AlloyDBEngine.afrom_instance(
            project_id=project_id,
            region=region,
            cluster=cluster,
            instance=instance,
            database=db_name,
            user=db_user,
            password=db_pwd,
            ip_type=IPTypes.PUBLIC,  # Optionally use IPTypes.PRIVATE
        )
        ```

        ### Weaviate

        ```
        from langchain_google_alloydb_pg import AlloyDBEngine

        alloydb_engine = await AlloyDBEngine.afrom_instance(
            project_id=project_id,
            region=region,
            cluster=cluster,
            instance=instance,
            database=db_name,
            user=db_user,
            password=db_pwd,
            ip_type=IPTypes.PUBLIC,
        )
        ```

        ### Croma

        ```
        from langchain_google_alloydb_pg import AlloyDBEngine

        alloydb_engine = await AlloyDBEngine.afrom_instance(
            project_id=project_id,
            region=region,
            cluster=cluster,
            instance=instance,
            database=db_name,
            user=db_user,
            password=db_pwd,
            ip_type=IPTypes.PUBLIC,
        )
        ```

        ### Qdrant

        ```
        from langchain_google_alloydb_pg import AlloyDBEngine

        alloydb_engine = await AlloyDBEngine.afrom_instance(
            project_id=project_id,
            region=region,
            cluster=cluster,
            instance=instance,
            database=db_name,
            user=db_user,
            password=db_pwd,
            ip_type=IPTypes.PUBLIC,
        )
        ```

        ### Milvus

        ```
        from langchain_google_alloydb_pg import AlloyDBEngine

        alloydb_engine = await AlloyDBEngine.afrom_instance(
            project_id=project_id,
            region=region,
            cluster=cluster,
            instance=instance,
            database=db_name,
            user=db_user,
            password=db_pwd,
            ip_type=IPTypes.PUBLIC,
        )
        ```

    2.  Crea una tabla en la que se copiarán los datos, si aún no existe.

        ### Pinecone

        ```
        from langchain_google_alloydb_pg import Column

        await alloydb_engine.ainit_vectorstore_table(
            table_name=alloydb_table,
            vector_size=vector_size,
            # Customize the ID column types if not using the UUID data type
            # id_column=Column("langchain_id", "TEXT"),  # Default is Column("langchain_id", "UUID")
            # overwrite_existing=True,  # Drop the old table and Create a new vector store table
        )
        ```

        ### Weaviate

        ```
        await alloydb_engine.ainit_vectorstore_table(
            table_name=alloydb_table,
            vector_size=vector_size,
            # Customize the ID column types with `id_column` if not using the UUID data type
        )
        ```

        ### Croma

        ```
        await alloydb_engine.ainit_vectorstore_table(
            table_name=alloydb_table,
            vector_size=vector_size,
            # Customize the ID column types with `id_column` if not using the UUID data type
        )
        ```

        ### Qdrant

        ```
        await alloydb_engine.ainit_vectorstore_table(
            table_name=alloydb_table,
            vector_size=vector_size,
            # Customize the ID column types with `id_column` if not using the UUID data type
        )
        ```

        ### Milvus

        ```
        await alloydb_engine.ainit_vectorstore_table(
            table_name=alloydb_table,
            vector_size=vector_size,
            # Customize the ID column types with `id_column` if not using the UUID data type
        )
        ```


## Inicializa un objeto de almacén de vectores

Este código agrega metadatos de embedding de vector adicionales a la columna `langchain_metadata` en formato JSON. Para que el filtrado sea más eficiente, organiza estos metadatos en columnas separadas. Para obtener más información, consulta [Crea un almacén de vectores personalizado](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/vector_store.ipynb).

1.  Para inicializar un objeto de almacén de vectores, ejecuta el siguiente comando:

    ### Pinecone

    ```
    from langchain_google_alloydb_pg import AlloyDBVectorStore

    vs = await AlloyDBVectorStore.create(
        engine=alloydb_engine,
        embedding_service=embeddings_service,
        table_name=alloydb_table,
    )
    ```

    ### Weaviate

    ```
    from langchain_google_alloydb_pg import AlloyDBVectorStore

    vs = await AlloyDBVectorStore.create(
        engine=alloydb_engine,
        embedding_service=embeddings_service,
        table_name=alloydb_table,
    )
    ```

    ### Croma

    ```
    from langchain_google_alloydb_pg import AlloyDBVectorStore

    vs = await AlloyDBVectorStore.create(
        engine=alloydb_engine,
        embedding_service=embeddings_service,
        table_name=alloydb_table,
    )
    ```

    ### Qdrant

    ```
    from langchain_google_alloydb_pg import AlloyDBVectorStore

    vs = await AlloyDBVectorStore.create(
        engine=alloydb_engine,
        embedding_service=embeddings_service,
        table_name=alloydb_table,
    )
    ```

    ### Milvus

    ```
    from langchain_google_alloydb_pg import AlloyDBVectorStore

    vs = await AlloyDBVectorStore.create(
        engine=alloydb_engine,
        embedding_service=embeddings_service,
        table_name=alloydb_table,
    )
    ```

2.  Inserta datos en la tabla de AlloyDB:

    ### Pinecone

    ```
    pending: set[Any] = set()
    for ids, contents, embeddings, metadatas in data_iterator:
        pending.add(
            asyncio.ensure_future(
                vs.aadd_embeddings(
                    texts=contents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids,
                )
            )
        )
        if len(pending) >= max_concurrency:
            _, pending = await asyncio.wait(
                pending, return_when=asyncio.FIRST_COMPLETED
            )
    if pending:
        await asyncio.wait(pending)
    ```

    ### Weaviate

    ```
    pending: set[Any] = set()
    for ids, contents, embeddings, metadatas in data_iterator:
        pending.add(
            asyncio.ensure_future(
                vs.aadd_embeddings(
                    texts=contents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids,
                )
            )
        )
        if len(pending) >= max_concurrency:
            _, pending = await asyncio.wait(
                pending, return_when=asyncio.FIRST_COMPLETED
            )
    if pending:
        await asyncio.wait(pending)
    ```

    ### Croma

    ```
    pending: set[Any] = set()
    for ids, contents, embeddings, metadatas in data_iterator:
        pending.add(
            asyncio.ensure_future(
                vs.aadd_embeddings(
                    texts=contents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids,
                )
            )
        )
        if len(pending) >= max_concurrency:
            _, pending = await asyncio.wait(
                pending, return_when=asyncio.FIRST_COMPLETED
            )
    if pending:
        await asyncio.wait(pending)
    ```

    ### Qdrant

    ```
    pending: set[Any] = set()
    for ids, contents, embeddings, metadatas in data_iterator:
        pending.add(
            asyncio.ensure_future(
                vs.aadd_embeddings(
                    texts=contents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids,
                )
            )
        )
        if len(pending) >= max_concurrency:
            _, pending = await asyncio.wait(
                pending, return_when=asyncio.FIRST_COMPLETED
            )
    if pending:
        await asyncio.wait(pending)
    ```

    ### Milvus

    ```
    pending: set[Any] = set()
    for ids, contents, embeddings, metadatas in data_iterator:
        pending.add(
            asyncio.ensure_future(
                vs.aadd_embeddings(
                    texts=contents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids,
                )
            )
        )
        if len(pending) >= max_concurrency:
            _, pending = await asyncio.wait(
                pending, return_when=asyncio.FIRST_COMPLETED
            )
    if pending:
        await asyncio.wait(pending)
    ```


## Ejecuta la secuencia de comandos de migración

1.  [Configura el entorno de Python](https://docs.cloud.google.com/python/docs/setup?hl=es-419).

2.  Instala las dependencias de la muestra:

    ```
    pip install -r requirements.txt
    ```

3.  Ejecuta la migración de muestra.

    ### Pinecone

    ```
    python migrate_pinecone_vectorstore_to_alloydb.py
    ```

    Realiza los siguientes reemplazos antes de ejecutar la muestra:

    -   `PINECONE_API_KEY`: Es la clave de API de Pinecone.
    -   `PINECONE_NAMESPACE`: Es el espacio de nombres de Pinecone.
    -   `PINECONE_INDEX_NAME`: Es el nombre del índice de Pinecone.
    -   `PROJECT_ID`: Es el ID del proyecto.
    -   `REGION`: Es la región en la que se implementa el clúster de AlloyDB.
    -   `CLUSTER`: el nombre del clúster
    -   `INSTANCE`: El nombre de la instancia.
    -   `DB_NAME`: Es el nombre de la base de datos.
    -   `DB_USER`: Es el nombre del usuario de la base de datos.
    -   `DB_PWD`: Es la contraseña secreta de la base de datos.

    ### Weaviate

    ```
    python migrate_weaviate_vectorstore_to_alloydb.py
    ```

    Realiza los siguientes reemplazos antes de ejecutar la muestra:

    -   `WEAVIATE_API_KEY`: Es la clave de API de Weaviate.
    -   `WEAVIATE_CLUSTER_URL`: Es la URL del clúster de Weaviate.
    -   `WEAVIATE_COLLECTION_NAME`: Es el nombre de la colección de Weaviate.
    -   `PROJECT_ID`: Es el ID del proyecto.
    -   `REGION`: Es la región en la que se implementa el clúster de AlloyDB.
    -   `CLUSTER`: el nombre del clúster
    -   `INSTANCE`: El nombre de la instancia.
    -   `DB_NAME`: Es el nombre de la base de datos.
    -   `DB_USER`: Es el nombre del usuario de la base de datos.
    -   `DB_PWD`: Es la contraseña secreta de la base de datos.

    ### Croma

    ```
    python migrate_chromadb_vectorstore_to_alloydb.py
    ```

    Realiza los siguientes reemplazos antes de ejecutar la muestra:

    -   `CHROMADB_PATH`: Es la ruta de acceso a la base de datos de Chroma.
    -   `CHROMADB_COLLECTION_NAME`: Es el nombre de la colección de la base de datos de Chroma.
    -   `PROJECT_ID`: Es el ID del proyecto.
    -   `REGION`: Es la región en la que se implementa el clúster de AlloyDB.
    -   `CLUSTER`: el nombre del clúster
    -   `INSTANCE`: El nombre de la instancia.
    -   `DB_NAME`: Es el nombre de la base de datos.
    -   `DB_USER`: Es el nombre del usuario de la base de datos.
    -   `DB_PWD`: Es la contraseña secreta de la base de datos.

    ### Qdrant

    ```
    python migrate_qdrant_vectorstore_to_alloydb.py
    ```

    Realiza los siguientes reemplazos antes de ejecutar la muestra:

    -   `QDRANT_PATH`: Es la ruta de acceso a la base de datos de Qdrant.
    -   `QDRANT_COLLECTION_NAME`: Es el nombre de la colección de Qdrant.
    -   `PROJECT_ID`: Es el ID del proyecto.
    -   `REGION`: Es la región en la que se implementa el clúster de AlloyDB.
    -   `CLUSTER`: el nombre del clúster
    -   `INSTANCE`: El nombre de la instancia.
    -   `DB_NAME`: Es el nombre de la base de datos.
    -   `DB_USER`: Es el nombre del usuario de la base de datos.
    -   `DB_PWD`: Es la contraseña secreta de la base de datos.

    ### Milvus

    ```
    python migrate_milvus_vectorstore_to_alloydb.py
    ```

    Realiza los siguientes reemplazos antes de ejecutar la muestra:

    -   `MILVUS_URI`: Es el URI de Milvus.
    -   `MILVUS_COLLECTION_NAME`: Es el nombre de la colección de Milvus.
    -   `PROJECT_ID`: Es el ID del proyecto.
    -   `REGION`: Es la región en la que se implementa el clúster de AlloyDB.
    -   `CLUSTER`: el nombre del clúster
    -   `INSTANCE`: El nombre de la instancia.
    -   `DB_NAME`: Es el nombre de la base de datos.
    -   `DB_USER`: Es el nombre del usuario de la base de datos.
    -   `DB_PWD`: Es la contraseña secreta de la base de datos.

    Una migración correcta imprime registros similares a los siguientes sin errores:
    `Migration completed, inserted all the batches of data to AlloyDB`

4.  Abre AlloyDB Studio para ver los datos migrados. Para obtener más información, consulta [Administra tus datos con AlloyDB Studio](https://docs.cloud.google.com/alloydb/docs/manage-data-using-studio?hl=es-419).


## Realiza una limpieza

Para evitar que se apliquen cargos a tu cuenta de Google Cloud por los recursos usados en este instructivo, borra el proyecto que contiene los recursos o conserva el proyecto y borra los recursos individuales.

1.  En la consola de Google Cloud , ve a la página **Clústeres**.

    [Ir a los clústeres](https://console.cloud.google.com/alloydb/clusters?hl=es-419)

2.  En la columna **Nombre del recurso**, haz clic en el nombre del clúster que creaste.

3.  Haz clic en _delete_ **Borrar clúster**.

4.  En **Borrar clúster**, ingresa el nombre del clúster para confirmar que deseas borrarlo.

5.  Haz clic en **Borrar**.

    Si creaste una conexión privada cuando [creaste un clúster](#create-cluster-user), borra la conexión privada:

6.  Ve a la [página Herramientas de redes](https://console.cloud.google.com/networking/networks/details/default?hl=es-419) de la consola de Google Cloud y haz clic en **Borrar red de VPC**.


## ¿Qué sigue?

-   [Comienza a usar embeddings de vectores con AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-embedding?hl=es-419#0).
-   Aprende a [compilar aplicaciones de IA generativa con AlloyDB AI](https://docs.cloud.google.com/alloydb/docs/ai?hl=es-419).
-   [Crea un índice de ScaNN](https://docs.cloud.google.com/alloydb/docs/ai/create-scann-index?hl=es-419).
-   [Ajusta tus índices de ScaNN](https://docs.cloud.google.com/alloydb/docs/ai/tune-indexes?hl=es-419).
-   [Obtén más información para crear un asistente de compras inteligente con AlloyDB, pgvector y la administración de extremos de modelos](https://codelabs.developers.google.com/smart-shop-agent-alloydb?hl=es-419#0).

Enviar comentarios

Salvo que se indique lo contrario, el contenido de esta página está sujeto a la [licencia Atribución 4.0 de Creative Commons](https://creativecommons.org/licenses/by/4.0/), y los ejemplos de código están sujetos a la [licencia Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para obtener más información, consulta las [políticas del sitio de Google Developers](https://developers.google.com/site-policies?hl=es-419). Java es una marca registrada de Oracle o sus afiliados.

Última actualización: 2026-05-16 (UTC)
