"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/weddingData";

export function ExpiredScreen() {
    const { groom, bride, reception } = weddingData;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-999 bg-background flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        >
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/20 animate-pulse" />
            <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-primary/10" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-primary/20 animate-pulse" />
            <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full border border-primary/10" />
            <div className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 rounded-full bg-primary/20" />
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 rounded-full bg-primary/20" />

            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-gold) 0%, transparent 50%),
                                      radial-gradient(circle at 75% 75%, var(--color-gold) 0%, transparent 50%)`,
                }}
            />

            <div className="relative z-10 max-w-sm w-full">
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="font-script text-7xl text-primary mb-2"
                >
                    {groom.nickname}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-primary/60 text-lg mb-2"
                >
                    &amp;
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="font-script text-7xl text-primary mb-6"
                >
                    {bride.nickname}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex items-center gap-3 justify-center mb-6"
                >
                    <div className="w-12 h-px bg-primary/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="w-12 h-px bg-primary/40" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="font-serif text-2xl text-foreground mb-3"
                >
                    Undangan Telah Berakhir
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.6 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                >
                    Terima kasih telah menjadi bagian dari hari bahagia kami.
                    <br />
                    Undangan ini sudah tidak dapat diakses.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="flex items-center gap-3 justify-center mt-6 mb-4"
                >
                    <div className="w-12 h-px bg-primary/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="w-12 h-px bg-primary/40" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-xs text-muted-foreground/60 uppercase tracking-widest"
                >
                    {new Date(reception.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </motion.p>
            </div>
        </motion.div>
    );
}