import React from "react";
import { FileText, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { DokumenPdf } from "@/types/revisi";
import { PdfViewer } from "./PdfViewer";
import { Button } from "@/components/ui/button";

interface PdfViewerSectionProps {
  dokumen: DokumenPdf;
}

export function PdfViewerSection({ dokumen }: PdfViewerSectionProps) {
  return (
    <section id="pdf-viewer" className="py-12 scroll-mt-20">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full mb-2 border border-rose-100 dark:border-rose-800">
              <FileText className="w-4 h-4" />
              Naskah Lengkap Final
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Viewer Dokumen PDF Skripsi
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Dokumen skripsi lengkap yang telah diselaraskan dengan seluruh poin masukan revisi dewan penguji. Dapat dibaca langsung secara online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href={dokumen.url} download={dokumen.namaFile}>
              <Button variant="primary" className="gap-2 text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/10">
                <Download className="w-4 h-4" />
                <span>Download PDF Skripsi ({dokumen.ukuran})</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Embedded Viewer Component */}
        <PdfViewer dokumen={dokumen} />
      </div>
    </section>
  );
}
