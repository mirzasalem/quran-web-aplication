import type { Surah, SurahDetail, SearchResult } from "@/types/quran";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Unknown error");
  return json.data as T;
}

export async function getSurahs(): Promise<Surah[]> {
  return fetchAPI<Surah[]>("/api/surahs");
}

export async function getSurah(number: number): Promise<SurahDetail> {
  return fetchAPI<SurahDetail>(`/api/surah/${number}`);
}

export async function searchAyahs(
  query: string,
  lang: "en" | "ar" = "en"
): Promise<SearchResult[]> {
  return fetchAPI<SearchResult[]>(
    `/api/search?q=${encodeURIComponent(query)}&lang=${lang}`
  );
}

export function getAudioUrl(surahNumber: number, ayahNumber: number): string {
  const paddedSurah = surahNumber.toString().padStart(3, "0");
  const paddedAyah = ayahNumber.toString().padStart(3, "0");
  return `https://everyayah.com/data/Alafasy_128kbps/${paddedSurah}${paddedAyah}.mp3`;
}
