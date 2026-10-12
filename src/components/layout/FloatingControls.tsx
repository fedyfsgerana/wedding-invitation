"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getLucideIcon } from "@/lib/utils";

const SunIcon = getLucideIcon("Sun");
const MoonIcon = getLucideIcon("Moon");
const MusicIcon = getLucideIcon("Music");
const MusicOffIcon = getLucideIcon("VolumeX");

const buttonClass =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/90 text-primary shadow-sm backdrop-blur-md transition hover:bg-accent";

export function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="fixed top-6 right-6 z-50 flex gap-2"
    >
      <button
        type="button"
        onClick={toggleAudio}
        className={buttonClass}
        aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      >
        {isPlaying ? (
          <MusicIcon className="h-4.5 w-4.5" />
        ) : (
          <MusicOffIcon className="h-4.5 w-4.5" />
        )}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className={buttonClass}
        aria-label={theme === "light" ? "Mode gelap" : "Mode terang"}
      >
        {theme === "light" ? (
          <MoonIcon className="h-4.5 w-4.5" />
        ) : (
          <SunIcon className="h-4.5 w-4.5" />
        )}
      </button>
    </motion.div>
  );
}
