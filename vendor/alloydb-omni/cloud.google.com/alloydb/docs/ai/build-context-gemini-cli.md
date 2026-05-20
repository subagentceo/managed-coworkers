 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=pt-br) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=pt-br)
-   [Documentation](https://docs.cloud.google.com/docs?hl=pt-br)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=pt-br)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=pt-br)
-   [Guias](https://docs.cloud.google.com/alloydb/docs/overview?hl=pt-br)

Envie comentários

# Criar conjuntos de contexto usando a CLI do Gemini Mantenha tudo organizado com as coleções Salve e categorize o conteúdo com base nas suas preferências.

**Visualizar**

Este recurso está sujeito aos "Termos da Pré-GA" nos Termos Gerais de Serviço dos [Termos Específicos de Serviço](https://docs.cloud.google.com/terms/service-terms?hl=pt-br#1) e aos [Termos Adicionais para Produtos Pré-lançamento de IA Generativa](https://cloud.google.com/trustedtester/aitos?hl=pt-br). Os recursos pré-GA estão disponíveis "no estado em que se encontram" e podem ter suporte limitado. Para mais informações, consulte as [descrições das fases de lançamento](https://cloud.google.com/products/?hl=pt-br#product-launch-stages).

Este documento descreve como criar e otimizar o contexto que permite melhorar a acurácia de [QueryData](https://docs.cloud.google.com/alloydb/docs/ai/data-agent-overview?hl=pt-br) para criar aplicativos de agente de dados. Usando a extensão de enriquecimento de contexto do banco de dados na CLI do Gemini, isso dá acesso a um conjunto de ferramentas para desenvolvedores que automatizam a criação e a otimização de conjuntos de contexto.

Para saber mais sobre conjuntos de contexto, consulte [Visão geral dos conjuntos de contexto](https://docs.cloud.google.com/alloydb/docs/ai/context-sets-overview?hl=pt-br).

A extensão automatiza a criação e a otimização dos conjuntos de contexto na seguinte sequência:

1.  Entenda os aplicativos: ingira artefatos como esquemas de banco de dados, código do aplicativo e requisitos de negócios para estabelecer a lógica de negócios fundamental do seu agente de dados.
2.  Criar conjuntos de dados: organize um conjunto de dados de avaliação com perguntas representativas em linguagem natural e as respostas SQL esperadas. Estabelecer esse conjunto de dados de base é fundamental para medir a performance e acompanhar as melhorias ao longo do tempo.
3.  Gerar contexto inicial: gere automaticamente um conjunto de contexto de base derivado diretamente do esquema do banco de dados e de artefatos de aplicativos opcionais para um início rápido.
4.  Otimize o contexto de forma iterativa: avalie seu conjunto de dados para identificar por que consultas específicas falham. O Gemini usa o raciocínio automatizado para sugerir atualizações de contexto segmentadas, alcançando uma precisão cada vez maior.

Embora a extensão ofereça um fluxo de trabalho automatizado robusto, ela é adaptável às suas necessidades. Você pode ignorar a automação para criar e inserir contexto em um nível mais granular. Com comandos de geração especializados, você controla a criação de modelos, aspectos e consultas de pesquisa de valor de alta qualidade.

## Antes de começar

Conclua os pré-requisitos a seguir antes de criar um agente.

### Ativar serviços obrigatórios

Ative os seguintes serviços para seu projeto:

-   [API Data Analytics com Gemini](https://console.cloud.google.com/apis/library/geminidataanalytics.googleapis.com?hl=pt-br)
-   [API Gemini para o Google Cloud](https://console.cloud.google.com/apis/library/cloudaicompanion.googleapis.com?hl=pt-br)
-   [API Knowledge Catalog](https://console.cloud.google.com/apis/library/dataplex.googleapis.com?hl=pt-br)

### Preparar um cluster, uma instância e um banco de dados do AlloyDB para PostgreSQL

Verifique se você tem acesso a um cluster e uma instância do AlloyDB ou [crie um](https://docs.cloud.google.com/alloydb/docs/cluster-create?hl=pt-br).
Este tutorial exige que você tenha um banco de dados na sua instância do AlloyDB. Para mais informações, consulte [Criar um banco de dados](https://docs.cloud.google.com/alloydb/docs/database-create?hl=pt-br).

### Papéis e permissões necessárias

-   Adicione um usuário ou uma conta de serviço do Identity and Access Management (IAM) ao cluster no nível do banco de dados. Para mais informações, consulte [Gerenciar usuários do banco de dados](https://docs.cloud.google.com/alloydb/docs/database-users/manage-roles?hl=pt-br#create).
-   Conceda os papéis `alloydb.databaseUser`, `serviceusage.serviceUsageConsumer` e `geminidataanalytics.queryDataUser` ao usuário do IAM no nível do projeto. Para mais informações, consulte [Adicionar uma vinculação de política do IAM a um projeto](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding?hl=pt-br).

### Conceder permissão `executesql` à instância do AlloyDB para PostgreSQL

Para conceder a permissão `executesql` à instância do AlloyDB para PostgreSQL e definir a configuração da instância `data_api_access` como o valor `ALLOW_DATA_API`, use o seguinte comando `curl` :

   curl -X PATCH \\
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
     -H "Content-Type: application/json" \\
     https://alloydb.googleapis.com/v1alpha/projects/PROJECT\_ID/locations/LOCATION/clusters/CLUSTER\_ID/instances/INSTANCE\_ID?updateMask=dataApiAccess \\
     -d '{
       "dataApiAccess": "ENABLED",
     }'
Substitua:

-   `PROJECT_ID`: o ID do seu projeto do Google Cloud .
-   `LOCATION`: a região em que o cluster do AlloyDB está localizado.
-   `CLUSTER_ID`: o ID do seu cluster do AlloyDB.
-   `INSTANCE_ID`: o ID da sua instância do AlloyDB.

Para realizar as etapas deste tutorial, faça login em [Google Cloud](https://console.cloud.google.com/?hl=pt-br) e autentique o banco de dados usando a autenticação do IAM.

## Preparar o ambiente

É possível criar arquivos de conjunto de contexto em qualquer ambiente de desenvolvimento local ou ambiente de desenvolvimento integrado. Para preparar o ambiente, conclua as seguintes etapas:

-   Instalar a CLI do Gemini
-   Instalar a extensão de enriquecimento de contexto do banco de dados
-   Configurar a conexão de banco de dados

### Instalar a CLI do Gemini

Para instalar a CLI do Gemini, consulte [Começar a usar a CLI do Gemini](https://geminicli.com/docs/get-started).

### Instalar a extensão de enriquecimento de contexto do banco de dados

A extensão de enriquecimento de contexto do banco de dados oferece um fluxo de trabalho guiado e interativo para gerar e iterar conjuntos de contexto estruturados.

Para mais informações sobre como instalar a extensão de enriquecimento de contexto do banco de dados, consulte [Extensão de enriquecimento de contexto do banco de dados](https://github.com/GoogleCloudPlatform/db-context-enrichment/tree/main/mcp).

Para instalar a extensão de enriquecimento de contexto do banco de dados, siga estas etapas:

1.  Instale a extensão da CLI do Gemini para enriquecimento de contexto do banco de dados:

    ```
    gemini extensions install https://github.com/GoogleCloudPlatform/db-context-enrichment
    ```

    **Observação**: a extensão exige uma chave de API Gemini na instalação para autenticar com a API Gemini e ativar a geração de contexto. Para mais informações sobre como encontrar sua chave de API, consulte [Como usar chaves da API Gemini](https://ai.google.dev/gemini-api/docs/api-key?hl=pt-br).

2.  (Opcional) Atualize a extensão de enriquecimento de contexto do banco de dados.

    Para verificar a versão instalada da extensão, execute o seguinte comando:

    ```
    gemini extensions list
    ```

    Verifique se a versão é `0.5.0` ou mais recente. Para atualizar a extensão de enriquecimento de contexto do banco de dados, execute o seguinte comando:

      ```
      gemini extensions update mcp-db-context-enrichment
    ```

    Para atualizar a extensão de enriquecimento de contexto do banco de dados ou substituir o `GEMINI_API_KEY`, execute o seguinte comando:

    ```
    gemini extensions config mcp-db-context-enrichment GEMINI_API_KEY
    ```

    Substitua GEMINI\_API\_KEY pela sua chave de API Gemini.


### Configurar a conexão de banco de dados

A extensão exige uma conexão de banco de dados para buscar esquemas e validar a sintaxe do contexto SQL gerado. Para permitir que a extensão interaja com seu banco de dados, configure as credenciais de autenticação e defina a configuração de conexão do banco de dados.

#### Configurar o Application Default Credentials

Configure as [Application Default Credentials (ADC)](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment?hl=pt-br) para fornecer credenciais de usuário a dois componentes principais:

-   Servidor MCP da caixa de ferramentas: usa credenciais para se conectar ao banco de dados, buscar esquemas e executar SQL para validação.
-   Extensão de enriquecimento de contexto do banco de dados: usa credenciais para autenticar e chamar a API Gemini.

Execute os seguintes comandos no terminal para autenticar:

```
gcloud auth application-default login
```

#### Configurar o arquivo de conexão do banco de dados

A extensão exige uma conexão de banco de dados para a geração de contexto, que a [caixa de ferramentas do MCP](https://mcp-toolbox.dev/documentation/introduction/) oferece suporte e define em um arquivo de configuração.

O arquivo de configuração especifica a origem do banco de dados e as ferramentas necessárias para buscar esquemas ou executar SQL. A extensão de enriquecimento de contexto do banco de dados vem com habilidades de agente pré-instaladas para ajudar você a gerar a configuração.

**Observação**: se essa conexão não for estabelecida, a extensão vai retornar mensagens de erro, como "Erro ao descobrir ferramentas da mcp\_toolbox", e a geração de contexto não vai funcionar.

1.  Inicie a CLI do Gemini:

    ```
    gemini
    ```

2.  Verifique se as habilidades estão ativas digitando o seguinte na CLI do Gemini:

    ```
    /skills
    ```

3.  Digite um comando, por exemplo, `help me set up the database connection`. A habilidade orienta você na criação do arquivo de configuração no diretório de trabalho atual como `autoctx/tools.yaml`.

4.  Execute o seguinte comando na CLI do Gemini para aplicar a configuração `tools.yaml` ao servidor MCP da caixa de ferramentas.

    ```
    /mcp reload
    ```


Para mais informações sobre como configurar manualmente o arquivo de configuração do banco de dados, consulte [Configuração da MCP Toolbox](https://mcp-toolbox.dev/documentation/configuration/).

## Gerar o contexto com um fluxo de trabalho automatizado

Melhorar a precisão usando a engenharia de contexto geralmente é um processo manual de tentativa e erro. Os desenvolvedores geralmente adivinham por que uma consulta falhou, escrevem uma correção e a testam manualmente. A extensão de enriquecimento de contexto do banco de dados na CLI do Gemini automatiza esse processo de melhoria. Ele usa conjuntos de dados de avaliação, que são conjuntos de perguntas com as respostas corretas em SQL, para medir a performance e identificar por que determinadas consultas falham. Em seguida, o Gemini sugere automaticamente atualizações de contexto específicas para aumentar a precisão. Conclua estas etapas para melhorar sistematicamente a acurácia do seu agente de dados.

### Inicializar um espaço de trabalho

O comando de inicialização configura seu espaço de trabalho local, incluindo a configuração de conexão do banco de dados e o diretório de experimentos. Esse espaço de trabalho dedicado garante que todas as configurações, experimentos e arquivos gerados sejam organizados em um só lugar, facilitando o gerenciamento e o acompanhamento das suas iniciativas de otimização contextual.

1.  Crie um novo diretório para servir como espaço de trabalho para o fluxo de otimização iterativa e navegue até ele.
2.  Inicie a CLI do Gemini no novo diretório:

    ```
    gemini
    ```

3.  Execute o comando de inicialização:

    ```
    /autoctx:init
    ```

    O agente orienta você na criação do arquivo `tools.yaml` se nenhuma conexão de banco de dados tiver sido configurada. Ele também inicializa o arquivo `state.md` local e um diretório `experiments`.

    Depois da inicialização, seu espaço de trabalho vai ficar assim:

    ```
    my-workspace/
    └── autoctx/
        ├── tools.yaml          # Database connection and tools configuration
        ├── state.md            # Local file to track the experiment progress
        └── experiments/        # Dedicated directory for future experiment-specific files
    ```


### Preparar e expandir conjuntos de dados

Para permitir que o Gemini faça otimizações sistemáticas no seu conjunto de contexto, prepare um conjunto de dados de avaliação com perguntas representativas em linguagem natural e as respostas SQL esperadas ("ouro") para avaliar seu conjunto de contexto. Um conjunto de dados de avaliação de alta qualidade é essencial para medir a performance, identificar falhas de consulta e acompanhar melhorias ao longo do tempo. O conjunto de dados precisa ser um arquivo JSON com a pergunta em linguagem natural (NLQ) e o SQL de ouro que abrange os casos de uso segmentados no seu aplicativo de dados.

Exemplo de formato esperado:

```
[
  {
    "id": "example_001",
    "nlq": "What is the total revenue for the top 5 products?",
    "golden_sql": "SELECT product_id, sum(net_revenue) FROM sales GROUP BY product_id ORDER BY sum(net_revenue) DESC LIMIT 5;"
  }
]
```

A extensão da CLI do Gemini inclui um comando que cria e dimensiona uma pequena base de perguntas para fins de avaliação.

1.  Navegue até a pasta do espaço de trabalho.
2.  Inicie a CLI do Gemini no novo diretório:

    ```
    gemini
    ```

3.  Execute o comando `/autoctx:generate-dataset` na CLI do Gemini:

    ```
    /autoctx:generate-dataset
    ```

4.  Quando o agente pedir, forneça uma semente, que é um exemplo inicial ou um pequeno conjunto de exemplos que orienta a geração de um conjunto de dados maior. Uma semente pode ser uma das seguintes opções:

    -   Um pequeno arquivo de conjunto de dados padrão-ouro
    -   Pares de ouro específicos de linguagem natural para SQL (NL2SQL)

    Por exemplo, você pode fornecer o seguinte par de ouro NL2SQL como uma semente:

    ```
    Question: "What are the names of all airports in California?"
    SQL: "SELECT name FROM airports WHERE state = 'CA';"
    ```

5.  O agente pede permissão para verificar a sintaxe e a validade da execução usando a ferramenta `execute_sql`. Esta etapa é opcional.

6.  O agente pergunta se é necessário expandir o conjunto de dados com variações dos dados iniciais (aplicando filtros, sinônimos etc. diferentes). Esta etapa é opcional.

    O agente usa a ferramenta `execute_sql` para executar as consultas SQL recém-geradas no banco de dados e verificar a sintaxe e a validade da execução antes de apresentá-las a você.

7.  Aceite, edite ou rejeite as sugestões de forma seletiva. Os pares aprovados são salvos automaticamente no local e estão prontos para avaliação.

    ```
    my-workspace/
    └── autoctx/
        ├── tools.yaml
        ├── state.md
        ├── golden.json  # Generated dataset
        └── experiments/
    ```


### Criar conjunto de contexto inicial

**Observação** :ignore esta seção se você já tiver um contexto pronto para otimização.

Gerar um conjunto de contexto inicial fornece uma base para avaliação e melhoria iterativa. Esta etapa usa o esquema do banco de dados e os artefatos do aplicativo para criar um contexto fundamental que reflete sua lógica de negócios.

A extensão da CLI do Gemini inclui um comando pré-criado para gerar um conjunto inicial de modelos e aspectos com base no esquema do banco de dados e nas informações sobre o aplicativo do agente de dados, por exemplo, o código do aplicativo ou arquivos com informações sobre os requisitos de negócios. Para gerar um conjunto de contexto de comparativo de mercado do zero:

1.  Navegue até a pasta do espaço de trabalho.
2.  Inicie a CLI do Gemini no novo diretório:

    ```
    gemini
    ```

3.  Execute o comando `/autoctx:bootstrap` na CLI do Gemini:

    ```
    /autoctx:bootstrap
    ```

    Em geral, você pode esperar o seguinte do agente:

    -   O agente pede que você especifique um nome para o experimento. Um experimento é uma pasta de espaço de trabalho dedicada que encapsula o ciclo de vida completo de uma configuração de contexto de banco de dados, rastreando o estado de referência, os resultados do teste de avaliação e as melhorias iterativas subsequentes de ascensão de gradiente. Esse nome é usado para organizar todos os arquivos gerados na pasta do experimento no seu espaço de trabalho. Escolha um nome descritivo e fácil de lembrar.

    -   O agente busca e lista esquemas do seu banco de dados de destino e pede que você forneça outros recursos ou arquivos, se quiser. Se o esquema for complexo, o agente também vai pedir que você selecione esquemas ou tabelas específicos para o conjunto de contexto inicial. Se você não especificar nenhuma, o comando vai presumir que todas as tabelas estão disponíveis nos esquemas de banco de dados atuais.

4.  Revise e refine o conjunto de contextos gerado. Depois de refinado, o agente produz um arquivo de contexto JSON diretamente no disco local, na pasta do seu espaço de trabalho:

    ```
    my-workspace/
    └── autoctx/
        ├── tools.yaml
        ├── state.md
        └── experiments/
            └── my-experiment/
                └── bootstrap_context.json  # The generated initial context set file
    ```

5.  Siga as instruções para [fazer upload do contexto do AlloyDB Studio](https://docs.cloud.google.com/alloydb/docs/ai/manage-data-agents?hl=pt-br#edit-context-set).


### Avaliar a eficácia do contexto

A extensão da CLI do Gemini inclui um comando integrado para avaliar seu agente de dados usando um conjunto de dados de referência. A extensão se integra ao [Evalbench](https://github.com/GoogleCloudPlatform/evalbench) para realizar avaliações consultando a API QueryData do agente com as perguntas especificadas no conjunto de ouro e comparando o SQL gerado e os resultados da execução com o SQL de ouro. A avaliação é fundamental para entender a eficácia do seu conjunto de contexto atual. Ao comparar o SQL gerado com o conjunto de dados de referência, é possível identificar consultas específicas que estão falhando e áreas em que é necessário melhorar o contexto.

Para medir a eficácia do contexto atual em relação ao conjunto de dados de ouro:

1.  Faça upload do contexto do AlloyDB Studio para os conjuntos de contexto de destino para avaliação. Esta etapa é opcional se o contexto a ser avaliado não for enviado.
2.  Navegue até a pasta do espaço de trabalho.
3.  Inicie a CLI do Gemini na pasta:

    ```
    gemini
    ```

4.  Execute o comando `/autoctx:evaluate` na CLI do Gemini:

    ```
    /autoctx:evaluate
    ```

5.  Forneça os caminhos para seu conjunto de dados de referência, o ID do conjunto de contexto para geração de configuração de avaliação e execução de avaliação e um diretório de saída designado.

    **Observação**: para mais informações sobre como encontrar o ID do conjunto de contexto, consulte [Encontrar o ID do contexto do agente](https://docs.cloud.google.com/alloydb/docs/ai/inspect-data-agent?hl=pt-br#find-context-set-id).

    Depois de concluído, o agente gera os resultados da avaliação como arquivos na pasta do experimento e resume o resultado.

    Se quiser, você pode inspecionar manualmente a avaliação no relatório detalhado, que é armazenado como arquivos CSV na pasta do experimento.

    ```
    my-workspace/
    └── autoctx/
        ├── tools.yaml
        ├── state.md
        ├── golden.json
        └── experiments/
            └── my-experiment/
                └── bootstrap_context.json
                └── eval_configs/
                    └── <configs_for_eval_run>/
                └── eval_reports/
                    └── <eval_id>/
                        └── eval_report/
                            ├── configs.csv
                            ├── evals.csv
                            ├── scores.csv
                            └── summary.csv
    ```


### Realizar análise de lacunas e otimização de contexto

Como uma etapa fundamental na otimização do conjunto de contexto, a extensão da CLI do Gemini inclui um comando integrado para realizar uma análise de lacunas no conjunto de contexto atual e propor mudanças para melhorar a qualidade dele. A análise de lacunas é fundamental para entender por que consultas específicas estão falhando e onde o contexto pode ser melhorado. Com base nessa análise, o Gemini usa o raciocínio automatizado para sugerir atualizações de contexto segmentadas, como novos modelos ou atributos, para resolver essas falhas e melhorar de forma iterativa a precisão da consulta.

1.  Navegue até a pasta do espaço de trabalho.
2.  Inicie a CLI do Gemini na pasta:

    ```
    gemini
    ```

3.  Execute o comando `/autoctx:hillclimb` na CLI do Gemini:

    ```
    /autoctx:hillclimb
    ```

    O agente identifica automaticamente os resultados de avaliação e o contexto de base mais adequados para a otimização por escalada e pede confirmação se houver várias opções.

    Se nenhum resultado de avaliação estiver disponível, o agente vai pedir que você faça uma execução com o conjunto de dados e o contexto definidos.

    Quando estiver tudo pronto, o agente vai ler os resultados da avaliação e o contexto definido, depois vai gerar um relatório de análise de lacunas.

    ```
    my-workspace/
    └── autoctx/
        ├── tools.yaml
        ├── state.md
        ├── golden.json
        └── experiments/
            └── my-experiment/
                └── bootstrap_context.json
                └── eval_configs/
                └── eval_reports/
                └── hillclimb/
                    └── gap_analysis_v1.md
    ```

    O agente formula correções propondo novos modelos e aspectos prescritivos, testando opcionalmente o SQL no banco de dados usando `execute_sql`.

    Quando estiver tudo pronto, um novo arquivo JSON de contexto aprimorado será gerado localmente, deixando o arquivo JSON de contexto de base intacto.

    ```
    my-workspace/
    └── autoctx/
        ├── tools.yaml
        ├── state.md
        ├── golden.json
        └── experiments/
            └── my-experiment/
                └── bootstrap_context.json
                └── eval_configs/
                └── eval_reports/
                └── hillclimb/
                    ├── gap_analysis_v1.md
                    └── improved_context_v1.md
    ```

4.  Siga as instruções para [fazer upload do contexto para o conjunto de contexto de destino do AlloyDB Studio](https://docs.cloud.google.com/alloydb/docs/ai/manage-data-agents?hl=pt-br#edit-context-set), pronto para a próxima rodada de iteração, começando com a avaliação.


### Limitações

O fluxo de trabalho automatizado oferece suporte apenas à geração e otimização de modelos e aspectos. Se quiser configurar a pesquisa de valores para seu agente de dados, consulte [Gerar consultas de pesquisa de valores](#generate-value-search-queries).

## Gerar contexto segmentado

Se você preferir uma abordagem mais personalizada para a criação de contexto, use a extensão de enriquecimento de contexto do DB para gerar manualmente elementos de contexto específicos. Os comandos a seguir orientam você na criação de contexto como um arquivo JSON, oferecendo controle refinado sobre a geração de consultas de pesquisa de modelo, atributo e valor.

**Observação**: a CLI do Gemini pode acessar seus arquivos locais para reduzir a sobrecarga. Por exemplo, especificando locais exatos de arquivos nos seus diretórios locais. Por exemplo, se uma etapa no fluxo de trabalho da CLI do Gemini pedir informações do seu arquivo `tools.yaml`, você pode pedir para a CLI do Gemini `use tools.yaml` ou responder com um comando, por exemplo, `look it up`.

### Gerar modelos segmentados

Para adicionar um par consulta-SQL específico como um modelo de consulta ao conjunto de contexto, use o comando `/generate_targeted_templates`.

Para mais informações sobre o arquivo de conjunto de contexto e o modelo de consulta, consulte [Visão geral dos conjuntos de contexto](https://docs.cloud.google.com/alloydb/docs/ai/context-sets-overview?hl=pt-br#context-sets).

Para adicionar um modelo de consulta ao conjunto de contexto, siga estas etapas:

1.  Execute o comando `/generate_targeted_templates` na CLI do Gemini:

    ```
    /generate_targeted_templates
    ```

2.  Insira a consulta em linguagem natural para adicionar ao modelo de consulta.

3.  Insira a consulta SQL correspondente ao modelo de consulta.

4.  Revise o modelo de consulta gerado. É possível salvar o modelo de consulta como um arquivo de conjunto de contexto ou anexá-lo a um arquivo de conjunto de contexto existente.


O arquivo de conjunto de contexto, por exemplo, `my-cluster-psc-primary_postgres_context_set_20251104111122.json`, é salvo no diretório em que você executou os comandos.

### Gerar refinamentos segmentados

Para adicionar uma consulta específica à condição SQL como uma faceta ao arquivo de conjunto de contexto, use o comando `/generate_targeted_facets`.

Para mais informações sobre o arquivo e as facetas do conjunto de contexto, consulte [Visão geral dos conjuntos de contexto](https://docs.cloud.google.com/alloydb/docs/ai/context-sets-overview?hl=pt-br#context-sets).

Para adicionar uma faceta ao arquivo de conjunto de contexto, siga estas etapas:

1.  Execute o comando `/generate_targeted_facets` na CLI do Gemini:

    ```
    /generate_targeted_facets
    ```

2.  Insira a intenção de linguagem natural para adicionar ao atributo.

3.  Insira o snippet SQL correspondente ao aspecto.

4.  Revise a faceta gerada. É possível salvar o atributo em um arquivo de conjunto de contexto ou anexá-lo a um arquivo de conjunto de contexto existente.


O arquivo de conjunto de contexto, por exemplo, `my-cluster-psc-primary_postgres_context_set_20251104111122.json`, é salvo no diretório em que você executou os comandos.

### Gerar consultas de pesquisa de valor

Para gerar pesquisas de valor que especificam como o sistema procura e corresponde a valores específicos em um tipo de conceito, use o comando `/generate_targeted_value_searches`.

Para mais informações sobre o índice de valor, consulte [Visão geral dos conjuntos de contexto](https://docs.cloud.google.com/alloydb/docs/ai/context-sets-overview?hl=pt-br#context-sets).

Para gerar um índice de valor, siga estas etapas:

1.  Execute o comando `/generate_targeted_value_searches`:

    ```
    /generate_targeted_value_searches
    ```

2.  Insira `postgresql` para selecionar o AlloyDB como mecanismo de banco de dados.

3.  Insira a versão do PostgreSQL a ser usada. Selecione `default` para escolher o PostgreSQL 16.

4.  Insira a configuração de pesquisa de valor da seguinte forma:

    ```
    Table name: TABLE_NAME
    Column name: COLUMN_NAME
    Concept type: CONCEPT_TYPE
    Match function: MATCH_FUNCTION
    Description: DESCRIPTION
    ```

    Substitua:

    -   `TABLE_NAME`: a tabela em que a coluna associada ao tipo de conceito existe.
    -   `COLUMN_NAME`: o nome da coluna associada ao tipo de conceito.
    -   `CONCEPT_TYPE`: o tipo de conceito a ser definido, por exemplo, `City name`.
    -   `MATCH_FUNCTION`: a função de correspondência a ser usada para a pesquisa de valores. Você pode usar uma das seguintes funções:

        -   `EXACT_STRING_MATCH`: para correspondência exata de dois valores de string. Ideal para IDs, códigos e chaves primárias exclusivos.
        -   `TRIGRAM_STRING_MATCH`: para correspondência aproximada que calcula a distância trigram normalizada. Ideal para pesquisas de usuários e correção de nomes. Para usar `TRIGRAM_STRING_MATCH`, ative a extensão [`pg_trgm`](https://www.postgresql.org/docs/current/pgtrgm.html).

        -   `SEMANTIC_SIMILARITY_MATCH`: para pesquisa semântica em valores de string. Ideal para pesquisas entre idiomas e de sinônimos. Para uma lista de modelos compatíveis, consulte [Modelos do Google compatíveis](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings?hl=pt-br#google-models). Para usar o `SEMANTIC_SIMILARITY_MATCH`, ative a extensão `vector` e `google_ml_integration`.
    -   `DESCRIPTION`: (opcional) a descrição da consulta de pesquisa de valor.

5.  Adicione outras pesquisas de valor conforme necessário. Se você pular a adição de outros índices de valor, a geração de SQL baseada em modelo vai para a próxima etapa.

6.  Revise as pesquisas de valor geradas. Você pode salvar o conjunto de contexto como um arquivo de conjunto de contexto ou adicionar ao final a um arquivo de conjunto de contexto existente.


O arquivo de conjunto de contexto, por exemplo, `my-cluster-psc-primary_postgres_context_set_20251104111122.json`, é salvo no diretório em que você executou os comandos.

## A seguir

-   Saiba mais sobre [conjuntos de contexto](https://docs.cloud.google.com/alloydb/docs/ai/context-sets-overview?hl=pt-br).
-   Saiba como [criar ou excluir um conjunto de contexto no AlloyDB Studio](https://docs.cloud.google.com/alloydb/docs/ai/manage-data-agents?hl=pt-br)
-   Saiba como [testar um conjunto de contexto](https://docs.cloud.google.com/alloydb/docs/ai/inspect-data-agent?hl=pt-br).

Envie comentários

Exceto em caso de indicação contrária, o conteúdo desta página é licenciado de acordo com a [Licença de atribuição 4.0 do Creative Commons](https://creativecommons.org/licenses/by/4.0/), e as amostras de código são licenciadas de acordo com a [Licença Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para mais detalhes, consulte as [políticas do site do Google Developers](https://developers.google.com/site-policies?hl=pt-br). Java é uma marca registrada da Oracle e/ou afiliadas.

Última atualização 2026-05-16 UTC.
