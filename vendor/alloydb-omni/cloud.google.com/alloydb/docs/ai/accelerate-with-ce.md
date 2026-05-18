 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=it) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=it)
-   [Documentation](https://docs.cloud.google.com/docs?hl=it)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=it)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=it)
-   [Guide](https://docs.cloud.google.com/alloydb/docs/overview?hl=it)

Invia feedback

# Accelerare la ricerca vettoriale con il motore colonnare Mantieni tutto organizzato con le raccolte Salva e classifica i contenuti in base alle tue preferenze.

**Anteprima**

Questa funzionalità è soggetta ai "Termini dell'offerta pre-GA" nella sezione dei Termini di servizio generali dei [Termini specifici dei servizi](https://docs.cloud.google.com/terms/service-terms?hl=it#1). Le funzionalità pre-GA sono disponibili "così come sono" e potrebbero avere un supporto limitato. Per ulteriori informazioni, consulta le [descrizioni della fase di lancio](https://cloud.google.com/products/?hl=it#product-launch-stages).

Puoi utilizzare il motore colonnare AlloyDB per PostgreSQL per accelerare le ricerche vettoriali quando utilizzi l'indice Scalable Nearest Neighbors (ScaNN) o Hierarchical Navigable Small World (HNSW). Il motore colonnare funge da cache in memoria ottimizzata per la lettura per questi indici vettoriali.

La memorizzazione nella cache degli indici nel motore colonnare gestisce le query direttamente da una rappresentazione in memoria dell'indice ottimizzata per la lettura e aumenta il numero di query al secondo (QPS) che il database può gestire per i carichi di lavoro di ricerca di vettori.

Puoi utilizzare HNSW solo con il motore columnstore per i cluster AlloyDB che eseguono PostgreSQL 17 o versioni successive. ScaNN con il motore colonnare non presenta questa limitazione.

## Prima di iniziare

-   Imposta i flag di database `google_columnar_engine.enabled` e `google_columnar_engine.enable_index_caching` su `on` per abilitare il motore colonnare e la relativa funzionalità di memorizzazione nella cache degli indici.
    
    ```
    gcloud alloydb instances update INSTANCE_ID \
        --database-flags google_columnar_engine.enabled=on,google_columnar_engine.enable_index_caching=on \
        --region=REGION \
        --cluster=CLUSTER_ID \
        --project=PROJECT_ID
    ```
    
    Sostituisci quanto segue:
    
    -   `INSTANCE_ID`: l'ID dell'istanza in cui vuoi attivare il motore colonnare.
    -   `REGION`: la regione in cui si trova l'istanza, ad esempio `us-central1`.
    -   `CLUSTER_ID`: l'ID del cluster in cui si trova l'istanza.
    -   `PROJECT_ID`: l'ID del progetto in cui si trova il cluster.
    
    Per saperne di più sull'impostazione dei flag, consulta [Configura i flag di database](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=it).
    
-   [Crea un indice ScaNN](https://docs.cloud.google.com/alloydb/docs/ai/create-scann-index?hl=it) o [Crea un indice HNSW](https://docs.cloud.google.com/alloydb/docs/ai/create-hnsw-index?hl=it) nel tuo database.
    

## Aggiungi un indice al motore colonnare

Dopo aver attivato il motore colonnare, puoi aggiungere un indice esistente alla cache utilizzando la funzione SQL `google_columnar_engine_add_index()`.

Per aggiungere un indice al motore colonnare:

1.  Nella console Google Cloud , vai alla pagina **Cluster**.
    
    [Vai a Cluster](https://console.cloud.google.com/alloydb/clusters?hl=it)
    
2.  Per visualizzare la pagina **Panoramica** del cluster, fai clic sul nome del cluster AlloyDB nella colonna **Nome risorsa**.
    
3.  Nel riquadro di navigazione, fai clic su **AlloyDB Studio**.
    
4.  Accedi ad **AlloyDB Studio** utilizzando il nome del database, il nome utente e la password.
    
5.  Nella scheda **Editor 1**, inserisci la seguente query:
    
    ```
    SELECT google_columnar_engine_add_index('INDEX_NAME');
    ```
    
    Sostituisci `INDEX_NAME` con il nome dell'indice vettoriale.
    
    1.  Fai clic su **Esegui**.

**Nota:** l'aggiunta di un indice al motore colonnare può essere un'operazione a lunga esecuzione, a seconda delle dimensioni dell'indice. Se questa operazione va in timeout in **AlloyDB Studio**, ti consigliamo di eseguire questo comando da una [`psql` sessione client](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=it).

Dopo aver aggiunto un indice al motore colonnare, tutte le query che utilizzano questo indice vengono accelerate automaticamente dal motore colonnare. Puoi verificare che le tue query vettoriali vengano accelerate dal motore colonnare utilizzando il piano `EXPLAIN (ANALYZE, COLUMNAR_ENGINE)` nella query.

## Verifica l'utilizzo della cache

Per verificare che le query vettoriali vengano accelerate dal motore colonnare, puoi utilizzare il piano `EXPLAIN (ANALYZE, COLUMNAR_ENGINE)` nella query.

### Esempio di piano di esecuzione ScaNN

Di seguito è riportato un esempio di piano di esecuzione per una query che utilizza un indice ScaNN aggiunto al motore colonnare:

```
EXPLAIN (ANALYZE TRUE, SCANN TRUE, COSTS FALSE, TIMING FALSE, SUMMARY FALSE, VERBOSE FALSE, COLUMNAR_ENGINE TRUE)
SELECT * FROM t ORDER BY val <=> '[0.5,0.5,0.5,0.5]' LIMIT 100;

--This contains details about ScaNN's usage from the columnar engine. Example:
------------------------------------------------------------------------------------------------------
 Index Scan using scann_idx on t t_1 (actual rows=100 loops=1)
      Order By: (val <=> '[0.5,0.5,0.5,0.5]'::vector)
      Limit: 100
      ScaNN Info: (... columnar engine nodes hit=6...)
      Columnar Engine ScaNN Info: (index found=true)
(5 rows)
```

La presenza di `columnar engine nodes hit` e `Columnar Engine ScaNN Info: (index found=true)` nell'output conferma che il motore colonnare viene utilizzato per la query.

### Esempio di piano di esecuzione HNSW

Il piano di esecuzione mostra la sezione **Informazioni su HNSW del motore colonnare** per l'indice corrispondente, che mostra metriche come il rapporto tra gli elementi recuperati dal motore colonnare (`elements_from_ce`) e dal disco (`elements_from_disk`).

Di seguito è riportato un esempio di piano di esecuzione per una query che utilizza un indice HNSW aggiunto al motore colonnare:

```
EXPLAIN (ANALYZE, COLUMNAR_ENGINE) SELECT * FROM documents ORDER BY embedding <=> '[0.1, 0.2, 0.3, 0.4, 0.5]'::vector LIMIT 5;

--This contains details about HNSW's usage from the columnar engine. Example:
------------------------------------------------------------------------------------------------------
 Limit (actual rows=5 loops=1)
   ->  Index Scan using hnsw_idx on documents (actual rows=5 loops=1)
         Order By: (embedding '[0.1, 0.2, 0.3, 0.4, 0.5]'::vector)
         Columnar Engine HNSW Info: (index found=true elements_from_ce=385 elements_from_disk=0)
         Columnar Check: table is not in the columnar store
(5 rows)
```

La risposta mostra che l'indice viene accelerato dal motore colonnare, in quanto tutti gli elementi sono stati recuperati dal motore colonnare (`elements_from_ce=385`) e nessuno è stato recuperato dal disco (`elements_from_disk=0`).

Quando le modifiche ai dati, ad esempio le istruzioni `INSERT`, `UPDATE` o `DELETE`, invalidano le voci della cache, il motore colonnare utilizza un approccio ibrido per mantenere l'accuratezza e le prestazioni. Legge i vettori validi memorizzati nella cache direttamente dalla memoria e recupera dal disco solo i vettori modificati o nuovi.

Se modifichi una grande quantità di dati, potresti notare un aumento temporaneo di elements\_from\_disk e un calo delle prestazioni fino all'aggiornamento della cache.

## Gestire l'indice memorizzato nella cache

Per gestire il ciclo di vita degli indici memorizzati nella cache:

1.  Nella console Google Cloud , vai alla pagina **Cluster**.
    
    [Vai a Cluster](https://console.cloud.google.com/alloydb/clusters?hl=it)
    
2.  Per visualizzare la pagina **Panoramica** del cluster, fai clic sul nome del cluster AlloyDB nella colonna **Nome risorsa**.
    
3.  Nel riquadro di navigazione, fai clic su **AlloyDB Studio**.
    
4.  Accedi ad **AlloyDB Studio** utilizzando il nome del database, il nome utente e la password.
    
5.  Nella scheda **Editor 1**, inserisci il comando SQL per l'attività selezionata:
    
    -   Per aggiornare manualmente la cache, esegui questo comando:
        
        ```
        SELECT google_columnar_engine_refresh_index('INDEX_NAME');
        ```
        
    -   Per verificare lo stato dell'indice, esegui questo comando:
        
        ```
        SELECT google_columnar_engine_verify('INDEX_NAME');
        ```
        
    -   Per eliminare l'indice dalla cache, esegui questo comando:
        
        ```
        SELECT google_columnar_engine_drop_index('INDEX_NAME');
        ```
        
    -   Per visualizzare gli indici attivi, esegui questo comando:
        
        ```
        SELECT * FROM g_columnar_indexes;
        ```
        
    -   Per visualizzare gli indici partizionati, esegui questo comando:
        
        ```
        SELECT * FROM g_columnar_index_partitions;
        ```
        
    
    Sostituisci `INDEX_NAME` con il nome dell'indice.
    
6.  Fai clic su **Esegui**.
    

## Limitazioni

L'aggiornamento degli indici HNSW accelerati del motore colonnare può consumare temporaneamente memoria fino al doppio delle dimensioni dell'indice.

## Passaggi successivi

-   [Crea un indice HNSW](https://docs.cloud.google.com/alloydb/docs/ai/create-hnsw-index?hl=it)
-   [Crea un indice ScaNN](https://docs.cloud.google.com/alloydb/docs/ai/create-scann-index?hl=it)
-   [Panoramica del motore colonnare](https://docs.cloud.google.com/alloydb/docs/ai/columnar-engine-overview?hl=it)
-   [Gestire gli indici ScaNN nel motore colonnare](https://docs.cloud.google.com/alloydb/docs/columnar-engine/manage-content-manually?hl=it)
-   [Eseguire la ricerca vettoriale](https://docs.cloud.google.com/alloydb/docs/ai/perform-vector-search?hl=it#accelerate-filtered-vector-search)

Invia feedback

Salvo quando diversamente specificato, i contenuti di questa pagina sono concessi in base alla [licenza Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/), mentre gli esempi di codice sono concessi in base alla [licenza Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Per ulteriori dettagli, consulta le [norme del sito di Google Developers](https://developers.google.com/site-policies?hl=it). Java è un marchio registrato di Oracle e/o delle sue consociate.

Ultimo aggiornamento 2026-05-16 UTC.