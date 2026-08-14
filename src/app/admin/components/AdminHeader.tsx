"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
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

export function AdminHeader({ wishesCount, onOpenWishes, onLogout }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { groom, bride } = weddingData;

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative w-10 h-10 shrink-0"
          aria-label="Kembali ke atas"
        >
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-soft" />
          <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center hover:opacity-70 transition-opacity">
            <span className="font-serif text-sm text-primary">
              {groom.nickname.charAt(0)}&amp;{bride.nickname.charAt(0)}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenWishes}
            className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
          >
            <MessageIcon className="w-3.5 h-3.5" />
            Ucapan
            <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-[10px] font-semibold leading-none">
              {wishesCount}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label="Ganti tema"
            title={theme === "light" ? "Mode Gelap" : "Mode Terang"}
          >
            {theme === "light" ? (
              <MoonIcon className="w-3.5 h-3.5" />
            ) : (
              <SunIcon className="w-3.5 h-3.5" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-danger-border hover:text-danger hover:bg-danger-soft transition-all flex items-center gap-1.5"
          >
            <LogOutIcon className="w-3.5 h-3.5" />
            Keluar
          </motion.button>
        </div>
      </div>
    </div>
  );
}
