"use client";

import { useState, useEffect } from "react";
import { siteConfig, weddingData } from "@/lib/weddingData";
import { AdminLogin } from "./components/AdminLogin";
import { AdminHeader } from "./components/AdminHeader";
import { AdminStats } from "./components/AdminStats";
import { AdminAddGuest } from "./components/AdminAddGuest";
import { AdminGuestFilter } from "./components/AdminGuestFilter";
import { AdminGuestList } from "./components/AdminGuestList";
import { motion, AnimatePresence } from "framer-motion";

export interface Guest {
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
    const [actionError, setActionError] = useState<string | null>(null);

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
                if (!res.ok) throw new Error(data.error || "Gagal memuat daftar tamu");
                setGuests(data.guests || []);
            } catch (err) {
                setActionError(
                    err instanceof Error ? err.message : "Gagal memuat daftar tamu"
                );
            } finally {
                setLoadingGuests(false);
            }
        };
        loadGuests();
    }, [isAuthenticated, mounted]);

    useEffect(() => {
        if (!actionError) return;
        const timer = setTimeout(() => setActionError(null), 5000);
        return () => clearTimeout(timer);
    }, [actionError]);

    if (!mounted) {
        return (
            <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
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
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
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
            if (!res.ok) throw new Error(data.error || "Gagal menambah tamu");
            if (data.guest) setGuests([data.guest, ...guests]);
        } catch (err) {
            setActionError(
                err instanceof Error ? err.message : "Gagal menambah tamu ke Google Sheets"
            );
        }
    };

    const deleteGuest = async (id: string) => {
        const backup = guests;
        setGuests(guests.filter((g) => g.id !== id));
        try {
            const res = await fetch("/api/guests", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Gagal menghapus tamu");
        } catch (err) {
            setGuests(backup);
            setActionError(
                err instanceof Error ? err.message : "Gagal menghapus tamu dari Google Sheets"
            );
        }
    };

    const toggleSent = async (id: string) => {
        const target = guests.find((g) => g.id === id);
        if (!target) return;
        const newSent = !target.sent;
        const backup = guests;
        setGuests(guests.map((g) => (g.id === id ? { ...g, sent: newSent } : g)));
        try {
            const res = await fetch("/api/guests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, sent: newSent }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Gagal memperbarui status terkirim");
        } catch (err) {
            setGuests(backup);
            setActionError(
                err instanceof Error
                    ? err.message
                    : "Gagal menyimpan status terkirim ke Google Sheets"
            );
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

        window.open("https://wa.me/?text=" + encodeURIComponent(pesan), "_blank");
        if (!guest.sent) toggleSent(guest.id);
    };

    const filteredGuests = guests.filter((g) => {
        const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filterSent === "all" ||
            (filterSent === "sent" && g.sent) ||
            (filterSent === "unsent" && !g.sent);
        return matchSearch && matchFilter;
    });

    const totalSent = guests.filter((g) => g.sent).length;

    if (!isAuthenticated) {
        return (
            <AdminLogin
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                loginLoading={loginLoading}
                handleLogin={handleLogin}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <AdminHeader
                guestCount={guests.length}
                totalSent={totalSent}
                onLogout={handleLogout}
            />
            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                <AnimatePresence>
                    {actionError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                        >
                            <span>⚠ {actionError}</span>
                            <button
                                onClick={() => setActionError(null)}
                                className="text-red-400 hover:text-red-600 shrink-0"
                            >
                                ✕
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AdminStats
                    total={guests.length}
                    sent={totalSent}
                    unsent={guests.length - totalSent}
                />
                <AdminAddGuest
                    guestName={guestName}
                    setGuestName={setGuestName}
                    onAdd={addGuest}
                />
                <AdminGuestFilter
                    search={search}
                    setSearch={setSearch}
                    filterSent={filterSent}
                    setFilterSent={setFilterSent}
                />
                <AdminGuestList
                    guests={filteredGuests}
                    allGuestsCount={guests.length}
                    loadingGuests={loadingGuests}
                    copiedId={copiedId}
                    onCopy={copyLink}
                    onWhatsapp={shareWhatsapp}
                    onToggleSent={toggleSent}
                    onDelete={deleteGuest}
                />
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