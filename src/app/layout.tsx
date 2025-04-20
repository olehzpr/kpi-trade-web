import AppFooter from "@/components/layout/footer";
import AppHeader from "@/components/layout/header";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "KPI Trade - Студентська платформа обміну товарами",
  description:
    "KPI Trade — платформа обміну товарами для студентів КПІ. Купуй, продавай або обмінюй речі просто та зручно через Telegram без посередників.",
  keywords: [
    "кпі трейд",
    "КПІ",
    "KPI Trade",
    "торгівля студентів",
    "обмін речами",
    "студентський маркет",
    "КПІ Telegram",
    "студентський обмін",
    "КПІ торгівля",
    "товари КПІ",
    "студентська платформа",
  ],
  openGraph: {
    title: "KPI Trade - Студентська платформа обміну товарами",
    description:
      "Онлайн-платформа для торгівлі та обміну речами між студентами КПІ. Проста інтеграція з Telegram. Продавай або купуй — легко, швидко, безпечно.",
    url: "https://kpi-trade.online",
    siteName: "KPI Trade",
    images: [
      {
        url: "https://kpi-trade.online/banner.png",
        width: 1200,
        height: 630,
        alt: "KPI Trade — студентська платформа для торгівлі",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  alternates: {
    canonical: "https://kpi-trade.online",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/kpi-trade-logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPI Trade - Студентська платформа обміну товарами",
    description:
      "KPI Trade — студентський сервіс для обміну товарами, зручна інтеграція з Telegram.",
    images: ["https://kpi-trade.online/banner.png"],
  },
  metadataBase: new URL("https://kpi-trade.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} antialiased flex flex-col items-center gap-4`}
      >
        <Providers>
          <AppHeader />
          <main className="min-h-[calc(100dvh-5rem)] flex flex-col items-center w-full">
            {children}
          </main>
          <AppFooter />
        </Providers>

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KPI Trade",
              url: "https://kpi-trade.online",
              logo: "https://kpi-trade.online/kpi-trade-logo.png",
              description: "Платформа обміну товарами для студентів КПІ",
              sameAs: ["https://t.me/kpi_trade"],
            }),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
