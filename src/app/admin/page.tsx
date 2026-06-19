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
                            disabled={loginLoading}
                            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            <UnlockIcon className="w-4 h-4" />
                            {loginLoading ? "Memeriksa..." : "Masuk"}
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
                            className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
                        >
                            Keluar
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

                {/* Tambah tamu */}
                <div className="card-wedding p-4 flex gap-2">
                    <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addGuest()}
                        placeholder="Nama tamu baru..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={addGuest}
                        className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 text-sm font-medium shrink-0"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Tambah
                    </motion.button>
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
                    {loadingGuests ? (
                        <div className="card-wedding p-10 text-center">
                            <p className="text-muted-foreground text-sm">Memuat data tamu...</p>
                        </div>
                    ) : filteredGuests.length === 0 ? (
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
                        Data tersimpan di Google Sheets. Akses halaman ini di{" "}
                        <span className="text-primary font-medium">/admin</span>
                    </p>
                </div>

            </div>
        </div>
    );
}