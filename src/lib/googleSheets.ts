const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

const cache = new Map<string, { data: string[][]; expiresAt: number }>();
const CACHE_TTL_MS = 30_000;

function getCached(sheetName: string): string[][] | null {
    const entry = cache.get(sheetName);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        cache.delete(sheetName);
        return null;
    }
    return entry.data;
}

function setCache(sheetName: string, data: string[][]): void {
    cache.set(sheetName, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

function invalidateCache(sheetName: string): void {
    cache.delete(sheetName);
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
    if (cachedToken && Date.now() < cachedToken.expiresAt - 5 * 60 * 1000) {
        return cachedToken.value;
    }

    const header = { alg: "RS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const claim = {
        iss: CLIENT_EMAIL,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
    };

    const base64url = (obj: object) =>
        Buffer.from(JSON.stringify(obj)).toString("base64url");

    const unsigned = `${base64url(header)}.${base64url(claim)}`;

    const crypto = await import("crypto");
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(unsigned);
    const signature = signer.sign(PRIVATE_KEY, "base64url");

    const jwt = `${unsigned}.${signature}`;

    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: jwt,
        }),
    });

    if (!res.ok) {
        throw new Error("Gagal mendapatkan access token Google: " + (await res.text()));
    }

    const data = await res.json();
    cachedToken = {
        value: data.access_token as string,
        expiresAt: Date.now() + 3600 * 1000,
    };
    return cachedToken.value;
}

async function readRowsFresh(sheetName: string): Promise<string[][]> {
    const token = await getAccessToken();
    const range = `${sheetName}!A:Z`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal membaca Google Sheets: " + (await res.text()));
    }

    const data = await res.json();
    const rows: string[][] = data.values || [];

    setCache(sheetName, rows);
    return rows;
}

export async function readRows(sheetName: string): Promise<string[][]> {
    const cached = getCached(sheetName);
    if (cached) return cached;

    const token = await getAccessToken();
    const range = `${sheetName}!A:Z`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal membaca Google Sheets: " + (await res.text()));
    }

    const data = await res.json();
    const rows: string[][] = data.values || [];

    setCache(sheetName, rows);
    return rows;
}

export async function appendRow(sheetName: string, values: (string | number)[]) {
    const token = await getAccessToken();
    const range = `${sheetName}!A:Z`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [values] }),
    });

    if (!res.ok) {
        throw new Error("Gagal menambah baris ke Google Sheets: " + (await res.text()));
    }

    invalidateCache(sheetName);
    return res.json();
}

export async function deleteRowById(sheetName: string, id: string, sheetGid: number) {
    const rows = await readRowsFresh(sheetName);
    const rowIndex = rows.findIndex((r) => String(r[0]).trim() === String(id).trim());
    if (rowIndex === -1) {
        throw new Error("Baris dengan id tersebut tidak ditemukan di Sheets");
    }

    const token = await getAccessToken();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: sheetGid,
                            dimension: "ROWS",
                            startIndex: rowIndex,
                            endIndex: rowIndex + 1,
                        },
                    },
                },
            ],
        }),
    });

    if (!res.ok) {
        throw new Error("Gagal menghapus baris: " + (await res.text()));
    }

    invalidateCache(sheetName);
}

export async function updateCell(
    sheetName: string,
    id: string,
    columnLetter: string,
    value: string,
    idColumnIndex = 0
) {
    const rows = await readRowsFresh(sheetName);
    const rowIndex = rows.findIndex(
        (r) => String(r[idColumnIndex]).trim() === String(id).trim()
    );
    if (rowIndex === -1) throw new Error("Baris tidak ditemukan");

    const token = await getAccessToken();
    const range = `${sheetName}!${columnLetter}${rowIndex + 1}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=RAW`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [[value]] }),
    });

    if (!res.ok) {
        throw new Error("Gagal memperbarui sel: " + (await res.text()));
    }

    invalidateCache(sheetName);
}