"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "muted" | "cream" | "dark" | "gradient";
  noPadding?: boolean;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function SectionWrapper({
  children,
  id,
  className,
  variant = "default",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      className={cn(
        "w-full scroll-mt-20 md:scroll-mt-24",
        !noPadding && "section-padding",
        {
          "bg-background": variant === "default",
          "bg-muted": variant === "muted",
          "bg-cream": variant === "cream",
          "bg-foreground text-background": variant === "dark",
          "gradient-soft": variant === "gradient",
        },
        className,
      )}
    >
      {children}
    </motion.section>
  );
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  eyebrow,
  center = true,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-8 md:mb-12", center && "text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-[27px] md:text-4xl font-semibold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}