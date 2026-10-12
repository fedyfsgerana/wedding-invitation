import { NextResponse } from "next/server";

export function serverError(context: string, err: unknown) {
  console.error(`[${context}]`, err);
  return NextResponse.json(
    { error: "Terjadi kesalahan pada server. Silakan coba lagi." },
    { status: 500 },
  );
}