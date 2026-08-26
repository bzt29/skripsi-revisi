import React from "react";
import {
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataRevisiSkripsi } from "@/types/revisi";

interface HeroSectionProps {
  data: DataRevisiSkripsi;
}

export function HeroSection({ data }: { data: DataRevisiSkripsi }) {
  const { mahasiswa, penguji } = data;

  const totalRevisi = penguji.reduce(
    (acc, p) => acc + p.daftarRevisi.length,
    0
  );
  const selesaiRevisi = penguji.reduce(
    (acc, p) =>
      acc +
      p.daftarRevisi.filter(
        (r) => r.status === "Sudah Diperbaiki" || r.status === "Disetujui Penguji"
      ).length,
    0
  );
  const persentase = totalRevisi > 0 ? Math.round((selesaiRevisi / totalRevisi) * 100) : 0;
  const isSelesai = mahasiswa.statusRevisi === "Selesai";

  return (
    <section id="hero" className="pt-8 pb-10">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20 border border-slate-800/80 dark:border-slate-800">
        {/* Glow accent lights */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* Tag & Status Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Lembar Verifikasi Revisi Skripsi
              </span>
              {isSelesai ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {mahasiswa.statusRevisi}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {mahasiswa.statusRevisi}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Sidang: {mahasiswa.tanggalSidang}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Target Revisi: {mahasiswa.tanggalRevisiSelesai}
              </span>
            </div>
          </div>

          {/* Thesis Title */}
          <div className="max-w-4xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight text-white mb-6">
              {mahasiswa.judulSkripsi}
            </h1>
          </div>

          {/* Student Profile Info */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xl ring-4 ring-indigo-500/20 shadow-lg">
                {mahasiswa.nama.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {mahasiswa.nama}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 mt-0.5">
                  <span className="font-mono bg-slate-800/90 px-2 py-0.5 rounded text-indigo-300 font-medium border border-slate-700/60">
                    NIM: {mahasiswa.nim}
                  </span>
                  <span>•</span>
                  <span>{mahasiswa.programStudi}</span>
                  <span>•</span>
                  <span>{mahasiswa.universitas}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
                <div className="text-xs text-slate-400 font-medium">Penguji</div>
                <div className="text-base font-bold text-white">2 Dosen</div>
              </div>
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
                <div className="text-xs text-slate-400 font-medium">Total Poin</div>
                <div className="text-base font-bold text-white">{totalRevisi} Butir</div>
              </div>
              <div className={`border rounded-2xl px-4 py-2.5 text-center min-w-[100px] ${
                persentase === 100
                  ? "bg-emerald-950/50 border-emerald-700/50"
                  : "bg-amber-950/50 border-amber-700/50"
              }`}>
                <div className={`text-xs font-medium ${persentase === 100 ? "text-emerald-300" : "text-amber-300"}`}>
                  Progress
                </div>
                <div className={`text-base font-bold ${persentase === 100 ? "text-emerald-400" : "text-amber-400"}`}>
                  {selesaiRevisi}/{totalRevisi} ACC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
