# Fedy & Suci Wedding Invitation

Undangan pernikahan digital berbasis web untuk Fedy & Suci. Dibangun dengan Next.js, mendukung personalisasi nama tamu lewat URL, musik latar, hitung mundur acara, galeri foto, RSVP, dan amplop digital (transfer bank/QRIS).

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion - animasi
- react-confetti - efek confetti
- lucide-react - ikon

## Fitur

- Cover undangan dengan nama tamu personal (?to=NamaTamu di URL)
- Musik latar dengan kontrol play/pause
- Hitung mundur menuju hari pernikahan
- Profil mempelai & orang tua
- Detail acara akad & resepsi (peta, link Maps/Waze, tambah ke kalender)
- Timeline kisah cinta (love story)
- Galeri foto
- Agenda acara
- Form RSVP (konfirmasi kehadiran & ucapan)
- Amplop digital (transfer bank & QRIS)
- Dark/light mode
- Animasi kelopak bunga jatuh & scroll progress bar

## Struktur Folder

src/
app/ Routing utama (App Router): layout.tsx, page.tsx, globals.css
components/
layout/ Navbar, BackToTop, FloatingPetals
providers/ AudioProvider, ThemeProvider
sections/ Semua section undangan (Cover, BrideGroom, dst)
ui/ Komponen reusable (Button, LoadingScreen, dll)
hooks/ useCountdown, useGuestParam, useScrollProgress
lib/ weddingData.ts, calendarHelper.ts, utils.ts
types/ Definisi TypeScript

## Getting Started

Install dependencies:
npm install

Jalankan development server:
npm run dev

Buka http://localhost:3000 di browser.

Untuk mencoba link personal tamu:
http://localhost:3000/?to=Budi

## Konfigurasi Data

Semua data undangan (nama mempelai, orang tua, lokasi, tanggal, kisah cinta, galeri, rekening, dll) diatur di satu file:
src/lib/weddingData.ts

Ubah nilai-nilai di sana sesuai kebutuhan. Tipe data didefinisikan di src/types/index.ts.

## Build untuk Production

npm run build
npm run start

## Deploy

Proyek ini bisa langsung di-deploy ke Vercel (https://vercel.com/new) atau platform hosting Next.js lainnya.
