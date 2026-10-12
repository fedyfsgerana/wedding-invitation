"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useToast } from "@/components/providers/ToastProvider";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CopyIcon = getLucideIcon("Copy");
const CheckIcon = getLucideIcon("Check");

function groupDigits(value: string) {
  return value.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function GiftSection() {
  const { bankAccounts } = weddingData;
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { showToast } = useToast();

  const copyAccountNumber = async (number: string, id: number) => {
    try {
      await navigator.clipboard.writeText(number.replace(/\s+/g, ""));
      setCopiedId(id);
      showToast("Nomor rekening berhasil disalin");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast("Nomor rekening gagal disalin", "error");
    }
  };

  return (
    <SectionWrapper id="hadiah" variant="cream">
      <div className="mx-auto max-w-lg">
        <SectionTitle
          eyebrow="Wedding Gift"
          title="Tanda Kasih"
          subtitle="Bagi yang ingin memberikan tanda kasih, dapat melalui rekening berikut."
        />

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-3.5"
        >
          {bankAccounts.map((account) => {
            const copied = copiedId === account.id;
            return (
              <motion.li
                key={account.id}
                variants={itemVariants}
                className="card-wedding flex flex-col gap-3 border-gold-line/60 bg-linear-to-br from-card to-accent px-5.5 py-5"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {account.bank}
                </span>
                <p className="font-serif text-[22px] font-semibold tracking-[0.06em] text-foreground tabular-nums">
                  {groupDigits(account.accountNumber)}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13.5px] text-muted-foreground">
                    a.n. {account.accountName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyAccountNumber(account.accountNumber, account.id)
                    }
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-gold-line bg-card px-3.5 text-[13px] font-semibold text-primary transition hover:bg-accent"
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    {copied ? "Disalin" : "Salin"}
                  </button>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </SectionWrapper>
  );
}
