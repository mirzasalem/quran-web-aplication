import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuranMazid - Read & Listen to the Holy Quran",
  description:
    "Read, listen, and explore the Holy Quran with Arabic text, English translation, and beautiful recitation.",
  keywords: ["Quran", "Islam", "Arabic", "Translation", "Recitation"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
