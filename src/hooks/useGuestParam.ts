import { useSearchParams } from "next/navigation";

export function useGuestParam() {
    const searchParams = useSearchParams();

    const guestName = searchParams.get("to")
        ? decodeURIComponent(searchParams.get("to") as string)
        : null;

    const customMessage = searchParams.get("msg")
        ? decodeURIComponent(searchParams.get("msg") as string)
        : null;

    const theme = searchParams.get("theme") as "light" | "dark" | null;

    return {
        guestName,
        customMessage,
        theme,
        hasGuest: !!guestName,
    };
}