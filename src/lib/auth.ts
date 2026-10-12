import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SESSION_MAX_AGE } from "@/lib/constants";

export { SESSION_MAX_AGE };

export const SESSION_COOKIE = "wedding-admin-session";

const MIN_SECRET_LENGTH = 16;

function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= MIN_SECRET_LENGTH ? secret : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function sameText(left: string, right: string): boolean {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return timingSafeEqual(a, b);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && sessionSecret() !== null;
}

export function verifyPassword(input: unknown): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || typeof input !== "string" || !input) return false;
  return sameText(input, password);
}

export function createSessionToken(): string | null {
  const secret = sessionSecret();
  if (!secret) return null;

  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${expiresAt}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function sessionExpiresAt(token: string | undefined): number | null {
  const secret = sessionSecret();
  if (!secret || !token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [expires, nonce, signature] = parts;
  if (!sameText(signature, sign(`${expires}.${nonce}`, secret))) return null;

  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;

  return expiresAt;
}

export function isAuthenticated(req: NextRequest): boolean {
  return sessionExpiresAt(req.cookies.get(SESSION_COOKIE)?.value) !== null;
}

export async function isAuthenticatedServer(): Promise<boolean> {
  const cookieStore = await cookies();
  return sessionExpiresAt(cookieStore.get(SESSION_COOKIE)?.value) !== null;
}