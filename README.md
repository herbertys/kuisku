# KuisKu — starter website

Website kuis edukasi sederhana berbahasa Indonesia. Kuis Jepang disimpan terpisah di folder `N3` dengan nama kuis harian `H1`, `H2`, dan seterusnya. Tidak memerlukan akun, build tools, database, atau backend untuk dijalankan.

## Menjalankan di komputer

1. Buka folder ini.
2. Klik dua kali `index.html`, atau buka file tersebut dengan browser.
3. Pilih topik dan jawab pertanyaan. Kuis Jepang juga bisa dibuka langsung melalui `N3/H1.html` atau `N3/H2.html`.

## Cara mengubah pertanyaan

Buka `N3/H1.js` atau `N3/H2.js`; daftar kosakata ditulis dengan urutan kanji, hiragana, lalu arti bahasa Indonesia.

## MVP yang sudah ada

- Halaman depan responsif yang mengarah ke kumpulan kuis Jepang.
- Kuis Jepang harian di folder `N3`; H1 berisi 19 soal dan H2 berisi 29 soal.
- Progres, umpan balik benar/salah, dan penjelasan jawaban.
- Skor akhir dan tombol main ulang.
- Tidak meminta data pribadi pengunjung.

## Roadmap praktis

1. **Mulai lokal:** ganti soal dengan materi yang kamu kuasai dan minta beberapa teman mencoba di ponsel.
2. **Rapikan konten:** siapkan setidaknya 10 soal yang sudah dicek faktanya per topik; buat judul/deskripsi yang jelas dan konsisten.
3. **Terbitkan gratis:** unggah folder ini ke repo GitHub. Hubungkan repo ke Cloudflare Pages, pilih static site/no framework, dan biarkan build command kosong serta output directory `/`. Alternatifnya, aktifkan GitHub Pages di repo publik.
4. **Sebarkan:** kirim tautan ke komunitas yang relevan, lalu rilis kuis baru berkala dan minta masukan.
5. **Ukur pertumbuhan:** setelah ada pengunjung, tambahkan alat analitik yang menghormati privasi dan pantau kuis mana yang paling sering dimainkan.
6. **Fitur lanjutan bila dibutuhkan:** leaderboard global, akun, simpan hasil lintas perangkat, atau panel admin memerlukan backend/database dan perlu direncanakan terpisah.

## Opsi hosting gratis yang dicek (18 Oktober 2026)

- **Cloudflare Pages — rekomendasi untuk situs statis ini.** Paket Free mencantumkan sampai 500 build/deployment per bulan, satu build berjalan pada satu waktu, hingga 20.000 file, dan batas 25 MiB per aset. Permintaan ke aset statis gratis dan tanpa batas; Pages Functions memakai kuota Workers terpisah. Lihat [batas Pages](https://developers.cloudflare.com/pages/platform/limits/) dan [harga Functions/aset statis](https://developers.cloudflare.com/pages/functions/pricing/).
- **GitHub Pages — alternatif yang sederhana.** Tersedia untuk repo publik pada GitHub Free. Situs terbit maksimal 1 GB, bandwidth lunak 100 GB per bulan, dan batas lunak 10 build per jam. Ketentuan menyatakan Pages bukan layanan hosting gratis untuk bisnis online atau SaaS komersial. Lihat [batas GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- **Vercel Hobby — bisa untuk eksperimen personal.** Paket gratis memuat 100 GB transfer data cepat per bulan, tetapi Vercel membatasi Hobby untuk penggunaan pribadi non-komersial. Karena tujuan situs ini membangun audiens dan bisa berkembang menjadi proyek komersial, pilih Cloudflare Pages atau evaluasi ketentuan hosting kembali sebelum monetisasi. Lihat [Hobby plan](https://vercel.com/docs/plans/hobby) dan [panduan penggunaan wajar](https://vercel.com/docs/limits/fair-use-guidelines).

Nama domain khusus biasanya biaya terpisah. Alamat subdomain bawaan penyedia hosting cukup untuk MVP.
