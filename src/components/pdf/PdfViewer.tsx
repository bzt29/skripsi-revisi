"use client";

import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DokumenPdf } from "@/types/revisi";

interface PdfViewerProps {
  dokumen: DokumenPdf;
}

export function PdfViewer({ dokumen }: PdfViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-950/90 dark:bg-black/95 backdrop-blur-md p-4 sm:p-8 flex flex-col justify-center items-center"
          : "w-full"
      }`}
    >
      <div
        className={`w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col ${
          isFullscreen ? "h-full max-w-7xl" : "h-[750px] sm:h-[850px]"
        }`}
      >
        {/* PDF Viewer Toolbar */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="line-clamp-1">{dokumen.namaFile}</span>
                <span className="hidden sm:inline-block text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
                  {dokumen.versi}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Ukuran Dokumen: {dokumen.ukuran} • Diunggah: {dokumen.tanggalUpload}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
              title="Muat Ulang Dokumen"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <a
              href={dokumen.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <button
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1.5"
                title="Buka Dokumen di Tab Baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="text-xs">Tab Baru</span>
              </button>
            </a>

            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1.5"
              title={isFullscreen ? "Keluar Layar Penuh" : "Tampilan Layar Penuh"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="text-xs hidden sm:inline">Kecilkan</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="text-xs hidden sm:inline">Layar Penuh</span>
                </>
              )}
            </button>

            <a href={dokumen.url} download={dokumen.namaFile}>
              <Button size="sm" variant="success" className="gap-1.5 text-xs py-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Embedded PDF iframe */}
        <div className="flex-1 relative bg-slate-100 dark:bg-slate-950 overflow-hidden">
          <iframe
            key={iframeKey}
            src={`${dokumen.url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            title="Viewer Dokumen PDF Skripsi"
            className="w-full h-full border-0"
          />

          {/* Bottom Fallback Notification */}
          <div className="hidden peer-hover:block absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[11px] px-3 py-1 rounded-full pointer-events-none">
            Gunakan toolbar atas atau tombol unduh jika preview tidak muncul otomatis
          </div>
        </div>
      </div>
    </div>
  );
}
