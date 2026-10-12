"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Monogram } from "@/components/ui/Monogram";
import { DotDivider, Floral } from "@/components/ui/Ornament";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function ClosingSection() {
  const { groom, bride, akad } = weddingData;
  const weddingDate = new Date(`${akad.date}T00:00:00`).toLocaleDateString(
    "id-ID",
    { day: "numeric", month: "long", year: "numeric" },
  );
  const year = akad.date.slice(0, 4);

  return (
    <>
      <section
        id="penutup"
        className="w-full scroll-mt-20 bg-background px-5.5 py-12 md:scroll-mt-24 md:py-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
        >
          <motion.div variants={itemVariants} className="flex items-end">
            <Floral variant="tulip" size={72} className="-scale-x-100" />
            <Floral variant="daisy" size={64} />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-serif text-[30px] font-semibold text-foreground md:text-[40px]"
          >
            Terima Kasih
          </motion.h2>

          <motion.div variants={itemVariants}>
            <DotDivider />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground"
          >
            Wassalamu&apos;alaikum Wr. Wb.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-1 font-serif text-[38px] font-medium leading-tight"
          >
            <span className="text-gold-gradient">{groom.nickname}</span>{" "}
            <span className="font-script text-[44px] text-gold">&amp;</span>{" "}
            <span className="text-gold-gradient">{bride.nickname}</span>
          </motion.p>
        </motion.div>
      </section>

      <footer className="w-full border-t border-border bg-cream px-5.5 pt-8 pb-28 md:pb-10">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center">
          <Monogram size={44} />
          <p className="font-serif text-lg font-semibold text-foreground">
            {groom.nickname} &amp; {bride.nickname}
          </p>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {weddingDate}
          </p>
          <span aria-hidden="true" className="my-1 h-px w-12 bg-gold-line" />
          <p className="text-xs text-muted-foreground">
            © {year} {groom.nickname} &amp; {bride.nickname} Wedding
          </p>
          <p className="text-[11px] leading-relaxed text-muted-foreground/80">
            Musik: &quot;Canon in D Major&quot; oleh Kevin MacLeod
            (incompetech.com), lisensi CC BY 3.0
          </p>
        </div>
      </footer>
    </>
  );
}
