export type StatusRevisiMahasiswa = "Selesai" | "Menunggu Verifikasi" | "Dalam Revisi";

export type StatusPoinRevisi = "Sudah Diperbaiki" | "Dalam Proses" | "Disetujui Penguji";

export type StatusVerifikasiPenguji = "Disetujui" | "Menunggu ACC" | "Perlu Revisi";

export interface BuktiGambarItem {
  url: string;
  caption?: string;
  kelompok?: string;
  label?: string;
}

export interface BuktiRevisi {
  tipe: "text" | "image" | "both";
  deskripsi: string;
  halaman?: string;
  gambarUrl?: string;
  gambarCaption?: string;
  gambarList?: BuktiGambarItem[];
}

export interface ReviewerFeedback {
  diverifikasiOleh: string;
  statusReview: "ACC" | "Perlu Revisi" | "Menunggu";
  catatanReviewer?: string;
  tanggalVerifikasi?: string;
}

export interface PoinRevisi {
  id: string;
  nomor: number;
  catatanRevisi: string;
  tindakanPerbaikan: string;
  halamanTerkait?: string;
  status: StatusPoinRevisi;
  bukti: BuktiRevisi;
  reviewer?: ReviewerFeedback;
}

export interface DosenPenguji {
  id: string;
  peran: string; // e.g., "Penguji 1" atau "Penguji 2"
  namaLengkap: string;
  nidn: string;
  avatarUrl?: string;
  statusVerifikasi: StatusVerifikasiPenguji;
  catatanUmum?: string;
  daftarRevisi: PoinRevisi[];
}

export interface Mahasiswa {
  nama: string;
  nim: string;
  programStudi: string;
  fakultas: string;
  universitas: string;
  judulSkripsi: string;
  tanggalSidang: string;
  tanggalRevisiSelesai: string;
  statusRevisi: StatusRevisiMahasiswa;
  avatarUrl?: string;
}

export interface DokumenPdf {
  url: string;
  namaFile: string;
  ukuran: string;
  versi: string;
  tanggalUpload: string;
}

export interface VideoDemo {
  url: string;
  judul: string;
  deskripsi: string;
  durasi?: string;
  resolusi?: string;
  fiturUtama?: string[];
}

export interface DataRevisiSkripsi {
  mahasiswa: Mahasiswa;
  penguji: DosenPenguji[];
  dokumenPdf: DokumenPdf;
  videoDemo?: VideoDemo;
}
