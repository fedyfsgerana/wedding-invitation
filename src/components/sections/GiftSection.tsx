"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { useToast } from "@/components/providers/ToastProvider";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const BANK_COLORS: Record<string, string> = {
  "Bank Mandiri": "#003d7a",
  "Bank BCA": "#0066ae",
  "Bank BRI": "#003f88",
  "Bank BNI": "#f77f00",
};

const CopyIcon = getLucideIcon("Copy");
const CheckIcon = getLucideIcon("Check");
const GiftIcon = getLucideIcon("Gift");
const BuildingIcon = getLucideIcon("Building2");

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
    >
      <path d="M4 4 Q4 16 16 16 Q4 16 4 28" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <path d="M9 9 Q13 11 12 16 Q10 12 6 13" strokeLinecap="round" />
      <path d="M9 9 Q11 13 16 12 Q12 10 13 6" strokeLinecap="round" />
    </svg>
  );
}

export function GiftSection() {
  const { bankAccounts } = weddingData;
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { showToast } = useToast();

  const copyAccountNumber = async (number: string, id: number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedId(id);
      showToast("Nomor rekening berhasil disalin");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      console.error("Gagal menyalin nomor rekening");
    }
  };

  return (
    <SectionWrapper id="hadiah" variant="default">
      <div className="container-wedding px-4">
        <div className="relative max-w-lg mx-auto border border-primary/20 rounded-[1.75rem] px-2 py-2">
          <CornerOrnament className="absolute top-3 left-3 w-9 h-9 text-primary/40" />
          <CornerOrnament className="absolute top-3 right-3 w-9 h-9 text-primary/40 -scale-x-100" />
          <CornerOrnament className="absolute bottom-3 left-3 w-9 h-9 text-primary/40 -scale-y-100" />
          <CornerOrnament className="absolute bottom-3 right-3 w-9 h-9 text-primary/40 -scale-x-100 -scale-y-100" />

          <div className="px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium">
                Wedding Gift
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                Hadiah Pernikahan
              </h2>
              <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
                Doa restu Anda adalah hadiah terindah bagi kami. Namun jika
                ingin memberikan hadiah, berikut informasinya
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {bankAccounts.map((account) => {
                const bankColor = BANK_COLORS[account.bank] ?? "#333";
                return (
                  <motion.div
                    key={account.id}
                    variants={itemVariants}
                    className="rounded-2xl border border-primary/15 bg-card p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border border-primary/20"
                          style={{ backgroundColor: bankColor }}
                        >
                          <BuildingIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-primary font-sans font-medium">
                            {account.bank}
                          </p>
                          <p className="font-serif text-base font-semibold text-foreground tracking-wide truncate">
                            {account.accountNumber}
                          </p>
                          <p className="text-xs text-muted-foreground font-sans truncate">
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
                        className="w-9 h-9 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors flex items-center justify-center shrink-0"
                        title="Salin nomor rekening"
                      >
                        {copiedId === account.id ? (
                          <CheckIcon className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <CopyIcon className="w-3.5 h-3.5 text-primary" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-2.5 px-4 py-3.5 rounded-2xl border border-primary/15 bg-primary/5"
              >
                <GiftIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  Hadiah fisik dapat dititipkan kepada keluarga atau dibawa
                  langsung saat acara berlangsung. Terima kasih atas kebaikan
                  hati Anda.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
