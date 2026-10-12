"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useToast } from "@/components/providers/ToastProvider";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { Monogram } from "@/components/ui/Monogram";
import { Spinner } from "@/components/ui/Spinner";
import { usePending } from "@/hooks/usePending";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";
import { BankAccount } from "@/types";

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

function BankCard({ account }: { account: BankAccount }) {
  const [copied, setCopied] = useState(false);
  const { pending, run } = usePending(450);
  const { showToast } = useToast();

  const copyAccountNumber = () =>
    run(async () => {
      try {
        await navigator.clipboard.writeText(
          account.accountNumber.replace(/\s+/g, ""),
        );
        setCopied(true);
        showToast("Nomor rekening berhasil disalin");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        showToast("Nomor rekening gagal disalin", "error");
      }
    });

  return (
    <motion.li variants={itemVariants}>
      <article className="relative flex aspect-[1.6/1] w-full flex-col justify-between overflow-hidden rounded-[22px] border border-paper-line bg-[linear-gradient(135deg,var(--color-paper)_0%,#f6ecd6_55%,#ead7ac_100%)] p-5 text-paper-ink shadow-[0_18px_36px_-22px_rgba(58,51,44,0.55)] sm:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-paper-gold/30"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 -right-6 h-36 w-36 rounded-full border border-paper-gold/25"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 bg-white/35 blur-2xl"
        />

        <div className="relative flex items-start justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.16em] text-paper-label uppercase">
            {account.bank}
          </span>
          <Monogram size={36} />
        </div>

        <div className="relative flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-8 w-11 grid-cols-3 gap-px overflow-hidden rounded-md border border-paper-gold/70 bg-[linear-gradient(135deg,#ecd59b,#c9a24f)] p-0.5"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="rounded-xs bg-white/25" />
            ))}
          </span>
          <p className="font-serif text-[26px] font-semibold tracking-[0.08em] tabular-nums sm:text-[28px]">
            {groupDigits(account.accountNumber)}
          </p>
        </div>

        <div className="relative flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[10.5px] font-semibold tracking-[0.18em] text-paper-muted uppercase">
              Atas nama
            </span>
            <span className="block truncate font-serif text-lg font-semibold">
              {account.accountName}
            </span>
          </div>
          <button
            type="button"
            onClick={copyAccountNumber}
            disabled={pending}
            aria-busy={pending}
            aria-label={`Salin nomor rekening ${account.accountName}`}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-paper-button px-3.5 text-[13px] font-semibold text-white shadow-[0_10px_20px_-12px_rgba(148,113,42,0.7)] transition hover:brightness-105 disabled:opacity-85"
          >
            {pending ? (
              <Spinner className="h-4 w-4" />
            ) : copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
            {copied ? "Disalin" : "Salin"}
          </button>
        </div>
      </article>
    </motion.li>
  );
}

export function GiftSection() {
  const { bankAccounts } = weddingData;

  return (
    <SectionWrapper
      id="hadiah"
      variant="cream"
      ornaments={[
        { variant: "sprig", corner: "bottom-left" },
        { variant: "lavender", corner: "top-right", size: "sm" },
      ]}
    >
      <div className="mx-auto max-w-lg md:max-w-3xl">
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
          className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5"
        >
          {bankAccounts.map((account) => (
            <BankCard key={account.id} account={account} />
          ))}
        </motion.ul>
      </div>
    </SectionWrapper>
  );
}
