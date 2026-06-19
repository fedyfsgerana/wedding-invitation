"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/lib/weddingData";

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

export function OpeningSection() {
    const { verse, groom, bride, groomParents, brideParents } = weddingData;

    return (
        <SectionWrapper id="pembuka" variant="gradient">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container-wedding text-center px-4"
            >
                {/* Verse */}
                <motion.div
                    variants={itemVariants}
                    className="mb-10 px-4 py-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-primary/10"
                >
                    <p className="text-primary text-2xl mb-3">❝</p>
                    <p className="text-foreground font-serif italic text-sm md:text-base leading-relaxed mb-3">
                        {verse.text}
                    </p>
                    <p className="text-primary text-sm font-medium">{verse.source}</p>
                </motion.div>

                {/* Opening message */}
                <motion.p
                    variants={itemVariants}
                    className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm mx-auto"
                >
                    Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
                    menyelenggarakan pernikahan putra-putri kami:
                </motion.p>

                {/* Groom */}
                <motion.div variants={itemVariants} className="mb-4">
                    <h2 className="font-script text-4xl md:text-5xl text-primary mb-1 break-words">
                        {groom.fullName}
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm">
                        Putra dari {groomParents.father} &amp; {groomParents.mother}
                    </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-3 my-5"
                >
                    <div className="h-px w-12 bg-primary/30" />
                    <p className="font-script text-2xl text-primary">dan</p>
                    <div className="h-px w-12 bg-primary/30" />
                </motion.div>

                {/* Bride */}
                <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="font-script text-4xl md:text-5xl text-primary mb-1 break-words">
                        {bride.fullName}
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm">
                        Putri dari {brideParents.father} &amp; {brideParents.mother}
                    </p>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
}