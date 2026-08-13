"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useAudio } from "@/components/providers/AudioProvider";
import { getLucideIcon } from "@/lib/utils";

const SunIcon = getLucideIcon("Sun");
const MoonIcon = getLucideIcon("Moon");
const MusicIcon = getLucideIcon("Music");
const MusicOffIcon = getLucideIcon("VolumeX");

export function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-sm hover:bg-muted transition-colors text-foreground/70 md:hidden"
        aria-label="Putar/Hentikan musik"
      >
        {isPlaying ? (
          <MusicIcon className="w-4 h-4" />
        ) : (
          <MusicOffIcon className="w-4 h-4" />
        )}
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-sm hover:bg-muted transition-colors text-foreground/70 md:hidden"
        aria-label="Ganti mode terang/gelap"
      >
        {theme === "light" ? (
          <MoonIcon className="w-4 h-4" />
        ) : (
          <SunIcon className="w-4 h-4" />
        )}
      </motion.button>
    </>
  );
}
