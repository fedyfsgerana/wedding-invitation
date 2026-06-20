"use client";

import { useState, useEffect, useCallback } from "react";
import { siteConfig, weddingData } from "@/lib/weddingData";
import { WishItem } from "@/types";
import { AdminLogin } from "./components/AdminLogin";
import { AdminHeader } from "./components/AdminHeader";
import { AdminStats } from "./components/AdminStats";
import { AdminAddGuest } from "./components/AdminAddGuest";
import { AdminGuestFilter } from "./components/AdminGuestFilter";
import { AdminGuestList } from "./components/AdminGuestList";
import { AdminWishesModal } from "./components/AdminWishesModal";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
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
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [wishes, setWishes] = useState<WishItem[]>([]);
    const [wishesCount, setWishesCount] = useState(0);
    const [wishesFetched, setWishesFetched] = useState(false);
    const [loadingWishes, setLoadingWishes] = useState(false);
    const [showWishesModal, setShowWishesModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
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
        const timer = setTimeout(() => setPageLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const fetchWishes = useCallback(async (showLoading = false) => {
        if (showLoading) setLoadingWishes(true);
        try {
            const res = await fetch("/api/wishes");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Gagal memuat ucapan");
            const list: WishItem[] = data.wishes || [];
            setWishes(list);
            setWishesCount(list.length);
            setWishesFetched(true);
        } catch (err) {
            if (showLoading) {
                setActionError(err instanceof Error ? err.message : "Gagal memuat ucapan");
            }
        } finally {
            if (showLoading) setLoadingWishes(false);
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
        fetchWishes(false);
    }, [isAuthenticated, mounted, fetchWishes]);

    useEffect(() => {
        if (!isAuthenticated) return;
        const interval = setInterval(() => {
            fetchWishes(false);
        }, 15000);
        return () => clearInterval(interval);
    }, [isAuthenticated, fetchWishes]);

    useEffect(() => {
        if (!showWishesModal || !isAuthenticated) return;
        const interval = setInterval(() => {
            fetchWishes(false);
        }, 5000);
        return () => clearInterval(interval);
    }, [showWishesModal, isAuthenticated, fetchWishes]);

    useEffect(() => {
        if (!actionError) return;
        const timer = setTimeout(() => setActionError(null), 5000);
        return () => clearTimeout(timer);
    }, [actionError]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterSent, pageSize]);

    if (!mounted) {
        return <LoadingScreen isLoading={true} text="Memuat halaman Admin..." />;
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

    const openWishesModal = async () => {
        setShowWishesModal(true);
        await fetchWishes(true);
    };

    const formatTanggal = (date: string) =>
        new Date(date).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    const shareWhatsapp = (guest: Guest) => {
        const pesan =
            "Assalamu'alaikum Warahmatullahi Wabarakatuh\n\n" +
            "Yth. Bapak/Ibu/Saudara/i\n" +
            "*" + guest.name + "*\n\n" +
            "Dengan penuh sukacita dan tanpa mengurangi rasa hormat, " +
            "kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir " +
            "serta memberikan doa restu pada pernikahan kami:\n\n" +
            "*" + weddingData.groom.fullName + "*\n" +
            "& *" + weddingData.bride.fullName + "*\n\n" +
            "Yang insyaAllah akan diselenggarakan pada:\n" +
            "Akad: *" + formatTanggal(weddingData.akad.date) + "*\n" +
            "Resepsi: *" + formatTanggal(weddingData.reception.date) + "*\n\n" +
            "Untuk informasi lengkap mengenai waktu, lokasi, dan rangkaian acara, " +
            "silakan membuka undangan digital kami melalui tautan berikut:\n" +
            guest.link + "\n\n" +
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila " +
            "Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\n" +
            "Atas perhatian dan doa restunya, kami ucapkan terima kasih.\n\n" +
            "Wassalamu'alaikum Warahmatullahi Wabarakatuh";

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

    const totalPages = Math.max(1, Math.ceil(filteredGuests.length / pageSize));
    const paginatedGuests = filteredGuests.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    if (!isAuthenticated) {
        return (
            <>
                <LoadingScreen isLoading={pageLoading} text="Memuat halaman Admin..." />
                <AdminLogin
                    password={password}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    loginLoading={loginLoading}
                    handleLogin={handleLogin}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-background relative">
            <LoadingScreen isLoading={pageLoading} text="Memuat halaman Admin..." />

            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
            </div>

            <div className="relative z-10">
                <AdminHeader
                    wishesCount={wishesCount}
                    onOpenWishes={openWishesModal}
                    onLogout={handleLogout}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-4xl mx-auto px-4 py-6 space-y-6"
                >
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
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <AdminStats
                            total={guests.length}
                            sent={totalSent}
                            unsent={guests.length - totalSent}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <AdminAddGuest
                            guestName={guestName}
                            setGuestName={setGuestName}
                            onAdd={addGuest}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <AdminGuestFilter
                            search={search}
                            setSearch={setSearch}
                            filterSent={filterSent}
                            setFilterSent={setFilterSent}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <AdminGuestList
                            guests={paginatedGuests}
                            allGuestsCount={guests.length}
                            filteredCount={filteredGuests.length}
                            loadingGuests={loadingGuests}
                            copiedId={copiedId}
                            onCopy={copyLink}
                            onWhatsapp={shareWhatsapp}
                            onToggleSent={toggleSent}
                            onDelete={deleteGuest}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center pb-8 pt-2"
                    >
                        <p className="font-script text-2xl text-primary/30 mb-1">F & S</p>
                        <p className="text-xs text-muted-foreground/40">
                            Data tersimpan di Google Sheets · /admin
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <AdminWishesModal
                open={showWishesModal}
                onClose={() => setShowWishesModal(false)}
                wishes={wishes}
                loading={loadingWishes}
            />
        </div>
    );
}