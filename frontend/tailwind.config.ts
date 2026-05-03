import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Amiri", "Scheherazade New", "serif"],
        arabic2: ["Scheherazade New", "serif"],
        arabic3: ["KFGQPC Uthmanic Script HAFS", "Amiri", "serif"],
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#0f1117",
          secondary: "#161b27",
          sidebar: "#12161e",
          card: "#1a2035",
          hover: "#1e2740",
        },
        accent: {
          gold: "#c9a84c",
          goldLight: "#e8c870",
          green: "#2ecc71",
          teal: "#1abc9c",
        },
        text: {
          primary: "#e8e8e8",
          secondary: "#a0a8b8",
          muted: "#6b7280",
          arabic: "#f5f0e8",
        },
        border: {
          DEFAULT: "#2a3147",
          light: "#3a4566",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideIn: { from: { transform: "translateX(-20px)", opacity: "0" }, to: { transform: "translateX(0)", opacity: "1" } },
        pulseSoft: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
      },
    },
  },
  plugins: [],
};

export default config;
