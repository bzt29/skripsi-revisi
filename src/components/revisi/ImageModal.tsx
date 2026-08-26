"use client";

import React from "react";
import { Modal } from "@/components/ui/dialog";
import { ExternalLink, ZoomIn, FileText, Image as ImageIcon, UserCheck, CheckCircle2 } from "lucide-react";
import { BuktiRevisi, ReviewerFeedback } from "@/types/revisi";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  bukti: BuktiRevisi | null;
  nomorPoin: number;
  pengujiNama: string;
  reviewer?: ReviewerFeedback;
}

export function ImageModal({
  isOpen,
  onClose,
  bukti,
  nomorPoin,
  pengujiNama,
  reviewer,
}: ImageModalProps) {
  if (!bukti) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Bukti Revisi Poin #${nomorPoin} • ${pengujiNama}`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Image Container */}
        {bukti.gambarUrl ? (
          <div className="relative bg-slate-900/5 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-2 sm:p-4 min-h-[260px] max-h-[65vh]">
            <img
              src={bukti.gambarUrl}
              alt={bukti.gambarCaption || "Bukti Revisi"}
              className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
            />
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Bukti Perbaikan dalam Bentuk Naskah / Teks
            </p>
          </div>
        )}

        {/* Caption & Description */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          {bukti.gambarCaption && (
            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {bukti.gambarCaption}
            </h5>
          )}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {bukti.deskripsi}
          </p>
          {bukti.halaman && (
            <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 inline-block px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-800 mt-1">
              Rujukan Naskah: {bukti.halaman}
            </div>
          )}
        </div>

        {/* Reviewer Note in Modal if present */}
        {reviewer && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-300">
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold flex items-center gap-1.5">
                <span>Catatan Verifikasi Reviewer ({reviewer.diverifikasiOleh})</span>
                <span className="text-[10px] bg-emerald-200/70 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded font-mono">
                  {reviewer.statusReview}
                </span>
              </div>
              <p className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                {reviewer.catatanReviewer}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Dapat diperiksa langsung pada naskah PDF di bagian bawah.
          </span>
          <div className="flex gap-2 ml-auto">
            {bukti.gambarUrl && (
              <a
                href={bukti.gambarUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Buka Gambar Asli
                </Button>
              </a>
            )}
            <Button size="sm" variant="secondary" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
