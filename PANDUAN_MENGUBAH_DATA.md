# Panduan Lengkap Cara Mengubah Data Revisi Skripsi

Panduan ini menjelaskan langkah demi langkah cara mengubah seluruh data pada website (Data Mahasiswa, Dosen Penguji, NIDN, Status Reviewer, Poin Revisi, Video Demo Aplikasi, Bukti Gambar, dan File PDF).

---

## 📍 1. Lokasi File Data & Asset

Seluruh data pada website ini bersifat **statis dan terpusat** tanpa perlu database. Berikut lokasi file yang perlu Anda ubah:

| Data yang Ingin Diubah | Lokasi File |
| :--- | :--- |
| **Teks Mahasiswa, Penguji, NIDN, & Butir Revisi** | [`src/data/revisi.ts`](file:///home/bezethade/Documents/project/skripsi-revisi/src/data/revisi.ts) |
| **File Video Demo Aplikasi (`video.mp4`)** | [`public/videos/video.mp4`](file:///home/bezethade/Documents/project/skripsi-revisi/public/videos/video.mp4) |
| **File PDF Dokumen Skripsi** | [`public/documents/skripsi-final.pdf`](file:///home/bezethade/Documents/project/skripsi-revisi/public/documents/skripsi-final.pdf) |
| **Foto / Screenshot Bukti Perbaikan** | Folder [`public/images/bukti/`](file:///home/bezethade/Documents/project/skripsi-revisi/public/images/bukti/) |

---

## 📝 2. Mengubah Data Teks di `src/data/revisi.ts`

Buka file [src/data/revisi.ts](file:///home/bezethade/Documents/project/skripsi-revisi/src/data/revisi.ts) di code editor Anda.

### A. Mengubah Data Mahasiswa & Judul Skripsi
```typescript
mahasiswa: {
  nama: "Muhammad Rezha Hazimi",
  nim: "2020510123",
  programStudi: "Teknik Informatika",
  fakultas: "Fakultas Ilmu Komputer",
  universitas: "Universitas Komputer Indonesia",
  judulSkripsi: "Rancang Bangun Sistem Klasifikasi Citra Medis Menggunakan Deep Learning dengan Arsitektur Convolutional Neural Network Berbasis Web",
  tanggalSidang: "15 Agustus 2024",
  tanggalRevisiSelesai: "25 Agustus 2024",
  statusRevisi: "Selesai",
  avatarUrl: "/images/avatar-mahasiswa.png",
},
```

---

### B. Mengubah Data Dosen Penguji (Penguji 1 & 2) beserta NIDN

```typescript
{
  id: "penguji-1",
  peran: "Penguji 1",
  namaLengkap: "Dede Rizal Nursamsi, S.T., M.KOM",
  nidn: "0417039201",                                      // NIDN Penguji 1
  statusVerifikasi: "Disetujui",
  catatanUmum: "Seluruh 6 butir poin revisi telah diperbaiki dengan sangat baik.",
  daftarRevisi: [
    // 6 butir revisi Penguji 1 diletakkan di sini
  ]
},
{
  id: "penguji-2",
  peran: "Penguji 2",
  namaLengkap: "Rafi Hafizhni Anggia, S.kom., M.Ds",
  nidn: "085077467513029",                                 // NIDN Penguji 2
  statusVerifikasi: "Disetujui",
  catatanUmum: "Seluruh 8 butir poin revisi telah diperbaiki dan disetujui.",
  daftarRevisi: [
    // 8 butir revisi Penguji 2 diletakkan di sini
  ]
}
```

---

### C. Format Poin Revisi & Catatan Reviewer Per Butir

Setiap butir revisi kini dilengkapi opsi **Reviewer Feedback**:
```typescript
{
  id: "p1-01",
  nomor: 1,
  catatanRevisi: "Tambahkan penjelasan detail mengenai Confusion Matrix pada Bab 4.",
  tindakanPerbaikan: "Telah menambahkan sub-bab 4.3.2 beserta tabel evaluasi multi-fold.",
  halamanTerkait: "Halaman 68 - 72",
  status: "Disetujui Penguji",
  bukti: {
    tipe: "both",
    deskripsi: "Tabel 4.5 Evaluasi Confusion Matrix telah dimasukkan di halaman 70.",
    halaman: "Hal. 70",
    gambarUrl: "/images/bukti/p1-revisi-01.svg",
    gambarCaption: "Tangkapan layar Tabel 4.5 Evaluasi Confusion Matrix",
  },
  reviewer: {
    diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
    statusReview: "ACC",
    catatanReviewer: "Perhitungan confusion matrix sudah tepat dan lengkap.",
    tanggalVerifikasi: "24 Agustus 2024",
  },
},
```

---

## 🎬 3. Cara Mengganti Video Demo Aplikasi (`video.mp4`)

1. Rekam video demonstrasi aplikasi Anda (misal screen recording dari OBS atau perekam layar).
2. Simpan video dengan nama: `video.mp4`.
3. Letakkan file video tersebut di folder:
   ```text
   public/videos/video.mp4
   ```
4. Anda dapat menyesuaikan judul, deskripsi, dan poin fitur video pada bagian `videoDemo:` di [src/data/revisi.ts](file:///home/bezethade/Documents/project/skripsi-revisi/src/data/revisi.ts):
   ```typescript
   videoDemo: {
     url: "/videos/video.mp4",
     judul: "Video Demonstrasi Sistem Klasifikasi Citra Medis CNN",
     deskripsi: "Video demonstrasi alur penggunaan sistem dari login hingga prediksi...",
     durasi: "03:45 Menit",
     resolusi: "1080p Full HD",
     fiturUtama: [
       "Autentikasi & Manajemen Sesi Tenaga Medis",
       "Upload Multi-Format Citra (DICOM, PNG, JPG)",
       "Inferensi Cepat Model CNN (< 1.2 Detik)",
       "Visualisasi Probabilitas Diagnosa & Heatmap",
     ],
   }
   ```

---

## 📄 4. Cara Mengganti File PDF Skripsi

1. Siapkan file PDF skripsi versi final revisi Anda.
2. Beri nama file: `skripsi-final.pdf`.
3. Salin/Timpa file tersebut ke dalam folder:
   ```text
   public/documents/skripsi-final.pdf
   ```

---

## 🖼️ 5. Cara Menambah / Mengganti Gambar Bukti Revisi

1. Masukkan gambar tangkapan layar perbaikan ke:
   ```text
   public/images/bukti/
   ```
2. Hubungkan nama gambarnya pada baris `gambarUrl:` di [`src/data/revisi.ts`](file:///home/bezethade/Documents/project/skripsi-revisi/src/data/revisi.ts).
