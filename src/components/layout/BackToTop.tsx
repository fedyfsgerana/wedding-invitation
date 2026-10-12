"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

const ChevronUpIcon = getLucideIcon("ChevronUp");

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-24 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-line bg-card text-primary shadow-[0_10px_24px_-14px_rgba(58,51,44,0.45)] transition hover:bg-accent md:right-6 md:bottom-6"
          aria-label="Kembali ke atas"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
