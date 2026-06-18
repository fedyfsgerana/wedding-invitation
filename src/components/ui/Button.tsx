"use client";

import { motion } from "framer-motion";
import { getLucideIcon, cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
    size?: "sm" | "md" | "lg";
    icon?: string;
    iconPosition?: "left" | "right";
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    target?: "_blank" | "_self";
}

export function Button({
    children,
    onClick,
    href,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    disabled = false,
    className,
    fullWidth = false,
    target = "_self",
}: ButtonProps) {
    const Icon = icon ? getLucideIcon(icon) : null;

    const baseClass = cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer select-none",
        {
            "w-full": fullWidth,
            "opacity-50 pointer-events-none": disabled,
        },
        {
            "bg-primary text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg":
                variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80":
                variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground":
                variant === "outline",
            "text-foreground hover:bg-muted": variant === "ghost",
            "bg-linear-to-r from-yellow-400 to-yellow-600 text-white hover:opacity-90 shadow-md hover:shadow-lg":
                variant === "gold",
        },
        {
            "text-xs px-4 py-2": size === "sm",
            "text-sm px-6 py-3": size === "md",
            "text-base px-8 py-4": size === "lg",
        },
        className
    );

    const content = (
        <>
            {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
            {children}
            {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className={baseClass}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={baseClass}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            {content}
        </motion.button>
    );
}