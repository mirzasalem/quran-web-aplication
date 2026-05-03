import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { SURAHS } from "./quranData.js";

const app = new Hono();

// Middleware
app.use("*", cors({ origin: "*" }));
app.use("*", logger());

// Types
interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

// Cache for API responses
const surahCache = new Map<number, SurahData>();
const searchCache = new Map<string, Ayah[]>();

// Fetch surah from external Quran API
async function fetchSurahFromAPI(surahNumber: number): Promise<SurahData | null> {
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  try {
    // Fetch Arabic text
    const arabicRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}`
    );
    // Fetch English translation
    const englishRes = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`
    );

    if (!arabicRes.ok || !englishRes.ok) {
      throw new Error("API fetch failed");
    }

    const arabicData = await arabicRes.json() as any;
    const englishData = await englishRes.json() as any;

    const surahMeta = SURAHS.find((s) => s.number === surahNumber)!;

    const ayahs: Ayah[] = arabicData.data.ayahs.map((ayah: any, idx: number) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      translation: englishData.data.ayahs[idx]?.text || "",
      juz: ayah.juz,
      page: ayah.page,
      hizbQuarter: ayah.hizbQuarter,
      sajda: ayah.sajda,
    }));

    const result: SurahData = {
      ...surahMeta,
      ayahs,
    };

    surahCache.set(surahNumber, result);
    return result;
  } catch (err) {
    console.error(`Error fetching surah ${surahNumber}:`, err);
    return null;
  }
}

// GET /api/surahs - List all surahs
app.get("/api/surahs", (c) => {
  return c.json({
    success: true,
    data: SURAHS,
    total: SURAHS.length,
  });
});

// GET /api/surah/:number - Get specific surah with ayahs
app.get("/api/surah/:number", async (c) => {
  const numberParam = c.req.param("number");
  const surahNumber = parseInt(numberParam, 10);

  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return c.json({ success: false, error: "Invalid surah number (1-114)" }, 400);
  }

  const surah = await fetchSurahFromAPI(surahNumber);

  if (!surah) {
    return c.json({ success: false, error: "Failed to fetch surah data" }, 500);
  }

  return c.json({ success: true, data: surah });
});

// GET /api/search?q=query&lang=en|ar - Search ayahs
app.get("/api/search", async (c) => {
  const query = c.req.query("q")?.trim().toLowerCase() || "";
  const lang = c.req.query("lang") || "en";
  const surahFilter = c.req.query("surah");

  if (!query || query.length < 2) {
    return c.json({ success: false, error: "Query must be at least 2 characters" }, 400);
  }

  const cacheKey = `${query}|${lang}|${surahFilter}`;
  if (searchCache.has(cacheKey)) {
    return c.json({ success: true, data: searchCache.get(cacheKey), cached: true });
  }

  try {
    const results: Array<{
      surahNumber: number;
      surahName: string;
      surahEnglishName: string;
      ayah: Ayah;
    }> = [];

    // Search through a subset of surahs or all
    const surahsToSearch = surahFilter
      ? [parseInt(surahFilter)]
      : Array.from({ length: 114 }, (_, i) => i + 1); 
    const BATCH_SIZE = 10;
    for (let i = 0; i < surahsToSearch.length; i += BATCH_SIZE) {
      const batch = surahsToSearch.slice(i, i + BATCH_SIZE);
      const surahDatas = await Promise.all(batch.map(num => fetchSurahFromAPI(num)))    ;

    // for (const num of surahsToSearch) {
    //   const surahData = await fetchSurahFromAPI(num);
      if (!surahData) continue;

      for (const ayah of surahData.ayahs) {
        const searchText = lang === "ar" ? ayah.text : ayah.translation;
        if (searchText.toLowerCase().includes(query)) {
          results.push({
            surahNumber: surahData.number,
            surahName: surahData.name,
            surahEnglishName: surahData.englishName,
            ayah,
          });
          if (results.length >= 50) break;
        }
      }
      if (results.length >= 50) break;
    }

    searchCache.set(cacheKey, results as any);
    return c.json({ success: true, data: results, total: results.length });
  } catch (err) {
    return c.json({ success: false, error: "Search failed" }, 500);
  }
});

// GET /api/audio/:surahNumber/:ayahNumber - Get audio URL
app.get("/api/audio/:surahNumber/:ayahNumber", (c) => {
  const surahNumber = parseInt(c.req.param("surahNumber"), 10);
  const ayahNumber = parseInt(c.req.param("ayahNumber"), 10);

  if (isNaN(surahNumber) || isNaN(ayahNumber)) {
    return c.json({ success: false, error: "Invalid parameters" }, 400);
  }

  // Using Mishary Rashid Alafasy from everyayah.com (free CDN)
  const paddedSurah = surahNumber.toString().padStart(3, "0");
  const paddedAyah = ayahNumber.toString().padStart(3, "0");
  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${paddedSurah}${paddedAyah}.mp3`;

  return c.json({
    success: true,
    data: {
      url: audioUrl,
      surahNumber,
      ayahNumber,
      reciter: "Mishary Rashid Alafasy",
    },
  });
});

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = parseInt(process.env.PORT || "3001", 10);

export default {
  port,
  fetch: app.fetch,
};
