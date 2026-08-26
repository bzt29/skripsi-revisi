# Portal Verifikasi & Portofolio Revisi Skripsi

Aplikasi web satu halaman (*Single Page Application*) modern berbasis **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS** untuk menampilkan portofolio dan lembar verifikasi hasil revisi skripsi mahasiswa secara online.

---

## 🌟 Fitur Utama

1. **Hero & Profil Mahasiswa**:
   - Menampilkan Identitas Mahasiswa (Nama, NIM, Program Studi, Fakultas, Universitas).
   - Judul Skripsi lengkap dengan tipografi profesional.
   - Status verifikasi (ACC Final) dan persentase penyelesaian revisi.
   - Metadata tanggal sidang dan tanggal selesai revisi.

2. **Dukungan Mode Gelap (Dark Mode) & Terang (Light Mode)**:
   - Tombol toggle tema di navigasi atas (*Navbar*) dengan transisi halus dan ikon dinamis (Sun / Moon).
   - Menyimpan preferensi tema secara otomatis di `localStorage` dan menyesuaikan dengan preferensi sistem operasi pengguna (*prefers-color-scheme*).
   - Anti-FOUC (Flash of Unstyled Content) saat pertama kali memuat halaman.

3. **Matriks Catatan & Bukti Revisi Penguji**:
   - Tab navigasi untuk beralih antara **Penguji 1 (Ketua Penguji)** dan **Penguji 2 (Anggota Penguji)**.
   - Catatan umum persetujuan dari masing-masing dosen penguji.
   - Tabel detail poin revisi (Desktop) dan Kartu responsif (Mobile).
   - Menampilkan nomor, catatan dosen, tindakan perbaikan, rujukan halaman, dan status.
   - **Modal / Lightbox Interaktif**: Klik thumbnail bukti untuk memperbesar gambar tangkapan layar perbaikan secara mendalam.

3. **Viewer PDF Skripsi Tersemat (Embedded)**:
   - Penampil PDF terintegrasi di dalam halaman web tanpa harus mengunduh terlebih dahulu.
   - Fitur toolbar lengkap: Mode Layar Penuh (Fullscreen), Refresh Dokumen, dan Buka di Tab Baru.
   - Tombol utama **Download PDF Skripsi Final**.

4. **Arsitektur Tanpa Database (Static Data)**:
   - Seluruh konten dikelola terpusat pada file `src/data/revisi.ts`. Sangat mudah disesuaikan dan di-deploy ke Vercel / Netlify / GitHub Pages.

---

## 📁 Struktur Direktori

```text
skripsi-revisi/
├── public/
│   ├── documents/
│   │   └── skripsi-final.pdf                # File PDF Skripsi Final
│   └── images/
│       └── bukti/                           # File gambar/screenshot bukti revisi
│           ├── p1-revisi-01.svg
│           ├── p1-revisi-02.svg
│           ├── p2-revisi-01.svg
│           └── p2-revisi-02.svg
├── src/
│   ├── app/
│   │   ├── globals.css                      # Styling Tailwind & Glassmorphism
│   │   ├── layout.tsx                       # Root Layout & Metadata SEO
│   │   └── page.tsx                         # Halaman Utama (SPA)
│   ├── components/
│   │   ├── hero/                            # Komponen HeroSection
│   │   ├── revisi/                          # Komponen Tabs, Tabel, Kartu, & Lightbox Bukti
│   │   ├── pdf/                             # Komponen PDF Viewer & Toolbar
│   │   ├── layout/                          # Navbar, Footer, Floating Action
│   │   └── ui/                              # Primitif UI (Button, Badge, Card, Modal, Tabs)
│   ├── data/
│   │   └── revisi.ts                        # DATA STATIS (Edit di sini)
│   ├── types/
│   │   └── revisi.ts                        # Definisi Tipe Data TypeScript
│   └── lib/
│       └── utils.ts                         # Helper functions
└── package.json
```

---

## 🚀 Cara Menjalankan Project

### 1. Menjalankan Server Development
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### 2. Build untuk Production
```bash
npm run build
npm run start
```

---

## ✏️ Panduan Memperbarui Data

1. **Mengubah Data Mahasiswa & Poin Revisi**:
   - Buka file [src/data/revisi.ts](file:///home/bezethade/Documents/project/skripsi-revisi/src/data/revisi.ts).
   - Edit nama mahasiswa, NIM, judul skripsi, nama dosen penguji, dan butir-butir revisi.

2. **Mengganti File PDF Skripsi**:
   - Ganti file naskah Anda di: `public/documents/skripsi-final.pdf`.

3. **Menambahkan / Mengganti Gambar Bukti**:
   - Letakkan gambar baru di folder: `public/images/bukti/`.
   - Perbarui path `gambarUrl` pada `src/data/revisi.ts` (misal: `"/images/bukti/nama-gambar-anda.png"`).
