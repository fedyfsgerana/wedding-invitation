import { NextRequest, NextResponse } from "next/server";
import {
  appendRow,
  readRows,
  deleteRowById,
  updateCell,
} from "@/lib/googleSheets";
import { isAuthenticated } from "@/lib/auth";
import {
  GUESTS_SHEET_NAME,
  MAX_QUOTA,
  guestIdOf,
  parseQuota,
  wishUsage,
} from "@/lib/guestAccess";

const SHEET_NAME = GUESTS_SHEET_NAME;
const GUESTS_SHEET_GID = Number(process.env.GOOGLE_GUESTS_SHEET_GID || 0);

function rowToGuest(row: string[], usage: Map<string, number>) {
  const id = guestIdOf(row);
  return {
    id,
    name: row[1] || "",
    link: row[2] || "",
    sent: String(row[3] || "").toLowerCase() === "true",
    createdAt: row[4] || "",
    quota: parseQuota(row[5]),
    used: usage.get(id) ?? 0,
  };
}

function validQuota(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return 1;
  const quota = Number(value);
  return Number.isInteger(quota) && quota >= 1 && quota <= MAX_QUOTA
    ? quota
    : null;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const [rows, usage] = await Promise.all([
      readRows(SHEET_NAME),
      wishUsage(),
    ]);
    const guests = rows
      .slice(1)
      .map((row) => rowToGuest(row, usage))
      .reverse();
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
    const { name, link, quota: rawQuota } = await req.json();
    if (!name?.trim() || !link?.trim()) {
      return NextResponse.json(
        { error: "Nama dan link wajib diisi" },
        { status: 400 },
      );
    }
    const quota = validQuota(rawQuota);
    if (quota === null) {
      return NextResponse.json(
        { error: `Kuota harus 1 sampai ${MAX_QUOTA}` },
        { status: 400 },
      );
    }
    const id = Date.now().toString();
    const createdAt = new Date().toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });

    await appendRow(SHEET_NAME, [
      "'" + id,
      name.trim(),
      link.trim(),
      "false",
      createdAt,
      String(quota),
    ]);

    return NextResponse.json({
      guest: {
        id,
        name: name.trim(),
        link: link.trim(),
        sent: false,
        createdAt,
        quota,
        used: 0,
      },
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
    const body = await req.json();
    const { sent, name, quota: rawQuota } = body;
    const ids: string[] = Array.isArray(body.ids)
      ? body.ids
      : body.id
        ? [body.id]
        : [];
    if (ids.length === 0) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    if (rawQuota !== undefined) {
      if (ids.length !== 1) {
        return NextResponse.json(
          { error: "Ubah kuota hanya untuk satu tamu" },
          { status: 400 },
        );
      }
      const quota = validQuota(rawQuota);
      if (quota === null) {
        return NextResponse.json(
          { error: `Kuota harus 1 sampai ${MAX_QUOTA}` },
          { status: 400 },
        );
      }
      await updateCell(SHEET_NAME, ids[0], "F", String(quota));
      return NextResponse.json({ success: true, quota });
    }

    if (typeof name === "string") {
      if (ids.length !== 1) {
        return NextResponse.json(
          { error: "Edit nama hanya untuk satu tamu" },
          { status: 400 },
        );
      }
      const trimmed = name.trim();
      if (!trimmed) {
        return NextResponse.json(
          { error: "Nama tidak boleh kosong" },
          { status: 400 },
        );
      }
      await updateCell(SHEET_NAME, ids[0], "B", trimmed);
      return NextResponse.json({ success: true, name: trimmed });
    }

    for (const id of ids) {
      await updateCell(SHEET_NAME, String(id), "D", sent ? "true" : "false");
    }
    return NextResponse.json({ success: true, updated: ids.length });
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
      await deleteRowById(SHEET_NAME, String(id), GUESTS_SHEET_GID);
    }
    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
