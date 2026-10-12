"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Floral, FloralSprig } from "@/components/ui/Ornament";
import { Spinner } from "@/components/ui/Spinner";
import { usePending } from "@/hooks/usePending";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

interface CoverSectionProps {
  guestName: string | null;
  onOpen: () => void;
  isOpened: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const MailIcon = getLucideIcon("Mail");

function coverDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  const weekday = date
    .toLocaleDateString("id-ID", { weekday: "long" })
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${weekday}, ${day}.${month}.${date.getFullYear()}`;
}

export function CoverSection({
  guestName,
  onOpen,
  isOpened,
}: CoverSectionProps) {
  const { groom, bride, akad } = weddingData;
  const { pending, run } = usePending(700);

  if (isOpened) return null;

  return (
    <motion.section
      className="fixed inset-0 z-40 overflow-y-auto bg-[radial-gradient(90%_50%_at_50%_46%,var(--color-card)_0%,var(--color-ivory)_60%,var(--color-warm)_100%)]"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <div className="pointer-events-none fixed inset-3.5 overflow-hidden rounded-[30px] border border-gold-line/60">
        <Floral
          variant="eucalyptus"
          size={120}
          className="absolute -top-2 -left-2 h-32 w-32 -scale-y-100 md:h-48 md:w-48"
        />
        <Floral
          variant="lavender"
          size={120}
          className="absolute -top-2 -right-2 h-28 w-28 rotate-180 md:h-40 md:w-40"
        />
        <Floral
          variant="fern"
          size={120}
          className="absolute -bottom-2 -left-2 h-28 w-28 md:h-40 md:w-40"
        />
        <Floral
          variant="blossom"
          size={120}
          className="absolute -right-2 -bottom-2 h-32 w-32 -scale-x-100 md:h-48 md:w-48"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-full w-full max-w-md flex-col items-center px-9 pt-16 pb-14 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-[11px] font-semibold uppercase tracking-[0.38em] text-primary"
        >
          The Wedding Of
        </motion.p>

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-7 py-8">
          <motion.span
            variants={itemVariants}
            aria-hidden="true"
            className="h-14 w-px bg-linear-to-b from-transparent to-gold-line"
          />

          <motion.div
            variants={itemVariants}
            className="relative flex aspect-square w-[min(268px,74vw)] flex-col items-center justify-center rounded-full border border-gold-line/70"
          >
            <FloralSprig
              size={118}
              className="absolute -bottom-5.5 -left-8.5"
            />
            <FloralSprig
              size={88}
              className="absolute -top-4.5 -right-6.5 rotate-180"
            />
            <h1 className="flex flex-col items-center">
              <span className="font-serif text-[50px] xs:text-[58px] font-medium leading-none text-gold-gradient">
                {groom.nickname}
              </span>
              <span className="font-script text-[56px] xs:text-[64px] leading-[1.05] text-gold">
                &amp;
              </span>
              <span className="font-serif text-[50px] xs:text-[58px] font-medium leading-none text-gold-gradient">
                {bride.nickname}
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="flex items-center gap-3.5 text-[13px] font-semibold tracking-[0.24em] text-muted-foreground"
          >
            <span aria-hidden="true" className="h-px w-7 bg-gold-line" />
            {coverDate(akad.date)}
            <span aria-hidden="true" className="h-px w-7 bg-gold-line" />
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center gap-4.5"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs text-muted-foreground">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </span>
            <span className="font-serif text-[26px] font-semibold text-foreground">
              {guestName ?? "Tamu Undangan"}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={() => run().then(onOpen)}
            disabled={pending}
            aria-busy={pending}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-7.5 text-[15px] font-semibold text-primary-foreground shadow-[0_12px_24px_-14px_rgba(148,113,42,0.55)] transition hover:brightness-105 disabled:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
          >
            {pending ? <Spinner /> : <MailIcon className="h-4.5 w-4.5" />}
            {pending ? "Membuka..." : "Buka Undangan"}
          </motion.button>

          <span className="text-[11px] text-muted-foreground">
            Mohon maaf bila ada kesalahan penulisan nama
          </span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
