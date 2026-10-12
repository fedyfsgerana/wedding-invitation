import { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; startedAt: number }>();

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return forwarded?.at(-1) || req.headers.get("x-real-ip")?.trim() || "unknown";
}

function bucketFor(key: string, windowMs: number, now: number) {
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.startedAt > windowMs) {
    const fresh = { count: 0, startedAt: now };
    buckets.set(key, fresh);
    return fresh;
  }
  return bucket;
}

export function takeToken(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const bucket = bucketFor(key, windowMs, Date.now());
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function remainingMs(key: string, windowMs: number): number {
  const bucket = buckets.get(key);
  if (!bucket) return 0;
  return Math.max(0, windowMs - (Date.now() - bucket.startedAt));
}

export function resetTokens(key: string): void {
  buckets.delete(key);
}
