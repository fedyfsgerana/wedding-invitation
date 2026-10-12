import { notFound } from "next/navigation";
import { WeddingApp } from "@/components/WeddingApp";
import { isAuthenticatedServer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DevelopAdministratorPreviewPage() {
  const allowed =
    process.env.NODE_ENV !== "production" || (await isAuthenticatedServer());

  if (!allowed) {
    notFound();
  }

  return <WeddingApp guestName={null} />;
}