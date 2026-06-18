"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const gridVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
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

export function GallerySection() {
    const { gallery } = weddingData;
    const [selected, setSelected] = useState<number | null>(null);
    const XIcon = getLucideIcon("X");
    const ChevronLeftIcon = getLucideIcon("ChevronLeft");
    const ChevronRightIcon = getLucideIcon("ChevronRight");

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
            <div className="container-wedding">
                <SectionTitle
                    decorative="Galeri"
                    title="Foto Kami"
                    subtitle="Mengabadikan setiap momen indah dalam perjalanan cinta kami"
                />

                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
                >
                    {gallery.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square"
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

            {/* Lightbox */}
            <AnimatePresence>
                {selected !== null && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            onClick={() => setSelected(null)}
                        >
                            <XIcon className="w-5 h-5" />
                        </button>

                        {/* Prev */}
                        <button
                            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-3xl max-h-[80vh] w-full h-full"
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

                        {/* Next */}
                        <button
                            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-xs">
                            {selected + 1} / {gallery.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}