"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Download,
  CheckCircle2,
  Tv,
  Layers,
  Sparkles,
  Loader2,
  Sliders,
  PictureInPicture,
} from "lucide-react";
import { VideoDemo } from "@/types/revisi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoDemoSectionProps {
  video: VideoDemo;
}

export function VideoDemoSection({ video }: VideoDemoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Async load on mount
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setIsLoading(true);
    // Explicitly load video asynchronously
    videoEl.load();

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setIsBuffering(false);
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.addEventListener("canplay", handleCanPlay);
    videoEl.addEventListener("waiting", handleWaiting);
    videoEl.addEventListener("playing", handlePlaying);
    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("ended", handleEnded);

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("canplay", handleCanPlay);
      videoEl.removeEventListener("waiting", handleWaiting);
      videoEl.removeEventListener("playing", handlePlaying);
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("ended", handleEnded);
    };
  }, [video.url]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Async reload video
  const handleReloadAsync = useCallback(() => {
    if (!videoRef.current) return;
    setIsReloading(true);
    setIsBuffering(true);
    const videoEl = videoRef.current;

    // Reset state and async reload
    videoEl.pause();
    setIsPlaying(false);
    videoEl.currentTime = 0;
    setCurrentTime(0);

    setTimeout(() => {
      videoEl.load();
      videoEl.oncanplay = () => {
        setIsReloading(false);
        setIsBuffering(false);
        setIsLoading(false);
        videoEl.oncanplay = null;
      };
    }, 200);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Autoplay/play error:", err);
      });
    }
  }, [isPlaying]);

  // Handle seek timeline
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Change playback speed
  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Toggle PiP
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error("PiP error:", err);
    }
  };

  // Reset to start
  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Auto-hide controls on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
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
              Demo Aplikasi Interaktif (APK & Web)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {video.judul}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {video.deskripsi}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Reload Video Async Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleReloadAsync}
              disabled={isReloading}
              className="gap-1.5 text-xs font-semibold hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              title="Muat ulang pemutar video secara asinkron"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? "animate-spin text-indigo-600" : "text-slate-600 dark:text-slate-300"}`} />
              <span>{isReloading ? "Memuat Ulang..." : "Reload Video Async"}</span>
            </Button>

            {/* Download Video Button */}
            <a href={video.url} download="Demo_Aplikasi_Skripsi_PT_MJU.mp4">
              <Button size="sm" variant="primary" className="gap-1.5 text-xs font-semibold shadow-sm">
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Video MP4</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Video Player Card */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative bg-slate-950 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden group select-none"
        >
          {/* Main Video Element */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={video.url}
              preload="auto"
              playsInline
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Loading / Buffering Spinner Overlay */}
            {(isLoading || isBuffering || isReloading) && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-20 pointer-events-none transition-opacity">
                <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
                <span className="text-xs sm:text-sm font-medium text-white/90 tracking-wide bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/50">
                  {isReloading ? "Memuat ulang berkas video..." : "Memuat demo aplikasi..."}
                </span>
              </div>
            )}

            {/* Big Center Play Button Overlay (when paused and not loading) */}
            {!isPlaying && !isLoading && !isBuffering && !isReloading && (
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-10 transition-all group-hover:bg-black/40">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 transform group-hover:scale-110 transition-all duration-200 ring-4 ring-white/20"
                  title="Putar Video Demo"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
                </button>
              </div>
            )}
          </div>

          {/* Custom Controls Bar */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-5 transition-opacity duration-300 z-30 ${
              showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Progress Timeline Scrubber */}
            <div className="space-y-1 mb-3">
              <div className="relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 sm:h-2 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 104)}</span>
              </div>
            </div>

            {/* Player Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-white">
              {/* Left Controls: Play/Pause, Restart, Volume */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title={isPlaying ? "Jeda (Pause)" : "Putar (Play)"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Ulangi dari Awal"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5 pl-1">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title={isMuted ? "Bunyikan Suara" : "Bisukan (Mute)"}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="hidden sm:block w-16 sm:w-20 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                    title="Volume"
                  />
                </div>
              </div>

              {/* Right Controls: Playback Speed, PiP, Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Playback Speed Selector */}
                <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/10 text-xs">
                  {[1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => changeSpeed(rate)}
                      className={`px-2 py-1 rounded-lg font-bold transition-all ${
                        playbackRate === rate
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* PiP */}
                <button
                  type="button"
                  onClick={togglePiP}
                  className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors hidden sm:inline-flex"
                  title="Picture-in-Picture"
                >
                  <PictureInPicture className="w-4 h-4" />
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Video Footer Info & Key Features */}
          <div className="p-6 sm:p-8 bg-slate-900 border-t border-slate-800 text-slate-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Feature Tags */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Fitur Utama yang Didemonstrasikan pada APK
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {video.fiturUtama?.map((fitur, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-800/90 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {fitur}
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges Info */}
              <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                {video.durasi && (
                  <Badge variant="secondary" className="px-3 py-1 text-xs bg-slate-800 text-slate-200 border-slate-700">
                    Durasi: {video.durasi}
                  </Badge>
                )}
                {video.resolusi && (
                  <Badge variant="default" className="px-3 py-1 text-xs bg-indigo-600 text-white">
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

