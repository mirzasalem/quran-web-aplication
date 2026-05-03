"use client";
import type { FontSettings, ArabicFont } from "@/types/quran";

interface FontSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: FontSettings;
  onUpdate: (updates: Partial<FontSettings>) => void;
}

const FONTS: { id: ArabicFont; label: string; preview: string }[] = [
  { id: "amiri", label: "Amiri", preview: "بِسْمِ اللَّهِ" },
  { id: "scheherazade", label: "Scheherazade", preview: "بِسْمِ اللَّهِ" },
  { id: "uthmanic", label: "Uthmanic", preview: "بِسْمِ اللَّهِ" },
];

const fontClassMap: Record<ArabicFont, string> = {
  amiri: "arabic-font-amiri",
  scheherazade: "arabic-font-scheherazade",
  uthmanic: "arabic-font-uthmanic",
};

export default function FontSettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdate,
}: FontSettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed right-4 top-16 w-80 bg-bg-card border border-border rounded-xl shadow-2xl z-50 animate-fade-in-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-text-primary font-semibold text-sm">Font Settings</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Arabic Font Selection */}
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-wider mb-3">
              Arabic Font
            </label>
            <div className="space-y-2">
              {FONTS.map((font) => (
                <button
                  key={font.id}
                  onClick={() => onUpdate({ arabicFont: font.id })}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all
                    ${settings.arabicFont === font.id
                      ? "border-accent-gold bg-accent-gold/10"
                      : "border-border hover:border-border-light hover:bg-bg-hover"
                    }`}
                >
                  <span className={`text-xs font-medium ${settings.arabicFont === font.id ? "text-accent-gold" : "text-text-secondary"}`}>
                    {font.label}
                  </span>
                  <span
                    className={`text-lg ${fontClassMap[font.id]} text-text-arabic`}
                    style={{ direction: "rtl" }}
                  >
                    {font.preview}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs text-text-muted uppercase tracking-wider">
                Arabic Size
              </label>
              <span className="text-xs text-accent-gold font-semibold bg-accent-gold/10 px-2 py-0.5 rounded">
                {settings.arabicFontSize}px
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="48"
              step="2"
              value={settings.arabicFontSize}
              onChange={(e) => onUpdate({ arabicFontSize: parseInt(e.target.value) })}
              className="w-full accent-accent-gold cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-text-muted">20px</span>
              <span className="text-[10px] text-text-muted">48px</span>
            </div>
          </div>

          {/* Translation Font Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs text-text-muted uppercase tracking-wider">
                Translation Size
              </label>
              <span className="text-xs text-accent-gold font-semibold bg-accent-gold/10 px-2 py-0.5 rounded">
                {settings.translationFontSize}px
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="24"
              step="1"
              value={settings.translationFontSize}
              onChange={(e) => onUpdate({ translationFontSize: parseInt(e.target.value) })}
              className="w-full accent-accent-gold cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-text-muted">12px</span>
              <span className="text-[10px] text-text-muted">24px</span>
            </div>
          </div>

          {/* Preview */}
          <div className="border border-border rounded-lg p-4 bg-bg-secondary">
            <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">Preview</p>
            <p
              className={`text-right text-text-arabic leading-loose ${fontClassMap[settings.arabicFont]}`}
              style={{ fontSize: `${settings.arabicFontSize}px`, direction: "rtl" }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p
              className="text-text-secondary mt-2"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
