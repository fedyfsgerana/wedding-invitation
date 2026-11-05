# Panduan Kontribusi

Terima kasih sudah tertarik berkontribusi ke Wedding Invitation. Proyek ini adalah undangan pernikahan pribadi yang sedang dipakai, jadi kontribusi yang paling membantu adalah perbaikan bug, aksesibilitas, performa, dan keamanan.

## Melaporkan bug atau mengusulkan perbaikan

1. Cek dulu [Issues](https://github.com/fedyfsgerana/wedding-invitation/issues) supaya tidak ada laporan ganda.
2. Buat issue baru dengan judul yang jelas.
3. Untuk bug, sertakan langkah untuk mereproduksi, hasil yang diharapkan, hasil yang terjadi, serta browser, perangkat, dan ukuran layar. Tangkapan layar sangat membantu.

Celah keamanan jangan dilaporkan lewat issue publik. Ikuti [SECURITY](docs/SECURITY.md).

## Menyiapkan proyek

Ikuti langkah di bagian **Memulai** pada [README](README.md). Untuk mencoba fitur RSVP dan halaman admin, Anda butuh spreadsheet Google dan service account sendiri.

## Alur kontribusi

1. Fork repo ini, lalu buat branch dari `master`, misalnya `fix/countdown-zona-waktu` atau `feat/filter-ucapan`.
2. Buat perubahan sekecil mungkin dan fokus pada satu tujuan.
3. Pastikan pemeriksaan berikut lolos:

   ```bash
   npm run lint
   npm run build
   ```

4. Commit dengan format [Conventional Commits](https://www.conventionalcommits.org/), misalnya:
   - `fix: hitung mundur memakai zona waktu WIB`
   - `feat(admin): filter ucapan berdasarkan kehadiran`
   - `docs: perbarui cara mengisi Google Sheets`
5. Buka pull request ke `master` berisi ringkasan perubahan, alasannya, dan tangkapan layar untuk perubahan tampilan di HP dan desktop.

## Gaya kode

- TypeScript di seluruh proyek, tanpa `any` kecuali benar-benar perlu.
- Kode tanpa komentar; nama variabel dan fungsi harus menjelaskan dirinya sendiri.
- Styling memakai Tailwind CSS dan token warna di `src/app/globals.css`, bukan warna baru yang ditulis langsung.
- Teks antarmuka dalam bahasa Indonesia yang jelas dan sopan.
- Jangan mengubah data undangan di `src/lib/weddingData.ts` dalam pull request, kecuali untuk perbaikan tipe atau struktur.

## Lisensi

Dengan berkontribusi, Anda setuju kontribusi kode Anda dirilis di bawah [MIT License](LICENSE). Foto, nama, dan data pribadi di undangan ini tidak termasuk dalam lisensi tersebut.
