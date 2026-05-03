"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { getAudioUrl } from "@/lib/api";

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSurah: number | null;
  currentAyah: number | null;
  progress: number;
  duration: number;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentSurah: null,
    currentAyah: null,
    progress: 0,
    duration: 0,
  });

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handleEnded = () =>
      setState((s) => ({ ...s, isPlaying: false, progress: 0 }));
    const handleTimeUpdate = () =>
      setState((s) => ({ ...s, progress: audio.currentTime }));
    const handleDurationChange = () =>
      setState((s) => ({ ...s, duration: audio.duration || 0 }));
    const handleCanPlay = () =>
      setState((s) => ({ ...s, isLoading: false }));

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.pause();
    };
  }, []);

  const playAyah = useCallback(
    async (surahNumber: number, ayahNumber: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      const isSame =
        state.currentSurah === surahNumber &&
        state.currentAyah === ayahNumber;

      if (isSame && state.isPlaying) {
        audio.pause();
        setState((s) => ({ ...s, isPlaying: false }));
        return;
      }

      if (isSame && !state.isPlaying) {
        await audio.play();
        setState((s) => ({ ...s, isPlaying: true }));
        return;
      }

      audio.pause();
      setState((s) => ({
        ...s,
        isLoading: true,
        isPlaying: false,
        currentSurah: surahNumber,
        currentAyah: ayahNumber,
        progress: 0,
      }));

      audio.src = getAudioUrl(surahNumber, ayahNumber);
      audio.load();
      try {
        await audio.play();
        setState((s) => ({ ...s, isPlaying: true, isLoading: false }));
      } catch (err) {
        console.error("Audio play failed:", err);
        setState((s) => ({ ...s, isLoading: false }));
      }
    },
    [state.currentSurah, state.currentAyah, state.isPlaying]
  );

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setState((s) => ({ ...s, isPlaying: false, progress: 0 }));
  }, []);

  const isAyahPlaying = (surahNumber: number, ayahNumber: number) =>
    state.currentSurah === surahNumber &&
    state.currentAyah === ayahNumber &&
    state.isPlaying;

  const isAyahLoading = (surahNumber: number, ayahNumber: number) =>
    state.currentSurah === surahNumber &&
    state.currentAyah === ayahNumber &&
    state.isLoading;

  return { state, playAyah, stop, isAyahPlaying, isAyahLoading };
}
