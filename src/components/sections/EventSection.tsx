"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon, formatDate, formatTime } from "@/lib/utils";
import {
  generateGoogleCalendarUrl,
  generateAppleCalendarUrl,
} from "@/lib/calendarHelper";
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
const CalendarIcon = getLucideIcon("Calendar");

const EVENT_ICONS = {
  BookOpen: getLucideIcon("BookOpen"),
  UtensilsCrossed: getLucideIcon("UtensilsCrossed"),
} as const;

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

interface EventCardProps {
  title: string;
  event: EventDetail;
  calendarTitle: string;
  icon: keyof typeof EVENT_ICONS;
  index: number;
}

function EventCard({
  title,
  event,
  calendarTitle,
  icon,
  index,
}: EventCardProps) {
  const Icon = EVENT_ICONS[icon];

  const handleAppleCalendar = () => {
    const url = generateAppleCalendarUrl(event, calendarTitle);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${calendarTitle}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative border border-primary/20 rounded-[1.75rem] px-2 py-2"
    >
      <CornerOrnament className="absolute top-3 left-3 w-8 h-8 text-primary/40" />
      <CornerOrnament className="absolute top-3 right-3 w-8 h-8 text-primary/40 -scale-x-100" />
      <CornerOrnament className="absolute bottom-3 left-3 w-8 h-8 text-primary/40 -scale-y-100" />
      <CornerOrnament className="absolute bottom-3 right-3 w-8 h-8 text-primary/40 -scale-x-100 -scale-y-100" />

      <div className="px-5 py-8 md:px-6">
        <div className="flex flex-col items-center text-center mb-7">
          <div className="relative w-12 h-12 mb-4">
            <div className="absolute inset-0 rounded-full gradient-primary opacity-20" />
            <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-primary" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground tracking-tight">
            {title}
          </h3>
        </div>

        <div className="space-y-3 mb-6 text-left">
          <div className="flex items-start gap-2.5">
            <CalendarIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground font-sans">
              {formatDate(event.date)}
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <ClockIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground font-sans">
              {formatTime(event.time)}
              {event.endTime && ` - ${formatTime(event.endTime)}`}
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPinIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground font-sans">
                {event.venue}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 font-sans">
                {event.address}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-primary/15 mb-4 h-44">
          <iframe
            src={event.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi ${title}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <Button
            href={event.mapsUrl}
            target="_blank"
            variant="outline"
            size="sm"
            icon="Map"
            className="rounded-full! text-[11px]! uppercase! tracking-widest! font-sans!"
          >
            Google Maps
          </Button>
          <Button
            href={event.wazeUrl}
            target="_blank"
            variant="outline"
            size="sm"
            icon="Navigation"
            className="rounded-full! text-[11px]! uppercase! tracking-widest! font-sans!"
          >
            Waze
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            href={generateGoogleCalendarUrl(event, calendarTitle)}
            target="_blank"
            variant="secondary"
            size="sm"
            icon="CalendarPlus"
            className="rounded-full! text-[11px]! uppercase! tracking-widest! font-sans!"
          >
            Google Cal
          </Button>
          <Button
            onClick={handleAppleCalendar}
            variant="secondary"
            size="sm"
            icon="CalendarCheck"
            className="rounded-full! text-[11px]! uppercase! tracking-widest! font-sans!"
          >
            Apple Cal
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function EventSection() {
  const { akad, reception } = weddingData;

  return (
    <SectionWrapper id="acara" variant="default">
      <div className="container-wedding px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium">
            Jadwal Acara
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Informasi Acara
          </h2>
          <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
            Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa
            restu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <EventCard
            title="Akad Nikah"
            event={akad}
            calendarTitle={akad.calendarTitle}
            icon="BookOpen"
            index={0}
          />
          <EventCard
            title="Resepsi Pernikahan"
            event={reception}
            calendarTitle={reception.calendarTitle}
            icon="UtensilsCrossed"
            index={1}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
