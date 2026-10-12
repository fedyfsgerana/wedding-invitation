"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
  guestName: string;
  setGuestName: (v: string) => void;
  guestQuota: string;
  setGuestQuota: (v: string) => void;
  onAdd: () => void;
}

const UsersIcon = getLucideIcon("Users");
const PlusIcon = getLucideIcon("Plus");

export function AdminAddGuest({
  guestName,
  setGuestName,
  guestQuota,
  setGuestQuota,
  onAdd,
}: Props) {
  const [error, setError] = useState(false);

  const isEmpty = guestName.trim().length === 0;
  const quotaValue = Number(guestQuota);
  const quotaInvalid =
    !Number.isInteger(quotaValue) || quotaValue < 1 || quotaValue > 1000;

  const handleAdd = () => {
    if (isEmpty || quotaInvalid) {
      setError(true);
      return;
    }
    setError(false);
    onAdd();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-linear-to-br from-card via-card to-primary/5 border border-border hover:border-primary/20 rounded-2xl p-5 shadow-sm transition-all duration-300"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
        Tambah Tamu Baru
      </p>
      <p className="text-xs text-muted-foreground -mt-2 mb-3">
        Kuota = jumlah ucapan yang boleh dikirim lewat tautan ini. Isi 1 untuk
        perorangan, atau lebih untuk undangan kelompok.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <UsersIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={guestName}
            onChange={(e) => {
              setGuestName(e.target.value);
              if (error) setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Nama tamu..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-danger focus:ring-danger/20 focus:border-danger"
                : "border-border focus:ring-primary/30 focus:border-primary"
            }`}
          />
        </div>
        <input
          type="number"
          min={1}
          max={1000}
          value={guestQuota}
          onChange={(e) => {
            setGuestQuota(e.target.value);
            if (error) setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          aria-label="Kuota ucapan"
          title="Kuota ucapan: 1 untuk perorangan, lebih untuk kelompok"
          className={`w-20 px-3 py-2.5 rounded-xl border bg-background text-foreground text-sm text-center focus:outline-none focus:ring-2 transition-all ${
            error && quotaInvalid
              ? "border-danger focus:ring-danger/20 focus:border-danger"
              : "border-border focus:ring-primary/30 focus:border-primary"
          }`}
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleAdd}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 text-sm font-medium shrink-0 shadow-sm hover:shadow-md hover:brightness-105 transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Tambah
        </motion.button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-danger mt-2 flex items-center gap-1"
          >
            {isEmpty
              ? "✕ Nama tamu tidak boleh kosong."
              : "✕ Kuota harus 1 sampai 1000."}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
