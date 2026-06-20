"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { WishItem } from "@/types";

interface Props {
    open: boolean;
    onClose: () => void;
    wishes: WishItem[];
    loading: boolean;
}

function attendanceBadge(attendance: string) {
    if (attendance === "hadir") {
        return { label: "Hadir", className: "bg-green-100 text-green-700" };
    }
    if (attendance === "tidak_hadir") {
        return { label: "Tidak Hadir", className: "bg-red-100 text-red-700" };
    }
    return { label: "Masih Ragu", className: "bg-yellow-100 text-yellow-700" };
}

export function AdminWishesModal({ open, onClose, wishes, loading }: Props) {
    const XIcon = getLucideIcon("X");
    const UserIcon = getLucideIcon("User");
    const MessageIcon = getLucideIcon("MessageCircle");

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl border border-border shadow-xl max-h-[85vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                            <div className="flex items-center gap-2">
                                <MessageIcon className="w-4.5 h-4.5 text-primary" />
                                <h3 className="font-semibold text-foreground text-sm">
                                    Ucapan &amp; Doa Masuk
                                </h3>
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                    {wishes.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Realtime indicator */}
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 border border-green-100">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                                    </span>
                                    <span className="text-[10px] text-green-600 font-medium">Live</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="overflow-y-auto px-5 py-4 space-y-3">
                            {loading ? (
                                <p className="text-xs uppercase tracking-widest text-muted-foreground text-center py-10">
                                    Memuat ucapan...
                                </p>
                            ) : wishes.length === 0 ? (
                                <div className="text-center py-10">
                                    <MessageIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">
                                        Belum ada ucapan yang masuk.
                                    </p>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {wishes.map((wish) => {
                                        const badge = attendanceBadge(wish.attendance);
                                        return (
                                            <motion.div
                                                key={wish.id}
                                                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                                                layout
                                                className="rounded-xl border border-border bg-background p-3.5"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                        <UserIcon className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                                                            <p className="text-sm font-medium text-foreground truncate">
                                                                {wish.name}
                                                            </p>
                                                            <span
                                                                className={
                                                                    "text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium " +
                                                                    badge.className
                                                                }
                                                            >
                                                                {badge.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                                                            {wish.message}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground/60 mt-1.5">
                                                            {wish.timestamp}
                                                            {wish.attendance === "hadir" && wish.guestCount
                                                                ? ` · ${wish.guestCount} orang`
                                                                : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}