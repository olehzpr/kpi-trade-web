import { getProducts } from "@/services/api/products/api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
