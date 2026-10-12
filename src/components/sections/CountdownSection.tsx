"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { useCountdown } from "@/hooks/useCountdown";
import { generateGoogleCalendarUrl } from "@/lib/calendarHelper";
import { formatDate } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

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
  visible: { transition: { staggerChildren: 0.1 } },
};

function CountdownCircle({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      variants={itemVariants}
      className="flex aspect-square w-full max-w-19 flex-col items-center justify-center rounded-full border border-border bg-card shadow-[0_8px_20px_-14px_rgba(58,51,44,0.35)] md:max-w-24"
    >
      <span
        className={`font-serif font-semibold leading-none tabular-nums text-gold-gradient ${
          display.length > 2
            ? "text-2xl md:text-3xl"
            : "text-[30px] md:text-[40px]"
        }`}
      >
        {display}
      </span>
      <span className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-[11px]">
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
  if (now <= end) return "ongoing";
  return "done";
}

export function CountdownSection() {
  const { akad } = weddingData;
  const { days, hours, minutes, seconds } = useCountdown(
    `${akad.date}T${akad.time}:00`,
  );
  const status = getStatus(akad.date, akad.time, akad.endTime ?? "23:59");

  return (
    <SectionWrapper
      id="countdown"
      ornaments={[
        { variant: "daisy", corner: "top-left" },
        { variant: "eucalyptus", corner: "bottom-right", size: "sm" },
      ]}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <SectionTitle
          eyebrow="Menuju Hari Bahagia"
          title={formatDate(akad.date)}
          subtitle={
            status === "upcoming"
              ? "Hitung mundur menuju hari bahagia kami"
              : undefined
          }
          className="mb-6"
        />

        {status === "upcoming" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid w-full grid-cols-4 justify-items-center gap-2"
          >
            <CountdownCircle value={days} label="Hari" />
            <CountdownCircle value={hours} label="Jam" />
            <CountdownCircle value={minutes} label="Menit" />
            <CountdownCircle value={seconds} label="Detik" />
          </motion.div>
        )}

        {status === "ongoing" && (
          <div className="card-wedding w-full px-5.5 py-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="h-2 w-2 rounded-full bg-gold"
              />
              Sedang berlangsung
            </span>
            <p className="mt-3 font-serif text-2xl font-semibold text-foreground">
              Hari Ini
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Acara pernikahan kami sedang berlangsung saat ini.
            </p>
          </div>
        )}

        {status === "done" && (
          <div className="card-wedding w-full px-5.5 py-6">
            <p className="font-serif text-2xl font-semibold text-gold-gradient">
              Alhamdulillah
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Kami telah resmi dipersatukan dalam ikatan pernikahan yang suci.
              Terima kasih atas doa dan kehadiran Anda.
            </p>
          </div>
        )}

        {status === "upcoming" && (
          <Button
            href={generateGoogleCalendarUrl(akad, akad.calendarTitle)}
            target="_blank"
            variant="outline"
            icon="CalendarDays"
            fullWidth
            className="mt-6"
          >
            Simpan ke Kalender
          </Button>
        )}
      </div>
    </SectionWrapper>
  );
}
