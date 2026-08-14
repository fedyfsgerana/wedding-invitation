"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
  total: number;
  sent: number;
  unsent: number;
}

const UsersIcon = getLucideIcon("Users");
const SendIcon = getLucideIcon("Send");
const ClockIcon = getLucideIcon("Clock");

export function AdminStats({ total, sent, unsent }: Props) {
  const stats = [
    {
      label: "Total Tamu",
      value: total,
      icon: UsersIcon,
      accent: "text-primary",
      badge: "bg-primary/10",
      border: "border-primary/15",
      hoverBorder: "hover:border-primary/30",
    },
    {
      label: "Terkirim",
      value: sent,
      icon: SendIcon,
      accent: "text-success",
      badge: "bg-success-soft",
      border: "border-success-border",
      hoverBorder: "hover:border-success",
    },
    {
      label: "Belum Kirim",
      value: unsent,
      icon: ClockIcon,
      accent: "text-warning",
      badge: "bg-warning-soft",
      border: "border-warning-border",
      hoverBorder: "hover:border-warning",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={
              "flex flex-col items-center justify-center gap-2 rounded-2xl border bg-card p-4 text-center shadow-sm transition-all duration-300 cursor-default " +
              stat.border +
              " " +
              stat.hoverBorder
            }
          >
            <div
              className={
                "w-9 h-9 rounded-full flex items-center justify-center " +
                stat.badge
              }
            >
              <Icon className={"w-4 h-4 " + stat.accent} />
            </div>
            <p className={"text-2xl font-bold leading-none " + stat.accent}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
