"use client";

import { motion } from "framer-motion";
import { getLucideIcon } from "@/lib/utils";

interface Props {
    total: number;
    sent: number;
    unsent: number;
}

export function AdminStats({ total, sent, unsent }: Props) {
    const UsersIcon = getLucideIcon("Users");
    const SendIcon = getLucideIcon("Send");
    const ClockIcon = getLucideIcon("Clock");

    const stats = [
        {
            label: "Total Tamu",
            value: total,
            icon: UsersIcon,
            color: "text-primary",
            gradient: "from-primary/10 via-primary/5 to-transparent",
            border: "border-primary/15",
            hover: "hover:from-primary/20 hover:via-primary/10 hover:to-transparent hover:border-primary/30",
        },
        {
            label: "Terkirim",
            value: sent,
            icon: SendIcon,
            color: "text-green-600",
            gradient: "from-green-100 via-green-50 to-transparent",
            border: "border-green-100",
            hover: "hover:from-green-200 hover:via-green-100 hover:to-transparent hover:border-green-200",
        },
        {
            label: "Belum Kirim",
            value: unsent,
            icon: ClockIcon,
            color: "text-amber-600",
            gradient: "from-amber-100 via-amber-50 to-transparent",
            border: "border-amber-100",
            hover: "hover:from-amber-200 hover:via-amber-100 hover:to-transparent hover:border-amber-200",
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
                            "relative rounded-2xl border p-4 text-center cursor-default " +
                            "bg-linear-to-br transition-all duration-300 " +
                            stat.gradient + " " +
                            stat.border + " " +
                            stat.hover
                        }
                    >
                        <div className="flex justify-center mb-2">
                            <div className={"w-8 h-8 rounded-full bg-white/60 flex items-center justify-center " + stat.color}>
                                <Icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className={"text-2xl font-bold mb-0.5 " + stat.color}>{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                );
            })}
        </div>
    );
}