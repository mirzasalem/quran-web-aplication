"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IconSidebarProps {
  onSearchOpen: () => void;
  onFontSettingsOpen: () => void;
  onSurahSidebarToggle: () => void;
}

const MosqueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5H4l-2 8h20l-2-8h-3c1-1 2-3 2-5 0-4-3-7-7-7z"/>
    <rect x="9" y="16" width="6" height="6" rx="1"/>
    <circle cx="12" cy="9" r="2"/>
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export default function IconSidebar({
  onSearchOpen,
  onFontSettingsOpen,
  onSurahSidebarToggle,
}: IconSidebarProps) {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);

  const navItems = [
    { icon: <MenuIcon />, label: "Surahs", action: onSurahSidebarToggle, id: "menu" },
    { icon: <BookIcon />, label: "Quran", href: "/", id: "home" },
    { icon: <SearchIcon />, label: "Search", action: onSearchOpen, id: "search" },
    { icon: <BookmarkIcon />, label: "Bookmarks", href: "#", id: "bookmark" },
    { icon: <SettingsIcon />, label: "Font Settings", action: onFontSettingsOpen, id: "settings" },
    { icon: <InfoIcon />, label: "About", action: () => setAboutOpen(true), id: "info" },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-14 flex flex-col items-center bg-bg-sidebar border-r border-border z-40 py-4 gap-1">
        <div className="w-32 h-32 flex items-center justify-center">
          <img 
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 w-full px-2">
          {navItems.map((item) => {
            const isActive = item.href && item.href !== "#" && pathname === item.href;
            const base = "w-full h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative cursor-pointer";
            const active = "bg-accent-gold/20 text-accent-gold";
            const inactive = "text-text-muted hover:bg-bg-hover hover:text-text-primary";
            const content = (
              <>
                {item.icon}
                <span className="absolute left-full ml-2 px-2 py-1 bg-bg-card text-text-primary text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border shadow-xl z-50">
                  {item.label}
                </span>
              </>
            );
            if (item.href && item.href !== "#") {
              return (
                <Link key={item.id} href={item.href} className={`${base} ${isActive ? active : inactive}`}>
                  {content}
                </Link>
              );
            }
            return (
              <button key={item.id} onClick={item.action} className={`${base} ${inactive}`}>
                {content}
              </button>
            );
          })}
        </div>

        <div className="mt-auto text-text-muted opacity-40">
          <MosqueIcon />
        </div>
      </aside>

      {aboutOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setAboutOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-bg-card border border-border rounded-2xl shadow-2xl z-50 p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-text-primary font-semibold text-lg">About</h2>
              <button onClick={() => setAboutOpen(false)} className="text-text-muted hover:text-text-primary transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-41 h-41 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png"
                  alt="Logo"
                  className="w-[140%] h-[140%] object-contain"
                />
              </div>
              <h3 className="text-text-primary font-bold text-xl">Al-Quran Al-Kareem</h3>
              <p className="text-text-muted text-sm mt-1">Version 1.0.0</p>
            </div>

            <div className="border-t border-border mb-5" />

            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-gold/30 to-teal-700/30 border-2 border-accent-gold/40 flex items-center justify-center mb-3 overflow-hidden">
                <img src="/images/profile.jpg" alt="Profile" />
              </div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Developed by</p>
              <h4 className="text-text-primary font-bold text-lg">Mirza Salem</h4>
              <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
                <a href="https://github.com/mirzasalem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary hover:border-accent-gold/40 transition-all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="https://mirzasalem.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary hover:border-accent-gold/40 transition-all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Website
                </a>
                <a href="tel:+8801521333490" className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary border border-border rounded-lg text-xs text-text-secondary hover:text-text-primary hover:border-accent-gold/40 transition-all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.43 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Contact
                </a>
              </div>
            </div>

            <div className="border-t border-border mb-5" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Total Surahs</span>
                <span className="text-text-primary font-medium">114</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Total Ayahs</span>
                <span className="text-text-primary font-medium">6,236</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Translation</span>
                <span className="text-text-primary font-medium">Saheeh International</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Reciter</span>
                <span className="text-text-primary font-medium">Mishary Rashid Alafasy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Audio Source</span>
                <span className="text-text-primary font-medium">EveryAyah.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Quran API</span>
                <span className="text-text-primary font-medium">AlQuran.cloud</span>
              </div>
            </div>

            <div className="border-t border-border mt-5 mb-4" />

            <div className="flex flex-wrap gap-2 justify-center">
              {["Next.js", "TypeScript", "Hono", "Bun", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-bg-secondary border border-border rounded-full text-xs text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-center text-xs text-text-muted mt-4">
              Built for the Muslim community
            </p>
          </div>
        </>
      )}
    </>
  );
}