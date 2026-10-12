import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionExpiresAt } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const expiresAt = sessionExpiresAt(req.cookies.get(SESSION_COOKIE)?.value);

  if (expiresAt === null) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, expiresAt });
}
