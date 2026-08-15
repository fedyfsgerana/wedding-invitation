"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { WishItem } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  wishes: WishItem[];
  loading: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const XIcon = getLucideIcon("X");
const MessageIcon = getLucideIcon("MessageCircle");
const UsersIcon = getLucideIcon("Users");
const TrashIcon = getLucideIcon("Trash2");
const RefreshIcon = getLucideIcon("RefreshCw");

function attendanceBadge(attendance: string) {
  if (attendance === "hadir") {
    return { label: "Hadir", className: "bg-success-soft text-success" };
  }
  if (attendance === "tidak_hadir") {
    return { label: "Tidak Hadir", className: "bg-danger-soft text-danger" };
  }
  return { label: "Masih Ragu", className: "bg-warning-soft text-warning" };
}

export function AdminWishesOffcanvas({
  open,
  onClose,
  wishes,
  loading,
  onDelete,
  onRefresh,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const totalHadir = wishes.filter((w) => w.attendance === "hadir").length;
  const totalTidakHadir = wishes.filter(
    (w) => w.attendance === "tidak_hadir",
  ).length;
  const totalRagu = wishes.filter((w) => w.attendance === "masih_ragu").length;
  const totalPerkiraan = wishes
    .filter((w) => w.attendance === "hadir")
    .reduce((sum, w) => sum + (w.guestCount || 1), 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex"
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-card w-full max-w-sm h-full border-r border-border shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <MessageIcon className="w-4.5 h-4.5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">
                  Ucapan &amp; Doa Masuk
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {wishes.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onRefresh}
                  disabled={loading}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-50 transition-all"
                  title="Muat ulang ucapan"
                  aria-label="Muat ulang ucapan"
                >
                  <RefreshIcon
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!loading && wishes.length > 0 && (
              <div className="px-5 py-3 border-b border-border shrink-0 grid grid-cols-4 gap-2">
                <div className="text-center">
                  <p className="text-base font-bold text-success">
                    {totalHadir}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Hadir</p>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-danger">
                    {totalTidakHadir}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Tidak Hadir
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-warning">
                    {totalRagu}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Masih Ragu
                  </p>
                </div>
                <div className="text-center border-l border-border">
                  <div className="flex items-center justify-center gap-1">
                    <UsersIcon className="w-3 h-3 text-primary" />
                    <p className="text-base font-bold text-primary">
                      {totalPerkiraan}
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Est. Tamu</p>
                </div>
              </div>
            )}

            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
              {loading ? (
                <p className="text-xs uppercase tracking-widest text-muted-foreground text-center py-10">
                  Memuat ucapan...
                </p>
              ) : wishes.length === 0 ? (
                <div className="text-center py-10">
                  <MessageIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Belum ada ucapan yang masuk.
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {wishes.map((wish) => {
                    const badge = attendanceBadge(wish.attendance);
                    return (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        layout
                        className="rounded-xl border border-border bg-background p-3.5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-sm border bg-primary/10 text-primary border-primary/20">
                            {wish.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                              <p className="text-sm font-medium text-foreground truncate">
                                {wish.name}
                              </p>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span
                                  className={
                                    "text-[10px] px-2 py-0.5 rounded-full font-medium " +
                                    badge.className
                                  }
                                >
                                  {badge.label}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onDelete(wish.id)}
                                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-danger-soft hover:text-danger transition-all duration-200"
                                  title="Hapus ucapan"
                                >
                                  <TrashIcon className="w-3.5 h-3.5" />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                              {wish.message}
                            </p>
                            <p className="text-xs text-muted-foreground/60 mt-1.5">
                              {wish.timestamp}
                              {wish.attendance === "hadir" && wish.guestCount
                                ? ` · ${wish.guestCount} orang`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
