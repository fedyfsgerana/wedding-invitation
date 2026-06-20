import { NextRequest, NextResponse } from "next/server";
import { appendRow, readRows } from "@/lib/googleSheets";

const SHEET_NAME = "Wishes";

const wishAttempts = new Map<string, { count: number; firstAttempt: number }>();
const WISH_MAX = 3;
const WISH_WINDOW_MS = 60 * 60 * 1000;

function checkWishLimit(ip: string): boolean {
    const now = Date.now();
    const record = wishAttempts.get(ip);

    if (!record) {
        wishAttempts.set(ip, { count: 1, firstAttempt: now });
        return true;
    }

    if (now - record.firstAttempt > WISH_WINDOW_MS) {
        wishAttempts.set(ip, { count: 1, firstAttempt: now });
        return true;
    }

    if (record.count >= WISH_MAX) return false;

    record.count += 1;
    return true;
}

const VALID_ATTENDANCE = ["hadir", "tidak_hadir", "masih_ragu"] as const;
type Attendance = typeof VALID_ATTENDANCE[number];

function parseAttendance(val: string): Attendance {
    return VALID_ATTENDANCE.includes(val as Attendance)
        ? (val as Attendance)
        : "masih_ragu";
}

function rowToWish(row: string[]) {
    return {
        id: row[0] || "",
        name: row[1] || "",
        message: row[2] || "",
        attendance: parseAttendance(row[3] || ""),
        guestCount: Math.max(1, parseInt(row[4] || "1", 10) || 1),
        timestamp: row[5] || "",
    };
}

export async function GET() {
    try {
        const rows = await readRows(SHEET_NAME);
        const wishes = rows.slice(1).map(rowToWish).reverse();
        return NextResponse.json({ wishes });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

    if (!checkWishLimit(ip)) {
        return NextResponse.json(
            { error: "Terlalu banyak ucapan dikirim. Coba lagi nanti." },
            { status: 429 }
        );
    }

    try {
        const { name, message, attendance, guestCount } = await req.json();

        if (!name?.trim()) {
            return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
        }
        if (!message?.trim()) {
            return NextResponse.json({ error: "Ucapan wajib diisi" }, { status: 400 });
        }
        if (!["hadir", "tidak_hadir", "masih_ragu"].includes(attendance)) {
            return NextResponse.json({ error: "Status kehadiran tidak valid" }, { status: 400 });
        }
        if (name.trim().length > 100) {
            return NextResponse.json({ error: "Nama terlalu panjang" }, { status: 400 });
        }
        if (message.trim().length > 500) {
            return NextResponse.json({ error: "Ucapan terlalu panjang (maks 500 karakter)" }, { status: 400 });
        }

        const id = Date.now().toString();
        const timestamp = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        await appendRow(SHEET_NAME, [
            id,
            name.trim(),
            message.trim(),
            attendance,
            String(guestCount ?? 1),
            timestamp,
        ]);

        return NextResponse.json({
            wish: { id, name: name.trim(), message: message.trim(), attendance, guestCount, timestamp },
        });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}