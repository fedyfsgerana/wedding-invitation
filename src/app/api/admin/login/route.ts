import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_VALUE, SESSION_MAX_AGE } from "@/lib/auth";

const loginAttempts = new Map<string, { attempts: number; firstAttempt: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getIP(req: NextRequest): string {
    return (
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "unknown"
    );
}

function checkRateLimit(ip: string): { allowed: boolean; remainingMs: number } {
    const now = Date.now();
    const record = loginAttempts.get(ip);

    if (!record) {
        loginAttempts.set(ip, { attempts: 1, firstAttempt: now });
        return { allowed: true, remainingMs: 0 };
    }

    if (now - record.firstAttempt > WINDOW_MS) {
        loginAttempts.set(ip, { attempts: 1, firstAttempt: now });
        return { allowed: true, remainingMs: 0 };
    }

    if (record.attempts >= MAX_ATTEMPTS) {
        const remainingMs = WINDOW_MS - (now - record.firstAttempt);
        return { allowed: false, remainingMs };
    }

    record.attempts += 1;
    return { allowed: true, remainingMs: 0 };
}

export async function POST(req: NextRequest) {
    const ip = getIP(req);
    const { allowed, remainingMs } = checkRateLimit(ip);

    if (!allowed) {
        const minutes = Math.ceil(remainingMs / 60000);
        return NextResponse.json(
            { success: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.` },
            { status: 429 }
        );
    }

    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
        loginAttempts.delete(ip);

        const res = NextResponse.json({ success: true });
        res.cookies.set(SESSION_COOKIE, SESSION_VALUE, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: SESSION_MAX_AGE,
            path: "/",
        });
        return res;
    }

    return NextResponse.json({ success: false, error: "Password salah." }, { status: 401 });
}

export async function DELETE() {
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    });
    return res;
}