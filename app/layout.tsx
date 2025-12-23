import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ShellWrapper from "@/components/ShellWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitCalm | Focused GitHub Activity Summaries",
  description: "Stay informed about what actually happened. Focused awareness and summarization for engineering teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ShellWrapper>
          {children}
        </ShellWrapper>
      </body>
    </html>
  );
}
