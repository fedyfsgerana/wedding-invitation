"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGuestParam } from "@/hooks/useGuestParam";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
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
import { weddingData } from "@/lib/weddingData";

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
      const el = document.getElementById("pembuka");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <AudioProvider>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="pb-20 md:pb-0"
          >
            {/* Utilities */}
            <ScrollProgress />
            <FloatingPetals />
            <BackToTop />

            {/* Cover — always visible */}
            <CoverSection guestName={guestName} onOpen={handleOpen} />

            {/* Main content — revealed after open */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
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