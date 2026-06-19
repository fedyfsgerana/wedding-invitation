"use client";

import { useEffect, useState } from "react";

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

export function FloatingPetals() {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        const generated: Petal[] = Array.from({ length: 10 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 8 + 6,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 12,
            color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        }));
        setPetals(generated);
    }, []);

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