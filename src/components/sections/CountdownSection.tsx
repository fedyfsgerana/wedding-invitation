"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { useCountdown } from "@/hooks/useCountdown";
import { weddingData } from "@/lib/weddingData";
import { formatDate } from "@/lib/utils";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

interface CountdownBoxProps {
    value: number;
    label: string;
}

function CountdownBox({ value, label }: CountdownBoxProps) {
    return (
        <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-background border border-primary/20 shadow-md flex items-center justify-center mb-2 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <span className="relative text-3xl md:text-4xl font-serif font-bold text-primary">
                    {String(value).padStart(2, "0")}
                </span>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {label}
            </span>
        </motion.div>
    );
}

function getStatus(akadDate: string, akadTime: string, endTime: string) {
    const now = new Date();
    const start = new Date(`${akadDate}T${akadTime}:00`);
    const end = new Date(`${akadDate}T${endTime}:00`);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "ongoing";
    return "done";
}

export function CountdownSection() {
    const { akad } = weddingData;
    const { days, hours, minutes, seconds } = useCountdown(
        `${akad.date}T${akad.time}:00`
    );

    const status = getStatus(akad.date, akad.time, akad.endTime ?? "23:59");

    return (
        <SectionWrapper id="countdown" variant="cream">
            <div className="container-wedding text-center">
                <SectionTitle
                    decorative="Menuju Hari Bahagia"
                    title="Hitung Mundur"
                    subtitle={`Pernikahan diselenggarakan pada ${formatDate(akad.date)}`}
                />

                {/* Sudah lewat */}
                {status === "done" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="py-8"
                    >
                        <p className="font-script text-5xl text-primary mb-3">
                            Alhamdulillah
                        </p>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                            Kami telah resmi dipersatukan dalam ikatan pernikahan yang suci.
                            Terima kasih atas doa dan kehadiran Anda.
                        </p>
                    </motion.div>
                )}

                {/* Sedang berlangsung */}
                {status === "ongoing" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="py-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-2.5 h-2.5 rounded-full bg-green-500"
                            />
                            <span className="text-green-700 dark:text-green-400 text-sm font-medium">
                                Sedang Berlangsung
                            </span>
                        </div>
                        <p className="font-script text-5xl text-primary mb-3">
                            Hari Ini
                        </p>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                            Acara pernikahan Fedy & Suci sedang berlangsung saat ini.
                            Selamat datang dan terima kasih telah hadir.
                        </p>
                    </motion.div>
                )}

                {/* Belum tiba */}
                {status === "upcoming" && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 md:gap-6"
                    >
                        <CountdownBox value={days} label="Hari" />
                        <motion.span
                            variants={itemVariants}
                            className="text-3xl font-bold text-primary/40 mb-6"
                        >
                            :
                        </motion.span>
                        <CountdownBox value={hours} label="Jam" />
                        <motion.span
                            variants={itemVariants}
                            className="text-3xl font-bold text-primary/40 mb-6"
                        >
                            :
                        </motion.span>
                        <CountdownBox value={minutes} label="Menit" />
                        <motion.span
                            variants={itemVariants}
                            className="text-3xl font-bold text-primary/40 mb-6"
                        >
                            :
                        </motion.span>
                        <CountdownBox value={seconds} label="Detik" />
                    </motion.div>
                )}

                {/* Date badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-background/60"
                >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                    <p className="text-sm text-foreground font-medium">
                        {formatDate(akad.date)}
                    </p>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}