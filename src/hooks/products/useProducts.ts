import { getProducts } from "@/app/services/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return result;
};
