"use client";

import React, { useRef, useState } from "react";
import {
  Play,
  Pause,
  Video,
  Sparkles,
  Download,
  ExternalLink,
  CheckCircle2,
  Tv,
  Layers,
} from "lucide-react";
import { VideoDemo } from "@/types/revisi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoDemoSectionProps {
  video: VideoDemo;
}

export function VideoDemoSection({ video }: VideoDemoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="demo-video" className="py-12 scroll-mt-20">
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full mb-2 border border-indigo-100 dark:border-indigo-800">
              <Tv className="w-4 h-4" />
              Demo Aplikasi Interaktif
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {video.judul}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {video.deskripsi}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a href={video.url} download="Demo_Aplikasi_Skripsi.mp4">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Video MP4</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Video Container */}
          <div className="relative aspect-video bg-slate-950 flex items-center justify-center group overflow-hidden">
            <video
              ref={videoRef}
              src={video.url}
              controls
              playsInline
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {/* Video Footer Info & Key Features */}
          <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Feature Tags */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Fitur Utama yang Didemonstrasikan
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {video.fiturUtama?.map((fitur, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {fitur}
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges Info */}
              <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                {video.durasi && (
                  <Badge variant="secondary" className="px-3 py-1 text-xs">
                    Durasi: {video.durasi}
                  </Badge>
                )}
                {video.resolusi && (
                  <Badge variant="default" className="px-3 py-1 text-xs">
                    Kualitas: {video.resolusi}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
