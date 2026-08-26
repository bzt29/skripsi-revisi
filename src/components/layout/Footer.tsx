import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Mahasiswa } from "@/types/revisi";

export function Footer({ mahasiswa }: { mahasiswa: Mahasiswa }) {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 mt-16 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Portal Portofolio & Verifikasi Revisi Skripsi</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Disusun oleh <span className="font-semibold text-slate-700 dark:text-slate-200">{mahasiswa.nama}</span> ({mahasiswa.nim}) • {mahasiswa.programStudi}, {mahasiswa.universitas}
            </p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-3 bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800 px-4 py-2 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Dokumen & Poin Perbaikan telah divalidasi dan disetujui Dosen Penguji.</span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {mahasiswa.nama}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            Dibuat dengan Next.js, React, Tailwind CSS, & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
