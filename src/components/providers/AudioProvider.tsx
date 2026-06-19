"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { weddingData } from "@/lib/weddingData";

interface AudioContextType {
    isPlaying: boolean;
    toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
    isPlaying: false,
    toggleAudio: () => { },
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = new Audio(weddingData.music);
        audio.loop = true;
        audio.volume = Math.min(1, Math.max(0, 1.0));
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}