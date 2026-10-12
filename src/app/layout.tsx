import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Geist, Italianno } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italianno",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fedy & Suci Wedding",
  description:
    "Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi saksi momen bahagia kami.",
  metadataBase: new URL("https://wedding-invitation-fedy-suci.vercel.app"),
  openGraph: {
    title: "Fedy & Suci Wedding",
    description:
      "Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi saksi momen bahagia kami.",
    url: "https://wedding-invitation-fedy-suci.vercel.app",
    siteName: "Fedy & Suci Wedding",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${geist.variable} ${italianno.variable} ${amiri.variable} font-sans`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
