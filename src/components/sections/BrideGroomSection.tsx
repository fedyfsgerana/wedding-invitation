"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/lib/weddingData";
import { Person } from "@/types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
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
      className="relative border border-primary/20 rounded-[1.75rem] px-2 py-2"
    >
      <CornerOrnament className="absolute top-3 left-3 w-8 h-8 text-primary/40" />
      <CornerOrnament className="absolute top-3 right-3 w-8 h-8 text-primary/40 -scale-x-100" />
      <CornerOrnament className="absolute bottom-3 left-3 w-8 h-8 text-primary/40 -scale-y-100" />
      <CornerOrnament className="absolute bottom-3 right-3 w-8 h-8 text-primary/40 -scale-x-100 -scale-y-100" />

      <div className="flex flex-col items-center text-center px-6 py-10">
        <div className="relative mb-6 w-40 h-40 md:w-44 md:h-44">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20" />
          <div className="absolute inset-1.5 rounded-full overflow-hidden border border-primary/30 bg-card">
            <Image
              src={person.photo}
              alt={person.name}
              width={256}
              height={256}
              className="w-full h-full object-cover"
              onError={handleErr}
            />
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans font-medium mb-4">
          {person.role}
        </p>

        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-2">
          {person.nickname}
        </h3>
        <p className="font-serif text-sm text-foreground/80 mb-3">
          {person.fullName}
        </p>
        {person.bio && (
          <p className="text-muted-foreground text-xs md:text-sm font-sans max-w-xs">
            {person.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function BrideGroomSection() {
  const { groom, bride } = weddingData;

  return (
    <SectionWrapper id="mempelai" variant="default">
      <div className="container-wedding">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-3 font-sans font-medium">
            Mempelai
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Yang Berbahagia
          </h2>
          <p className="text-muted-foreground text-sm font-sans mt-3 max-w-sm mx-auto">
            Dua hati yang dipersatukan dalam ikatan suci pernikahan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start relative">
          <PersonCard person={groom} index={0} />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-14 h-14"
          >
            <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-soft" />
            <div className="absolute inset-0.75 rounded-full border border-primary/30 bg-card flex items-center justify-center">
              <span className="font-serif italic text-lg text-primary">
                &amp;
              </span>
            </div>
          </motion.div>

          <PersonCard person={bride} index={1} />
        </div>
      </div>
    </SectionWrapper>
  );
}
