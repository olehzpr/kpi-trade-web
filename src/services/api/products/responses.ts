import { z } from "zod";
import { PagingSchema } from "@/types/products/paging";
import { SortingSchema } from "@/types/products/sorting";
import { ProductWithDetailsSchema } from "@/types/products/product";

export const ProductsResponseSchema = z.object({
  totalPages: z.number(),
  totalElements: z.number(),
  pageable: PagingSchema,
  first: z.boolean(),
  last: z.boolean(),
  size: z.number(),
  content: z.array(ProductWithDetailsSchema),
  number: z.number(),
  sort: SortingSchema,
  numberOfElements: z.number(),
  empty: z.boolean(),
});

export const SingleProductResponseSchema = ProductWithDetailsSchema;

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type SingleProductResponse = z.infer<typeof SingleProductResponseSchema>;
