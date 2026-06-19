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
                    "bg-muted/40": variant === "muted",
                    "bg-cream dark:bg-muted/20": variant === "cream",
                    "bg-foreground text-background": variant === "dark",
                    "gradient-soft": variant === "gradient",
                },
                className
            )}
        >
            {children}
        </motion.section>
    );
}

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    decorative?: string;
    center?: boolean;
    className?: string;
}

export function SectionTitle({
    title,
    subtitle,
    decorative,
    center = true,
    className,
}: SectionTitleProps) {
    return (
        <div className={cn("mb-12", center && "text-center", className)}>
            {decorative && (
                <p className="font-script text-3xl text-primary mb-2">{decorative}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                    {subtitle}
                </p>
            )}
            <div className="flex items-center justify-center gap-2 mt-4">
                <div className="h-px w-12 bg-primary/40 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="h-px w-12 bg-primary/40 rounded-full" />
            </div>
        </div>
    );
}