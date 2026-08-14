"use client";

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
}

const CopyIcon = getLucideIcon("Copy");
const CheckIcon = getLucideIcon("Check");
const TrashIcon = getLucideIcon("Trash2");
const ToggleSentIcon = getLucideIcon("CheckCheck");
const WhatsappIcon = getLucideIcon("MessageCircle");
const EyeIcon = getLucideIcon("Eye");
const ClockIcon = getLucideIcon("Clock");

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
}: Props) {
  const isStriped = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.03 }}
      className={
        "group relative px-4 py-3.5 transition-colors duration-200 " +
        (selected
          ? "bg-primary/10 hover:bg-primary/15"
          : guest.sent
            ? "bg-success-soft/40 hover:bg-success-soft/60"
            : isStriped
              ? "bg-muted/40 hover:bg-primary/5"
              : "bg-transparent hover:bg-primary/5")
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
          className="w-4 h-4 rounded border-border text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0 cursor-pointer"
          aria-label={`Pilih ${guest.name}`}
        />
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={
              "w-11 h-11 rounded-full flex items-center justify-center shrink-0 " +
              "font-bold text-sm border transition-all duration-300 " +
              (guest.sent
                ? "bg-success-soft text-success border-success-border"
                : "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30")
            }
          >
            {guest.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground truncate">
                {guest.name}
              </p>
              {guest.sent && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-success-soft text-success border border-success-border shrink-0">
                  ✓ Terkirim
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground/60 mt-0.5 flex items-center gap-1">
              <ClockIcon className="w-3 h-3 shrink-0" />
              {guest.createdAt}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-0.5 shrink-0">
          <motion.a
            href={guest.link}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-muted-foreground"
            title="Preview undangan"
          >
            <EyeIcon className="w-4 h-4" />
          </motion.a>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onCopy(guest)}
            className="p-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 text-muted-foreground"
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
            className="p-2 rounded-xl hover:bg-success-soft hover:text-success transition-all duration-200 text-muted-foreground"
            title="Kirim via WhatsApp"
          >
            <WhatsappIcon className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleSent(guest.id)}
            className={
              "p-2 rounded-xl transition-all duration-200 " +
              (guest.sent
                ? "text-success hover:bg-success-soft"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary")
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
            className="p-2 rounded-xl hover:bg-danger-soft hover:text-danger transition-all duration-200 text-muted-foreground"
            title="Hapus tamu"
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
