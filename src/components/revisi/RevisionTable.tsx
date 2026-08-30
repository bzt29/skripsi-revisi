"use client";

import React from "react";
import { CheckCircle2, XCircle, Clock, Image as ImageIcon, FileText, ZoomIn, BookOpen, UserCheck, Edit3 } from "lucide-react";
import { PoinRevisi } from "@/types/revisi";
import { Badge } from "@/components/ui/badge";

interface RevisionTableProps {
  revisiList: PoinRevisi[];
  onOpenBukti: (poin: PoinRevisi) => void;
  onReviewPoin?: (poin: PoinRevisi) => void;
}

export function RevisionTable({
  revisiList,
  onOpenBukti,
  onReviewPoin,
}: RevisionTableProps) {
  return (
    <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <th className="py-4 px-4 text-center w-14">No</th>
            <th className="py-4 px-5 w-[27%]">Catatan Revisi Dosen</th>
            <th className="py-4 px-5 w-[28%]">Tindakan / Penjelasan Perbaikan</th>
            <th className="py-4 px-4 w-[11%]">Halaman</th>
            <th className="py-4 px-4 text-center w-[10%]">Bukti</th>
            <th className="py-4 px-4 w-[18%] text-center">Status & Reviewer</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
          {revisiList.map((poin) => {
            const isAcc = poin.reviewer?.statusReview === "ACC" || poin.status === "Disetujui Penguji";
            const isPerluRevisi = poin.reviewer?.statusReview === "Perlu Revisi";
            const isMenunggu = !isAcc && !isPerluRevisi;

            return (
              <tr
                key={poin.id}
                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
              >
                {/* No */}
                <td className="py-4 px-4 text-center align-top">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                    {poin.nomor}
                  </span>
                </td>

                {/* Catatan Revisi */}
                <td className="py-4 px-5 align-top">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {poin.catatanRevisi}
                  </div>
                </td>

                {/* Tindakan Perbaikan */}
                <td className="py-4 px-5 align-top">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                    {poin.tindakanPerbaikan}
                  </p>
                </td>

                {/* Halaman */}
                <td className="py-4 px-4 align-top">
                  {poin.halamanTerkait ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700">
                      <BookOpen className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                      {poin.halamanTerkait}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </td>

                {/* Bukti */}
                <td className="py-4 px-4 text-center align-top">
                  {poin.bukti.gambarUrl ? (
                    <button
                      onClick={() => onOpenBukti(poin)}
                      className="inline-flex flex-col items-center gap-1 p-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-indigo-700 dark:text-indigo-300 group/btn"
                      title="Klik untuk memperbesar bukti gambar"
                    >
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-white dark:bg-slate-950 border border-indigo-100 dark:border-indigo-900 shadow-xs flex items-center justify-center">
                        <img
                          src={poin.bukti.gambarUrl}
                          alt="Thumbnail"
                          className="w-full h-full object-cover group-hover/btn:scale-110 transition-transform duration-200"
                        />
                        {poin.bukti.gambarList && poin.bukti.gambarList.length > 1 && (
                          <span className="absolute top-0.5 right-0.5 bg-indigo-900/90 text-indigo-100 text-[9px] font-bold px-1 rounded shadow-xs">
                            +{poin.bukti.gambarList.length}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-indigo-950/30 opacity-0 group-hover/btn:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold">
                        {poin.bukti.gambarList && poin.bukti.gambarList.length > 1
                          ? `${poin.bukti.gambarList.length} Foto`
                          : "Lihat Foto"}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenBukti(poin)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Naskah</span>
                    </button>
                  )}
                </td>

                {/* Status & Reviewer Verification */}
                <td className="py-4 px-4 align-top text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <Badge
                      variant={isAcc ? "success" : isPerluRevisi ? "warning" : "warning"}
                      className="gap-1 text-[11px]"
                    >
                      {isAcc ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>ACC Reviewer</span>
                        </>
                      ) : isPerluRevisi ? (
                        <>
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Perlu Revisi</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Menunggu Review</span>
                        </>
                      )}
                    </Badge>

                    {poin.reviewer && (
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800 text-center w-full max-w-[150px]">
                        <p className="line-clamp-2 italic text-[10px] text-slate-600 dark:text-slate-300">
                          &ldquo;{poin.reviewer.catatanReviewer}&rdquo;
                        </p>
                        {poin.reviewer.tanggalVerifikasi && poin.reviewer.tanggalVerifikasi !== "-" && (
                          <span className="text-[9px] text-slate-400 block mt-0.5">
                            {poin.reviewer.tanggalVerifikasi}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Review Button for Lecturer */}
                    {onReviewPoin && (
                      <button
                        onClick={() => onReviewPoin(poin)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800 transition-colors shadow-xs"
                        title="Beri status ACC / Catatan review"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Beri Review</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
