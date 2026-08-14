"use client";

import { useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { weddingData, siteConfig } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const LinkIcon = getLucideIcon("Link");
const CheckIcon = getLucideIcon("Check");
const HeartIcon = getLucideIcon("Heart");

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg
      className={className}
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
  );
}

export function ClosingSection() {
  const { groom, bride } = weddingData;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Gagal menyalin link");
    }
  };

  return (
    <section
      id="penutup"
      className="relative overflow-hidden w-full py-20 px-4 bg-foreground text-background"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-gold) 0%, transparent 60%),
                             radial-gradient(circle at 80% 50%, var(--color-gold) 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/10" />
      <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border border-primary/10" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container-wedding relative z-10 max-w-lg mx-auto"
      >
        <div className="relative rounded-[1.75rem] px-2 py-2 border border-primary/25">
          <CornerOrnament className="absolute top-3 left-3 w-9 h-9 text-primary/50" />
          <CornerOrnament className="absolute top-3 right-3 w-9 h-9 -scale-x-100 text-primary/50" />
          <CornerOrnament className="absolute bottom-3 left-3 w-9 h-9 -scale-y-100 text-primary/50" />
          <CornerOrnament className="absolute bottom-3 right-3 w-9 h-9 -scale-x-100 -scale-y-100 text-primary/50" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-6 py-12 text-center"
          >
            <motion.div
              variants={itemVariants}
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
              variants={itemVariants}
              className="text-[11px] uppercase tracking-[0.4em] mb-6 font-sans font-medium text-primary/70"
            >
              Terima Kasih
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base font-sans leading-relaxed max-w-md mx-auto mb-10 text-background/70"
            >
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
              kehadiran dan doa restu, kami mengucapkan terima kasih.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-12">
              <motion.button
                onClick={copyLink}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={
                  "inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-sans font-medium transition-all border " +
                  (copied
                    ? "border-success/40 text-success bg-success/10"
                    : "border-primary/40 text-background/90 bg-primary/10")
                }
              >
                {copied ? (
                  <CheckIcon className="w-3.5 h-3.5 text-success" />
                ) : (
                  <LinkIcon className="w-3.5 h-3.5 text-primary" />
                )}
                {copied ? "Link Berhasil Disalin!" : "Salin Link Undangan"}
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-16 bg-primary/20" />
              <HeartIcon className="w-3 h-3 text-primary/40" />
              <div className="h-px w-16 bg-primary/20" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <p className="font-serif text-lg font-semibold tracking-wide text-primary">
                {groom.nickname} &amp; {bride.nickname}
              </p>
              <p className="text-xs font-sans text-background/40">
                {new Date(weddingData.akad.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-xs font-sans pt-4 text-background/25">
                © {new Date().getFullYear()} Fedy &amp; Suci Wedding. All rights
                reserved.
              </p>
              <p className="text-[10px] font-sans pt-1 text-background/15">
                Music: &quot;Canon in D Major&quot; by Kevin MacLeod
                (incompetech.com), CC BY 3.0
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
