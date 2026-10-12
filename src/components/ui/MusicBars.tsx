"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BARS = [
  { heights: ["35%", "100%", "55%", "80%", "35%"], duration: 1.1 },
  { heights: ["80%", "40%", "100%", "50%", "80%"], duration: 0.9 },
  { heights: ["50%", "85%", "35%", "100%", "50%"], duration: 1.25 },
];

export function MusicBars({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-4 w-4.5 items-end justify-between", className)}
    >
      {BARS.map((bar) => (
        <motion.span
          key={bar.duration}
          className="w-1 rounded-full bg-current"
          initial={{ height: bar.heights[0] }}
          animate={{ height: bar.heights }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
