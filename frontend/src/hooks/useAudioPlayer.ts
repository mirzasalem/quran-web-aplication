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
  isSurahMode: boolean;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const surahAyahsRef = useRef<number[]>([]);
  const surahNumberRef = useRef<number | null>(null);

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentSurah: null,
    currentAyah: null,
    progress: 0,
    duration: 0,
    isSurahMode: false,
  });

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;


    const handleEnded = () => {
      console.log("=== ENDED ===");
      console.log("surahAyahsRef:", surahAyahsRef.current);
      console.log("audio.dataset.ayah:", audio.dataset.ayah);
      console.log("surahNumberRef:", surahNumberRef.current);

      const ayahs = surahAyahsRef.current;
      const currentAyah = audio.dataset.ayah
        ? parseInt(audio.dataset.ayah)
        : null;
      const currentIdx = ayahs.indexOf(currentAyah!);

      console.log("currentAyah:", currentAyah);
      console.log("currentIdx:", currentIdx);
      console.log("ayahs.length:", ayahs.length);

    // const handleEnded = () => {
    //   const ayahs = surahAyahsRef.current;
    //   const currentAyah = audio.dataset.ayah
    //     ? parseInt(audio.dataset.ayah)
    //     : null;
    //   const currentIdx = ayahs.indexOf(currentAyah!);

      if (
        ayahs.length > 0 &&
        currentIdx !== -1 &&
        currentIdx < ayahs.length - 1
      ) {
        // there is a next ayah — play it
        const nextAyah = ayahs[currentIdx + 1];
        const surah = surahNumberRef.current!;

        audio.dataset.ayah = String(nextAyah);
        audio.src = getAudioUrl(surah, nextAyah);
        audio.load();
        audio.play().catch(console.error);

        setState((s) => ({
          ...s,
          currentAyah: nextAyah,
          isLoading: true,
          isPlaying: false,
        }));
      } else {
        // finished all ayahs
        surahAyahsRef.current = [];
        setState((s) => ({
          ...s,
          isPlaying: false,
          isLoading: false,
          progress: 0,
          isSurahMode: false,
        }));
      }
    };

    const handlePlaying = () => {
      // fires when audio actually starts playing (after load)
      setState((s) => ({ ...s, isPlaying: true, isLoading: false }));
    };

    const handleWaiting = () => {
      // fires when audio is buffering
      setState((s) => ({ ...s, isLoading: true }));
    };

    const handleTimeUpdate = () =>
      setState((s) => ({ ...s, progress: audio.currentTime }));

    const handleDurationChange = () =>
      setState((s) => ({ ...s, duration: audio.duration || 0 }));

    const handleError = () => {
      console.error("Audio error", audio.error);
      setState((s) => ({ ...s, isPlaying: false, isLoading: false }));
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("error", handleError);
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

      // toggle pause/resume if same ayah
      if (isSame && state.isPlaying) {
        audio.pause();
        setState((s) => ({ ...s, isPlaying: false }));
        return;
      }
      if (isSame && !state.isPlaying) {
        audio.play().catch(console.error);
        return;
      }

      // new ayah — clear surah mode
      surahAyahsRef.current = [];

      audio.pause();
      audio.dataset.ayah = String(ayahNumber);
      audio.src = getAudioUrl(surahNumber, ayahNumber);
      audio.load();
      audio.play().catch(console.error);

      setState((s) => ({
        ...s,
        isLoading: true,
        isPlaying: false,
        isSurahMode: false,
        currentSurah: surahNumber,
        currentAyah: ayahNumber,
        progress: 0,
      }));
    },
    [state.currentSurah, state.currentAyah, state.isPlaying]
  );

  const playSurah = useCallback(
    (surahNumber: number, ayahNumbers: number[]) => {
      const audio = audioRef.current;
      if (!audio) return;

      // store full list so handleEnded can auto-advance
      surahAyahsRef.current = ayahNumbers;
      surahNumberRef.current = surahNumber;

      const firstAyah = ayahNumbers[0];

      audio.pause();
      audio.dataset.ayah = String(firstAyah);
      audio.src = getAudioUrl(surahNumber, firstAyah);
      audio.load();
      audio.play().catch(console.error);

      setState((s) => ({
        ...s,
        isLoading: true,
        isPlaying: false,
        isSurahMode: true,
        currentSurah: surahNumber,
        currentAyah: firstAyah,
        progress: 0,
      }));
    },
    []
  );

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    surahAyahsRef.current = [];
    setState((s) => ({
      ...s,
      isPlaying: false,
      isLoading: false,
      progress: 0,
      isSurahMode: false,
    }));
  }, []);

  const isAyahPlaying = (surahNumber: number, ayahNumber: number) =>
    state.currentSurah === surahNumber &&
    state.currentAyah === ayahNumber &&
    state.isPlaying;

  const isAyahLoading = (surahNumber: number, ayahNumber: number) =>
    state.currentSurah === surahNumber &&
    state.currentAyah === ayahNumber &&
    state.isLoading;

  const isSurahPlaying = (surahNumber: number) =>
    state.currentSurah === surahNumber &&
    state.isSurahMode &&
    state.isPlaying;

  return {
    state,
    playAyah,
    playSurah,
    stop,
    isAyahPlaying,
    isAyahLoading,
    isSurahPlaying,
  };
}