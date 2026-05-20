 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=it) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=it)
-   [Documentation](https://docs.cloud.google.com/docs?hl=it)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=it)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=it)
-   [Guide](https://docs.cloud.google.com/alloydb/docs/overview?hl=it)

Invia feedback

# Accelerare le query utilizzando funzioni ottimizzate Mantieni tutto organizzato con le raccolte Salva e classifica i contenuti in base alle tue preferenze.

Le funzioni ottimizzate ti consentono di utilizzare un modello proxy più piccolo e veloce per elaborare la maggior parte delle query e di ricorrere a un LLM più grande solo quando necessario. Questo approccio riduce i costi operativi e migliora la reattività delle query. Le funzioni ottimizzate riducono al minimo l'utilizzo di LLM per le attività di classificazione o filtro riga per riga, che possono essere gestite meglio dal modello proxy.

**Nota:** nella release di anteprima, le funzioni di AI ottimizzate supportano solo la funzione `ai.if()` nella clausola `WHERE` o `SELECT` per un singolo alias di tabella.

Le funzioni di AI di AlloyDB come `ai.if()` possono avere una latenza elevata a causa delle chiamate remote ai modelli linguistici di grandi dimensioni (LLM). Le funzioni ottimizzate risolvono questo problema di latenza utilizzando modelli proxy più piccoli e addestrati localmente per elaborare le query. Questi modelli vengono addestrati su un campione dei tuoi dati, utilizzando l'output dell'LLM come fonte attendibile.

I controlli di accuratezza vengono eseguiti in fase di runtime su un campione di righe utilizzando l'LLM. Per eseguire questo controllo, AlloyDB utilizza l'LLM per generare etichette per le righe di esempio e le confronta con le previsioni del modello proxy per verificarne l'accuratezza. Se il controllo di accuratezza non va a buon fine, la query torna a utilizzare l'LLM.

Quando utilizzi una funzione ottimizzata, AlloyDB esegue le seguenti operazioni:

1.  Addestra un modello proxy: AlloyDB addestra un modello proxy leggero su un campione dei tuoi dati. Questa operazione viene eseguita in background quando utilizzi l'istruzione `PREPARE` con la funzione `ai.if()` per addestrare il modello per le query ottimizzate.
2.  Esegue la query: quando utilizzi l'istruzione `EXECUTE`, AlloyDB utilizza il modello proxy addestrato per elaborare la query localmente.
3.  Torna all'LLM: se l'accuratezza del modello è bassa o se AlloyDB non riesce a trovare un modello, AlloyDB torna automaticamente a utilizzare l'LLM.

![Diagramma di flusso delle funzioni ottimizzate](https://docs.cloud.google.com/alloydb/images/cost-optimized-functions-flow.png?hl=it)

## Prima di iniziare

Prima di utilizzare le funzioni ottimizzate, completa i seguenti passaggi:

-   [Connettiti al database utilizzando psql](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=it) o AlloyDB Studio come utente `postgres` o come utente che ha accesso alla tabella in cui risiedono i dati.
-   Verifica che l'estensione `google_ml_integration` sia installata e disponibile nella versione 1.5.8 o successive.

    ```
    SELECT extversion FROM pg_extension WHERE extname = 'google_ml_integration';
    extversion
    ------------
    1.5.8
    (1 row)
    ```

    **Nota:** per aggiornare l'estensione, esegui l'istruzione `ALTER EXTENSION google_ml_integration UPDATE;` statement.

-   Configura AlloyDB per funzionare con Gemini Enterprise Agent Platform. Per ulteriori informazioni, consulta [Integrare il database con Agent Platform](https://cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=it).

-   Assicurati che i seguenti flag di database siano abilitati. Per ulteriori informazioni, consulta [Configurare i flag di database di un'istanza](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=it).

    -   `google_ml_integration.enable_model_support`
    -   `google_ml_integration.enable_ai_query_engine`
    -   `google_ml_integration.enable_cost_optimized_ai_functions`
-   Genera incorporamenti per la tabella su cui vuoi eseguire query. Per ulteriori informazioni, consulta [Generare e gestire gli incorporamenti automatici per le tabelle](https://docs.cloud.google.com/alloydb/docs/ai/generate-manage-auto-embeddings-for-tables?hl=it).

-   Considera quanto segue:

    -   La colonna dei dati di origine deve essere di tipo `TEXT` o `VARCHAR`.
    -   La colonna di incorporamento che fornisce l'input alla funzione AI ottimizzata deve essere di tipo `REAL[]` o `VECTOR`.
    -   Le funzioni ottimizzate sono disponibili solo nelle regioni in cui sono disponibili i modelli generativi di Agent Platform. Per un elenco delle regioni disponibili, consulta [Deployment ed endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations?hl=it).

## Utilizzare le funzioni ottimizzate

Per utilizzare una funzione ottimizzata, utilizza le istruzioni `PREPARE` e `EXECUTE` con la funzione `ai.if()`. Di seguito è riportato un esempio di come utilizzare una funzione ottimizzata:

1.  Crea una tabella `restaurant_reviews`. La colonna `review` che contiene i dati di origine è di tipo `TEXT` e la colonna `review_embedding` utilizzata per le query è di tipo `VECTOR(768)`.

    ```
    CREATE TABLE restaurant_reviews (
        id SERIAL,
        name VARCHAR(64),
        city VARCHAR(64),
        review TEXT,
        review_embedding VECTOR(768)
    );
    ```

    **Nota:** per informazioni su come generare incorporamenti dai dati di origine, consulta [Generare e gestire gli incorporamenti automatici per le tabelle](https://docs.cloud.google.com/alloydb/docs/ai/generate-manage-auto-embeddings-for-tables?hl=it).

2.  Utilizza un'istruzione `PREPARE` con la funzione `ai.if()` per indicare che la query deve utilizzare una funzione ottimizzata. Questa istruzione attiva l'addestramento asincrono del modello in background.

    Il modello viene addestrato solo nelle seguenti condizioni:

    -   Nella query è presente esattamente una funzione `ai.if()`.
    -   `ai.if()` non si trova all'interno di una sottoquery.

    ```
    PREPARE positive_reviews_query AS
    SELECT r.name, r.city
    FROM restaurant_reviews r
    WHERE ai.if('Is the following a positive review? Review: ' || r.review, r.review_embedding)
    GROUP BY r.name, r.city
    HAVING COUNT(*) > 500;
    ```

3.  Esegui la query utilizzando l'istruzione `EXECUTE`. Poiché l'istruzione `PREPARE` è specifica per la sessione corrente, devi eseguire l'istruzione `EXECUTE` sulla stessa connessione:

    ```
    EXECUTE positive_reviews_query;
    ```

    **Nota:** anche altre connessioni possono eseguire la stessa query e usufruire delle funzioni ottimizzate. Ad esempio, puoi eseguire la query esatta in un'altra connessione.

    ```
    conn2=> SELECT r.name, r.city
        FROM restaurant_reviews r
        WHERE ai.if('Is the following a positive review? Review: ' || r.review, r.review_embedding)
        GROUP BY r.name, r.city
        HAVING COUNT(*) > 500;
    ```

    Il modello proxy addestrato non viene utilizzato se si verifica una delle seguenti condizioni:

    -   La colonna di contenuti o di incorporamento a cui fa riferimento `ai.if()` cambia. Entrambe le colonne devono appartenere alla stessa tabella.
    -   Il prompt fornito alla colonna dei contenuti cambia.
    -   La struttura della query cambia, generando un `query_id` diverso.
    -   La query non soddisfa la soglia di controllo dell'accuratezza all'inizio della query.

    In questi casi, la query torna a utilizzare l'LLM e AlloyDB restituisce un avviso.

4.  (Facoltativo) Per disattivare il controllo di convalida dell'accuratezza per l'intero ambiente di database, necessario perché i controlli di accuratezza vengono eseguiti anche durante l'addestramento del modello, esegui il seguente comando.

    ```
    ALTER DATABASE DATABASE_NAME SET google_ml_integration.runtime_accuracy_check = off;
    ```

    Sostituisci `DATABASE_NAME` con il nome del tuo database.


## Riaddestrare un modello proxy

Se i dati della tabella sottostante cambiano in modo significativo, puoi riaddestrare il modello proxy eseguendo di nuovo l'istruzione `PREPARE`. La ripreparazione di una query sostituisce il modello proxy esistente avviando una nuova richiesta di addestramento.

**Nota:** le query che differiscono solo per i valori costanti nella clausola `WHERE` o `SELECT` potrebbero comunque utilizzare un modello addestrato esistente.

## Limitazioni

Se modifichi la colonna dei contenuti di origine, la colonna di incorporamento o il prompt fornito alla funzione `ai.if()`, devi emettere una nuova istruzione `PREPARE`. AlloyDB addestra la funzione ottimizzata per approssimare il comportamento di una combinazione univoca di prompt e dati di input.

## Passaggi successivi

-   [Risolvi i problemi relativi alle funzioni ottimizzate](https://docs.cloud.google.com/alloydb/docs/troubleshoot/troubleshoot-optimized-func?hl=it).

Invia feedback

Salvo quando diversamente specificato, i contenuti di questa pagina sono concessi in base alla [licenza Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/), mentre gli esempi di codice sono concessi in base alla [licenza Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Per ulteriori dettagli, consulta le [norme del sito di Google Developers](https://developers.google.com/site-policies?hl=it). Java è un marchio registrato di Oracle e/o delle sue consociate.

Ultimo aggiornamento 2026-05-16 UTC.
