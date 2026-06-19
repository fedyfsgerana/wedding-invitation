"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon, formatDate, formatTime } from "@/lib/utils";
import { generateGoogleCalendarUrl, generateAppleCalendarUrl } from "@/lib/calendarHelper";
import { weddingData } from "@/lib/weddingData";
import { EventDetail } from "@/types";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

interface EventCardProps {
    title: string;
    event: EventDetail;
    calendarTitle: string;
    icon: string;
}

function EventCard({ title, event, calendarTitle, icon }: EventCardProps) {
    const Icon = getLucideIcon(icon);
    const ClockIcon = getLucideIcon("Clock");
    const MapPinIcon = getLucideIcon("MapPin");
    const CalendarIcon = getLucideIcon("Calendar");

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
            className="card-wedding p-5 md:p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">{title}</h3>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                    <CalendarIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">{formatDate(event.date)}</p>
                </div>
                <div className="flex items-start gap-2.5">
                    <ClockIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">
                        {formatTime(event.time)}
                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </p>
                </div>
                <div className="flex items-start gap-2.5">
                    <MapPinIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-foreground">{event.venue}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.address}</p>
                    </div>
                </div>
            </div>

            {/* Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-border mb-3 h-44">
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

            {/* Map buttons */}
            <div className="grid grid-cols-2 gap-2 mb-2">
                <Button href={event.mapsUrl} target="_blank" variant="outline" size="sm" icon="Map">
                    Google Maps
                </Button>
                <Button href={event.wazeUrl} target="_blank" variant="outline" size="sm" icon="Navigation">
                    Waze
                </Button>
            </div>

            {/* Calendar buttons */}
            <div className="grid grid-cols-2 gap-2">
                <Button
                    href={generateGoogleCalendarUrl(event, calendarTitle)}
                    target="_blank"
                    variant="secondary"
                    size="sm"
                    icon="CalendarPlus"
                >
                    Google Cal
                </Button>
                <Button
                    onClick={handleAppleCalendar}
                    variant="secondary"
                    size="sm"
                    icon="CalendarCheck"
                >
                    Apple Cal
                </Button>
            </div>
        </motion.div>
    );
}

export function EventSection() {
    const { akad, reception } = weddingData;

    return (
        <SectionWrapper id="acara" variant="default">
            <div className="container-wedding px-4">
                <SectionTitle
                    decorative="Jadwal Acara"
                    title="Informasi Acara"
                    subtitle="Kami mengundang Anda untuk hadir dan memberikan doa restu"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <EventCard
                        title="Akad Nikah"
                        event={akad}
                        calendarTitle={akad.calendarTitle}
                        icon="BookOpen"
                    />
                    <EventCard
                        title="Resepsi Pernikahan"
                        event={reception}
                        calendarTitle={reception.calendarTitle}
                        icon="UtensilsCrossed"
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}