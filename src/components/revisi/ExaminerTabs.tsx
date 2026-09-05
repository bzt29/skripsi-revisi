"use client";

import React, { useState, useEffect } from "react";
import { DosenPenguji, PoinRevisi, StatusPoinRevisi, StatusVerifikasiPenguji } from "@/types/revisi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RevisionTable } from "./RevisionTable";
import { RevisionCard } from "./RevisionCard";
import { ImageModal } from "./ImageModal";
import { ReviewerFormModal } from "./ReviewerFormModal";
import {
  UserCheck,
  Award,
  CheckCircle2,
  Clock,
  MessageSquareQuote,
  Sparkles,
  Edit3,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Info,
  Database,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchFeedbackFromSupabase,
  saveFeedbackToSupabase,
  resetAllFeedbackInSupabase,
  applyFeedbackToPengujiList,
} from "@/lib/supabaseRevisi";
import { supabase } from "@/lib/supabase";

interface ExaminerTabsProps {
  pengujiList: DosenPenguji[];
}

const STORAGE_KEY = "skripsi_revisi_reviews_v6";

export function ExaminerTabs({ pengujiList: initialPengujiList }: ExaminerTabsProps) {
  const [pengujiList, setPengujiList] = useState<DosenPenguji[]>(initialPengujiList);
  const [activeTab, setActiveTab] = useState(initialPengujiList[0]?.id || "");
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [isSupabaseOnline, setIsSupabaseOnline] = useState(true);

  const [selectedBukti, setSelectedBukti] = useState<{
    bukti: PoinRevisi["bukti"];
    nomor: number;
    pengujiNama: string;
    reviewer?: PoinRevisi["reviewer"];
  } | null>(null);

  const [selectedPoinForReview, setSelectedPoinForReview] = useState<{
    penguji: DosenPenguji;
    poin: PoinRevisi;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Professional notification toast state
  const [toast, setToast] = useState<{
    title: string;
    message: string;
    type: "success" | "info" | "warning";
  } | null>(null);

  const showToast = (title: string, message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Initial load from Supabase with LocalStorage fallback & Realtime sync
  useEffect(() => {
    let isMounted = true;

    // Load from LocalStorage first for instant render, merging fresh static content
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: DosenPenguji[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mergedWithFreshContent = initialPengujiList.map((penguji) => {
            const savedPenguji = parsed.find((p) => p.id === penguji.id);
            if (!savedPenguji) return penguji;

            const updatedRevisi = penguji.daftarRevisi.map((poin) => {
              const savedPoin = savedPenguji.daftarRevisi?.find((r) => r.id === poin.id);
              if (savedPoin) {
                return {
                  ...poin, // Preserve latest code definitions for bukti, tindakan, dll.
                  status: savedPoin.status || poin.status,
                  reviewer: savedPoin.reviewer || poin.reviewer,
                };
              }
              return poin;
            });

            return {
              ...penguji,
              statusVerifikasi: savedPenguji.statusVerifikasi || penguji.statusVerifikasi,
              daftarRevisi: updatedRevisi,
            };
          });
          setPengujiList(mergedWithFreshContent);
        }
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }

    // Fetch from Supabase
    const loadFromSupabase = async () => {
      setIsCloudSyncing(true);
      try {
        const fbMap = await fetchFeedbackFromSupabase();
        if (isMounted) {
          if (Object.keys(fbMap).length > 0) {
            const merged = applyFeedbackToPengujiList(initialPengujiList, fbMap);
            setPengujiList(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            setIsSupabaseOnline(true);
          }
        }
      } catch (err) {
        console.error("Supabase load error:", err);
        setIsSupabaseOnline(false);
      } finally {
        if (isMounted) setIsCloudSyncing(false);
      }
    };

    loadFromSupabase();

    // Subscribe to Realtime Postgres changes
    const channel = supabase
      .channel("realtime-revisi-reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviewer_feedback" },
        async () => {
          const fbMap = await fetchFeedbackFromSupabase();
          if (isMounted && Object.keys(fbMap).length > 0) {
            const merged = applyFeedbackToPengujiList(initialPengujiList, fbMap);
            setPengujiList(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [initialPengujiList]);

  const handleOpenBukti = (poin: PoinRevisi, pengujiNama: string) => {
    setSelectedBukti({
      bukti: poin.bukti,
      nomor: poin.nomor,
      pengujiNama,
      reviewer: poin.reviewer,
    });
  };

  const handleOpenReviewForm = (penguji: DosenPenguji, poin: PoinRevisi) => {
    setSelectedPoinForReview({ penguji, poin });
  };

  const handleSaveReview = async (
    pengujiId: string,
    poinId: string,
    status: StatusPoinRevisi,
    reviewerData: {
      diverifikasiOleh: string;
      statusReview: "ACC" | "Perlu Revisi" | "Menunggu";
      catatanReviewer: string;
      tanggalVerifikasi: string;
    }
  ) => {
    // 1. Optimistic Local State Update
    const updated = pengujiList.map((p) => {
      if (p.id === pengujiId) {
        const updatedRevisi = p.daftarRevisi.map((r) => {
          if (r.id === poinId) {
            return {
              ...r,
              status,
              reviewer: reviewerData,
            };
          }
          return r;
        });

        // Check if all are ACC
        const allAcc = updatedRevisi.every(
          (r) => r.status === "Disetujui Penguji" || r.reviewer?.statusReview === "ACC"
        );

        const newStatusVerifikasi: StatusVerifikasiPenguji = allAcc ? "Disetujui" : "Menunggu ACC";

        return {
          ...p,
          statusVerifikasi: newStatusVerifikasi,
          daftarRevisi: updatedRevisi,
        };
      }
      return p;
    });

    setPengujiList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Gagal menyimpan reviewer overrides:", e);
    }

    // 2. Persist to Supabase Database
    setIsCloudSyncing(true);
    const success = await saveFeedbackToSupabase(pengujiId, poinId, status, reviewerData);
    setIsCloudSyncing(false);

    // 3. Trigger Toast Notification
    showToast(
      reviewerData.statusReview === "ACC" ? "Verifikasi Disetujui (ACC)" : "Catatan Review Disimpan",
      success
        ? `Keputusan verifikasi telah tersimpan secara permanen ke Supabase Database.`
        : `Keputusan tersimpan di lokal (menunggu sinkronisasi cloud).`,
      reviewerData.statusReview === "ACC" ? "success" : "info"
    );
  };

  const handleResetToDefault = async () => {
    if (window.confirm("Kembalikan seluruh catatan reviewer ke status default (Menunggu)?")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("skripsi_revisi_overrides");
      localStorage.removeItem("skripsi_revisi_overrides_v2");
      setPengujiList(initialPengujiList);

      setIsCloudSyncing(true);
      await resetAllFeedbackInSupabase(initialPengujiList);
      setIsCloudSyncing(false);

      showToast("Data Direset", "Seluruh data reviewer telah dikembalikan ke kondisi default di Supabase.", "info");
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(pengujiList, null, 2));
    setCopied(true);
    showToast("JSON Tersalin", "Data reviewer telah disalin ke clipboard.", "info");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Examiner Tabs Bar & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <TabsList className="w-full sm:w-auto">
            {pengujiList.map((penguji) => (
              <TabsTrigger
                key={penguji.id}
                value={penguji.id}
                className="flex-1 sm:flex-initial text-xs sm:text-sm"
              >
                <Award className="w-4 h-4 text-indigo-500" />
                <span>{penguji.peran}</span>
                <span className="ml-1 text-[11px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                  {penguji.daftarRevisi.length} Butir
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Quick Action Buttons: Supabase Indicator, Salin JSON & Reset */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Supabase Status Indicator Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 rounded-xl text-xs font-semibold shadow-2xs"
              title="Terhubung langsung ke Supabase Database Realtime"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Supabase</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {isCloudSyncing && (
                <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin ml-0.5" />
              )}
            </div>

            <button
              onClick={handleCopyJson}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
              title="Salin Data Reviewer (JSON) untuk di-paste ke revisi.ts"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Salin JSON</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetToDefault}
              className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl text-xs border border-slate-200 dark:border-slate-700 transition-colors"
              title="Reset seluruh review ke status default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {pengujiList.map((penguji) => {
          const isAccPenguji = penguji.statusVerifikasi === "Disetujui";

          return (
            <TabsContent key={penguji.id} value={penguji.id} className="space-y-6">
              {/* Examiner Header Card */}
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50/40 dark:from-slate-900 dark:to-indigo-950/30 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-indigo-600/20 shrink-0">
                      {penguji.namaLengkap.replace("Dr.", "").trim().charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                          {penguji.namaLengkap}
                        </h4>
                        <Badge
                          variant={isAccPenguji ? "success" : "warning"}
                          className="text-[11px] gap-1"
                        >
                          {isAccPenguji ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-600" />
                          )}
                          Status: {penguji.statusVerifikasi}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">NIDN:</span> {penguji.nidn} • {penguji.peran}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-xs">
                      Total:{" "}
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        {penguji.daftarRevisi.length} Butir Revisi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Examiner General Note */}
                {penguji.catatanUmum && (
                  <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-start gap-3 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                    <MessageSquareQuote className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <p className="italic leading-relaxed">
                      &ldquo;{penguji.catatanUmum}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Desktop Table View (Tombol Beri Review Selalu Aktif) */}
              <RevisionTable
                revisiList={penguji.daftarRevisi}
                onOpenBukti={(poin) => handleOpenBukti(poin, penguji.namaLengkap)}
                onReviewPoin={(poin) => handleOpenReviewForm(penguji, poin)}
              />

              {/* Mobile / Tablet Cards View (Tombol Beri Review Selalu Aktif) */}
              <RevisionCard
                revisiList={penguji.daftarRevisi}
                onOpenBukti={(poin) => handleOpenBukti(poin, penguji.namaLengkap)}
                onReviewPoin={(poin) => handleOpenReviewForm(penguji, poin)}
              />
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Lightbox / Modal Bukti */}
      <ImageModal
        isOpen={Boolean(selectedBukti)}
        onClose={() => setSelectedBukti(null)}
        bukti={selectedBukti?.bukti || null}
        nomorPoin={selectedBukti?.nomor || 1}
        pengujiNama={selectedBukti?.pengujiNama || ""}
        reviewer={selectedBukti?.reviewer}
      />

      {/* Form Modal Reviewer Dosen */}
      {selectedPoinForReview && (
        <ReviewerFormModal
          isOpen={Boolean(selectedPoinForReview)}
          onClose={() => setSelectedPoinForReview(null)}
          penguji={selectedPoinForReview.penguji}
          poin={selectedPoinForReview.poin}
          onSaveReview={handleSaveReview}
        />
      )}

      {/* Professional Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm w-full px-4 sm:px-0">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 rounded-2xl p-4 flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === "success"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800"
                  : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Info className="w-4 h-4" />
              )}
            </div>
            <div className="space-y-0.5 pr-2">
              <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {toast.title}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
