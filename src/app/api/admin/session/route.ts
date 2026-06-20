import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

const SESSION_MAX_AGE_MS = 60 * 60 * 8 * 1000; // 8 jam

export async function GET(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({
        authenticated: true,
        expiresAt: Date.now() + SESSION_MAX_AGE_MS,
    });
}