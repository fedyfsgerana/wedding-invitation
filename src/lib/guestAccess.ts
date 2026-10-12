import { readRows } from "@/lib/googleSheets";

export const GUESTS_SHEET_NAME = "Guests";
export const WISHES_SHEET_NAME = "Wishes";

export const DEFAULT_QUOTA = 1;
export const MAX_QUOTA = 1000;

export interface RegisteredGuest {
  id: string;
  name: string;
  quota: number;
}

export function parseQuota(value: unknown): number {
  const quota = Number.parseInt(String(value ?? "").trim(), 10);
  if (!Number.isFinite(quota) || quota < 1) return DEFAULT_QUOTA;
  return Math.min(quota, MAX_QUOTA);
}

export function guestIdOf(row: string[]): string {
  return String(row[0] || "")
    .replace(/^'/, "")
    .trim();
}

export async function findGuestByName(
  name: string,
): Promise<RegisteredGuest | null> {
  const target = name.trim().toLowerCase();
  if (!target) return null;

  const rows = await readRows(GUESTS_SHEET_NAME);
  const row = rows.slice(1).find(
    (item) =>
      String(item[1] || "")
        .trim()
        .toLowerCase() === target,
  );

  return row
    ? {
        id: guestIdOf(row),
        name: String(row[1]).trim(),
        quota: parseQuota(row[5]),
      }
    : null;
}

export async function isGuestRegistered(name: string): Promise<boolean> {
  try {
    return (await findGuestByName(name)) !== null;
  } catch (err) {
    console.error("Gagal memvalidasi tamu:", err);
    return false;
  }
}

export async function wishUsage(): Promise<Map<string, number>> {
  const rows = await readRows(WISHES_SHEET_NAME);
  const usage = new Map<string, number>();

  for (const row of rows.slice(1)) {
    const guestId = String(row[6] || "")
      .replace(/^'/, "")
      .trim();
    if (guestId) usage.set(guestId, (usage.get(guestId) ?? 0) + 1);
  }

  return usage;
}
