"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
  total: number;
  sent: number;
  unsent: number;
}

const STATS = [
  {
    key: "total",
    label: "Total tamu",
    icon: getLucideIcon("Users"),
    tone: "bg-accent text-primary",
  },
  {
    key: "sent",
    label: "Terkirim",
    icon: getLucideIcon("Send"),
    tone: "bg-success-soft text-success",
  },
  {
    key: "unsent",
    label: "Belum dikirim",
    icon: getLucideIcon("Clock"),
    tone: "bg-warning-soft text-warning",
  },
] as const;

export function AdminStats({ total, sent, unsent }: Props) {
  const values = { total, sent, unsent };

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-wedding flex flex-col items-center gap-2 px-2 py-4 text-center sm:flex-row sm:gap-3.5 sm:px-5 sm:text-left"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.tone}`}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-[28px] font-semibold leading-none text-foreground">
                {values[stat.key]}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </span>
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
