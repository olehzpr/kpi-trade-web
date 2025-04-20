import { getProduct } from "@/services/api/products/api";
import Product from "@/components/products/product-page";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const productIdNumber = Number(productId);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productIdNumber],
    queryFn: () => getProduct(productIdNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Product productId={productIdNumber} />
    </HydrationBoundary>
  );
}
