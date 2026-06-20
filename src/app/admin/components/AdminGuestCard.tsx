"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { Guest } from "../page";

interface Props {
    guest: Guest;
    index: number;
    copiedId: string | null;
    onCopy: (guest: Guest) => void;
    onWhatsapp: (guest: Guest) => void;
    onToggleSent: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AdminGuestCard({
    guest,
    index,
    copiedId,
    onCopy,
    onWhatsapp,
    onToggleSent,
    onDelete,
}: Props) {
    const CopyIcon = getLucideIcon("Copy");
    const CheckIcon = getLucideIcon("Check");
    const TrashIcon = getLucideIcon("Trash2");
    const SendIcon = getLucideIcon("Send");
    const WhatsappIcon = getLucideIcon("MessageSquare");
    const EyeIcon = getLucideIcon("Eye");
    const ClockIcon = getLucideIcon("Clock");

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.03 }}
            className={
                "group relative rounded-2xl border p-4 transition-all duration-300 bg-linear-to-br " +
                (guest.sent
                    ? "from-green-50 via-green-50/50 to-transparent border-green-100 opacity-80"
                    : "from-card via-card to-primary/5 border-border hover:border-primary/25 hover:from-primary/5 hover:via-card hover:to-primary/10 hover:shadow-md")
            }
        >
            <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_140px_120px_160px] items-center gap-3">
                {/* Kolom 1: Avatar + Nama */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className={
                        "w-11 h-11 rounded-full flex items-center justify-center shrink-0 " +
                        "font-bold text-sm border transition-all duration-300 " +
                        (guest.sent
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30")
                    }>
                        {guest.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                            {guest.name}
                        </p>
                        {/* Tanggal & status muncul di sini hanya saat mobile */}
                        <div className="flex items-center gap-2 mt-0.5 md:hidden">
                            <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                                <ClockIcon className="w-3 h-3 shrink-0" />
                                {guest.createdAt}
                            </p>
                            {guest.sent && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 shrink-0">
                                    ✓ Terkirim
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Kolom 2: Tanggal - desktop saja */}
                <p className="hidden md:flex items-center gap-1 text-xs text-muted-foreground/60">
                    <ClockIcon className="w-3 h-3 shrink-0" />
                    {guest.createdAt}
                </p>

                {/* Kolom 3: Status - desktop saja */}
                <div className="hidden md:block">
                    {guest.sent ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                            ✓ Terkirim
                        </span>
                    ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                            Belum kirim
                        </span>
                    )}
                </div>

                {/* Kolom 4: Aksi */}
                <div className="flex items-center justify-end gap-0.5 shrink-0">
                    <motion.a
                        href={guest.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-muted-foreground"
                        title="Preview undangan"
                    >
                        <EyeIcon className="w-4 h-4" />
                    </motion.a>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onCopy(guest)}
                        className="p-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-muted-foreground"
                        title="Salin link"
                    >
                        {copiedId === guest.id ? (
                            <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                            <CopyIcon className="w-4 h-4" />
                        )}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onWhatsapp(guest)}
                        className="p-2 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 text-muted-foreground"
                        title="Kirim via WhatsApp"
                    >
                        <WhatsappIcon className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggleSent(guest.id)}
                        className={
                            "p-2 rounded-xl transition-all duration-200 " +
                            (guest.sent
                                ? "text-amber-500 hover:bg-amber-50"
                                : "text-muted-foreground hover:bg-primary/10 hover:text-primary")
                        }
                        title={guest.sent ? "Tandai belum terkirim" : "Tandai sudah terkirim"}
                    >
                        <SendIcon className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(guest.id)}
                        className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200 text-muted-foreground"
                        title="Hapus tamu"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}