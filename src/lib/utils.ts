import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LucideIcons from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getLucideIcon(name: string): React.ElementType {
    const Icon = LucideIcons[name as keyof typeof LucideIcons];
    if (typeof Icon === "function" || (typeof Icon === "object" && Icon !== null)) {
        return Icon as React.ElementType;
    }
    return LucideIcons["Circle"];
}

export function formatDate(dateString: string, locale = "id-ID"): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatTime(time: string): string {
    const [hours, minutes] = time.split(":");
    return `${hours}.${minutes} WIB`;
}

export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function generateInviteLink(baseUrl: string, guestName: string): string {
    const encoded = encodeURIComponent(guestName);
    return `${baseUrl}?to=${encoded}`;
}

export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): string {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (distance < 1) return `${Math.round(distance * 1000)} meter`;
    return `${distance.toFixed(1)} km`;
}