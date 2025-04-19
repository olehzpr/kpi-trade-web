import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import {ReactNode} from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "KPI Trade",
  description: "Сайт для торгівлі студентів КПІ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex flex-col items-center gap-4`}
      >
        <Providers>
          <AppHeader />
          <main className="min-h-[100dvh] flex flex-col items-center w-full">
            {children}
          </main>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
