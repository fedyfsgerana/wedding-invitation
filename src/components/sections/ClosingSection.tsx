"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
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
        transition: { staggerChildren: 0.15 },
    },
};

export function ClosingSection() {
    const { groom, bride } = weddingData;
    const [copied, setCopied] = useState(false);

    const LinkIcon = getLucideIcon("Link");
    const CheckIcon = getLucideIcon("Check");
    const HeartIcon = getLucideIcon("Heart");

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
            className="relative overflow-hidden w-full py-20 px-4"
            style={{
                background: "linear-gradient(135deg, hsl(30 15% 12%) 0%, hsl(30 20% 8%) 100%)",
            }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-gold) 0%, transparent 60%),
                             radial-gradient(circle at 80% 50%, var(--color-gold) 0%, transparent 60%)`,
                    }}
                />
            </div>

            {/* Decorative circles */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-yellow-600/10" />
            <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border border-yellow-600/10" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container-wedding text-center relative z-10"
            >
                {/* Label */}
                <motion.p
                    variants={itemVariants}
                    className="text-xs uppercase tracking-widest mb-6"
                    style={{ color: "rgba(212, 168, 67, 0.6)" }}
                >
                    Terima Kasih
                </motion.p>

                {/* Names */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h2
                        className="font-script text-6xl md:text-7xl leading-none mb-3"
                        style={{ color: "hsl(43 65% 55%)" }}
                    >
                        {groom.nickname}
                    </h2>
                    <div className="flex items-center justify-center gap-3 my-3">
                        <div className="h-px w-12" style={{ backgroundColor: "rgba(212, 168, 67, 0.3)" }} />
                        <HeartIcon className="w-5 h-5" style={{ color: "hsl(43 65% 55%)" }} />
                        <div className="h-px w-12" style={{ backgroundColor: "rgba(212, 168, 67, 0.3)" }} />
                    </div>
                    <h2
                        className="font-script text-6xl md:text-7xl leading-none"
                        style={{ color: "hsl(43 65% 55%)" }}
                    >
                        {bride.nickname}
                    </h2>
                </motion.div>

                {/* Message */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10"
                    style={{ color: "rgba(255, 248, 230, 0.7)" }}
                >
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                    Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
                    Atas kehadiran dan doa restu, kami mengucapkan terima kasih.
                </motion.p>

                {/* Copy link button */}
                <motion.div variants={itemVariants} className="mb-12">
                    <motion.button
                        onClick={copyLink}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium transition-all"
                        style={{
                            border: "1px solid rgba(212, 168, 67, 0.4)",
                            color: copied ? "rgb(134, 239, 172)" : "rgba(255, 248, 230, 0.9)",
                            backgroundColor: copied
                                ? "rgba(134, 239, 172, 0.1)"
                                : "rgba(212, 168, 67, 0.08)",
                        }}
                    >
                        {copied ? (
                            <CheckIcon className="w-4 h-4" style={{ color: "rgb(134, 239, 172)" }} />
                        ) : (
                            <LinkIcon className="w-4 h-4" style={{ color: "hsl(43 65% 55%)" }} />
                        )}
                        {copied ? "Link Berhasil Disalin!" : "Salin Link Undangan"}
                    </motion.button>
                </motion.div>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-3 mb-8"
                >
                    <div className="h-px w-16" style={{ backgroundColor: "rgba(212, 168, 67, 0.2)" }} />
                    <HeartIcon className="w-3 h-3" style={{ color: "rgba(212, 168, 67, 0.4)" }} />
                    <div className="h-px w-16" style={{ backgroundColor: "rgba(212, 168, 67, 0.2)" }} />
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="space-y-1">
                    <p
                        className="font-script text-2xl"
                        style={{ color: "hsl(43 65% 50%)" }}
                    >
                        {groom.nickname} & {bride.nickname}
                    </p>
                    <p
                        className="text-xs"
                        style={{ color: "rgba(255, 248, 230, 0.3)" }}
                    >
                        {new Date(weddingData.akad.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <p
                        className="text-xs pt-4"
                        style={{ color: "rgba(255, 248, 230, 0.2)" }}
                    >
                        © {new Date().getFullYear()} Fedy & Suci Wedding. All rights reserved.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}