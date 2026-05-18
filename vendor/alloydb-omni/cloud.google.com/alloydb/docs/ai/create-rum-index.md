 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=pt-br) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=pt-br)
-   [Documentation](https://docs.cloud.google.com/docs?hl=pt-br)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=pt-br)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=pt-br)
-   [Guias](https://docs.cloud.google.com/alloydb/docs/overview?hl=pt-br)

Envie comentários

# Criar e gerenciar o índice do RUM Mantenha tudo organizado com as coleções Salve e categorize o conteúdo com base nas suas preferências.

**Prévia — Índice de RUM**

Este recurso está sujeito aos Termos das Soluções Pré-GA na seção Termos Gerais de Serviço dos [Termos Específicos de Serviço](https://docs.cloud.google.com/terms/service-terms?hl=pt-br#1). Os recursos pré-GA estão disponíveis "no estado em que se encontram" e podem ter suporte limitado. Para mais informações, consulte [as descrições da fase de lançamento](https://cloud.google.com/products/?hl=pt-br#product-launch-stages).

Este documento mostra como criar a extensão RUM e índices para otimizar a pesquisa de texto completo no AlloyDB para PostgreSQL. Ele oferece exemplos para casos de uso comuns, incluindo classificação, pesquisa de frases e ordenação por carimbo de data/hora.

## Antes de começar

Para criar a extensão RUM, você precisa ter a [função de banco de dados `alloydbsuperuser`](https://docs.cloud.google.com/alloydb/docs/database-users/overview?hl=pt-br#alloydbsuperuser).

O papel do IAM de administrador do AlloyDB ([`roles/alloydb.admin`](https://docs.cloud.google.com/alloydb/docs/reference/iam-roles-permissions?hl=pt-br#roles)) concede controle total sobre os recursos do AlloyDB, mas não concede o papel de banco de dados `alloydbsuperuser`. Para criar a extensão, um administrador precisa conceder explicitamente a função de banco de dados `alloydbsuperuser`.

Para mais informações sobre como conceder papéis, consulte [Adicionar um usuário do IAM ou uma conta de serviço a um cluster](https://docs.cloud.google.com/alloydb/docs/database-users/manage-iam-auth?hl=pt-br#create-user).

## Criar a extensão do RUM

Você precisa criar a extensão RUM uma vez por banco de dados.

1.  Conecte-se ao banco de dados do AlloyDB usando `psql` ou outro cliente. Para mais informações, consulte [Conectar-se a uma instância de cluster](https://docs.cloud.google.com/alloydb/docs/connect-psql?hl=pt-br).
2.  Execute o seguinte comando SQL para criar a extensão:
    
    ```
    CREATE EXTENSION IF NOT EXISTS rum;
    ```
    

## Criar um índice de RUM

Para otimizar as consultas de pesquisa de texto completo, crie um índice de RUM nos seus dados. O RUM oferece várias classes de operadores para diferentes casos de uso.

### Tipos de classes de operadores de RUM

A tabela a seguir resume as diferentes classes de operadores de RUM e os principais casos de uso delas.

Classe de operador

Caso de uso principal

Limitações

[`rum_tsvector_ops`](#index_for_basic_full_text_search)

Pesquisa de texto completo padrão com classificação e pesquisa de frases.

N/A

[`rum_tsvector_hash_ops`](#index_for_optimized_hash_search)

Índice menor e atualizações mais rápidas para pesquisa de texto completo.

Não é compatível com pesquisa de prefixo.

[`rum_tsvector_addon_ops`](#index_for_search_sorted_by_timestamp)

Pesquisa de texto completo classificada por outra coluna.

N/A

[`rum_anyarray_ops`](#index_for_array_search)

Pesquisar em colunas de matriz.

N/A

[`rum_<TYPE>_ops`](#index_for_scalar_types)

Indexação de tipos escalares para consultas baseadas em distância.

N/A

[`rum_tsvector_hash_addon_ops`](#index_for_optimized_hash_search_sorted_by_timestamp)

Pesquisa de texto completo baseada em hash classificada por outra coluna.

Não aceita correspondência de prefixo.

[`rum_tsquery_ops`](#index_for_stored_queries)

Indexação de valores `tsquery` armazenados para pesquisa inversa.

N/A

[`rum_anyarray_addon_ops`](#index_for_array_search_sorted_by_timestamp)

Pesquisa de matriz classificada por outra coluna.

N/A

### Indexação para pesquisa de texto completo básica

Use a classe de operador `rum_tsvector_ops` para pesquisa de texto padrão que exige recursos de classificação rápida e pesquisa de frases. Essa classe de operador armazena a posição de cada lexema no índice. No exemplo a seguir, criamos uma tabela chamada `documents` com uma coluna `content`.

1.  Crie uma tabela chamada `documents`:
    
    ```
    CREATE TABLE documents (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    ```
    
2.  Preencha a tabela `documents` com dados de amostra:
    
    ```
    INSERT INTO documents (title, content) VALUES
      ('Title', 'This search engine is working as intended');
    ```
    
3.  Adicione uma coluna `tsvector` gerada à sua tabela. Essa coluna armazena automaticamente o texto processado e melhora a performance da consulta:
    
    ```
    ALTER TABLE documents
    ADD COLUMN search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('english', content)) STORED;
    ```
    
4.  Crie o índice de RUM na nova coluna `search_vector`:
    
    ```
    CREATE INDEX idx_docs_rum
    ON documents
    USING rum (search_vector rum_tsvector_ops);
    ```
    
5.  Consulte a tabela usando o índice. O operador `<=>` calcula a pontuação de relevância ou a distância entre o documento e a consulta diretamente do índice, permitindo uma classificação rápida:
    
    ```
    SELECT title, content
    FROM documents
    WHERE search_vector @@ to_tsquery('english', 'search <-> engine')
    ORDER BY search_vector <=> to_tsquery('english', 'search <-> engine');
    ```
    
6.  Preencha a tabela `documents` com mais dados:
    
    ```
    INSERT INTO documents (title, content) VALUES ('Title1', 'English is my primary language.');
    INSERT INTO documents (title, content) VALUES ('Title2', 'Google has a great engineering culture');
    ```
    
7.  Executar uma consulta de pesquisa de prefixo. Isso encontra documentos que contêm palavras que começam com `eng`, como `engineer` ou `english`:
    
    ```
    SELECT title, content
    FROM documents
    WHERE search_vector @@ to_tsquery('english', 'eng:*');
    ```
    

### Indexação para pesquisa de hash otimizada

Use a classe de operador `rum_tsvector_hash_ops` para reduzir o tamanho do índice e melhorar as velocidades de atualização. Essa classe armazena um hash de cada lexema em vez do lexema completo. Essa abordagem resulta em um índice menor, mas não oferece suporte à pesquisa de prefixos. O exemplo a seguir pressupõe que você tenha uma tabela chamada `documents` com uma coluna `search_vector`.

1.  Crie o índice RUM usando a classe de operador de hash:
    
    ```
    CREATE INDEX idx_docs_rum_hash
    ON documents
    USING rum (search_vector rum_tsvector_hash_ops);
    ```
    
2.  Preencha a tabela `documents` com mais dados:
    
    ```
    INSERT INTO documents (title, content) VALUES ('Title3', 'That person was driving incredibly fast, however the routing was not very efficient');
    ```
    
3.  Execute uma consulta de correspondência padrão:
    
    ```
    SELECT * FROM documents WHERE search_vector @@ to_tsquery('english', 'fast & efficient');
    
    ```
    

### Índice para pesquisa classificada por carimbo de data/hora

Use a classe de operador `rum_tsvector_addon_ops` para otimizar consultas que filtram por texto e classificam por outro campo, como um carimbo de data/hora. Esse padrão armazena o valor do campo adicional diretamente no índice, o que evita uma operação de classificação lenta após a pesquisa. O exemplo a seguir pressupõe que você tenha uma tabela chamada `documents` com uma coluna `search_vector` e uma coluna `published_at`.

1.  Crie um índice que inclua o carimbo de data/hora `published_at`:
    
    ```
    CREATE INDEX idx_docs_rum_timestamp
    ON documents
    USING rum (search_vector rum_tsvector_addon_ops, published_at)
    WITH (attach = 'published_at', to = 'search_vector');
    ```
    
2.  Execute uma consulta que encontre documentos que contenham a palavra `engine` e os classifique por data de publicação. O índice processa a pesquisa e a classificação de maneira eficiente:
    
    ```
    SELECT title, published_at
    FROM documents
    WHERE search_vector @@ to_tsquery('english', 'engine')
    ORDER BY published_at DESC;
    ```
    

### Índice para pesquisa de matriz

Use a classe de operador `rum_anyarray_ops` para indexar colunas de matriz, como uma lista de tags. Isso permite consultar de maneira eficiente matrizes que se sobrepõem (`&&`), contêm (`@>`) ou são contidas por (`<@`) outras matrizes. O exemplo a seguir adiciona uma coluna `tags` à tabela `documents`.

1.  Adicione uma coluna `tags` e preencha-a com dados:
    
    ```
    ALTER TABLE documents 
    ADD COLUMN tags TEXT[];
    
    INSERT INTO documents (title, content, tags) VALUES ( 'Title4', 'Sample Text', ARRAY['ai', 'ml'] );
    ```
    
2.  Crie o índice de RUM em uma coluna `TEXT[]` chamada `tags`:
    
    ```
    CREATE INDEX idx_tags_rum
    ON documents
    USING rum (tags rum_anyarray_ops);
    ```
    
3.  Execute uma consulta para encontrar documentos que tenham `ai` ou `ml` nas tags:
    
    ```
    SELECT * FROM documents WHERE tags && '{"ai", "ml"}';
    ```
    

### Índice para tipos escalares

Use as classes de operador `rum_<TYPE>_ops` para indexar colunas que contêm valores contínuos, como números inteiros, carimbos de data/hora ou números de ponto flutuante. Essas classes de operador permitem usar o operador `<=>` para calcular com eficiência a distância entre valores. No exemplo a seguir, pressupomos que você tenha uma tabela chamada `documents`.

1.  Adicione uma coluna de número inteiro genérica, como `rating`, à tabela `documents`:
    
    ```
    ALTER TABLE documents
    ADD COLUMN rating INT;
    
    UPDATE documents 
    SET rating = floor(random() * 5 + 1);
    ```
    
2.  Crie um índice de RUM na coluna `rating`:
    
    ```
    CREATE INDEX idx_rating_rum
    ON documents
    USING rum (rating rum_int4_ops);
    ```
    
3.  Execute uma consulta para encontrar documentos com um `rating` mais próximo do valor 5:
    
    ```
    SELECT title, rating
    FROM documents
    ORDER BY rating <=> 5;
    ```
    

### Índice para pesquisa de hash otimizada classificada por carimbo de data/hora.

Use a classe de operador `rum_tsvector_hash_addon_ops` para combinar os benefícios de um índice de hash com os recursos de classificação de um índice complementar. Essa classe armazena um hash de cada lexema junto com o valor de uma coluna adicional. Essa configuração permite uma classificação eficiente pela coluna adicional, mas não é compatível com a correspondência de prefixos. O exemplo a seguir pressupõe que você tenha uma tabela chamada `documents` com uma coluna `search_vector` e uma coluna de carimbo de data/hora `published_at`.

1.  Crie um índice de RUM que use a classe de operador de hash e inclua o carimbo de data/hora `published_at`:
    
    ```
    CREATE INDEX idx_docs_rum_hash_timestamp
    ON documents
    USING rum (search_vector rum_tsvector_hash_addon_ops, published_at)
    WITH (attach = 'published_at', to = 'search_vector');
    ```
    
2.  Execute uma consulta que encontre documentos que contenham `engine` e os classifique por data de publicação:
    
    ```
    SELECT title, published_at
    FROM documents
    WHERE search_vector @@ to_tsquery('english', 'engine')
    ORDER BY published_at DESC;
    ```
    

### Índice para consultas armazenadas

Use a classe de operador `rum_tsquery_ops` para indexar valores `tsquery`. Isso permite realizar uma "pesquisa reversa", identificando quais consultas armazenadas correspondem a um determinado documento de entrada. No exemplo a seguir, criamos uma tabela chamada `queries`.

1.  Crie uma tabela para armazenar consultas:
    
    ```
    CREATE TABLE queries (
    query_text tsquery
    );
    INSERT INTO queries (query_text) VALUES (plainto_tsquery('AlloyDB is fast!'));
    ```
    
2.  Crie um índice de RUM na coluna `query_text`:
    
    ```
    CREATE INDEX idx_queries_rum
    ON queries
    USING rum (query_text rum_tsquery_ops);
    ```
    
3.  Execute uma consulta para encontrar consultas armazenadas que correspondam a um documento:
    
    ```
    SELECT *
    FROM queries
    WHERE to_tsvector('english', 'AlloyDB is fast') @@ query_text;
    ```
    

### Índice para pesquisa de matriz classificada por carimbo de data/hora

Use a classe de operador `rum_anyarray_addon_ops` para indexar colunas de matriz junto com uma coluna adicional para classificação. O exemplo a seguir pressupõe que você tenha uma tabela chamada `documents` com uma coluna `tags` e uma coluna de carimbo de data/hora `published_at`.

1.  Crie um índice de RUM na coluna `tags` que inclua o carimbo de data/hora `published_at`:
    
    ```
    CREATE INDEX idx_tags_rum_timestamp
    ON documents
    USING rum (tags rum_anyarray_addon_ops, published_at)
    WITH (attach = 'published_at', to = 'tags');
    ```
    
2.  Execute uma consulta para encontrar documentos com a tag `ai`, classificados por data de publicação:
    
    ```
    SELECT title, published_at
    FROM documents
    WHERE tags @> '{"ai"}'
    ORDER BY published_at DESC;
    ```
    

## A seguir

-   Saiba mais sobre a [pesquisa de texto completo](https://docs.cloud.google.com/alloydb/docs/ai/full-text-search-overview?hl=pt-br).
-   Saiba como [executar uma pesquisa híbrida de similaridade vetorial](https://docs.cloud.google.com/alloydb/docs/ai/run-hybrid-vector-similarity-search?hl=pt-br).

Envie comentários

Exceto em caso de indicação contrária, o conteúdo desta página é licenciado de acordo com a [Licença de atribuição 4.0 do Creative Commons](https://creativecommons.org/licenses/by/4.0/), e as amostras de código são licenciadas de acordo com a [Licença Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Para mais detalhes, consulte as [políticas do site do Google Developers](https://developers.google.com/site-policies?hl=pt-br). Java é uma marca registrada da Oracle e/ou afiliadas.

Última atualização 2026-05-16 UTC.