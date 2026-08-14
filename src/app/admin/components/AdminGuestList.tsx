"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";
import { Guest } from "../page";
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
  onToggleSelectPage: () => void;
  onSelectAllFiltered: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkMarkSent: (sent: boolean) => void;
}

const PAGE_SIZE_MIN = 1;
const PAGE_SIZE_MAX = 100;

export const GUEST_ROW_GRID_COLS = "24px 1fr 204px";

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
  onToggleSelectPage,
  onSelectAllFiltered,
  onClearSelection,
  onBulkDelete,
  onBulkMarkSent,
}: Props) {
  const selectAllRef = useRef<HTMLInputElement>(null);

  const pageIds = guests.map((g) => g.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
  const somePageSelected = pageIds.some((id) => selectedIds.has(id));

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = somePageSelected && !allPageSelected;
    }
  }, [somePageSelected, allPageSelected]);

  if (loadingGuests) {
    return (
      <div className="bg-linear-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-12 flex items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Memuat data tamu...
        </p>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="bg-linear-to-br from-card via-card to-primary/5 border border-border rounded-2xl p-12 text-center">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
          <UsersIcon className="w-6 h-6 text-muted-foreground/40" />
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
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground/70 mb-0.5">
            Daftar Tamu
          </p>
          <p className="text-xs text-muted-foreground">
            Menampilkan {startItem}-{endItem} dari {filteredCount} tamu
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
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
            className="w-14 px-2 py-1 rounded-lg bg-card text-center font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
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
            <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 border-b border-border bg-primary/5">
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
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-success hover:bg-success-soft transition-all"
                  title="Tandai terkirim"
                >
                  <CheckCheckIcon className="w-3.5 h-3.5" />
                  Tandai Terkirim
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBulkMarkSent(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted transition-all"
                  title="Tandai belum terkirim"
                >
                  <ClockIcon className="w-3.5 h-3.5" />
                  Tandai Belum
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onBulkDelete}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-danger hover:bg-danger-soft transition-all"
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
        className="hidden sm:grid items-center gap-3 px-4 py-2.5 border-b border-border bg-muted/20 text-xs font-medium text-muted-foreground"
        style={{ gridTemplateColumns: GUEST_ROW_GRID_COLS }}
      >
        <input
          ref={selectAllRef}
          type="checkbox"
          checked={allPageSelected}
          onChange={onToggleSelectPage}
          className="w-4 h-4 rounded border-border text-primary accent-primary focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0 cursor-pointer"
          aria-label="Pilih semua tamu di halaman ini"
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
            />
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-t border-border bg-muted/30">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent transition-all"
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
                    "w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 " +
                    (page === currentPage
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background")
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
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
