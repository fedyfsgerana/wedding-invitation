"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useCountdown } from "@/hooks/useCountdown";
import { weddingData } from "@/lib/weddingData";
import { formatDate } from "@/lib/utils";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
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

interface CountdownBoxProps {
  value: number;
  label: string;
}

function CountdownBox({ value, label }: CountdownBoxProps) {
  const display = String(value).padStart(2, "0");
  const isLong = display.length > 2;

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center min-w-0"
    >
      <div className="relative w-12 h-12 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 shrink-0">
        <div className="absolute inset-0 rounded-xl xs:rounded-2xl gradient-primary opacity-15" />
        <div className="absolute inset-0.75 rounded-xl xs:rounded-2xl border border-primary/25 bg-card flex items-center justify-center px-1">
          <span
            className={`font-serif font-semibold text-primary tabular-nums leading-none ${
              isLong
                ? "text-base xs:text-xl sm:text-2xl md:text-3xl"
                : "text-xl xs:text-2xl md:text-3xl"
            }`}
          >
            {display}
          </span>
        </div>
      </div>
      <span className="text-[8px] xs:text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest font-sans mt-2 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

function getStatus(akadDate: string, akadTime: string, endTime: string) {
  const now = new Date();
  const start = new Date(`${akadDate}T${akadTime}:00`);
  const end = new Date(`${akadDate}T${endTime}:00`);
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "done";
}

export function CountdownSection() {
  const { akad } = weddingData;
  const { days, hours, minutes, seconds } = useCountdown(
    `${akad.date}T${akad.time}:00`,
  );
  const status = getStatus(akad.date, akad.time, akad.endTime ?? "23:59");

  return (
    <SectionWrapper id="countdown" variant="cream">
      <div className="container-wedding px-4">
        <div className="relative max-w-lg mx-auto border border-primary/20 rounded-[1.75rem] px-2 py-2">
          <CornerOrnament className="absolute top-3 left-3 w-9 h-9 text-primary/40" />
          <CornerOrnament className="absolute top-3 right-3 w-9 h-9 text-primary/40 -scale-x-100" />
          <CornerOrnament className="absolute bottom-3 left-3 w-9 h-9 text-primary/40 -scale-y-100" />
          <CornerOrnament className="absolute bottom-3 right-3 w-9 h-9 text-primary/40 -scale-x-100 -scale-y-100" />

          <div className="px-3 xs:px-5 sm:px-6 py-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium"
            >
              Menuju Hari Bahagia
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3"
            >
              Hitung Mundur
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm font-sans mb-10 max-w-sm mx-auto"
            >
              Pernikahan diselenggarakan pada {formatDate(akad.date)}
            </motion.p>

            {status === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="py-4"
              >
                <p className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-3">
                  Alhamdulillah
                </p>
                <p className="text-muted-foreground text-sm font-sans max-w-xs mx-auto">
                  Kami telah resmi dipersatukan dalam ikatan pernikahan yang
                  suci. Terima kasih atas doa dan kehadiran Anda.
                </p>
              </motion.div>
            )}

            {status === "ongoing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="py-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <span className="text-[11px] uppercase tracking-widest text-primary font-sans font-medium">
                    Sedang Berlangsung
                  </span>
                </div>
                <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
                  Hari Ini
                </p>
                <p className="text-muted-foreground text-sm font-sans max-w-xs mx-auto">
                  Acara pernikahan Fedy &amp; Suci sedang berlangsung saat ini.
                </p>
              </motion.div>
            )}

            {status === "upcoming" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4"
              >
                <CountdownBox value={days} label="Hari" />
                <motion.span
                  variants={itemVariants}
                  className="text-base xs:text-xl font-serif text-primary/30 mb-6 shrink-0"
                >
                  :
                </motion.span>
                <CountdownBox value={hours} label="Jam" />
                <motion.span
                  variants={itemVariants}
                  className="text-base xs:text-xl font-serif text-primary/30 mb-6 shrink-0"
                >
                  :
                </motion.span>
                <CountdownBox value={minutes} label="Menit" />
                <motion.span
                  variants={itemVariants}
                  className="text-base xs:text-xl font-serif text-primary/30 mb-6 shrink-0"
                >
                  :
                </motion.span>
                <CountdownBox value={seconds} label="Detik" />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
            >
              <p className="text-xs text-foreground font-sans font-medium tracking-wide">
                {formatDate(akad.date)}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
