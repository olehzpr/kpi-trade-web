import {api} from "@/lib/api";
import {CategoriesResponse, CategoriesResponseSchema} from "@/services/api/categories/responses";

export const getCategories = async (): Promise<CategoriesResponse> => {
  const res = await api.get("/categories");
  return CategoriesResponseSchema.parse(res.data);
};
