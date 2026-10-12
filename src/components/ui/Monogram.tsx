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
        r="31"
        fill="#fffdf8"
        stroke="#c9a24f"
        strokeWidth="1.4"
      />
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="#dfc995"
        strokeOpacity="0.75"
        strokeWidth="0.8"
      />
      <text
        x="19.5"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill="#94712a"
      >
        F
      </text>
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-italianno), cursive"
        fontSize="24"
        fill="#b8923f"
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
        fill="#94712a"
      >
        S
      </text>
    </svg>
  );
}
