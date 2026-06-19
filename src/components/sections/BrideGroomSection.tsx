"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { SectionWrapper, SectionTitle } from "@/components/ui/SectionWrapper";
import { getLucideIcon } from "@/lib/utils";
import { weddingData } from "@/lib/weddingData";
import { Person } from "@/types";

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

function PersonCard({ person, index }: { person: Person; index: number }) {
    const avatarUrl =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(person.name) +
        "&size=256&background=f9a8d4&color=fff";

    function handleErr(e: React.SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = avatarUrl;
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="flex flex-col items-center text-center"
        >
            <div className="relative mb-6">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                    <Image
                        src={person.photo}
                        alt={person.name}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                        onError={handleErr}
                    />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium whitespace-nowrap shadow-md">
                    {person.role}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-script text-4xl text-primary mb-1">
                    {person.nickname}
                </h3>
                <p className="font-serif text-base font-medium text-foreground mb-2">
                    {person.fullName}
                </p>
                {person.bio && (
                    <p className="text-muted-foreground text-sm mb-3">
                        {person.bio}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export function BrideGroomSection() {
    const { groom, bride } = weddingData;
    const HeartIcon = getLucideIcon("Heart");

    return (
        <SectionWrapper id="mempelai" variant="default">
            <div className="container-wedding">
                <SectionTitle
                    decorative="Mempelai"
                    title="Yang Berbahagia"
                    subtitle="Dua hati yang dipersatukan dalam ikatan suci pernikahan"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <PersonCard person={groom} index={0} />
                    <PersonCard person={bride} index={1} />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center mt-10"
                >
                    <HeartIcon className="w-8 h-8 text-primary animate-pulse-soft" />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}