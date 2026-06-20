import { NextRequest, NextResponse } from "next/server";
import { appendRow, readRows, deleteRowById, updateCell } from "@/lib/googleSheets";
import { isAuthenticated } from "@/lib/auth";

const SHEET_NAME = "Guests";
const GUESTS_SHEET_GID = Number(process.env.GOOGLE_GUESTS_SHEET_GID || 0);

function rowToGuest(row: string[]) {
    return {
        id: String(row[0] || "").replace(/^'/, ""),
        name: row[1] || "",
        link: row[2] || "",
        sent: String(row[3] || "").toLowerCase() === "true",
        createdAt: row[4] || "",
    };
}

export async function GET(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const rows = await readRows(SHEET_NAME);
        const guests = rows.slice(1).map(rowToGuest).reverse();
        return NextResponse.json({ guests });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { name, link } = await req.json();
        if (!name?.trim() || !link?.trim()) {
            return NextResponse.json({ error: "Nama dan link wajib diisi" }, { status: 400 });
        }
        const id = Date.now().toString();
        const createdAt = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        await appendRow(SHEET_NAME, ["'" + id, name.trim(), link.trim(), "false", createdAt]);

        return NextResponse.json({
            guest: { id, name: name.trim(), link: link.trim(), sent: false, createdAt },
        });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id, sent } = await req.json();
        if (!id) return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
        await updateCell(SHEET_NAME, String(id), "D", sent ? "true" : "false");
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
        await deleteRowById(SHEET_NAME, String(id), GUESTS_SHEET_GID);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}