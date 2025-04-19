import { z } from "zod";
import { CategorySchema } from "@/types/categories/category";

export const CategoriesResponseSchema = z.array(CategorySchema);

export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;
