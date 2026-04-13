import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TickerTape from "@/components/TickerTape";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WTI Crude Market Intelligence",
  description: "Weekly EIA WPSR analysis, signal framework, and directional trade outlook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ background: "var(--background)" }}>
        <Navbar />
        <div className="pt-14">
          <TickerTape />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
