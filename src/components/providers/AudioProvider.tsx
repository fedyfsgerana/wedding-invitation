"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
    isPlaying: boolean;
    toggleAudio: () => void;
    setMusicSrc: (src: string) => void;
}

const AudioContext = createContext<AudioContextType>({
    isPlaying: false,
    toggleAudio: () => { },
    setMusicSrc: () => { },
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState("");

    useEffect(() => {
        if (!src) return;
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [src]);

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

    const setMusicSrc = (newSrc: string) => {
        setSrc(newSrc);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, toggleAudio, setMusicSrc }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}