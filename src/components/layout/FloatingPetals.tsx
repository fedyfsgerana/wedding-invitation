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
    "#f9a8d4",
    "#fda4af",
    "#fbcfe8",
    "#fecdd3",
    "#f0abfc",
    "#e879f9",
];

export function FloatingPetals() {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 10 + 8,
            duration: Math.random() * 8 + 8,
            delay: Math.random() * 10,
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