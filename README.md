<div align="center">

# Wedding Invitation

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" height="40" alt="Next.js, React, TypeScript, Tailwind CSS"/>

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-blue?style=for-the-badge)

[Tentang](#tentang) &nbsp;·&nbsp;
[Tech Stack](#tech-stack) &nbsp;·&nbsp;
[Fitur](#fitur) &nbsp;·&nbsp;
[Struktur](#struktur-folder) &nbsp;·&nbsp;
[Instalasi](#instalasi) &nbsp;·&nbsp;
[Konfigurasi](#konfigurasi-data) &nbsp;·&nbsp;
[Build](#build-production) &nbsp;·&nbsp;
[Deploy](#deploy) &nbsp;·&nbsp;
[Pengembang](#pengembang) &nbsp;·&nbsp;
[Lisensi](#lisensi)

</div>

## Tentang

Undangan pernikahan digital. Mendukung personalisasi nama tamu lewat URL, musik latar, hitung mundur, galeri foto, RSVP, dan amplop digital.

## Tech Stack

<table style="width:100%; border-collapse:collapse;">
<colgroup><col style="width:25%"><col style="width:75%"></colgroup>
<thead>
<tr><th align="left">Teknologi</th><th align="left">Catatan</th></tr>
</thead>
<tbody>
<tr><td>Next.js (App Router)</td><td>Framework React dengan routing berbasis App Router</td></tr>
<tr><td>React + TypeScript</td><td>Library UI dengan tambahan type safety</td></tr>
<tr><td>Tailwind CSS</td><td>Utility-first CSS framework untuk styling</td></tr>
<tr><td>Framer Motion</td><td>Library animasi & transisi antar elemen</td></tr>
<tr><td>react-confetti</td><td>Efek confetti / kelopak bunga jatuh</td></tr>
<tr><td>lucide-react</td><td>Kumpulan ikon SVG</td></tr>
</tbody>
</table>

## Fitur

<table style="width:100%; border-collapse:collapse;">
<colgroup><col style="width:25%"><col style="width:75%"></colgroup>
<thead>
<tr><th align="left">Fitur</th><th align="left">Deskripsi</th></tr>
</thead>
<tbody>
<tr><td>Cover personal</td><td>Sapaan personal untuk tamu lewat parameter URL <code>?to=NamaTamu</code></td></tr>
<tr><td>Musik latar</td><td>Musik latar belakang dengan kontrol play/pause</td></tr>
<tr><td>Hitung mundur</td><td>Countdown menuju hari pernikahan</td></tr>
<tr><td>Profil mempelai</td><td>Menampilkan profil mempelai beserta orang tua</td></tr>
<tr><td>Detail acara</td><td>Informasi akad & resepsi lengkap dengan peta, link Maps/Waze, dan tombol tambah ke kalender</td></tr>
<tr><td>Galeri foto</td><td>Kumpulan foto pasangan</td></tr>
<tr><td>Agenda acara</td><td>Rangkaian acara pernikahan</td></tr>
<tr><td>Form RSVP</td><td>Konfirmasi kehadiran tamu</td></tr>
<tr><td>Amplop digital</td><td>Pengiriman hadiah via transfer bank & QRIS</td></tr>
<tr><td>Dark / Light mode</td><td>Tema tampilan otomatis maupun manual</td></tr>
<tr><td>Animasi & scroll progress</td><td>Efek kelopak bunga jatuh dan indikator progress scroll halaman</td></tr>
</tbody>
</table>

## Struktur Folder

```
src/
├── app/          # Routing (layout.tsx, page.tsx, globals.css)
├── components/
│   ├── layout/     # Navbar, BackToTop, FloatingPetals
│   ├── providers/  # AudioProvider, ThemeProvider
│   ├── sections/   # Semua section undangan (Cover, BrideGroom, dst)
│   └── ui/         # Komponen reusable (Button, LoadingScreen, dll)
├── hooks/        # useCountdown, useGuestParam, useScrollProgress
├── lib/          # weddingData.ts, calendarHelper.ts, utils.ts
└── types/        # Definisi TypeScript
```

## Instalasi

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk link personal tamu: `http://localhost:3000/?to=Budi`

## Konfigurasi Data

<table style="width:100%; border-collapse:collapse;">
<colgroup><col style="width:25%"><col style="width:75%"></colgroup>
<thead>
<tr><th align="left">Kebutuhan</th><th align="left">Lokasi Perubahan</th></tr>
</thead>
<tbody>
<tr><td>Ganti data undangan (nama mempelai, orang tua, lokasi, tanggal, kisah cinta, galeri, rekening, dll)</td><td>Edit <code>src/lib/weddingData.ts</code></td></tr>
<tr><td>Ganti definisi tipe data</td><td>Edit <code>src/types/index.ts</code></td></tr>
</tbody>
</table>

## Build Production

```bash
npm run build
npm run start
```

## Deploy

Bisa langsung di-deploy ke [Vercel](https://vercel.com/new) atau platform hosting Next.js lainnya.

## Pengembang

<table style="width:100%; border-collapse:collapse;">
<colgroup><col style="width:25%"><col style="width:75%"></colgroup>
<thead>
<tr><th align="left">Nama</th><th align="left">Peran</th></tr>
</thead>
<tbody>
<tr><td>Fedy Fs. Gerana</td><td>Web Developer</td></tr>
</tbody>
</table>

## Lisensi

Proyek pribadi (_personal wedding invitation_), tidak dipublikasikan sebagai open source.

<div align="center">
<sub>© 2026 Wedding Invitation. All rights reserved.</sub>
</div>
