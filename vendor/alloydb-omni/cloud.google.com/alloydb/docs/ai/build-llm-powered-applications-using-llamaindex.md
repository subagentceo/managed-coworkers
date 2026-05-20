 ![](https://docs.cloud.google.com/_static/images/translated.svg?hl=id) Google uses AI technology to translate content into your preferred language. AI translations can contain errors.

-   [Home](https://docs.cloud.google.com/?hl=id)
-   [Documentation](https://docs.cloud.google.com/docs?hl=id)
-   [Databases](https://docs.cloud.google.com/docs/databases?hl=id)
-   [AlloyDB for PostgreSQL](https://docs.cloud.google.com/alloydb/docs?hl=id)
-   [Panduan](https://docs.cloud.google.com/alloydb/docs/overview?hl=id)

Kirim masukan

# Membangun aplikasi yang didukung LLM menggunakan LlamaIndex Tetap teratur dengan koleksi Simpan dan kategorikan konten berdasarkan preferensi Anda.

**Pratinjau — [AlloyDB untuk PostgreSQL](https://docs.cloud.google.com/alloydb/docs/overview?hl=id)**

Fitur ini tunduk pada "Persyaratan Penawaran Pra-GA" di bagian Persyaratan Layanan Umum dari [Persyaratan Khusus Layanan](https://docs.cloud.google.com/terms/service-terms?hl=id#1). Anda dapat memproses data pribadi untuk fitur ini sebagaimana diuraikan dalam [Adendum Pemrosesan Data Cloud](https://docs.cloud.google.com/terms/data-processing-addendum?hl=id), dengan tunduk pada kewajiban dan batasan yang dijelaskan dalam perjanjian yang menjadi dasar Anda mengakses Google Cloud. Fitur pra-GA tersedia "sebagaimana adanya" dan mungkin memiliki dukungan terbatas. Untuk mengetahui informasi selengkapnya, lihat [deskripsi tahap peluncuran](https://cloud.google.com/products/?hl=id#product-launch-stages).

Halaman ini menjelaskan beberapa kasus penggunaan untuk membangun aplikasi yang didukung LLM menggunakan LlamaIndex yang terintegrasi dengan AlloyDB untuk PostgreSQL. Link ke notebook di GitHub disediakan untuk membantu Anda mempelajari pendekatan atau membantu Anda mengembangkan aplikasi.

LlamaIndex adalah framework orkestrasi AI generatif yang memungkinkan Anda menghubungkan dan mengintegrasikan sumber data dengan model bahasa besar (LLM). Anda dapat menggunakan LlamaIndex untuk membuat aplikasi yang mengakses dan mengkueri informasi dari data pribadi atau khusus domain menggunakan kueri bahasa alami.

LlamaIndex berfungsi sebagai jembatan antara data kustom dan LLM, sehingga memfasilitasi pengembangan aplikasi asisten pengetahuan dengan kemampuan retrieval-augmented generation (RAG).

LlamaIndex sangat cocok untuk aplikasi yang berfokus pada dokumen karena menekankan pengelolaan dokumen terstruktur, yang menyederhanakan pengindeksan dan pengambilan. Framework ini menampilkan mekanisme kueri yang dioptimalkan yang meningkatkan kecepatan dan relevansi akses informasi, beserta penanganan metadata yang andal untuk pemfilteran bernuansa.

Untuk mengetahui informasi selengkapnya tentang framework LlamaIndex, lihat [dokumentasi produk LlamaIndex](https://www.llamaindex.ai/framework).

## Komponen LlamaIndex

AlloyDB menawarkan antarmuka LlamaIndex berikut:

-   Vector Store
-   Penyimpanan Dokumen
-   Toko Indeks
-   Chat Stores
-   Pembaca Dokumen

Pelajari cara menggunakan LlamaIndex dengan [Panduan memulai untuk AlloyDB](https://github.com/googleapis/llama-index-alloydb-pg-python/blob/main/samples/llama_index_quick_start.ipynb).

## Vector Store

Integrasi LlamaIndex ini memungkinkan Anda menggunakan sifat AlloyDB yang andal dan skalabel untuk menyimpan dan mengelola data LlamaIndex Anda. Dengan menggabungkan kemampuan pengindeksan dan kueri LlamaIndex dengan performa tinggi dan keandalan AlloyDB, Anda dapat membangun aplikasi yang didukung LLM yang lebih efisien dan skalabel.

LlamaIndex memecah dokumen —DOC, teks, dan PDF— menjadi komponen dokumen yang disebut _node_. [VectorStore](https://docs.llamaindex.ai/en/stable/module_guides/storing/vector_stores/) hanya dapat berisi vektor embedding dari konten node yang telah diproses dan teks node. Node, yang merupakan konsep kelas pertama, berisi konten teks, penyematan vektor, dan metadata. Anda dapat menerapkan filter pada kolom metadata ini untuk membatasi pengambilan node hanya pada node yang cocok dengan kriteria metadata yang ditentukan.

Untuk menggunakan penyimpanan vektor di AlloyDB, gunakan class `AlloyDBVectorStore`. Untuk mengetahui informasi selengkapnya, lihat [LlamaIndex Vector Stores](https://docs.llamaindex.ai/en/stable/module_guides/storing/vector_stores/).

### Menyimpan embedding vektor dengan class AlloyDBVectorStore

[Notebook AlloyDB](https://github.com/googleapis/llama-index-alloydb-pg-python/blob/main/samples/llama_index_vector_store.ipynb) untuk penyimpanan vektor menunjukkan cara melakukan hal berikut:

-   Menginisialisasi tabel untuk menyimpan embedding vektor
-   Buat instance class embedding menggunakan [Llama Index embeddings model](https://docs.llamaindex.ai/en/stable/module_guides/models/embeddings/).
-   Lakukan inisialisasi penyimpanan vektor `AlloyDBVectorStore` default.
-   Buat dan kueri indeks dari penyimpanan vektor menggunakan [VectorStoreIndex](https://docs.llamaindex.ai/en/stable/module_guides/indexing/vector_store_index/).
-   Buat Penyimpanan Vektor kustom untuk menyimpan dan memfilter metadata secara efektif.
-   Tambahkan indeks ANN untuk meningkatkan latensi penelusuran.

## Penyimpanan Dokumen dan Indeks

Integrasi Penyimpanan Dokumen LlamaIndex mengelola penyimpanan dan pengambilan dokumen terstruktur, yang dioptimalkan untuk kemampuan LlamaIndex yang berfokus pada dokumen. Document Store menyimpan konten yang terkait dengan vektor di penyimpanan vektor.

Untuk mengetahui informasi selengkapnya, lihat dokumentasi produk [LlamaIndex Document Stores](https://docs.llamaindex.ai/en/stable/module_guides/storing/docstores/).

Penyimpanan Indeks memfasilitasi pengelolaan indeks untuk memungkinkan kueri dan pengambilan data yang cepat, misalnya, indeks ringkasan, kata kunci, dan Tree. `Index` di LlamaIndex adalah penyimpanan ringan hanya untuk metadata node. Pembaruan metadata node tidak memerlukan pengindeksan ulang (baca pembuatan sematan) dari seluruh node atau semua node dalam dokumen.

Untuk mengetahui informasi selengkapnya, lihat [Penyimpanan Indeks LlamaIndex](https://docs.llamaindex.ai/en/stable/module_guides/storing/index_stores/).

### Menyimpan dokumen dan indeks

[Notebook AlloyDB](https://github.com/googleapis/llama-index-alloydb-pg-python/blob/main/samples/llama_index_doc_store.ipynb) untuk Penyimpanan Dokumen menunjukkan cara menggunakan AlloyDB untuk menyimpan dokumen dan indeks menggunakan class `AlloyDBDocumentStore` dan `AlloyDBIndexStore`. Anda akan mempelajari cara melakukan hal berikut:

-   Buat `AlloyDBEngine` menggunakan `AlloyDBEngine.from_instance()`.
-   Buat tabel untuk DocumentStore dan IndexStore.
-   Lakukan inisialisasi `AlloyDBDocumentStore` default.
-   Siapkan `AlloyDBIndexStore`.
-   Tambahkan dokumen ke `Docstore`.
-   Menggunakan Penyimpanan Dokumen dengan beberapa indeks.
-   Memuat indeks yang ada.

## Chat Stores

Chat Store mempertahankan histori dan konteks percakapan untuk aplikasi berbasis chat, sehingga memungkinkan interaksi yang dipersonalisasi. Penyimpanan Chat menyediakan repositori pusat yang menyimpan dan mengambil pesan chat dalam percakapan, sehingga memungkinkan LLM mempertahankan konteks dan memberikan respons yang lebih relevan berdasarkan dialog yang sedang berlangsung.

Model bahasa besar bersifat stateless secara default, yang berarti bahwa model tersebut tidak mempertahankan input sebelumnya kecuali jika input tersebut diberikan secara eksplisit setiap kali. Dengan menggunakan penyimpanan percakapan, Anda dapat mempertahankan konteks percakapan, sehingga model dapat menghasilkan respons yang lebih relevan dan koheren dari waktu ke waktu.

Modul memori di LlamaIndex memungkinkan penyimpanan dan pengambilan konteks percakapan yang efisien, sehingga memungkinkan interaksi yang lebih dipersonalisasi dan kontekstual dalam aplikasi chat. Anda dapat mengintegrasikan modul memori di LlamaIndex dengan [ChatStore](https://docs.llamaindex.ai/en/stable/module_guides/storing/chat_stores/) dan [ChatMemoryBuffer.](https://docs.llamaindex.ai/en/stable/api_reference/memory/chat_memory_buffer/)
Untuk mengetahui informasi selengkapnya, lihat [Penyimpanan Chat LlamaIndex](https://docs.llamaindex.ai/en/stable/module_guides/storing/chat_stores/).

### Menyimpan histori chat

[Notebook AlloyDB](https://github.com/googleapis/llama-index-alloydb-pg-python/blob/main/samples/llama_index_chat_store.ipynb)untuk Chat Stores menunjukkan cara menggunakan `AlloyDB for PostgreSQL` untuk menyimpan histori chat menggunakan class `AlloyDBChatStore`. Anda akan mempelajari cara melakukan hal berikut:

-   Buat `AlloyDBEngine` menggunakan `AlloyDBEngine.from_instance()`.
-   Lakukan inisialisasi `AlloyDBChatStore` default.
-   Buat `ChatMemoryBuffer`.
-   Buat instance class LLM.
-   Gunakan `AlloyDBChatStore` tanpa konteks penyimpanan.
-   Gunakan `AlloyDBChatStore` dengan konteks penyimpanan.
-   Buat dan gunakan Chat Engine.

## Pembaca Dokumen

Document Reader secara efisien mengambil dan mentransformasi data dari AlloyDB ke format yang kompatibel dengan LlamaIndex untuk pengindeksan. Antarmuka Document Reader menyediakan metode untuk memuat data dari sumber sebagai `Documents`. `[Document](https://docs.llamaindex.ai/en/stable/module_guides/loading/documents_and_nodes/)` adalah class yang menyimpan potongan teks dan metadata terkait. Anda dapat menggunakan Pembaca Dokumen untuk memuat dokumen yang ingin Anda simpan di Penyimpanan Dokumen atau digunakan untuk membuat Indeks.

Untuk mengetahui informasi selengkapnya, lihat [Pembaca Dokumen LlamaIndex](https://docs.llamaindex.ai/en/stable/understanding/loading/loading/#using-readers-from-llamahub).

### Mengambil data sebagai dokumen

[Notebook AlloyDB](https://github.com/googleapis/llama-index-alloydb-pg-python/blob/main/samples/llama_index_reader.ipynb) untuk Document Reader menunjukkan cara menggunakan AlloyDB untuk mengambil data sebagai dokumen menggunakan class `AlloyDBReader`. Anda akan mempelajari cara melakukan hal berikut:

-   Buat `AlloyDBEngine` menggunakan `AlloyDBEngine.from_instance()`.
-   Buat `AlloyDBReader`.
-   Muat Dokumen menggunakan argumen `table_name`.
-   Memuat Dokumen menggunakan kueri SQL.
-   Menetapkan format konten halaman.
-   Muat dokumen.

## Langkah berikutnya

-   [Bangun aplikasi yang didukung LLM menggunakan LangChain](https://cloud.google.com/alloydb/docs/ai/langchain?hl=id).

Kirim masukan

Kecuali dinyatakan lain, konten di halaman ini dilisensikan berdasarkan [Lisensi Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/), sedangkan contoh kode dilisensikan berdasarkan [Lisensi Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Untuk mengetahui informasi selengkapnya, lihat [Kebijakan Situs Google Developers](https://developers.google.com/site-policies?hl=id). Java adalah merek dagang terdaftar dari Oracle dan/atau afiliasinya.

Terakhir diperbarui pada 2026-05-16 UTC.
