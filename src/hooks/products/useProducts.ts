import { getProducts } from "@/services/api/products/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
