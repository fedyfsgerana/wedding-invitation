"use client";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const PETAL_COLORS = [
  "#d4a843",
  "#e8c97a",
  "#c9a84c",
  "#f0dfa0",
  "#b8956a",
  "#e2c97e",
];

const PETAL_COUNT = 10;

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const petals: Petal[] = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const r1 = seededRandom(i * 12.9898);
  const r2 = seededRandom(i * 78.233);
  const r3 = seededRandom(i * 37.719);
  const r4 = seededRandom(i * 93.989);
  const r5 = seededRandom(i * 51.473);

  return {
    id: i,
    left: r1 * 100,
    size: r2 * 8 + 6,
    duration: r3 * 10 + 10,
    delay: r4 * 12,
    color: PETAL_COLORS[Math.floor(r5 * PETAL_COLORS.length)],
  };
});

export function FloatingPetals() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            backgroundColor: petal.color,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
