"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { searchAyahs } from "@/lib/api";
import type { SearchResult } from "@/types/quran";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function highlightText(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setError("");
    }
  }, [isOpen]);


  const handleSearch = useCallback(
  (q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) {
      setResults([]);
      setError("");
      return;
    }

  // const handleSearch = useCallback(
  //   (q: string) => {
  //     if (debounceRef.current) clearTimeout(debounceRef.current);
  //     if (q.length < 2) {
  //       setResults([]);
  //       setError("");
  //       return;
  //     }
      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        setError("");
        try {
          const data = await searchAyahs(q, lang);
          setResults(data);
        } catch {
          setError("Search failed. Please try again.");
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 400);
    },
    [lang]
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <svg width="18" height="18" className="text-text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by translation or Arabic text..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-sm focus:outline-none"
          />

          {/* Language Toggle */}
          <div className="flex gap-1 bg-bg-secondary rounded-lg p-1">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                lang === "en" ? "bg-accent-gold text-bg-primary" : "text-text-muted hover:text-text-primary"
              }`}
            >EN</button>
            <button
              onClick={() => setLang("ar")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                lang === "ar" ? "bg-accent-gold text-bg-primary" : "text-text-muted hover:text-text-primary"
              }`}
            >AR</button>
          </div>

          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-sm">
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-sm text-text-muted">Searching...</span>
            </div>
          )}

          {error && (
            <div className="px-5 py-8 text-center">
              <span className="text-2xl">⚠️</span>
              <p className="text-sm text-red-400 mt-2">{error}</p>
            </div>
          )}

          {!isLoading && !error && results.length === 0 && query.length >= 2 && (
            <div className="px-5 py-8 text-center">
              <span className="text-3xl">🔍</span>
              <p className="text-sm text-text-muted mt-2">No results found for "{query}"</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <>
              <div className="px-5 py-2 border-b border-border bg-bg-secondary">
                <span className="text-xs text-text-muted">{results.length} result(s) found</span>
              </div>
              {results.map((result, idx) => (
                <Link
                  key={`${result.surahNumber}-${result.ayah.numberInSurah}-${idx}`}
                  href={`/surah/${result.surahNumber}#ayah-${result.ayah.numberInSurah}`}
                  onClick={onClose}
                  className="block px-5 py-4 border-b border-border/60 hover:bg-bg-hover transition-colors"
                >
                  {/* Surah info */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded font-medium">
                      {result.surahEnglishName}
                    </span>
                    <span className="text-xs text-text-muted">
                      Ayah {result.ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-text-muted ml-auto">#{result.surahNumber}</span>
                  </div>

                  {/* Arabic text */}
                  <p
                    className="text-right text-text-arabic text-base font-arabic mb-2 leading-loose"
                    dir="rtl"
                    dangerouslySetInnerHTML={{
                      __html: lang === "ar"
                        ? highlightText(result.ayah.text, query)
                        : result.ayah.text,
                    }}
                  />

                  {/* Translation */}
                  <p
                    className="text-sm text-text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: lang === "en"
                        ? highlightText(result.ayah.translation, query)
                        : result.ayah.translation,
                    }}
                  />
                </Link>
              ))}
            </>
          )}

          {query.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-text-arabic text-xl font-arabic mb-2" dir="rtl">وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ</p>
              <p className="text-sm text-text-muted">Search across all 114 surahs</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
