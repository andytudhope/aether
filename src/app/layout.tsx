import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Providers } from '../lib/providers';
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hekima Wisdom",
  description: "Love and light and peace and darkness: all in great balance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#13101B]`}
      >
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
