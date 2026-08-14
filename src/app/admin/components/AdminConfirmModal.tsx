"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const Loader2Icon = getLucideIcon("Loader2");
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
          className="fixed inset-0 z-110 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            onClick={loading ? undefined : onCancel}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-card w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl border border-border shadow-xl p-6"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className={
                  "w-14 h-14 rounded-full flex items-center justify-center " +
                  (isDanger
                    ? "bg-danger-soft text-danger"
                    : "bg-primary/10 text-primary")
                }
              >
                <AlertTriangleIcon className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-semibold text-foreground text-base">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full mt-1">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onCancel}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground bg-muted hover:bg-muted/70 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <XIcon className="w-4 h-4" />
                  {cancelLabel}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onConfirm}
                  disabled={loading}
                  className={
                    "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2 " +
                    (isDanger
                      ? "bg-danger hover:bg-danger/90"
                      : "bg-primary hover:bg-primary/90")
                  }
                >
                  {loading ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : isDanger ? (
                    <TrashIcon className="w-4 h-4" />
                  ) : null}
                  {confirmLabel}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
