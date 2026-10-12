"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MusicBars } from "@/components/ui/MusicBars";
import { Monogram } from "@/components/ui/Monogram";
import { cn, getLucideIcon } from "@/lib/utils";
import { siteConfig, weddingData } from "@/lib/weddingData";

const desktopItems = [
  { label: "Pembuka", id: "pembuka", icon: getLucideIcon("BookOpen") },
  { label: "Mempelai", id: "mempelai", icon: getLucideIcon("Heart") },
  { label: "Acara", id: "acara", icon: getLucideIcon("CalendarDays") },
  { label: "Galeri", id: "galeri", icon: getLucideIcon("Image") },
  { label: "Ucapan", id: "rsvp", icon: getLucideIcon("MessageCircle") },
  { label: "Hadiah", id: "hadiah", icon: getLucideIcon("Gift") },
  { label: "Penutup", id: "penutup", icon: getLucideIcon("Sparkles") },
];

const mobileItems = [
  { label: "Beranda", id: "pembuka", icon: getLucideIcon("House") },
  { label: "Mempelai", id: "mempelai", icon: getLucideIcon("Heart") },
  { label: "Acara", id: "acara", icon: getLucideIcon("CalendarDays") },
  { label: "Galeri", id: "galeri", icon: getLucideIcon("Image") },
  { label: "Ucapan", id: "rsvp", icon: getLucideIcon("MessageCircle") },
];

const SECTION_ORDER = desktopItems.map((item) => item.id);

const SECTION_TITLES: Record<string, string> = {
  pembuka: "Pembuka",
  mempelai: "Mempelai",
  countdown: "Hitung Mundur",
  acara: "Acara",
  agenda: "Susunan Acara",
  galeri: "Galeri",
  rsvp: "Ucapan",
  hadiah: "Hadiah",
  penutup: "Penutup",
};

const SunIcon = getLucideIcon("Sun");
const MoonIcon = getLucideIcon("Moon");
const MusicOffIcon = getLucideIcon("VolumeX");

const iconButton =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-primary transition hover:bg-accent";

function mobileTarget(active: string) {
  if (active === "countdown") return "mempelai";
  if (active === "agenda") return "acara";
  if (active === "hadiah" || active === "penutup") return "rsvp";
  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("pembuka");
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleAudio } = useAudio();
  const { groom, bride } = weddingData;

  useEffect(() => {
    const ids = [...SECTION_ORDER, "countdown", "agenda"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive("penutup");
        return;
      }

      let current = "pembuka";
      let best = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140 && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const label = SECTION_TITLES[active];
    document.title = label
      ? `${siteConfig.title} - ${label}`
      : siteConfig.title;
  }, [active]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleAudio}
        className={iconButton}
        aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      >
        {isPlaying ? <MusicBars /> : <MusicOffIcon className="h-4.5 w-4.5" />}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className={iconButton}
        aria-label={theme === "light" ? "Mode gelap" : "Mode terang"}
      >
        {theme === "light" ? (
          <MoonIcon className="h-4.5 w-4.5" />
        ) : (
          <SunIcon className="h-4.5 w-4.5" />
        )}
      </button>
    </div>
  );

  const brand = (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
      aria-label={`${groom.nickname} & ${bride.nickname}, kembali ke atas`}
    >
      <Monogram size={40} />
    </button>
  );

  const mobileActive = mobileTarget(active);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-background/92 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-wedding flex h-15 items-center justify-between gap-4 px-4.5 md:h-18">
          {brand}

          <nav aria-label="Navigasi undangan" className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
              {desktopItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => goTo(item.id)}
                      aria-current={active === item.id ? "true" : undefined}
                      aria-label={item.label}
                      title={item.label}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                        active === item.id
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {controls}
        </div>
      </motion.header>

      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        aria-label="Navigasi undangan"
        className="pb-safe fixed inset-x-4 bottom-4 z-50 md:hidden"
      >
        <ul className="flex h-16 items-center justify-around rounded-[20px] border border-border bg-card/95 px-1 shadow-[0_18px_30px_-18px_rgba(58,51,44,0.45)] backdrop-blur-md">
          {mobileItems.map((item) => {
            const Icon = item.icon;
            const isActive = mobileActive === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex h-13 w-13 flex-col items-center justify-center gap-0.5 rounded-[14px] text-[9.5px] font-semibold transition-colors",
                    isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
