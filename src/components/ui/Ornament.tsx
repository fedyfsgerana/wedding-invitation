import { cn } from "@/lib/utils";

interface FloralSprigProps {
  size?: number;
  className?: string;
}

export function FloralSprig({ size = 96, className }: FloralSprigProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={cn("text-gold-line pointer-events-none", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 114Q36 78 80 34" />
        <path
          d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z"
          transform="translate(23.0 95.5) rotate(-1.9)"
        />
        <path
          d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z"
          transform="translate(34.3 82.3) rotate(-96.6)"
        />
        <path
          d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z"
          transform="translate(45.9 69.5) rotate(0.5)"
        />
        <path
          d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z"
          transform="translate(58.2 56.3) rotate(-94.5)"
        />
        <path d="M29.6 87.8q-14 -4 -22 -16" />
        <circle cx="7.6" cy="67.8" r="3.2" />
        <path
          d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z"
          transform="translate(84.0 30.0) rotate(-90.0)"
        />
        <path
          d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z"
          transform="translate(84.0 30.0) rotate(-18.0)"
        />
        <path
          d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z"
          transform="translate(84.0 30.0) rotate(54.0)"
        />
        <path
          d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z"
          transform="translate(84.0 30.0) rotate(126.0)"
        />
        <path
          d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z"
          transform="translate(84.0 30.0) rotate(198.0)"
        />
        <circle cx="84" cy="30" r="2.4" />
      </g>
    </svg>
  );
}

export function DotDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <span className="h-px w-8 bg-gold-line" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="h-px w-8 bg-gold-line" />
    </div>
  );
}
