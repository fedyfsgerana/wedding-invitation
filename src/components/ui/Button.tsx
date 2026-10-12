"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { usePending } from "@/hooks/usePending";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => unknown;
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
  type?: "button" | "submit";
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
  type = "button",
}: ButtonProps) {
  const { pending, run } = usePending(href ? 800 : 500);
  const busy = loading || pending;

  const Icon = useMemo(() => {
    if (!icon) return null;
    const Resolved = LucideIcons[icon as keyof typeof LucideIcons];
    return typeof Resolved === "function" ||
      (typeof Resolved === "object" && Resolved !== null)
      ? (Resolved as React.ElementType)
      : LucideIcons.Circle;
  }, [icon]);

  const isDisabled = disabled && !busy;

  const baseClass = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
    {
      "w-full": fullWidth,
      "opacity-50 pointer-events-none": isDisabled,
      "cursor-wait opacity-85": busy,
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

  const leading = busy ? (
    <Spinner />
  ) : (
    Icon && iconPosition === "left" && <Icon className="w-4.5 h-4.5 shrink-0" />
  );

  const content = (
    <>
      {leading}
      {children}
      {!busy && Icon && iconPosition === "right" && (
        <Icon className="w-4.5 h-4.5 shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={() => {
          run();
        }}
        aria-busy={busy}
        className={baseClass}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={
        type === "submit" && !onClick
          ? undefined
          : () => {
              if (!busy) run(onClick);
            }
      }
      disabled={isDisabled || busy}
      aria-busy={busy}
      className={baseClass}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
