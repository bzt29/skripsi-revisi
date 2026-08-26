# Roadmap Implementasi Web Verifikasi Revisi Skripsi (task.md)

Dokumen ini memuat daftar tugas terstruktur (*task list*) untuk membangun aplikasi web satu halaman (SPA) verifikasi revisi skripsi dari nol (**from scratch**) hingga siap pakai dengan antarmuka modern, profesional, dan responsif.

---

## 📋 Status Tahapan Pengerjaan

```
[x] Tahap 1: Inisialisasi & Konfigurasi Proyek Next.js (SELESAI)
[x] Tahap 2: Pembuatan Tipe Data (Types) & Data Statis (Static Data) (SELESAI)
[x] Tahap 3: Penyiapan Folder Aset & Dummy Sample Files (SELESAI)
[x] Tahap 4: Sistem Desain, Tema & Komponen Dasar (UI Primitives) (SELESAI)
[x] Tahap 5: Pengembangan Komponen Utama (Sections) (SELESAI)
    [x] 5.1 Header & Hero Section
    [x] 5.2 Section Revisi Penguji (Tabel, Kartu, & Modal Bukti)
    [x] 5.3 Section Viewer PDF Skripsi (Embedded & Download)
    [x] 5.4 Navbar, Floating Action Bar, & Footer
[x] Tahap 6: Polishing UI/UX, Micro-Interactions & Responsivitas Mobile (SELESAI)
[x] Tahap 7: Pengujian, Optimasi Build & Verifikasi Akhir (SELESAI)
```

---

## 🚀 Rincian Tugas yang Telah Diselesaikan

### Tahap 1: Inisialisasi & Konfigurasi Proyek Next.js
- [x] **1.1 Setup Project**:
  - Konfigurasi `package.json` berbasis Next.js 14, React 18, TypeScript, dan Tailwind CSS.
- [x] **1.2 Install Dependencies**:
  - `lucide-react`, `clsx`, `tailwind-merge`, `canvas-confetti`.
- [x] **1.3 Konfigurasi `src/lib/utils.ts`**:
  - Helper `cn()` dan `formatDate()`.

---

### Tahap 2: Pembuatan Tipe Data & Data Statis
- [x] **2.1 `src/types/revisi.ts`**:
  - Schema interface `Mahasiswa`, `DosenPenguji`, `PoinRevisi`, `BuktiRevisi`, dan `DokumenPdf`.
- [x] **2.2 `src/data/revisi.ts`**:
  - Data statis lengkap mencakup Penguji 1 (Ketua Penguji) dan Penguji 2 (Anggota Penguji) beserta catatan revisi, tindakan, rujukan halaman, dan bukti perbaikan.

---

### Tahap 3: Penyiapan Aset & Sample Media
- [x] **3.1 Struktur Direktori Aset**:
  - `public/documents/` dan `public/images/bukti/`.
- [x] **3.2 Sample Assets**:
  - File PDF sample: `public/documents/skripsi-final.pdf`.
  - Gambar bukti resolusi tinggi: `p1-revisi-01.svg`, `p1-revisi-02.svg`, `p2-revisi-01.svg`, `p2-revisi-02.svg`.

---

### Tahap 4: Sistem Desain & Komponen UI Primitives
- [x] **4.1 Konfigurasi `globals.css` & Tailwind**:
  - Palet warna Indigo/Slate/Emerald akademis modern, glassmorphism, dan custom scrollbar.
- [x] **4.2 Komponen Dasar (`src/components/ui/`)**:
  - `badge.tsx`: Variasi badge status.
  - `button.tsx`: Tombol dengan efek hover/active dan varian tema.
  - `card.tsx`: Kontainer kartu modular.
  - `dialog.tsx`: Modal / Lightbox preview.
  - `tabs.tsx`: Tab context interaktif.

---

### Tahap 5: Pengembangan Komponen Utama
- [x] **5.1 Navbar & Hero Section**:
  - [Navbar.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/layout/Navbar.tsx): Navigasi sticky, badge ACC, tombol download cepat.
  - [HeroSection.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/hero/HeroSection.tsx): Kartu profil mahasiswa, judul skripsi, tanggal sidang, progress persentase revisi.
- [x] **5.2 Section Revisi Penguji**:
  - [ExaminerTabs.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/revisi/ExaminerTabs.tsx): Tab switcher Dosen Penguji 1 & 2 dengan catatan persetujuan.
  - [RevisionTable.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/revisi/RevisionTable.tsx): Tabel desktop detail dengan thumbnail klik-perbesar.
  - [RevisionCard.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/revisi/RevisionCard.tsx): Kartu responsif untuk mobile/tablet.
  - [ImageModal.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/revisi/ImageModal.tsx): Lightbox perbesaran bukti gambar.
- [x] **5.3 Section Viewer PDF Skripsi**:
  - [PdfViewer.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/pdf/PdfViewer.tsx): Embedded PDF iframe dengan fitur layar penuh & refresh.
  - [PdfViewerSection.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/pdf/PdfViewerSection.tsx): Toolbar naskah dan tombol download PDF skripsi.
- [x] **5.4 Layout & Pelengkap**:
  - [Footer.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/layout/Footer.tsx): Footer dan hak cipta.
  - [FloatingNav.tsx](file:///home/bezethade/Documents/project/skripsi-revisi/src/components/layout/FloatingNav.tsx): Tombol scroll-to-top cepat.

---

### Tahap 6 & 7: Build Testing & QA
- [x] Verifikasi static build Next.js (`npm run build`) berjalan sukses 100% tanpa error.
- [x] SEO Viewport dan metadata terkonfigurasi optimal.
