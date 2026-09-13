import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cursor } from "@/components/Cursor";
import { DevToolbar } from "@/components/DevToolbar";
import "./globals.css";

// Trial Klim Söhne files. Do not deploy publicly until a production license is bought.
const sohne = localFont({
  src: [
    { path: "../public/fonts/sohne-buch.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/sohne-kraftig.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-sohne",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

const description =
  "Nico Campanell — designer at the intersection of design, data, and innovation. Informatics at UT Austin.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nicocampanell.com"),
  title: "Nico Campanell",
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Nico Campanell",
    description,
    url: "/",
    siteName: "Nico Campanell",
    type: "website",
    images: [{ url: "/intro/portrait.webp", width: 1536, height: 2048, alt: "Nico Campanell" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nico Campanell",
    description,
    images: ["/intro/portrait.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sohne.variable}>
      <body>
        {children}
        <Cursor />
        <DevToolbar />
      </body>
    </html>
  );
}
