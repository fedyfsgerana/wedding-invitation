"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
    guestName: string;
    setGuestName: (v: string) => void;
    onAdd: () => void;
}

export function AdminAddGuest({ guestName, setGuestName, onAdd }: Props) {
    const UsersIcon = getLucideIcon("Users");
    const PlusIcon = getLucideIcon("Plus");

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-linear-to-br from-card via-card to-primary/5 border border-border hover:border-primary/20 rounded-2xl p-5 shadow-sm transition-all duration-300"
        >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Tambah Tamu Baru
            </p>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <UsersIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onAdd()}
                        placeholder="Nama tamu..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onAdd}
                    className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 text-sm font-medium shrink-0 shadow-sm hover:shadow-md hover:brightness-105 transition-all"
                >
                    <PlusIcon className="w-4 h-4" />
                    Tambah
                </motion.button>
            </div>
        </motion.div>
    );
}