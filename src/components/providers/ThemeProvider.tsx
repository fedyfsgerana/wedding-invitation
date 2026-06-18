"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/types";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light");

    useEffect(() => {
        const stored = localStorage.getItem("wedding-theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored ?? (prefersDark ? "dark" : "light");
        setThemeState(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("wedding-theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}