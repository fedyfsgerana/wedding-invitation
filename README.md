# Wedding Invitation

Undangan pernikahan digital. Mendukung personalisasi nama tamu lewat URL, musik latar, hitung mundur, galeri foto, RSVP, dan amplop digital.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- react-confetti
- lucide-react

## Fitur

- Cover personal via parameter `?to=NamaTamu`
- Musik latar dengan kontrol play/pause
- Hitung mundur menuju hari pernikahan
- Profil mempelai & orang tua
- Detail acara akad & resepsi (peta, link Maps/Waze, tambah ke kalender)
- Timeline kisah cinta
- Galeri foto
- Agenda acara
- Form RSVP
- Amplop digital (transfer bank & QRIS)
- Dark / light mode
- Animasi kelopak bunga jatuh & scroll progress bar

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

## Getting Started

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk link personal tamu: `http://localhost:3000/?to=Budi`

## Konfigurasi Data

Semua data undangan (nama mempelai, orang tua, lokasi, tanggal, kisah cinta, galeri, rekening, dll) diatur di `src/lib/weddingData.ts`. Tipe data ada di `src/types/index.ts`.

## Build Production

```bash
npm run build
npm run start
```

## Deploy

Bisa langsung di-deploy ke [Vercel](https://vercel.com/new) atau platform hosting Next.js lainnya.

## Lisensi

Proyek pribadi (personal wedding invitation), tidak dipublikasikan sebagai open source.

© 2026 Wedding Invitation. All rights reserved.
