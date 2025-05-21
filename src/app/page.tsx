import type { Metadata } from "next";
import ProductsPage from "@/components/products/products-page";
import { getQueryClient } from "@/lib/query-client";
import { getProducts } from "@/services/api/products/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Пошук товарів | KPI Trade",
    description:
      "Знайди потрібні товари серед студентів КПІ. Швидкий пошук, зручна навігація та інтеграція з Telegram.",
    keywords: [
      "пошук товарів",
      "студентський маркет",
      "торгівля КПІ",
      "обмін речами",
      "KPI Trade",
      "студенти КПІ",
    ],
    openGraph: {
      title: "Пошук товарів | KPI Trade",
      description:
        "Шукай та знаходь товари серед студентів КПІ. Проста торгівля з інтеграцією в Telegram.",
      url: "https://kpi-trade.online",
      siteName: "KPI Trade",
      images: [
        {
          url: "/banner.png",
          width: 1200,
          height: 630,
          alt: "Пошук товарів — KPI Trade",
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Пошук товарів | KPI Trade",
      description:
        "KPI Trade — студентський сервіс для пошуку та обміну товарами.",
      images: ["/banner.png"],
    },
  };
};

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage />
    </HydrationBoundary>
  );
}
