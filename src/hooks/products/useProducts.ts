import { getProducts } from "@/services/api/products/api";
import { useQuery } from "@tanstack/react-query";

interface UseProductsParams {
  categoryId?: number;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  sellerId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const useProducts = (params: UseProductsParams = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};
