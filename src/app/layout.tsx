import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";
import { AnimationLayout } from "@/components/layout/animation-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "KPI Trade",
  description:
    "KPI Trade — платформа обміну товарами для студентів КПІ. Купуй, продавай або обмінюй речі просто та зручно. Підключення через Telegram. Торгівля серед студентів, без зайвих посередників.",
  keywords: [
    "кпі трейд",
    "КПІ",
    "KPI Trade",
    "торгівля студентів",
    "обмін речами",
    "KPI Trade",
    "студентський маркет",
    "KPI Telegram",
    "студентський обмін",
    "KPI торгівля",
    "КПІ обмін",
    "товари КПІ",
    "KPI продукти",
  ],
  openGraph: {
    title: "KPI Trade",
    description:
      "Онлайн-платформа для торгівлі та обміну речами між студентами КПІ. Проста інтеграція з Telegram. Продавай або купуй — легко, швидко, безпечно.",
    url: "https://kpi-trade.online",
    siteName: "KPI Trade",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "KPI Trade — студентська платформа для торгівлі",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPI Trade",
    description:
      "KPI Trade — студентський сервіс для обміну товарами, зручна інтеграція з Telegram.",
    images: ["/banner.png"],
  },
  metadataBase: new URL("https://kpi-trade.online"),
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
          <AnimationLayout>
            <main className="min-h-[100dvh] flex flex-col items-center w-full">
              {children}
            </main>
          </AnimationLayout>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
