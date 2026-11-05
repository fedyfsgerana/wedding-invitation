# Kebijakan Keamanan

## Versi yang didukung

Perbaikan keamanan hanya diberikan untuk versi terbaru di branch `master`, yaitu versi yang sedang berjalan di Vercel.

| Versi              | Didukung |
| ------------------ | -------- |
| `master` (terbaru) | Ya       |
| Versi lama         | Tidak    |

## Melaporkan celah keamanan

Mohon **jangan** melaporkan celah keamanan lewat issue, pull request, atau diskusi publik.

Kirim laporan secara pribadi ke **fedfg30@gmail.com** dengan subjek `[Wedding Invitation Security]`, berisi:

- Jenis celah, misalnya bypass login admin, kebocoran data tamu, atau penyalahgunaan form ucapan.
- Bagian yang terdampak, berupa endpoint, halaman, atau file.
- Langkah untuk mereproduksi, beserta contoh request kalau ada.
- Dampak yang mungkin terjadi.

## Yang bisa Anda harapkan

- Konfirmasi penerimaan laporan dalam **3 hari kerja**.
- Penilaian awal dan rencana perbaikan dalam **7 hari kerja**.
- Kabar saat perbaikan dirilis. Nama Anda bisa dicantumkan sebagai pelapor jika berkenan.

## Cakupan

Termasuk dalam cakupan: kode di repo ini dan undangan yang berjalan di `wedding-invitation-fedy-suci.vercel.app`, termasuk endpoint `/api/admin`, `/api/guests`, dan `/api/wishes`.

Di luar cakupan: layanan pihak ketiga seperti Vercel, Google Sheets, dan Google Maps; serangan yang membutuhkan akses fisik ke perangkat; serta serangan banjir permintaan (DoS) skala besar.

## Praktik keamanan

- **Halaman admin tersembunyi:** hanya bisa dibuka lewat alamat rahasia `ADMIN_ROUTE_SLUG`, sedangkan `/admin` dijawab `404`.
- **Sesi admin bertanda tangan** dengan `ADMIN_SESSION_SECRET`, disimpan di cookie dengan masa berlaku terbatas.
- **Batas laju:** percobaan login admin dan kiriman ucapan dibatasi per alamat IP.
- **Endpoint tamu dilindungi:** daftar dan pengelolaan tamu hanya bisa diakses setelah login admin.
- **Ucapan divalidasi di server:** nama harus terdaftar sebagai tamu, dan jumlah tamu tidak boleh melebihi kuota.
- **Rahasia di variabel lingkungan:** password admin, kunci sesi, dan kunci service account Google hanya ada di `.env.local` dan Environment Variables Vercel, tidak pernah di repo.
- **Akses Google Sheets terbatas:** service account hanya diberi akses Editor ke satu spreadsheet undangan.

## Data pribadi

Nama mempelai, nama orang tua, foto, dan nomor rekening di `src/lib/weddingData.ts` dan `public/images` sengaja ditampilkan untuk tamu undangan. Data itu bukan celah keamanan, tetapi tidak boleh dipakai ulang di luar undangan ini.
