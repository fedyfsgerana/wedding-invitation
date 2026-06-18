"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useAudio } from "@/components/providers/AudioProvider";
import { getLucideIcon } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Mempelai", href: "#mempelai" },
    { label: "Acara", href: "#acara" },
    { label: "Galeri", href: "#galeri" },
    { label: "RSVP", href: "#rsvp" },
    { label: "Hadiah", href: "#hadiah" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { isPlaying, toggleAudio } = useAudio();

    const SunIcon = getLucideIcon("Sun");
    const MoonIcon = getLucideIcon("Moon");
    const MenuIcon = getLucideIcon("Menu");
    const XIcon = getLucideIcon("X");
    const MusicIcon = getLucideIcon("Music");
    const MusicOffIcon = getLucideIcon("VolumeX");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="container-wedding flex items-center justify-between px-4">
                    {/* Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="font-script text-2xl text-primary"
                    >
                        R & A
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => handleNavClick(item.href)}
                                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleAudio}
                            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80"
                            aria-label="Toggle music"
                        >
                            {isPlaying ? (
                                <MusicIcon className="w-4 h-4" />
                            ) : (
                                <MusicOffIcon className="w-4 h-4" />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <MoonIcon className="w-4 h-4" />
                            ) : (
                                <SunIcon className="w-4 h-4" />
                            )}
                        </motion.button>

                        {/* Mobile menu button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors text-foreground/80"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <XIcon className="w-4 h-4" />
                            ) : (
                                <MenuIcon className="w-4 h-4" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-lg md:hidden"
                    >
                        <div className="flex flex-col py-4 px-6 gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-left text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}