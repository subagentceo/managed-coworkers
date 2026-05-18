 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=de) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=de)
-   [Documentation](https://docs.cloud.google.com/docs?hl=de)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=de)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=de)
-   [Leitfäden](https://docs.cloud.google.com/alloydb/docs/overview?hl=de)

Feedback geben

# Remote-KI-Modelle mithilfe der Modellendpunktverwaltung registrieren und aufrufen Mit Sammlungen den Überblick behalten Sie können Inhalte basierend auf Ihren Einstellungen speichern und kategorisieren.

Auf dieser Seite wird beschrieben, wie Sie Vorhersagen aufrufen oder Einbettungen mit einem Modell generieren, indem Sie den Modellendpunkt bei der Endpunktverwaltung registrieren.

## Hinweis

-   [Prüfen Sie, ob die Erweiterung `google_ml_integration` installiert ist.](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=de#verify-installed-extension)
    
-   [Prüfen, ob das Flag `google_ml_integration.enable_model_support` auf `on` gesetzt ist](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=de)
    

### Erweiterung einrichten

1.  [Stellen Sie mit dem Nutzer `postgres` eine Verbindung zu Ihrer Datenbank über `psql`](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=de) oder AlloyDB for PostgreSQL Studio her.
    
2.  Optional: [Zugriff auf die Funktionen für die Interaktion mit AlloyDB for PostgreSQL AI-Funktionen (](https://docs.google.com/forms/d/e/1FAIpQLSfJ9vHIJ79nI7JWBDELPFL75pDQa4XVZQ2fxShfYddW0RwmLw/viewform?hl=de)[Vorabversion](https://cloud.google.com/products?hl=de#product-launch-stages)) anfordern, einschließlich Unterstützung für multimodale Modelle, Ranking-Modelle und Operatorfunktionen.
    
3.  Optional: Gewähren Sie einem PostgreSQL-Nutzer, der kein Super Admin ist, die Berechtigung zum Verwalten von Modellmetadaten:
    
      ```
      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA google_ml TO NON_SUPER_USER;
    ```
    
    Ersetzen Sie die folgende Variable:
    
    -   `NON_SUPER_USER`: Der PostgreSQL-Nutzername, der kein Superuser ist.
4.  Die ausgehende IP muss aktiviert sein, damit auf Modelle zugegriffen werden kann, die außerhalb Ihrer VPC gehostet werden, z. B. Modelle von Drittanbietern. Weitere Informationen finden Sie unter [Ausgehende Verbindung hinzufügen](https://docs.cloud.google.com/alloydb/docs/connect-public-ip?hl=de#add-outbound-connectivity).
    

### Authentifizierung einrichten

In den folgenden Abschnitten wird beschrieben, wie Sie die Authentifizierung einrichten, bevor Sie einen Modellendpunkt registrieren.

#### Integration in die Gemini Enterprise Agent Platform und Installation der Erweiterung

Wenn Sie die Modellendpunkte der Agent Platform verwenden möchten, müssen Sie dem IAM-basierten AlloyDB-Dienstkonto, das Sie zum Herstellen einer Verbindung zur Datenbank verwenden, Agent Platform-Berechtigungen hinzufügen.

1.  [Nutzerzugriff auf Agent Platform-Modelle konfigurieren](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=de)
2.  Prüfen Sie, ob die aktuelle Version von `google_ml_integration` installiert ist.
    1.  Führen Sie den folgenden Befehl aus, um die installierte Version zu prüfen:
        
        SELECT extversion FROM pg\_extension WHERE extname \= 'google\_ml\_integration';
        extversion 
        \------------
        1.5.2
        (1 row)
        
    2.  Wenn die Erweiterung nicht installiert ist oder die installierte Version älter als 1.5.2 ist, aktualisieren Sie die Erweiterung.
        
        CREATE EXTENSION IF NOT EXISTS google\_ml\_integration;
        ALTER EXTENSION google\_ml\_integration UPDATE;
        
        Wenn beim Ausführen der vorherigen Befehle Probleme auftreten oder die Erweiterung nach dem Ausführen der vorherigen Befehle nicht auf Version 1.5.2 aktualisiert wird, wenden Sie sich an den [Google Cloud -Support](https://cloud.google.com/support?hl=de).
        
3.  Wenn Sie die Funktionen der AlloyDB AI-Abfrage-Engine verwenden möchten, setzen Sie das Flag `google_ml_integration.enable_ai_query_engine` auf `on`.
    
    ### SQL
    
    1.  Aktivieren Sie die KI-Abfrage-Engine für die aktuelle Sitzung.  
        
        SET google\_ml\_integration.enable\_ai\_query\_engine \= on;
        
    2.  Funktionen für eine bestimmte Datenbank sitzungsübergreifend aktivieren  
        
        ALTER DATABASE DATABASE\_NAME SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';
        
    3.  Aktivieren Sie die KI-Abfrage-Engine für einen bestimmten Nutzer über Sitzungen und Datenbanken hinweg.  
        
        ALTER ROLE postgres SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';
        
    
    ### Console
    
    Wenn Sie den Wert des Flags `google_ml_integration.enable_ai_query_engine` ändern möchten, folgen Sie der Anleitung unter [Datenbank-Flags einer Instanz konfigurieren](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=de#console).
    
    ### gcloud
    
    Wenn Sie die gcloud CLI verwenden möchten, können Sie die Google Cloud CLI [installieren und initialisieren](https://docs.cloud.google.com/sdk/docs/install?hl=de) oder [Cloud Shell](https://docs.cloud.google.com/shell/docs/using-cloud-shell?hl=de) verwenden.
    
    Sie können den Wert des Flags `google_ml_integration.enable_ai_query_engine` ändern. Weitere Informationen finden Sie unter [Datenbank-Flags einer Instanz konfigurieren](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=de#console).
    
    gcloud alloydb instances update INSTANCE\_ID \\
      --database-flags google\_ml\_integration.enable\_ai\_query\_engine=on \\
      --region=REGION\_ID \\
      --cluster=CLUSTER\_ID \\
      --project=PROJECT\_ID
    

#### Authentifizierung mit Secret Manager einrichten

In diesem Abschnitt wird beschrieben, wie Sie die Authentifizierung einrichten, wenn Sie Secret Manager zum Speichern von Authentifizierungsdetails für Drittanbieter verwenden.

Dieser Schritt ist optional, wenn Ihr Modellendpunkt die Authentifizierung nicht über Secret Manager verarbeitet, z. B. wenn Ihr Modellendpunkt HTTP-Header zum Übergeben von Authentifizierungsinformationen verwendet oder überhaupt keine Authentifizierung verwendet.

So erstellen und verwenden Sie einen API-Schlüssel oder ein Inhabertoken:

1.  Erstellen Sie das Secret in Secret Manager. Weitere Informationen finden Sie unter [Secret erstellen und auf die Secret-Version zugreifen](https://docs.cloud.google.com/secret-manager/docs/create-secret-quickstart?hl=de#create_a_secret_and_access_a_secret_version).
    
    Der Secret-Pfad wird in der SQL-Funktion [`google_ml.create_sm_secret()`](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=de#google_mlcreate_sm_secret) verwendet.
    
2.  Gewähren Sie dem AlloyDB-Cluster Berechtigungen für den Zugriff auf das Secret.
    
      ```
      gcloud secrets add-iam-policy-binding 'SECRET_NAME' \
          --member="serviceAccount:SERVICE_ACCOUNT_ID" \
          --role="roles/secretmanager.secretAccessor"
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `SECRET_NAME`: Der Secret-Name im Secret Manager.
    -   `SERVICE_ACCOUNT_ID`: Die ID des IAM-basierten Dienstkontos im Format `serviceAccount:service-PROJECT_ID@gcp-sa-alloydb.iam.gserviceaccount.com`, z. B. `service-212340152456@gcp-sa-alloydb.iam.gserviceaccount.com`.
        
        Sie können diese Rolle dem Dienstkonto auch auf Projektebene zuweisen. Weitere Informationen finden Sie unter [IAM-Richtlinienbindung hinzufügen](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding?hl=de).
        

#### Authentifizierung mit Headern einrichten

Das folgende Beispiel zeigt, wie Sie die Authentifizierung mit einer Funktion einrichten. Die Funktion gibt ein JSON-Objekt mit den Headern zurück, die für eine Anfrage an das Einbettungsmodell erforderlich sind.

  ```
  CREATE OR REPLACE FUNCTION HEADER_GEN_FUNCTION(
    model_id VARCHAR(100),
    input_text TEXT
  )
  RETURNS JSON
  LANGUAGE plpgsql
  AS $$
  #variable_conflict use_variable
  DECLARE
    api_key VARCHAR(255) := 'API_KEY';
    header_json JSON;
  BEGIN
    header_json := json_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || api_key
    );
    RETURN header_json;
  END;
  $$;
```

Ersetzen Sie Folgendes:

-   `HEADER_GEN_FUNCTION`: Der Name der Funktion zur Header-Generierung, die Sie bei der Registrierung eines Modells verwenden können.
-   `API_KEY`: Der API-Schlüssel des Modellanbieters.

### Model Garden-Modelle auf einem Agent Platform-Endpunkt bereitstellen

Zusätzlich zu Gemini- oder anderen Agent Platform-Modellen, die standardmäßig verfügbar sind, können Sie Modelle aus Model Garden hosten, die für bestimmte Aufgaben optimiert sind. In der Regel wird zuerst ein Modell aus Model Garden an einem öffentlichen Agent Platform-Endpunkt bereitgestellt und dieser Endpunkt dann bei AlloyDB registriert. Diese aufgabenspezifischen Modelle werden mit einem entsprechenden `model_type` registriert, z. B. `ts_forecasting` im Fall des `TimesFM`\-Modells, und mit speziellen SQL-Funktionen verwendet.

Führen Sie die folgenden Schritte aus, um ein im Model Garden gehostetes Modell an einem Agent Platform-Endpunkt bereitzustellen:

1.  Rufen Sie in der Google Cloud Console die Seite **Model Garden** auf:
    
    [Zu Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden?hl=de)
    
2.  Suchen Sie das Modell und wählen Sie **Bereitstellen** aus.
    
3.  Wählen Sie in den Bereitstellungseinstellungen unter **Endpunktzugriff** die Option **Öffentlich (gemeinsamer Endpunkt)** aus, damit der Endpunkt öffentlich zugänglich und für AlloyDB for PostgreSQL erreichbar ist.
    
4.  Nachdem die Bereitstellung abgeschlossen ist, rufen Sie die Detailseite des Endpunkts auf und kopieren Sie die URL für Modellanfragen aus dem Bereich **Beispielanfrage**.
    

## Texteinbettungsmodelle

In diesem Abschnitt wird beschrieben, wie Sie Modellendpunkte bei der Modellendpunktverwaltung registrieren.

Die Modellendpunktverwaltung unterstützt einige Texteinbettungs- und allgemeine Agent Platform-Modelle als vorregistrierte Modellendpunkte. Je nach Modelltyp können Sie die Modell-ID direkt verwenden, um Einbettungen zu generieren oder Vorhersagen aufzurufen. Weitere Informationen zu unterstützten vorregistrierten Modellen finden Sie unter [Vorregistrierte Agent Platform-Modelle](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=de#pre-registered_models).

**Hinweis** :Die Unterstützung von Modellen auf der Agent Platform unterliegt den Richtlinien zur Versionsverwaltung und zum Lebenszyklus von Modellen auf der Agent Platform. Weitere Informationen zu stabilen Versionen finden Sie unter [Modellversionen und Lebenszyklus](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions?hl=de).

Das `gemini-embedding-001`\-Modell ist nur in der Region `us-central1` verfügbar.

Wenn Sie beispielsweise das vorregistrierte Modell `gemini-embedding-001` aufrufen möchten, können Sie das Modell direkt mit der Einbettungsfunktion aufrufen:

```
SELECT
      embedding(
        model_id => 'gemini-embedding-001',
        content => 'AlloyDB is a managed, cloud-hosted SQL database service');
```

Wenn sich Ihr AlloyDB-Cluster und der Agent Platform-Endpunkt in verschiedenen Projekten befinden, legen Sie `model_id` auf den qualifizierten Pfad des Endpunkts fest, z. B. `projects/PROJECT_ID/locations/REGION_ID/publishers/google/models/gemini-embedding-001`.

Um das vorregistrierte Modell `gemini-1.5-pro:generateContent` aufzurufen, können Sie das Modell direkt mit der Vorhersagefunktion aufrufen:

 ```
 SELECT google_ml.predict_row(
            model_id => 'gemini-1.5-pro:generateContent',
            request_body => '{
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": "For TPCH database schema as mentioned here https://www.tpc.org/TPC_Documents_Current_Versions/pdf/TPC-H_v3.0.1.pdf , generate a SQL query to find all supplier names which are located in the India nation. Only provide SQL query with no explanation."
                    }
                ]
            }
        ]
        }')-> 'candidates' -> 0 -> 'content' -> 'parts' -> 0 -> 'text';
```

Informationen zum Generieren von Einbettungen finden Sie unter [Texteinbettungen generieren](https://docs.cloud.google.com/alloydb/docs/ai/work-with-embeddings?hl=de). Informationen zum Aufrufen von Vorhersagen finden Sie unter [Vorhersagen aufrufen](https://docs.cloud.google.com/alloydb/docs/ai/invoke-predictions?hl=de).

### Texteinbettungsmodelle mit integrierter Unterstützung

Die Modellendpunktverwaltung bietet integrierte Unterstützung für einige Modelle von Agent Platform und OpenAI. Eine Liste der Modelle mit integrierter Unterstützung finden Sie unter [Modelle mit integrierter Unterstützung](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=de#models_with_built-in_support).

Bei Modellen mit integrierter Unterstützung können Sie den qualifizierten Namen als qualifizierten Modellnamen festlegen und die Anfrage-URL angeben. Bei der automatischen Verwaltung von Modellendpunkten wird das Modell automatisch erkannt und es werden Standardtransformationsfunktionen eingerichtet.

#### Agent Platform-Modelle zur Einbettung

**Hinweis:** Verwenden Sie die [Funktion „public.embedding()“](https://docs.cloud.google.com/alloydb/docs/ai/work-with-embeddings?hl=de), um Agent Platform-Modelle ohne Registrierung oder Anpassung abzufragen. Wenn Sie benutzerdefinierte Informationen wie den Aufgabentyp übergeben möchten, müssen Sie das Agent Platform-Modell registrieren und dann die Funktion `google_ml.embedding()` verwenden.

In den folgenden Schritten wird gezeigt, wie Sie Agent Platform-Modelle mit integrierter Unterstützung registrieren. Als Beispiel werden die Modellendpunkte `gemini-embedding-001` und `text-multilingual-embedding-002` verwendet.

**Hinweis:** Nur für den Modellendpunkt `text-multilingual-embedding-002` müssen die von der Modellendpunktverwaltung bereitgestellten Transformationsfunktionen eingerichtet werden.

Achten Sie darauf, dass sich sowohl der AlloyDB-Cluster als auch das Agent Platform-Modell, das Sie abfragen, in derselben Region befinden.

1.  [Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=de)
    
2.  [`google_ml_integration`\-Erweiterung einrichten](#set-up-extension)
    
3.  Rufen Sie die Funktion zum Erstellen des Modells auf, um den Modellendpunkt hinzuzufügen:
    
    ### gemini-embedding-001
    
      ```
      CALL
        google_ml.create_model(
          model_id => 'gemini-embedding-001',
          model_request_url => 'publishers/google/models/gemini-embedding-001',
          model_provider => 'google',
          model_qualified_name => 'gemini-embedding-001',
          model_type => 'text_embedding',
          model_auth_type => 'alloydb_service_agent_iam');
    ```
    
    ### text-multilingual-embedding-002
    
      ```
      CALL
        google_ml.create_model(
          model_id => 'text-multilingual-embedding-002',
          model_request_url => 'publishers/google/models/text-multilingual-embedding-002',
          model_provider => 'google',
          model_qualified_name => 'text-multilingual-embedding-002',
          model_type => 'text_embedding',
          model_auth_type => 'alloydb_service_agent_iam'
          model_in_transform_fn => 'google_ml.vertexai_text_embedding_input_transform',
          model_out_transform_fn => 'google_ml.vertexai_text_embedding_output_transform');
    ```
    

Wenn das Modell in einem anderen Projekt und einer anderen Region als Ihr AlloyDB-Cluster gespeichert ist, legen Sie die Anfrage-URL auf `projects/PROJECT_ID/locations/REGION_ID/publishers/google/models/MODEL_ID` fest, wobei `REGION_ID` die Region ist, in der Ihr Modell gehostet wird, und `MODEL_ID` der qualifizierte Modellname.

Außerdem müssen Sie dem AlloyDB-Dienstkonto des Projekts, in dem sich die AlloyDB-Instanz befindet, die [Rolle „Vertex AI User“ (`roles/aiplatform.user`) zuweisen](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=de#enable-access), damit AlloyDB auf das im anderen Projekt gehostete Modell zugreifen kann.

#### OpenAI-Modell zur Texteinbettung

Die Erweiterung `google_ml_integration` richtet automatisch Standardtransformationsfunktionen ein und ruft die Remote-OpenAI-Modelle auf. Eine Liste der Modelle mit integrierter Unterstützung finden Sie unter [Modelle mit integrierter Unterstützung](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=de#models_with_built-in_support).

Im folgenden Beispiel wird der OpenAI-Modellendpunkt `text-embedding-ada-002` hinzugefügt. Sie können die OpenAI-Modellendpunkte `text-embedding-3-small` und `text-embedding-3-large` mit denselben Schritten registrieren und dabei die für die Modelle spezifischen qualifizierten Modellnamen festlegen.

1.  Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.
2.  [`google_ml_integration`\-Erweiterung einrichten](#set-up-extension)
3.  [Fügen Sie den OpenAI-API-Schlüssel zur Authentifizierung als Secret in Secret Manager hinzu.](#setup-secret-manager)
4.  Rufen Sie das im Secret Manager gespeicherte Secret auf:
    
    ```
    CALL
    google_ml.create_sm_secret(
      secret_id => 'SECRET_ID',
      secret_path => 'projects/PROJECT_ID/secrets/SECRET_MANAGER_SECRET_ID/versions/VERSION_NUMBER');
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `SECRET_ID`: Die Secret-ID, die Sie festgelegt haben und die später bei der Registrierung eines Modellendpunkts verwendet wird, z. B. `key1`.
    -   `SECRET_MANAGER_SECRET_ID`: Die Secret-ID, die beim Erstellen des Secrets im Secret Manager festgelegt wurde.
    -   `PROJECT_ID`: Die ID Ihres Projekts in Google Cloud .
    -   `VERSION_NUMBER`: Die Versionsnummer der Secret-ID.
5.  Rufen Sie die Funktion zum Erstellen von Modellen auf, um den Modellendpunkt `text-embedding-ada-002` zu registrieren:
    
    ```
    CALL
      google_ml.create_model(
        model_id => 'MODEL_ID',
        model_provider => 'open_ai',
        model_type => 'text_embedding',
        model_qualified_name => 'text-embedding-ada-002',
        model_auth_type => 'secret_manager',
        model_auth_id => 'SECRET_ID');
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `MODEL_ID`: Eine eindeutige ID für den Modellendpunkt, die Sie definieren. Auf diese Modell-ID wird für Metadaten verwiesen, die der Modellendpunkt zum Generieren von Einbettungen oder zum Aufrufen von Vorhersagen benötigt.
    -   `SECRET_ID`: Die Secret-ID, die Sie zuvor im `google_ml.create_sm_secret()`\-Verfahren verwendet haben.

Informationen zum Generieren von Einbettungen finden Sie unter [Texteinbettungen generieren](https://docs.cloud.google.com/alloydb/docs/ai/work-with-embeddings?hl=de).

### Benutzerdefiniertes Texteinbettungsmodell

In diesem Abschnitt wird beschrieben, wie Sie einen benutzerdefinierten gehosteten Modellendpunkt registrieren, Transformationsfunktionen erstellen und optional benutzerdefinierte HTTP-Header erstellen. Alle benutzerdefinierten gehosteten Modellendpunkte werden unterstützt, unabhängig davon, wo sie gehostet werden.

Im folgenden Beispiel wird der benutzerdefinierte Modellendpunkt `custom-embedding-model` hinzugefügt, der von Cymbal gehostet wird. Mit den Transformationsfunktionen `cymbal_text_input_transform` und `cymbal_text_output_transform` wird das Ein- und Ausgabeformat des Modells in das Ein- und Ausgabeformat der Vorhersagefunktion transformiert.

So registrieren Sie vom Kunden gehostete Modellendpunkte für Texteinbettungen:

1.  [Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=de)
    
2.  [`google_ml_integration`\-Erweiterung einrichten](#set-up-extension)
    
3.  [Optional: Fügen Sie den API-Schlüssel zur Authentifizierung als Secret in Secret Manager hinzu](#setup-secret-manager)
    
4.  Rufen Sie das im Secret Manager gespeicherte Secret auf:
    
    ```
    CALL
      google_ml.create_sm_secret(
        secret_id => 'SECRET_ID',
        secret_path => 'projects/PROJECT_ID/secrets/SECRET_MANAGER_SECRET_ID/versions/VERSION_NUMBER');
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `SECRET_ID`: Die Secret-ID, die Sie festgelegt haben und die später bei der Registrierung eines Modellendpunkts verwendet wird, z. B. `key1`.
    -   `SECRET_MANAGER_SECRET_ID`: Die Secret-ID, die beim Erstellen des Secrets im Secret Manager festgelegt wurde.
    -   `PROJECT_ID`: Die ID Ihres Projekts in Google Cloud .
    -   `VERSION_NUMBER`: Die Versionsnummer der Secret-ID.
    
    **Hinweis** :Secret Manager generiert standardmäßig den Header `Authorization: Bearer SECRET_VALUE_FROM_SECRET_MANAGER` für die Authentifizierung. Wenn dieses Format mit dem Format des Inhabertokens zur Autorisierung Ihres Modellendpunkts übereinstimmt, müssen Sie keine Autorisierungsheader mit der Header-Generierungsfunktion generieren.
    
5.  Erstellen Sie die Transformationsfunktionen für Ein- und Ausgabe basierend auf der folgenden Signatur für die Vorhersagefunktion für Modellendpunkte für Texteinbettungen. Weitere Informationen zum Erstellen von Transformationsfunktionen finden Sie unter [Beispiel für Transformationsfunktionen](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=de#transform-func-example).
    
    Im Folgenden finden Sie Beispiel-Transformationsfunktionen, die speziell für den Modellendpunkt `custom-embedding-model` für Texteinbettungen gelten:
    
    ```
    -- Input Transform Function corresponding to the custom model endpoint
    CREATE OR REPLACE FUNCTION cymbal_text_input_transform(model_id VARCHAR(100), input_text TEXT)
    RETURNS JSON
    LANGUAGE plpgsql
    AS $$
    DECLARE
      transformed_input JSON;
      model_qualified_name TEXT;
    BEGIN
      SELECT json_build_object('prompt', json_build_array(input_text))::JSON INTO transformed_input;
      RETURN transformed_input;
    END;
    $$;
    -- Output Transform Function corresponding to the custom model endpoint
    CREATE OR REPLACE FUNCTION cymbal_text_output_transform(model_id VARCHAR(100), response_json JSON)
    RETURNS REAL[]
    LANGUAGE plpgsql
    AS $$
    DECLARE
      transformed_output REAL[];
    BEGIN
      SELECT ARRAY(SELECT json_array_elements_text(response_json->0)) INTO transformed_output;
      RETURN transformed_output;
    END;
    $$;
    ```
    
6.  Rufen Sie die Funktion zum Erstellen von Modellen auf, um den benutzerdefinierten Endpunkt für das Einbettungsmodell zu registrieren:
    
    ```
    CALL
      google_ml.create_model(
        model_id => 'MODEL_ID',
        model_request_url => 'REQUEST_URL',
        model_provider => 'custom',
        model_type => 'text_embedding',
        model_auth_type => 'secret_manager',
        model_auth_id => 'SECRET_ID',
        model_qualified_name => 'MODEL_QUALIFIED_NAME',
        model_in_transform_fn => 'cymbal_text_input_transform',
        model_out_transform_fn => 'cymbal_text_output_transform');
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `MODEL_ID`: Erforderlich. Eine eindeutige ID für den Modellendpunkt, den Sie definieren, z. B. `custom-embedding-model`. Auf diese Modell-ID wird für Metadaten verwiesen, die der Modellendpunkt zum Generieren von Einbettungen oder zum Aufrufen von Vorhersagen benötigt.
    -   `REQUEST_URL`: Erforderlich. Der modellspezifische Endpunkt beim Hinzufügen von benutzerdefinierten Texteinbettungen und allgemeinen Modellendpunkten, z. B. `https://cymbal.com/models/text/embeddings/v1`. Achten Sie darauf, dass der Modellendpunkt über eine interne IP-Adresse erreichbar ist. Die Verwaltung von Modellendpunkten unterstützt keine öffentlichen IP-Adressen.
    -   `MODEL_QUALIFIED_NAME`: Erforderlich, wenn für Ihren Modellendpunkt ein qualifizierter Name verwendet wird. Der vollständig qualifizierte Name, falls der Modellendpunkt mehrere Versionen hat.
    -   `SECRET_ID`: Die Secret-ID, die Sie zuvor im `google_ml.create_sm_secret()`\-Verfahren verwendet haben.

## Multimodales Modell mit integrierter Unterstützung

**Vorschau**

[Diese Funktion unterliegt den „Bedingungen für Pre-GA-Angebote“ im Abschnitt „Allgemeine Dienstbedingungen“ der](https://docs.cloud.google.com/terms/service-terms?hl=de#1) dienstspezifischen Nutzungsbedingungen. Pre-GA‑Funktionen stehen in der vorliegenden Form zur Verfügung und bieten möglicherweise nur eingeschränkten Support. Weitere Informationen finden Sie unter den [Beschreibungen der Startphase](https://cloud.google.com/products/?hl=de#product-launch-stages).

Informationen zum Zugriff auf diesen Release finden Sie auf der Seite [Zugriffsanforderung](https://docs.google.com/forms/d/1Ux9AZoGv9dwraS6lXa9Qgwvj17NTk1stagUXFW5mu5k?hl=de).

**Hinweis** :Diese experimentelle Einführung ist ein Pre-GA-Angebot.

### In Vertex AI einbinden und Erweiterung installieren

1.  [Nutzerzugriff auf Agent Platform-Modelle konfigurieren](https://docs.cloud.google.com/alloydb/docs/ai/configure-vertex-ai?hl=de)
2.  Prüfen Sie, ob die aktuelle Version von `google_ml_integration` installiert ist.
    1.  Führen Sie den folgenden Befehl aus, um die installierte Version zu prüfen:
        
        SELECT extversion FROM pg\_extension WHERE extname \= 'google\_ml\_integration';
        extversion 
        \------------
        1.5.2
        (1 row)
        
    2.  Wenn die Erweiterung nicht installiert ist oder die installierte Version älter als 1.5.2 ist, aktualisieren Sie die Erweiterung.
        
        CREATE EXTENSION IF NOT EXISTS google\_ml\_integration;
        ALTER EXTENSION google\_ml\_integration UPDATE;
        
        Wenn beim Ausführen der vorherigen Befehle Probleme auftreten oder die Erweiterung nach dem Ausführen der vorherigen Befehle nicht auf Version 1.5.2 aktualisiert wird, wenden Sie sich an den [Google Cloud -Support](https://cloud.google.com/support?hl=de).
        
3.  Wenn Sie die Funktionen der AlloyDB AI-Abfrage-Engine verwenden möchten, setzen Sie das Flag `google_ml_integration.enable_ai_query_engine` auf `on`.
    
    ### SQL
    
    1.  Aktivieren Sie die KI-Abfrage-Engine für die aktuelle Sitzung.  
        
        SET google\_ml\_integration.enable\_ai\_query\_engine \= on;
        
    2.  Funktionen für eine bestimmte Datenbank sitzungsübergreifend aktivieren  
        
        ALTER DATABASE DATABASE\_NAME SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';
        
    3.  Aktivieren Sie die KI-Abfrage-Engine für einen bestimmten Nutzer über Sitzungen und Datenbanken hinweg.  
        
        ALTER ROLE postgres SET google\_ml\_integration.enable\_ai\_query\_engine \= 'on';
        
    
    ### Console
    
    Wenn Sie den Wert des Flags `google_ml_integration.enable_ai_query_engine` ändern möchten, folgen Sie der Anleitung unter [Datenbank-Flags einer Instanz konfigurieren](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=de#console).
    
    ### gcloud
    
    Wenn Sie die gcloud CLI verwenden möchten, können Sie die Google Cloud CLI [installieren und initialisieren](https://docs.cloud.google.com/sdk/docs/install?hl=de) oder [Cloud Shell](https://docs.cloud.google.com/shell/docs/using-cloud-shell?hl=de) verwenden.
    
    Sie können den Wert des Flags `google_ml_integration.enable_ai_query_engine` ändern. Weitere Informationen finden Sie unter [Datenbank-Flags einer Instanz konfigurieren](https://docs.cloud.google.com/alloydb/docs/instance-configure-database-flags?hl=de#console).
    
    gcloud alloydb instances update INSTANCE\_ID \\
      --database-flags google\_ml\_integration.enable\_ai\_query\_engine=on \\
      --region=REGION\_ID \\
      --cluster=CLUSTER\_ID \\
      --project=PROJECT\_ID
    

### Modell aufrufen, um multimodale Einbettungen zu generieren

Da die Modellendpunktverwaltung integrierte Unterstützung für das Modell `multimodalembedding@001` von Vertex AI bietet, können Sie das Modell direkt aufrufen, um multimodale Einbettungen zu generieren.

Im folgenden Beispiel wird der qualifizierte Modellname `multimodalembedding@001` als Modell-ID verwendet, um multimodale Bildeinbettungen zu generieren:

1.  Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.
2.  [`google_ml_integration`\-Erweiterung einrichten](#set-up-extension)
3.  Multimodale Bildeinbettungen generieren:
    
    ```
    SELECT
      ai.image_embedding(
        model_id => 'multimodalembedding@001',
        image => 'IMAGE_PATH_OR_TEXT',
        mimetype => 'MIMETYPE');
    ```
    

Ersetzen Sie Folgendes:

-   IMAGE\_PATH\_OR\_TEXT mit Cloud Storage-Pfad zum Bild, z. B. `gs://cymbal_user_data/image-85097193-cd9788aacebb.jpeg`, um in eine Vektoreinbettung oder einen Base64-String des Bildes zu übersetzen.
-   MIMETYPE durch den MIME-Typ des Bildes.

## Ranking-Modelle

**Vorschau**

[Diese Funktion unterliegt den „Bedingungen für Pre-GA-Angebote“ im Abschnitt „Allgemeine Dienstbedingungen“ der](https://docs.cloud.google.com/terms/service-terms?hl=de#1) dienstspezifischen Nutzungsbedingungen. Pre-GA‑Funktionen stehen in der vorliegenden Form zur Verfügung und bieten möglicherweise nur eingeschränkten Support. Weitere Informationen finden Sie unter den [Beschreibungen der Startphase](https://cloud.google.com/products/?hl=de#product-launch-stages).

Informationen zum Zugriff auf diesen Release finden Sie auf der Seite [Zugriffsanforderung](https://docs.google.com/forms/d/1Ux9AZoGv9dwraS6lXa9Qgwvj17NTk1stagUXFW5mu5k?hl=de).

**Hinweis** :Diese Funktion ist ein experimentelles Pre-GA-Angebot.

### Vertex AI-Rankingmodelle

Sie können die in [Unterstützte Modelle](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking?hl=de#models) aufgeführten Vertex AI-Modelle ohne Registrierung verwenden.

Informationen zum Ranking von Suchergebnissen mit einem Agent Platform-Rankingmodell finden Sie unter [Suchergebnisse ranken](https://docs.cloud.google.com/alloydb/docs/ai/rank-rerank-search-results-rag?hl=de).

### Ranking-Modell eines Drittanbieters registrieren

Im folgenden Beispiel wird gezeigt, wie ein Reranking-Modell von Cohere registriert wird.

```
CREATE OR REPLACE FUNCTION cohere_rerank_input_transform(
    model_id VARCHAR(100),
    search_string TEXT,
    documents TEXT[],
    top_n INT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
AS $$
#variable_conflict use_variable
DECLARE
  transformed_input JSONB;
BEGIN
  -- Basic Input Validation
  IF search_string IS NULL OR search_string = '' THEN
    RAISE EXCEPTION 'Invalid input: search_string cannot be NULL or empty.';
  END IF;

  IF documents IS NULL OR array_length(documents, 1) IS NULL OR array_length(documents, 1) = 0 THEN
    RAISE EXCEPTION 'Invalid input: documents array cannot be NULL or empty.';
  END IF;

  IF top_n IS NOT NULL AND top_n < 0 THEN
    RAISE EXCEPTION 'Invalid input: top_n must be greater than or equal to zero. Provided value: %', top_n;
  END IF;

  -- Construct the base JSON payload for Cohere Rerank API
  transformed_input := jsonb_build_object(
    'model', google_ml.model_qualified_name_of(model_id),
    'query', search_string,
    'documents', to_jsonb(documents), -- Convert TEXT[] directly to JSON array
    'return_documents', false -- Explicitly set to false (optional, as its default)
  );

  -- Add top_n to the payload only if it's provided and valid
  IF top_n IS NOT NULL THEN
     transformed_input := transformed_input || jsonb_build_object('top_n', top_n);
  END IF;

  -- Return the final JSON payload
  RETURN transformed_input::JSON;

END;
$$;

CREATE OR REPLACE FUNCTION cohere_rerank_output_transform(
    model_id VARCHAR(100),
    response_json JSON
)
RETURNS TABLE (index INT, score REAL)
LANGUAGE plpgsql
AS $$
DECLARE
  result_item JSONB;
  response_jsonb JSONB;
  cohere_index INT; -- 0-based index from Cohere response
BEGIN
  -- Validate response_json
  IF response_json IS NULL THEN
    RAISE EXCEPTION 'Invalid model response: response cannot be NULL.';
  END IF;

  -- Convert JSON to JSONB for easier processing
  response_jsonb := response_json::JSONB;

  -- Check top-level structure
  IF jsonb_typeof(response_jsonb) != 'object' THEN
    RAISE EXCEPTION 'Invalid model response: response must be a JSON object. Found: %', jsonb_typeof(response_jsonb);
  END IF;

  -- Check for the 'results' array
  IF response_jsonb->'results' IS NULL OR jsonb_typeof(response_jsonb->'results') != 'array' THEN
    -- Check for potential Cohere error structure
    IF response_jsonb->'message' IS NOT NULL THEN
       RAISE EXCEPTION 'Cohere API Error: %', response_jsonb->>'message';
    ELSE
       RAISE EXCEPTION 'Invalid model response: response does not contain a valid "results" array.';
    END IF;
  END IF;

  -- Loop through the 'results' array (JSONB array indices are 0-based)
  FOR i IN 0..jsonb_array_length(response_jsonb->'results') - 1 LOOP
    result_item := response_jsonb->'results'->i;

    -- Validate individual result item structure
    IF result_item IS NULL OR jsonb_typeof(result_item) != 'object' THEN
      RAISE WARNING 'Skipping invalid result item at array index %.', i;
      CONTINUE;
    END IF;

    IF result_item->'index' IS NULL OR jsonb_typeof(result_item->'index') != 'number' THEN
       RAISE WARNING 'Missing or invalid "index" field in result item at array index %.', i;
       CONTINUE;
    END IF;

    IF result_item->'relevance_score' IS NULL OR jsonb_typeof(result_item->'relevance_score') != 'number' THEN
       RAISE WARNING 'Missing or invalid "relevance_score" field in result item at array index %.', i;
       CONTINUE;
    END IF;

    -- Extract values
    BEGIN
      cohere_index := (result_item->>'index')::INT;
      -- Assign values to the output table columns
      -- Cohere returns 0-based index, map it to 1-based for consistency
      -- with input document array position
      index := cohere_index + 1;
      score := (result_item->>'relevance_score')::REAL;
      RETURN NEXT; -- Return the current row
    EXCEPTION WHEN others THEN
      RAISE WARNING 'Error processing result item at array index %: %', i, SQLERRM;
      CONTINUE; -- Skip this item and continue with the next
    END;
  END LOOP;

  RETURN; -- End of function
END;
$$;

CALL
  google_ml.create_sm_secret(
    '<SECRET_ID>',
    'projects/<PROJECT_NUMBER>/secrets/<SECRET_ID>/versions/latest');

CALL
  google_ml.create_model(
    model_id => 'cohere-reranker',
    model_type => 'reranking',
    model_provider => 'custom',
    model_request_url => 'https://api.cohere.com/v2/rerank',
    model_qualified_name => 'rerank-v3.5',
    model_auth_type => 'secret_manager',
    model_auth_id => '<SECRET_ID>',
    model_in_transform_fn => 'cohere_rerank_input_transform',
    model_out_transform_fn => 'cohere_rerank_output_transform'
  );
```

## Allgemeine Modelle

In diesem Abschnitt wird beschrieben, wie Sie einen beliebigen allgemeinen Modellendpunkt registrieren, der bei einem gehosteten Modellanbieter wie Hugging Face, OpenAI, Agent Platform, Anthropic oder einem anderen Anbieter verfügbar ist. In diesem Abschnitt finden Sie Beispiele für die Registrierung eines allgemeinen Modellendpunkts, der auf Hugging Face gehostet wird, eines allgemeinen Modells vom Typ `gemini-pro` aus dem Agent Platform Model Garden und des Modellendpunkts `claude-haiku`.

Sie können jeden allgemeinen Modellendpunkt registrieren, sofern die Ein- und Ausgabe im JSON-Format erfolgt. Je nach den Metadaten Ihres Modellendpunkts müssen Sie möglicherweise HTTP-Header generieren oder Anfrage-URLs definieren.

Weitere Informationen zu vorregistrierten allgemeinen Modellen sowie Modellen mit integrierter Unterstützung finden Sie unter [Unterstützte Modelle](https://docs.cloud.google.com/alloydb/docs/reference/supported-ai-models?hl=de).

### Allgemeine Gemini-Modelle

In diesem Abschnitt wird beschrieben, wie Sie allgemeine Gemini-Modelle registrieren.

### Gemini 1.5 Pro-Modell

Da einige `gemini-pro`\-Modelle vorregistriert sind, können Sie die Modell-ID direkt aufrufen, um Vorhersagen zu generieren.

Im folgenden Beispiel wird der Modellendpunkt `gemini-1.5-pro:generateContent` aus dem Model Garden verwendet.

1.  Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.
2.  [`google_ml_integration`\-Erweiterung einrichten](#set-up-extension)
3.  Rufen Sie Vorhersagen mit der vorregistrierten Modell-ID auf:
    
    ```
    SELECT
        json_array_elements(
        google_ml.predict_row(
            model_id => 'gemini-1.5-pro:generateContent',
            request_body => '{
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": "For TPCH database schema as mentioned here https://www.tpc.org/TPC_Documents_Current_Versions/pdf/TPC-H_v3.0.1.pdf , generate a SQL query to find all supplier names which are located in the India nation."
                    }
                ]
            }
        ]
        }'))-> 'candidates' -> 0 -> 'content' -> 'parts' -> 0 -> 'text';
    ```
    

### Allgemeines Modell bei Hugging Face

Im folgenden Beispiel wird der benutzerdefinierte Klassifizierungsmodellendpunkt `facebook/bart-large-mnli` hinzugefügt, der auf Hugging Face gehostet wird.

1.  Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.
2.  [`google_ml_integration`\-Erweiterung einrichten](#set-up-extension)
3.  [Fügen Sie den OpenAI-API-Schlüssel zur Authentifizierung als Secret in Secret Manager hinzu.](#setup-secret-manager) Wenn Sie bereits ein Secret für ein anderes OpenAI-Modell erstellt haben, können Sie dasselbe Secret wiederverwenden.
4.  Rufen Sie das im Secret Manager gespeicherte Secret auf:
    
    ```
    CALL
      google_ml.create_sm_secret(
        secret_id => 'SECRET_ID',
        secret_path => 'projects/PROJECT_ID/secrets/SECRET_MANAGER_SECRET_ID/versions/VERSION_NUMBER');
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `SECRET_ID`: Die von Ihnen festgelegte Secret-ID, die später bei der Registrierung eines Modellendpunkts verwendet wird.
    -   `SECRET_MANAGER_SECRET_ID`: Die Secret-ID, die beim Erstellen des Secrets im Secret Manager festgelegt wurde.
    -   `PROJECT_ID`: Die ID Ihres Projekts in Google Cloud .
    -   `VERSION_NUMBER`: Die Versionsnummer der Secret-ID.
5.  Rufen Sie die Funktion zum Erstellen von Modellen auf, um den Modellendpunkt `facebook/bart-large-mnli` zu registrieren:
    
    ```
    CALL
      google_ml.create_model(
        model_id => 'MODEL_ID',
        model_provider => 'hugging_face',
        model_request_url => 'REQUEST_URL',
        model_qualified_name => 'MODEL_QUALIFIED_NAME',
        model_auth_type => 'secret_manager',
        model_auth_id => 'SECRET_ID');
    ```
    
    Ersetzen Sie Folgendes:
    
    -   `MODEL_ID`: Eine eindeutige ID für den von Ihnen definierten Modellendpunkt, z. B. `custom-classification-model`. Auf diese Modell-ID wird für Metadaten verwiesen, die der Modellendpunkt zum Generieren von Einbettungen oder zum Aufrufen von Vorhersagen benötigt.
    -   `REQUEST_URL`: Der modellspezifische Endpunkt beim Hinzufügen benutzerdefinierter Texteinbettungen und allgemeiner Modellendpunkte, z. B. `https://api-inference.huggingface.co/models/facebook/bart-large-mnli`.
    -   `MODEL_QUALIFIED_NAME`: Der voll qualifizierte Name der Modellendpunktversion, z. B. `facebook/bart-large-mnli`.
    -   `SECRET_ID`: Die Secret-ID, die Sie zuvor im `google_ml.create_sm_secret()`\-Verfahren verwendet haben.

### Allgemeines Modell von Anthropic

Im folgenden Beispiel wird der Modellendpunkt `claude-3-opus-20240229` hinzugefügt. Die Verwaltung von Modellendpunkten umfasst die erforderliche Header-Funktion für die Registrierung von Anthropic-Modellen.

1.  Stellen Sie mit `psql` eine Verbindung zu Ihrer Datenbank her.
2.  [Erstellen und aktivieren Sie die Erweiterung `google_ml_integration`.](https://docs.cloud.google.com/alloydb/docs/ai/register-model-endpoint?hl=de)
    
    ### Secret Manager
    
    1.  [Fügen Sie das Inhabertoken als Secret zur Authentifizierung in Secret Manager hinzu](https://docs.cloud.google.com/alloydb/docs/ai/register-model-endpoint?hl=de).
    2.  Rufen Sie das im Secret Manager gespeicherte Secret auf:
        
        ```
        CALL
          google_ml.create_sm_secret(
            secret_id => 'SECRET_ID',
            secret_path => 'projects/PROJECT_ID/secrets/SECRET_MANAGER_SECRET_ID/versions/VERSION_NUMBER');
        ```
        
        Ersetzen Sie Folgendes:
        
        -   `SECRET_ID`: Die von Ihnen festgelegte Secret-ID, die später bei der Registrierung eines Modellendpunkts verwendet wird.
        -   `SECRET_MANAGER_SECRET_ID`: Die Secret-ID, die beim Erstellen des Secrets im Secret Manager festgelegt wurde.
        -   `PROJECT_ID`: Die ID Ihres Projekts in Google Cloud .
        -   `VERSION_NUMBER`: Die Versionsnummer der Secret-ID.
    3.  Rufen Sie die Funktion zum Erstellen von Modellen auf, um den Modellendpunkt `claude-3-opus-20240229` zu registrieren.
        
        ```
        CALL
          google_ml.create_model(
            model_id => 'MODEL_ID',
            model_provider => 'anthropic',
            model_request_url => 'REQUEST_URL',
            model_auth_type => 'secret_manager',
            model_auth_id => 'SECRET_ID',
            generate_headers_fn => 'google_ml.anthropic_claude_header_gen_fn');
        ```
        
        Ersetzen Sie Folgendes:
        
        -   `MODEL_ID`: Eine eindeutige ID für den von Ihnen definierten Modellendpunkt, z. B. `anthropic-opus`. Auf diese Modell-ID wird für Metadaten verwiesen, die der Modellendpunkt zum Generieren von Einbettungen oder zum Aufrufen von Vorhersagen benötigt.
        -   `REQUEST_URL`: Der modellspezifische Endpunkt beim Hinzufügen benutzerdefinierter Texteinbettungen und allgemeiner Modellendpunkte, z. B. `https://api.anthropic.com/v1/messages`.
    
    ### Auth-Header
    
    1.  Verwenden Sie die Standardfunktion `google_ml.anthropic_claude_header_gen_fn` zum Erzeugen von Headern oder erstellen Sie eine Funktion zum Erzeugen von Headern.
        
          ```
          CREATE OR REPLACE FUNCTION anthropic_sample_header_gen_fn(model_id VARCHAR(100), request_body JSON)
          RETURNS JSON
          LANGUAGE plpgsql
          AS $$
          #variable_conflict use_variable
          BEGIN
                RETURN json_build_object('x-api-key', 'ANTHROPIC_API_KEY', 'anthropic-version', 'ANTHROPIC_VERSION')::JSON;
          END;
          $$;
        ```
        
        Ersetzen Sie Folgendes:
        
        -   `ANTHROPIC_API_KEY`: Der Anthropic-API-Schlüssel.
        -   `ANTHROPIC_VERSION` (optional): Die spezifische Modellversion, die Sie verwenden möchten, z. B. `2023-06-01`.
    2.  Rufen Sie die Funktion zum Erstellen von Modellen auf, um den Modellendpunkt `claude-3-opus-20240229` zu registrieren.
        
        ```
        CALL
          google_ml.create_model(
            model_id => 'MODEL_ID',
            model_provider => 'anthropic',
            model_request_url => 'REQUEST_URL',
            generate_headers_fn => 'google_ml.anthropic_claude_header_gen_fn');
        ```
        
        Ersetzen Sie Folgendes:
        
        -   `MODEL_ID`: Eine eindeutige ID für den von Ihnen definierten Modellendpunkt, z. B. `anthropic-opus`. Auf diese Modell-ID wird für Metadaten verwiesen, die der Modellendpunkt zum Generieren von Einbettungen oder zum Aufrufen von Vorhersagen benötigt.
        -   `REQUEST_URL`: Der modellspezifische Endpunkt beim Hinzufügen benutzerdefinierter Texteinbettungen und allgemeiner Modellendpunkte, z. B. `https://api.anthropic.com/v1/messages`.
    

Weitere Informationen finden Sie unter [Vorhersagen für allgemeine Modellendpunkte aufrufen](https://docs.cloud.google.com/alloydb/docs/ai/invoke-predictions?hl=de).

## Prognosemodelle

Neben generischen Modellen können Sie auch Prognosemodelle aus [Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden?hl=de) registrieren.

### Zeitreihenprognosen mit dem TimesFM-Modell

Ein häufiger Anwendungsfall für aufgabenspezifische Modelle ist die [Erstellung von Zeitreihenprognosen](https://docs.cloud.google.com/alloydb/docs/ai/perform-time-series-forecasting?hl=de) mit dem TimesFM-Modell.

Führen Sie die folgenden Schritte aus, um dieses Modell bereitzustellen und zu registrieren:

1.  Stellen Sie das TimesFM-Modell aus dem Model Garden an einem Agent Platform-Endpunkt bereit, um eine öffentlich zugängliche Modellanfrage-URL zu erhalten. Weitere Informationen finden Sie unter [Model Garden-Modelle auf einem Agent Platform-Endpunkt bereitstellen](https://docs.cloud.google.com/alloydb/docs/ai/register-model-endpoint?hl=de#deploy-model-model-garden).
    
2.  Verwenden Sie die Funktion `google_ml.create_model`, um das bereitgestellte TimesFM-Modell in AlloyDB for PostgreSQL zu registrieren. Für Zeitreihenprognosen muss `model_type` `ts_forecasting` sein:
    

```
CALL
google_ml.create_model(
  model_id => 'vertex_timesfm',
  model_qualified_name => 'timesfm_v2',
  model_type => 'ts_forecasting',
  model_provider => 'google',
  model_request_url => 'https://REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID:predict',
  model_auth_type => 'alloydb_service_agent_iam'
);
```

**Hinweis** :Wenn sich Ihre AlloyDB-Instanz in einem anderen Projekt als der Agent Platform-Modellendpunkt befindet, müssen Sie dem AlloyDB-Dienstkonto die Rolle `Vertex AI User` – `roles/aiplatform.user` – in dem Projekt zuweisen, in dem das Modell gehostet wird.

Google Cloud

Nachdem Sie das Modell registriert haben, können Sie mit der Funktion `ai.forecast()` oder `google_ml.forecast()` Vorhersagen generieren.

## Nächste Schritte

-   [Referenz zur Verwaltung von Modellendpunkten](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint?hl=de)
-   Verwenden Sie [Beispielvorlagen zum Registrieren von Modellendpunkten](https://docs.cloud.google.com/alloydb/docs/reference/model-endpoint-sample-template?hl=de).
-   [Multimodale Einbettungen generieren](https://docs.cloud.google.com/alloydb/docs/ai/generate-multimodal-embeddings?hl=de)
-   [Suchergebnisse für RAG einstufen und bewerten](https://docs.cloud.google.com/alloydb/docs/ai/rank-rerank-search-results-rag?hl=de).
-   [Natürliche Sprache in SQL-Operatoren verwenden](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=de):
-   [Zeitreihenprognosen durchführen](https://docs.cloud.google.com/alloydb/docs/ai/perform-time-series-forecasting?hl=de)

Feedback geben

Sofern nicht anders angegeben, sind die Inhalte dieser Seite unter der [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/) und Codebeispiele unter der [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0) lizenziert. Weitere Informationen finden Sie in den [Websiterichtlinien von Google Developers](https://developers.google.com/site-policies?hl=de). Java ist eine eingetragene Marke von Oracle und/oder seinen Partnern.

Zuletzt aktualisiert: 2026-05-16 (UTC).