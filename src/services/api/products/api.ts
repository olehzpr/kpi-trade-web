import { ProductWithDetails } from "@/types/products/product";
import { api } from "@/lib/api";
import {
  ProductsResponse,
  ProductsResponseSchema,
  SingleProductResponse,
  SingleProductResponseSchema,
} from "@/services/api/products/responses";

interface GetProductsParams {
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

export const getProducts = async (params: GetProductsParams = {}): Promise<ProductsResponse> => {
  const res = await api.get("/products", { params });
  return ProductsResponseSchema.parse(res.data);
};

export const getProduct = async (
  id: number,
): Promise<SingleProductResponse> => {
  const res = await api.get<ProductWithDetails>(`/products/${id}`);
  return SingleProductResponseSchema.parse(res.data);
};
