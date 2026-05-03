"use client";
import { useState, useEffect, useCallback } from "react";
import type { FontSettings, ArabicFont } from "@/types/quran";

const DEFAULT_SETTINGS: FontSettings = {
  arabicFont: "amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
};

const STORAGE_KEY = "quran-font-settings";

export function useFontSettings() {
  const [settings, setSettings] = useState<FontSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FontSettings;
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {}
  }, []);

  const updateSettings = useCallback((updates: Partial<FontSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const getFontClass = (font: ArabicFont): string => {
    switch (font) {
      case "amiri": return "font-arabic";
      case "scheherazade": return "font-arabic2";
      case "uthmanic": return "font-arabic3";
      default: return "font-arabic";
    }
  };

  return { settings, updateSettings, mounted, getFontClass };
}
