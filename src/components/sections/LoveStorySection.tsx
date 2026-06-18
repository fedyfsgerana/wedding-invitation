"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const itemVariantsRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export function LoveStorySection() {
    const { loveStory } = weddingData;

    return (
        <SectionWrapper id="lovestory" variant="gradient">
            <div className="container-wedding">
                <SectionTitle
                    decorative="Kisah Cinta"
                    title="Perjalanan Kami"
                    subtitle="Setiap momen adalah bagian dari cerita indah yang Allah tuliskan untuk kami"
                />

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/20 hidden md:block" />

                    <div className="space-y-8 md:space-y-0">
                        {loveStory.map((item, index) => {
                            const Icon = getLucideIcon(item.icon);
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    variants={isLeft ? itemVariants : itemVariantsRight}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`relative flex items-center md:mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Card */}
                                    <div className="w-full md:w-5/12">
                                        <div className="card-wedding p-5 hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-primary font-medium">
                                                        {item.date}
                                                    </p>
                                                    <h4 className="font-serif text-base font-bold text-foreground">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center dot */}
                                    <div className="hidden md:flex w-2/12 justify-center">
                                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md" />
                                    </div>

                                    {/* Empty space */}
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