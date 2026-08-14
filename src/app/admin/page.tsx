"use client";

import { useState, useEffect, useCallback } from "react";
import { siteConfig, weddingData } from "@/lib/weddingData";
import { SESSION_MAX_AGE } from "@/lib/constants";
import { WishItem } from "@/types";
import { AdminLogin } from "./components/AdminLogin";
import { AdminHeader } from "./components/AdminHeader";
import { AdminStats } from "./components/AdminStats";
import { AdminAddGuest } from "./components/AdminAddGuest";
import { AdminGuestFilter } from "./components/AdminGuestFilter";
import { AdminGuestList } from "./components/AdminGuestList";
import { AdminWishesOffcanvas } from "./components/AdminWishesOffcanvas";
import { AdminConfirmModal } from "./components/AdminConfirmModal";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useToast } from "@/components/providers/ToastProvider";
import { motion } from "framer-motion";

export interface Guest {
  id: string;
  name: string;
  link: string;
  sent: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [guestName, setGuestName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterSent, setFilterSent] = useState<"all" | "sent" | "unsent">(
    "all",
  );
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "createdAt">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [wishesCount, setWishesCount] = useState(0);
  const [loadingWishes, setLoadingWishes] = useState(false);
  const [showWishesModal, setShowWishesModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    description: string;
    loading: boolean;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    loading: false,
    onConfirm: () => {},
  });
  const { showToast } = useToast();

  const handleSessionExpired = useCallback(() => {
    setIsAuthenticated(false);
    setSessionExpiresAt(null);
    setGuests([]);
    setSelectedIds(new Set());
    setPassword("");
    setPasswordError(false);
    showToast("Sesi telah habis. Silakan login kembali.", "error");
  }, [showToast]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (cancelled) return;
      setMounted(true);
      try {
        const res = await fetch("/api/admin/session");
        if (res.ok && !cancelled) {
          const data = await res.json();
          setIsAuthenticated(true);
          if (data.expiresAt) setSessionExpiresAt(data.expiresAt);
        }
      } catch {}
    };
    init();

    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!sessionExpiresAt || !isAuthenticated) return;
    const remaining = sessionExpiresAt - Date.now();
    const timer = setTimeout(handleSessionExpired, Math.max(remaining, 0));
    return () => clearTimeout(timer);
  }, [sessionExpiresAt, isAuthenticated, handleSessionExpired]);

  const fetchWithAuth = useCallback(
    async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const res = await fetch(input, init);
      if (res.status === 401) {
        handleSessionExpired();
      }
      return res;
    },
    [handleSessionExpired],
  );

  const fetchWishes = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoadingWishes(true);
      try {
        const res = await fetchWithAuth("/api/wishes");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memuat ucapan");
        const list: WishItem[] = data.wishes || [];
        setWishes(list);
        setWishesCount(list.length);
      } catch (err) {
        if (showLoading) {
          showToast(
            err instanceof Error ? err.message : "Gagal memuat ucapan",
            "error",
          );
        }
      } finally {
        if (showLoading) setLoadingWishes(false);
      }
    },
    [showToast, fetchWithAuth],
  );

  useEffect(() => {
    if (!isAuthenticated || !mounted) return;
    let cancelled = false;

    const loadGuests = async () => {
      setLoadingGuests(true);
      try {
        const res = await fetchWithAuth("/api/guests");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memuat daftar tamu");
        if (!cancelled) setGuests(data.guests || []);
      } catch (err) {
        if (!cancelled) {
          showToast(
            err instanceof Error ? err.message : "Gagal memuat daftar tamu",
            "error",
          );
        }
      } finally {
        if (!cancelled) setLoadingGuests(false);
      }
    };

    const init = async () => {
      await loadGuests();
      if (!cancelled) await fetchWishes(false);
    };
    init();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, mounted, fetchWishes, showToast, fetchWithAuth]);

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

  const [prevFilters, setPrevFilters] = useState({
    search,
    filterSent,
    pageSize,
  });
  if (
    prevFilters.search !== search ||
    prevFilters.filterSent !== filterSent ||
    prevFilters.pageSize !== pageSize
  ) {
    setPrevFilters({ search, filterSent, pageSize });
    setCurrentPage(1);
    setSelectedIds(new Set());
  }

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
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPasswordError(false);
        setSessionExpiresAt(Date.now() + SESSION_MAX_AGE * 1000);
        showToast("Berhasil masuk. Selamat datang kembali!", "success");
      } else if (res.status === 429) {
        showToast(data.error || "Terlalu banyak percobaan.", "error");
        setPassword("");
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

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch {}
    setIsAuthenticated(false);
    setSessionExpiresAt(null);
    setSelectedIds(new Set());
    setPassword("");
    setPasswordError(false);
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
      const res = await fetchWithAuth("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, link }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menambah tamu");
      if (data.guest) setGuests([data.guest, ...guests]);
      showToast(`Tamu "${name}" berhasil ditambahkan`, "success");
    } catch (err) {
      showToast(
        err instanceof Error
          ? err.message
          : "Gagal menambah tamu ke Google Sheets",
        "error",
      );
    }
  };

  const deleteGuestConfirmed = async (id: string) => {
    const backup = guests;
    const target = guests.find((g) => g.id === id);
    setGuests(guests.filter((g) => g.id !== id));
    try {
      const res = await fetchWithAuth("/api/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus tamu");
      showToast(
        target
          ? `Tamu "${target.name}" berhasil dihapus`
          : "Tamu berhasil dihapus",
        "success",
      );
    } catch (err) {
      setGuests(backup);
      showToast(
        err instanceof Error
          ? err.message
          : "Gagal menghapus tamu dari Google Sheets",
        "error",
      );
    }
  };

  const deleteGuest = (id: string) => {
    const target = guests.find((g) => g.id === id);
    setConfirmModal({
      open: true,
      title: "Hapus tamu ini?",
      description: target
        ? `Tamu "${target.name}" akan dihapus secara permanen dari daftar dan Google Sheets. Tindakan ini tidak bisa dibatalkan.`
        : "Tamu ini akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.",
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        await deleteGuestConfirmed(id);
        setConfirmModal((prev) => ({ ...prev, open: false, loading: false }));
      },
    });
  };

  const toggleSent = async (id: string) => {
    const target = guests.find((g) => g.id === id);
    if (!target) return;
    const newSent = !target.sent;
    const backup = guests;
    setGuests(guests.map((g) => (g.id === id ? { ...g, sent: newSent } : g)));
    try {
      const res = await fetchWithAuth("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, sent: newSent }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Gagal memperbarui status terkirim");
    } catch (err) {
      setGuests(backup);
      showToast(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan status terkirim ke Google Sheets",
        "error",
      );
    }
  };

  const editGuestName = async (id: string, newName: string) => {
    const target = guests.find((g) => g.id === id);
    if (!target) return;
    const trimmed = newName.trim();
    if (!trimmed || trimmed === target.name) return;
    const backup = guests;
    setGuests(guests.map((g) => (g.id === id ? { ...g, name: trimmed } : g)));
    try {
      const res = await fetchWithAuth("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memperbarui nama tamu");
      showToast(`Nama tamu berhasil diubah menjadi "${trimmed}"`, "success");
    } catch (err) {
      setGuests(backup);
      showToast(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan nama tamu ke Google Sheets",
        "error",
      );
    }
  };

  const toggleSelectGuest = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllFiltered = () => {
    setSelectedIds(new Set(filteredGuests.map((g) => g.id)));
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkDeleteGuestsConfirmed = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    const backup = guests;
    setGuests(guests.filter((g) => !selectedIds.has(g.id)));
    clearSelection();
    try {
      const res = await fetchWithAuth("/api/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus tamu");
      showToast(`${ids.length} tamu berhasil dihapus`, "success");
    } catch (err) {
      setGuests(backup);
      showToast(
        err instanceof Error
          ? err.message
          : "Gagal menghapus tamu dari Google Sheets",
        "error",
      );
    }
  };

  const bulkDeleteGuests = () => {
    const count = selectedIds.size;
    if (count === 0) return;
    setConfirmModal({
      open: true,
      title: `Hapus ${count} tamu terpilih?`,
      description:
        "Semua tamu yang dipilih akan dihapus secara permanen dari daftar dan Google Sheets. Tindakan ini tidak bisa dibatalkan.",
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        await bulkDeleteGuestsConfirmed();
        setConfirmModal((prev) => ({ ...prev, open: false, loading: false }));
      },
    });
  };

  const bulkMarkSent = async (sent: boolean) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    const backup = guests;
    setGuests(guests.map((g) => (selectedIds.has(g.id) ? { ...g, sent } : g)));
    clearSelection();
    try {
      const res = await fetchWithAuth("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, sent }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Gagal memperbarui status terkirim");
      showToast(
        `${ids.length} tamu ditandai ${sent ? "terkirim" : "belum terkirim"}`,
        "success",
      );
    } catch (err) {
      setGuests(backup);
      showToast(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan status terkirim ke Google Sheets",
        "error",
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

  const deleteWishConfirmed = async (id: string) => {
    const backup = wishes;
    const nextWishes = wishes.filter((w) => w.id !== id);
    setWishes(nextWishes);
    setWishesCount(nextWishes.length);
    try {
      const res = await fetchWithAuth("/api/wishes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus ucapan");
      showToast("Ucapan berhasil dihapus", "success");
    } catch (err) {
      setWishes(backup);
      setWishesCount(backup.length);
      showToast(
        err instanceof Error ? err.message : "Gagal menghapus ucapan",
        "error",
      );
    }
  };

  const deleteWish = (id: string) => {
    setConfirmModal({
      open: true,
      title: "Hapus ucapan ini?",
      description:
        "Ucapan ini akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.",
      loading: false,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        await deleteWishConfirmed(id);
        setConfirmModal((prev) => ({ ...prev, open: false, loading: false }));
      },
    });
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
      "*" +
      guest.name +
      "*\n\n" +
      "Dengan penuh sukacita dan tanpa mengurangi rasa hormat, " +
      "kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir " +
      "serta memberikan doa restu pada pernikahan kami:\n\n" +
      "*" +
      weddingData.groom.fullName +
      "*\n" +
      "& *" +
      weddingData.bride.fullName +
      "*\n\n" +
      "Yang insyaAllah akan diselenggarakan pada:\n" +
      "Akad: *" +
      formatTanggal(weddingData.akad.date) +
      "*\n" +
      "Resepsi: *" +
      formatTanggal(weddingData.reception.date) +
      "*\n\n" +
      "Untuk informasi lengkap mengenai waktu, lokasi, dan rangkaian acara, " +
      "silakan membuka undangan digital kami melalui tautan berikut:\n" +
      guest.link +
      "\n\n" +
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

  const sortedGuests = [...filteredGuests].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name, "id");
    } else {
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleSort = (field: "name" | "createdAt") => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  const totalPages = Math.max(1, Math.ceil(sortedGuests.length / pageSize));
  const paginatedGuests = sortedGuests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
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

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 10% 10%, var(--color-gold) 0%, transparent 40%),
                             radial-gradient(circle at 90% 90%, var(--color-gold) 0%, transparent 40%)`,
            }}
          />
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-primary/20 animate-pulse-soft" />
        <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-primary/10" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-primary/20 animate-pulse-soft" />
        <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full border border-primary/10" />
        <div className="absolute top-1/2 -translate-y-1/2 left-6 w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="absolute top-1/2 -translate-y-1/2 right-6 w-1.5 h-1.5 rounded-full bg-primary/40" />
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
              onEditName={editGuestName}
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              sortBy={sortBy}
              sortDir={sortDir}
              onSort={handleSort}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelectGuest}
              onSelectAllFiltered={selectAllFiltered}
              onClearSelection={clearSelection}
              onBulkDelete={bulkDeleteGuests}
              onBulkMarkSent={bulkMarkSent}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pb-8 pt-2"
          >
            <div className="relative w-12 h-12 mx-auto mb-3 opacity-40">
              <div className="absolute inset-0 rounded-full gradient-primary opacity-20" />
              <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
                <span className="font-serif text-base text-primary">
                  {weddingData.groom.nickname.charAt(0)}&amp;
                  {weddingData.bride.nickname.charAt(0)}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/40">
              Data tersimpan di Google Sheets · /admin
            </p>
          </motion.div>
        </motion.div>
      </div>

      <AdminWishesOffcanvas
        open={showWishesModal}
        onClose={() => setShowWishesModal(false)}
        wishes={wishes}
        loading={loadingWishes}
        onDelete={deleteWish}
      />

      <AdminConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        description={confirmModal.description}
        loading={confirmModal.loading}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
