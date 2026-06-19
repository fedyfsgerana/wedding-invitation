import { NextRequest, NextResponse } from "next/server";
import { appendRow, readRows } from "@/lib/googleSheets";

const SHEET_NAME = "Wishes";

function rowToWish(row: string[]) {
    return {
        id: row[0] || "",
        name: row[1] || "",
        message: row[2] || "",
        attendance: row[3] || "",
        guestCount: row[4] || "1",
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
    try {
        const { name, message, attendance, guestCount } = await req.json();
        const id = Date.now().toString();
        const timestamp = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        await appendRow(SHEET_NAME, [
            id,
            name,
            message,
            attendance,
            String(guestCount ?? 1),
            timestamp,
        ]);

        return NextResponse.json({
            wish: { id, name, message, attendance, guestCount, timestamp },
        });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}