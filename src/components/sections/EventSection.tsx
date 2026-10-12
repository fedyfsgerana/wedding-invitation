"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { usePending } from "@/hooks/usePending";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import {
  generateAppleCalendarUrl,
  generateGoogleCalendarUrl,
} from "@/lib/calendarHelper";
import { formatDate, getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";
import { EventDetail } from "@/types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ClockIcon = getLucideIcon("Clock");
const MapPinIcon = getLucideIcon("MapPin");
const CopyIcon = getLucideIcon("Copy");
const CheckIcon = getLucideIcon("Check");

function timeRange(event: EventDetail) {
  const start = event.time.replace(":", ".");
  const end = event.endTime ? ` – ${event.endTime.replace(":", ".")}` : "";
  return `${start}${end} WIB`;
}

function dateBadge(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date
      .toLocaleDateString("id-ID", { month: "short" })
      .replace(".", "")
      .toUpperCase(),
  };
}

interface EventCardProps {
  title: string;
  event: EventDetail;
  index: number;
}

function EventCard({ title, event, index }: EventCardProps) {
  const [copied, setCopied] = useState(false);
  const badge = dateBadge(event.date);
  const copying = usePending(450);
  const downloading = usePending(700);

  const copyAddress = () =>
    copying.run(async () => {
      try {
        await navigator.clipboard.writeText(event.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    });

  const createIcs = () => {
    const url = generateAppleCalendarUrl(event, event.calendarTitle);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.calendarTitle}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadIcs = () => downloading.run(createIcs);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card-wedding flex flex-col gap-3.5 overflow-hidden py-4.5"
    >
      <header className="flex items-center gap-3 px-4.5">
        <span className="flex w-14 shrink-0 flex-col items-center rounded-[14px] border border-border bg-accent py-1.75 leading-tight">
          <b className="font-serif text-2xl text-primary">{badge.day}</b>
          <span className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
            {badge.month}
          </span>
        </span>
        <div>
          <h3 className="font-serif text-[23px] font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {formatDate(event.date)}
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-2.5 px-4.5 text-sm">
        <p className="flex items-center gap-2.5 text-foreground">
          <ClockIcon className="h-4.5 w-4.5 shrink-0 text-gold" />
          {timeRange(event)}
        </p>
        <div className="flex items-start gap-2.5">
          <MapPinIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
          <p className="flex-1 leading-snug">
            <span className="font-semibold text-foreground">{event.venue}</span>
            <br />
            <span className="text-muted-foreground">{event.address}</span>
          </p>
          <button
            type="button"
            onClick={copyAddress}
            disabled={copying.pending}
            aria-busy={copying.pending}
            aria-label={copied ? "Alamat disalin" : "Salin alamat"}
            title={copied ? "Alamat disalin" : "Salin alamat"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary transition hover:bg-accent"
          >
            {copying.pending ? (
              <Spinner className="h-4 w-4" />
            ) : copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="mx-4.5 h-36 overflow-hidden rounded-2xl border border-border">
        <iframe
          src={event.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Peta lokasi ${title}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4.5">
        <Button href={event.mapsUrl} target="_blank" icon="MapPin">
          Petunjuk Arah
        </Button>
        <Button
          href={generateGoogleCalendarUrl(event, event.calendarTitle)}
          target="_blank"
          variant="outline"
          icon="CalendarPlus"
        >
          Kalender
        </Button>
      </div>

      <p className="flex items-center justify-center gap-2 px-4.5 text-xs text-muted-foreground">
        <a
          href={event.wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Buka di Waze
        </a>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={downloadIcs}
          disabled={downloading.pending}
          aria-busy={downloading.pending}
          className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline disabled:cursor-wait"
        >
          {downloading.pending && (
            <Spinner className="h-3.5 w-3.5 border-[1.5px]" />
          )}
          Unduh file kalender (.ics)
        </button>
      </p>
    </motion.article>
  );
}

export function EventSection() {
  const { akad, reception } = weddingData;

  return (
    <SectionWrapper id="acara" variant="cream">
      <div className="container-wedding">
        <SectionTitle
          eyebrow="Save the Date"
          title="Rangkaian Acara"
          subtitle="Dengan hormat kami mengundang Anda pada"
        />
        <div className="grid grid-cols-1 gap-4.5 md:grid-cols-2 md:gap-6">
          <EventCard title="Akad Nikah" event={akad} index={0} />
          <EventCard title="Resepsi" event={reception} index={1} />
        </div>
      </div>
    </SectionWrapper>
  );
}
