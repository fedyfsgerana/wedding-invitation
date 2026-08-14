"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

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

export function OpeningSection() {
  const { verse } = weddingData;

  return (
    <SectionWrapper id="pembuka" variant="cream">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-wedding px-4"
      >
        <div className="relative max-w-lg mx-auto border border-primary/20 rounded-[1.75rem] px-2 py-2">
          <CornerOrnament className="absolute top-3 left-3 w-9 h-9 text-primary/40" />
          <CornerOrnament className="absolute top-3 right-3 w-9 h-9 text-primary/40 -scale-x-100" />
          <CornerOrnament className="absolute bottom-3 left-3 w-9 h-9 text-primary/40 -scale-y-100" />
          <CornerOrnament className="absolute bottom-3 right-3 w-9 h-9 text-primary/40 -scale-x-100 -scale-y-100" />

          <div className="px-6 py-12 text-center">
            <motion.p
              variants={itemVariants}
              className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium"
            >
              Assalamu&apos;alaikum Wr. Wb.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="relative mx-auto mb-8 w-14 h-14"
            >
              <div className="absolute inset-0 rounded-full gradient-primary opacity-20" />
              <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                <span className="font-serif text-base text-primary">❝</span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-foreground font-serif italic text-sm md:text-base leading-relaxed mb-3 max-w-sm mx-auto"
            >
              {verse.text}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-[11px] uppercase tracking-[0.3em] text-primary font-sans font-medium mb-10"
            >
              {verse.source}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto font-sans"
            >
              Tanpa mengurangi rasa hormat, dengan memohon rahmat dan ridho
              Allah SWT, kami bermaksud melangsungkan pernikahan kami. Berikut
              kami sampaikan undangan ini sebagai tanda kasih dan doa restu dari
              Bapak/Ibu/Saudara/i sekalian.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
