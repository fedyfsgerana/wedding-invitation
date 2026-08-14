"use client";

import { createContext, useContext, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLucideIcon, cn } from "@/lib/utils";

const CheckCircleIcon = getLucideIcon("CheckCircle2");
const AlertCircleIcon = getLucideIcon("AlertCircle");
const XIcon = getLucideIcon("X");

export type ToastType = "success" | "error";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

const TOAST_DURATION: Record<ToastType, number> = {
  success: 2500,
  error: 4000,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => removeToast(id), TOAST_DURATION[type]);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-4 right-4 z-100 flex flex-col items-end gap-2 px-4 md:px-0 w-full max-w-xs pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "flex items-center gap-2.5 w-full px-4 py-3 rounded-full border shadow-lg pointer-events-auto",
                toast.type === "success"
                  ? "border-success-border bg-success-soft/95"
                  : "border-danger-border bg-danger-soft/95",
              )}
            >
              {toast.type === "success" ? (
                <CheckCircleIcon className="w-4 h-4 text-success shrink-0" />
              ) : (
                <AlertCircleIcon className="w-4 h-4 text-danger shrink-0" />
              )}
              <span
                className={cn(
                  "text-xs font-sans font-medium flex-1",
                  toast.type === "success" ? "text-success" : "text-danger",
                )}
              >
                {toast.message}
              </span>
              <button
                onClick={() => removeToast(toast.id)}
                className={cn(
                  "shrink-0 opacity-60 hover:opacity-100 transition-opacity",
                  toast.type === "success" ? "text-success" : "text-danger",
                )}
                aria-label="Tutup notifikasi"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
