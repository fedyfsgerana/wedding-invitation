"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export function LoveStorySection() {
    const { loveStory } = weddingData;

    return (
        <SectionWrapper id="lovestory" variant="gradient">
            <div className="container-wedding px-4">
                <SectionTitle
                    decorative="Kisah Cinta"
                    title="Perjalanan Kami"
                    subtitle="Setiap momen adalah bagian dari cerita indah yang Allah tuliskan untuk kami"
                />

                <div className="relative max-w-lg mx-auto">
                    {/* Timeline line - only mobile vertical */}
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-primary/15 md:hidden" />

                    {/* Desktop center line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/15 hidden md:block" />

                    <div className="space-y-6 md:space-y-0">
                        {loveStory.map((item, index) => {
                            const Icon = getLucideIcon(item.icon);
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`relative flex items-start gap-3 md:gap-0 md:items-center md:mb-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Mobile: icon kiri */}
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 md:hidden">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>

                                    {/* Card */}
                                    <div className="flex-1 md:w-5/12 md:flex-none">
                                        <div className="card-wedding p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="hidden md:flex w-8 h-8 rounded-full bg-primary/10 items-center justify-center shrink-0">
                                                    <Icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-primary font-medium">{item.date}</p>
                                                    <h4 className="font-serif text-sm font-bold text-foreground">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-xs leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop center dot */}
                                    <div className="hidden md:flex w-2/12 justify-center">
                                        <div className="w-3 h-3 rounded-full bg-primary border-4 border-background shadow-md" />
                                    </div>

                                    <div className="hidden md:block w-5/12" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}