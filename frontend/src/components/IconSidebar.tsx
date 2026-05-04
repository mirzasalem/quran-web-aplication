"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IconSidebarProps {
  onSearchOpen: () => void;
  onFontSettingsOpen: () => void;
  onSurahSidebarToggle: () => void;
  onAboutOpen: () => void;
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
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export default function IconSidebar({
  onSearchOpen,
  onFontSettingsOpen,
  onSurahSidebarToggle,
  onAboutOpen
}: IconSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: <MenuIcon />, label: "Surahs", action: onSurahSidebarToggle, id: "menu" },
    { icon: <BookIcon />, label: "Quran", href: "/", id: "home" },
    { icon: <SearchIcon />, label: "Search", action: onSearchOpen, id: "search" },
    { icon: <BookmarkIcon />, label: "Bookmarks", href: "#", id: "bookmark" },
    { icon: <SettingsIcon />, label: "Font Settings", action: onFontSettingsOpen, id: "settings" },
    { icon: <InfoIcon />, label: "About", action: onAboutOpen, id: "info" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-14 flex flex-col items-center bg-bg-sidebar border-r border-border z-40 py-4 gap-1">
      {/* Logo */}
      <div className="mb-4 w-10 h-10 rounded-xl bg-gradient-to-br from-accent-gold to-yellow-700 flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-xs" style={{ fontFamily: "serif" }}>maxcode</span>
      </div>

      <div className="flex-1 flex flex-col gap-1 w-full px-2">
        {navItems.map((item) => {
          const isActive = item.href && item.href !== "#" && pathname === item.href;
          const base =
            "w-full h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative cursor-pointer";
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
              <Link
                key={item.id}
                href={item.href}
                className={`${base} ${isActive ? active : inactive}`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`${base} ${inactive}`}
            >
              {content}
            </button>
          );
        })}
      </div>

      {/* Bottom mosque icon */}
      <div className="mt-auto text-text-muted opacity-40">
        <MosqueIcon />
      </div>
    </aside>
  );
}
