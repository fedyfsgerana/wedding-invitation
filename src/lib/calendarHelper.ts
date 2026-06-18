import { EventDetail } from "@/types";

export function generateGoogleCalendarUrl(
    event: EventDetail,
    title: string
): string {
    const startDate = new Date(`${event.date}T${event.time}:00`);
    const endDate = event.endTime
        ? new Date(`${event.date}T${event.endTime}:00`)
        : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const format = (date: Date) =>
        date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: title,
        dates: `${format(startDate)}/${format(endDate)}`,
        details: `${title} - ${event.venue}`,
        location: event.address,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateAppleCalendarUrl(
    event: EventDetail,
    title: string
): string {
    const startDate = new Date(`${event.date}T${event.time}:00`);
    const endDate = event.endTime
        ? new Date(`${event.date}T${event.endTime}:00`)
        : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const format = (date: Date) =>
        date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `DTSTART:${format(startDate)}`,
        `DTEND:${format(endDate)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${title} - ${event.venue}`,
        `LOCATION:${event.address}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    return URL.createObjectURL(blob);
}