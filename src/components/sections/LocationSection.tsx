"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export function LocationSection() {
    const { akad, reception } = weddingData;
    const MapPinIcon = getLucideIcon("MapPin");
    const CopyIcon = getLucideIcon("Copy");

    const copyAddress = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address);
            alert("Alamat berhasil disalin!");
        } catch {
            console.error("Gagal menyalin alamat");
        }
    };

    return (
        <SectionWrapper id="lokasi" variant="muted">
            <div className="container-wedding">
                <SectionTitle
                    decorative="Lokasi"
                    title="Tempat Acara"
                    subtitle="Kami menantikan kehadiran Anda di lokasi berikut"
                />

                <div className="space-y-8">
                    {[
                        { label: "Akad Nikah", event: akad },
                        { label: "Resepsi Pernikahan", event: reception },
                    ].map(({ label, event }) => (
                        <motion.div
                            key={label}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="card-wedding overflow-hidden"
                        >
                            {/* Map Embed */}
                            <div className="h-56 md:h-72 w-full">
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

                            {/* Info */}
                            <div className="p-5 md:p-6">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex items-start gap-3">
                                        <MapPinIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs text-primary font-medium mb-0.5">
                                                {label}
                                            </p>
                                            <h4 className="font-serif text-base font-bold text-foreground mb-1">
                                                {event.venue}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {event.address}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyAddress(event.address)}
                                        className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
                                        title="Salin alamat"
                                    >
                                        <CopyIcon className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        href={event.mapsUrl}
                                        target="_blank"
                                        variant="primary"
                                        size="sm"
                                        icon="Map"
                                        fullWidth
                                    >
                                        Google Maps
                                    </Button>
                                    <Button
                                        href={event.wazeUrl}
                                        target="_blank"
                                        variant="outline"
                                        size="sm"
                                        icon="Navigation"
                                        fullWidth
                                    >
                                        Waze
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}