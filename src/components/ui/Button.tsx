"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
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
  loading = false,
  className,
  fullWidth = false,
  target = "_self",
}: ButtonProps) {
  const Icon = useMemo(() => {
    if (loading) return LucideIcons.Loader2;
    if (!icon) return null;
    const Resolved = LucideIcons[icon as keyof typeof LucideIcons];
    return typeof Resolved === "function" ||
      (typeof Resolved === "object" && Resolved !== null)
      ? (Resolved as React.ElementType)
      : LucideIcons.Circle;
  }, [icon, loading]);

  const isDisabled = disabled || loading;

  const baseClass = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
    {
      "w-full": fullWidth,
      "opacity-50 pointer-events-none": isDisabled,
    },
    {
      "bg-primary text-primary-foreground shadow-[0_12px_24px_-14px_rgba(148,113,42,0.55)] hover:brightness-105":
        variant === "primary" || variant === "gold",
      "bg-secondary text-secondary-foreground hover:bg-accent":
        variant === "secondary",
      "border border-gold-line bg-card text-primary hover:bg-accent":
        variant === "outline",
      "text-foreground hover:bg-muted": variant === "ghost",
    },
    {
      "h-10 px-4 text-xs": size === "sm",
      "h-11 px-5 text-sm": size === "md",
      "h-13 px-7 text-[15px]": size === "lg",
    },
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon
          className={cn("w-4.5 h-4.5 shrink-0", loading && "animate-spin")}
        />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon
          className={cn("w-4.5 h-4.5 shrink-0", loading && "animate-spin")}
        />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={baseClass}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={baseClass}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
