 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=de) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=de)
-   [Documentation](https://docs.cloud.google.com/docs?hl=de)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=de)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=de)
-   [Leitfäden](https://docs.cloud.google.com/alloydb/docs/overview?hl=de)

Feedback geben

# Volltextsuche – Übersicht Mit Sammlungen den Überblick behalten Sie können Inhalte basierend auf Ihren Einstellungen speichern und kategorisieren.

Mit der Volltextsuche (Full-Text Search, FTS) können Sie Dokumente in natürlicher Sprache identifizieren, die einer Abfrage entsprechen. Dieser Ansatz ist effektiver als der Standardabgleich von Strings, da er sprachliche Nuancen berücksichtigt. So werden beispielsweise häufig verwendete Wörter wie „der“ ignoriert und verschiedene Formen eines Worts abgeglichen, z. B. „laufen“, „läuft“ oder „lief“.

AlloyDB for PostgreSQL unterstützt alle Funktionen und Möglichkeiten der Volltextsuche. Neben der Unterstützung für GIN- und GiST-Indexe bietet AlloyDB auch die [RUM-Erweiterung](https://cloud.google.com/products?hl=de) für eine leistungsstarke Volltextsuche. PostgreSQL 17 oder niedriger unterstützt diese Erweiterung.

## Wichtige Konzepte der Volltextsuche

Um die Volltextsuche effektiv zu implementieren, sollten Sie wissen, wie PostgreSQL Text verarbeitet und durchsucht. Die Sucheinheit, ein _Dokument_, ist in der Regel eine Textspalte oder eine Kombination von Spalten aus einer Zeile. Beim Erstellen des Index wird dieses Dokument geparst, um Wörter (oder _Lexeme_, die Grundform eines Worts) mit der Zeile zu verknüpfen.

Dieser Prozess umfasst eine Vorverarbeitungs-Pipeline, die Rohtext in ein durchsuchbares Format umwandelt. Dazu wird Folgendes ausgeführt:

-   Text in Tokens aufteilen.
-   Häufig verwendete Stoppwörter entfernen.
-   Wörter auf ihre Grundform normalisieren. „laufen“ ist beispielsweise das Lexem für „laufen“, „läuft“, „laufend“ und „lief“.

Für die Verwendung der Volltextsuche müssen Sie auch spezielle Datentypen, Operatoren und verschiedene Indexierungsstrategien kennen, einschließlich der integrierten PostgreSQL Indexe und der leistungsstarken [RUM](https://github.com/postgrespro/rum) Indexe.

PostgreSQL verwendet zwei primäre Datentypen und einen Abgleichoperator, um die Volltextsuche zu verwalten:

-   `tsvector`: Stellt ein Dokument in einem durchsuchbaren Format dar – als sortierte Liste eindeutiger Lexeme.
-   `tsquery`: Stellt Suchbegriffe dar, einschließlich boolescher Operatoren, mit denen Sie Lexeme kombinieren können.
-   `@@`: Prüft, ob ein `tsvector` mit einem `tsquery` übereinstimmt, und ermöglicht so sprachlich bewusste Suchvorgänge.

AlloyDB unterstützt alle Indextypen für die Volltextsuche, die von PostgreSQL unterstützt werden. Die Wahl des Index hängt vom Gleichgewicht zwischen Suchgeschwindigkeit, Indexerstellungszeit, Aktualisierungsgeschwindigkeit und den spezifischen Suchfunktionen ab, die erforderlich sind, z. B. die Suche nach Wortgruppen oder das Ranking nach Relevanz.

AlloyDB unterstützt auch die RUM-Erweiterung für komplexe Volltextsuchvorgänge. RUM verbessert Standard-GIN-Indexe, indem Positionsinformationen direkt im Index gespeichert werden. So können Sie schneller nach Wortgruppen suchen und die Relevanz einstufen, ohne auf die Tabellendaten zuzugreifen.

Weitere Informationen zum Erstellen und Verwenden von RUM-Indexen in AlloyDB finden Sie unter [RUM-Index erstellen und verwalten](https://docs.cloud.google.com/alloydb/docs/ai/create-rum-index?hl=de).

## Volltext- und semantische Suche kombinieren

Die leistungsstärksten Suchimplementierungen kombinieren häufig die Volltextsuche mit RUM-Indexen und die Vektorsuche. Verwenden Sie die Hybridsuche, um die Stärken des semantischen Verständnisses und des genauen Abgleichs von Suchbegriffen zu kombinieren und die unterschiedlichen Ergebnismengen für ein umfassendes Ranking zusammenzuführen.

In einer E-Commerce-Anwendung können Sie beispielsweise zuerst die Volltextsuche mit RUM verwenden, um Produkte zu finden, die bestimmte Suchbegriffe wie „Laufschuhe“ enthalten. Mit der Vektorsuche können Sie dann Ergebnisse basierend auf der semantischen Ähnlichkeit mit einer detaillierteren Suchanfrage eines Nutzers finden, z. B. „bequeme Schuhe für Langstreckentraining“. Die Datenbank führt dann die gerankten Ergebnisse aus beiden Suchkomponenten mit dem Algorithmus „Reciprocal Rank Fusion“ (RRF) zu einer einzigen, einheitlichen Liste zusammen, um ein endgültiges Ranking zu erstellen.

Weitere Informationen zur Verwendung dieses Hybridansatzes finden Sie unter [Hybride Vektorsuche nach Ähnlichkeiten](https://docs.cloud.google.com/alloydb/docs/ai/run-hybrid-vector-similarity-search?hl=de).

## Nächste Schritte

-   Informationen zum [Erstellen und Verwalten eines RUM Index](https://docs.cloud.google.com/alloydb/docs/ai/create-rum-index?hl=de)
-   [Informationen zum Ausführen einer hybriden Vektorsuche nach Ähnlichkeiten](https://docs.cloud.google.com/alloydb/docs/ai/run-hybrid-vector-similarity-search?hl=de)

Feedback geben

Sofern nicht anders angegeben, sind die Inhalte dieser Seite unter der [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/) und Codebeispiele unter der [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0) lizenziert. Weitere Informationen finden Sie in den [Websiterichtlinien von Google Developers](https://developers.google.com/site-policies?hl=de). Java ist eine eingetragene Marke von Oracle und/oder seinen Partnern.

Zuletzt aktualisiert: 2026-05-16 (UTC).