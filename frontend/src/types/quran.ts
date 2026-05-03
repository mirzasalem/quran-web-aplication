export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayah: Ayah;
}

export type ArabicFont = "amiri" | "scheherazade" | "uthmanic";

export interface FontSettings {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
}
