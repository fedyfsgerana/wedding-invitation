"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon } from "@/lib/utils";
import { RSVPData, WishItem } from "@/types";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const ATTENDANCE_OPTIONS = [
    { value: "hadir", label: "Hadir", icon: "CheckCircle" },
    { value: "tidak_hadir", label: "Tidak Hadir", icon: "XCircle" },
    { value: "masih_ragu", label: "Masih Ragu", icon: "HelpCircle" },
];

const STORAGE_KEY = "wedding-wishes-fedy-suci";

export function RSVPSection() {
    const [form, setForm] = useState<RSVPData>({
        name: "",
        attendance: "hadir",
        guestCount: 1,
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [wishes, setWishes] = useState<WishItem[]>([]);
    const [loading, setLoading] = useState(false);

    const SendIcon = getLucideIcon("Send");
    const CheckIcon = getLucideIcon("CheckCircle");
    const UserIcon = getLucideIcon("User");
    const UsersIcon = getLucideIcon("Users");
    const MessageIcon = getLucideIcon("MessageCircle");

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setWishes(JSON.parse(stored));
        } catch {
            console.error("Gagal memuat ucapan");
        }
    }, []);

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.message.trim()) return;
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newWish: WishItem = {
            id: Date.now().toString(),
            name: form.name,
            message: form.message,
            attendance: form.attendance,
            timestamp: new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
        };

        const updated = [newWish, ...wishes];
        setWishes(updated);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
            console.error("Gagal menyimpan ucapan");
        }

        setSubmitted(true);
        setLoading(false);
    };

    const handleReset = () => {
        setForm({ name: "", attendance: "hadir", guestCount: 1, message: "" });
        setSubmitted(false);
    };

    return (
        <SectionWrapper id="rsvp" variant="gradient">
            <div className="container-wedding px-4">
                <SectionTitle
                    decorative="RSVP"
                    title="Konfirmasi Kehadiran"
                    subtitle="Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i agar kami dapat mempersiapkan segalanya dengan baik"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="card-wedding p-5"
                    >
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center text-center py-8 gap-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <CheckIcon className="w-8 h-8 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl font-bold text-foreground mb-1">
                                            Terima Kasih!
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            Konfirmasi dan ucapan Anda telah kami terima.
                                        </p>
                                    </div>
                                    <Button onClick={handleReset} variant="outline" size="sm">
                                        Kirim Lagi
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                                            <UserIcon className="w-3.5 h-3.5 text-primary" />
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Masukkan nama Anda"
                                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                                            Konfirmasi Kehadiran
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {ATTENDANCE_OPTIONS.map((option) => {
                                                const OptionIcon = getLucideIcon(option.icon);
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={() =>
                                                            setForm({ ...form, attendance: option.value as RSVPData["attendance"] })
                                                        }
                                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${form.attendance === option.value
                                                                ? "border-primary bg-primary/10 text-primary"
                                                                : "border-border bg-background text-muted-foreground hover:border-primary/40"
                                                            }`}
                                                    >
                                                        <OptionIcon className="w-4 h-4" />
                                                        {option.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {form.attendance === "hadir" && (
                                        <div>
                                            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                                                <UsersIcon className="w-3.5 h-3.5 text-primary" />
                                                Jumlah Tamu
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setForm({ ...form, guestCount: Math.max(1, form.guestCount - 1) })}
                                                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground font-medium"
                                                >
                                                    -
                                                </button>
                                                <span className="text-base font-bold text-foreground w-6 text-center">
                                                    {form.guestCount}
                                                </span>
                                                <button
                                                    onClick={() => setForm({ ...form, guestCount: Math.min(10, form.guestCount + 1) })}
                                                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground font-medium"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                                            <MessageIcon className="w-3.5 h-3.5 text-primary" />
                                            Ucapan &amp; Doa
                                        </label>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                                            rows={4}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        variant="primary"
                                        size="md"
                                        icon="Send"
                                        iconPosition="right"
                                        fullWidth
                                        disabled={!form.name.trim() || !form.message.trim() || loading}
                                    >
                                        {loading ? "Mengirim..." : "Kirim Ucapan"}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Wishes List */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide"
                    >
                        {wishes.length === 0 ? (
                            <div className="card-wedding p-8 text-center">
                                <MessageIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                <p className="text-muted-foreground text-sm">
                                    Belum ada ucapan. Jadilah yang pertama!
                                </p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {wishes.map((wish) => (
                                    <motion.div
                                        key={wish.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="card-wedding p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <UserIcon className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                                                    <p className="text-sm font-medium text-foreground truncate">
                                                        {wish.name}
                                                    </p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${wish.attendance === "hadir"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : wish.attendance === "tidak_hadir"
                                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                        }`}>
                                                        {wish.attendance === "hadir" ? "Hadir"
                                                            : wish.attendance === "tidak_hadir" ? "Tidak Hadir"
                                                                : "Masih Ragu"}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                                                    {wish.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground/60 mt-1">
                                                    {wish.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}