import {api} from "@/lib/api";
import {Category} from "@/types/categories/category";
import {CategoriesResponse, CategoriesResponseSchema} from "@/services/api/categories/responses";

export const getCategories = async (): Promise<CategoriesResponse> => {
  const res = await api.get<Category[]>("/categories");
  return CategoriesResponseSchema.parse(res.data);
};
