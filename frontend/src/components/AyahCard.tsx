"use client";
import type { Ayah } from "@/types/quran";
import type { ArabicFont } from "@/types/quran";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
  onPlayAudio: (surahNumber: number, ayahNumber: number) => void;
  isPlaying: boolean;
  isLoading: boolean;
  index: number;
}

const fontClassMap: Record<ArabicFont, string> = {
  amiri: "arabic-font-amiri",
  scheherazade: "arabic-font-scheherazade",
  uthmanic: "arabic-font-uthmanic",
};

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

export default function AyahCard({
  ayah,
  surahNumber,
  arabicFont,
  arabicFontSize,
  translationFontSize,
  onPlayAudio,
  isPlaying,
  isLoading,
  index,
}: AyahCardProps) {
  const handleCopy = () => {
    const text = `${ayah.text}\n\n${ayah.translation}\n\n[Surah ${surahNumber}, Ayah ${ayah.numberInSurah}]`;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={`group border border-border/60 rounded-xl p-6 bg-bg-card hover:bg-bg-hover transition-all duration-300 hover:border-border-light
        ${isPlaying ? "border-accent-gold/40 bg-accent-gold/5" : ""}`}
      style={{
        animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
        animation: "fadeInUp 0.4s ease-out forwards",
        opacity: 0,
      }}
    >
      {/* Verse number + controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Verse number badge */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-gold to-yellow-700 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white text-xs font-bold">{ayah.numberInSurah}</span>
          </div>
          <div className="text-xs text-text-muted">
            <span>Juz {ayah.juz}</span>
            <span className="mx-1">·</span>
            <span>Page {ayah.page}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy ayah"
            className="w-8 h-8 rounded-lg bg-bg-secondary hover:bg-bg-hover text-text-muted hover:text-text-primary transition-all flex items-center justify-center"
          >
            <CopyIcon />
          </button>

          {/* Bookmark */}
          <button
            title="Bookmark"
            className="w-8 h-8 rounded-lg bg-bg-secondary hover:bg-bg-hover text-text-muted hover:text-text-primary transition-all flex items-center justify-center"
          >
            <BookmarkIcon />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => onPlayAudio(surahNumber, ayah.numberInSurah)}
            title={isPlaying ? "Pause" : "Play recitation"}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all shadow-md
              ${isPlaying
                ? "bg-accent-gold text-bg-primary"
                : "bg-accent-gold/20 hover:bg-accent-gold text-accent-gold hover:text-bg-primary"
              }`}
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </div>
      </div>

      {/* Playing indicator */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 mb-3 h-4">
          <div className="playing-indicator flex items-end gap-0.5 h-full">
            <span /><span /><span /><span />
          </div>
          <span className="text-xs text-accent-gold ml-2 font-medium">Playing...</span>
        </div>
      )}

      {/* Arabic Text */}
      <div
        className={`text-right leading-loose text-text-arabic mb-4 ${fontClassMap[arabicFont]}`}
        style={{ fontSize: `${arabicFontSize}px`, direction: "rtl" }}
      >
        {ayah.text}
      </div>

      {/* Divider */}
      <div className="border-t border-border/60 my-4" />

      {/* Translation */}
      <p
        className="text-text-secondary leading-relaxed"
        style={{ fontSize: `${translationFontSize}px` }}
      >
        {ayah.translation}
      </p>

      {ayah.sajda && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
          <span className="text-xs text-accent-gold font-medium">Sajda (Prostration)</span>
        </div>
      )}
    </div>
  );
}
