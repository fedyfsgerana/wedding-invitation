"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const XIcon = getLucideIcon("X");
const ChevronLeftIcon = getLucideIcon("ChevronLeft");
const ChevronRightIcon = getLucideIcon("ChevronRight");

const lightboxButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20";

export function GallerySection() {
  const { gallery } = weddingData;
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = selected !== null ? gallery[selected] : null;

  const goPrev = () => {
    if (selected === null) return;
    setSelected(selected === 0 ? gallery.length - 1 : selected - 1);
  };

  const goNext = () => {
    if (selected === null) return;
    setSelected(selected === gallery.length - 1 ? 0 : selected + 1);
  };

  return (
    <SectionWrapper
      id="galeri"
      variant="cream"
      ornament={{ variant: "fern", corner: "top-left" }}
    >
      <div className="container-wedding">
        <SectionTitle
          eyebrow="Galeri"
          title="Momen Kami"
          subtitle="Sepenggal cerita yang ingin kami bagi"
        />

        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-2 md:gap-4"
        >
          {gallery.map((item, index) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              className="aspect-square"
            >
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`Lihat ${item.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-xl border border-border bg-accent md:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 300px, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <AnimatePresence>
        {selected !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#171411]/92 p-3"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              aria-label="Tutup"
              className={`${lightboxButton} absolute top-4 right-4 z-10`}
              onClick={() => setSelected(null)}
            >
              <XIcon className="h-4.5 w-4.5" />
            </button>

            <button
              type="button"
              aria-label="Foto sebelumnya"
              className={`${lightboxButton} absolute left-3 z-10`}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ChevronLeftIcon className="h-4.5 w-4.5" />
            </button>

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative h-full max-h-[80vh] w-full max-w-3xl px-14"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              aria-label="Foto berikutnya"
              className={`${lightboxButton} absolute right-3 z-10`}
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ChevronRightIcon className="h-4.5 w-4.5" />
            </button>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs tracking-widest text-white">
              {selected + 1} / {gallery.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
