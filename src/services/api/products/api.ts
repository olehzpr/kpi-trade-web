import {ProductWithDetails} from "@/types/products/product";
import {api} from "@/lib/api";
import {
  ProductsResponse,
  ProductsResponseSchema,
  SingleProductResponse,
  SingleProductResponseSchema
} from "@/services/api/products/responses";

export const getProducts = async (): Promise<ProductsResponse> => {
  const res = await api.get("/products");
  return ProductsResponseSchema.parse(res.data);
};

export const getProduct = async (id: number): Promise<SingleProductResponse> => {
  const res = await api.get<ProductWithDetails>(`/products/${id}`);
  return SingleProductResponseSchema.parse(res.data);
};