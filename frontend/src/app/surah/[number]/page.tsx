"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import IconSidebar from "@/components/IconSidebar";
import SurahSidebar from "@/components/SurahSidebar";
import SearchModal from "@/components/SearchModal";
import FontSettingsPanel from "@/components/FontSettingsPanel";
import AyahCard from "@/components/AyahCard";
import { useFontSettings } from "@/hooks/useFontSettings";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { getSurah } from "@/lib/api";
import { SURAHS } from "@/lib/surahs";
import type { SurahDetail } from "@/types/quran";

export default function SurahPage() {
  const params = useParams();
  const surahNumber = parseInt(params.number as string, 10);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [fontSettingsOpen, setFontSettingsOpen] = useState(false);
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { settings, updateSettings } = useFontSettings();
  const { playAyah, isAyahPlaying, isAyahLoading } = useAudioPlayer();

  const surahMeta = SURAHS.find((s) => s.number === surahNumber);
  const prevSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  const fetchSurah = useCallback(async () => {
    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
      setError("Invalid surah number");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const data = await getSurah(surahNumber);
      setSurah(data);
    } catch {
      setError("Failed to load surah. Please check that the backend is running on port 3001.");
    } finally {
      setIsLoading(false);
    }
  }, [surahNumber]);

  useEffect(() => {
    fetchSurah();
  }, [fetchSurah]);

  const fontClassMap: Record<string, string> = {
    amiri: "arabic-font-amiri",
    scheherazade: "arabic-font-scheherazade",
    uthmanic: "arabic-font-uthmanic",
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <IconSidebar
        onSearchOpen={() => setSearchOpen(true)}
        onFontSettingsOpen={() => setFontSettingsOpen(true)}
        onSurahSidebarToggle={() => setSidebarOpen((v) => !v)}
      />
      <SurahSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeSurah={surahNumber} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FontSettingsPanel isOpen={fontSettingsOpen} onClose={() => setFontSettingsOpen(false)} settings={settings} onUpdate={updateSettings} />

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-[calc(56px+288px)]" : "lg:ml-14"} ml-14 min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 z-20 bg-bg-primary/90 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button className="lg:hidden text-text-muted hover:text-text-primary flex-shrink-0" onClick={() => setSidebarOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
              <Link href="/" className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </Link>
              {surahMeta && (
                <h1 className="text-sm font-semibold text-text-primary truncate">
                  {surahMeta.englishName}
                  <span className="text-text-muted font-normal ml-2 hidden sm:inline">({surahMeta.englishNameTranslation})</span>
                </h1>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setFontSettingsOpen(true)} className="w-8 h-8 rounded-lg bg-bg-card border border-border text-text-muted hover:text-accent-gold hover:border-accent-gold/40 transition-all flex items-center justify-center" title="Font Settings">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
                </svg>
              </button>
              <button onClick={() => setSearchOpen(true)} className="w-8 h-8 rounded-lg bg-bg-card border border-border text-text-muted hover:text-accent-gold hover:border-accent-gold/40 transition-all flex items-center justify-center" title="Search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          {/* Surah Header Card */}
          {surahMeta && (
            <div className="relative my-8 text-center py-10 px-6 rounded-2xl overflow-hidden bg-gradient-to-br from-bg-card via-bg-secondary to-bg-card border border-border">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />
              </div>
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-accent-gold/40 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-accent-gold/40 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-accent-gold/40 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-accent-gold/40 rounded-br-lg" />
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/40" />
                  <span className="text-xs text-accent-gold font-semibold uppercase tracking-widest">Surah {surahMeta.number}</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/40" />
                </div>
                <h1 className={`text-4xl sm:text-5xl text-text-arabic mb-3 leading-loose ${fontClassMap[settings.arabicFont]}`} dir="rtl">
                  {surahMeta.name}
                </h1>
                <p className="text-xl font-semibold text-text-primary mb-1">{surahMeta.englishName}</p>
                <p className="text-sm text-text-muted mb-4">{surahMeta.englishNameTranslation}</p>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <span className={`px-3 py-1 rounded-full ${surahMeta.revelationType === "Meccan" ? "bg-orange-900/30 text-orange-400 border border-orange-900/40" : "bg-teal-900/30 text-teal-400 border border-teal-900/40"}`}>
                    {surahMeta.revelationType}
                  </span>
                  <span className="text-text-muted">{surahMeta.numberOfAyahs} Ayahs</span>
                </div>
                {surahMeta.number !== 1 && surahMeta.number !== 9 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className={`text-text-arabic leading-loose ${fontClassMap[settings.arabicFont]}`} style={{ fontSize: `${settings.arabicFontSize * 0.85}px`, direction: "rtl" }}>
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    <p className="text-xs text-text-muted mt-1">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-bg-card border border-border rounded-xl p-6 animate-pulse">
                  <div className="flex gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-bg-hover" />
                    <div className="flex-1 h-3 bg-bg-hover rounded mt-3" />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-5 bg-bg-hover rounded w-3/4 ml-auto" />
                    <div className="h-5 bg-bg-hover rounded w-5/6 ml-auto" />
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="h-3 bg-bg-hover rounded w-full" />
                    <div className="h-3 bg-bg-hover rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-text-primary font-semibold mb-2">Failed to Load</h3>
              <p className="text-text-muted text-sm mb-6">{error}</p>
              <button onClick={fetchSurah} className="px-4 py-2 bg-accent-gold text-bg-primary rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Try Again
              </button>
            </div>
          )}

          {/* Ayahs */}
          {surah && !isLoading && (
            <div className="space-y-4">
              {surah.ayahs.map((ayah, idx) => (
                <AyahCard
                  key={ayah.numberInSurah}
                  ayah={ayah}
                  surahNumber={surahNumber}
                  arabicFont={settings.arabicFont}
                  arabicFontSize={settings.arabicFontSize}
                  translationFontSize={settings.translationFontSize}
                  onPlayAudio={playAyah}
                  isPlaying={isAyahPlaying(surahNumber, ayah.numberInSurah)}
                  isLoading={isAyahLoading(surahNumber, ayah.numberInSurah)}
                  index={idx}
                />
              ))}
            </div>
          )}

          {/* Prev/Next Navigation */}
          {!isLoading && !error && (
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
              {prevSurah ? (
                <Link href={`/surah/${prevSurah}`} className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-border-light transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                  {SURAHS.find((s) => s.number === prevSurah)?.englishName}
                </Link>
              ) : <div />}
              {nextSurah ? (
                <Link href={`/surah/${nextSurah}`} className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary hover:border-border-light transition-all">
                  {SURAHS.find((s) => s.number === nextSurah)?.englishName}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}