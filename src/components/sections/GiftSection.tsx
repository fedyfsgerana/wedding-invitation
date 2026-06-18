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

export function GiftSection() {
    const { bankAccounts, qris } = weddingData;
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [showQris, setShowQris] = useState(false);

    const CopyIcon = getLucideIcon("Copy");
    const CheckIcon = getLucideIcon("Check");
    const QrCodeIcon = getLucideIcon("QrCode");
    const GiftIcon = getLucideIcon("Gift");

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
                    {bankAccounts.map((account) => (
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
                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={account.logo}
                                            alt={account.bank}
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = "none";
                                                const parent = target.parentElement;
                                                if (parent) {
                                                    parent.innerHTML = `<span class="text-xs font-bold text-primary">${account.bank.slice(0, 3).toUpperCase()}</span>`;
                                                }
                                            }}
                                        />
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
                                    onClick={() =>
                                        copyAccountNumber(account.accountNumber, account.id)
                                    }
                                    className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
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
                    ))}

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
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <QrCodeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">QRIS BCA</p>
                                    <p className="text-sm font-medium text-foreground">
                                        {qris.name}
                                    </p>
                                    <p className="text-xs text-primary">
                                        {showQris ? "Sembunyikan QR" : "Tampilkan QR"}
                                    </p>
                                </div>
                            </div>
                            <QrCodeIcon className="w-5 h-5 text-muted-foreground" />
                        </div>

                        {showQris && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 flex justify-center"
                            >
                                <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-border">
                                    <Image
                                        src={qris.image}
                                        alt="QRIS BCA"
                                        fill
                                        className="object-contain p-2"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS-${qris.name}`;
                                        }}
                                    />
                                </div>
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