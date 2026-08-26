Role: Senior Fullstack Web Developer

Tugas:
Buatlah aplikasi web satu halaman (Single Page Application) menggunakan Next.js (App Router, React, Tailwind CSS, dan TypeScript) untuk menampilkan portofolio / halaman verifikasi revisi skripsi secara online tanpa menggunakan database (hardcoded / static JSON-based).

Requirement Details:

1. Static Data Architecture (Tanpa Database):
- Buat file data khusus (misalnya: `data/revisi.ts`) untuk menampung seluruh informasi revisi agar mudah diperbarui.
- Data struktur minimal mencakup:
  - Informasi Mahasiswa (Nama, NIM, Judul Skripsi, Tanggal Revisi).
  - Data Penguji 1 & Penguji 2 (Nama lengkap beserta gelar, daftar poin revisi).
  - Setiap poin revisi memiliki: Poin Revisi (Text), Catatan/Penjelasan (Text), dan Bukti Revisi (bisa berupa Teks atau URL/Path Foto).

2. Antarmuka / UI Layout:
- Header / Hero Section: Menampilkan informasi judul skripsi, nama mahasiswa, NIM, dan status revisi.
- Tabel / Kartu Revisi Penguji:
  - Kolom / Bagian terpisah untuk Penguji 1 dan Penguji 2.
  - Tabel berisi kolom: No, Catatan Revisi, Tindakan / Bukti Perbaikan (Text atau Gambar yang dapat diklik/enlarge).
  - Desain yang rapi, bersih, dan profesional (menggunakan Tailwind CSS & Shadcn UI jika relevan).
- Viewer PDF Skripsi (Embedded PDF):
  - Bagian khusus untuk menampilkan file PDF Skripsi penuh yang sudah diperbarui.
  - Gunakan `<iframe>` HTML5 standar atau library React PDF (seperti `react-pdf` / `@react-pdf-viewer`) yang responsive dan memungkinkan dosen/penguji membaca dokumen PDF langsung di dalam website tanpa harus mengunduhnya terlebih dahulu.
  - Sediakan juga tombol cadangan "Download PDF Skripsi".

3. Kriteria Kode & Best Practices:
- Tuliskan struktur komponen Next.js (Client vs Server Components) dengan efisien.
- Pastikan tampilan fully responsive di perangkat mobile maupun desktop.
- Berikan instruksi langkah demi langkah penempatan file (folder structure) dan cara menaruh asset (file PDF & foto bukti revisi di folder `/public`).

Tolong berikan kode lengkap beserta struktur proyeknya secara rinci.