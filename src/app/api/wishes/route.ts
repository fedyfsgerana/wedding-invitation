import { NextRequest, NextResponse } from "next/server";
import { appendRow, readRows, deleteRowById } from "@/lib/googleSheets";
import { isAuthenticated } from "@/lib/auth";
import {
  WISHES_SHEET_NAME,
  findGuestByName,
  wishUsage,
} from "@/lib/guestAccess";
import { clientIp, takeToken } from "@/lib/rateLimit";

const SHEET_NAME = WISHES_SHEET_NAME;
const MAX_GUEST_COUNT = 5;
const IP_LIMIT = 20;
const IP_WINDOW_MS = 10 * 60 * 1000;
const WISHES_SHEET_GID = Number(process.env.GOOGLE_WISHES_SHEET_GID || 0);

const VALID_ATTENDANCE = ["hadir", "tidak_hadir", "masih_ragu"] as const;
type Attendance = (typeof VALID_ATTENDANCE)[number];

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
    guestCount: Math.min(
      MAX_GUEST_COUNT,
      Math.max(1, parseInt(row[4] || "1", 10) || 1),
    ),
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
  if (!takeToken(`wish:${clientIp(req)}`, IP_LIMIT, IP_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Terlalu banyak kiriman. Coba lagi beberapa menit lagi." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
    }

    const { to, name, message, attendance, guestCount } = body;

    if (typeof to !== "string" || !to.trim()) {
      return NextResponse.json(
        { error: "Undangan tidak valid" },
        { status: 403 },
      );
    }
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
    }
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Ucapan wajib diisi" },
        { status: 400 },
      );
    }
    if (!["hadir", "tidak_hadir", "masih_ragu"].includes(attendance)) {
      return NextResponse.json(
        { error: "Status kehadiran tidak valid" },
        { status: 400 },
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Nama terlalu panjang" },
        { status: 400 },
      );
    }
    if (message.trim().length > 500) {
      return NextResponse.json(
        { error: "Ucapan terlalu panjang (maks 500 karakter)" },
        { status: 400 },
      );
    }

    const count = Number(guestCount ?? 1);
    if (!Number.isInteger(count) || count < 1 || count > MAX_GUEST_COUNT) {
      return NextResponse.json(
        { error: `Jumlah tamu harus 1 sampai ${MAX_GUEST_COUNT} orang` },
        { status: 400 },
      );
    }

    const guest = await findGuestByName(to);
    if (!guest) {
      return NextResponse.json(
        { error: "Undangan tidak valid" },
        { status: 403 },
      );
    }

    const used = (await wishUsage()).get(guest.id) ?? 0;
    if (used >= guest.quota) {
      return NextResponse.json(
        { error: "Kuota ucapan untuk undangan ini sudah penuh." },
        { status: 409 },
      );
    }

    const id = Date.now().toString();
    const timestamp = new Date().toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });

    await appendRow(SHEET_NAME, [
      id,
      name.trim(),
      message.trim(),
      attendance,
      String(count),
      timestamp,
      "'" + guest.id,
    ]);

    return NextResponse.json({
      wish: {
        id,
        name: name.trim(),
        message: message.trim(),
        attendance,
        guestCount: count,
        timestamp,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const ids: string[] = Array.isArray(body.ids)
      ? body.ids
      : body.id
        ? [body.id]
        : [];
    if (ids.length === 0) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }
    for (const id of ids) {
      await deleteRowById(SHEET_NAME, String(id), WISHES_SHEET_GID);
    }
    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
