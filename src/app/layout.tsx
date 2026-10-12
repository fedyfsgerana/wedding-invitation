import type { Metadata } from "next";
import { Geist, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
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
        className={`${playfair.variable} ${geist.variable} ${greatVibes.variable} font-sans`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
