"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Monogram } from "@/components/ui/Monogram";
import { scrollBehavior } from "@/lib/scroll";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

interface Props {
  wishesCount: number;
  onOpenWishes: () => void;
  onLogout: () => void;
}

const MessageIcon = getLucideIcon("MessageCircle");
const LogOutIcon = getLucideIcon("LogOut");
const SunIcon = getLucideIcon("Sun");
const MoonIcon = getLucideIcon("Moon");

const iconButton =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-primary transition hover:bg-accent";

export function AdminHeader({ wishesCount, onOpenWishes, onLogout }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { groom, bride } = weddingData;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 px-4.5">
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: scrollBehavior() })
          }
          className="flex items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:outline-none"
          aria-label="Kembali ke atas"
        >
          <Monogram size={40} />
          <span className="hidden text-left sm:block">
            <span className="block font-serif text-lg font-semibold leading-tight text-foreground">
              {groom.nickname} &amp; {bride.nickname}
            </span>
            <span className="block text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Admin
            </span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenWishes}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-gold-line bg-card px-3.5 text-sm font-semibold text-primary transition hover:bg-accent"
          >
            <MessageIcon className="h-4.5 w-4.5" />
            <span className="hidden xs:inline">Ucapan</span>
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
              {wishesCount}
            </span>
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

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-3.5 text-sm font-semibold text-muted-foreground transition hover:border-danger-border hover:bg-danger-soft hover:text-danger"
            aria-label="Keluar"
          >
            <LogOutIcon className="h-4.5 w-4.5" />
            <span className="hidden xs:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
