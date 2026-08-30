# Struktur Folder & Arsitektur Proyek: Web Verifikasi Revisi Skripsi

Dokumen ini menjelaskan struktur folder dan arsitektur aplikasi Single Page Application (SPA) berbasis **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS** sesuai dengan spesifikasi pada [prompt.md](file:///home/bezethade/Documents/project/skripsi-revisi/prompt.md).

---

## 1. Visualisasi Diagram Struktur Folder

```text
skripsi-revisi/
├── public/
│   ├── documents/
│   │   └── skripsi-final.pdf                # File PDF Skripsi versi revisi final
│   ├── images/
│   │   ├── bukti/
│   │   │   ├── p1-revisi-01.png             # Screenshot/bukti revisi Penguji 1
│   │   │   ├── p1-revisi-02.png
│   │   │   ├── p2-revisi-01.png             # Screenshot/bukti revisi Penguji 2
│   │   │   └── p2-revisi-02.png
│   │   └── avatar-placeholder.png           # (Opsional) Foto profil / avatar dosen
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css                      # Konfigurasi Tailwind CSS & custom utility
│   │   ├── layout.tsx                       # Root Layout & Metadata SEO (Server Component)
│   │   └── page.tsx                         # Main Page / Single Page Application (Server Component)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                   # Navigasi atas + status badge + shortcut
│   │   │   └── Footer.tsx                   # Info hak cipta & informasi kontak mahasiswa
│   │   ├── hero/
│   │   │   └── HeroSection.tsx              # Info Mahasiswa (Nama, NIM, Judul, Tanggal, Status)
│   │   ├── revisi/
│   │   │   ├── RevisionSection.tsx          # Wrapper section revisi
│   │   │   ├── ExaminerTabs.tsx             # Tab switcher (Penguji 1 vs Penguji 2) (Client Component)
│   │   │   ├── RevisionTable.tsx            # Tabel detail poin revisi & status
│   │   │   ├── RevisionCard.tsx             # Tampilan alternatif / mobile card view
│   │   │   └── ImageModal.tsx               # Modal / Lightbox untuk memperbesar gambar bukti (Client Component)
│   │   ├── pdf/
│   │   │   ├── PdfViewerSection.tsx         # Section container untuk viewer PDF
│   │   │   └── PdfViewer.tsx                # Komponen iframe / react-pdf viewer + tombol download (Client Component)
│   │   └── ui/                              # Primitif komponen UI (Shadcn / Custom Tailwind)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── tabs.tsx
│   │
│   ├── data/
│   │   └── revisi.ts                        # Hardcoded / static data revisi skripsi
│   │
│   ├── types/
│   │   └── revisi.ts                        # Definisi TypeScript Interface & Types
│   │
│   └── lib/
│       └── utils.ts                         # Utility functions (clsx, tailwind-merge)
│
├── .gitignore
├── next.config.ts                           # Konfigurasi Next.js
├── package.json                             # Dependencies & Scripts
├── postcss.config.mjs
├── tailwind.config.ts                       # Konfigurasi Tailwind CSS
├── tsconfig.json                            # Konfigurasi TypeScript
├── prompt.md                                # Spesifikasi & instruksi awal
└── FOLDER_STRUCTURE.md                      # Dokumentasi struktur proyek ini
```

---

## 2. Rincian & Deskripsi Setiap Folder

### `public/` (Static Assets)
Folder untuk aset statis yang dapat diakses langsung oleh browser melalui root URL (`/`):
- `public/documents/`: Menyimpan file dokumen skripsi (contoh: `skripsi-final.pdf`).
- `public/images/bukti/`: Menyimpan gambar tangkapan layar bukti perbaikan per poin revisi (contoh: hasil pengujian baru, cuplikan kode, perubahan diagram, dll.).

---

### `src/app/` (Next.js App Router)
- **`layout.tsx`** (*Server Component*): Root layout aplikasi yang menyematkan metadata SEO (Title, Description, Open Graph) serta mengimpor `globals.css`.
- **`page.tsx`** (*Server Component*): Halaman utama satu halaman (SPA) yang merender `HeroSection`, `RevisionSection`, dan `PdfViewerSection`.
- **`globals.css`**: Berisi directive `@tailwind` dan variabel warna/tema.

---

### `src/components/` (Komponen Antarmuka)
Dikelompokkan secara modular berdasarkan fungsinya:
1. **`hero/`**:
   - `HeroSection.tsx`: Menampilkan identitas mahasiswa, judul skripsi, tanggal sidang/revisi, dan status verifikasi lengkap dengan badge indikator.
2. **`revisi/`**:
   - `ExaminerTabs.tsx`: Tab navigasi interaktif untuk beralih antara Penguji 1 dan Penguji 2.
   - `RevisionTable.tsx`: Menampilkan tabel poin revisi, catatan dosen, tindakan perbaikan, dan bukti (teks/gambar).
   - `ImageModal.tsx`: Modal pop-up interaktif untuk melihat gambar bukti revisi dalam ukuran penuh ketika diklik.
3. **`pdf/`**:
   - `PdfViewerSection.tsx` & `PdfViewer.tsx`: Container viewer PDF responsif dengan fitur zoom/scroll in-page serta tombol cadangan "Download PDF".
4. **`ui/`**:
   - Komponen UI dasar yang dapat digunakan ulang (Button, Badge, Card, Modal Dialog, Tabs).

---

### `src/data/` (Static Data Layer)
- **`revisi.ts`**: Sumber data tunggal (*single source of truth*) yang berisi seluruh informasi tanpa memerlukan koneksi database. Mudah diedit atau diperbarui kapan saja.

---

### `src/types/` (TypeScript Contracts)
- **`revisi.ts`**: Kontrak tipe data untuk memastikan integritas data mahasiswa, dosen penguji, poin revisi, serta bukti perbaikan.

---

## 3. Klasifikasi Client vs Server Components

| Komponen | Tipe | Alasan / Fitur |
| :--- | :--- | :--- |
| `app/layout.tsx` | **Server Component** | Mengatur metadata halaman & HTML dasar secara efisien. |
| `app/page.tsx` | **Server Component** | Merender susunan halaman secara SSR/SSG untuk performa cepat. |
| `HeroSection.tsx` | **Server Component** | Menampilkan data statis mahasiswa tanpa state interaktif. |
| `ExaminerTabs.tsx` | **Client Component (`"use client"`)** | Mengelola state aktif tab penguji (Penguji 1 / Penguji 2). |
| `ImageModal.tsx` | **Client Component (`"use client"`)** | Mengelola interaksi klik, perbesaran gambar (lightbox), dan close modal. |
| `PdfViewer.tsx` | **Client Component (`"use client"`)** | Mengontrol status load dokumen PDF, zoom level, dan interaksi viewer. |

---

## 4. Panduan Penempatan Asset

1. **File PDF Skripsi**:
   - Letakkan di: `public/documents/skripsi-final.pdf`
   - Akses di kode: `"/documents/skripsi-final.pdf"`
2. **Foto / Gambar Bukti Revisi**:
   - Letakkan di: `public/images/bukti/<nama-file>.png`
   - Akses di kode: `"/images/bukti/<nama-file>.png"`

