import { useId } from "react";
import { cn } from "@/lib/utils";

interface MonogramProps {
  size?: number;
  className?: string;
  title?: string;
}

export function Monogram({ size = 40, className, title }: MonogramProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a24f" />
          <stop offset="1" stopColor="#94712a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={`url(#${gradientId})`} />
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="#f6eedd"
        strokeOpacity="0.7"
        strokeWidth="0.8"
      />
      <text
        x="19.5"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill="#fdf9f0"
      >
        F
      </text>
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-italianno), cursive"
        fontSize="24"
        fill="#f3e3bb"
      >
        &amp;
      </text>
      <text
        x="44.5"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill="#fdf9f0"
      >
        S
      </text>
    </svg>
  );
}