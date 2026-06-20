"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
    password: string;
    setPassword: (v: string) => void;
    passwordError: boolean;
    setPasswordError: (v: boolean) => void;
    loginLoading: boolean;
    handleLogin: () => void;
}

export function AdminLogin({
    password,
    setPassword,
    passwordError,
    setPasswordError,
    loginLoading,
    handleLogin,
}: Props) {
    const LogInIcon = getLucideIcon("LogIn");
    const KeyIcon = getLucideIcon("KeyRound");

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary"
                />
                <motion.div
                    animate={{ y: [0, -12, 0], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-1/4 right-12 w-3 h-3 rounded-full bg-primary"
                />
                <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-1/3 left-16 w-2 h-2 rounded-full bg-primary"
                />
                <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-primary/10" />
                <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full border border-primary/10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-script text-7xl text-primary mb-2 leading-none"
                    >
                        F & S
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                        Fedy & Suci Wedding
                    </motion.p>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
                >
                    <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                            Password
                        </label>
                        <div className="relative">
                            <KeyIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                placeholder="Masukkan password"
                                className={
                                    "w-full pl-10 pr-4 py-3 rounded-xl border bg-background " +
                                    "text-foreground text-sm focus:outline-none focus:ring-2 " +
                                    "focus:ring-primary/30 transition-all " +
                                    (passwordError
                                        ? "border-red-400 focus:ring-red-200"
                                        : "border-border focus:border-primary")
                                }
                            />
                        </div>
                        <AnimatePresence>
                            {passwordError && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-red-500 mt-2 flex items-center gap-1"
                                >
                                    ✕ Password salah, coba lagi.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogin}
                        disabled={loginLoading}
                        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm hover:shadow-md transition-shadow"
                    >
                        {loginLoading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                />
                                Memeriksa...
                            </>
                        ) : (
                            <>
                                <LogInIcon className="w-4 h-4" />
                                Masuk
                            </>
                        )}
                    </motion.button>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-xs text-muted-foreground/50 mt-6"
                >
                    Fedy & Suci Wedding·
                </motion.p>
            </motion.div>
        </div>
    );
}