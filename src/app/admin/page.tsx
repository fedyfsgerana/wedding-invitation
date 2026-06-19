"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { siteConfig, weddingData } from "@/lib/weddingData";

interface Guest {
    id: string;
    name: string;
    link: string;
    sent: boolean;
    createdAt: string;
}

const STORAGE_KEY = "wedding-admin-guests";
const ADMIN_PASSWORD = "fedysuci2026";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [guestName, setGuestName] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterSent, setFilterSent] = useState<"all" | "sent" | "unsent">("all");
    const [mounted, setMounted] = useState(false);

    const LockIcon = getLucideIcon("Lock");
    const UnlockIcon = getLucideIcon("Unlock");
    const PlusIcon = getLucideIcon("Plus");
    const CopyIcon = getLucideIcon("Copy");
    const CheckIcon = getLucideIcon("Check");
    const TrashIcon = getLucideIcon("Trash2");
    const SendIcon = getLucideIcon("Send");
    const SearchIcon = getLucideIcon("Search");
    const UsersIcon = getLucideIcon("Users");
    const LinkIcon = getLucideIcon("Link");
    const WhatsappIcon = getLucideIcon("MessageSquare");
    const EyeIcon = getLucideIcon("Eye");
    const ClockIcon = getLucideIcon("Clock");

    useEffect(() => {
        setMounted(true);
        try {
            const auth = sessionStorage.getItem("wedding-admin-auth");
            if (auth === "true") setIsAuthenticated(true);
        } catch {
            console.error("Gagal membaca session");
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated || !mounted) return;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setGuests(JSON.parse(stored));
        } catch {
            console.error("Gagal memuat daftar tamu");
        }
    }, [isAuthenticated, mounted]);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Memuat...</p>
            </div>
        );
    }

    const saveGuests = (updated: Guest[]) => {
        setGuests(updated);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
            console.error("Gagal menyimpan daftar tamu");
        }
    };

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            try {
                sessionStorage.setItem("wedding-admin-auth", "true");
            } catch {
                console.error("Gagal menyimpan session");
            }
            setPasswordError(false);
        } else {
            setPasswordError(true);
            setPassword("");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        try {
            sessionStorage.removeItem("wedding-admin-auth");
        } catch {
            console.error("Gagal menghapus session");
        }
    };

    const generateLink = (name: string) => {
        return `${siteConfig.url}?to=${encodeURIComponent(name)}`;
    };

    const addGuest = () => {
        if (!guestName.trim()) return;
        const newGuest: Guest = {
            id: Date.now().toString(),
            name: guestName.trim(),
            link: generateLink(guestName.trim()),
            sent: false,
            createdAt: new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        };
        saveGuests([newGuest, ...guests]);
        setGuestName("");
    };

    const deleteGuest = (id: string) => {
        saveGuests(guests.filter((g) => g.id !== id));
    };

    const toggleSent = (id: string) => {
        saveGuests(
            guests.map((g) => (g.id === id ? { ...g, sent: !g.sent } : g))
        );
    };

    const copyLink = async (guest: Guest) => {
        try {
            await navigator.clipboard.writeText(guest.link);
            setCopiedId(guest.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            console.error("Gagal menyalin link");
        }
    };

    const shareWhatsapp = (guest: Guest) => {
        const pesan =
            "Kepada Yth.\n" +
            "Bapak/Ibu/Saudara/i *" + guest.name + "*\n\n" +
            "Tanpa mengurangi rasa hormat, kami bermaksud mengundang " +
            "Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu " +
            "pada hari pernikahan kami.\n\n" +
            "*" + weddingData.groom.fullName + "*\n" +
            "& *" + weddingData.bride.fullName + "*\n\n" +
            "Hari/Tanggal: *" +
            new Date(weddingData.akad.date).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }) +
            "*\n\n" +
            "Silakan buka undangan digital kami di:\n" +
            guest.link;

        window.open(
            "https://wa.me/?text=" + encodeURIComponent(pesan),
            "_blank"
        );

        if (!guest.sent) toggleSent(guest.id);
    };

    const filteredGuests = guests.filter((g) => {
        const matchSearch = g.name
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchFilter =
            filterSent === "all" ||
            (filterSent === "sent" && g.sent) ||
            (filterSent === "unsent" && !g.sent);
        return matchSearch && matchFilter;
    });

    const totalSent = guests.filter((g) => g.sent).length;

    // ─── LOGIN ───────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-sm"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <LockIcon className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="font-script text-5xl text-primary mb-1">
                            F & S
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Halaman Admin Undangan
                        </p>
                    </div>

                    <div className="card-wedding p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                placeholder="Masukkan password admin"
                                className={
                                    "w-full px-4 py-2.5 rounded-xl border bg-background " +
                                    "text-foreground text-sm focus:outline-none focus:ring-2 " +
                                    "focus:ring-primary/30 transition-colors " +
                                    (passwordError
                                        ? "border-red-400"
                                        : "border-border focus:border-primary")
                                }
                            />
                            {passwordError && (
                                <p className="text-xs text-red-500 mt-1.5">
                                    Password salah, coba lagi.
                                </p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogin}
                            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <UnlockIcon className="w-4 h-4" />
                            Masuk
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ─── DASHBOARD ───────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="font-script text-2xl text-primary leading-none">
                            F & S
                        </h1>
                        <p className="text-xs text-muted-foreground">Admin Undangan</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <UsersIcon className="w-3.5 h-3.5" />
                                {guests.length} tamu
                            </span>
                            <span className="flex items-center gap-1.5 text-green-600">
                                <SendIcon className="w-3.5 h-3.5" />
                                {totalSent} terkirim
                            </span>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
                        >
                            Keluar
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        {
                            label: "Total Tamu",
                            value: guests.length,
                            Icon: UsersIcon,
                            color: "text-primary",
                            bg: "bg-primary/10",
                        },
                        {
                            label: "Terkirim",
                            value: totalSent,
                            Icon: SendIcon,
                            color: "text-green-600",
                            bg: "bg-green-100 dark:bg-green-900/20",
                        },
                        {
                            label: "Belum Kirim",
                            value: guests.length - totalSent,
                            Icon: ClockIcon,
                            color: "text-yellow-600",
                            bg: "bg-yellow-100 dark:bg-yellow-900/20",
                        },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card-wedding p-4 text-center"
                        >
                            <div className={"w-8 h-8 rounded-full " + stat.bg + " flex items-center justify-center mx-auto mb-2"}>
                                <stat.Icon className={"w-4 h-4 " + stat.color} />
                            </div>
                            <p className={"text-2xl font-bold " + stat.color}>
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Tambah tamu */}
                <div className="card-wedding p-4">
                    <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <PlusIcon className="w-4 h-4 text-primary" />
                        Tambah Tamu
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addGuest()}
                            placeholder="Nama tamu, contoh: Budi Santoso"
                            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={addGuest}
                            disabled={!guestName.trim()}
                            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none shrink-0"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Tambah</span>
                        </motion.button>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama tamu..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-1 bg-muted rounded-xl p-1 shrink-0">
                        {(["all", "sent", "unsent"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilterSent(f)}
                                className={
                                    "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all " +
                                    (filterSent === f
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground")
                                }
                            >
                                {f === "all" ? "Semua" : f === "sent" ? "Terkirim" : "Belum"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Daftar tamu */}
                <div className="space-y-3">
                    {filteredGuests.length === 0 ? (
                        <div className="card-wedding p-10 text-center">
                            <UsersIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="text-muted-foreground text-sm">
                                {guests.length === 0
                                    ? "Belum ada tamu. Tambahkan tamu di atas."
                                    : "Tidak ada tamu yang sesuai pencarian."}
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredGuests.map((guest) => (
                                <motion.div
                                    key={guest.id}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className={"card-wedding p-4 " + (guest.sent ? "opacity-60" : "")}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Avatar */}
                                        <div className={
                                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold " +
                                            (guest.sent
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-primary/10 text-primary")
                                        }>
                                            {guest.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {guest.name}
                                                </p>
                                                {guest.sent && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shrink-0">
                                                        Terkirim
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                                                <LinkIcon className="w-3 h-3 shrink-0" />
                                                {guest.link}
                                            </p>
                                            <p className="text-xs text-muted-foreground/50 mt-0.5">
                                                {guest.createdAt}
                                            </p>
                                        </div>

                                        {/* Aksi */}
                                        <div className="flex items-center gap-0.5 shrink-0">
                                            {/* Preview */}
                                            <motion.a
                                                href={guest.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileTap={{ scale: 0.9 }}
                                                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                                                title="Preview undangan"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </motion.a>

                                            {/* Salin link */}
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => copyLink(guest)}
                                                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                                                title="Salin link"
                                            >
                                                {copiedId === guest.id ? (
                                                    <CheckIcon className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <CopyIcon className="w-4 h-4" />
                                                )}
                                            </motion.button>

                                            {/* WhatsApp */}
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => shareWhatsapp(guest)}
                                                className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-green-600"
                                                title="Kirim via WhatsApp"
                                            >
                                                <WhatsappIcon className="w-4 h-4" />
                                            </motion.button>

                                            {/* Tandai terkirim */}
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleSent(guest.id)}
                                                className={
                                                    "p-2 rounded-lg transition-colors " +
                                                    (guest.sent
                                                        ? "hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-500"
                                                        : "hover:bg-muted text-muted-foreground")
                                                }
                                                title={guest.sent ? "Tandai belum terkirim" : "Tandai sudah terkirim"}
                                            >
                                                <SendIcon className="w-4 h-4" />
                                            </motion.button>

                                            {/* Hapus */}
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => deleteGuest(guest.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-500"
                                                title="Hapus tamu"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Footer info */}
                <div className="text-center pb-8">
                    <p className="text-xs text-muted-foreground">
                        Data tersimpan di browser. Akses halaman ini di{" "}
                        <span className="text-primary font-medium">/admin</span>
                    </p>
                </div>

            </div>
        </div>
    );
}