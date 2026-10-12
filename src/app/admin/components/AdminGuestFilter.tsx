"use client";

import { getLucideIcon } from "@/lib/utils";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  filterSent: "all" | "sent" | "unsent";
  setFilterSent: (v: "all" | "sent" | "unsent") => void;
}

const SearchIcon = getLucideIcon("Search");

const filters = [
  { value: "all", label: "Semua", icon: getLucideIcon("List") },
  { value: "sent", label: "Terkirim", icon: getLucideIcon("Check") },
  { value: "unsent", label: "Belum", icon: getLucideIcon("Clock") },
] as const;

export function AdminGuestFilter({
  search,
  setSearch,
  filterSent,
  setFilterSent,
}: Props) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <label htmlFor="guest-search" className="sr-only">
          Cari tamu
        </label>
        <SearchIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="guest-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama tamu"
          className="h-11.5 w-full rounded-xl border border-border bg-card pr-3.5 pl-10 text-sm text-foreground transition placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/25 focus:outline-none"
        />
      </div>

      <div
        role="group"
        aria-label="Filter status kirim"
        className="grid shrink-0 grid-cols-3 gap-1 rounded-xl border border-border bg-card p-1"
      >
        {filters.map((f) => {
          const Icon = f.icon;
          const active = filterSent === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilterSent(f.value)}
              className={
                "flex h-9.5 items-center justify-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold transition " +
                (active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-primary")
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
