import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { StoreProvider } from "@/store/provider";
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
  title: {
    default: "PaNDiN Group – Luxury Hotel & Hospitality",
    template: "%s | PaNDiN Group",
  },
  description:
    "Experience world-class luxury at PaNDiN Group. Hotel rooms, serviced apartments, event halls, lounge & bar, recreation, and more — Ibadan, Nigeria.",
  keywords: ["hotel", "luxury", "apartments", "event hall", "Ibadan", "Nigeria", "PaNDiN Group"],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <QueryProvider>
          <StoreProvider>
            <ClientLayout>{children}</ClientLayout>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}