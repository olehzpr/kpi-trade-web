import { z } from "zod";
import { UserSchema } from "../user/user";
import { CategorySchema } from "../categories/category";
import { ProductImageSchema } from "@/types/products/product-image";
import { ProductStatisticsSchema } from "@/types/products/product-statistics";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  seller: UserSchema,
  category: CategorySchema,
  images: z.array(ProductImageSchema),
});

export const ProductWithDetailsSchema = ProductSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  statistics: ProductStatisticsSchema.nullable(),
  favorite: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductWithDetails = z.infer<typeof ProductWithDetailsSchema>;
