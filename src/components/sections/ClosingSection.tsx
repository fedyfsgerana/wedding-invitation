"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useToast } from "@/components/providers/ToastProvider";
import { DotDivider, FloralSprig } from "@/components/ui/Ornament";
import { Spinner } from "@/components/ui/Spinner";
import { usePending } from "@/hooks/usePending";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const LinkIcon = getLucideIcon("Link");
const CheckIcon = getLucideIcon("Check");

export function ClosingSection() {
  const { groom, bride, akad } = weddingData;
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const { pending, run } = usePending(450);

  const copyLink = () =>
    run(async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        showToast("Link undangan berhasil disalin");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        showToast("Link undangan gagal disalin", "error");
      }
    });

  return (
    <section
      id="penutup"
      className="w-full bg-background px-5.5 pt-12 pb-28 md:pb-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
      >
        <motion.div variants={itemVariants} className="flex">
          <FloralSprig size={64} className="-scale-x-100" />
          <FloralSprig size={64} />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="font-serif text-[30px] font-semibold text-foreground md:text-[40px]"
        >
          Terima Kasih
        </motion.h2>

        <motion.div variants={itemVariants}>
          <DotDivider />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm text-muted-foreground"
        >
          Wassalamu&apos;alaikum Wr. Wb.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-1 font-serif text-[38px] font-medium leading-tight"
        >
          <span className="text-gold-gradient">{groom.nickname}</span>{" "}
          <span className="font-script text-[44px] text-gold">&amp;</span>{" "}
          <span className="text-gold-gradient">{bride.nickname}</span>
        </motion.p>

        <motion.button
          variants={itemVariants}
          type="button"
          onClick={copyLink}
          disabled={pending}
          aria-busy={pending}
          whileTap={{ scale: 0.97 }}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-gold-line bg-card px-5 text-sm font-semibold text-primary transition hover:bg-accent"
        >
          {pending ? (
            <Spinner className="h-4 w-4" />
          ) : copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <LinkIcon className="h-4 w-4" />
          )}
          {copied ? "Link disalin" : "Salin link undangan"}
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground"
        >
          <p>
            {new Date(`${akad.date}T00:00:00`).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            © {new Date().getFullYear()} {groom.nickname} &amp; {bride.nickname}{" "}
            Wedding
          </p>
          <p className="text-[11px] text-muted-foreground/80">
            Music: &quot;Canon in D Major&quot; by Kevin MacLeod
            (incompetech.com), CC BY 3.0
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
