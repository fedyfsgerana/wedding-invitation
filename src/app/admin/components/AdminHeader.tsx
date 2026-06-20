"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
    guestCount: number;
    totalSent: number;
    wishesCount: number;
    onOpenWishes: () => void;
    onLogout: () => void;
}

export function AdminHeader({ guestCount, totalSent, wishesCount, onOpenWishes, onLogout }: Props) {
    const UsersIcon = getLucideIcon("Users");
    const SendIcon = getLucideIcon("Send");
    const MessageIcon = getLucideIcon("MessageCircle");
    const LogOutIcon = getLucideIcon("LogOut");

    return (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="font-script text-3xl text-primary leading-none hover:opacity-70 transition-opacity"
                >
                    F & S
                </button>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs text-primary/70">
                            <UsersIcon className="w-3.5 h-3.5" />
                            <span>{guestCount} tamu</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-xs text-green-600 border border-green-100">
                            <SendIcon className="w-3.5 h-3.5" />
                            <span>{totalSent} terkirim</span>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onOpenWishes}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
                    >
                        <MessageIcon className="w-3.5 h-3.5" />
                        Ucapan
                        <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-[10px] font-semibold leading-none">
                            {wishesCount}
                        </span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onLogout}
                        className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all flex items-center gap-1.5"
                    >
                        <LogOutIcon className="w-3.5 h-3.5" />
                        Keluar
                    </motion.button>
                </div>
            </div>
        </div>
    );
}