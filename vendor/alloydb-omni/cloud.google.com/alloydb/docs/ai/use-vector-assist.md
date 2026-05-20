 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=fr) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=fr)
-   [Documentation](https://docs.cloud.google.com/docs?hl=fr)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=fr)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=fr)
-   [Guides](https://docs.cloud.google.com/alloydb/docs/overview?hl=fr)

Envoyer des commentaires

# Utiliser l'assistance vectorielle Restez organisé à l'aide des collections Enregistrez et classez les contenus selon vos préférences.

**Aperçu : Assistance vectorielle**

Cette fonctionnalité est soumise aux "Conditions des offres de pré-DG" de la section "Conditions générales du service" des [Conditions spécifiques du service](https://docs.cloud.google.com/terms/service-terms?hl=fr#1). [Vous pouvez traiter des données à caractère personnel lorsque vous utilisez cette fonctionnalité, comme indiqué dans l'Avenant relatif au traitement des données dans le cloud, sous réserve de respecter les obligations et restrictions décrites dans le contrat en vertu duquel vous accédez à Google Cloud.](https://docs.cloud.google.com/terms/data-processing-addendum?hl=fr) Les fonctionnalités pré-DG sont disponibles "en l'état" et peuvent avoir une prise en charge limitée. Pour en savoir plus, consultez les [descriptions des étapes de lancement](https://cloud.google.com/products/?hl=fr#product-launch-stages).

Utilisez l'assistance vectorielle pour déployer et gérer une charge de travail vectorielle sur vos instances AlloyDB pour PostgreSQL.

Pour en savoir plus sur l'assistance vectorielle et son fonctionnement, consultez [Présentation de l'assistance vectorielle](https://docs.cloud.google.com/alloydb/docs/ai/vector-assist-overview?hl=fr).

## Avant de commencer

-   Vérifiez que votre instance utilise la bonne version de maintenance. L'assistance vectorielle nécessite une version de maintenance minimale de `POSTGRES_17.20260128.03_06`. Pour en savoir plus sur la maintenance en libre-service, consultez [Maintenance en libre-service pour les performances](https://docs.cloud.google.com/alloydb/docs/self-service-maintenance?hl=fr).
-   Activez l'extension d'assistance vectorielle à l'aide de la commande suivante dans la base de données que vous souhaitez utiliser :

    ```
    CREATE EXTENSION vector_assist CASCADE;
    ```

    Cela génère le schéma `vector_assist`, qui est utilisé par l'assistance vectorielle.


## Utiliser l'assistance vectorielle pour déployer une charge de travail vectorielle

Pour utiliser l'assistance vectorielle afin de déployer et de gérer une charge de travail vectorielle, vous devez procéder comme suit :

-   [Définir votre spécification vectorielle](#define-spec)
-   [Afficher les recommandations de l'assistance vectorielle](#view-recommendations)
-   [Appliquer les recommandations de l'assistance vectorielle](#apply-recommendations)

### Définir votre spécification vectorielle

La définition de la [spécification vectorielle](https://docs.cloud.google.com/alloydb/docs/ai/vector-assist-overview?hl=fr#spec), ou _spécification vectorielle_, est la première étape de l'utilisation de l'assistance vectorielle. Selon le type de charge de travail vectorielle, les champs que vous utilisez pour définir votre spécification vectorielle peuvent être différents.

Par exemple, si vous souhaitez activer la recherche sémantique sur une colonne spécifique d'une table, exécutez la [`vector_assist.define_spec`](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr#define-spec) fonction pour définir votre spécification vectorielle :

```
SELECT
  recommendation_id,
  REGEXP_REPLACE(query, 'SET hnsw.ef_search TO \d+', 'SET hnsw.ef_search TO') AS query_1,
  recommendation,
  vector_spec_id,
  table_name,
  applied,
  modified
FROM vector_assist.define_spec(
  table_name => 'TABLE_NAME',
  vector_column_name => 'VECTOR_COLUMN_NAME',
  target_recall => TARGET_RECALL,
  tune_vector_index => TUNE_INDEX
);
```

Remplacez les paramètres suivants :

-   `TABLE_NAME`: nom de la table que vous souhaitez utiliser dans votre charge de travail vectorielle.
-   (Facultatif) `VECTOR_COLUMN_NAME` : colonne sur laquelle vous souhaitez effectuer une recherche sémantique. Si votre table ne comporte qu'une seule colonne avec des vecteurs, `vector_assist` peut la définir automatiquement. S'il existe plusieurs tables avec des vecteurs, vous devez spécifier la colonne à utiliser.
-   (Facultatif) `TARGET_RECALL` : rappel cible que vous souhaitez que l'assistance vectorielle respecte. Si cette option est spécifiée, `vector_assist` teste différentes valeurs `ef_search`, en comparant le rappel dans les recherches exactes et les recherches de voisins les plus proches. `vector_assist` définit `ef_search` sur la valeur qui fournit le rappel cible le plus proche. La valeur par défaut est `0.95`.
-   (Facultatif) `TUNE_INDEX` : valeur booléenne qui indique si l'assistance vectorielle ajuste les index vectoriels de votre charge de travail. La valeur par défaut est `false`, ce qui signifie que seuls les paramètres liés à la recherche (`ef_search`) sont ajustés. Les paramètres de temps de compilation (`m`, `ef_construction`) ne sont pas ajustés.

Pour obtenir la liste complète de tous les paramètres disponibles pour la spécification vectorielle, consultez [Références des fonctions d'assistance vectorielle](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr).

Une fois la requête exécutée pour créer votre spécification vectorielle, l'assistance vectorielle génère automatiquement des étapes, appelées recommandations, que vous devez exécuter pour déployer votre charge de travail vectorielle.

### Afficher les recommandations de l'assistance vectorielle

Pour afficher les recommandations générées par l'assistance vectorielle à l'aide de votre spécification vectorielle, exécutez la [`vector_assist.get_recommendations`](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr#get-recommendations) fonction :

```
SELECT vector_assist.get_recommendations(
  spec_id => 'SPEC_ID'
);
```

Remplacez `SPEC_ID` par l'ID de spécification de la spécification vectorielle pour laquelle vous souhaitez afficher des recommandations. Pour obtenir votre liste des spécifications vectorielles disponibles, consultez [Répertorier vos spécifications vectorielles](#list-specs).

`vector_assist.get_recommendations` renvoie une table appelée `vector_assist.RECOMMENDATIONS` qui contient toutes les recommandations. Chaque recommandation est stockée dans une table avec le `spec_id` associé. Chaque recommandation contient généralement les informations suivantes :

-   Requête SQL que vous devez exécuter
-   Explication détaillée de la recommandation
-   Autres informations pertinentes qui expliquent la recommandation

### Appliquer les recommandations de l'assistance vectorielle

Vous pouvez appliquer les recommandations générées individuellement ou dans leur ensemble.

Pour appliquer une recommandation spécifique, exécutez la [`vector_assist.apply_recommendation`](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr#apply-recommendation) fonction :

```
SELECT vector_assist.apply_recommendation(
  recommendation_id => 'RECOMMENDATION_ID'
);
```

Remplacez `RECOMMENDATION_ID` par l'ID de la recommandation d'assistance vectorielle que vous souhaitez appliquer à partir de la table `vector_assist.RECOMMENDATIONS`.

Pour appliquer toutes les recommandations en même temps, exécutez la [`vector_assist.apply_spec`](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr#apply-spec) fonction avec le paramètre `spec_id` ou `table_name` :

```
SELECT vector_assist.apply_spec(
  spec_id => 'SPEC_ID'
);
```

Remplacez `SPEC_ID` par l'ID de la spécification vectorielle que vous souhaitez utiliser.

Vous pouvez également saisir les paramètres `schema_name` ou `column_name`. Pour en savoir plus sur tous les paramètres de requête disponibles, consultez [Références des fonctions d'assistance vectorielle](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr#apply-spec).

Une fois que vous avez appliqué les recommandations générées par l'assistance vectorielle, l'index vectoriel est prêt à être utilisé.

## Générer des requêtes de recherche

Vous pouvez utiliser l'assistance vectorielle pour vous aider à créer des requêtes de recherche optimisées pour vos charges de travail vectorielles déployées à l'aide de la spécification vectorielle de la charge de travail et de l'index vectoriel généré. Pour générer une requête de recherche optimisée, exécutez la [`vector_assist.generate_query`](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr#generate-query) fonction :

```
SELECT vector_assist.generate_query(
  spec_id => 'SPEC_ID',
  search_vector => 'SEARCH_VECTOR',
  top_k => 'TOP_K',
  target_recall => TARGET_RECALL,
  filter_expression => 'FILTER_EXPRESSION'
);
```

Remplacez les paramètres suivants :

-   `SPEC_ID`: ID de la spécification que vous souhaitez utiliser.
-   `SEARCH_VECTOR`: vecteur de votre requête de recherche. Par exemple, `[1, 2, 3]`.
-   (Facultatif) `TOP_K` : nombre de voisins les plus proches à renvoyer. Si aucune valeur n'est spécifiée, la valeur par défaut est `10`.
-   (Facultatif) `TARGET_RECALL` : rappel cible que vous souhaitez que l'assistance vectorielle respecte. Si cette option est spécifiée, `vector_assist` teste différentes valeurs `ef_search`, en comparant le rappel dans les recherches exactes et les recherches de voisins les plus proches. `vector_assist` définit `ef_search` sur la valeur qui fournit le rappel cible le plus proche.
-   (Facultatif) `FILTER_EXPRESSION` : tous les filtres de la requête de recherche. Par exemple, filtrer en fonction d'autres colonnes.

Pour obtenir la liste complète de tous les paramètres disponibles pour générer une requête de recherche, consultez [Références des fonctions d'assistance vectorielle](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr).

La sortie de cette fonction renvoie du texte contenant une requête SQL. Vous pouvez exécuter ou enregistrer cette requête SQL si nécessaire.

## Répertorier vos spécifications vectorielles

Si vous devez répertorier une ou toutes vos spécifications vectorielles existantes, exécutez la fonction `vector_assist.list_specs` :

```
SELECT vector_assist.list_specs(
  spec_id => 'SPEC_ID',
  table_name => 'TABLE_NAME'
);
```

Remplacez les paramètres suivants :

-   (Facultatif) `SPEC_ID` : ID de la spécification vectorielle que vous souhaitez utiliser.
-   `TABLE_NAME`: nom de la table que vous avez utilisée pour définir votre spécification vectorielle.

## Étape suivante

-   En savoir plus sur [l'assistance vectorielle](https://docs.cloud.google.com/alloydb/docs/ai/vector-assist-overview?hl=fr).
-   [Références des fonctions d'assistance vectorielle](https://docs.cloud.google.com/alloydb/docs/reference/ai/vector-assist?hl=fr).

Envoyer des commentaires

Sauf indication contraire, le contenu de cette page est régi par une licence [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/), et les échantillons de code sont régis par une licence [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Pour en savoir plus, consultez les [Règles du site Google Developers](https://developers.google.com/site-policies?hl=fr). Java est une marque déposée d'Oracle et/ou de ses sociétés affiliées.

Dernière mise à jour le 2026/05/16 (UTC).
