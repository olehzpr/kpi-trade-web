// app/product/[productId]/page.tsx

import { getProduct } from "@/services/api/products/api";
import Product from "@/components/products/product-page";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import type { Metadata } from "next";

type PageParams = {
  params: { productId: string };
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const productId = Number(params.productId);

  try {
    const product = await getProduct(productId);
    const title = `${product.name} — KPI Trade`;
    const description =
      product.description?.slice(0, 160) ??
      "Опис товару від студента КПІ на платформі KPI Trade";
    const imageUrl = product.images?.[0]?.url ?? "/banner.png";

    return {
      title,
      description,
      keywords: [
        product.name,
        product.category.name,
        "КПІ",
        "торгівля",
        "KPI Trade",
        "Telegram",
        "студентський маркет",
        "обмін речами",
        "університет",
      ],
      openGraph: {
        title,
        description,
        locale: "uk_UA",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
      metadataBase: new URL("https://kpi-trade.online"),
    };
  } catch {
    return {
      title: "Товар не знайдено — KPI Trade",
      description:
        "Цей товар не знайдено. Перевірте посилання або спробуйте пізніше.",
    };
  }
}

export default async function ProductPage({ params }: PageParams) {
  const productId = Number(params.productId);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Product productId={productId} />
    </HydrationBoundary>
  );
}
