import { readRows } from "@/lib/googleSheets";

const GUESTS_SHEET_NAME = "Guests";

export async function isGuestRegistered(name: string): Promise<boolean> {
  const target = name.trim().toLowerCase();
  if (!target) return false;

  try {
    const rows = await readRows(GUESTS_SHEET_NAME);
    return rows.slice(1).some(
      (row) =>
        String(row[1] || "")
          .trim()
          .toLowerCase() === target,
    );
  } catch (err) {
    console.error("Gagal memvalidasi tamu:", err);
    return false;
  }
}
