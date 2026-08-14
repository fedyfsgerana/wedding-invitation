"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
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

export function LoveStorySection() {
  const { loveStory } = weddingData;

  return (
    <SectionWrapper id="lovestory" variant="default">
      <div className="container-wedding px-4">
        <div className="relative max-w-lg md:max-w-2xl mx-auto border border-primary/20 rounded-[1.75rem] px-2 py-2">
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
                Kisah Cinta
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                Perjalanan Kami
              </h2>
              <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
                Setiap momen adalah bagian dari cerita indah yang Allah tuliskan
                untuk kami
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-primary/15 md:hidden" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/15 hidden md:block" />

              <div className="space-y-5 md:space-y-0">
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
                      className={`relative flex items-start gap-3 md:gap-0 md:items-center md:mb-8 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="relative z-10 w-10 h-10 shrink-0 md:hidden">
                        <div className="absolute inset-0 rounded-full gradient-primary opacity-15" />
                        <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                      </div>

                      <div className="flex-1 md:w-5/12 md:flex-none">
                        <div className="rounded-2xl border border-primary/15 bg-card p-3 md:p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="relative hidden md:block w-9 h-9 shrink-0">
                              <div className="absolute inset-0 rounded-full gradient-primary opacity-15" />
                              <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                                <Icon className="w-4 h-4 text-primary" />
                              </div>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] uppercase tracking-widest font-sans font-medium text-primary">
                                {item.date}
                              </p>
                              <h4 className="font-serif text-sm md:text-base font-semibold text-foreground">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-xs md:text-sm font-sans leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:flex w-2/12 justify-center">
                        <div className="relative w-4 h-4">
                          <div className="absolute inset-0 rounded-full gradient-primary opacity-30" />
                          <div className="absolute inset-1 rounded-full bg-primary" />
                        </div>
                      </div>

                      <div className="hidden md:block w-5/12" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
