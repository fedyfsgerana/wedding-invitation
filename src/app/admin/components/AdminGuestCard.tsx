"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { Guest } from "../page";
import { GUEST_ROW_GRID_COLS } from "./AdminGuestList";

interface Props {
  guest: Guest;
  index: number;
  copiedId: string | null;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onCopy: (guest: Guest) => void;
  onWhatsapp: (guest: Guest) => void;
  onToggleSent: (id: string) => void;
  onDelete: (id: string) => void;
  onEditName: (id: string, newName: string) => void;
  onEditQuota: (id: string, quota: number) => void;
}

const CopyIcon = getLucideIcon("Copy");
const CheckIcon = getLucideIcon("Check");
const TrashIcon = getLucideIcon("Trash2");
const ToggleSentIcon = getLucideIcon("CheckCheck");
const WhatsappIcon = getLucideIcon("MessageCircle");
const EyeIcon = getLucideIcon("Eye");
const ClockIcon = getLucideIcon("Clock");
const PencilIcon = getLucideIcon("Pencil");
const SaveIcon = getLucideIcon("Check");

export function AdminGuestCard({
  guest,
  index,
  copiedId,
  selected,
  onToggleSelect,
  onCopy,
  onWhatsapp,
  onToggleSent,
  onDelete,
  onEditName,
  onEditQuota,
}: Props) {
  const isStriped = index % 2 === 1;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(guest.name);
  const [quotaValue, setQuotaValue] = useState(String(guest.quota));
  const quotaFull = guest.used >= guest.quota;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const startEdit = () => {
    setEditValue(guest.name);
    setQuotaValue(String(guest.quota));
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== guest.name) {
      onEditName(guest.id, trimmed);
    }
    const quota = Number(quotaValue);
    if (
      Number.isInteger(quota) &&
      quota >= 1 &&
      quota <= 1000 &&
      quota !== guest.quota
    ) {
      onEditQuota(guest.id, quota);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(guest.name);
    setQuotaValue(String(guest.quota));
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.03 }}
      className={
        "group relative px-4.5 py-3.5 transition-colors duration-200 " +
        (selected
          ? "bg-accent"
          : isStriped
            ? "bg-cream/50 hover:bg-accent/60"
            : "bg-transparent hover:bg-accent/60")
      }
    >
      <div
        className="flex flex-col gap-3 sm:grid sm:items-center sm:gap-3"
        style={{ gridTemplateColumns: GUEST_ROW_GRID_COLS }}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(guest.id)}
          className="hidden sm:block w-4 h-4 rounded border-border text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-gold/30 shrink-0 cursor-pointer"
          aria-label={`Pilih ${guest.name}`}
        />
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(guest.id)}
            className="sm:hidden w-4 h-4 rounded border-border text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-gold/30 shrink-0 cursor-pointer"
            aria-label={`Pilih ${guest.name}`}
          />
          <div
            className={
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-serif text-lg font-semibold transition-colors " +
              (guest.sent
                ? "border-success-border bg-success-soft text-success"
                : "border-gold-line bg-accent text-primary")
            }
          >
            {guest.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  maxLength={100}
                  className="h-9 w-full min-w-0 rounded-lg border border-gold bg-card px-2.5 text-sm font-semibold text-foreground focus:ring-2 focus:ring-gold/30 focus:outline-none"
                  aria-label={`Edit nama ${guest.name}`}
                />
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={quotaValue}
                  onChange={(e) => setQuotaValue(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  className="h-9 w-16 shrink-0 rounded-lg border border-gold bg-card px-1 text-center text-sm text-foreground focus:ring-2 focus:ring-gold/30 focus:outline-none"
                  aria-label={`Edit kuota ${guest.name}`}
                  title="Kuota ucapan"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="truncate text-[15px] font-semibold text-foreground">
                  {guest.name}
                </p>
                {guest.sent && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
                    <CheckIcon className="h-3 w-3" />
                    Terkirim
                  </span>
                )}
              </div>
            )}
            <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <ClockIcon className="w-3 h-3 shrink-0" />
              {guest.createdAt}
              <span
                className={
                  "ml-1 px-1.5 py-0.5 rounded-md border " +
                  (quotaFull
                    ? "bg-danger-soft text-danger border-danger-border"
                    : "border-border bg-cream text-muted-foreground")
                }
                title="Ucapan terpakai / kuota"
              >
                Ucapan {guest.used}/{guest.quota}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-0.5 shrink-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={isEditing ? saveEdit : startEdit}
            className={
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors " +
              (isEditing
                ? "text-success hover:bg-success-soft"
                : "text-muted-foreground hover:bg-accent hover:text-primary")
            }
            title={isEditing ? "Simpan" : "Edit nama dan kuota"}
          >
            {isEditing ? (
              <SaveIcon className="w-4 h-4" />
            ) : (
              <PencilIcon className="w-4 h-4" />
            )}
          </motion.button>

          <motion.a
            href={guest.link}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            title="Preview undangan"
          >
            <EyeIcon className="w-4 h-4" />
          </motion.a>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onCopy(guest)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            title="Salin link"
          >
            {copiedId === guest.id ? (
              <CheckIcon className="w-4 h-4 text-success" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onWhatsapp(guest)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-success-soft hover:text-success"
            title="Kirim via WhatsApp"
          >
            <WhatsappIcon className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleSent(guest.id)}
            className={
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors " +
              (guest.sent
                ? "text-success hover:bg-success-soft"
                : "text-muted-foreground hover:bg-accent hover:text-primary")
            }
            title={
              guest.sent ? "Tandai belum terkirim" : "Tandai sudah terkirim"
            }
          >
            <ToggleSentIcon className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(guest.id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
            title="Hapus tamu"
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
