"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

export function AgendaSection() {
    const { agenda } = weddingData;

    return (
        <SectionWrapper id="agenda" variant="muted">
            <div className="container-wedding px-4">
                <SectionTitle
                    decorative="Rundown"
                    title="Susunan Acara"
                    subtitle="Rangkaian acara yang akan berlangsung pada hari bahagia kami"
                />
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-lg mx-auto space-y-4"
                >
                    {agenda.map((item, index) => {
                        const Icon = getLucideIcon(item.icon);
                        const isLast = index === agenda.length - 1;
                        return (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                className="relative flex items-start gap-3"
                            >
                                {!isLast && (
                                    <div className="absolute left-5 top-10 w-px h-full bg-primary/15" />
                                )}
                                <div className="relative z-10 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 card-wedding p-3 md:p-4 min-w-0">
                                    <div className="flex items-start justify-between gap-2 flex-wrap">
                                        <div className="min-w-0">
                                            <h4 className="font-serif text-sm md:text-base font-bold text-foreground mb-0.5">
                                                {item.title}
                                            </h4>
                                            {item.description && (
                                                <p className="text-xs md:text-sm text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap shrink-0">
                                            {item.time}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}