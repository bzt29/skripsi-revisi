"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/dialog";
import {
  ExternalLink,
  ZoomIn,
  ZoomOut,
  FileText,
  Image as ImageIcon,
  UserCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
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
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setActiveImageIndex(0);
    setZoomLevel(1);
  }, [bukti, isOpen]);

  useEffect(() => {
    setZoomLevel(1);
  }, [activeImageIndex]);

  const hasGallery = Boolean(bukti?.gambarList && bukti.gambarList.length > 1);
  const images = hasGallery
    ? bukti!.gambarList!
    : bukti?.gambarUrl
    ? [{ url: bukti.gambarUrl, caption: bukti.gambarCaption }]
    : [];

  const handlePrev = React.useCallback(() => {
    setActiveImageIndex((prev) => (images.length > 0 ? (prev > 0 ? prev - 1 : images.length - 1) : 0));
  }, [images.length]);

  const handleNext = React.useCallback(() => {
    setActiveImageIndex((prev) => (images.length > 0 ? (prev < images.length - 1 ? prev + 1 : 0) : 0));
  }, [images.length]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(Number((z + 0.25).toFixed(2)), 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(Number((z - 0.25).toFixed(2)), 0.75));
  const handleZoomReset = () => setZoomLevel(1);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  if (!bukti) return null;

  const currentImage = images[activeImageIndex] || {
    url: bukti.gambarUrl,
    caption: bukti.gambarCaption,
  };

  const hasGroups = images.some((img) => Boolean(img.kelompok));
  const uniqueGroups = hasGroups
    ? Array.from(new Set(images.map((img) => img.kelompok).filter(Boolean) as string[]))
    : [];

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
          <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>
                  Galeri Bukti ({images.length} Gambar
                  {hasGroups && ` • ${uniqueGroups.length} Kelompok`}):
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Gunakan panah ◀ ▶ keyboard untuk navigasi
              </span>
            </div>

            {/* List of images with group badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {images.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20"
                        : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200/60 dark:border-slate-600"
                    }`}
                  >
                    {img.kelompok && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isActive
                            ? "bg-indigo-700/90 text-indigo-100"
                            : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                        }`}
                      >
                        {img.kelompok}
                      </span>
                    )}
                    <span>{img.label || `Foto #${idx + 1}`}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Image Container with Zoom and Nav Arrows */}
        {currentImage.url ? (
          <div className="relative bg-slate-900/5 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 min-h-[300px] max-h-[65vh] group">
            {/* Top Toolbar Overlay (Kelompok badge + Zoom controls) */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
              {currentImage.kelompok ? (
                <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs shadow-md border border-slate-700/60">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Kelompok: {currentImage.kelompok}
                </span>
              ) : (
                <span />
              )}

              {/* Interactive Zoom Controls */}
              <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/85 backdrop-blur-md px-2 py-1 rounded-xl border border-slate-700/60 text-white shadow-md">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.75}
                  className="p-1 hover:bg-slate-800 rounded disabled:opacity-40 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold px-1 min-w-[38px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="p-1 hover:bg-slate-800 rounded disabled:opacity-40 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    onClick={handleZoomReset}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded font-semibold ml-0.5 text-slate-300 transition-colors"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Zoom Area */}
            <div className="overflow-auto w-full h-full max-h-[58vh] flex items-center justify-center p-2">
              <img
                src={currentImage.url}
                alt={currentImage.caption || bukti.gambarCaption || "Bukti Revisi"}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out",
                }}
                className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
              />
            </div>

            {/* Prev / Next Floating Arrows for Multi-Images */}
            {hasGallery && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900/95 text-white backdrop-blur-xs transition-all shadow-lg hover:scale-105"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900/95 text-white backdrop-blur-xs transition-all shadow-lg hover:scale-105"
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {currentImage.caption || bukti.gambarCaption}
              </h5>
              {currentImage.kelompok && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  Kelompok: {currentImage.kelompok}
                </span>
              )}
            </div>
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
