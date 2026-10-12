"use client";

import { AnimatePresence, motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";

interface LoadingScreenProps {
  isLoading: boolean;
  text?: string;
}

export function LoadingScreen({
  isLoading,
  text = "Memuat undangan",
}: LoadingScreenProps) {
  const { groom, bride } = weddingData;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
          }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-999 flex flex-col items-center justify-center gap-6 bg-background"
        >
          <div className="relative flex h-40 w-40 items-center justify-center">
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border border-gold-line"
            />
            <span className="font-script text-6xl leading-none text-primary">
              {groom.nickname.charAt(0)}&amp;{bride.nickname.charAt(0)}
            </span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            {text}
          </p>
          <div className="flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-gold"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
