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

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [guestName, setGuestName] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterSent, setFilterSent] = useState<"all" | "sent" | "unsent">("all");
    const [mounted, setMounted] = useState(false);
    const [loadingGuests, setLoadingGuests] = useState(false);

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
        const loadGuests = async () => {
            setLoadingGuests(true);
            try {
                const res = await fetch("/api/guests");
                const data = await res.json();
                setGuests(data.guests || []);
            } catch {
                console.error("Gagal memuat daftar tamu");
            } finally {
                setLoadingGuests(false);
            }
        };
        loadGuests();
    }, [isAuthenticated, mounted]);

    if (!mounted) {
        return (
            <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-64 h-64 rounded-full border border-primary/20"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                        className="w-80 h-80 rounded-full border border-primary/10"
                    />
                </div>
                <div className="relative z-10 text-center">
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="font-script text-6xl text-primary mb-4"
                    >
                        F & S
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs uppercase tracking-widest text-muted-foreground mb-8"
                    >
                        Memuat Admin...
                    </motion.p>
                    <div className="flex items-center justify-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.8,
                                    delay: i * 0.15,
                                    ease: "easeInOut",
                                }}
                                className="w-2 h-2 rounded-full bg-primary"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const handleLogin = async () => {
        setLoginLoading(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
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
        } catch {
            setPasswordError(true);
        } finally {
            setLoginLoading(false);
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

    const addGuest = async () => {
        if (!guestName.trim()) return;
        const name = guestName.trim();
        const link = generateLink(name);
        setGuestName("");

        try {
            const res = await fetch("/api/guests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, link }),
            });
            const data = await res.json();
            if (data.guest) setGuests([data.guest, ...guests]);
        } catch {
            console.error("Gagal menambah tamu");
        }
    };

    const deleteGuest = async (id: string) => {
        setGuests(guests.filter((g) => g.id !== id));
        try {
            await fetch("/api/guests", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
        } catch {
            console.error("Gagal menghapus tamu");
        }
    };

    const toggleSent = async (id: string) => {
        const target = guests.find((g) => g.id === id);
        if (!target) return;
        const newSent = !target.sent;

        setGuests(guests.map((g) => (g.id === id ? { ...g, sent: newSent } : g)));

        try {
            await fetch("/api/guests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, sent: newSent }),
            });
        } catch {
            console.error("Gagal memperbarui status terkirim");
        }
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
            <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">

                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary"
                    />
                    <motion.div
                        animate={{ y: [0, -12, 0], opacity: [0.15, 0.3, 0.15] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute top-1/4 right-12 w-3 h-3 rounded-full bg-primary"
                    />
                    <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0.1, 0.25, 0.1] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-1/3 left-16 w-2 h-2 rounded-full bg-primary"
                    />
                    <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-primary/10" />
                    <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full border border-primary/10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full max-w-sm relative z-10"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="relative inline-block mb-5"
                        >
                            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                                <LockIcon className="w-8 h-8 text-primary" />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-dashed border-primary/20"
                            />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="font-script text-6xl text-primary mb-2 leading-none"
                        >
                            F & S
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs uppercase tracking-widest text-muted-foreground"
                        >
                            Fedy & Suci Wedding
                        </motion.p>
                    </div>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
                    >
                        <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                                Password
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(false);
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                    placeholder="Masukkan password"
                                    className={
                                        "w-full pl-10 pr-4 py-3 rounded-xl border bg-background " +
                                        "text-foreground text-sm focus:outline-none focus:ring-2 " +
                                        "focus:ring-primary/30 transition-all " +
                                        (passwordError
                                            ? "border-red-400 focus:ring-red-200"
                                            : "border-border focus:border-primary")
                                    }
                                />
                            </div>
                            <AnimatePresence>
                                {passwordError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs text-red-500 mt-2 flex items-center gap-1"
                                    >
                                        ✕ Password salah, coba lagi.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleLogin}
                            disabled={loginLoading}
                            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {loginLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                    />
                                    Memeriksa...
                                </>
                            ) : (
                                <>
                                    <UnlockIcon className="w-4 h-4" />
                                    Masuk
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center text-xs text-muted-foreground/50 mt-6"
                    >
                        Fedy & Suci Wedding · 20 Desember 2026
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    // ─── DASHBOARD ───────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <span className="font-script text-lg text-primary leading-none">F</span>
                        </div>
                        <div>
                            <h1 className="font-script text-xl text-primary leading-none">
                                Fedy & Suci
                            </h1>
                            <p className="text-xs text-muted-foreground">Admin Undangan</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground">
                                <UsersIcon className="w-3.5 h-3.5" />
                                <span>{guests.length} tamu</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-xs text-green-600 border border-green-100">
                                <SendIcon className="w-3.5 h-3.5" />
                                <span>{totalSent} terkirim</span>
                            </div>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
                        >
                            <LockIcon className="w-3.5 h-3.5" />
                            Keluar
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Total Tamu", value: guests.length, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
                        { label: "Terkirim", value: totalSent, color: "text-green-600", bg: "bg-green-50 border-green-100" },
                        { label: "Belum Kirim", value: guests.length - totalSent, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={"rounded-2xl border p-4 text-center " + stat.bg}
                        >
                            <p className={"text-2xl font-bold " + stat.color}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tambah tamu */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-card border border-border rounded-2xl p-4 shadow-sm"
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
                                onKeyDown={(e) => e.key === "Enter" && addGuest()}
                                placeholder="Nama tamu..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={addGuest}
                            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 text-sm font-medium shrink-0 shadow-sm"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Tambah
                        </motion.button>
                    </div>
                </motion.div>

                {/* Search & Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2"
                >
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama tamu..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-1 bg-muted rounded-xl p-1 shrink-0">
                        {(["all", "sent", "unsent"] as const).map((f) => (
                            <motion.button
                                key={f}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilterSent(f)}
                                className={
                                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all " +
                                    (filterSent === f
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground")
                                }
                            >
                                {f === "all" ? "Semua" : f === "sent" ? "✓ Terkirim" : "○ Belum"}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Daftar tamu */}
                <div className="space-y-2.5">
                    {loadingGuests ? (
                        <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
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
                    ) : filteredGuests.length === 0 ? (
                        <div className="bg-card border border-border rounded-2xl p-12 text-center">
                            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                                <UsersIcon className="w-6 h-6 text-muted-foreground/40" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {guests.length === 0
                                    ? "Belum ada tamu. Tambahkan tamu di atas."
                                    : "Tidak ada tamu yang sesuai pencarian."}
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredGuests.map((guest, index) => (
                                <motion.div
                                    key={guest.id}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.03 }}
                                    className={
                                        "bg-card border rounded-2xl p-4 transition-all " +
                                        (guest.sent
                                            ? "border-green-100 bg-green-50/30 opacity-75"
                                            : "border-border hover:border-primary/20 hover:shadow-sm")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className={
                                            "w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-sm font-bold border " +
                                            (guest.sent
                                                ? "bg-green-100 text-green-700 border-green-200"
                                                : "bg-primary/10 text-primary border-primary/20")
                                        }>
                                            {guest.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                                <p className="text-sm font-semibold text-foreground truncate">
                                                    {guest.name}
                                                </p>
                                                {guest.sent && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 shrink-0">
                                                        ✓ Terkirim
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground/60 mt-0.5 flex items-center gap-1">
                                                <ClockIcon className="w-3 h-3 shrink-0" />
                                                {guest.createdAt}
                                            </p>
                                        </div>

                                        {/* Aksi */}
                                        <div className="flex items-center gap-0.5 shrink-0">
                                            <motion.a
                                                href={guest.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileTap={{ scale: 0.9 }}
                                                className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                                                title="Preview undangan"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </motion.a>

                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => copyLink(guest)}
                                                className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
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
                                                onClick={() => shareWhatsapp(guest)}
                                                className="p-2 rounded-xl hover:bg-green-50 transition-colors text-green-600"
                                                title="Kirim via WhatsApp"
                                            >
                                                <WhatsappIcon className="w-4 h-4" />
                                            </motion.button>

                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleSent(guest.id)}
                                                className={
                                                    "p-2 rounded-xl transition-colors " +
                                                    (guest.sent
                                                        ? "text-amber-500 hover:bg-amber-50"
                                                        : "text-muted-foreground hover:bg-muted")
                                                }
                                                title={guest.sent ? "Tandai belum terkirim" : "Tandai sudah terkirim"}
                                            >
                                                <SendIcon className="w-4 h-4" />
                                            </motion.button>

                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => deleteGuest(guest.id)}
                                                className="p-2 rounded-xl hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
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

                {/* Footer */}
                <div className="text-center pb-8 pt-2">
                    <p className="font-script text-2xl text-primary/30 mb-1">F & S</p>
                    <p className="text-xs text-muted-foreground/40">
                        Data tersimpan di Google Sheets · /admin
                    </p>
                </div>

            </div>
        </div>
    );
}