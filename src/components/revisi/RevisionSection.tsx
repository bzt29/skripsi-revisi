import React from "react";
import { ListChecks, CheckCircle2, ShieldAlert } from "lucide-react";
import { DosenPenguji } from "@/types/revisi";
import { ExaminerTabs } from "./ExaminerTabs";

interface RevisionSectionProps {
  pengujiList: DosenPenguji[];
}

export function RevisionSection({ pengujiList }: RevisionSectionProps) {
  return (
    <section id="revisi" className="py-12 scroll-mt-20">
      <div className="space-y-6">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full mb-2 border border-indigo-100 dark:border-indigo-800">
              <ListChecks className="w-4 h-4" />
              Matriks Tindak Lanjut
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Daftar Catatan & Bukti Revisi Penguji
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Rincian seluruh poin masukan dewan penguji sidang skripsi beserta penjelasan tindakan koreksi dan bukti halaman perbaikan naskah.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800 px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Seluruh butir revisi telah divalidasi & disetujui</span>
          </div>
        </div>

        {/* Tabs & Content */}
        <ExaminerTabs pengujiList={pengujiList} />
      </div>
    </section>
  );
}
