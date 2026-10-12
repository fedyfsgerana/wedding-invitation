"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "cream";
  noPadding?: boolean;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
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
      variants={sectionVariants}
      className={cn(
        "relative w-full scroll-mt-20 md:scroll-mt-24",
        !noPadding && "section-padding",
        variant === "cream" ? "bg-cream" : "bg-background",
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

const titleVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const titleItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function SectionTitle({
  title,
  subtitle,
  eyebrow,
  center = true,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("mb-8 md:mb-12", center && "text-center", className)}
    >
      {eyebrow && (
        <motion.p variants={titleItem} className="eyebrow mb-3">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={titleItem}
        className="font-serif text-[30px] md:text-[40px] font-semibold leading-tight text-foreground"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={titleItem}
          className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
