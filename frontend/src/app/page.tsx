"use client";
import { useState } from "react";
import Link from "next/link";
import IconSidebar from "@/components/IconSidebar";
import SurahSidebar from "@/components/SurahSidebar";
import SearchModal from "@/components/SearchModal";
import FontSettingsPanel from "@/components/FontSettingsPanel";
import { useFontSettings } from "@/hooks/useFontSettings";
import { SURAHS } from "@/lib/surahs";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [fontSettingsOpen, setFontSettingsOpen] = useState(false);
  const { settings, updateSettings } = useFontSettings();

  const featuredSurahs = [1, 36, 67, 55, 56, 18];

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <IconSidebar
        onSearchOpen={() => setSearchOpen(true)}
        onFontSettingsOpen={() => setFontSettingsOpen(true)}
        onSurahSidebarToggle={() => setSidebarOpen((v) => !v)}
      />
      <SurahSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FontSettingsPanel
        isOpen={fontSettingsOpen}
        onClose={() => setFontSettingsOpen(false)}
        settings={settings}
        onUpdate={updateSettings}
      />

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-[calc(56px+288px)]" : "lg:ml-14"} ml-14`}>
        <header className="sticky top-0 z-20 bg-bg-primary/90 backdrop-blur-md border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-text-muted hover:text-text-primary" onClick={() => setSidebarOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
              <h1 className="text-lg font-semibold gold-gradient-text">Al-Quran Al-Kareem</h1>
            </div>
            <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-lg text-sm text-text-muted hover:text-text-primary hover:border-border-light transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span className="hidden sm:inline">Search ayahs...</span>
            </button>
          </div>
        </header>

        <section className="relative px-6 py-16 text-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <p className="text-text-arabic font-arabic mb-6 leading-loose" style={{ fontSize: "36px", direction: "rtl" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-text-muted text-sm mb-8">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
            <h2 className="text-3xl font-bold text-text-primary mb-3">The Holy <span className="gold-gradient-text">Quran</span></h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
              Read, listen, and reflect on the words of Allah. 114 Surahs with Arabic text, English translation, and beautiful recitation.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              {[
                { color: "bg-accent-gold", label: "114 Surahs" },
                { color: "bg-accent-teal", label: "6,236 Ayahs" },
                { color: "bg-accent-green", label: "Audio Recitation" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 bg-bg-card rounded-full border border-border">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-text-secondary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-8">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Popular Surahs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSurahs.map((num) => {
              const surah = SURAHS.find((s) => s.number === num);
              if (!surah) return null;
              return (
                <Link key={num} href={`/surah/${num}`} className="group flex items-center justify-between p-4 bg-bg-card border border-border rounded-xl hover:border-accent-gold/40 hover:bg-bg-hover transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-gold/20 to-yellow-900/20 border border-accent-gold/20 flex items-center justify-center text-sm font-bold text-accent-gold group-hover:from-accent-gold group-hover:text-bg-primary transition-all">
                      {surah.number}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{surah.englishName}</p>
                      <p className="text-xs text-text-muted">{surah.numberOfAyahs} verses · {surah.revelationType}</p>
                    </div>
                  </div>
                  <p className="text-base font-arabic text-text-arabic">{surah.name}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="px-6 pb-12">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">All Surahs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {SURAHS.map((surah) => (
              <Link key={surah.number} href={`/surah/${surah.number}`} className="group flex flex-col items-center p-3 bg-bg-card border border-border rounded-xl hover:border-accent-gold/40 hover:bg-bg-hover transition-all text-center">
                <div className="w-8 h-8 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-xs font-bold text-text-muted group-hover:bg-accent-gold group-hover:text-bg-primary group-hover:border-accent-gold transition-all mb-2">
                  {surah.number}
                </div>
                <p className="text-xs font-medium text-text-primary truncate w-full">{surah.englishName}</p>
                <p className="text-xs text-text-muted">{surah.numberOfAyahs}v</p>
                <p className="text-sm font-arabic text-text-arabic mt-1">{surah.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}