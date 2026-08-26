"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  FileCheck,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Sun,
  Moon,
  Tv,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import { dataRevisi } from "@/data/revisi";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSelesai = dataRevisi.mahasiswa.statusRevisi === "Selesai";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm"
          : "bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight text-sm sm:text-base">
                Verifikasi Revisi Skripsi
              </span>
              <span className="hidden sm:inline-block">
                {isSelesai ? (
                  <Badge variant="success" className="gap-1 py-0.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ACC Final
                  </Badge>
                ) : (
                  <Badge variant="warning" className="gap-1 py-0.5 text-[11px]">
                    <Clock className="w-3 h-3 text-amber-500 animate-pulse" />
                    Menunggu Review
                  </Badge>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              {dataRevisi.mahasiswa.programStudi} • {dataRevisi.mahasiswa.fakultas}
            </p>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <a
            href="#hero"
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Informasi
          </a>
          <a
            href="#revisi"
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Poin Revisi
          </a>
          <a
            href="#demo-video"
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Demo Video
          </a>
          <a
            href="#pdf-viewer"
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Dokumen PDF
          </a>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
              title={theme === "dark" ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 animate-fade-in" />
              )}
            </button>
          )}

          <a href="#demo-video" className="hidden sm:inline-flex">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs font-semibold">
              <Tv className="w-3.5 h-3.5" />
              <span>Demo Video</span>
            </Button>
          </a>

          <a href="#pdf-viewer">
            <Button size="sm" variant="primary" className="gap-1.5 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>Lihat Naskah</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
