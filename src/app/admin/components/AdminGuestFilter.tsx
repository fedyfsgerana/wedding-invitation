"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
    search: string;
    setSearch: (v: string) => void;
    filterSent: "all" | "sent" | "unsent";
    setFilterSent: (v: "all" | "sent" | "unsent") => void;
}

export function AdminGuestFilter({ search, setSearch, filterSent, setFilterSent }: Props) {
    const SearchIcon = getLucideIcon("Search");
    const CheckIcon = getLucideIcon("Check");
    const ClockIcon = getLucideIcon("Clock");
    const ListIcon = getLucideIcon("List");

    const filters = [
        { value: "all", label: "Semua", icon: ListIcon },
        { value: "sent", label: "Terkirim", icon: CheckIcon },
        { value: "unsent", label: "Belum", icon: ClockIcon },
    ] as const;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2 sm:flex-row"
        >
            <div className="relative flex-1">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama tamu..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-xl p-1 shrink-0">
                {filters.map((f) => {
                    const Icon = f.icon;
                    return (
                        <motion.button
                            key={f.value}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilterSent(f.value)}
                            className={
                                "flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 " +
                                (filterSent === f.value
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50")
                            }
                        >
                            <Icon className="w-3 h-3" />
                            {f.label}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}