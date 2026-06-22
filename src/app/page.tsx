"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGuestParam } from "@/hooks/useGuestParam";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ExpiredScreen } from "@/components/ui/ExpiredScreen";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/layout/BackToTop";
import { FloatingPetals } from "@/components/layout/FloatingPetals";
import { CoverSection } from "@/components/sections/CoverSection";
import { OpeningSection } from "@/components/sections/OpeningSection";
import { BrideGroomSection } from "@/components/sections/BrideGroomSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { EventSection } from "@/components/sections/EventSection";
import { AgendaSection } from "@/components/sections/AgendaSection";
import { LoveStorySection } from "@/components/sections/LoveStorySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LocationSection } from "@/components/sections/LocationSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { GiftSection } from "@/components/sections/GiftSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { FloatingControls } from "@/components/layout/FloatingControls";
import { weddingData } from "@/lib/weddingData";

function isInvitationExpired(): boolean {
  const receptionDate = new Date(weddingData.reception.date);
  receptionDate.setHours(0, 0, 0, 0);
  const expiredDate = new Date(receptionDate);
  expiredDate.setDate(expiredDate.getDate() + 3);
  return new Date() > expiredDate;
}

function WeddingPage() {
  const { guestName } = useGuestParam();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  if (isInvitationExpired()) {
    return <ExpiredScreen />;
  }

  return (
    <AudioProvider>
      <LoadingScreen isLoading={isLoading} />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <FloatingPetals />
            <BackToTop />
            <FloatingControls />

            {/* Cover */}
            <AnimatePresence>
              {!isOpened && (
                <CoverSection
                  guestName={guestName}
                  onOpen={handleOpen}
                  isOpened={isOpened}
                />
              )}
            </AnimatePresence>

            {/* Main content */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="pb-20 md:pb-0"
                >
                  <Navbar />
                  <OpeningSection />
                  <BrideGroomSection />
                  <CountdownSection />
                  <EventSection />
                  <AgendaSection />
                  <LoveStorySection />
                  <GallerySection />
                  <LocationSection />
                  <RSVPSection />
                  <GiftSection />
                  <ClosingSection />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </AudioProvider>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen isLoading={true} />}>
      <WeddingPage />
    </Suspense>
  );
}