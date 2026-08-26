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
            "Tambahkan penjelasan detail mengenai implementasi formula Algoritma Haversine dan penentuan radius toleransi presensi GPS (geofencing) pada Bab 3 dan 4.",
          tindakanPerbaikan:
            "Telah menambahkan sub-bab 3.4 'Formula Perhitungan Jarak Haversine' dan tabel pengujian akurasi radius presensi (50 meter dari titik kantor PT MJU) di Bab 4 Sub-bab 4.3.",
          halamanTerkait: "Halaman 42 - 46",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Tabel 4.3 Pengujian Radius Geofencing Haversine telah dimasukkan di halaman 44.",
            halaman: "Hal. 44",
            gambarUrl: "/images/bukti/p1-revisi-01.svg",
            gambarCaption: "Tabel 4.3 Hasil Pengujian Toleransi Radius Geofencing GPS",
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
            "Perjelas mekanisme dan algoritma pendeteksian Mock Location (Fake GPS) untuk mencegah kecurangan absensi presensi pegawai.",
          tindakanPerbaikan:
            "Telah menambahkan diagram alur validasi keamanan (Android Location API & developer settings check) pada Bab 3 Sub-bab 3.5.",
          halamanTerkait: "Halaman 48 - 51",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Menambahkan diagram alur verifikasi fake GPS detection dan penanganan respon sistem.",
            halaman: "Hal. 50",
            gambarUrl: "/images/bukti/p1-revisi-02.svg",
            gambarCaption: "Diagram Alur Deteksi Mock Location & Fake GPS",
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
            "Lengkapi evaluasi performa Face Recognition (Confusion Matrix, Precision, Recall) saat verifikasi wajah pegawai dalam berbagai kondisi pencahayaan.",
          tindakanPerbaikan:
            "Telah menyertakan Tabel 4.6 Evaluasi Pengenalan Wajah dengan tingkat akurasi 96.8% pada kondisi terang, redup, dan sudut kemiringan wajah hingga 30 derajat.",
          halamanTerkait: "Halaman 72 - 76",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Tabel 4.6 Pengujian Matriks Pengenalan Wajah telah ditambahkan di Bab 4.",
            halaman: "Hal. 74",
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
            "Sinkronkan skema integrasi data presensi harian dengan modul kalkulasi penggajian otomatis (potongan keterlambatan dan uang lembur).",
          tindakanPerbaikan:
            "Telah memperbaiki algoritma penggajian pada Bab 3 Sub-bab 3.6 dengan aturan potongan kehadiran dan akumulasi jam lembur terverifikasi.",
          halamanTerkait: "Halaman 58 - 62",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Logika bisnis penggajian berdasarkan rekap presensi telah disesuaikan dengan SOP PT MJU.",
            halaman: "Hal. 60",
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
            "Format sitasi dan daftar pustaka belum konsisten mengikuti standar IEEE (khususnya untuk referensi jurnal 5 tahun terakhir).",
          tindakanPerbaikan:
            "Telah merevisi dan menyinkronkan seluruh 38 sitasi jurnal dan buku menggunakan format IEEE dengan tautan DOI aktif.",
          halamanTerkait: "Halaman 108 - 114",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Daftar pustaka telah diperbaiki menggunakan Mendeley sesuai format IEEE standar.",
            halaman: "Hal. 108-114",
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
            "Tambahkan pembahasan limitasi sistem terkait spesifikasi kamera perangkat dan toleransi GPS pada area minim sinyal di Bab 5 Saran.",
          tindakanPerbaikan:
            "Telah menambahkan poin rekomendasi dan limitasi teknis perangkat pada Bab 5 Sub-bab 5.2.",
          halamanTerkait: "Halaman 98",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Poin limitasi sistem presensi telah dituangkan secara spesifik di Bab 5.",
            halaman: "Hal. 98",
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
            "Perbaiki Use Case Diagram dan Sequence Diagram pada Bab 3 karena relasi aktor Pegawai, HRD, dan Pimpinan PT MJU belum dipisahkan dengan tepat.",
          tindakanPerbaikan:
            "Telah memperbaiki Gambar 3.3 Use Case Diagram Sistem Presensi & Penggajian dan Sequence Diagram Presensi Wajah sesuai standar UML 2.5.",
          halamanTerkait: "Halaman 32 - 36",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Gambar 3.3 Use Case Diagram yang telah direvisi dengan 3 hak akses aktor.",
            halaman: "Hal. 34",
            gambarUrl: "/images/bukti/p2-revisi-01.svg",
            gambarCaption: "Gambar 3.3 Use Case Diagram Sistem Presensi & Penggajian PT MJU",
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
            "Lengkapi Activity Diagram untuk proses presensi masuk, deteksi mock location, dan verifikasi wajah pegawai.",
          tindakanPerbaikan:
            "Telah menambahkan Activity Diagram (Gambar 3.5) di Bab 3 Sub-bab 3.3 yang menggambarkan alur validasi presensi secara runtut.",
          halamanTerkait: "Halaman 37 - 39",
          status: "Dalam Proses",
          bukti: {
            tipe: "both",
            deskripsi:
              "Gambar 3.5 Activity Diagram Presensi Wajah dan Validasi Lokasi telah ditambahkan.",
            halaman: "Hal. 38",
            gambarUrl: "/images/bukti/p2-revisi-02.svg",
            gambarCaption: "Gambar 3.5 Activity Diagram Alur Presensi Pegawai",
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
            "Sempurnakan Entity Relationship Diagram (ERD) pada Bab 3, perjelas kardinalitas relasi antara tabel pegawai, presensi, lembur, dan slip gaji.",
          tindakanPerbaikan:
            "Telah merevisi ERD (Gambar 3.7) dan tabel kamus data relasional pada Bab 3 Sub-bab 3.4.",
          halamanTerkait: "Halaman 40 - 43",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "ERD relasi database dan kamus data telah disempurnakan.",
            halaman: "Hal. 41",
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
            "Perbaiki desain UI/UX mockup antarmuka pengguna pada modul presensi mobile dan dashboard pimpinan PT MJU di Bab 3.",
          tindakanPerbaikan:
            "Telah menyelaraskan mockup antarmuka aplikasi presensi mobile (kamera scan wajah & peta lokasi) dan dashboard web monitoring gaji.",
          halamanTerkait: "Halaman 52 - 57",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Mockup antarmuka pengguna responsif telah ditambahkan di Sub-bab 3.6.",
            halaman: "Hal. 54",
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
            "Tambahkan skenario pengujian Black Box Testing untuk penolakan presensi saat pegawai berada di luar radius kantor atau menggunakan fake GPS.",
          tindakanPerbaikan:
            "Telah menambahkan 6 test case pengujian Black Box pada Tabel 4.8 Bab 4 (uji coba di luar radius, uji coba mock location aktif, dan uji coba wajah tidak terdaftar).",
          halamanTerkait: "Halaman 80 - 85",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Tabel 4.8 Pengujian Black Box Testing telah dilengkapi hasil uji validasi.",
            halaman: "Hal. 82",
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
            "Perbaiki penomoran rumus matematis pada Bab 2 (rumus konversi derajat ke radian dan rumus jarak Haversine) agar konsisten.",
          tindakanPerbaikan:
            "Telah memperbaiki penomoran persamaan rumus menjadi Persamaan (2.1) sampai (2.6) menggunakan format equation yang rapi.",
          halamanTerkait: "Halaman 24 - 27",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Penomoran rumus matematis telah diseragamkan pada Bab 2.",
            halaman: "Hal. 25",
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
            "Sesuaikan format penulisan naskah: margin 4-4-3-3 cm, spasi 1.5, dan jenis font sesuai pedoman skripsi Fakultas Sains dan Teknologi.",
          tindakanPerbaikan:
            "Telah melakukan formatting ulang layout seluruh dokumen naskah mengikuti panduan penulisan skripsi resmi fakultas.",
          halamanTerkait: "Seluruh Bab (Hal. 1 - 118)",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Margin dan tata letak penulisan naskah telah disesuaikan menyeluruh.",
            halaman: "Hal. 1-118",
          },
          reviewer: {
            diverifikasiOleh: "Rafi Hafizhni Anggia, S.kom., M.Ds",
            statusReview: "Menunggu",
            catatanReviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
            tanggalVerifikasi: "-",
          },
        },
        {
          id: "p2-08",
          nomor: 8,
          catatanRevisi:
            "Sediakan video rekaman demo aplikasi interaktif yang menunjukkan proses presensi masuk, verifikasi wajah & lokasi, hingga rekap gaji tercetak.",
          tindakanPerbaikan:
            "Telah merekam video demonstrasi aplikasi secara lengkap dan menyematkannya pada portal verifikasi revisi ini.",
          halamanTerkait: "Section Demo Video",
          status: "Dalam Proses",
          bukti: {
            tipe: "text",
            deskripsi:
              "Video demo sistem presensi dan penggajian telah disematkan pada portal verifikasi.",
            halaman: "Video Demo",
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
    url: "/documents/skripsi-final.pdf",
    namaFile: "Skripsi_Final_Revisi_Syed_M_Hafiz_Firdaus_202220201036.pdf",
    ukuran: "5.2 MB",
    versi: "v2.0 (Menunggu Review)",
    tanggalUpload: "27 Agustus 2026",
  },
  videoDemo: {
    url: "/videos/video.mp4",
    judul: "Video Demonstrasi Sistem Informasi Presensi & Penggajian PT MJU",
    deskripsi:
      "Video demonstrasi penggunaan sistem: autentikasi pegawai, pengambilan koordinat GPS dengan algoritma Haversine, proteksi Mock Location, pengenalan wajah (Face Recognition), hingga kalkulasi dan export slip gaji di PT MJU.",
    durasi: "04:15 Menit",
    resolusi: "1080p Full HD",
    fiturUtama: [
      "Autentikasi & Manajemen Data Pegawai PT MJU",
      "Validasi Presensi GPS dengan Algoritma Haversine",
      "Deteksi & Blokir Mock Location (Fake GPS)",
      "Verifikasi Wajah (Face Recognition) Real-Time",
      "Otomatisasi Perhitungan Gaji & Cetak Slip Gaji PDF",
    ],
  },
};
