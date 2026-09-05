"use client";

import React from "react";
import { CheckCircle2, XCircle, Clock, Image as ImageIcon, FileText, ZoomIn, BookOpen, UserCheck, Edit3 } from "lucide-react";
import { PoinRevisi } from "@/types/revisi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RevisionCardProps {
  revisiList: PoinRevisi[];
  onOpenBukti: (poin: PoinRevisi) => void;
  onReviewPoin?: (poin: PoinRevisi) => void;
}

export function RevisionCard({
  revisiList,
  onOpenBukti,
  onReviewPoin,
}: RevisionCardProps) {
  return (
    <div className="lg:hidden space-y-4">
      {revisiList.map((poin) => {
        const isAcc = poin.reviewer?.statusReview === "ACC" || poin.status === "Disetujui Penguji";
        const isPerluRevisi = poin.reviewer?.statusReview === "Perlu Revisi";
        const isMenunggu = !isAcc && !isPerluRevisi;

        return (
          <div
            key={poin.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {/* Card Header: Number, Status & Review Button */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-100 dark:border-indigo-800">
                  #{poin.nomor}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Poin Revisi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={isAcc ? "success" : isPerluRevisi ? "warning" : "warning"}
                  className="gap-1 text-[11px]"
                >
                  {isAcc ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>ACC</span>
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
              </div>
            </div>

            {/* Catatan Revisi */}
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Catatan Dosen
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                {poin.catatanRevisi}
              </p>
            </div>

            {/* Tindakan Perbaikan */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Tindakan / Penjelasan Perbaikan
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {poin.tindakanPerbaikan}
              </p>
            </div>

            {/* Reviewer Note */}
            {poin.reviewer && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  isAcc
                    ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300"
                    : isPerluRevisi
                    ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200/60 dark:border-rose-800/60 text-rose-800 dark:text-rose-300"
                    : "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/60 dark:border-amber-800/60 text-amber-800 dark:text-amber-300"
                }`}
              >
                <UserCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold flex items-center gap-1">
                    <span>Status Reviewer:</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 bg-white/60 dark:bg-slate-800 rounded">
                      {poin.reviewer.statusReview}
                    </span>
                  </div>
                  <p className="mt-0.5">{poin.reviewer.catatanReviewer}</p>
                </div>
              </div>
            )}

            {/* Footer Info: Halaman & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              {poin.halamanTerkait && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700">
                  <BookOpen className="w-3 h-3 text-slate-400" />
                  {poin.halamanTerkait}
                </span>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {onReviewPoin && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1 py-1"
                    onClick={() => onReviewPoin(poin)}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Review</span>
                  </Button>
                )}

                <Button
                  size="sm"
                  variant={poin.bukti.gambarUrl ? "primary" : "secondary"}
                  className="text-xs gap-1.5 py-1"
                  onClick={() => onOpenBukti(poin)}
                >
                  {poin.bukti.gambarUrl ? (
                    <>
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>
                        {poin.bukti.gambarList && poin.bukti.gambarList.length > 1
                          ? `${poin.bukti.gambarList.length} Foto${
                              new Set(poin.bukti.gambarList.map((g) => g.kelompok).filter(Boolean)).size > 1
                                ? ` (${new Set(poin.bukti.gambarList.map((g) => g.kelompok).filter(Boolean)).size} Kelompok)`
                                : ""
                            }`
                          : "Foto"}
                      </span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>Detail</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
