"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { SURAHS } from "@/lib/surahs";
import type { Surah } from "@/types/quran";

interface SurahSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSurah?: number;
}

export default function SurahSidebar({ isOpen, onClose, activeSurah }: SurahSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "meccan" | "medinan">("all");

  const filteredSurahs = useMemo(() => {
    return SURAHS.filter((s: Surah) => {
      const matchesSearch =
        !searchTerm ||
        s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.includes(searchTerm) ||
        s.number.toString() === searchTerm;
      const matchesFilter =
        filter === "all" ||
        (filter === "meccan" && s.revelationType === "Meccan") ||
        (filter === "medinan" && s.revelationType === "Medinan");
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-14 h-full w-72 bg-bg-sidebar border-r border-border z-30 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-text-primary font-semibold text-sm tracking-wide uppercase">
              Surahs
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden text-text-muted hover:text-text-primary transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search surah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1">
            {(["all", "meccan", "medinan"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 text-xs py-1.5 rounded-md capitalize transition-all ${
                  filter === f
                    ? "bg-accent-gold text-bg-primary font-semibold"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-hover"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Surah List */}
        <div className="flex-1 overflow-y-auto">
          {filteredSurahs.map((surah: Surah, idx: number) => {
            const isActive = activeSurah === surah.number;
            return (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 border-b border-border/40 transition-all duration-200 group
                  ${isActive
                    ? "bg-accent-gold/15 border-l-2 border-l-accent-gold"
                    : "hover:bg-bg-hover"
                  }`}
                style={{ animationDelay: `${idx * 0.01}s` }}
              >
                {/* Number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 
                  ${isActive ? "bg-accent-gold text-bg-primary" : "bg-bg-card text-text-muted group-hover:bg-accent-gold/20 group-hover:text-accent-gold"}`}>
                  {surah.number}
                </div>

                {/* Names */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${isActive ? "text-accent-gold" : "text-text-primary"}`}>
                    {surah.englishName}
                  </div>
                  <div className="text-xs text-text-muted truncate">{surah.englishNameTranslation}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-muted">{surah.numberOfAyahs} verses</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded text-[10px] ${
                      surah.revelationType === "Meccan"
                        ? "bg-orange-900/30 text-orange-400"
                        : "bg-teal-900/30 text-teal-400"
                    }`}>
                      {surah.revelationType}
                    </span>
                  </div>
                </div>

                {/* Arabic name */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-arabic text-text-arabic leading-relaxed">
                    {surah.name}
                  </div>
                </div>
              </Link>
            );
          })}
          {filteredSurahs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-32 text-text-muted">
              <span className="text-2xl mb-2">🔍</span>
              <span className="text-sm">No surahs found</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
