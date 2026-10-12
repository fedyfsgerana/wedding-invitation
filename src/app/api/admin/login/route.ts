import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isAdminConfigured,
  verifyPassword,
} from "@/lib/auth";
import { clientIp, remainingMs, resetTokens, takeToken } from "@/lib/rateLimit";

const MAX_ATTEMPTS = 5;
const MAX_GLOBAL_ATTEMPTS = 30;
const WINDOW_MS = 15 * 60 * 1000;
const GLOBAL_KEY = "login:all";

function tooMany(minutesLeft: number) {
  return NextResponse.json(
    {
      success: false,
      error: `Terlalu banyak percobaan. Coba lagi dalam ${minutesLeft} menit.`,
    },
    { status: 429 },
  );
}

export async function POST(req: NextRequest) {
  const ipKey = `login:${clientIp(req)}`;

  if (!takeToken(ipKey, MAX_ATTEMPTS, WINDOW_MS)) {
    return tooMany(Math.ceil(remainingMs(ipKey, WINDOW_MS) / 60000));
  }

  if (!takeToken(GLOBAL_KEY, MAX_GLOBAL_ATTEMPTS, WINDOW_MS)) {
    return tooMany(Math.ceil(remainingMs(GLOBAL_KEY, WINDOW_MS) / 60000));
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { success: false, error: "Login admin belum dikonfigurasi." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const password = body && typeof body === "object" ? body.password : null;

  if (verifyPassword(password)) {
    const token = createSessionToken();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Login admin belum dikonfigurasi." },
        { status: 503 },
      );
    }

    resetTokens(ipKey);

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return res;
  }

  return NextResponse.json(
    { success: false, error: "Password salah." },
    { status: 401 },
  );
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
