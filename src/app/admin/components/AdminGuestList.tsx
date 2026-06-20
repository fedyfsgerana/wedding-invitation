"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { Guest } from "../page";
import { AdminGuestCard } from "./AdminGuestCard";

interface Props {
    guests: Guest[];
    allGuestsCount: number;
    loadingGuests: boolean;
    copiedId: string | null;
    onCopy: (guest: Guest) => void;
    onWhatsapp: (guest: Guest) => void;
    onToggleSent: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AdminGuestList({
    guests,
    allGuestsCount,
    loadingGuests,
    copiedId,
    onCopy,
    onWhatsapp,
    onToggleSent,
    onDelete,
}: Props) {
    const UsersIcon = getLucideIcon("Users");

    if (loadingGuests) {
        return (
            <div className="bg-linear-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-script text-5xl text-primary"
                >
                    F & S
                </motion.p>
                <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
                            className="w-2 h-2 rounded-full bg-primary"
                        />
                    ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Memuat data tamu...
                </p>
            </div>
        );
    }

    if (guests.length === 0) {
        return (
            <div className="bg-linear-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <UsersIcon className="w-6 h-6 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground">
                    {allGuestsCount === 0
                        ? "Belum ada tamu. Tambahkan tamu di atas."
                        : "Tidak ada tamu yang sesuai pencarian."}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2.5">
            <AnimatePresence>
                {guests.map((guest, index) => (
                    <AdminGuestCard
                        key={guest.id}
                        guest={guest}
                        index={index}
                        copiedId={copiedId}
                        onCopy={onCopy}
                        onWhatsapp={onWhatsapp}
                        onToggleSent={onToggleSent}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}