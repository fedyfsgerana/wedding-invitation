"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const BANK_COLORS: Record<string, string> = {
    "Bank Mandiri": "#003d7a",
    "Bank BCA": "#0066ae",
    "Bank BRI": "#003f88",
    "Bank BNI": "#f77f00",
};

export function GiftSection() {
    const { bankAccounts, qris } = weddingData;
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [showQris, setShowQris] = useState(false);

    const CopyIcon = getLucideIcon("Copy");
    const CheckIcon = getLucideIcon("Check");
    const QrCodeIcon = getLucideIcon("QrCode");
    const GiftIcon = getLucideIcon("Gift");
    const BuildingIcon = getLucideIcon("Building2");

    const copyAccountNumber = async (number: string, id: number) => {
        try {
            await navigator.clipboard.writeText(number);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            console.error("Gagal menyalin nomor rekening");
        }
    };

    return (
        <SectionWrapper id="hadiah" variant="cream">
            <div className="container-wedding">
                <SectionTitle
                    decorative="Wedding Gift"
                    title="Hadiah Pernikahan"
                    subtitle="Doa restu Anda adalah hadiah terindah bagi kami. Namun jika ingin memberikan hadiah, berikut informasinya"
                />

                <div className="max-w-lg mx-auto space-y-4">
                    {/* Bank Accounts */}
                    {bankAccounts.map((account) => {
                        const bankColor = BANK_COLORS[account.bank] ?? "#333";
                        return (
                            <motion.div
                                key={account.id}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="card-wedding p-5"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: bankColor }}
                                        >
                                            <BuildingIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{account.bank}</p>
                                            <p className="text-base font-bold text-foreground font-mono tracking-wider">
                                                {account.accountNumber}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                a.n. {account.accountName}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => copyAccountNumber(account.accountNumber, account.id)}
                                        className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors shrink-0"
                                        title="Salin nomor rekening"
                                    >
                                        {copiedId === account.id ? (
                                            <CheckIcon className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <CopyIcon className="w-4 h-4 text-primary" />
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* QRIS */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="card-wedding p-5"
                    >
                        <div
                            className="flex items-center justify-between gap-4 cursor-pointer"
                            onClick={() => setShowQris(!showQris)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                                    <QrCodeIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">QRIS BCA Digital</p>
                                    <p className="text-sm font-medium text-foreground">{qris.name}</p>
                                    <p className="text-xs text-primary">
                                        {showQris ? "Sembunyikan QR" : "Tampilkan QR"}
                                    </p>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: showQris ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <QrCodeIcon className="w-5 h-5 text-muted-foreground" />
                            </motion.div>
                        </div>

                        {showQris && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-4 flex flex-col items-center gap-2"
                            >
                                <div className="relative w-52 h-52 rounded-xl overflow-hidden border border-border bg-white p-2">
                                    <Image
                                        src={qris.image}
                                        alt="QRIS BCA Digital"
                                        fill
                                        className="object-contain p-2"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src =
                                                "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS-" +
                                                encodeURIComponent(qris.name);
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Scan untuk transfer
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Note */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10"
                    >
                        <GiftIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Hadiah fisik dapat dititipkan kepada keluarga atau dibawa langsung
                            saat acara berlangsung. Terima kasih atas kebaikan hati Anda.
                        </p>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}