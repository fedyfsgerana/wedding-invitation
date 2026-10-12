"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { DotDivider, FloralSprig } from "@/components/ui/Ornament";
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
  visible: { transition: { staggerChildren: 0.12 } },
};

export function OpeningSection() {
  const { verse } = weddingData;

  return (
    <SectionWrapper id="pembuka" className="overflow-hidden">
      <FloralSprig
        size={84}
        className="absolute top-2 right-1.5 -scale-x-100 md:top-8 md:right-[12%]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
      >
        <motion.p
          variants={itemVariants}
          lang="ar"
          dir="rtl"
          className="font-arabic text-[28px] leading-relaxed text-primary"
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="font-serif text-[25px] md:text-[34px] font-semibold text-foreground"
        >
          Assalamu&apos;alaikum Wr. Wb.
        </motion.h2>

        <motion.div variants={itemVariants}>
          <DotDivider />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base leading-relaxed text-muted-foreground"
        >
          Dengan memohon rahmat dan rida Allah SWT, kami bermaksud
          menyelenggarakan pernikahan putra-putri kami.
        </motion.p>

        <motion.figure
          variants={itemVariants}
          className="card-wedding w-full px-5.5 py-6.5"
        >
          <blockquote className="font-serif text-[17px] italic leading-[1.7] text-foreground/80">
            &ldquo;{verse.text}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-gold">
            {verse.source}
          </figcaption>
        </motion.figure>
      </motion.div>
    </SectionWrapper>
  );
}
