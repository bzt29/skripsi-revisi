import { DataRevisiSkripsi } from "@/types/revisi";

export const dataRevisi: DataRevisiSkripsi = {
  mahasiswa: {
    nama: "Syed M Hafiz FIrdaus",
    nim: "202220201036",
    programStudi: "Sistem Informasi",
    fakultas: "Sains dan Teknologi",
    universitas: "Universitas Cipasung Tasikmalaya",
    judulSkripsi:
      "IMPLEMENTASI ALGORITMA HAVERSINE, MOCK LOCATION DETECTION, DAN FACE RECOGNITION PADA SISTEM INFORMASI PRESENSI DAN PENGGAJIAN DI PT MJU",
    tanggalSidang: "20 Agustus 2026",
    tanggalRevisiSelesai: "27 Agustus 2026",
    statusRevisi: "Menunggu Verifikasi",
    avatarUrl: "/images/avatar-mahasiswa.png",
  },
  penguji: [
    {
      id: "penguji-1",
      peran: "Penguji 1",
      namaLengkap: "Dede Rizal Nursamsi, S.T., M.KOM",
      nidn: "0417039201",
      statusVerifikasi: "Menunggu ACC",
      catatanUmum:
        "Menunggu verifikasi dan peninjauan kembali butir revisi oleh dosen penguji.",
      daftarRevisi: [
        {
          id: "p1-01",
          nomor: 1,
          catatanRevisi:
            "Use case diperbaiki: Perbaiki Use Case Diagram sistem presensi dan penggajian di PT MJU agar memisahkan hak akses dan relasi aktor (Pegawai, Admin Cabang/HRD, dan Admin Pusat) secara tepat sesuai SOP dan standar UML.",
          tindakanPerbaikan:
            "Telah merevisi Gambar Use Case Diagram pada Bab 3 Sub-bab 3.3 dengan mengganti peran aktor Superadmin menjadi Admin Pusat serta memisahkan wewenang 3 level pengguna (Pegawai, Admin Cabang/HRD, dan Admin Pusat) lengkap dengan relasi <<include>> dan <<extend>> pada use case autentikasi & validasi presensi.",
          halamanTerkait: "Halaman 32 - 35",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Gambar 3.3 Use Case Diagram yang telah direvisi dengan pemisahan hak akses 3 aktor (Pegawai, Admin Cabang/HRD, Admin Pusat) dan relasi include/extend presensi.",
            halaman: "Hal. 34",
            gambarUrl: "/images/bukti/usecase.jpeg",
            gambarCaption: "Gambar 3.3 Use Case Diagram Sistem Presensi & Penggajian PT MJU (Revisi)",
          },
          reviewer: {
            diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p1-02",
          nomor: 2,
          catatanRevisi:
            "Superadmin diganti menjadi Admin Pusat: Perjelas peran dan wewenang aktor Superadmin (apakah seluruh fitur dapat diakses penuh atau diubah namanya). Telah diputuskan peran Superadmin diganti menjadi Admin Pusat dengan wewenang terdefinisi khusus (pengelolaan master data kantor/cabang, konfigurasi radius geofencing presensi, audit log, dan approval rekap penggajian).",
          tindakanPerbaikan:
            "Telah mengganti seluruh istilah dan entitas aktor 'Superadmin' menjadi 'Admin Pusat' pada naskah skripsi Bab 3 Sub-bab 3.3.2, serta menyelaraskan matriks hak akses Role-Based Access Control (RBAC) dan diagram alur kelola sistem antara Admin Pusat, Admin Cabang/HRD, dan Pegawai.",
          halamanTerkait: "Halaman 36 - 39",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "-",
            halaman: "Hal. 37",
          },
          reviewer: {
            diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p1-03",
          nomor: 3,
          catatanRevisi:
            "Skenario use case: Tambahkan tabel Skenario Use Case (Use Case Specification/Description) lengkap mencakup aktor, pra-kondisi, alur utama (main flow), alur alternatif (alternate flow), dan pasca-kondisi untuk use case utama sistem.",
          tindakanPerbaikan:
            "Telah menyusun tabel Skenario Use Case secara komprehensif pada Bab 3 Sub-bab 3.3.3 untuk use case presensi wajah & GPS, pengelolaan data pegawai, pengajuan izin/lembur, dan perhitungan rekap gaji.",
          halamanTerkait: "Halaman 40 - 45",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Tabel Skenario Use Case lengkap untuk modul presensi wajah, deteksi lokasi, pengajuan izin, dan perhitungan gaji.",
            halaman: "Hal. 42",
            gambarUrl: "/images/bukti/skenario.jpeg",
            gambarCaption: "Tabel Skenario Use Case Spesifikasi Sistem Presensi dan Penggajian",
          },
          reviewer: {
            diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p1-04",
          nomor: 4,
          catatanRevisi:
            "Activity diagram diperbaiki: Perbaiki Activity Diagram alur presensi masuk/pulang, deteksi fake GPS, dan perhitungan penggajian pegawai agar swimlane interaksi antara Pegawai, Sistem/API, dan Admin Pusat terpetakan secara jelas dan runtut.",
          tindakanPerbaikan:
            "Telah merevisi Activity Diagram alur proses presensi dan kalkulasi penggajian (Gambar 3.5 & 3.6) pada Bab 3 Sub-bab 3.3.4 dengan swimlane aktor Pegawai, Admin Cabang/HRD, Admin Pusat, sistem validasi Haversine, dan modul penggajian.",
          halamanTerkait: "Halaman 46 - 51",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Gambar 3.5 & 3.6 Activity Diagram Alur Penggajian & Validasi Presensi Wajah dan Lokasi telah disempurnakan.",
            halaman: "Hal. 48",
            gambarUrl: "/images/bukti/act-penggajian.jpeg",
            gambarCaption: "Gambar 3.5 & 3.6 Activity Diagram Alur Penggajian & Validasi Presensi",
          },
          reviewer: {
            diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p1-05",
          nomor: 5,
          catatanRevisi:
            "Class diagram ditambahkan: Tambahkan Class Diagram untuk memodelkan struktur kelas entitas, atribut (data types & visibility), method/operasi, dan hubungan relasi asosiasi, agregasi, serta komposisi antarkelas dalam sistem.",
          tindakanPerbaikan:
            "Telah menambahkan Class Diagram sistem pada Bab 3 Sub-bab 3.4 (Gambar 3.8) mencakup kelas User, Pegawai, Presensi, FaceDataset, GeofenceLocation, Gaji, Lembur, dan Potongan.",
          halamanTerkait: "Halaman 52 - 56",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Gambar 3.8 Class Diagram Struktur Kelas, Atribut, Method, dan Relasi Sistem Presensi & Penggajian PT MJU.",
            halaman: "Hal. 54",
            gambarUrl: "/images/bukti/class.jpeg",
            gambarCaption: "Gambar 3.8 Class Diagram Struktur Kelas Sistem Presensi & Penggajian PT MJU",
          },
          reviewer: {
            diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p1-06",
          nomor: 6,
          catatanRevisi:
            "Face recognition 3-5 foto: Tambahkan dokumentasi dan pengujian modul Face Recognition dengan dataset registrasi 3–5 foto sampel wajah per pegawai (variasi sudut wajah, ekspresi, dan pencahayaan terang/redup) untuk optimasi akurasi ekstraksi embedding.",
          tindakanPerbaikan:
            "Telah mengimplementasikan dan mendokumentasikan mekanisme pendaftaran multi-shot 3-5 foto wajah per pengguna (tampak depan, serong kiri, serong kanan, ekspresi senyum, dan low-light) pada Bab 3 Sub-bab 3.5 dan evaluasi akurasi pengenalan wajah 97.96% di Bab 4 Sub-bab 4.4.",
          halamanTerkait: "Halaman 68 - 75",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Dokumentasi pengujian sampling multi-shot 3-5 foto wajah, ekstraksi embedding 128-dimensi, dan matriks akurasi pengenalan wajah.",
            halaman: "Hal. 72",
            gambarUrl: "/images/bukti/facerecog.jpeg",
            gambarCaption: "Dokumentasi Pengujian Multi-Shot 3-5 Foto Registrasi Face Recognition",
          },
          reviewer: {
            diverifikasiOleh: "Dede Rizal Nursamsi, S.T., M.KOM",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
      ],
    },
    {
      id: "penguji-2",
      peran: "Penguji 2",
      namaLengkap: "Rafi Hafizhni Anggia, S.kom., M.Ds",
      nidn: "085077467513029",
      statusVerifikasi: "Menunggu ACC",
      catatanUmum:
        "Menunggu verifikasi dan peninjauan kembali butir revisi oleh dosen penguji.",
      daftarRevisi: [
        {
          id: "p2-01",
          nomor: 1,
          catatanRevisi:
            "Tampilan home diubah tambahkan statistik hilangkan map: Tampilan antarmuka halaman utama (Home) aplikasi mobile diubah dengan menambahkan kartu statistik ringkasan kehadiran (Hadir, Izin/Sakit, Terlambat, Jam Lembur) dan menghilangkan komponen peta (map) agar antarmuka lebih bersih dan cepat dimuat.",
          tindakanPerbaikan:
            "Telah mendesain ulang antarmuka dashboard Home aplikasi mobile pada Bab 3 Sub-bab 3.6 (Gambar 3.12) dengan menghapus widget map dan menyematkan 4 kartu indikator statistik kehadiran presensi bulanan serta status check-in hari ini.",
          halamanTerkait: "Halaman 57 - 60",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Mockup antarmuka baru Dashboard Home mobile dengan kartu ringkasan statistik kehadiran presensi dan penghapusan widget peta.",
            halaman: "Hal. 58",
            gambarUrl: "/images/bukti/homedash.jpeg",
            gambarCaption: "Redesain Antarmuka Home Mobile (Statistik Presensi & Tanpa Map)",
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-02",
          nomor: 2,
          catatanRevisi:
            "Check in dan check out diperbaiki: Perbaiki logika alur tombol Check-In dan Check-Out (pemberian validasi jam kerja shift, penentuan status kehadiran otomatis tepat waktu vs terlambat, dan dialog konfirmasi setelah presensi sukses).",
          tindakanPerbaikan:
            "Telah memperbarui dan menyempurnakan alur kerja validasi presensi Check-In dan Check-Out pada Bab 3 Sub-bab 3.3.4 dan Bab 4 Sub-bab 4.2 lengkap dengan algoritma pengecekan jam shift, geofencing Haversine, face recognition, dan kalkulasi otomatis jam lembur.",
          halamanTerkait: "Halaman 61 - 65",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Alur logika dan antarmuka validasi presensi Check-In dan Check-Out (validasi jam kerja shift, penentuan status kehadiran tepat waktu/terlambat, dan dialog konfirmasi sukses).",
            halaman: "Hal. 63",
            gambarUrl: "/images/bukti/check-in.jpeg",
            gambarCaption: "Tampilan Antarmuka dan Alur Logika Validasi Check-In Presensi",
            gambarList: [
              {
                url: "/images/bukti/check-in.jpeg",
                caption: "Tampilan Antarmuka Alur & Validasi Check-In Presensi",
              },
              {
                url: "/images/bukti/checkout.jpeg",
                caption: "Tampilan Antarmuka Alur & Validasi Check-Out Presensi",
              },
            ],
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-03",
          nomor: 3,
          catatanRevisi:
            "Kata pengantar diperbaiki: Perbaiki redaksional dan penulisan Kata Pengantar naskah skripsi: perbaiki ucapan terima kasih kepada pimpinan perusahaan PT MJU, dosen pembimbing 1 & 2, dewan penguji, dan sesuaikan kaidah tata bahasa EYD/PUEBI.",
          tindakanPerbaikan:
            "Telah merevisi seluruh lembar Kata Pengantar naskah skripsi (Hal. v - vi) sesuai kaidah tata bahasa baku Bahasa Indonesia dan melengkapi urutan ucapan terima kasih kepada seluruh pihak terkait penelitian.",
          halamanTerkait: "Halaman v - vi",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Naskah Kata Pengantar telah disempurnakan redaksinya pada bagian awal dokumen skripsi (Hal. v - vi).",
            halaman: "Hal. v - vi",
            gambarUrl: "/images/bukti/kaper.jpeg",
            gambarCaption: "Dokumen Naskah Kata Pengantar Skripsi yang Telah Disempurnakan",
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-04",
          nomor: 4,
          catatanRevisi:
            "Tambahkan teknik metode pengumpulan: Tambahkan penjelasan detail mengenai teknik dan metode pengumpulan data penelitian pada Bab 3 (Observasi langsung di PT MJU, Wawancara mendalam, Studi Dokumentasi, dan Studi Pustaka).",
          tindakanPerbaikan:
            "Telah menambahkan sub-bab khusus mengenai 4 metode pengumpulan data penelitian beserta bagan alur tahapan pengumpulan data lapangan pada Bab 3 Sub-bab 3.2.",
          halamanTerkait: "Halaman 28 - 31",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Bagan alur dan penjelasan 4 metode pengumpulan data penelitian (Observasi, Wawancara, Dokumentasi, Studi Literatur).",
            halaman: "Hal. 30",
            gambarUrl: "/images/bukti/pengumpulan-data.jpeg",
            gambarCaption: "Bagan Metode dan Teknik Pengumpulan Data Penelitian PT MJU",
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-05",
          nomor: 5,
          catatanRevisi:
            "Tambahkan black box: Tambahkan tabel pengujian fungsionalitas sistem menggunakan Black Box Testing komprehensif untuk seluruh modul (Login, Check In Geofencing & Face Recognition, Check Out, Pengajuan Izin/Lembur, Penggajian, dan Laporan).",
          tindakanPerbaikan:
            "Telah menambahkan tabel matriks pengujian Black Box Testing lengkap pada Bab 4 Sub-bab 4.5 dengan seluruh test case fungsionalitas bernilai Valid 100%.",
          halamanTerkait: "Halaman 80 - 88",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Matriks pengujian Black Box Testing untuk seluruh modul fungsional sistem presensi dan penggajian PT MJU.",
            halaman: "Hal. 84",
            gambarUrl: "/images/bukti/real-blackbox.jpeg",
            gambarCaption: "Tabel Matriks Hasil Pengujian Black Box Testing Sistem Presensi & Penggajian",
            gambarList: [
              {
                url: "/images/bukti/real-blackbox.jpeg",
                caption: "Tabel Pengujian Black Box Testing Modul Presensi & Validasi",
              },
              {
                url: "/images/bukti/blackbox.jpeg",
                caption: "Tabel Pengujian Black Box Testing Modul Master Data & Keamanan",
              },
              {
                url: "/images/bukti/blackbox2.jpeg",
                caption: "Tabel Pengujian Black Box Testing Modul Penggajian & Export Laporan",
              },
            ],
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-06",
          nomor: 6,
          catatanRevisi:
            "Rumus SUS diperjelas: Perjelas penjabaran matematis formula/rumus System Usability Scale (SUS) pada Bab 3 dan Bab 4, sertakan aturan perhitungan skor untuk butir ganjil dan butir genap serta faktor pengali skala 2.5.",
          tindakanPerbaikan:
            "Telah menambahkan rincian formula matematis SUS (Persamaan 3.1 & 3.2), cara konversi skor item ganjil (Skor - 1) dan item genap (5 - Skor), perkalian faktor 2.5, serta interpretasi standar SUS Score di Bab 3 Sub-bab 3.7 dan Bab 4 Sub-bab 4.6.",
          halamanTerkait: "Halaman 76 - 79",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Formula perhitungan skor SUS, aturan konversi ganjil/genap, skala pengali 2.5, dan matriks penilaian usability.",
            halaman: "Hal. 77",
            gambarUrl: "/images/bukti/sus.jpeg",
            gambarCaption: "Penjelasan Matematis Formula Perhitungan Skor System Usability Scale (SUS)",
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-07",
          nomor: 7,
          catatanRevisi:
            "Indikator pertanyaan nya perbaiki: Perbaiki dan selaraskan 10 butir indikator pertanyaan kuesioner System Usability Scale (SUS) agar menggunakan terjemahan standar baku Bahasa Indonesia yang jelas dan tidak ambigu bagi responden karyawan PT MJU.",
          tindakanPerbaikan:
            "Telah memperbaiki dan membakukan 10 butir pertanyaan kuesioner instrumen SUS Bahasa Indonesia (Brooke, 1996) pada Bab 3 Sub-bab 3.7.2 dan Lampiran Instrumen Kuesioner Pengujian.",
          halamanTerkait: "Halaman 79 - 82 & Lampiran",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Tabel 10 butir pertanyaan instrumen kuesioner SUS standar Bahasa Indonesia baku beserta sifat pernyataan dan rumus bobot.",
            halaman: "Hal. 80",
            gambarUrl: "/images/bukti/sus.jpeg",
            gambarCaption: "Tabel 10 Butir Indikator Pertanyaan Kuesioner SUS Standar Bahasa Indonesia",
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
      ],
    },
  ],
  dokumenPdf: {
    url: "/documents/SOFT%20FILE%20SKRIPSI%20SINGKAT.pdf",
    namaFile: "SOFT FILE SKRIPSI SINGKAT.pdf",
    ukuran: "4.2 MB",
    versi: "v2.0 (Revisi Final)",
    tanggalUpload: "27 Agustus 2026",
  },
  videoDemo: {
    url: "/videos/demo-apk.mp4",
    judul: "Video Demonstrasi Sistem Informasi Presensi & Penggajian PT MJU",
    deskripsi:
      "Video demonstrasi penggunaan sistem: autentikasi pegawai, alur Check-In & Check-Out, pengambilan koordinat GPS dengan algoritma Haversine, proteksi Mock Location, pengenalan wajah (Face Recognition), hingga kalkulasi dan export slip gaji di PT MJU.",
    durasi: "01:44 Menit",
    resolusi: "1080p Full HD",
    fiturUtama: [
      "Autentikasi & Manajemen Data Pegawai PT MJU",
      "Alur Validasi Check-In & Check-Out Berbasis Shift",
      "Validasi Presensi GPS dengan Algoritma Haversine",
      "Deteksi & Blokir Mock Location (Fake GPS)",
      "Verifikasi Wajah (Face Recognition) Real-Time",
      "Otomatisasi Perhitungan Gaji & Cetak Slip Gaji PDF",
    ],
  },
};
