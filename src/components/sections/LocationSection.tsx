"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon } from "@/lib/utils";
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

const MapPinIcon = getLucideIcon("MapPin");
const CopyIcon = getLucideIcon("Copy");
const CheckIcon = getLucideIcon("Check");

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

interface LocationCardProps {
  label: string;
  event: EventDetail;
  index: number;
}

function LocationCard({ label, event, index }: LocationCardProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(event.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Gagal menyalin alamat");
    }
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
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-12 h-12 mb-4">
            <div className="absolute inset-0 rounded-full gradient-primary opacity-20" />
            <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
              <MapPinIcon className="w-4.5 h-4.5 text-primary" />
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans font-medium mb-2">
            {label}
          </p>
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-tight">
            {event.venue}
          </h3>
        </div>

        <div className="rounded-2xl overflow-hidden border border-primary/15 mb-4 h-52 md:h-64">
          <iframe
            src={event.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi ${label}`}
          />
        </div>

        <div className="flex items-start justify-between gap-3 rounded-2xl border border-primary/15 bg-card p-3.5 mb-4">
          <p className="text-xs md:text-sm text-muted-foreground font-sans leading-relaxed">
            {event.address}
          </p>
          <button
            onClick={copyAddress}
            className="shrink-0 w-8 h-8 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors flex items-center justify-center"
            title="Salin alamat"
          >
            {copied ? (
              <CheckIcon className="w-3.5 h-3.5 text-primary" />
            ) : (
              <CopyIcon className="w-3.5 h-3.5 text-primary" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            href={event.mapsUrl}
            target="_blank"
            variant="primary"
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
      </div>
    </motion.div>
  );
}

export function LocationSection() {
  const { akad, reception } = weddingData;

  return (
    <SectionWrapper id="lokasi" variant="default">
      <div className="container-wedding px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium">
            Lokasi
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Tempat Acara
          </h2>
          <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
            Kami menantikan kehadiran Bapak/Ibu/Saudara/i di lokasi berikut
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <LocationCard label="Akad Nikah" event={akad} index={0} />
          <LocationCard
            label="Resepsi Pernikahan"
            event={reception}
            index={1}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
