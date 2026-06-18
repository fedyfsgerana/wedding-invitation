"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon, generateInviteLink } from "@/lib/utils";
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
        <SectionWrapper id="penutup" variant="dark" className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--rose)) 0%, transparent 60%),
                             radial-gradient(circle at 80% 50%, hsl(var(--gold)) 0%, transparent 60%)`,
                    }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container-wedding text-center relative z-10"
            >
                {/* Closing message */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm uppercase tracking-widest text-foreground/50 mb-6"
                >
                    Terima Kasih
                </motion.p>

                <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="font-script text-5xl md:text-7xl text-primary mb-2">
                        {groom.nickname}
                    </h2>
                    <div className="flex items-center justify-center gap-3 my-2">
                        <div className="h-px w-12 bg-primary/30" />
                        <HeartIcon className="w-4 h-4 text-primary" />
                        <div className="h-px w-12 bg-primary/30" />
                    </div>
                    <h2 className="font-script text-5xl md:text-7xl text-primary">
                        {bride.nickname}
                    </h2>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-foreground/70 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10"
                >
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                    Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
                    Atas kehadiran dan doa restu, kami mengucapkan terima kasih.
                </motion.p>

                {/* Copy link */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Button
                        onClick={copyLink}
                        variant="outline"
                        size="md"
                        icon={copied ? "Check" : "Link"}
                        className="border-foreground/20 text-foreground hover:bg-foreground/10"
                    >
                        {copied ? "Link Tersalin!" : "Salin Link Undangan"}
                    </Button>
                </motion.div>

                {/* Footer */}
                <motion.p
                    variants={itemVariants}
                    className="mt-12 text-foreground/30 text-xs"
                >
                    Made with ❤️ — {new Date().getFullYear()}
                </motion.p>
            </motion.div>
        </SectionWrapper>
    );
}