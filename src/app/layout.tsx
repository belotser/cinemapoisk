import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "СИНЕМАПОИСК",
  description: "найди кино под себя",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <header className="header">
            <div>
              <h3>СИНЕМАПОИСК</h3>
              <h5>найди кино под себя</h5>
            </div>
            <div className="header-links">
              <Link href="/">Главная</Link>
              <Link href="/favorite-films">Избранное</Link>
            </div>
          </header>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
