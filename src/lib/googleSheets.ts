const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

async function getAccessToken(): Promise<string> {
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
    return data.access_token as string;
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

    return res.json();
}

export async function readRows(sheetName: string): Promise<string[][]> {
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
    return data.values || [];
}

export async function deleteRowById(sheetName: string, id: string, sheetGid: number) {
    const rows = await readRows(sheetName);
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) return;

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
}

export async function updateCell(
    sheetName: string,
    id: string,
    columnLetter: string,
    value: string,
    idColumnIndex = 0
) {
    const rows = await readRows(sheetName);
    const rowIndex = rows.findIndex((r) => r[idColumnIndex] === id);
    if (rowIndex === -1) throw new Error("Baris tidak ditemukan");

    const token = await getAccessToken();
    const range = `${sheetName}!${columnLetter}${rowIndex + 1}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`;

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
}