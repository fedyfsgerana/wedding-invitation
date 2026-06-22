import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, SESSION_MAX_AGE } from "@/lib/auth";

export async function GET(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({
        authenticated: true,
        expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
    });
}