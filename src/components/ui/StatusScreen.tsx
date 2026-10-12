"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Monogram } from "@/components/ui/Monogram";
import { DotDivider, Floral } from "@/components/ui/Ornament";
import { weddingData } from "@/lib/weddingData";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface StatusScreenProps {
  eyebrow: string;
  title: string;
  message: React.ReactNode;
  footnote?: string;
}

export function StatusScreen({
  eyebrow,
  title,
  message,
  footnote,
}: StatusScreenProps) {
  const { groom, bride } = weddingData;

  return (
    <main className="fixed inset-0 z-999 overflow-y-auto bg-[radial-gradient(90%_55%_at_50%_45%,var(--color-card)_0%,var(--color-ivory)_60%,var(--color-warm)_100%)]">
      <div className="pointer-events-none fixed inset-3.5 overflow-hidden rounded-[30px] border border-gold-line/60">
        <Floral
          variant="blossom"
          size={120}
          className="absolute -top-2 -right-2 h-32 w-32 rotate-180 md:h-44 md:w-44"
        />
        <Floral
          variant="fern"
          size={120}
          className="absolute -bottom-2 -left-2 h-32 w-32 md:h-44 md:w-44"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-5 px-9 py-16 text-center"
      >
        <motion.div variants={itemVariants}>
          <Monogram size={84} title={`${groom.nickname} & ${bride.nickname}`} />
        </motion.div>

        <motion.p variants={itemVariants} className="eyebrow">
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-[34px] font-semibold leading-tight text-foreground md:text-[44px]"
        >
          {title}
        </motion.h1>

        <motion.div variants={itemVariants}>
          <DotDivider />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {message}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-2 font-serif text-2xl font-medium"
        >
          <span className="text-gold-gradient">{groom.nickname}</span>{" "}
          <span className="font-script text-[32px] text-gold">&amp;</span>{" "}
          <span className="text-gold-gradient">{bride.nickname}</span>
        </motion.p>

        {footnote && (
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            {footnote}
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}