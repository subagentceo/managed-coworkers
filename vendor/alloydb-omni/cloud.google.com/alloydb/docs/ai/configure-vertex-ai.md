 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=pt-br) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=pt-br)
-   [Documentation](https://docs.cloud.google.com/docs?hl=pt-br)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=pt-br)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=pt-br)
-   [Guias](https://docs.cloud.google.com/alloydb/docs/overview?hl=pt-br)

Envie comentários

# Integrar com a plataforma de agentes Mantenha tudo organizado com as coleções Salve e categorize o conteúdo com base nas suas preferências.

Esta página detalha como configurar a integração entre o AlloyDB para PostgreSQL e a Gemini Enterprise Agent Platform, permitindo que você emita consultas que transmitem seus dados para modelos da Agent Platform.

Estas instruções são específicas para o uso do AlloyDB, e não do AlloyDB Omni. Para integrar uma instalação local do AlloyDB Omni usando a Agent Platform, consulte [Instalar o AlloyDB Omni com o AlloyDB AI](https://docs.cloud.google.com/alloydb/omni/kubernetes/current/docs/install-with-alloydb-ai?hl=pt-br).

Para mais informações sobre como usar modelos de ML com o AlloyDB, consulte [Criar aplicativos de IA generativa usando o AlloyDB AI](https://docs.cloud.google.com/alloydb/docs/ai?hl=pt-br).

Para mais informações sobre a Agent Platform, consulte [Visão geral da Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview?hl=pt-br).

## Antes de começar

-   Faça login na sua Google Cloud conta do. Se você não conhece o Google Cloud, [crie uma conta](https://console.cloud.google.com/freetrial?hl=pt-br) para avaliar o desempenho dos nossos produtos em cenários reais. Clientes novos também recebem US $300 em créditos para executar, testar e implantar cargas de trabalho.
-   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.

    **Roles required to select or create a project**

    -   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    -   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. [Learn how to grant roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access?hl=pt-br).

    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.

    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard?hl=pt-br)

-   [Verify that billing is enabled for your Google Cloud project](https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled?hl=pt-br#confirm_billing_is_enabled_on_a_project).

-   Enable the Agent Platform API.

    **Roles required to enable APIs**

    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access?hl=pt-br).

    [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=aiplatform.googleapis.com&%3Bredirect=https%3A%2F%2Fconsole.cloud.google.com&hl=pt-br)

-   [Instale](https://docs.cloud.google.com/sdk/docs/install?hl=pt-br) a Google Cloud CLI.

-   [Ao usar um provedor de identidade (IdP) externo, primeiro faça login na CLI gcloud com sua identidade federada.](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud?hl=pt-br)

-   Para [inicializar](https://docs.cloud.google.com/sdk/docs/initializing?hl=pt-br) a CLI gcloud, execute o seguinte comando:

    gcloud init


-   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.

    **Roles required to select or create a project**

    -   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    -   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. [Learn how to grant roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access?hl=pt-br).

    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.

    [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard?hl=pt-br)

-   [Verify that billing is enabled for your Google Cloud project](https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled?hl=pt-br#confirm_billing_is_enabled_on_a_project).

-   Enable the Agent Platform API.

    **Roles required to enable APIs**

    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. [Learn how to grant roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access?hl=pt-br).

    [Enable the API](https://console.cloud.google.com/apis/enableflow?apiid=aiplatform.googleapis.com&%3Bredirect=https%3A%2F%2Fconsole.cloud.google.com&hl=pt-br)

-   [Instale](https://docs.cloud.google.com/sdk/docs/install?hl=pt-br) a Google Cloud CLI.

-   [Ao usar um provedor de identidade (IdP) externo, primeiro faça login na CLI gcloud com sua identidade federada.](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud?hl=pt-br)

-   Para [inicializar](https://docs.cloud.google.com/sdk/docs/initializing?hl=pt-br) a CLI gcloud, execute o seguinte comando:

    gcloud init


## Sobre o agente de serviço do AlloyDB

Quando você usa o AlloyDB com outros Google Cloud serviços, ele usa um agente de serviço do Identity and Access Management (IAM) para autenticar esses serviços. Esse agente de serviço é um principal do IAM controlado pelo AlloyDB. Você concede papéis do IAM a esse agente de serviço para permitir que ele acesse outros Google Cloud serviços em seu nome.

## Conceder o papel `Vertex AI User` ao agente de serviço do AlloyDB

Para ativar a integração do banco de dados com a Agent Platform, conceda o papel `Vertex AI User` ao agente de serviço do AlloyDB. Isso permite que o agente de serviço do AlloyDB acesse a Agent Platform em seu nome.

**Observação:** Para conceder papéis do IAM, você precisa ter a permissão `resourcemanager.projects.setiamPolicy`. Os papéis `Owner` e `Project IAM Admin` incluem essa permissão. O papel `AlloyDB Admin` também inclui as permissões necessárias para conceder o papel `Vertex AI User` ao agente de serviço. Se você não tiver as permissões necessárias, entre em contato com o administrador da sua organização.

Siga estas etapas para conceder o papel `Vertex AI User` ao agente de serviço do AlloyDB:

Adicione permissões da Agent Platform ao agente de serviço do AlloyDB para o projeto em que o cluster do banco de dados do AlloyDB está localizado:

### Console

1.  Acesse a página **Welcome** no Google Cloud console e copie o número do projeto que tem clusters ou instâncias do AlloyDB. Você vai usar esse número do projeto nas próximas etapas.

    [Acessar a página de boas-vindas](https://console.cloud.google.com/welcome?hl=pt-br)

2.  No Google Cloud console, acesse a página **IAM**.

    [Acessar IAM](https://console.cloud.google.com/projectselector2/iam-admin/iam?hl=pt-br)

3.  Selecione o projeto que precisa chamar os endpoints da Agent Platform.

4.  Ative a opção **Incluir atribuições de papel fornecidas pelo Google**.

5.  Clique em person\_add **Conceder acesso**.

6.  No campo **Novos principais**, insira o seguinte:

        service-PROJECT\_NUMBER@gcp-sa-alloydb.iam.gserviceaccount.com


    Substitua PROJECT\_NUMBER pelo número do projeto.

7.  No campo **Papel**, insira **Usuário da Vertex AI**.

8.  Clique em **Salvar**.


### gcloud

Para usar a CLI gcloud, você pode [instalar e inicializar](https://docs.cloud.google.com/sdk/docs/install?hl=pt-br) a Google Cloud CLI ou você pode usar [o Cloud Shell](https://docs.cloud.google.com/shell/docs/using-cloud-shell?hl=pt-br).

        gcloud projects add-iam-policy-binding PROJECT\_ID
        --member="serviceAccount:service-PROJECT\_NUMBER@gcp-sa-alloydb.iam.gserviceaccount.com"
        --role="roles/aiplatform.user"


Substitua:

-   PROJECT\_ID: o ID do projeto que tem o endpoint da Agent Platform.
-   PROJECT\_NUMBER: o número do projeto que tem clusters ou instâncias do AlloyDB.

**\*\*Observação\*\*:** a alteração na política entra em vigor em 60 segundos a 7 minutos.

## Verificar a extensão instalada

Verifique se a `google_ml_integration` está instalada no banco de dados que contém os dados em que você quer executar previsões:

### Console

1.  No Google Cloud console, acesse a página **Clusters**.

    [Acessar Clusters](https://console.cloud.google.com/alloydb/clusters?hl=pt-br)

2.  Para mostrar a página **Visão geral** do cluster, clique no nome do cluster do AlloyDB na coluna **Nome do recurso**.

3.  No menu de navegação, clique em **AlloyDB Studio**.

4.  Na página **Fazer login no AlloyDB Studio** , autentique-se usando o nome do banco de dados, o nome de usuário e a senha.

    **\*\*Observação\*\*:** o AlloyDB Studio se conecta à instância principal do cluster, que é onde o gerenciamento de extensões e as previsões iniciais são processados, mesmo que você pretenda invocar previsões de instâncias do pool de leitura mais tarde.

5.  Na guia **Editor 1**, faça o seguinte:

    1.  Verifique se a versão 1.4.2 ou mais recente da extensão `google_ml_integration` está instalada:

        SELECT extversion FROM pg\_extension WHERE extname \= 'google\_ml\_integration';

    2.  Clique em **Executar**. Aguarde a versão da extensão aparecer no painel **Resultados**.


### psql

1.  Conecte um cliente `psql` à instância principal do cluster, conforme descrito em [Conectar um cliente `psql` a uma instância](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=pt-br).

    **\*\*Observação\*\*** :é necessário se conectar à instância principal, mesmo que você pretenda invocar previsões enquanto estiver conectado a uma instância do pool de leitura.

2.  No prompt de comando `psql`, conecte-se ao banco de dados:

    \\c DB\_NAME

    Substitua `DB_NAME` pelo nome do banco de dados em que você quer instalar a extensão.

3.  Verifique se a versão 1.4.2 ou mais recente da extensão `google_ml_integration` está instalada:

    SELECT extversion FROM pg\_extension WHERE extname \= 'google\_ml\_integration';


## A seguir

-   [Trabalhar com embeddings](https://docs.cloud.google.com/alloydb/docs/ai/work-with-embeddings?hl=pt-br)

-   [Invocar previsões](https://docs.cloud.google.com/alloydb/docs/ai/invoke-predictions?hl=pt-br)

-   [Cotas e limites da Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/quotas?hl=pt-br)

-   [Chamar endpoints de modelos remotos](https://docs.cloud.google.com/alloydb/docs/ai/model-endpoint-overview?hl=pt-br)


Envie comentários

Exceto em caso de indicação contrária, o conteúdo desta página é licenciado de acordo com a [Licença de atribuição 4.0 do Creative Commons](https://creativecommons.org/licenses/by/4.0/), e as amostras de código são licenciadas de acordo com a [Licença Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para mais detalhes, consulte as [políticas do site do Google Developers](https://developers.google.com/site-policies?hl=pt-br). Java é uma marca registrada da Oracle e/ou afiliadas.

Última atualização 2026-05-16 UTC.
