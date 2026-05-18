 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=fr) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=fr)
-   [Documentation](https://docs.cloud.google.com/docs?hl=fr)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=fr)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=fr)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview?hl=fr)

Envoyer des commentaires

# Présentation des fonctions d'IA Restez organisé à l'aide des collections Enregistrez et classez les contenus selon vos préférences.

Exécutez des modèles d'IA puissants enregistrés via la gestion des points de terminaison de modèle directement dans votre base de données à l'aide d'opérateurs SQL. Les fonctions AlloyDB AI s'intègrent à Gemini Enterprise Agent Platform pour apporter un filtrage intelligent, un classement sémantique et une génération de texte à vos données opérationnelles en temps réel.

![Miniature du filtrage optimisé par l&#39;IA](https://docs.cloud.google.com/static/alloydb/images/in-filtering.png?hl=fr)

### [Filtrage et classement SQL basés sur l'IA](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=fr)

Utilisez des fonctions SQL simples pour des tâches d'IA puissantes. L'extension `google_ml_integration` fournit des opérateurs tels que `ai.if()` pour le filtrage intelligent et `ai.rank()` pour le reclassement sémantique.

![Miniature de la génération de texte dans la base de données](https://docs.cloud.google.com/static/alloydb/images/database.png?hl=fr)

### [Génération de texte dans la base de données](https://docs.cloud.google.com/alloydb/docs/ai/work-with-embeddings?hl=fr)

Effectuez des transformations pour les lignes de votre base de données. À l'aide de l'opérateur `ai.generate()`, vous pouvez demander à un modèle de fondation de résumer un avis sur un produit ou de transformer des données directement dans votre requête.

![Vignette des fonctions d&#39;intégration et de prédiction](https://docs.cloud.google.com/static/alloydb/images/embedding-predictions.png?hl=fr)

### [Fonctions d'embedding et de prédiction](https://docs.cloud.google.com/alloydb/docs/ai/model-endpoint-overview?hl=fr)

Utilisez des fonctions SQL telles que `google_ml.embedding()` pour générer des embeddings vectoriels ou `google_ml.predict_row(` pour appeler des prédictions à partir de n'importe quel modèle enregistré, le tout dans votre base de données.

## Fonctionnement des fonctions d'IA

Lorsque vous intégrez un opérateur d'IA tel que `ai.if()`, `ai.rank()` ou `ai.generate()` dans votre requête SQL, les **fonctions d'IA** le détectent. Ce moteur, disponible à l'aide de l'extension `google_ml_integration`, orchestre l'ensemble du processus. Il regroupe de manière sécurisée les données de ligne pertinentes et appelle un modèle de ML pré-enregistré auprès de fournisseurs tels que Gemini, OpenAI ou Anthropic. Le modèle de ML évalue les données et renvoie une prédiction, par exemple `true/false` pour un filtre ou un score pour le classement. Les fonctions d'IA intègrent de manière transparente cette prédiction dans l'exécution de votre requête, en renvoyant un ensemble de résultats SQL standard. Vous obtenez des insights basés sur l'IA sans jamais déplacer vos données.

![Présentation visuelle des fonctions d&#39;IA](https://docs.cloud.google.com/static/alloydb/images/query-landing-page.png?hl=fr)

## Avantages des fonctions AlloyDB AI

Les mécanismes de requête de base de données traditionnels sont souvent rigides, ce qui oblige les développeurs à coder en dur tous les chemins d'interaction de l'utilisateur potentiels. Les fonctions AlloyDB AI modifient considérablement l'expérience utilisateur en procédant comme suit :

-   Intégrer des connaissances mondiales aux données d'entreprise : vous pouvez intégrer les connaissances du monde réel des grands modèles de langage (LLM) directement dans votre base de données AlloyDB pour PostgreSQL. Voici quelques exemples d'utilisation des fonctions d'IA :
    
    -   Traiter des données non structurées à l'aide de `ai.generate` : vous pouvez gérer les commentaires utilisateur bruts, bruyants ou non structurés (tels que les avis ou les journaux) à l'aide de Gemini avec SQL.
    -   Déterminer si les transactions sont frauduleuses à l'aide de `ai.if` : fournissez à la fonction une séquence d'actions utilisateur, des notes de transaction ou des résumés de chat, et demandez-lui d'évaluer un résultat binaire : `Is this fraudulent?` (Est-ce frauduleux ?)
-   Intelligence hautes performances : utilisez les éléments suivants pour accélérer les performances et gérer l'intelligence à grande échelle avec les fonctions d'IA :
    
    -   Utilisez le traitement basé sur des tableaux pour gérer jusqu'à des milliers de lignes par seconde, ce qui est 2 000 fois plus rapide que les appels ligne par ligne. Le traitement basé sur des tableaux est disponible pour toutes les fonctions d'IA. Pour en savoir plus, consultez [Effectuer des requêtes SQL intelligentes à l'aide de fonctions d'IA](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=fr).
    -   Utilisez l'accélération des fonctions d'IA pour obtenir un débit nettement supérieur à celui des appels ligne par ligne. Cette fonctionnalité est disponible pour `ai.if` et `ai.rank`. Pour en savoir plus, consultez [Effectuer des requêtes SQL intelligentes à l'aide de fonctions d'IA](https://docs.cloud.google.com/alloydb/docs/ai/evaluate-semantic-queries-ai-operators?hl=fr).
    -   Utilisez `ai.if` optimisé pour éliminer les coûts d'utilisation du LLM grâce à une efficacité accrue, en atteignant 100 000 lignes par seconde (soit une amélioration de 23 000 fois par rapport aux appels ligne par ligne) et en réduisant les coûts de 6 000 fois à 1/10 de centime.

## Cas d'utilisation des fonctions AlloyDB AI

Le tableau suivant décrit les cas d'utilisation des fonctions AlloyDB AI.

  
**Fonction**

  
**Description**

  
**Cas d'utilisation**

ai.if

  
Filtrage cognitif intelligent basé sur le langage naturel.

  
Déterminez quelles transactions client semblent frauduleuses en fonction des tendances comportementales.

ai.rank

  
Reclasse les résultats de la recherche vectorielle en fonction de nuances contextuelles profondes.

  
Donnez la priorité aux tissus respirants pour une recherche de `tropical wedding` (mariage tropical), même si votre base de données ne sait pas ce que signifie "tissus respirants".

ai.generate

  
Génère du contenu ou transforme des formats de données.

  
Convertissez les données brutes des journaux de serveur au format JSON structuré pour faciliter l'analyse.

ai.analyze\_sentiment

  
Classe le ton émotionnel du texte comme positif, négatif ou neutre.

  
Classez des milliers d'avis sur des produits pour évaluer la satisfaction globale des clients.

ai.summarize

  
Condense les longs textes en informations essentielles.

  
Extrayez les décisions clés et les mesures à prendre à partir des transcriptions de conversations.

ai.forecast

  
Permet la prévision de séries temporelles à l'aide du [modèle TimesFM](https://docs.cloud.google.com/alloydb/docs/ai/perform-time-series-forecasting?hl=fr).

  
Prévoyez les besoins futurs en matière d'inventaire en fonction de l'historique des données de ventes.

## En savoir plus

Explorez les ressources pour les développeurs afin de créer vos propres applications de requête en langage naturel avec AlloyDB AI.

Vidéo

### [Recherche vectorielle et opérateurs d'IA AlloyDB AI](https://www.youtube.com/watch?v=Li57kMm51zc&hl=fr)

Permettez aux petites équipes informatiques d'exploiter l'IA générative avec des Google Cloud bases de données.

Atelier de programmation

### [Opérateurs d'IA et reclassement AlloyDB AI](https://codelabs.developers.google.com/alloydb-ai-operators?hl=fr)

Déployez AlloyDB AI avec des opérateurs d'IA. Utilisez-les pour des tâches telles que la recherche sémantique, les jointures et le classement des résultats.

Blog

### [Gestion des points de terminaison de modèle](https://cloud.google.com/blog/products/databases/use-model-endpoint-management-on-alloydb?hl=fr)

Créez des expériences d'IA générative plus riches à l'aide de la gestion des points de terminaison de modèle.

Envoyer des commentaires

Sauf indication contraire, le contenu de cette page est régi par une licence [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/), et les échantillons de code sont régis par une licence [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Pour en savoir plus, consultez les [Règles du site Google Developers](https://developers.google.com/site-policies?hl=fr). Java est une marque déposée d'Oracle et/ou de ses sociétés affiliées.

Dernière mise à jour le 2026/05/16 (UTC).