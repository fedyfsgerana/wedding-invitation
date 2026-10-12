"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function AgendaSection() {
  const { agenda } = weddingData;

  return (
    <SectionWrapper
      id="agenda"
      ornament={{ variant: "tulip", corner: "bottom-right" }}
    >
      <div className="mx-auto max-w-lg">
        <SectionTitle
          eyebrow="Agenda"
          title="Susunan Acara"
          subtitle="Rangkaian acara pada hari bahagia kami"
        />

        <div className="card-wedding relative px-5.5 py-6">
          <span
            aria-hidden="true"
            className="absolute top-10 bottom-10 left-10.5 w-px bg-gold-line/70"
          />
          <motion.ol
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4.5"
          >
            {agenda.map((item) => {
              const Icon = getLucideIcon(item.icon);
              return (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  className="relative flex gap-3.5"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                      {item.time.replace(/:/g, ".").replace(" - ", " – ")}
                    </span>
                    <h3 className="mt-1.5 font-serif text-[19px] font-semibold text-foreground">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[13px] text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </SectionWrapper>
  );
}
