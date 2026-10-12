import { cn } from "@/lib/utils";

interface MonogramProps {
  size?: number;
  className?: string;
  title?: string;
}

export function Monogram({ size = 40, className, title }: MonogramProps) {
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
      <circle
        cx="32"
        cy="32"
        r="30.5"
        fill="none"
        stroke="var(--color-gold-line)"
        strokeWidth="1.2"
      />
      <circle
        cx="32"
        cy="32"
        r="26.5"
        fill="none"
        stroke="var(--color-gold)"
        strokeOpacity="0.45"
        strokeWidth="0.6"
      />
      <path
        d="M29.5 47 L34.5 17"
        stroke="var(--color-gold)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <text
        x="22.5"
        y="38"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="24"
        fontWeight="600"
        fill="var(--color-primary)"
      >
        F
      </text>
      <text
        x="41.5"
        y="45"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="24"
        fontWeight="600"
        fill="var(--color-primary)"
      >
        S
      </text>
    </svg>
  );
}
