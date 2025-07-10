import "../styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@mui/material";
import styles from "../styles/layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CINEMAPOISK",
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
        <Container maxWidth="xl" className={styles.header}>
          <h3>CINEMAPOISK</h3>
          <h5>найди кино под себя</h5>
        </Container>
        {children}
      </body>
    </html>
  );
}
