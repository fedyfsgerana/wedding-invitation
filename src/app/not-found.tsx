"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";

export default function NotFound() {
  const { groom, bride } = weddingData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-999 bg-background overflow-y-auto"
    >
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/20 animate-pulse pointer-events-none" />
      <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-primary/10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-primary/20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full border border-primary/10 pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 rounded-full bg-primary/20 pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 rounded-full bg-primary/20 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-gold) 0%, transparent 50%),
                                      radial-gradient(circle at 75% 75%, var(--color-gold) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="max-w-sm w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative mx-auto mb-6 w-16 h-16"
          >
            <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-soft" />
            <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
              <span className="font-serif text-lg text-primary">
                {groom.nickname.charAt(0)}&amp;{bride.nickname.charAt(0)}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif italic text-2xl xs:text-3xl text-primary/70 mb-2"
          >
            404
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-serif text-3xl xs:text-4xl font-semibold text-foreground tracking-tight mb-6 wrap-break-word"
          >
            Halaman Tidak Ditemukan
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex items-center gap-3 justify-center mb-6"
          >
            <div className="w-12 h-px bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="w-12 h-px bg-primary/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            Maaf, halaman yang kamu cari tidak tersedia
            <br />
            atau tautannya sudah tidak berlaku.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center gap-3 justify-center mt-8 mb-4"
          >
            <div className="w-12 h-px bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="w-12 h-px bg-primary/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-xs text-muted-foreground/60 uppercase tracking-widest"
          >
            {groom.nickname} &amp; {bride.nickname}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
