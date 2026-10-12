"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { Guest } from "../page";
import { Spinner } from "@/components/ui/Spinner";
import { AdminGuestCard } from "./AdminGuestCard";

interface Props {
  guests: Guest[];
  allGuestsCount: number;
  filteredCount: number;
  loadingGuests: boolean;
  copiedId: string | null;
  onCopy: (guest: Guest) => void;
  onWhatsapp: (guest: Guest) => void;
  onToggleSent: (id: string) => void;
  onDelete: (id: string) => void;
  onEditName: (id: string, newName: string) => void;
  onEditQuota: (id: string, quota: number) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  totalPages: number;
  sortBy: "name" | "createdAt";
  sortDir: "asc" | "desc";
  onSort: (field: "name" | "createdAt") => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAllFiltered: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkMarkSent: (sent: boolean) => void;
}

const PAGE_SIZE_MIN = 1;
const PAGE_SIZE_MAX = 100;

export const GUEST_ROW_GRID_COLS = "24px 1fr 232px";

const UsersIcon = getLucideIcon("Users");
const ChevronLeftIcon = getLucideIcon("ChevronLeft");
const ChevronRightIcon = getLucideIcon("ChevronRight");
const CheckCheckIcon = getLucideIcon("CheckCheck");
const ClockIcon = getLucideIcon("Clock");
const TrashIcon = getLucideIcon("Trash2");
const XIcon = getLucideIcon("X");
const ArrowUpIcon = getLucideIcon("ArrowUp");
const ArrowDownIcon = getLucideIcon("ArrowDown");
const ArrowUpDownIcon = getLucideIcon("ArrowUpDown");

