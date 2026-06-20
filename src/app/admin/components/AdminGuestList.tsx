"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { Guest } from "../page";
import { AdminGuestCard } from "./AdminGuestCard";

interface Props {
    guests: Guest[];
    allGuestsCount: number;
    filteredCount: number;
    loadingGuests: boolean;
    copiedId: string | null;
    onCopy: (guest: Guest) => void;
    onWhatsapp: (guest: Guest) => void;
    onToggleSent: (id: string) => void;
    onDelete: (id: string) => void;
    pageSize: number;
    setPageSize: (v: number) => void;
    currentPage: number;
    setCurrentPage: (v: number) => void;
    totalPages: number;
}

const PAGE_SIZE_MIN = 1;
const PAGE_SIZE_MAX = 100;

export function AdminGuestList({
    guests,
    allGuestsCount,
    filteredCount,
    loadingGuests,
    copiedId,
    onCopy,
    onWhatsapp,
    onToggleSent,
    onDelete,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalPages,
}: Props) {
    const UsersIcon = getLucideIcon("Users");
    const ChevronLeftIcon = getLucideIcon("ChevronLeft");
    const ChevronRightIcon = getLucideIcon("ChevronRight");

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

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, filteredCount);

    const goToPage = (page: number) => {
        const clamped = Math.min(Math.max(page, 1), totalPages);
        setCurrentPage(clamped);
    };

    return (
        <div className="space-y-3">
            {/* Selector jumlah per halaman */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs text-muted-foreground">
                    Menampilkan {startItem}-{endItem} dari {filteredCount} tamu
                </p>
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Tampilkan</span>
                    <input
                        type="number"
                        min={PAGE_SIZE_MIN}
                        max={PAGE_SIZE_MAX}
                        value={pageSize}
                        onChange={(e) => {
                            const raw = e.target.value;
                            if (raw === "") return;
                            const num = Number(raw);
                            if (Number.isNaN(num)) return;
                            const clamped = Math.min(
                                Math.max(Math.floor(num), PAGE_SIZE_MIN),
                                PAGE_SIZE_MAX
                            );
                            setPageSize(clamped);
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") setPageSize(PAGE_SIZE_MIN);
                        }}
                        className="w-14 px-2 py-1 rounded-lg bg-muted text-center font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
            </div>

            {/* List tamu (halaman aktif saja) */}
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

            {/* Kontrol pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-2">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </motion.button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                            (page) =>
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 1
                        )
                        .map((page, idx, arr) => (
                            <span key={page} className="flex items-center gap-1.5">
                                {idx > 0 && arr[idx - 1] !== page - 1 && (
                                    <span className="text-muted-foreground/50 text-xs px-0.5">
                                        ...
                                    </span>
                                )}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => goToPage(page)}
                                    className={
                                        "w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 " +
                                        (page === currentPage
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted")
                                    }
                                >
                                    {page}
                                </motion.button>
                            </span>
                        ))}

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </motion.button>
                </div>
            )}
        </div>
    );
}