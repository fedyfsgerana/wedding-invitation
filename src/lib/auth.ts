import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "wedding-admin-session";
export const SESSION_VALUE = process.env.ADMIN_SESSION_SECRET || "wedding-admin-secret";
export const SESSION_MAX_AGE = 60 * 30;

export function isAuthenticated(req: NextRequest): boolean {
    const cookie = req.cookies.get(SESSION_COOKIE);
    return cookie?.value === SESSION_VALUE;
}

export async function isAuthenticatedServer(): Promise<boolean> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(SESSION_COOKIE);
    return cookie?.value === SESSION_VALUE;
}