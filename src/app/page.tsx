import { notFound } from "next/navigation";
import { WeddingApp } from "@/components/WeddingApp";
import { isGuestRegistered } from "@/lib/guestAccess";

interface PageProps {
  searchParams: Promise<{ to?: string | string[] }>;
}

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawTo = Array.isArray(params.to) ? params.to[0] : params.to;
  const guestName = rawTo ? rawTo.trim() : null;

  if (!guestName) {
    notFound();
  }

  const isValid = await isGuestRegistered(guestName);
  if (!isValid) {
    notFound();
  }

  return <WeddingApp guestName={guestName} />;
}
