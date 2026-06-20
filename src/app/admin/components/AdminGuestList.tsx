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
            <div className="bg-linear-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-12 flex items-center justify-center">
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