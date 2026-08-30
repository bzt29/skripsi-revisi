"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/dialog";
import { ExternalLink, ZoomIn, FileText, Image as ImageIcon, UserCheck, CheckCircle2, ChevronLeft, ChevronRight, Layers } from "lucide-react";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [bukti, isOpen]);

  if (!bukti) return null;

  const hasGallery = Boolean(bukti.gambarList && bukti.gambarList.length > 1);
  const images = hasGallery
    ? bukti.gambarList!
    : bukti.gambarUrl
    ? [{ url: bukti.gambarUrl, caption: bukti.gambarCaption }]
    : [];

  const currentImage = images[activeImageIndex] || {
    url: bukti.gambarUrl,
    caption: bukti.gambarCaption,
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Bukti Revisi Poin #${nomorPoin} • ${pengujiNama}`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Multi-Image Gallery Switcher Bar */}
        {hasGallery && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 px-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Galeri Bukti ({images.length} Gambar):</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 ml-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeImageIndex === idx
                      ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20"
                      : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  Foto #{idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image Container with Nav Arrows */}
        {currentImage.url ? (
          <div className="relative bg-slate-900/5 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-2 sm:p-4 min-h-[260px] max-h-[65vh] group">
            <img
              src={currentImage.url}
              alt={currentImage.caption || bukti.gambarCaption || "Bukti Revisi"}
              className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
            />

            {/* Prev / Next Floating Arrows for Multi-Images */}
            {hasGallery && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-xs transition-opacity shadow-lg"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-xs transition-opacity shadow-lg"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
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
          {(currentImage.caption || bukti.gambarCaption) && (
            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {currentImage.caption || bukti.gambarCaption}
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
            {currentImage.url && (
              <a
                href={currentImage.url}
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
