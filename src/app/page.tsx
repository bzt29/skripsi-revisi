import React from "react";
import { dataRevisi } from "@/data/revisi";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { RevisionSection } from "@/components/revisi/RevisionSection";
import { VideoDemoSection } from "@/components/video/VideoDemoSection";
import { PdfViewerSection } from "@/components/pdf/PdfViewerSection";
import { Footer } from "@/components/layout/Footer";
import { FloatingNav } from "@/components/layout/FloatingNav";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Hero Section: Profil Mahasiswa, Judul Skripsi, & Status */}
        <HeroSection data={dataRevisi} />

        {/* Revision Matrix Section: Tab Penguji, Tabel/Kartu Revisi, & Modal Bukti */}
        <RevisionSection pengujiList={dataRevisi.penguji} />

        {/* Video Demo Section: Pemutar Video Demo Aplikasi */}
        {dataRevisi.videoDemo && (
          <VideoDemoSection video={dataRevisi.videoDemo} />
        )}

        {/* PDF Viewer Section: Naskah Lengkap & Tombol Download */}
        <PdfViewerSection dokumen={dataRevisi.dokumenPdf} />
      </main>

      {/* Footer & Disclaimer */}
      <Footer mahasiswa={dataRevisi.mahasiswa} />

      {/* Floating Action Controls */}
      <FloatingNav />
    </div>
  );
}
