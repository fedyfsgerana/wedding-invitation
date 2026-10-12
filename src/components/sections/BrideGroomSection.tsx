"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { FloralSprig } from "@/components/ui/Ornament";
import { SectionTitle, SectionWrapper } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/lib/weddingData";
import { Parents, Person } from "@/types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface PersonCardProps {
  person: Person;
  parents: Parents;
  childLabel: string;
  index: number;
}

function PersonCard({ person, parents, childLabel, index }: PersonCardProps) {
  const avatarUrl =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(person.name) +
    "&size=256&background=f3e9d2&color=94712a";

  function handleErr(e: React.SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = avatarUrl;
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="card-wedding flex flex-col items-center gap-2.5 px-5.5 py-7 text-center"
    >
      <div className="relative mb-1 h-37.5 w-37.5 rounded-full border border-gold-line/70 p-1.75">
        <FloralSprig size={64} className="absolute -bottom-3 -left-5 z-10" />
        <div className="h-full w-full overflow-hidden rounded-full bg-accent shadow-[0_14px_30px_-20px_rgba(58,51,44,0.45)]">
          <Image
            src={person.photo}
            alt={person.fullName}
            width={256}
            height={256}
            className="h-full w-full object-cover"
            onError={handleErr}
          />
        </div>
      </div>

      <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
        {person.role}
      </span>

      <h3 className="font-serif text-[28px] font-semibold leading-tight text-gold-gradient">
        {person.fullName}
      </h3>

      <p className="text-[13.5px] leading-normal text-muted-foreground">
        {childLabel} dari
        <br />
        <span className="font-semibold text-foreground">
          {parents.father} &amp; {parents.mother}
        </span>
      </p>
    </motion.article>
  );
}

export function BrideGroomSection() {
  const { groom, bride, groomParents, brideParents } = weddingData;

  return (
    <SectionWrapper id="mempelai">
      <div className="container-wedding">
        <SectionTitle
          eyebrow="Mempelai"
          title="Yang Berbahagia"
          subtitle="Dua hati yang dipersatukan dalam ikatan suci pernikahan"
        />

        <div className="grid grid-cols-1 items-center gap-4.5 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <PersonCard
            person={groom}
            parents={groomParents}
            childLabel="Putra"
            index={0}
          />

          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-hidden="true"
            className="text-center font-script text-[56px] leading-none text-gold"
          >
            &amp;
          </motion.p>

          <PersonCard
            person={bride}
            parents={brideParents}
            childLabel="Putri"
            index={1}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
