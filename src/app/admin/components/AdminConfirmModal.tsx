"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/Spinner";
import { getLucideIcon } from "@/lib/utils";

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertTriangleIcon = getLucideIcon("TriangleAlert");
const TrashIcon = getLucideIcon("Trash2");
const XIcon = getLucideIcon("X");

export function AdminConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  loading = false,
  variant = "danger",
  onConfirm,
  onCancel,
}: Props) {
  const isDanger = variant === "danger";

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-110 flex items-end justify-center sm:items-center sm:p-4"
        >
          <div
            aria-hidden="true"
            onClick={loading ? undefined : onCancel}
            className="absolute inset-0 bg-[#171411]/55 backdrop-blur-sm"
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-description"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="card-wedding relative w-full rounded-b-none px-5.5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:max-w-sm sm:rounded-b-[1.375rem] sm:pb-6"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <span
                className={
                  "flex h-14 w-14 items-center justify-center rounded-full " +
                  (isDanger
                    ? "bg-danger-soft text-danger"
                    : "bg-accent text-primary")
                }
              >
                <AlertTriangleIcon className="h-7 w-7" />
              </span>

              <div>
                <h3
                  id="confirm-title"
                  className="font-serif text-xl font-semibold text-foreground"
                >
                  {title}
                </h3>
                <p
                  id="confirm-description"
                  className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                >
                  {description}
                </p>
              </div>

              <div className="mt-1 grid w-full grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-semibold text-foreground transition hover:bg-accent disabled:opacity-50"
                >
                  <XIcon className="h-4 w-4" />
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={loading}
                  aria-busy={loading}
                  className={
                    "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition disabled:opacity-85 " +
                    (isDanger
                      ? "bg-danger hover:brightness-105"
                      : "bg-primary hover:brightness-105")
                  }
                >
                  {loading ? (
                    <Spinner className="h-4 w-4" />
                  ) : isDanger ? (
                    <TrashIcon className="h-4 w-4" />
                  ) : null}
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
