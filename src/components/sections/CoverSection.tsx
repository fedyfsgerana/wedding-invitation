"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

interface CoverSectionProps {
  guestName: string | null;
  onOpen: () => void;
  isOpened: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const MailOpenIcon = getLucideIcon("MailOpen");

export function CoverSection({
  guestName,
  onOpen,
  isOpened,
}: CoverSectionProps) {
  const { groom, bride, akad } = weddingData;

  if (isOpened) return null;

  return (
    <motion.section
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-background p-4 md:p-10"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 10%, var(--color-gold) 0%, transparent 40%),
                             radial-gradient(circle at 90% 90%, var(--color-gold) 0%, transparent 40%)`,
          }}
        />
      </div>

      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-primary/15 animate-pulse-soft" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-primary/15 animate-pulse-soft" />
      <div className="absolute top-1/4 right-6 w-1.5 h-1.5 rounded-full bg-primary/40" />
      <div className="absolute bottom-1/4 left-6 w-1.5 h-1.5 rounded-full bg-primary/40" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <div className="relative border border-primary/20 rounded-[1.75rem] px-2 py-2">
          <svg
            className="absolute top-3 left-3 w-9 h-9 text-primary/40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <path d="M4 4 Q4 16 16 16 Q4 16 4 28" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
            <path d="M9 9 Q13 11 12 16 Q10 12 6 13" strokeLinecap="round" />
            <path d="M9 9 Q11 13 16 12 Q12 10 13 6" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute top-3 right-3 w-9 h-9 text-primary/40 -scale-x-100"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <path d="M4 4 Q4 16 16 16 Q4 16 4 28" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
            <path d="M9 9 Q13 11 12 16 Q10 12 6 13" strokeLinecap="round" />
            <path d="M9 9 Q11 13 16 12 Q12 10 13 6" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute bottom-3 left-3 w-9 h-9 text-primary/40 -scale-y-100"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <path d="M4 4 Q4 16 16 16 Q4 16 4 28" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
            <path d="M9 9 Q13 11 12 16 Q10 12 6 13" strokeLinecap="round" />
            <path d="M9 9 Q11 13 16 12 Q12 10 13 6" strokeLinecap="round" />
          </svg>
          <svg
            className="absolute bottom-3 right-3 w-9 h-9 text-primary/40 -scale-x-100 -scale-y-100"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <path d="M4 4 Q4 16 16 16 Q4 16 4 28" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
            <path d="M9 9 Q13 11 12 16 Q10 12 6 13" strokeLinecap="round" />
            <path d="M9 9 Q11 13 16 12 Q12 10 13 6" strokeLinecap="round" />
          </svg>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center px-6 py-12 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="relative mx-auto mb-8 w-16 h-16"
            >
              <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-soft" />
              <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                <span className="font-serif text-lg text-primary">
                  {groom.nickname.charAt(0)}&amp;{bride.nickname.charAt(0)}
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[11px] uppercase tracking-[0.4em] text-primary mb-6 font-sans font-medium"
            >
              Undangan Pernikahan
            </motion.p>

            <motion.div variants={itemVariants} className="mb-2 relative">
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground tracking-tight leading-[0.95]">
                {groom.nickname}
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 my-2"
            >
              <div className="h-px w-10 bg-primary/30" />
              <span className="font-serif italic text-2xl text-primary/70">
                &amp;
              </span>
              <div className="h-px w-10 bg-primary/30" />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 relative">
              <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground tracking-tight leading-[0.95]">
                {bride.nickname}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                <p className="text-xs text-muted-foreground tracking-widest font-sans uppercase">
                  {new Date(akad.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full mb-8 rounded-2xl border border-primary/15 bg-card px-5 py-5 shadow-[0_2px_12px_rgba(180,140,60,0.06)]"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 font-sans">
                Kepada Yth.
              </p>
              {guestName ? (
                <p className="text-base font-serif text-foreground font-medium mb-2">
                  Bapak/Ibu/Saudara/i {guestName}
                </p>
              ) : (
                <p className="text-base font-serif text-foreground font-medium mb-2">
                  Bapak/Ibu/Saudara/i Tamu Undangan
                </p>
              )}
              <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
                Tanpa mengurangi rasa hormat, kami bermaksud mengundang
                Bapak/Ibu/Saudara/i untuk berkenan hadir dan memberikan doa
                restu pada hari bahagia kami.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <motion.button
                onClick={onOpen}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] font-sans font-medium shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <MailOpenIcon className="w-3.5 h-3.5" />
                <span>Buka Undangan</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