export function AdminGuestList({
  guests,
  allGuestsCount,
  filteredCount,
  loadingGuests,
  copiedId,
  onCopy,
  onWhatsapp,
  onToggleSent,
  onDelete,
  onEditName,
  onEditQuota,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalPages,
  sortBy,
  sortDir,
  onSort,
  selectedIds,
  onToggleSelect,
  onSelectAllFiltered,
  onClearSelection,
  onBulkDelete,
  onBulkMarkSent,
}: Props) {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const selectAllRefMobile = useRef<HTMLInputElement>(null);

  const allFilteredSelected =
    filteredCount > 0 && selectedIds.size === filteredCount;
  const someFilteredSelected = selectedIds.size > 0 && !allFilteredSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someFilteredSelected;
    }
    if (selectAllRefMobile.current) {
      selectAllRefMobile.current.indeterminate = someFilteredSelected;
    }
  }, [someFilteredSelected]);

  const handleToggleSelectAll = () => {
    if (allFilteredSelected) {
      onClearSelection();
    } else {
      onSelectAllFiltered();
    }
  };

  if (loadingGuests) {
    return (
      <div className="card-wedding flex items-center justify-center gap-2.5 p-12 text-sm text-muted-foreground">
        <Spinner className="text-primary" />
        Memuat data tamu...
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="card-wedding p-12 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <UsersIcon className="h-6 w-6 text-gold" />
        </div>
        <p className="text-sm text-muted-foreground">
          {allGuestsCount === 0
            ? "Belum ada tamu. Tambahkan tamu di atas."
            : "Tidak ada tamu yang sesuai pencarian."}
        </p>
      </div>
    );
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredCount);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
  };

  return (
    <div className="card-wedding overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4.5 py-3.5">
        <div>
          <p className="font-serif text-lg font-semibold text-foreground">
            Tamu
          </p>
          <p className="text-xs text-muted-foreground">
            Menampilkan {startItem}-{endItem} dari {filteredCount} tamu
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Tampilkan</span>
          <input
            type="number"
            min={PAGE_SIZE_MIN}
            max={PAGE_SIZE_MAX}
            value={pageSize}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") return;
              const num = Number(raw);
              if (Number.isNaN(num)) return;
              const clamped = Math.min(
                Math.max(Math.floor(num), PAGE_SIZE_MIN),
                PAGE_SIZE_MAX,
              );
              setPageSize(clamped);
            }}
            onBlur={(e) => {
              if (e.target.value === "") setPageSize(PAGE_SIZE_MIN);
            }}
            className="h-9 w-16 rounded-lg border border-border bg-card px-2 text-center font-semibold text-foreground focus:border-gold focus:ring-2 focus:ring-gold/25 focus:outline-none"
          />
        </label>
      </div>

      <AnimatePresence initial={false}>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-accent px-4.5 py-2.5">
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="font-medium text-foreground">
                  {selectedIds.size} tamu dipilih
                </span>
                {selectedIds.size < filteredCount && (
                  <button
                    onClick={onSelectAllFiltered}
                    className="text-primary hover:underline font-medium"
                  >
                    Pilih semua {filteredCount} tamu
                  </button>
                )}
                <button
                  onClick={onClearSelection}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XIcon className="w-3 h-3" />
                  Batal
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBulkMarkSent(true)}
                  className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-success transition hover:bg-success-soft"
                  title="Tandai terkirim"
                >
                  <CheckCheckIcon className="w-3.5 h-3.5" />
                  Tandai Terkirim
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBulkMarkSent(false)}
                  className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted-foreground transition hover:bg-card"
                  title="Tandai belum terkirim"
                >
                  <ClockIcon className="w-3.5 h-3.5" />
                  Tandai Belum
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onBulkDelete}
                  className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-danger transition hover:bg-danger-soft"
                  title="Hapus tamu terpilih"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                  Hapus
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="hidden items-center gap-3 border-b border-border bg-cream px-4.5 py-2.5 text-xs font-semibold text-muted-foreground sm:grid"
        style={{ gridTemplateColumns: GUEST_ROW_GRID_COLS }}
      >
        <input
          ref={selectAllRef}
          type="checkbox"
          checked={allFilteredSelected}
          onChange={handleToggleSelectAll}
          className="w-4 h-4 rounded border-border text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-gold/30 shrink-0 cursor-pointer"
          aria-label={
            allFilteredSelected
              ? "Batalkan pilih semua tamu"
              : `Pilih semua ${filteredCount} tamu`
          }
        />
        <button
          onClick={() => onSort("name")}
          className="flex items-center justify-center gap-1 hover:text-foreground transition-colors text-center"
        >
          Nama Tamu
          {sortBy === "name" ? (
            sortDir === "asc" ? (
              <ArrowUpIcon className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownIcon className="w-3.5 h-3.5" />
            )
          ) : (
            <ArrowUpDownIcon className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
        <div className="text-center">Aksi</div>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-border bg-cream px-4.5 py-2.5 text-xs font-semibold text-muted-foreground sm:hidden">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            ref={selectAllRefMobile}
            type="checkbox"
            checked={allFilteredSelected}
            onChange={handleToggleSelectAll}
            className="w-4 h-4 rounded border-border text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-gold/30 shrink-0 cursor-pointer"
            aria-label={
              allFilteredSelected
                ? "Batalkan pilih semua tamu"
                : `Pilih semua ${filteredCount} tamu`
            }
          />
          Pilih Semua
        </label>
        <button
          onClick={() => onSort("name")}
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          Nama Tamu
          {sortBy === "name" ? (
            sortDir === "asc" ? (
              <ArrowUpIcon className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownIcon className="w-3.5 h-3.5" />
            )
          ) : (
            <ArrowUpDownIcon className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
      </div>

      <div className="divide-y divide-border">
        <AnimatePresence>
          {guests.map((guest, index) => (
            <AdminGuestCard
              key={guest.id}
              guest={guest}
              index={index}
              copiedId={copiedId}
              selected={selectedIds.has(guest.id)}
              onToggleSelect={onToggleSelect}
              onCopy={onCopy}
              onWhatsapp={onWhatsapp}
              onToggleSent={onToggleSent}
              onDelete={onDelete}
              onEditName={onEditName}
              onEditQuota={onEditQuota}
            />
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1,
            )
            .map((page, idx, arr) => (
              <span key={page} className="flex items-center gap-1.5">
                {idx > 0 && arr[idx - 1] !== page - 1 && (
                  <span className="text-muted-foreground/50 text-xs px-0.5">
                    ...
                  </span>
                )}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToPage(page)}
                  className={
                    "h-9 w-9 rounded-lg text-xs font-semibold transition " +
                    (page === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-primary")
                  }
                >
                  {page}
                </motion.button>
              </span>
            ))}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
