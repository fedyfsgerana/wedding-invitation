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
                className="container-wedding text-center"
            >
                {/* Verse */}
                <motion.div
                    variants={itemVariants}
                    className="mb-12 px-6 py-8 rounded-2xl bg-background/60 backdrop-blur-sm border border-primary/10"
                >
                    <p className="text-primary text-2xl mb-4">❝</p>
                    <p className="text-foreground font-serif italic text-base md:text-lg leading-relaxed mb-4">
                        {verse.text}
                    </p>
                    <p className="text-primary text-sm font-medium">{verse.source}</p>
                </motion.div>

                {/* Opening message */}
                <motion.p
                    variants={itemVariants}
                    className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto"
                >
                    Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
                    menyelenggarakan pernikahan putra-putri kami:
                </motion.p>

                {/* Groom */}
                <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="font-script text-5xl md:text-6xl text-primary mb-1">
                        {groom.fullName}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Putra dari {groomParents.father} &amp; {groomParents.mother}
                    </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-3 my-6"
                >
                    <div className="h-px w-16 bg-primary/30" />
                    <p className="font-script text-3xl text-primary">dan</p>
                    <div className="h-px w-16 bg-primary/30" />
                </motion.div>

                {/* Bride */}
                <motion.div variants={itemVariants} className="mb-10">
                    <h2 className="font-script text-5xl md:text-6xl text-primary mb-1">
                        {bride.fullName}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Putri dari {brideParents.father} &amp; {brideParents.mother}
                    </p>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
}