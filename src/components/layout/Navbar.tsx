"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLucideIcon, cn } from "@/lib/utils";

const navItems = [
    { label: "Mempelai", href: "#mempelai", icon: "Heart" },
    { label: "Acara", href: "#acara", icon: "Calendar" },
    { label: "Galeri", href: "#galeri", icon: "Image" },
    { label: "RSVP", href: "#rsvp", icon: "MessageCircle" },
    { label: "Hadiah", href: "#hadiah", icon: "Gift" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = [...navItems].map((item) => item.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Desktop Top Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block",
                    scrolled
                        ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="container-wedding grid grid-cols-3 items-center px-4">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="font-script text-2xl text-primary justify-self-start"
                    >
                        F & S
                    </button>
                    <div className="flex items-center justify-center gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => handleNavClick(item.href)}
                                className={cn(
                                    "text-sm font-medium transition-colors whitespace-nowrap",
                                    activeSection === item.href.replace("#", "")
                                        ? "text-primary"
                                        : "text-foreground/70 hover:text-primary"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    {/* Empty spacer column keeps the menu visually centered */}
                    <div aria-hidden="true" />
                </div>
            </motion.nav>

            {/* Mobile Bottom Navigation */}
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
                <div className="bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
                    <div className="flex items-center justify-around px-1 py-1.5">
                        {navItems.map((item) => {
                            const Icon = getLucideIcon(item.icon);
                            const isActive = activeSection === item.href.replace("#", "");
                            return (
                                <motion.button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl transition-all flex-1"
                                >
                                    <div className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                        isActive ? "bg-primary/15" : "bg-transparent"
                                    )}>
                                        <Icon className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        )} />
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-medium transition-colors leading-tight",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {item.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.nav>
        </>
    );
}