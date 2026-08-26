"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Save,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { DosenPenguji, PoinRevisi, StatusPoinRevisi } from "@/types/revisi";
import confetti from "canvas-confetti";

interface ReviewerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  penguji: DosenPenguji;
  poin: PoinRevisi | null;
  onSaveReview: (
    pengujiId: string,
    poinId: string,
    status: StatusPoinRevisi,
    reviewerData: {
      diverifikasiOleh: string;
      statusReview: "ACC" | "Perlu Revisi" | "Menunggu";
      catatanReviewer: string;
      tanggalVerifikasi: string;
    }
  ) => void;
}

const getFormattedToday = () => {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function ReviewerFormModal({
  isOpen,
  onClose,
  penguji,
  poin,
  onSaveReview,
}: ReviewerFormModalProps) {
  const [statusReview, setStatusReview] = useState<"ACC" | "Perlu Revisi" | "Menunggu">("ACC");
  const [catatanReviewer, setCatatanReviewer] = useState("");
  const [diverifikasiOleh, setDiverifikasiOleh] = useState(penguji.namaLengkap);
  const [tanggalVerifikasi, setTanggalVerifikasi] = useState(getFormattedToday());

  useEffect(() => {
    if (poin) {
      const today = getFormattedToday();
      const currentReviewer = poin.reviewer;

      if (currentReviewer) {
        setStatusReview(currentReviewer.statusReview || "ACC");
        
        // If it's the placeholder text, give a helpful default on edit
        if (currentReviewer.catatanReviewer === "Menunggu pemeriksaan oleh dosen reviewer.") {
          setCatatanReviewer("Perbaikan telah diperiksa dan sesuai dengan arahan saat sidang.");
        } else {
          setCatatanReviewer(currentReviewer.catatanReviewer || "");
        }

        setDiverifikasiOleh(currentReviewer.diverifikasiOleh || penguji.namaLengkap);
        
        // Auto Date Now if empty or "-"
        if (!currentReviewer.tanggalVerifikasi || currentReviewer.tanggalVerifikasi === "-") {
          setTanggalVerifikasi(today);
        } else {
          setTanggalVerifikasi(currentReviewer.tanggalVerifikasi);
        }
      } else {
        setStatusReview("ACC");
        setCatatanReviewer("Perbaikan telah diperiksa dan sesuai arahan saat sidang.");
        setDiverifikasiOleh(penguji.namaLengkap);
        setTanggalVerifikasi(today);
      }
    }
  }, [poin, penguji]);

  if (!poin) return null;

  const handleSelectStatus = (status: "ACC" | "Perlu Revisi" | "Menunggu") => {
    setStatusReview(status);
    const today = getFormattedToday();
    setTanggalVerifikasi(today);

    if (status === "ACC" && (!catatanReviewer || catatanReviewer === "Menunggu pemeriksaan oleh dosen reviewer.")) {
      setCatatanReviewer("Perbaikan telah diperiksa dan sesuai arahan saat sidang.");
    } else if (status === "Perlu Revisi" && (!catatanReviewer || catatanReviewer.includes("sesuai arahan"))) {
      setCatatanReviewer("Masih terdapat bagian yang perlu diperbaiki kembali.");
    } else if (status === "Menunggu") {
      setCatatanReviewer("Menunggu pemeriksaan oleh dosen reviewer.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const statusPoin: StatusPoinRevisi =
      statusReview === "ACC" ? "Disetujui Penguji" : "Dalam Proses";

    onSaveReview(penguji.id, poin.id, statusPoin, {
      diverifikasiOleh,
      statusReview,
      catatanReviewer: catatanReviewer.trim() || (statusReview === "ACC" ? "Revisi disetujui." : "Menunggu pemeriksaan."),
      tanggalVerifikasi: tanggalVerifikasi || getFormattedToday(),
    });

    if (statusReview === "ACC") {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Form Verifikasi Reviewer • Poin #${poin.nomor}`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Poin Context Summary */}
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-500 uppercase tracking-wider">
              Catatan Revisi Saat Sidang:
            </span>
            {poin.halamanTerkait && (
              <span className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border text-slate-600 dark:text-slate-300 font-medium">
                {poin.halamanTerkait}
              </span>
            )}
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug">
            {poin.catatanRevisi}
          </p>
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
              TINDAKAN MAHASISWA:
            </span>
            {poin.tindakanPerbaikan}
          </div>
        </div>

        {/* Status Selection (Radio Style) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Keputusan Verifikasi Dosen:
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Option ACC */}
            <button
              type="button"
              onClick={() => handleSelectStatus("ACC")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                statusReview === "ACC"
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20 font-bold shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-300 font-medium"
              }`}
            >
              <CheckCircle2
                className={`w-5 h-5 ${
                  statusReview === "ACC" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                }`}
              />
              <span className="text-xs">Disetujui (ACC)</span>
            </button>

            {/* Option Perlu Revisi */}
            <button
              type="button"
              onClick={() => handleSelectStatus("Perlu Revisi")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                statusReview === "Perlu Revisi"
                  ? "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20 font-bold shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-rose-300 font-medium"
              }`}
            >
              <XCircle
                className={`w-5 h-5 ${
                  statusReview === "Perlu Revisi" ? "text-rose-600 dark:text-rose-400" : "text-slate-400"
                }`}
              />
              <span className="text-xs">Perlu Revisi</span>
            </button>

            {/* Option Menunggu */}
            <button
              type="button"
              onClick={() => handleSelectStatus("Menunggu")}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                statusReview === "Menunggu"
                  ? "bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/20 font-bold shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-300 font-medium"
              }`}
            >
              <Clock
                className={`w-5 h-5 ${
                  statusReview === "Menunggu" ? "text-amber-600 dark:text-amber-400" : "text-slate-400"
                }`}
              />
              <span className="text-xs">Menunggu</span>
            </button>
          </div>
        </div>

        {/* Catatan Reviewer Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
            <span>Catatan / Evaluasi Reviewer:</span>
          </label>
          <textarea
            rows={3}
            value={catatanReviewer}
            onChange={(e) => setCatatanReviewer(e.target.value)}
            placeholder="Tuliskan catatan perbaikan atau feedback untuk mahasiswa..."
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none shadow-xs"
          />
        </div>

        {/* Reviewer Details: Nama & Tanggal Otomatis (Date Now) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Nama Reviewer:
            </label>
            <input
              type="text"
              value={diverifikasiOleh}
              onChange={(e) => setDiverifikasiOleh(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-indigo-500" />
              <span>Tanggal Verifikasi (Otomatis):</span>
            </label>
            <input
              type="text"
              value={tanggalVerifikasi}
              onChange={(e) => setTanggalVerifikasi(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Footer Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-400">
            Tersimpan otomatis di browser (localStorage).
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Review</span>
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
