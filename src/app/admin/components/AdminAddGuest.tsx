"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getLucideIcon } from "@/lib/utils";

interface Props {
  guestName: string;
  setGuestName: (v: string) => void;
  guestQuota: string;
  setGuestQuota: (v: string) => void;
  onAdd: () => unknown;
}

const UsersIcon = getLucideIcon("Users");

const inputClass =
  "h-11.5 rounded-xl border bg-card text-sm text-foreground transition placeholder:text-muted-foreground/70 focus:ring-2 focus:outline-none";

export function AdminAddGuest({
  guestName,
  setGuestName,
  guestQuota,
  setGuestQuota,
  onAdd,
}: Props) {
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isEmpty = guestName.trim().length === 0;
  const quotaValue = Number(guestQuota);
  const quotaInvalid =
    !Number.isInteger(quotaValue) || quotaValue < 1 || quotaValue > 1000;

  const submit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (isEmpty || quotaInvalid) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);
    try {
      await onAdd();
    } finally {
      setSubmitting(false);
    }
  };

  const tone = (invalid: boolean) =>
    error && invalid
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-border focus:border-gold focus:ring-gold/25";

  return (
    <form
      onSubmit={submit}
      className="card-wedding flex flex-col gap-3.5 px-5 py-5"
    >
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Tambah Tamu
        </h2>
        <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
          Kuota adalah jumlah ucapan yang boleh dikirim lewat tautan ini: isi 1
          untuk perorangan, atau lebih untuk undangan kelompok.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="guest-name" className="sr-only">
            Nama tamu
          </label>
          <UsersIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="guest-name"
            type="text"
            value={guestName}
            maxLength={100}
            onChange={(e) => {
              setGuestName(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Nama tamu atau kelompok"
            className={`${inputClass} w-full pr-3.5 pl-10 ${tone(isEmpty)}`}
          />
        </div>
        <div className="flex gap-2.5">
          <label className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-foreground">
              Kuota
            </span>
            <input
              type="number"
              min={1}
              max={1000}
              value={guestQuota}
              onChange={(e) => {
                setGuestQuota(e.target.value);
                if (error) setError(false);
              }}
              className={`${inputClass} w-20 px-3 text-center ${tone(quotaInvalid)}`}
            />
          </label>
          <Button
            type="submit"
            icon="Plus"
            loading={submitting}
            className="flex-1 sm:flex-none"
          >
            Tambah
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-danger"
          >
            {isEmpty ? "Nama tamu wajib diisi." : "Kuota harus 1 sampai 1000."}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
