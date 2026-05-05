
A full-stack Quran web application built with **Next.js** (frontend) and **Hono + Bun** (backend). Read all 114 Surahs with Arabic text, English translations, per-ayah audio recitation, full surah playback, font customization, and fuzzy search — all in a beautiful dark UI.

> 🔗 **Live Demo:** [https://quran-web-aplication-1.onrender.com/](https://quran-web-aplication-1.onrender.com/)  
> 🐙 **GitHub:** [https://github.com/mirzasalem/quran-web-aplication.git](https://github.com/mirzasalem/quran-web-aplication.git)

---

## 📸 Screenshots

<img width="1820" height="956" alt="Screenshot from 2026-05-05 14-29-22" src="https://github.com/user-attachments/assets/ad24a29e-1596-4fc9-8b89-449bef48d825" />


---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 **Surah Sidebar** | All 114 Surahs with Arabic name, English name, verse count, Meccan/Medinan tag. Filterable & searchable with fuzzy transliteration (type "bakara" → finds Al-Baqarah) |
| 🔤 **Ayah Display** | Arabic text (right-aligned, proper Quranic font) + English translation (Saheeh International). Juz & Page info per ayah |
| 🎵 **Per-Ayah Audio** | Play/pause individual ayahs with Mishary Rashid Alafasy recitation |
| ▶️ **Full Surah Playback** | Play an entire Surah — audio auto-advances through all ayahs, scrolls to the current one |
| 🔡 **Font Settings** | Choose from 3 Arabic fonts (Amiri, Scheherazade, Uthmanic). Adjust Arabic font size (20–48px) and translation font size (12–24px). All settings saved to `localStorage` |
| 🔍 **Search** | Search by English translation or Arabic text across all 114 Surahs |
| 🌙 **Dark Theme** | Deep navy/charcoal UI with gold accents |
| 📱 **Responsive** | Mobile drawer + tablet + desktop sidebar layout |
| ⚡ **SSG** | Next.js Static Site Generation — all 114 Surah pages pre-rendered at build time |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Language | **TypeScript** | Type safety throughout frontend & backend |
| Backend | **Hono + Bun** | Ultra-fast, lightweight API server |
| Frontend | **Next.js 14** | SSG, file-based routing, React Server/Client components |
| Styling | **Tailwind CSS** | Utility-first, custom dark theme tokens |
| Quran Data | **alquran.cloud API** | Free REST API — Arabic (Uthmani script) + Saheeh International translation |
| Audio | **EveryAyah CDN** | Free MP3 recitations by Mishary Rashid Alafasy (128kbps) |
| Fonts | **Google Fonts** | Amiri, Scheherazade New (Arabic) + Lato (Latin) |

---

## 📁 Project Structure

```
quran-app/
│
├── backend/                        # Hono + Bun API server
│   ├── src/
│   │   ├── index.ts                # All API routes (surahs, search, audio)
│   │   └── quranData.ts            # Static metadata for all 114 surahs
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                       # Next.js app
│   ├── next.config.js              # SSG enabled for production builds
│   ├── tailwind.config.ts          # Custom dark theme color tokens
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          # Root layout — Google Fonts, metadata
│       │   ├── globals.css         # Global CSS, Arabic font classes, animations
│       │   ├── page.tsx            # Homepage — hero + all 114 surah cards
│       │   └── surah/
│       │       └── [number]/
│       │           └── page.tsx    # Surah reader — ayahs, audio, navigation
│       │
│       ├── components/
│       │   ├── IconSidebar.tsx     # Left icon navigation bar with tooltips
│       │   ├── SurahSidebar.tsx    # Scrollable surah list with search & filter
│       │   ├── AyahCard.tsx        # Single verse card — Arabic, translation, audio
│       │   ├── FontSettingsPanel.tsx # Font picker + size sliders modal
│       │   └── SearchModal.tsx     # Full-screen search overlay
│       │
│       ├── hooks/
│       │   ├── useAudioPlayer.ts   # Audio state, play/pause, full surah auto-advance
│       │   └── useFontSettings.ts  # Font preferences with localStorage persistence
│       │
│       ├── lib/
│       │   ├── api.ts              # Typed API client (fetches from backend)
│       │   └── surahs.ts           # Client-side surah metadata (all 114)
│       │
│       └── types/
│           └── quran.ts            # TypeScript interfaces (Surah, Ayah, FontSettings)
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- **[Bun](https://bun.sh)** (for the backend) — Install with:
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- **Node.js 18+** and **npm** (for the frontend) — Install from [nodejs.org](https://nodejs.org)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/mirzasalem/quran-web-aplication.git
cd quran-web-aplication
```

---

### Step 2 — Set Up the Backend

```bash
cd backend
bun install
```

Create a `.env` file (optional — defaults work out of the box):
```bash
PORT=3001
```

Start the backend dev server:
```bash
bun run dev
```

✅ Backend is now running at **http://localhost:3001**

Test it:
```bash
curl http://localhost:3001/health
# → { "status": "ok", "cachedSurahs": 0 }

curl http://localhost:3001/api/surahs
# → { "success": true, "data": [...114 surahs] }
```

---

### Step 3 — Set Up the Frontend

Open a **new terminal**, then:

```bash
cd frontend
npm install
```

Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend dev server:
```bash
npm run dev
```

✅ Frontend is now running at **http://localhost:3000**

---

### Step 4 — Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser.

- Click any Surah from the sidebar or homepage grid
- Press **Play Full Surah** to listen to the entire Surah
- Click the **play button** on any individual ayah
- Use the **search icon** to search across all 114 Surahs
- Use the **font icon (T)** to change Arabic font and adjust sizes

---

## 📡 Backend API Reference

All endpoints return JSON in the format `{ success: boolean, data: any }`.

### `GET /health`
Health check. Also shows how many surahs are cached in memory.
```json
{ "status": "ok", "timestamp": "...", "cachedSurahs": 12 }
```

---

### `GET /api/surahs`
Returns metadata for all 114 Surahs (no ayah text — use this for the sidebar).

**Response:**
```json
{
  "success": true,
  "total": 114,
  "data": [
    {
      "number": 1,
      "name": "الفاتحة",
      "englishName": "Al-Fatihah",
      "englishNameTranslation": "The Opening",
      "numberOfAyahs": 7,
      "revelationType": "Meccan"
    },
    ...
  ]
}
```

---

### `GET /api/surah/:number`
Returns a full Surah with all ayahs — Arabic text + English translation.

**Parameters:**
- `number` — Surah number (1–114)

**Example:** `GET /api/surah/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "number": 1,
    "name": "الفاتحة",
    "englishName": "Al-Fatihah",
    "numberOfAyahs": 7,
    "revelationType": "Meccan",
    "ayahs": [
      {
        "number": 1,
        "numberInSurah": 1,
        "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "translation": "In the name of Allah, the Entirely Merciful...",
        "juz": 1,
        "page": 1,
        "sajda": false
      }
    ]
  }
}
```

> **Note:** Surah data is fetched from `api.alquran.cloud` and cached in memory. The first request for each Surah takes ~500ms; subsequent requests are instant.

---

### `GET /api/search?q=query&lang=en`
Search ayahs by text across all 114 Surahs. Returns up to 100 results.

**Query Parameters:**
| Param | Required | Values | Description |
|---|---|---|---|
| `q` | ✅ | any string (min 2 chars) | Search term |
| `lang` | ❌ | `en` (default) or `ar` | Which text to search |
| `surah` | ❌ | 1–114 | Limit search to one Surah |

**Example:** `GET /api/search?q=mercy&lang=en`

**Response:**
```json
{
  "success": true,
  "total": 23,
  "data": [
    {
      "surahNumber": 1,
      "surahName": "الفاتحة",
      "surahEnglishName": "Al-Fatihah",
      "ayah": {
        "numberInSurah": 3,
        "text": "الرَّحْمَٰنِ الرَّحِيمِ",
        "translation": "The Entirely Merciful, the Especially Merciful"
      }
    }
  ]
}
```

> **Performance note:** The backend searches Surahs in batches of 10 concurrently. Results from cached Surahs are instant. Uncached Surahs are fetched live from the external API.

---

### `GET /api/audio/:surahNumber/:ayahNumber`
Returns the CDN audio URL for a specific ayah.

**Example:** `GET /api/audio/1/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",
    "surahNumber": 1,
    "ayahNumber": 1,
    "reciter": "Mishary Rashid Alafasy"
  }
}
```

> The frontend calls this URL format directly (no backend hop needed) for lower latency.

---

## 🧠 Key Implementation Details

### How Arabic Font Classes Work

Three Arabic fonts are supported. Each has a CSS class in `globals.css`:

```css
.arabic-font-amiri       { font-family: 'Amiri', serif; }
.arabic-font-scheherazade{ font-family: 'Scheherazade New', serif; }
.arabic-font-uthmanic    { font-family: 'Scheherazade New', serif; }
```

Font choice + sizes are stored in `localStorage` under the key `quran-font-settings` and loaded on mount via `useFontSettings.ts`.

---

### How Full Surah Playback Works

The `useAudioPlayer` hook manages a single `HTMLAudioElement`. When "Play Full Surah" is clicked:

1. All ayah numbers for that Surah are stored in a `ref` array (`surahAyahsRef`)
2. The first ayah's MP3 is loaded and played
3. On the `ended` event, the hook finds the current ayah's index in the array and loads the next one
4. This continues until the last ayah, then playback stops
5. The surah page listens to `audioState.currentAyah` and auto-scrolls to the active ayah card

---

### How Surah Search / Fuzzy Matching Works

The sidebar normalizes both the search query and surah names before comparing:

```ts
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/^al-?/i, "")     // strip "al-" prefix
    .replace(/[aeiou]+h$/i, "") // strip trailing vowel+h
    .replace(/q/g, "k")         // q → k  (baqarah → bakara)
    .replace(/[^a-z0-9]/g, ""); // strip non-alphanumeric
}
```

So `"bakara"`, `"baqara"`, `"al-baqarah"`, `"albaqarah"` all find **Al-Baqarah**.

---

### SSG Strategy

- In **development** (`npm run dev`): SSG is disabled. Pages are server-rendered on demand.
- In **production** (`npm run build`): `output: "export"` is enabled. All 114 Surah pages are pre-rendered to static HTML. Ayah content is fetched client-side on first visit.

This is controlled in `next.config.js`:
```js
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  ...(isProd ? { output: "export" } : {}),
};
```

---

## 🌐 Deployment

### Deploy Frontend → Render

1. Push your code to a public GitHub repository
2. Go to [render.com](https://render.com) → **New Web Service** → Import your repo
3. Set the **Root Directory** to `frontend`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.com
   ```
5. Click **Deploy**

---



### Deploy Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo, set root to `backend`
3. Build command: `bun install`
4. Start command: `bun run start`
5. Add `PORT=3001` env var

---

## 🔧 Environment Variables

### Backend (`backend/.env`)
| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Port the Hono server listens on |

### Frontend (`frontend/.env.local`)
| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | URL of the backend API |

---

## Troubleshooting

**`"use client" directive must be placed before other expressions`**
> Make sure `"use client"` is the very first line of the file — no comments, no blank lines above it.

**`Page is missing exported function "generateStaticParams()"`**
> This error only appears if `output: "export"` is enabled during dev. With the current `next.config.js`, this only activates in production builds. Run `npm run dev` normally.

**Surah page shows "Failed to Load"**
> The frontend can't reach the backend. Make sure:
> 1. Backend is running: `cd backend && bun run dev`
> 2. `frontend/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001`
> 3. No firewall is blocking port 3001

**Audio doesn't play**
> Browsers require a user gesture before playing audio. Click the play button directly — don't trigger it programmatically on page load. Also check that EveryAyah CDN isn't blocked by your network.

**Search is slow**
> The first search fetches Surahs from the external API. Once cached in memory, results are instant. The backend restarts clear the cache — this is by design (stateless server).

---

## 📦 Scripts Reference

### Backend
```bash
bun run dev      # Start dev server with hot reload (--watch)
bun run start    # Start production server
bun run build    # Build to /dist
```

### Frontend
```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export to /out (production)
npm run start    # Serve the production build locally
npm run lint     # Run ESLint
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 🙏 Acknowledgements

- **[alquran.cloud](https://alquran.cloud)** — Free Quran API with Arabic text and translations
- **[EveryAyah.com](https://everyayah.com)** — Free Quran audio CDN
- **[Mishary Rashid Alafasy](https://en.wikipedia.org/wiki/Mishary_Rashid_Alafasy)** — Reciter
- **[Google Fonts](https://fonts.google.com)** — Amiri & Scheherazade New Arabic fonts
- **[Hono](https://hono.dev)** — Lightweight web framework for Bun/Node
- **[Next.js](https://nextjs.org)** — React framework with SSG support

## 👨 Author

Mirza Salem  
[GitHub](https://github.com/mirzasalem/) | [LinkedIn](https://www.linkedin.com/in/mirzasalem/) | [Portfolio](https://mirzasalem.vercel.app/)

