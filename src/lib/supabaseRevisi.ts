import { supabase } from "./supabase";
import { DosenPenguji, PoinRevisi, StatusPoinRevisi, StatusVerifikasiPenguji, ReviewerFeedback } from "@/types/revisi";

export interface SupabaseReviewerFeedbackRow {
  id: string; // e.g. "penguji-1_p1-01"
  penguji_id: string;
  poin_id: string;
  status_poin: StatusPoinRevisi;
  status_review: "ACC" | "Perlu Revisi" | "Menunggu";
  diverifikasi_oleh: string;
  catatan_reviewer: string;
  tanggal_verifikasi: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch all reviewer feedback from Supabase
 */
export async function fetchFeedbackFromSupabase(): Promise<Record<string, SupabaseReviewerFeedbackRow>> {
  try {
    const { data, error } = await supabase
      .from("reviewer_feedback")
      .select("*");

    if (error) {
      console.warn("Supabase fetch warning:", error.message);
      return {};
    }

    const feedbackMap: Record<string, SupabaseReviewerFeedbackRow> = {};
    if (data && Array.isArray(data)) {
      data.forEach((row) => {
        feedbackMap[row.id] = row;
      });
    }
    return feedbackMap;
  } catch (err) {
    console.warn("Gagal terhubung ke Supabase:", err);
    return {};
  }
}

/**
 * Save / Upsert a single reviewer decision to Supabase
 */
export async function saveFeedbackToSupabase(
  pengujiId: string,
  poinId: string,
  statusPoin: StatusPoinRevisi,
  reviewerData: ReviewerFeedback
): Promise<boolean> {
  const rowId = `${pengujiId}_${poinId}`;
  try {
    const { error } = await supabase.from("reviewer_feedback").upsert(
      {
        id: rowId,
        penguji_id: pengujiId,
        poin_id: poinId,
        status_poin: statusPoin,
        status_review: reviewerData.statusReview,
        diverifikasi_oleh: reviewerData.diverifikasiOleh,
        catatan_reviewer: reviewerData.catatanReviewer || "",
        tanggal_verifikasi: reviewerData.tanggalVerifikasi || new Date().toISOString().split("T")[0],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Gagal menyimpan feedback ke Supabase:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Supabase upsert error:", err);
    return false;
  }
}

/**
 * Reset all feedback in Supabase to initial status
 */
export async function resetAllFeedbackInSupabase(pengujiList: DosenPenguji[]): Promise<boolean> {
  try {
    const defaultRows: SupabaseReviewerFeedbackRow[] = [];

    pengujiList.forEach((penguji) => {
      penguji.daftarRevisi.forEach((poin) => {
        defaultRows.push({
          id: `${penguji.id}_${poin.id}`,
          penguji_id: penguji.id,
          poin_id: poin.id,
          status_poin: "Dalam Proses",
          status_review: "Menunggu",
          diverifikasi_oleh: penguji.namaLengkap,
          catatan_reviewer: "Menunggu pemeriksaan oleh dosen reviewer.",
          tanggal_verifikasi: "-",
          updated_at: new Date().toISOString(),
        });
      });
    });

    const { error } = await supabase.from("reviewer_feedback").upsert(defaultRows, { onConflict: "id" });
    if (error) {
      console.error("Gagal reset feedback di Supabase:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Supabase reset error:", err);
    return false;
  }
}

/**
 * Helper to merge live Supabase feedback into DosenPenguji structure
 */
export function applyFeedbackToPengujiList(
  initialList: DosenPenguji[],
  feedbackMap: Record<string, SupabaseReviewerFeedbackRow>
): DosenPenguji[] {
  if (!feedbackMap || Object.keys(feedbackMap).length === 0) {
    return initialList;
  }

  return initialList.map((penguji) => {
    const updatedRevisi = penguji.daftarRevisi.map((poin) => {
      const rowId = `${penguji.id}_${poin.id}`;
      const fb = feedbackMap[rowId];
      if (fb) {
        return {
          ...poin,
          status: fb.status_poin || poin.status,
          reviewer: {
            diverifikasiOleh: fb.diverifikasi_oleh || penguji.namaLengkap,
            statusReview: fb.status_review || "Menunggu",
            catatanReviewer: fb.catatan_reviewer,
            tanggalVerifikasi: fb.tanggal_verifikasi,
          },
        };
      }
      return poin;
    });

    const allAcc = updatedRevisi.every(
      (r) => r.status === "Disetujui Penguji" || r.reviewer?.statusReview === "ACC"
    );

    const newStatusVerifikasi: StatusVerifikasiPenguji = allAcc ? "Disetujui" : "Menunggu ACC";

    return {
      ...penguji,
      statusVerifikasi: newStatusVerifikasi,
      daftarRevisi: updatedRevisi,
    };
  });
}
