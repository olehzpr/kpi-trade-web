import { api } from "@/lib/api";
import { Category } from "@/types/category";

export const getCategories = async () => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};
