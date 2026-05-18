 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=he) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=he)
-   [Documentation](https://docs.cloud.google.com/docs?hl=he)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=he)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=he)
-   [מדריכים](https://docs.cloud.google.com/alloydb/docs/overview?hl=he)

שליחת משוב

# פיתוח אפליקציות מבוססות-LLM באמצעות LangChain קל לארגן דפים בעזרת אוספים אפשר לשמור ולסווג תוכן על סמך ההעדפות שלך.

**גרסת טרום-השקה — LangChain**

השימוש בתכונה הזו כפוף לתנאי השימוש במוצרים בגרסת טרום-GA, שמפורטים בחלק "תנאים כלליים לשירות" של [התנאים הספציפיים לשירות](https://docs.cloud.google.com/terms/service-terms?hl=he#1). השימוש בתכונות בגרסת טרום-GA הוא "כפי שהן" (As is), ויכול להיות שהתמיכה בהן תהיה מוגבלת. אתם יכולים לקרוא מידע נוסף בקטע [תיאור שלבי ההשקה](https://cloud.google.com/products/?hl=he#product-launch-stages).

בדף הזה מוסבר איך ליצור אפליקציות מבוססות-LLM באמצעות [LangChain](https://www.langchain.com/). הסקירות הכלליות בדף הזה מקשרות למדריכים לפרוצדורות ב-GitHub.

## מה זה LangChain?

‫LangChain היא מסגרת לתזמור LLM שעוזרת למפתחים לבנות אפליקציות AI גנרטיביות או תהליכי עבודה של יצירה משופרת באחזור (RAG). הוא מספק את המבנה, הכלים והרכיבים לייעול תהליכי עבודה מורכבים של מודלים גדולים של שפה (LLM). מידע נוסף על מודלים של שפה גדולה (LLM), תרחישי השימוש בהם והמודלים והשירותים הספציפיים ש-Google מציעה זמין [בסקירה הכללית על מושגים ושירותים של LLM ב- Google Cloud](https://docs.cloud.google.com/ai/llms?hl=he).

מידע נוסף על LangChain זמין בדף [Google LangChain](https://python.langchain.com/docs/integrations/platforms/google). מידע נוסף על מסגרת LangChain זמין במסמכי העזרה של המוצר [LangChain](https://python.langchain.com/docs/get_started/introduction).

## רכיבי LangChain ל-AlloyDB

-   [מאגר וקטורים](#vector-store)
-   [רכיב טעינת מסמכים](#document-loader)
-   [היסטוריית ההודעות ב-Chat](#chat-message-history)

[כך משתמשים ב-LangChain עם LangChain Quickstart for AlloyDB](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/samples/langchain_quick_start.ipynb). במדריך למתחילים הזה, יוצרים אפליקציה שמקבלת גישה למערך נתונים של סרטים ב-Netflix, כדי שהמשמשים יוכלו ליצור אינטראקציה עם נתוני הסרטים.

## מאגר וקטורים ל-AlloyDB

מאגר וקטורים מאחזר ומאחסן מסמכים ומטא-נתונים ממסד נתונים וקטורי. מאגר וקטורים מאפשר לאפליקציה לבצע חיפושים סמנטיים שמפרשים את המשמעות של שאילתת משתמש. סוג החיפוש הזה נקרא חיפוש וקטורי, והוא יכול למצוא נושאים שתואמים לשאילתה מבחינה מושגית. בזמן השאילתה, מאגר הווקטורים מאחזר את וקטורי ההטמעה שהכי דומים להטמעה של בקשת החיפוש. ב-LangChain, מאגר וקטורים אחראי לאחסון נתונים מוטמעים ולביצוע חיפוש וקטורי בשבילכם.

כדי לעבוד עם מאגר וקטורים ב-AlloyDB, צריך להשתמש במחלקה `AlloyDBVectorStore`.

מידע נוסף זמין במסמכי התיעוד של המוצר בנושא [מאגרי וקטורים של LangChain](https://python.langchain.com/docs/how_to/#vector-stores).

### מדריך להליך של חנות וקטורים

[במדריך AlloyDB לחנות וקטורים](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/vector_store.ipynb) מוסבר איך:

-   התקנת חבילת השילוב ו-LangChain
-   יוצרים אובייקט `AlloyDBEngine` ומגדירים מאגר חיבורים למסד הנתונים של AlloyDB
-   אתחול טבלה במאגר הווקטורים
-   הגדרת שירות הטמעה באמצעות `VertexAIEmbeddings`
-   אתחול `AlloyDBVectorStore`
-   הוספה ומחיקה של מסמכים
-   חיפוש מסמכים דומים
-   הוספת אינדקס וקטורי כדי לשפר את ביצועי החיפוש
-   יצירת מאגר וקטורים מותאם אישית כדי להתחבר למסד נתונים קיים של AlloyDB ל-PostgreSQL שיש בו טבלה עם הטבעות וקטוריות

## כלי לטעינת מסמכים ל-AlloyDB

רכיב טעינה של מסמכים שומר, טוען ומוחק אובייקטים של LangChain `Document` לדוגמה, אפשר לטעון נתונים לעיבוד בהטמעות, ולאחסן אותם במאגר וקטורים או להשתמש בהם ככלי כדי לספק הקשר ספציפי לשרשרות.

כדי לטעון מסמכים מ-AlloyDB, משתמשים במחלקה `AlloyDBLoader`. ‫`AlloyDBLoader` מחזירה רשימה של מסמכים מטבלה, כשהעמודה הראשונה משמשת לתוכן הדף וכל שאר העמודות משמשות למטא-נתונים. בטבלת ברירת המחדל, העמודה הראשונה היא תוכן הדף והעמודה השנייה היא מטא-נתוני JSON. כל שורה הופכת למסמך. הוראות להתאמה אישית של ההגדרות האלה מופיעות [במדריך התהליך](#langchain-procedures).

אפשר להשתמש במחלקה `AlloyDBSaver` כדי לשמור ולמחוק מסמכים.

מידע נוסף זמין במאמר בנושא [LangChain Document loaders](https://python.langchain.com/docs/how_to/#document-loaders).

### מדריך להליך טעינת מסמכים

[במדריך AlloyDB לרכיב טעינת מסמכים](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/document_loader.ipynb) מוסבר איך:

-   התקנת חבילת השילוב ו-LangChain
-   טעינת מסמכים מטבלה
-   הוספת מסנן לרכיב טעינה
-   התאמה אישית של החיבור והאימות
-   התאמה אישית של מבנה המסמך על ידי ציון תוכן ומטא-נתונים של הלקוח
-   איך משתמשים ב-`AlloyDBSaver` ומתאימים אותו אישית כדי לאחסן ולמחוק מסמכים

## היסטוריית הודעות צ'אט ב-AlloyDB

אפליקציות של שאלות ותשובות צריכות היסטוריה של הדברים שנאמרו בשיחה כדי לספק לאפליקציה הקשר למענה על שאלות נוספות מהמשתמש. המחלקות `ChatMessageHistory` של LangChain מאפשרות לאפליקציה לשמור הודעות במסד נתונים ולאחזר אותן כשצריך כדי לגבש תשובות נוספות. הודעה יכולה להיות שאלה, תשובה, הצהרה, ברכה או כל טקסט אחר שהמשתמש או האפליקציה נותנים במהלך השיחה. ‫`ChatMessageHistory` שומר כל הודעה ומקשר בין ההודעות בכל שיחה.

‫AlloyDB מרחיב את המחלקה הזו באמצעות `AlloyDBChatMessageHistory`.

### מדריך להפעלת היסטוריית ההודעות בצ'אט

[במדריך AlloyDB להיסטוריית הודעות בצ'אט](https://github.com/googleapis/langchain-google-alloydb-pg-python/blob/main/docs/chat_message_history.ipynb) מוסבר איך:

-   התקנת חבילת השילוב ו-LangChain
-   יוצרים אובייקט `AlloyDBEngine` ומגדירים מאגר חיבורים למסד הנתונים של AlloyDB
-   הפעלת טבלה
-   הפעלת האתחול של המחלקה `AlloyDBChatMessageHistory` כדי להוסיף ולמחוק הודעות
-   יצירת שרשרת להיסטוריית ההודעות באמצעות LangChain Expression Language ‏(LCEL)

## המאמרים הבאים

-   [העברת נתונים ממסד נתונים וקטורי אל AlloyDB באמצעות LangChain](https://docs.cloud.google.com/alloydb/docs/ai/migrate-data-from-langchain-vector-stores-to-alloydb?hl=he).

שליחת משוב

אלא אם צוין אחרת, התוכן של דף זה הוא ברישיון [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) ודוגמאות הקוד הן ברישיון [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). לפרטים, ניתן לעיין ב[מדיניות האתר Google Developers‏](https://developers.google.com/site-policies?hl=he).‏ Java הוא סימן מסחרי רשום של חברת Oracle ו/או של השותפים העצמאיים שלה.

עדכון אחרון: 2026-03-10 (שעון UTC).