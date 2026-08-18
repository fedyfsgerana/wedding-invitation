"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const XIcon = getLucideIcon("X");
const ChevronLeftIcon = getLucideIcon("ChevronLeft");
const ChevronRightIcon = getLucideIcon("ChevronRight");

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
    <SectionWrapper id="galeri" variant="default">
      <div className="container-wedding px-4">
        <div className="relative max-w-3xl mx-auto border border-primary/20 rounded-[1.75rem] px-2 py-2">
          <CornerOrnament className="absolute top-3 left-3 w-9 h-9 text-primary/40" />
          <CornerOrnament className="absolute top-3 right-3 w-9 h-9 text-primary/40 -scale-x-100" />
          <CornerOrnament className="absolute bottom-3 left-3 w-9 h-9 text-primary/40 -scale-y-100" />
          <CornerOrnament className="absolute bottom-3 right-3 w-9 h-9 text-primary/40 -scale-x-100 -scale-y-100" />

          <div className="px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium">
                Galeri
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                Foto Kami
              </h2>
              <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
                Mengabadikan setiap momen indah dalam perjalanan cinta kami
              </p>
            </motion.div>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4"
            >
              {gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-2xl border border-primary/15 cursor-pointer group aspect-square"
                  onClick={() => setSelected(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/seed/${item.id}/400/400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 xs:p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-3 right-3 xs:top-4 xs:right-4 w-8 h-8 xs:w-9 xs:h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center z-10"
              onClick={() => setSelected(null)}
            >
              <XIcon className="w-4 h-4" />
            </button>

            <button
              className="absolute left-1.5 xs:left-3 sm:left-4 w-8 h-8 xs:w-9 xs:h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center z-10 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl max-h-[80vh] w-full h-full px-10 xs:px-12 sm:px-14"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://picsum.photos/seed/${selectedItem.id}/800/600`;
                }}
              />
            </motion.div>

            <button
              className="absolute right-1.5 xs:right-3 sm:right-4 w-8 h-8 xs:w-9 xs:h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center z-10 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white text-[10px] xs:text-[11px] uppercase tracking-widest font-sans whitespace-nowrap">
              {selected + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
