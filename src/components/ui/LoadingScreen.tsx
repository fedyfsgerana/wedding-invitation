"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }}
                    className="fixed inset-0 z-999 bg-background flex flex-col items-center justify-center"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-64 h-64 rounded-full border border-primary/20"
                        />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                            className="w-80 h-80 rounded-full border border-primary/10"
                        />
                    </div>
                    <div className="relative z-10 text-center">
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="font-script text-6xl text-primary mb-4"
                        >
                            F & S
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xs uppercase tracking-widest text-muted-foreground mb-8"
                        >
                            Memuat Undangan...
                        </motion.p>
                        <div className="flex items-center justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.8,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                    className="w-2 h-2 rounded-full bg-primary"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}