import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fedy & Suci Wedding",
  description: "Halaman admin Fedy & Suci Wedding",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
