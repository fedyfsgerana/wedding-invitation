import { NextRequest, NextResponse } from "next/server";
import { appendRow, readRows, deleteRowById, updateCell } from "@/lib/googleSheets";

const SHEET_NAME = "Guests";
const GUESTS_SHEET_GID = Number(process.env.GOOGLE_GUESTS_SHEET_GID || 0);

function rowToGuest(row: string[]) {
    return {
        id: String(row[0] || ""),
        name: row[1] || "",
        link: row[2] || "",
        sent: row[3] === "true",
        createdAt: row[4] || "",
    };
}

export async function GET() {
    try {
        const rows = await readRows(SHEET_NAME);
        const guests = rows.slice(1).map(rowToGuest).reverse();
        return NextResponse.json({ guests });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, link } = await req.json();
        const id = Date.now().toString();
        const createdAt = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        await appendRow(SHEET_NAME, ["'" + id, name, link, "false", createdAt]);

        return NextResponse.json({
            guest: { id, name, link, sent: false, createdAt },
        });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, sent } = await req.json();
        await updateCell(SHEET_NAME, String(id), "D", sent ? "true" : "false");
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await deleteRowById(SHEET_NAME, String(id), GUESTS_SHEET_GID);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}