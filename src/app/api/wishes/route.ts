import { NextRequest, NextResponse } from "next/server";
import { appendRow, readRows, deleteRowById } from "@/lib/googleSheets";
import { isAuthenticated } from "@/lib/auth";

const SHEET_NAME = "Wishes";
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
  try {
    const { name, message, attendance, guestCount } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
    }
    if (!message?.trim()) {
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
      wish: {
        id,
        name: name.trim(),
        message: message.trim(),
        attendance,
        guestCount,
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
