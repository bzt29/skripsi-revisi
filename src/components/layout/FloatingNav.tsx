"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function FloatingNav() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside aria-label="Navigasi Cepat" className="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl shadow-lg border border-slate-200/90 dark:border-slate-700/80 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          title="Kembali ke Atas"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
}
