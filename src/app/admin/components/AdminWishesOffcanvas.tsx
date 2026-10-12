"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/Spinner";
import { cn, getLucideIcon } from "@/lib/utils";
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
const TrashIcon = getLucideIcon("Trash2");
const RefreshIcon = getLucideIcon("RefreshCw");

const ATTENDANCE = {
  hadir: {
    label: "Hadir",
    icon: getLucideIcon("CircleCheck"),
    badge: "bg-success-soft text-success",
  },
  tidak_hadir: {
    label: "Tidak hadir",
    icon: getLucideIcon("CircleX"),
    badge: "bg-danger-soft text-danger",
  },
  masih_ragu: {
    label: "Masih ragu",
    icon: getLucideIcon("CircleHelp"),
    badge: "bg-warning-soft text-warning",
  },
} as const;

const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-primary transition hover:bg-accent disabled:opacity-50";

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

  const count = (key: WishItem["attendance"]) =>
    wishes.filter((w) => w.attendance === key).length;
  const estimate = wishes
    .filter((w) => w.attendance === "hadir")
    .reduce((sum, w) => sum + (w.guestCount || 1), 0);

  const summary = [
    { label: "Hadir", value: count("hadir"), tone: "text-success" },
    { label: "Tidak hadir", value: count("tidak_hadir"), tone: "text-danger" },
    { label: "Masih ragu", value: count("masih_ragu"), tone: "text-warning" },
    { label: "Perkiraan tamu", value: estimate, tone: "text-primary" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex justify-end"
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-[#171411]/55 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishes-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <MessageIcon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2
                    id="wishes-title"
                    className="font-serif text-xl font-semibold leading-tight text-foreground"
                  >
                    Ucapan &amp; Doa
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {wishes.length} ucapan masuk
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={loading}
                  className={iconButton}
                  aria-label="Muat ulang ucapan"
                  title="Muat ulang ucapan"
                >
                  {loading ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <RefreshIcon className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={iconButton}
                  aria-label="Tutup"
                >
                  <XIcon className="h-4.5 w-4.5" />
                </button>
              </div>
            </header>

            {!loading && wishes.length > 0 && (
              <div className="grid shrink-0 grid-cols-4 gap-2 border-b border-border bg-cream px-5 py-3.5">
                {summary.map((item) => (
                  <div key={item.label} className="text-center">
                    <p
                      className={cn(
                        "font-serif text-2xl font-semibold leading-none",
                        item.tone,
                      )}
                    >
                      {item.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {loading ? (
                <div className="flex items-center justify-center gap-2.5 py-12 text-sm text-muted-foreground">
                  <Spinner className="text-primary" />
                  Memuat ucapan...
                </div>
              ) : wishes.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <MessageIcon className="h-9 w-9 text-gold-line" />
                  <p className="text-sm text-muted-foreground">
                    Belum ada ucapan yang masuk.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  <AnimatePresence initial={false}>
                    {wishes.map((wish) => {
                      const meta = ATTENDANCE[wish.attendance];
                      const Icon = meta.icon;
                      return (
                        <motion.li
                          key={wish.id}
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className="card-wedding flex gap-3 p-4"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-lg font-semibold text-primary">
                            {wish.name.trim().charAt(0).toUpperCase()}
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <p className="truncate text-sm font-semibold text-foreground">
                                  {wish.name}
                                </p>
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                                    meta.badge,
                                  )}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                  {meta.label}
                                  {wish.attendance === "hadir" &&
                                  wish.guestCount
                                    ? ` · ${wish.guestCount} orang`
                                    : ""}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => onDelete(wish.id)}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
                                aria-label={`Hapus ucapan dari ${wish.name}`}
                                title="Hapus ucapan"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="wrap-break-word text-[13.5px] leading-normal text-foreground/80">
                              {wish.message}
                            </p>
                            <span className="text-[11.5px] text-muted-foreground">
                              {wish.timestamp}
                            </span>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
