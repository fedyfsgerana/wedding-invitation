"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

interface CoverSectionProps {
    guestName: string | null;
    onOpen: () => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export function CoverSection({ guestName, onOpen }: CoverSectionProps) {
    const { groom, bride, akad } = weddingData;
    const ChevronDownIcon = getLucideIcon("ChevronDown");
    const HeartIcon = getLucideIcon("Heart");

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--rose)) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, hsl(var(--gold)) 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Decorative circles */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/20 animate-pulse-soft" />
            <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-primary/10" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-gold/20 animate-pulse-soft" />
            <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full border border-gold/10" />

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-6 max-w-2xl mx-auto"
            >
                {/* Bismillah */}
                <motion.p
                    variants={itemVariants}
                    className="text-muted-foreground text-sm md:text-base mb-6 font-serif italic"
                >
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </motion.p>

                {/* Wedding Invitation Label */}
                <motion.p
                    variants={itemVariants}
                    className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
                >
                    Undangan Pernikahan
                </motion.p>

                {/* Names */}
                <motion.div variants={itemVariants} className="mb-6">
                    <h1 className="font-script text-6xl md:text-8xl text-primary leading-none mb-2">
                        {groom.nickname}
                    </h1>
                    <div className="flex items-center justify-center gap-4 my-3">
                        <div className="h-px w-16 bg-primary/30" />
                        <HeartIcon className="w-5 h-5 text-primary animate-pulse-soft" />
                        <div className="h-px w-16 bg-primary/30" />
                    </div>
                    <h1 className="font-script text-6xl md:text-8xl text-primary leading-none">
                        {bride.nickname}
                    </h1>
                </motion.div>

                {/* Date */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm md:text-base text-muted-foreground font-serif mb-8"
                >
                    {new Date(akad.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </motion.p>

                {/* Guest Name */}
                {guestName && (
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 inline-block"
                    >
                        <p className="text-xs text-muted-foreground mb-1">Kepada Yth.</p>
                        <p className="text-base font-serif text-foreground font-medium">
                            {guestName}
                        </p>
                    </motion.div>
                )}

                {/* Open Button */}
                <motion.div variants={itemVariants}>
                    <motion.button
                        onClick={onOpen}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Buka Undangan</span>
                        <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ChevronDownIcon className="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Bottom scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                    Scroll
                </p>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-0.5 h-6 bg-primary/40 rounded-full"
                />
            </motion.div>
        </section>
    );
}